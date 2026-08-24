import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  User, 
  AuthError,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth } from './config';

export interface AuthResult {
  user: User | null;
  error: string | null;
  errorCode?: string;
  domain?: string;
  isUnauthorizedDomain?: boolean;
}

/**
 * Initiates Firebase Google Authentication using a direct popup flow from user interaction.
 * Resets immediately on cancellation or error with no cooldown delays.
 */
export async function signInWithGoogle(): Promise<AuthResult> {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });

  try {
    const result = await signInWithPopup(auth, provider);
    return {
      user: result.user,
      error: null
    };
  } catch (err: unknown) {
    const authError = err as AuthError;
    const errorCode = authError?.code || '';
    const currentDomain = typeof window !== 'undefined' ? window.location.hostname : '';
    
    // Popup closed or cancelled by user: immediate silent recovery without any delay or error spam
    if (
      errorCode === 'auth/popup-closed-by-user' ||
      errorCode === 'auth/cancelled-popup-request' ||
      errorCode === 'auth/user-cancelled'
    ) {
      console.info('[UniFlow] Sign-in popup cancelled by user.');
      return {
        user: null,
        error: null,
        errorCode
      };
    }

    console.error('[UniFlow] Firebase Auth Error:', errorCode, authError);

    if (errorCode === 'auth/unauthorized-domain') {
      return {
        user: null,
        error: `Domain "${currentDomain}" is not authorized in Firebase Console. Please add it to your Firebase Authentication Authorized Domains list.`,
        errorCode,
        domain: currentDomain,
        isUnauthorizedDomain: true
      };
    }

    if (errorCode === 'auth/popup-blocked') {
      return {
        user: null,
        error: 'Sign-in popup was blocked by your browser. Please allow popups for this site and try again.',
        errorCode
      };
    }

    if (errorCode === 'auth/network-request-failed') {
      return {
        user: null,
        error: 'Network connection issue during Google sign-in. Please check your connection and try again.',
        errorCode
      };
    }

    if (errorCode === 'auth/operation-not-allowed') {
      return {
        user: null,
        error: 'Google sign-in is not enabled in Firebase Console. Please enable Google provider under Authentication -> Sign-in method.',
        errorCode
      };
    }

    // Default friendly message
    return {
      user: null,
      error: authError?.message || 'Google sign-in could not be completed. Please try again.',
      errorCode
    };
  }
}

/**
 * Signs out the current Firebase user and returns to public landing.
 */
export async function logOut(): Promise<{ success: boolean; error: string | null }> {
  try {
    await signOut(auth);
    return { success: true, error: null };
  } catch {
    return { success: false, error: 'Failed to sign out. Please try again.' };
  }
}

/**
 * Subscribes to Firebase Authentication state listener.
 */
export function subscribeToAuthChanges(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}
