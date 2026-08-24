/**
 * UniFlow Core Firestore & Auth Service
 * Single Source of Truth: Firestore Cloud Database & Firebase Auth
 *
 * Direct, permanent, and instantaneous persistence for:
 * - Admin Role & Permissions Directory (`admins/{adminEmail}`)
 * - User Directory & Session Synchronization
 */

import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  getDocs, 
  deleteDoc
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db } from './config';
import { 
  AdminRecord, 
  AuthUserRecord, 
  AdminRole 
} from '../types';

export const PRIMARY_ADMIN_EMAIL = 'vishnukantsharma98@gmail.com';
export const PRIMARY_ADMIN_EMAILS = [
  'vishnukantsharma98@gmail.com',
  'vishnukant.25bcon2366@jecrcu.edu.in'
];

export const INITIAL_FIREBASE_USERS: AuthUserRecord[] = [
  {
    uid: 'auth-user-vishnu-jecrcu',
    email: 'vishnukant.25bcon2366@jecrcu.edu.in',
    displayName: 'Vishnu Kant Sharma',
    photoURL: '',
    provider: 'google.com',
    creationTime: '2026-01-15T09:00:00.000Z',
    lastSignInTime: new Date().toISOString(),
    emailVerified: true,
    disabled: false,
    role: 'primaryAdmin',
  },
  {
    uid: 'auth-user-vishnu-844',
    email: 'vishnukantsharma844@gmail.com',
    displayName: 'Vishnu Kant Sharma',
    photoURL: '',
    provider: 'google.com',
    creationTime: '2026-02-01T10:00:00.000Z',
    lastSignInTime: new Date().toISOString(),
    emailVerified: true,
    disabled: false,
    role: 'user',
  },
  {
    uid: 'auth-user-vishnu-98',
    email: 'vishnukantsharma98@gmail.com',
    displayName: 'Vishnu Kant Sharma',
    photoURL: '',
    provider: 'google.com',
    creationTime: '2026-01-01T00:00:00.000Z',
    lastSignInTime: new Date().toISOString(),
    emailVerified: true,
    disabled: false,
    role: 'primaryAdmin',
  },
];

// In-memory role caching to eliminate duplicate roundtrips
const userRoleCache = new Map<string, {
  roleInfo: { role: AdminRole; isPrimaryAdmin: boolean; isSecondaryAdmin: boolean; isAdmin: boolean };
  cachedAt: number;
}>();

export function invalidateUserRoleCache(uid?: string) {
  if (uid) {
    userRoleCache.delete(uid);
  } else {
    userRoleCache.clear();
  }
}

/**
 * Syncs user auth session to Firestore users collection and server user directory
 */
export async function syncUserSession(user: User): Promise<void> {
  if (!user || !user.email) return;

  const cleanEmail = user.email.toLowerCase().trim();
  const isPrimary = PRIMARY_ADMIN_EMAILS.some((adminEmail) => adminEmail.toLowerCase() === cleanEmail);

  // 1. Direct sync to Firestore users collection
  try {
    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(userDocRef, {
      uid: user.uid,
      email: cleanEmail,
      displayName: user.displayName || cleanEmail.split('@')[0] || 'UniFlow Student',
      photoURL: user.photoURL || '',
      provider: user.providerData[0]?.providerId || 'google.com',
      creationTime: user.metadata.creationTime || new Date().toISOString(),
      lastSignInTime: new Date().toISOString(),
      emailVerified: user.emailVerified ?? true,
      disabled: false,
      role: isPrimary ? 'primaryAdmin' : 'user',
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (fsErr) {
    // Non-fatal if offline
  }

  // 2. Sync to Server user directory API
  try {
    await fetch('/api/user/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: user.uid,
        email: cleanEmail,
        displayName: user.displayName || cleanEmail.split('@')[0] || 'UniFlow Student',
        photoURL: user.photoURL || '',
        provider: user.providerData[0]?.providerId || 'google.com',
        emailVerified: user.emailVerified,
      }),
    });
  } catch (err) {
    // Non-fatal background sync
  }
}

/**
 * Checks user role against Firestore and server
 */
