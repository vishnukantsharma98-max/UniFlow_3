import React, { useState, useEffect } from 'react';
import { Search, Moon, Sun, Monitor, Menu, X } from 'lucide-react';
import { User } from 'firebase/auth';
import { DashboardPageId } from './types';
import { useTheme } from './ThemeSystem';

interface TopBarProps {
  activePage: DashboardPageId;
  user: User;
  onOpenSearch?: () => void;
  onToggleMobileMenu?: () => void;
  isMobileMenuOpen?: boolean;
}

const PAGE_TITLES: Record<DashboardPageId, string> = {
  home: 'Home',
  'semester-1': 'Semester 1',
  'semester-2': 'Semester 2',
  'semester-3': 'Semester 3',
  'study-resources': 'Study Resources',
  books: 'Books',
  entertainment: 'Entertainment',
  games: 'Games',
  ai: 'AI',
  'student-apps': 'Student Apps',
  'social-media-apps': 'Social Media Apps',
  settings: 'Settings',
  admin: 'Admin Portal',
};

export const TopBar: React.FC<TopBarProps> = ({
  activePage,
  user,
  onOpenSearch,
  onToggleMobileMenu,
  isMobileMenuOpen = false,
}) => {
  const { theme, resolvedTheme, setTheme, colors } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    const handleScroll = (e?: Event) => {
      const target = e?.target as HTMLElement | undefined;
      const scrollY = (target && typeof target.scrollTop === 'number' && target.scrollTop > 0) 
        ? target.scrollTop 
        : window.scrollY;
      setIsScrolled(scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll, { capture: true });
    };
  }, []);

  const pageTitle = PAGE_TITLES[activePage] || 'Home';

  return (
    <header
      style={{
        backgroundColor: isDark 
          ? (isScrolled ? 'rgba(12, 13, 20, 0.92)' : 'rgba(15, 17, 26, 0.82)')
          : (isScrolled ? 'rgba(255, 255, 255, 0.94)' : 'rgba(250, 250, 248, 0.86)'),
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.07)',
        boxShadow: isScrolled 
          ? (isDark ? '0 4px 20px -4px rgba(0, 0, 0, 0.5)' : '0 4px 20px -4px rgba(0, 0, 0, 0.06)') 
          : 'none',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      }}
      className="sticky top-0 z-30 h-[64px] sm:h-[68px] w-full flex items-center justify-between px-3.5 sm:px-6 lg:px-8 border-b transition-all duration-200"
    >
      {/* LEFT: Mobile Toggle & Page Title ONLY (Zero UniFlow duplicate) */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {onToggleMobileMenu && (
          <button
            type="button"
            onClick={onToggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            className={`min-[1200px]:hidden w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center active:scale-95 transition-all duration-150 cursor-pointer ${
              isDark 
                ? 'text-zinc-100 bg-white/[0.05] border border-white/[0.10] hover:bg-white/[0.10] hover:border-white/[0.18]' 
                : 'text-zinc-900 bg-black/[0.03] border border-black/[0.07] hover:bg-black/[0.07] hover:border-black/[0.14]'
            }`}
          >
            {isMobileMenuOpen ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 transition-transform duration-150"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 transition-transform duration-150"
              >
                <line x1="3.5" y1="6" x2="20.5" y2="6" />
                <line x1="3.5" y1="12" x2="20.5" y2="12" />
                <line x1="3.5" y1="18" x2="20.5" y2="18" />
              </svg>
            )}
          </button>
        )}

        {/* Current Page Title Heading */}
        <h1 
          style={{ color: colors.primaryText }}
          className="text-base sm:text-lg font-bold tracking-tight font-sans"
        >
          {pageTitle}
        </h1>
      </div>

      {/* CENTER: Search Workspace Trigger */}
      <div className="flex-1 max-w-xs sm:max-w-md mx-4 hidden sm:block">
        <button
          type="button"
          onClick={onOpenSearch}
          style={{
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.07)',
            color: colors.mutedText,
          }}
          className={`w-full h-10 px-3.5 rounded-xl border text-left text-xs flex items-center justify-between transition-all duration-150 shadow-xs cursor-pointer group ${
            isDark 
              ? 'hover:border-zinc-700 hover:bg-white/[0.07]' 
              : 'hover:border-zinc-300 hover:bg-black/[0.05]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-zinc-400 group-hover:text-zinc-300" />
            <span>Search workspace...</span>
          </div>
          <kbd 
            style={{
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.07)',
              color: colors.mutedText,
            }}
            className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded-md border text-[10px] font-mono"
          >
            ⌘K
          </kbd>
        </button>
      </div>

      {/* RIGHT: Search (Mobile), Theme Switcher & Profile */}
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        {/* Mobile Search Button */}
        <button
          type="button"
          onClick={onOpenSearch}
          aria-label="Search"
          className={`sm:hidden w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center active:scale-95 transition-all duration-150 cursor-pointer ${
            isDark 
              ? 'text-zinc-200 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:text-white' 
              : 'text-zinc-800 bg-black/[0.03] border border-black/[0.06] hover:bg-black/[0.06] hover:text-black'
          }`}
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Theme Mode Selector (Dark / Light / System) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowThemeMenu((prev) => !prev)}
            aria-label="Toggle theme mode"
            title={`Theme: ${theme} (Active: ${resolvedTheme})`}
            className={`w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl border active:scale-95 transition-all duration-150 cursor-pointer flex items-center justify-center shadow-xs ${
              isDark 
                ? 'bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.08]' 
                : 'bg-black/[0.03] border-black/[0.06] hover:bg-black/[0.06]'
            }`}
          >
            {resolvedTheme === 'dark' ? (
              <Moon className="w-4 h-4 text-violet-400" />
            ) : (
              <Sun className="w-4 h-4 text-amber-500" />
            )}
          </button>

          {/* Theme Dropdown Menu */}
          {showThemeMenu && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowThemeMenu(false)}
              />
              <div
                style={{
                  backgroundColor: isDark ? '#11121A' : '#FFFFFF',
                  borderColor: colors.border,
                }}
                className="absolute right-0 top-11 w-36 py-1.5 rounded-xl border shadow-xl z-50 flex flex-col"
              >
                <button
                  type="button"
                  onClick={() => {
                    setTheme('dark');
                    setShowThemeMenu(false);
                  }}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-left cursor-pointer transition-colors ${
                    theme === 'dark'
                      ? (isDark ? 'bg-violet-950/40 text-violet-300 font-semibold' : 'bg-violet-50 text-violet-700 font-semibold')
                      : (isDark ? 'text-zinc-300 hover:bg-zinc-800/60' : 'text-zinc-700 hover:bg-zinc-100')
                  }`}
                >
                  <Moon className="w-3.5 h-3.5 text-violet-400" />
                  <span>Dark</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setTheme('light');
                    setShowThemeMenu(false);
                  }}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-left cursor-pointer transition-colors ${
                    theme === 'light'
                      ? (isDark ? 'bg-violet-950/40 text-violet-300 font-semibold' : 'bg-violet-50 text-violet-700 font-semibold')
                      : (isDark ? 'text-zinc-300 hover:bg-zinc-800/60' : 'text-zinc-700 hover:bg-zinc-100')
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Light</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setTheme('system');
                    setShowThemeMenu(false);
                  }}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-left cursor-pointer transition-colors ${
                    theme === 'system'
                      ? (isDark ? 'bg-violet-950/40 text-violet-300 font-semibold' : 'bg-violet-50 text-violet-700 font-semibold')
                      : (isDark ? 'text-zinc-300 hover:bg-zinc-800/60' : 'text-zinc-700 hover:bg-zinc-100')
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5 text-cyan-400" />
                  <span>System</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* User Profile Quick Info */}
        <div 
          className="flex items-center gap-2.5 pl-2 border-l transition-colors"
          style={{ borderColor: colors.borderSubtle }}
        >
          <div 
            style={{
              backgroundColor: isDark ? '#171923' : '#F1F1F4',
              borderColor: colors.borderSubtle,
            }}
            className="w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs shadow-xs overflow-hidden shrink-0"
          >
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'Vishnu Kant Sharma'}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span style={{ color: colors.primaryText }}>
                {(user.displayName || user.email || 'V')[0].toUpperCase()}
              </span>
            )}
          </div>

          <div className="hidden lg:flex flex-col text-left">
            <span 
              style={{ color: colors.primaryText }}
              className="text-xs font-semibold leading-none truncate max-w-[120px]"
            >
              {user.displayName || 'Vishnu Kant Sharma'}
            </span>
            <span 
              style={{ color: colors.mutedText }}
              className="text-[10px] leading-tight mt-0.5 truncate max-w-[120px]"
            >
              {user.email || 'vishnukantsharma98@gmail.com'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
