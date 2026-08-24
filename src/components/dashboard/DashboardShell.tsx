import React, { useState, useEffect } from 'react';
import { DashboardPageId, DashboardShellProps } from './types';
import { DesktopNavRail } from './DesktopNavRail';
import { TopBar } from './TopBar';
import { MobilePushMenu } from './MobilePushMenu';
import { MobileBottomNav } from './MobileBottomNav';
import { DashboardHome } from './DashboardHome';
import { 
  Semester1Page,
  Semester2Page,
  Semester3Page,
  StudyResourcesPage,
  BooksPage,
  EntertainmentPage,
  GamesPage,
  AIPage,
  StudentAppsPage,
  SocialMediaAppsPage,
  SettingsPage 
} from './DashboardPages';
import { ThemeProvider, useTheme } from './ThemeSystem';
import { PasswordGateProvider } from './passwordGate/PasswordGateContext';
import { useResponsiveBreakpoint } from './useResponsiveBreakpoint';
import { Search, BookOpen, Bot, LayoutGrid, X } from 'lucide-react';
import { parseRoute, navigate, initializeHistory } from './navigationRouter';

interface DashboardContentProps extends DashboardShellProps {
  onNavigate?: (path: string) => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ user, onLogout, onNavigate }) => {
  const [activePage, setActivePage] = useState<DashboardPageId>(() => {
    return parseRoute(typeof window !== 'undefined' ? window.location.pathname : '/app').page;
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const pushedTouchStartXRef = React.useRef<number | null>(null);

  const mainScrollRef = React.useRef<HTMLDivElement>(null);

  // Initialize and synchronize history
  useEffect(() => {
    initializeHistory();
    const handlePopState = () => {
      const parsed = parseRoute(window.location.pathname);
      setActivePage(parsed.page);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Responsive Breakpoint Hook
  // Mobile: < 768px | Tablet: 768px-1199px | Desktop: 1200px+
  const { isDesktop, isTablet, isMobile } = useResponsiveBreakpoint();

  // Close mobile push drawer immediately when resizing or transitioning to Desktop
  useEffect(() => {
    if (isDesktop && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isDesktop, isMobileMenuOpen]);

  // Push-back is STRICTLY restricted to mobile and tablet (< 1200px)
  const isPushed = !isDesktop && isMobileMenuOpen;

  const handlePushedTouchStart = (e: React.TouchEvent) => {
    if (isPushed) {
      pushedTouchStartXRef.current = e.touches[0].clientX;
    }
  };

  const handlePushedTouchEnd = (e: React.TouchEvent) => {
    if (!isPushed || pushedTouchStartXRef.current === null) return;
    const diff = pushedTouchStartXRef.current - e.changedTouches[0].clientX;
    // Swipe left (more than 30px) closes the menu
    if (diff > 30) {
      setIsMobileMenuOpen(false);
    }
    pushedTouchStartXRef.current = null;
  };

  const { resolvedTheme, colors } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // Global Keyboard Shortcuts (⌘K for search, Esc to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectPage = (page: DashboardPageId) => {
    if (page === 'admin') {
      if (onNavigate) {
        onNavigate('/admin');
      } else {
        navigate('/admin');
      }
      return;
    }
    const targetPath = page === 'home' ? '/app' : `/app/${page}`;
    navigate(targetPath);
    setActivePage(page);
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return (
          <DashboardHome
            user={user}
            onSelectPage={handleSelectPage}
            onOpenSearch={() => setIsSearchOpen(true)}
          />
        );
      case 'semester-1':
        return <Semester1Page />;
      case 'semester-2':
        return <Semester2Page />;
      case 'semester-3':
        return <Semester3Page />;
      case 'study-resources':
        return <StudyResourcesPage />;
      case 'books':
        return <BooksPage />;
      case 'entertainment':
        return <EntertainmentPage />;
      case 'games':
        return <GamesPage />;
      case 'ai':
        return <AIPage />;
      case 'student-apps':
        return <StudentAppsPage />;
      case 'social-media-apps':
        return <SocialMediaAppsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return (
          <DashboardHome
            user={user}
            onSelectPage={handleSelectPage}
            onOpenSearch={() => setIsSearchOpen(true)}
          />
        );
    }
  };

  return (
    <div 
      style={{
        backgroundColor: colors.pushUnderlayer,
        color: colors.primaryText,
      }}
      className="h-[100dvh] max-h-[100dvh] w-full relative overflow-hidden flex transition-colors duration-300 font-sans"
    >
      {/* LAYER 1: Deep Atmospheric Background (Active during Mobile/Tablet Push-Back) */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none fixed inset-0 overflow-hidden z-0 select-none transition-opacity duration-350"
        style={{
          opacity: isPushed ? 1 : 0.45,
        }}
      >
        {isDark ? (
          <>
            {/* Top-Left Violet Aura */}
            <div className="absolute -top-28 -left-20 w-[420px] md:w-[540px] h-[420px] md:h-[540px] rounded-full bg-violet-600/12 blur-[120px] transition-transform duration-500" />
            {/* Mid-Left Magenta/Fuchsia Refraction */}
            <div className="absolute top-1/3 -left-24 w-[340px] md:w-[440px] h-[340px] md:h-[440px] rounded-full bg-fuchsia-600/8 blur-[130px]" />
            {/* Bottom Indigo Aura */}
            <div className="absolute bottom-10 left-6 w-[380px] md:w-[480px] h-[380px] md:h-[480px] rounded-full bg-indigo-900/20 blur-[130px]" />
            {/* Subtle Amber Warm Shimmer */}
            <div className="absolute top-2/3 left-[clamp(60px,16vw,200px)] w-48 h-48 rounded-full bg-amber-500/6 blur-[90px]" />
          </>
        ) : (
          <>
            <div className="absolute -top-28 -left-20 w-[420px] md:w-[540px] h-[420px] md:h-[540px] rounded-full bg-violet-400/15 blur-[100px]" />
            <div className="absolute top-1/3 -left-24 w-[340px] md:w-[440px] h-[340px] md:h-[440px] rounded-full bg-fuchsia-300/12 blur-[110px]" />
            <div className="absolute bottom-10 left-6 w-[380px] md:w-[480px] h-[380px] md:h-[480px] rounded-full bg-indigo-200/20 blur-[110px]" />
            <div className="absolute top-2/3 left-[clamp(60px,16vw,200px)] w-48 h-48 rounded-full bg-amber-300/15 blur-[80px]" />
          </>
        )}
      </div>

      {/* LAYER 2: Large Subtle UniFlow Watermark in Exposed Background Gap (Mobile/Tablet Push only) */}
      <div
        aria-hidden="true"
        style={{
          opacity: isPushed ? (isDark ? 0.07 : 0.045) : 0,
          transform: isPushed 
            ? 'scale(1) translate3d(0, -50%, 0)' 
            : 'scale(0.9) translate3d(-20px, -50%, 0)',
          transition: 'opacity 350ms cubic-bezier(0.22, 1, 0.36, 1), transform 350ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
        className="pointer-events-none fixed top-1/2 left-[clamp(16px,6vw,70px)] z-1 select-none will-change-[transform,opacity]"
      >
        <div className="relative w-[220px] sm:w-[280px] md:w-[340px] h-[220px] sm:h-[280px] md:h-[340px] flex items-center justify-center">
          <div 
            className="absolute inset-0 rounded-full blur-2xl opacity-60"
            style={{
              background: isDark 
                ? 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(236, 72, 153, 0.15) 50%, transparent 70%)'
                : 'radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, rgba(245, 158, 11, 0.12) 50%, transparent 70%)'
            }}
          />

          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-[0_8px_30px_rgba(139,92,246,0.35)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="uf-shell-u-gradient" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="30%" stopColor="#a855f7" />
                <stop offset="65%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
              <linearGradient id="uf-shell-orbit-gradient" x1="10" y1="35" x2="90" y2="65" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="45%" stopColor="#f472b6" />
                <stop offset="80%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#fde047" />
              </linearGradient>
              <linearGradient id="uf-shell-glass-sheen" x1="30" y1="20" x2="70" y2="80" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="35%" stopColor="#ffffff" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="uf-shell-depth-shade" x1="50" y1="30" x2="50" y2="85" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#000000" stopOpacity="0" />
                <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Back half of the Cosmic Orbit */}
            <path
              d="M 16,46 C 14,38 38,28 72,32 C 86,34 92,39 88,45"
              stroke="url(#uf-shell-orbit-gradient)"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeOpacity="0.7"
            />

            {/* 3D Glass Letter 'U' Solid Base Body */}
            <path
              d="M 28,24 C 28,20.7 30.7,18 34,18 C 37.3,18 40,20.7 40,24 L 40,54 C 40,59.5 44.5,64 50,64 C 55.5,64 60,59.5 60,54 L 60,24 C 60,20.7 62.7,18 66,18 C 69.3,18 72,20.7 72,24 L 72,54 C 72,66.1 62.1,76 50,76 C 37.9,76 28,66.1 28,54 Z"
              fill="url(#uf-shell-u-gradient)"
            />

            {/* Depth shade */}
            <path
              d="M 28,24 C 28,20.7 30.7,18 34,18 C 37.3,18 40,20.7 40,24 L 40,54 C 40,59.5 44.5,64 50,64 C 55.5,64 60,59.5 60,54 L 60,24 C 60,20.7 62.7,18 66,18 C 69.3,18 72,20.7 72,24 L 72,54 C 72,66.1 62.1,76 50,76 C 37.9,76 28,66.1 28,54 Z"
              fill="url(#uf-shell-depth-shade)"
            />

            {/* Glossy Sheens */}
            <path
              d="M 30,24 C 30,22 31.5,20.5 33.5,20.5 C 35.5,20.5 37,22 37,24 L 37,52 C 37,56 34,60 30,62 Z"
              fill="url(#uf-shell-glass-sheen)"
              opacity="0.85"
            />
            <path
              d="M 63,24 C 63,22 64.5,20.5 66.5,20.5 C 68.5,20.5 70,22 70,24 L 70,52 C 70,56 67,60 63,62 Z"
              fill="url(#uf-shell-glass-sheen)"
              opacity="0.7"
            />

            {/* Front half of the Cosmic Orbit */}
            <path
              d="M 88,45 C 84,54 62,68 28,66 C 16,65 12,58 16,46"
              stroke="url(#uf-shell-orbit-gradient)"
              strokeWidth="3.8"
              strokeLinecap="round"
            />

            {/* Specular Streak */}
            <path
              d="M 80,49 C 68,60 44,64 26,60"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeOpacity="0.9"
            />

            {/* Star Flare */}
            <g transform="translate(76, 28)">
              <path
                d="M 0,-7 Q 0,0 7,0 Q 0,0 0,7 Q 0,0 -7,0 Q 0,0 0,-7 Z"
                fill="#ffffff"
              />
              <circle cx="0" cy="0" r="1.5" fill="#fef08a" />
            </g>
          </svg>
        </div>
      </div>

      {/* LAYER 3: Mobile/Tablet Push Drawer Menu (< 1200px only) */}
      {!isDesktop && (
        <MobilePushMenu
          isOpen={isPushed}
          onClose={() => setIsMobileMenuOpen(false)}
          activePage={activePage}
          onSelectPage={handleSelectPage}
          user={user}
          onLogout={onLogout}
        />
      )}

      {/* Desktop Navigation Rail (>= 1200px TRUE Desktop Sidebar) */}
      <DesktopNavRail
        activePage={activePage}
        user={user}
        onSelectPage={handleSelectPage}
        onLogout={onLogout}
        isCollapsed={isDesktopCollapsed}
        onToggleCollapse={() => setIsDesktopCollapsed((prev) => !prev)}
      />

      {/* LAYER 4: Main Dashboard Application Wrapper (3D Push Frame) */}
      <div
        onTouchStart={handlePushedTouchStart}
        onTouchEnd={handlePushedTouchEnd}
        style={{
          transformOrigin: 'center center',
          transform: isPushed 
            ? (isTablet 
                ? 'translate3d(clamp(220px, 45vw, 305px), 0, 0) scale(0.80)' 
                : 'translate3d(clamp(195px, 58vw, 260px), 0, 0) scale(0.80)')
            : 'translate3d(0, 0, 0) scale(1)',
          willChange: isPushed ? 'transform' : 'auto',
          borderRadius: isPushed ? '32px' : '0px',
          boxShadow: isPushed 
            ? (isDark 
                ? '0 30px 70px -15px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.08), 0 10px 40px -10px rgba(139, 92, 246, 0.15)' 
                : '0 30px 70px -15px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(0, 0, 0, 0.06), 0 10px 40px -10px rgba(124, 58, 237, 0.08)') 
            : 'none',
          backgroundColor: colors.background,
          transition: isPushed
            ? 'transform 340ms cubic-bezier(0.22, 1, 0.36, 1), border-radius 340ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 340ms cubic-bezier(0.22, 1, 0.36, 1)'
            : 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1), border-radius 300ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 300ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
        className="flex-1 flex flex-col h-[100dvh] max-h-[100dvh] w-full z-30 overflow-hidden relative"
      >
        {/* Overlay to close mobile menu on tap or swipe when pushed */}
        {isPushed && (
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            onTouchStart={handlePushedTouchStart}
            onTouchEnd={handlePushedTouchEnd}
            className="absolute inset-0 z-50 bg-transparent cursor-pointer"
          />
        )}

        {/* Scrollable Page Body - handles vertical scroll smoothly while bottom nav remains fixed to the frame */}
        <div 
          ref={mainScrollRef}
          className="flex-1 w-full h-full overflow-y-auto overflow-x-hidden flex flex-col"
        >
          {/* TopBar (Single Brand & Page Title, Theme Selector) */}
          <TopBar
            activePage={activePage}
            user={user}
            onOpenSearch={() => setIsSearchOpen(true)}
            onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
            isMobileMenuOpen={isPushed}
          />

          {/* Dynamic Page View Area (Full Desktop Workspace) */}
          <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6 pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] md:pb-12 max-w-7xl mx-auto flex flex-col">
            {renderActivePage()}
          </main>
        </div>

        {/* Mobile Bottom Navigation Bar (< 768px only) - fixed to the bottom of the main frame */}
        {isMobile && (
          <MobileBottomNav
            activePage={activePage}
            onSelectPage={handleSelectPage}
          />
        )}
      </div>

      {/* Global Search Modal (Command Palette) */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-md animate-fadeIn">
          <div
            style={{
              backgroundColor: isDark ? '#11121A' : '#FFFFFF',
              borderColor: colors.border,
            }}
            className="w-full max-w-lg rounded-2xl border shadow-2xl overflow-hidden p-4 space-y-4"
          >
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: colors.borderSubtle }}>
              <div className="flex items-center gap-2.5 flex-1">
                <Search className="w-5 h-5 text-zinc-400" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search UniFlow notes, AI tools, games, exams..."
                  style={{ color: colors.primaryText }}
                  className="w-full bg-transparent text-sm focus:outline-none placeholder:text-zinc-500"
                />
              </div>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Links */}
            <div className="space-y-1">
              <span style={{ color: colors.mutedText }} className="text-[11px] font-semibold px-2 uppercase tracking-wider">
                Quick Shortcuts
              </span>
              {[
                { title: 'AI Assistant', page: 'ai' as DashboardPageId, icon: Bot },
                { title: 'Study Resources', page: 'study-resources' as DashboardPageId, icon: BookOpen },
                { title: 'Student Apps', page: 'student-apps' as DashboardPageId, icon: LayoutGrid },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      handleSelectPage(item.page);
                    }}
                    style={{ color: colors.primaryText }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium cursor-pointer transition-colors ${
                      isDark ? 'hover:bg-zinc-800/60' : 'hover:bg-zinc-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-violet-400" />
                    <span>{item.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const DashboardShell: React.FC<DashboardShellProps> = (props) => {
  return (
    <ThemeProvider>
      <PasswordGateProvider>
        <DashboardContent {...props} />
      </PasswordGateProvider>
    </ThemeProvider>
  );
};