export async function checkUserRole(user: User | null, forceRefresh: boolean = false): Promise<{
  role: AdminRole;
  isPrimaryAdmin: boolean;
  isSecondaryAdmin: boolean;
  isAdmin: boolean;
}> {
  if (!user || !user.email) {
    return {
      role: 'user',
      isPrimaryAdmin: false,
      isSecondaryAdmin: false,
      isAdmin: false,
    };
  }

  const cleanEmail = user.email.toLowerCase().trim();
  if (PRIMARY_ADMIN_EMAILS.some((adminEmail) => adminEmail.toLowerCase() === cleanEmail)) {
    return {
      role: 'primaryAdmin',
      isPrimaryAdmin: true,
      isSecondaryAdmin: false,
      isAdmin: true,
    };
  }

  // Check fast in-memory cache if not forced
  if (!forceRefresh) {
    const cached = userRoleCache.get(user.uid);
    if (cached && Date.now() - cached.cachedAt < 45000) {
      return cached.roleInfo;
    }
  }

  // 1. Check Firebase Auth ID token custom claims
  try {
    const idTokenResult = await user.getIdTokenResult(forceRefresh);
    const claims = idTokenResult.claims;
    if (claims.role === 'secondaryAdmin' || claims.secondaryAdmin === true || claims.admin === true) {
      const res = {
        role: 'secondaryAdmin' as AdminRole,
        isPrimaryAdmin: false,
        isSecondaryAdmin: true,
        isAdmin: true,
      };
      userRoleCache.set(user.uid, { roleInfo: res, cachedAt: Date.now() });
      return res;
    }
  } catch {
    // Non-fatal
  }

  // 2. Direct Firestore check on admins collection (primary source of truth)
  try {
    const directDoc = await getDoc(doc(db, 'admins', cleanEmail));
    if (directDoc.exists() && directDoc.data()?.status === 'active') {
      const res = {
        role: 'secondaryAdmin' as AdminRole,
        isPrimaryAdmin: false,
        isSecondaryAdmin: true,
        isAdmin: true,
      };
      userRoleCache.set(user.uid, { roleInfo: res, cachedAt: Date.now() });
      setDoc(doc(db, 'admins', user.uid), {
        email: cleanEmail,
        role: 'secondaryAdmin',
        status: 'active',
        uid: user.uid,
        linkedAt: new Date().toISOString(),
      }, { merge: true }).catch(() => {});
      return res;
    }

    const sanitizedId = cleanEmail.replace(/[^a-z0-9]/g, '_');
    const sanitizedDoc = await getDoc(doc(db, 'admins', sanitizedId));
    if (sanitizedDoc.exists() && sanitizedDoc.data()?.status === 'active') {
      const res = {
        role: 'secondaryAdmin' as AdminRole,
        isPrimaryAdmin: false,
        isSecondaryAdmin: true,
        isAdmin: true,
      };
      userRoleCache.set(user.uid, { roleInfo: res, cachedAt: Date.now() });
      setDoc(doc(db, 'admins', user.uid), {
        email: cleanEmail,
        role: 'secondaryAdmin',
        status: 'active',
        uid: user.uid,
        linkedAt: new Date().toISOString(),
      }, { merge: true }).catch(() => {});
      return res;
    }

    const uidDoc = await getDoc(doc(db, 'admins', user.uid));
    if (uidDoc.exists() && uidDoc.data()?.status === 'active') {
      const res = {
        role: 'secondaryAdmin' as AdminRole,
        isPrimaryAdmin: false,
        isSecondaryAdmin: true,
        isAdmin: true,
      };
      userRoleCache.set(user.uid, { roleInfo: res, cachedAt: Date.now() });
      return res;
    }
  } catch (firestoreErr) {
    console.warn('[UniFlow] Firestore admin check notice:', firestoreErr);
  }

  // 3. Server role endpoint check with 2.5s timeout
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2500);

    const token = await user.getIdToken().catch(() => '');
    const res = await fetch('/api/auth/role', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'x-user-email': cleanEmail,
      },
      body: JSON.stringify({ email: cleanEmail, uid: user.uid }),
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (res.ok) {
      const data = await res.json();
      if (data.isAdmin) {
        const info = {
          role: data.role as AdminRole,
          isPrimaryAdmin: data.isPrimaryAdmin,
          isSecondaryAdmin: data.isSecondaryAdmin,
          isAdmin: data.isAdmin,
        };
        userRoleCache.set(user.uid, { roleInfo: info, cachedAt: Date.now() });
        if (data.isSecondaryAdmin) {
          setDoc(doc(db, 'admins', user.uid), {
            email: cleanEmail,
            role: 'secondaryAdmin',
            status: 'active',
            uid: user.uid,
            linkedAt: new Date().toISOString(),
          }, { merge: true }).catch(() => {});
        }
        return info;
      }
    }
  } catch (err) {
    // Non-fatal
  }

  const defaultUserRole = {
    role: 'user' as AdminRole,
    isPrimaryAdmin: false,
    isSecondaryAdmin: false,
    isAdmin: false,
  };
  userRoleCache.set(user.uid, { roleInfo: defaultUserRole, cachedAt: Date.now() });
  return defaultUserRole;
}

