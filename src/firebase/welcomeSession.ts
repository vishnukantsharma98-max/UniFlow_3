// Session manager for Welcome to Uniflix popup triggered by Firebase Authentication
// Resets on page refresh, browser reload, or when a user logs out / logs in.

let activeSessionUserUid: string | null = null;
let hasShownInCurrentSession = false;

/**
 * Checks if the welcome popup should be shown for the authenticated Firebase user.
 * Returns true if this is the first Home entry for this authenticated session.
 */
export function shouldShowWelcomePopup(userUid: string): boolean {
  if (!userUid) return false;

  // If user changed (e.g. switched accounts), treat as new session
  if (activeSessionUserUid !== userUid) {
    activeSessionUserUid = userUid;
    hasShownInCurrentSession = false;
    return true;
  }

  // If same user in current session, only show if not yet shown
  return !hasShownInCurrentSession;
}

/**
 * Marks the welcome popup as shown for the current authenticated session.
 */
export function markWelcomePopupShown(userUid: string): void {
  activeSessionUserUid = userUid;
  hasShownInCurrentSession = true;
}

/**
 * Resets the welcome session on user logout or session termination.
 */
export function resetWelcomeSession(): void {
  activeSessionUserUid = null;
  hasShownInCurrentSession = false;
}
