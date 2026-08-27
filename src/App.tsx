import React, { useState, useEffect, useRef } from 'react';
import { User } from 'firebase/auth';
import { ParticleCanvas } from './components/ParticleCanvas';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatsRibbon } from './components/StatsRibbon';
import { FlowJourney } from './components/FlowJourney';
import { EcosystemCategories } from './components/EcosystemCategories';
import { FeaturesGrid } from './components/FeaturesGrid';
import { ReviewsSection } from './components/ReviewsSection';
import { FounderSection } from './components/FounderSection';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { SearchSpotlightModal } from './components/SearchSpotlightModal';
import { ReviewModal } from './components/ReviewModal';
import { AppDashboard } from './components/AppDashboard';
import { AdminPortal } from './components/admin/AdminPortal';
import { INITIAL_STUDENT_REVIEWS } from './data';
import { StudentReview } from './types';
import { signInWithGoogle, logOut, subscribeToAuthChanges } from './firebase/auth';
import { checkUserRole, syncUserSession } from './firebase/firestoreService';
import { resetWelcomeSession } from './firebase/welcomeSession';
import { UniFlowLogo } from './components/UniFlowLogo';
import { AuthDomainModal } from './components/AuthDomainModal';
import { ThemeProvider } from './components/dashboard/ThemeSystem';
import { CheckCircle2, AlertCircle, Sparkles, X, ShieldAlert } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [currentRoute, setCurrentRoute] = useState<string>(() => window.location.pathname || '/');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isDomainModalOpen, setIsDomainModalOpen] = useState(false);
  const [unauthorizedDomain, setUnauthorizedDomain] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<{ text: string; isError?: boolean } | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isAdminRole, setIsAdminRole] = useState<boolean | null>(null);
  const [adminCheckLoading, setAdminCheckLoading] = useState<boolean>(false);
  
  const [reviews, setReviews] = useState<StudentReview[]>(() => {
    const saved = localStorage.getItem('uniflow_student_reviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_STUDENT_REVIEWS;
      }
    }
    return INITIAL_STUDENT_REVIEWS;
  });

  // Client Navigation Helper
  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentRoute(path);
  };

  // Sync route on popstate (browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Firebase Authentication State Listener with Persistence & Auto-Sync
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
      if (firebaseUser) {
        syncUserSession(firebaseUser).catch((err) => {
          console.warn('[UniFlow] syncUserSession warning:', err);
        });
      } else {
        resetWelcomeSession();
      }
    });

    return () => unsubscribe();
  }, []);

  // Admin Verification & Protected Route Enforcement: /admin and /app
  useEffect(() => {
    if (!authLoading) {
      // Gracefully redirect legacy profile/review routes
      if (
        currentRoute === '/profile' || 
        currentRoute === '/reviews' || 
        currentRoute.startsWith('/profile/') || 
        currentRoute.startsWith('/reviews/')
      ) {
        const target = user ? '/app' : '/';
        window.history.replaceState({}, '', target);
        setCurrentRoute(target);
        return;
      }

      if (
        currentRoute === '/admin/profiles' || 
        currentRoute === '/admin/reviews' || 
        currentRoute.startsWith('/admin/profiles/') || 
        currentRoute.startsWith('/admin/reviews/')
      ) {
        const target = user ? '/admin' : '/';
        window.history.replaceState({}, '', target);
        setCurrentRoute(target);
        return;
      }

      if (currentRoute.startsWith('/app') && !user) {
        // Redirect unauthenticated user to public landing
        window.history.replaceState({}, '', '/');
        setCurrentRoute('/');
      } else if (currentRoute.startsWith('/admin')) {
        if (!user) {
          // Redirect unauthenticated user to public landing
          window.history.replaceState({}, '', '/');
          setCurrentRoute('/');
          setToastMessage({ text: 'Please sign in with Google to access the Admin Portal.', isError: true });
          setTimeout(() => setToastMessage(null), 5000);
        } else {
          // Check backend / Firestore verified admin role
          setAdminCheckLoading(true);
          checkUserRole(user).then((info) => {
            setIsAdminRole(info.isAdmin);
            setAdminCheckLoading(false);
            if (!info.isAdmin) {
              // Unauthorized users who manually open /admin must be redirected to /app
              console.warn('[UniFlow Security] Unauthorized access attempt to /admin by', user.email);
              window.history.replaceState({}, '', '/app');
              setCurrentRoute('/app');
              setToastMessage({ text: 'Access Denied: You do not have administrator privileges.', isError: true });
              setTimeout(() => setToastMessage(null), 5000);
            }
          }).catch((err) => {
            console.error('[UniFlow] Admin role check failed:', err);
            setAdminCheckLoading(false);
            window.history.replaceState({}, '', '/app');
            setCurrentRoute('/app');
          });
        }
      }
    }
  }, [authLoading, user, currentRoute]);

  // Fast High-Performance Scroll Intersection Observer
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [currentRoute]);

  // Track auth attempt ID and click timestamp to eliminate any delay/cooldown on retries
  const authAttemptIdRef = useRef(0);
  const lastClickTimeRef = useRef(0);

  // Instantly reset signing-in state whenever window regains focus (user closed popup)
  useEffect(() => {
    const handleWindowFocus = () => {
      // Window regained focus, meaning user closed popup or returned to tab
      if (isSigningIn) {
        setIsSigningIn(false);
      }
    };

    window.addEventListener('focus', handleWindowFocus);
    return () => {
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, [isSigningIn]);

  // Google Sign-In using Firebase Authentication
  const handleGoogleAuth = async () => {
    if (user) {
      console.log('[UniFlow] User already authenticated');
      console.log('[UniFlow] Navigating to /app');
      navigateTo('/app');
      return;
    }

    const now = Date.now();
    // Guard against microsecond double-clicks (<200ms) only, allowing instant retries otherwise
    if (now - lastClickTimeRef.current < 200) {
      return;
    }
    lastClickTimeRef.current = now;

    const currentAttemptId = ++authAttemptIdRef.current;
    setIsSigningIn(true);
    console.log('[UniFlow] Google authentication started (Attempt #' + currentAttemptId + ')');

    try {
      const result = await signInWithGoogle();
      
      // If a newer attempt was started in the meantime, don't overwrite state with stale response
      if (authAttemptIdRef.current !== currentAttemptId) {
        return;
      }

      if (result.user) {
        console.log('[UniFlow] Google authentication successful');
        setUser(result.user);
        console.log('[UniFlow] Navigating to /app');
        navigateTo('/app');
        setToastMessage({ text: 'Welcome to UniFlow! Signed in successfully.' });
        setTimeout(() => setToastMessage(null), 4000);
      } else if (result.isUnauthorizedDomain) {
        console.error('[UniFlow] Google authentication error (Unauthorized Domain):', result.error);
        setUnauthorizedDomain(result.domain || window.location.hostname);
        setIsDomainModalOpen(true);
      } else if (result.error) {
        console.error('[UniFlow] Google authentication error:', result.error);
        setToastMessage({ text: result.error, isError: true });
        setTimeout(() => setToastMessage(null), 6000);
      } else {
        console.log('[UniFlow] Google sign-in popup was closed by user');
      }
    } catch (err) {
      console.error('[UniFlow] Google authentication failed:', err);
      setToastMessage({ 
        text: 'Google sign-in could not be completed. Please try again.', 
        isError: true 
      });
      setTimeout(() => setToastMessage(null), 6000);
    } finally {
      // Immediately reset signing-in state if this is the active attempt
      if (authAttemptIdRef.current === currentAttemptId) {
        setIsSigningIn(false);
      }
    }
  };

  // Demo User Session Handler for rapid preview / sandbox testing
  const handleContinueDemo = () => {
    setIsDomainModalOpen(false);
    const demoUser = {
      uid: 'demo_user_preview',
      email: 'vishnukant.25bcon2366@jecrcu.edu.in',
      displayName: 'Vishnu Kant Sharma',
      photoURL: '',
      emailVerified: true,
      isAnonymous: false,
      tenantId: null,
      providerData: [{
        providerId: 'google.com',
        uid: 'demo_user_preview',
        displayName: 'Vishnu Kant Sharma',
        email: 'vishnukant.25bcon2366@jecrcu.edu.in',
        phoneNumber: null,
        photoURL: null
      }],
      getIdToken: async () => 'demo_token',
      getIdTokenResult: async () => ({
        token: 'demo_token',
        signInProvider: 'google.com',
        claims: { role: 'primaryAdmin', admin: true },
        authTime: 'now',
        issuedAtTime: 'now',
        expirationTime: 'later'
      }),
      reload: async () => {},
      toJSON: () => ({})
    } as unknown as User;

    setUser(demoUser);
    navigateTo('/app');
    setToastMessage({ text: 'Entered UniFlow in Preview Demo Mode!' });
    setTimeout(() => setToastMessage(null), 4500);
  };

  // Logout Handler
  const handleLogout = async () => {
    resetWelcomeSession();
    await logOut();
    setUser(null);
    navigateTo('/');
    setToastMessage({ text: 'Signed out successfully. See you soon!' });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddReview = (newReview: StudentReview) => {
    const updated = [newReview, ...reviews];
    setReviews(updated);
    try {
      localStorage.setItem('uniflow_student_reviews', JSON.stringify(updated));
    } catch {
      // ignore storage errors
    }
  };

  // Auth & Admin Loading Screen (while Firebase resolves session)
  if ((authLoading && (currentRoute.startsWith('/app') || currentRoute.startsWith('/admin'))) || (adminCheckLoading && currentRoute.startsWith('/admin'))) {
    return (
      <div className="min-h-screen bg-[#050508] text-white flex flex-col items-center justify-center font-sans">
        <div className="relative flex flex-col items-center">
          <div className="w-16 h-16 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin mb-4" />
          <UniFlowLogo size="md" />
          <p className="text-xs text-slate-400 mt-3 animate-pulse">
            {currentRoute.startsWith('/admin') ? 'Verifying administrator credentials...' : 'Verifying student session...'}
          </p>
        </div>
      </div>
    );
  }

  // Authenticated Protected Route: /admin (Authorized Admins Only)
  if (currentRoute.startsWith('/admin') && user && isAdminRole) {
    return (
      <>
        <AdminPortal 
          user={user} 
          onReturnToDashboard={() => navigateTo('/app')} 
          onLogout={handleLogout} 
        />

        {/* Global Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 max-w-md bg-[#120a22]/95 border border-purple-500/40 rounded-2xl p-4 shadow-[0_15px_40px_rgba(168,85,247,0.35)] backdrop-blur-xl flex items-center justify-between gap-3 animate-in slide-in-from-bottom-5 duration-200">
            <div className="flex items-center gap-3">
              {toastMessage.isError ? (
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              )}
              <p className="text-xs text-slate-200">{toastMessage.text}</p>
            </div>
            <button 
              onClick={() => setToastMessage(null)}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </>
    );
  }

  // Authenticated Protected Route: /app
  if (currentRoute.startsWith('/app') && user) {
    return (
      <>
        <AppDashboard user={user} onLogout={handleLogout} onNavigate={navigateTo} />

        {/* Global Toast for App */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 max-w-md bg-[#120a22]/95 border border-purple-500/40 rounded-2xl p-4 shadow-[0_15px_40px_rgba(168,85,247,0.35)] backdrop-blur-xl flex items-center justify-between gap-3 animate-in slide-in-from-bottom-5 duration-200">
            <div className="flex items-center gap-3">
              {toastMessage.isError ? (
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              )}
              <p className="text-xs text-slate-200">{toastMessage.text}</p>
            </div>
            <button 
              onClick={() => setToastMessage(null)}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </>
    );
  }

  // Public Landing Page: /
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#FAF9F5] dark:bg-[#06040e] text-slate-900 dark:text-slate-100 selection:bg-purple-600 selection:text-white relative font-sans transition-colors duration-300 overflow-x-hidden">
        {/* Dynamic Cosmic Particle Canvas */}
        <ParticleCanvas />

        {/* Floating Header Navigation */}
        <Navbar 
          onOpenAuth={handleGoogleAuth}
          onOpenSearch={() => setIsSearchOpen(true)}
          isSigningIn={isSigningIn}
        />

        {/* Main Content Sections with Fast Scroll Reveal */}
        <main className="relative z-10">
          <div className="scroll-reveal is-visible">
            <HeroSection
              onOpenAuth={handleGoogleAuth}
              onOpenSearch={() => setIsSearchOpen(true)}
              isSigningIn={isSigningIn}
            />
          </div>

          <div className="scroll-reveal">
            <StatsRibbon />
          </div>

          <div className="scroll-reveal">
            <EcosystemCategories
              onOpenAuth={handleGoogleAuth}
            />
          </div>

          <div className="scroll-reveal">
            <FlowJourney />
          </div>

          <div className="scroll-reveal">
            <FeaturesGrid />
          </div>

          <div className="scroll-reveal">
            <ReviewsSection
              reviews={reviews}
              onOpenReviewModal={() => setIsReviewModalOpen(true)}
            />
          </div>

          <div className="scroll-reveal">
            <FounderSection />
          </div>

          <div className="scroll-reveal">
            <FinalCta
              onOpenAuth={handleGoogleAuth}
              isSigningIn={isSigningIn}
            />
          </div>
        </main>

        {/* Refined Minimal Footer */}
        <Footer />

        {/* Interactive Global Modals */}
        <SearchSpotlightModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />

        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          onSubmitReview={handleAddReview}
        />

        {/* Firebase Domain Setup & Authorization Helper Modal */}
        <AuthDomainModal
          isOpen={isDomainModalOpen}
          domain={unauthorizedDomain}
          onClose={() => setIsDomainModalOpen(false)}
          onRetry={() => {
            setIsDomainModalOpen(false);
            handleGoogleAuth();
          }}
          onContinueDemo={handleContinueDemo}
        />

        {/* Fast Non-Intrusive Floating Google Auth Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 max-w-md bg-white/95 dark:bg-[#120a22]/95 border border-slate-200 dark:border-purple-500/40 rounded-2xl p-4 shadow-[0_15px_40px_rgba(124,58,237,0.15)] dark:shadow-[0_15px_40px_rgba(168,85,247,0.35)] backdrop-blur-xl flex items-center justify-between gap-3 animate-in slide-in-from-bottom-5 duration-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-1.5 shrink-0 shadow-md">
                <svg className="w-full h-full" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Google Authentication</span>
                  {toastMessage.isError ? (
                    <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  )}
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-snug">{toastMessage.text}</p>
              </div>
            </div>
            <button 
              onClick={() => setToastMessage(null)}
              className="p-1 text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