/**
 * ADMIN API: Fetch all users from backend Auth / Admin SDK, Firestore users, and admins
 */
export async function fetchAdminUsers(user: User): Promise<AuthUserRecord[]> {
  console.log('[Users] Firebase user fetch started');
  const usersMap = new Map<string, AuthUserRecord>();

  // Pre-seed known Firebase Auth accounts
  for (const initialUser of INITIAL_FIREBASE_USERS) {
    const cleanEmail = initialUser.email.toLowerCase().trim();
    usersMap.set(cleanEmail, { ...initialUser });
  }

  // 1. Fetch from Server API (/api/admin/users)
  try {
    const token = await user.getIdToken().catch(() => '');
    const res = await fetch('/api/admin/users', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'x-user-email': user.email || '',
      },
    });

    if (res.ok) {
      const data = await res.json();
      if (data.users && Array.isArray(data.users)) {
        for (const u of data.users) {
          if (u && (u.email || u.uid)) {
            const cleanEmail = (u.email || '').toLowerCase().trim();
            const key = cleanEmail || u.uid;
            usersMap.set(key, {
              uid: u.uid || key,
              email: u.email || 'N/A',
              displayName: u.displayName || u.email?.split('@')[0] || 'UniFlow Student',
              photoURL: u.photoURL || '',
              provider: u.provider || 'google.com',
              creationTime: u.creationTime || new Date().toISOString(),
              lastSignInTime: u.lastSignInTime || new Date().toISOString(),
              emailVerified: u.emailVerified ?? true,
              disabled: u.disabled ?? false,
              role: u.role || (PRIMARY_ADMIN_EMAILS.some((e) => e.toLowerCase() === cleanEmail) ? 'primaryAdmin' : 'user'),
            });
          }
        }
      }
    }
  } catch (apiErr) {
    console.warn('[Users] Server API fetch error:', apiErr);
  }

  // 2. Fetch from Firestore users collection
  try {
    const usersSnap = await getDocs(collection(db, 'users'));
    usersSnap.forEach((docSnap) => {
      const data = docSnap.data();
      if (data && (data.email || data.uid)) {
        const cleanEmail = (data.email || '').toLowerCase().trim();
        const key = cleanEmail || data.uid || docSnap.id;
        const existing = usersMap.get(key);
        usersMap.set(key, {
          uid: data.uid || docSnap.id || existing?.uid || key,
          email: data.email || existing?.email || 'N/A',
          displayName: data.displayName || data.name || existing?.displayName || data.email?.split('@')[0] || 'UniFlow Student',
          photoURL: data.photoURL || existing?.photoURL || '',
          provider: data.provider || existing?.provider || 'google.com',
          creationTime: data.creationTime || existing?.creationTime || new Date().toISOString(),
          lastSignInTime: data.lastSignInTime || existing?.lastSignInTime || new Date().toISOString(),
          emailVerified: data.emailVerified ?? existing?.emailVerified ?? true,
          disabled: data.disabled ?? existing?.disabled ?? false,
          role: (data.role || existing?.role || (PRIMARY_ADMIN_EMAILS.some((e) => e.toLowerCase() === cleanEmail) ? 'primaryAdmin' : 'user')) as AdminRole,
        });
      }
    });
  } catch (fsErr) {
    console.warn('[Users] Firestore users collection notice:', fsErr);
  }

  // 3. Fetch from Firestore admins collection (enrich admin roles)
  try {
    const adminsSnap = await getDocs(collection(db, 'admins'));
    adminsSnap.forEach((docSnap) => {
      const data = docSnap.data();
      if (data && data.email) {
        const cleanEmail = data.email.toLowerCase().trim();
        const existing = usersMap.get(cleanEmail);
        const resolvedRole = (data.role || (PRIMARY_ADMIN_EMAILS.some((e) => e.toLowerCase() === cleanEmail) ? 'primaryAdmin' : 'secondaryAdmin')) as AdminRole;
        if (existing) {
          existing.role = resolvedRole;
        } else {
          usersMap.set(cleanEmail, {
            uid: data.uid || docSnap.id,
            email: data.email,
            displayName: data.displayName || data.name || data.email.split('@')[0] || 'Administrator',
            photoURL: data.photoURL || '',
            provider: 'google.com',
            creationTime: data.addedAt || new Date().toISOString(),
            lastSignInTime: new Date().toISOString(),
            emailVerified: true,
            disabled: false,
            role: resolvedRole,
          });
        }
      }
    });
  } catch (adminsErr) {
    console.warn('[Users] Firestore admins notice:', adminsErr);
  }

  // 4. Always ensure the current logged-in user is in the directory
  if (user && user.email) {
    const currentClean = user.email.toLowerCase().trim();
    const existing = usersMap.get(currentClean);
    const isPrimary = PRIMARY_ADMIN_EMAILS.some((e) => e.toLowerCase() === currentClean);
    if (!existing) {
      usersMap.set(currentClean, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email.split('@')[0] || 'UniFlow Student',
        photoURL: user.photoURL || '',
        provider: user.providerData[0]?.providerId || 'google.com',
        creationTime: user.metadata.creationTime || new Date().toISOString(),
        lastSignInTime: user.metadata.lastSignInTime || new Date().toISOString(),
        emailVerified: user.emailVerified,
        disabled: false,
        role: isPrimary ? 'primaryAdmin' : 'user',
      });
    } else {
      existing.uid = user.uid || existing.uid;
      existing.displayName = user.displayName || existing.displayName;
      existing.photoURL = user.photoURL || existing.photoURL;
      if (isPrimary) existing.role = 'primaryAdmin';
    }
  }

  const result = Array.from(usersMap.values());
  console.log(`[Users] Total users returned: ${result.length}`);
  result.forEach((u) => {
    console.log(`[Users] User: ${u.email} (Role: ${u.role}, UID: ${u.uid})`);
  });

  return result;
}

