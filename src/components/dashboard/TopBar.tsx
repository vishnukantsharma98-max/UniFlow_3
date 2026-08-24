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
          ? (isScrolled ? 'rgba(12, 13, 19, 0.85)' : 'rgba(16, 17, 24, 0.65)')
          : (isScrolled ? 'rgba(255, 255, 255, 0.85)' : 'rgba(248, 248, 245, 0.65)'),
        borderColor: colors.borderSubtle,
        backdropFilter: 'blur(24px) saturate(160%)',
        WebkitBackdropFilter: 'blur(24px) saturate(160%)',
      }}
      className="sticky top-0 z-30 h-16 w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 border-b transition-all duration-200"
    >
      {/* LEFT: Mobile Toggle & Page Title ONLY (Zero UniFlow duplicate) */}
      <div className="flex items-center gap-3">
        {onToggleMobileMenu && (
          <button
            type="button"
            onClick={onToggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            style={{ color: colors.mutedText }}
            className={`min-[1200px]:hidden p-2 rounded-xl active:scale-95 transition-all cursor-pointer ${
              isDark ? 'hover:text-zinc-100 hover:bg-zinc-800/60' : 'hover:text-zinc-900 hover:bg-zinc-200/60'
            }`}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
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
            borderColor: colors.borderSubtle,
            color: colors.mutedText,
          }}
          className={`w-full h-9 px-3.5 rounded-xl border text-left text-xs flex items-center justify-between transition-all duration-150 shadow-xs cursor-pointer group ${
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
              borderColor: colors.borderSubtle,
              color: colors.mutedText,
            }}
            className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded-md border text-[10px] font-mono"
          >
            ⌘K
          </kbd>
        </button>
      </div>

      {/* RIGHT: Search (Mobile), Theme Switcher & Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Search Button */}
        <button
          type="button"
          onClick={onOpenSearch}
          aria-label="Search"
          style={{ color: colors.mutedText }}
          className={`sm:hidden p-2 rounded-xl transition-colors ${
            isDark ? 'hover:text-zinc-100 hover:bg-zinc-800/60' : 'hover:text-zinc-900 hover:bg-zinc-200'
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
            style={{ 
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
              borderColor: colors.borderSubtle,
              color: colors.primaryText 
            }}
            className={`p-2 rounded-xl border active:scale-95 transition-all cursor-pointer flex items-center gap-1 shadow-xs ${
              isDark ? 'hover:bg-white/[0.08]' : 'hover:bg-black/[0.06]'
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
