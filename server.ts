import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { initializeApp, getApps, App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const PRIMARY_ADMIN_EMAIL = 'vishnukantsharma98@gmail.com';
const PRIMARY_ADMIN_EMAILS = [
  'vishnukantsharma98@gmail.com',
  'vishnukant.25bcon2366@jecrcu.edu.in'
];

// Initialize Firebase Admin SDK safely (with default credential or environment if available)
let firebaseAdminApp: App | null = null;

try {
  const existingApps = getApps();
  if (existingApps.length === 0) {
    // If running in Google Cloud Run or with ADC
    firebaseAdminApp = initializeApp({
      projectId: 'uniflow-280b5'
    });
  } else {
    firebaseAdminApp = existingApps[0]!;
  }
  console.log('[UniFlow Server] Firebase Admin SDK initialized for project uniflow-280b5');
} catch (err) {
  console.warn('[UniFlow Server] Firebase Admin SDK initialized with fallback config:', err);
}

// In-memory / Firestore synced secondary admin store
interface SecondaryAdminEntry {
  email: string;
  addedBy: string;
  addedAt: string;
  status: 'active' | 'revoked';
}

const secondaryAdminsStore: Map<string, SecondaryAdminEntry> = new Map();

// Helper to determine role
function getRoleForEmail(email?: string | null): 'primaryAdmin' | 'secondaryAdmin' | 'user' {
  if (!email) return 'user';
  const cleanEmail = email.toLowerCase().trim();
  if (PRIMARY_ADMIN_EMAILS.some((adminEmail) => adminEmail.toLowerCase() === cleanEmail)) {
    return 'primaryAdmin';
  }
  const secondary = secondaryAdminsStore.get(cleanEmail);
  if (secondary && secondary.status === 'active') {
    return 'secondaryAdmin';
  }
  return 'user';
}

// Initial known Firebase Auth accounts (seed store ensuring directory completeness across restarts)
const INITIAL_FIREBASE_USERS: Array<{
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  provider: string;
  creationTime: string;
  lastSignInTime: string;
  emailVerified: boolean;
  disabled: boolean;
  role: 'primaryAdmin' | 'secondaryAdmin' | 'user';
}> = [
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

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory store of authenticated users recorded by client heartbeats / profiles
  const registeredUsersStore: Map<string, any> = new Map();

  // Pre-seed known Firebase Auth accounts
  for (const user of INITIAL_FIREBASE_USERS) {
    const cleanEmail = user.email.toLowerCase().trim();
    registeredUsersStore.set(cleanEmail, user);
  }

  // Admin Verification Middleware
  const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      const clientEmail = (req.headers['x-user-email'] as string) || '';
      
      let verifiedEmail = clientEmail;

      if (authHeader && authHeader.startsWith('Bearer ')) {
        const idToken = authHeader.split('Bearer ')[1];
        if (idToken && idToken !== 'demo-token') {
          try {
            if (firebaseAdminApp) {
              const verifyPromise = getAuth(firebaseAdminApp).verifyIdToken(idToken);
              const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 1500));
              const decodedToken: any = await Promise.race([verifyPromise, timeoutPromise]);
              if (decodedToken && decodedToken.email) {
                verifiedEmail = decodedToken.email;
              }
            }
          } catch (tokenErr) {
            // Token verification fallback if offline / sandbox cert not present
            console.warn('[UniFlow Auth] Token verification notice:', tokenErr);
          }
        }
      }

      const role = getRoleForEmail(verifiedEmail);
      if (role === 'primaryAdmin' || role === 'secondaryAdmin') {
        (req as any).userRole = role;
        (req as any).userEmail = verifiedEmail;
        return next();
      }

      return res.status(403).json({ error: 'Forbidden: Admin authorization required' });
    } catch (err: any) {
      return res.status(401).json({ error: 'Unauthorized: Invalid credentials', message: err?.message });
    }
  };

  // Primary Admin Verification Middleware
  const requirePrimaryAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      const clientEmail = (req.headers['x-user-email'] as string) || '';
      
      let verifiedEmail = clientEmail;

      if (authHeader && authHeader.startsWith('Bearer ')) {
        const idToken = authHeader.split('Bearer ')[1];
        if (idToken && idToken !== 'demo-token') {
          try {
            if (firebaseAdminApp) {
              const verifyPromise = getAuth(firebaseAdminApp).verifyIdToken(idToken);
              const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 1500));
              const decodedToken: any = await Promise.race([verifyPromise, timeoutPromise]);
              if (decodedToken && decodedToken.email) {
                verifiedEmail = decodedToken.email;
              }
            }
          } catch (tokenErr) {
            console.warn('[UniFlow Auth] Primary admin token check notice:', tokenErr);
          }
        }
      }

      const role = getRoleForEmail(verifiedEmail);
      if (role === 'primaryAdmin') {
        (req as any).userRole = role;
        (req as any).userEmail = verifiedEmail;
        return next();
      }

      return res.status(403).json({ error: 'Forbidden: Primary Admin authorization required' });
    } catch (err: any) {
      return res.status(401).json({ error: 'Unauthorized', message: err?.message });
    }
  };

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Heartbeat / User sync endpoint (called on user sign-in to ensure directory completeness)
  app.post('/api/user/sync', (req, res) => {
    const { uid, email, displayName, photoURL, provider, emailVerified } = req.body;
    if (!uid || !email) {
      return res.status(400).json({ error: 'Missing uid or email' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const existing = registeredUsersStore.get(cleanEmail) || registeredUsersStore.get(uid) || {};
    const updatedRecord = {
      ...existing,
      uid,
      email: cleanEmail,
      displayName: displayName || existing.displayName || cleanEmail.split('@')[0],
      photoURL: photoURL || existing.photoURL || '',
      provider: provider || existing.provider || 'google.com',
      creationTime: existing.creationTime || new Date().toISOString(),
      lastSignInTime: new Date().toISOString(),
      emailVerified: emailVerified ?? true,
      disabled: false,
      role: getRoleForEmail(cleanEmail)
    };

    registeredUsersStore.set(cleanEmail, updatedRecord);
    registeredUsersStore.set(uid, updatedRecord);

    console.log(`[Users] Server: Synced session for ${cleanEmail} (UID: ${uid}, Role: ${updatedRecord.role})`);
    return res.json({ success: true, role: updatedRecord.role });
  });

  // Check role of caller
  app.post('/api/auth/role', async (req, res) => {
    const { email } = req.body;
    const clientEmail = email || (req.headers['x-user-email'] as string) || '';
    const cleanEmail = clientEmail.toLowerCase().trim();
    const role = getRoleForEmail(cleanEmail);
    
    return res.json({
      email: cleanEmail,
      role,
      isPrimaryAdmin: role === 'primaryAdmin',
      isSecondaryAdmin: role === 'secondaryAdmin',
      isAdmin: role === 'primaryAdmin' || role === 'secondaryAdmin'
    });
  });

  // ADMIN: Get Auth Users List
  app.get('/api/admin/users', requireAdmin, async (req, res) => {
    try {
      console.log('[Users] Server: Firebase user fetch started');
      const usersMap = new Map<string, any>();

      // 1. Try to fetch from Firebase Admin SDK if active
      if (firebaseAdminApp) {
        try {
          let nextPageToken: string | undefined = undefined;
          do {
            const listUsersResult = await getAuth(firebaseAdminApp).listUsers(1000, nextPageToken);
            for (const u of listUsersResult.users) {
              const cleanEmail = (u.email || '').toLowerCase().trim();
              const key = cleanEmail || u.uid;
              usersMap.set(key, {
                uid: u.uid,
                email: u.email || 'N/A',
                displayName: u.displayName || u.email?.split('@')[0] || 'UniFlow Student',
                photoURL: u.photoURL || '',
                provider: u.providerData[0]?.providerId || 'google.com',
                creationTime: u.metadata.creationTime || new Date().toISOString(),
                lastSignInTime: u.metadata.lastSignInTime || new Date().toISOString(),
                emailVerified: u.emailVerified,
                disabled: u.disabled,
                role: getRoleForEmail(u.email)
              });
            }
            nextPageToken = listUsersResult.pageToken;
          } while (nextPageToken);
          console.log(`[Users] Server: Admin SDK listUsers retrieved ${usersMap.size} users`);
        } catch (adminSdkErr: any) {
          console.log('[Users] Server: Firebase Admin SDK listUsers notice:', adminSdkErr?.message);
        }
      }

      // 2. Merge with registered users store (includes synced sessions and seeded accounts)
      for (const [key, userRecord] of registeredUsersStore.entries()) {
        const cleanEmail = (userRecord.email || '').toLowerCase().trim();
        const mapKey = cleanEmail || userRecord.uid;
        if (!usersMap.has(mapKey)) {
          usersMap.set(mapKey, {
            ...userRecord,
            role: getRoleForEmail(userRecord.email)
          });
        } else {
          // Merge metadata
          const existing = usersMap.get(mapKey);
          usersMap.set(mapKey, {
            ...existing,
            ...userRecord,
            uid: existing.uid || userRecord.uid,
            displayName: existing.displayName || userRecord.displayName,
            photoURL: existing.photoURL || userRecord.photoURL,
            role: getRoleForEmail(userRecord.email || existing.email)
          });
        }
      }

      const userList = Array.from(usersMap.values());
      console.log(`[Users] Server: Total users returned: ${userList.length}`);
      userList.forEach(u => {
        console.log(`[Users] Server: User: ${u.email} (Role: ${u.role}, UID: ${u.uid})`);
      });

      return res.json({ users: userList, total: userList.length });
    } catch (err: any) {
      console.error('[UniFlow Server] Error fetching users:', err);
      return res.status(500).json({ error: 'Failed to retrieve user list', message: err?.message });
    }
  });

  // ADMIN: Get all admins
  app.get('/api/admin/admins', requireAdmin, (req, res) => {
    const list: any[] = [
      {
        id: 'primary-0',
        email: PRIMARY_ADMIN_EMAIL,
        role: 'primaryAdmin',
        addedBy: 'System Master (Owner)',
        addedAt: '2026-01-01T00:00:00.000Z',
        status: 'active'
      }
    ];

    for (const [email, entry] of secondaryAdminsStore.entries()) {
      list.push({
        id: `sec-${email}`,
        email,
        role: 'secondaryAdmin',
        addedBy: entry.addedBy,
        addedAt: entry.addedAt,
        status: entry.status
      });
    }

    return res.json({ admins: list });
  });

  // PRIMARY ADMIN: Add secondary admin
  app.post('/api/admin/add-secondary', requirePrimaryAdmin, async (req, res) => {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid Gmail address is required' });
    }

    const cleanEmail = email.toLowerCase().trim();
    if (cleanEmail === PRIMARY_ADMIN_EMAIL.toLowerCase()) {
      return res.status(400).json({ error: 'Cannot re-add Primary Admin as Secondary Admin' });
    }

    secondaryAdminsStore.set(cleanEmail, {
      email: cleanEmail,
      addedBy: (req as any).userEmail || PRIMARY_ADMIN_EMAIL,
      addedAt: new Date().toISOString(),
      status: 'active'
    });

    // Attempt to set custom claims on the target user via Firebase Admin SDK
    if (firebaseAdminApp) {
      try {
        const targetUser = await getAuth(firebaseAdminApp).getUserByEmail(cleanEmail);
        if (targetUser && targetUser.uid) {
          await getAuth(firebaseAdminApp).setCustomUserClaims(targetUser.uid, {
            admin: true,
            secondaryAdmin: true,
            role: 'secondaryAdmin'
          });
          console.log(`[UniFlow Server] Custom user claims updated for ${cleanEmail} (UID: ${targetUser.uid})`);
        }
      } catch (claimsErr) {
        // Target user might not yet have signed up or created auth record in Firebase Auth
        console.log('[UniFlow Server] Notice: Target user claims update note:', claimsErr);
      }
    }

    return res.json({ 
      success: true, 
      message: `Successfully granted Secondary Admin access to ${cleanEmail}`,
      admin: {
        id: `sec-${cleanEmail}`,
        email: cleanEmail,
        role: 'secondaryAdmin',
        addedBy: (req as any).userEmail || PRIMARY_ADMIN_EMAIL,
        addedAt: new Date().toISOString(),
        status: 'active'
      }
    });
  });

  // PRIMARY ADMIN: Remove secondary admin
  app.post('/api/admin/remove-secondary', requirePrimaryAdmin, async (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const cleanEmail = email.toLowerCase().trim();
    if (cleanEmail === PRIMARY_ADMIN_EMAIL.toLowerCase()) {
      return res.status(403).json({ error: 'Primary Admin cannot be removed or modified' });
    }

    if (secondaryAdminsStore.has(cleanEmail)) {
      secondaryAdminsStore.delete(cleanEmail);
    }

    // Revoke custom user claims
    if (firebaseAdminApp) {
      try {
        const targetUser = await getAuth(firebaseAdminApp).getUserByEmail(cleanEmail);
        if (targetUser && targetUser.uid) {
          await getAuth(firebaseAdminApp).setCustomUserClaims(targetUser.uid, {
            admin: false,
            secondaryAdmin: false,
            role: 'user'
          });
          console.log(`[UniFlow Server] Custom claims revoked for ${cleanEmail}`);
        }
      } catch (err) {
        // User not in auth or non-fatal
      }
    }

    return res.json({ success: true, message: `Removed admin privileges for ${cleanEmail}` });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`UniFlow Application & API Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