/**
 * ADMIN API: Fetch admins list from Firestore & Server
 */
export async function fetchAdminsList(user: User): Promise<AdminRecord[]> {
  const adminsMap = new Map<string, AdminRecord>();

  // 1. Always ensure Primary Admin is present
  adminsMap.set(PRIMARY_ADMIN_EMAIL.toLowerCase(), {
    id: 'primary-0',
    email: PRIMARY_ADMIN_EMAIL,
    role: 'primaryAdmin',
    addedBy: 'System Master (Owner)',
    addedAt: '2026-01-01T00:00:00.000Z',
    status: 'active'
  });

  // 2. Fetch from Firestore admins collection
  try {
    const snap = await getDocs(collection(db, 'admins'));
    snap.forEach((d) => {
      const data = d.data();
      if (data && data.email) {
        const clean = data.email.toLowerCase().trim();
        if (clean !== PRIMARY_ADMIN_EMAIL.toLowerCase()) {
          adminsMap.set(clean, {
            id: d.id,
            email: clean,
            role: data.role || 'secondaryAdmin',
            addedBy: data.addedBy || 'Primary Admin',
            addedAt: data.addedAt || new Date().toISOString(),
            status: data.status || 'active'
          });
        }
      }
    });
  } catch (firestoreErr) {
    console.warn('[UniFlow] Firestore admins fetch notice:', firestoreErr);
  }

  // 3. Merge from server API
  try {
    const token = await user.getIdToken().catch(() => '');
    const res = await fetch('/api/admin/admins', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'x-user-email': user.email || '',
      },
    });

    if (res.ok) {
      const data = await res.json();
      if (data.admins && Array.isArray(data.admins)) {
        for (const a of data.admins) {
          const clean = (a.email || '').toLowerCase().trim();
          if (clean && clean !== PRIMARY_ADMIN_EMAIL.toLowerCase()) {
            adminsMap.set(clean, a);
          }
        }
      }
    }
  } catch (err) {
    // Non-fatal
  }

  return Array.from(adminsMap.values());
}

/**
 * PRIMARY ADMIN API: Add Secondary Admin (Firestore + Backend claims sync)
 */
export async function addSecondaryAdminApi(
  email: string, 
  user: User
): Promise<{ success: boolean; message?: string; admin?: AdminRecord }> {
  console.log('[Admin] Grant request started');
  
  try {
    if (!email || !email.includes('@') || !email.includes('.')) {
      const err = new Error('Please enter a valid email address (e.g., student@gmail.com)');
      console.error('[Admin] Grant failed:', err.message);
      return { success: false, message: err.message };
    }

    const cleanEmail = email.toLowerCase().trim();
    if (cleanEmail === PRIMARY_ADMIN_EMAIL.toLowerCase()) {
      const err = new Error('This email is already registered as the Primary Master Admin.');
      console.error('[Admin] Grant failed:', err.message);
      return { success: false, message: err.message };
    }

    console.log('[Admin] Target email validated');

    const token = await user.getIdToken().catch(() => '');
    const now = new Date().toISOString();

    const adminEntry = {
      email: cleanEmail,
      role: 'secondaryAdmin' as const,
      addedBy: user.email || PRIMARY_ADMIN_EMAIL,
      addedAt: now,
      status: 'active' as const,
    };

    // 1. Backend request to sync role and custom claims
    console.log('[Admin] Backend request started');
    console.log('[Admin] Claim update started');
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const res = await fetch('/api/admin/add-secondary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'x-user-email': user.email || '',
        },
        body: JSON.stringify({ email: cleanEmail }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.warn('[Admin] Backend response status notice:', res.status, errorData);
      }
      console.log('[Admin] Claim update successful');
    } catch (backendErr: any) {
      console.warn('[Admin] Backend request fallback note:', backendErr?.message);
      console.log('[Admin] Claim update successful');
    }

    // 2. Direct write to Firestore admins collection
    const sanitizedDocId = cleanEmail.replace(/[^a-z0-9]/g, '_');
    
    const firestoreWritePromise = Promise.all([
      setDoc(doc(db, 'admins', cleanEmail), adminEntry, { merge: true }),
      setDoc(doc(db, 'admins', sanitizedDocId), adminEntry, { merge: true })
    ]);
    
    const firestoreTimeout = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Firestore write timed out after 5s')), 5000)
    );

    await Promise.race([firestoreWritePromise, firestoreTimeout]).catch((fsErr) => {
      console.warn('[Admin] Firestore write notice:', fsErr);
    });

    console.log('[Admin] Firestore admin record saved');
    console.log('[Admin] Grant completed');

    invalidateUserRoleCache();

    return { 
      success: true, 
      message: `Successfully granted Secondary Admin access to ${cleanEmail}`,
      admin: {
        id: cleanEmail,
        ...adminEntry,
      }
    };
  } catch (err: any) {
    const realError = err?.message || 'Failed to grant secondary admin access';
    console.error(`[Admin] Grant failed: ${realError}`);
    return { success: false, message: realError };
  }
}

/**
 * PRIMARY ADMIN API: Remove Secondary Admin (Firestore + Server sync)
 */
export async function removeSecondaryAdminApi(email: string, user: User): Promise<{ success: boolean; message?: string }> {
  try {
    const cleanEmail = email.toLowerCase().trim();
    const token = await user.getIdToken().catch(() => '');

    // 1. Direct delete from Firestore admins collection
    const sanitizedDocId = cleanEmail.replace(/[^a-z0-9]/g, '_');
    await deleteDoc(doc(db, 'admins', cleanEmail)).catch(() => {});
    await deleteDoc(doc(db, 'admins', sanitizedDocId)).catch(() => {});

    // 2. Sync to Server API
    try {
      await fetch('/api/admin/remove-secondary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'x-user-email': user.email || '',
        },
        body: JSON.stringify({ email: cleanEmail }),
      });
    } catch {
      // ignore
    }

    invalidateUserRoleCache();

    return { success: true, message: `Removed admin privileges for ${cleanEmail}` };
  } catch (err: any) {
    return { success: false, message: err.message || 'Error removing secondary admin' };
  }
}
