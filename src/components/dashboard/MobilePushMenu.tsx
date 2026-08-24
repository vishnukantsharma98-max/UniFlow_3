import React, { useRef, useState, useEffect } from 'react';
import { 
  Home, 
  GraduationCap, 
  FolderGit2, 
  Library, 
  PlayCircle, 
  Gamepad2, 
  Sparkles, 
  LayoutGrid, 
  Share2, 
  Settings, 
  LogOut,
  X,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { User } from 'firebase/auth';
import { DashboardPageId } from './types';
import { UniFlowLogo } from '../UniFlowLogo';
import { useTheme } from './ThemeSystem';
import { checkUserRole } from '../../firebase/firestoreService';

interface MobilePushMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activePage: DashboardPageId;
  onSelectPage: (page: DashboardPageId) => void;
  user: User;
  onLogout: () => void;
}

interface MenuItem {
  id: DashboardPageId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const MENU_ITEMS: MenuItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'semester-1', label: 'Semester 1', icon: GraduationCap },
  { id: 'semester-2', label: 'Semester 2', icon: GraduationCap },
  { id: 'semester-3', label: 'Semester 3', icon: GraduationCap },
  { id: 'study-resources', label: 'Study Resources', icon: FolderGit2 },
  { id: 'books', label: 'Books', icon: Library },
  { id: 'entertainment', label: 'Entertainment', icon: PlayCircle },
  { id: 'games', label: 'Games', icon: Gamepad2 },
  { id: 'ai', label: 'AI', icon: Sparkles },
  { id: 'student-apps', label: 'Student Apps', icon: LayoutGrid },
  { id: 'social-media-apps', label: 'Social Media Apps', icon: Share2 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const MobilePushMenu: React.FC<MobilePushMenuProps> = ({
  isOpen,
  onClose,
  activePage,
  onSelectPage,
  user,
  onLogout,
}) => {
  const { resolvedTheme, colors } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const touchStartXRef = useRef<number | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let mounted = true;
    checkUserRole(user).then((info) => {
      if (mounted) {
        setIsAdmin(info.isAdmin);
      }
    });
    return () => {
      mounted = false;
    };
  }, [user]);

  const navItems = isAdmin 
    ? [...MENU_ITEMS, { id: 'admin' as DashboardPageId, label: 'Admin Portal', icon: ShieldCheck, badge: 'ADMIN' }]
    : MENU_ITEMS;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    // Swipe left (more than 35px) triggers close
    if (diff > 35) {
      onClose();
    }
    touchStartXRef.current = null;
  };

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-20 min-[1200px]:hidden select-none bg-transparent ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* iOS Liquid Glass Drawer */}
      <div 
        style={{
          backgroundColor: isDark ? 'rgba(20, 22, 30, 0.65)' : 'rgba(255, 255, 255, 0.70)',
          backdropFilter: 'blur(30px) saturate(160%)',
          WebkitBackdropFilter: 'blur(30px) saturate(160%)',
          borderColor: colors.borderSubtle,
          boxShadow: isDark 
            ? 'inset 0 1px 0 rgba(255, 255, 255, 0.12), 12px 0 36px rgba(0, 0, 0, 0.45)' 
            : 'inset 0 1px 0 rgba(255, 255, 255, 0.8), 12px 0 36px rgba(0, 0, 0, 0.06)',
          transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-24px, 0, 0)',
          opacity: isOpen ? 1 : 0,
          transition: 'transform 350ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
        className="w-[75vw] max-w-[280px] md:w-[320px] md:max-w-[320px] h-full flex flex-col justify-between p-5 pt-8 pb-8 border-r overflow-hidden will-change-[transform,opacity]"
      >
        {/* Top Header with UniFlow Brand & Close + User Profile */}
        <div className="flex flex-col gap-4 shrink-0">
          <div className="flex items-center justify-between">
            {/* UniFlow Brand Button (YouTube-like Home Navigation) */}
            <button
              type="button"
              onClick={() => {
                onClose();
                onSelectPage('home');
              }}
              title="Return to Home"
              aria-label="UniFlow Home"
              className="flex items-center gap-2.5 cursor-pointer rounded-xl active:scale-95 transition-transform"
            >
              <UniFlowLogo size="md" showText={false} />
              <span 
                style={{ color: colors.primaryText }}
                className="text-base font-bold tracking-tight font-sans"
              >
                Uni<span className="text-flow-gradient">Flow</span>
              </span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              style={{ color: colors.mutedText }}
              className={`p-1.5 rounded-lg active:scale-95 transition-all cursor-pointer ${
                isDark ? 'hover:text-zinc-100 hover:bg-zinc-800/60' : 'hover:text-zinc-900 hover:bg-zinc-200'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile Tile */}
          <div 
            style={{
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
              borderColor: colors.borderSubtle,
            }}
            className="flex items-center gap-3 p-3 rounded-2xl border shadow-xs"
          >
            <div 
              style={{
                backgroundColor: isDark ? '#171923' : '#F1F1F4',
                borderColor: colors.borderSubtle,
              }}
              className="w-10 h-10 rounded-full border flex items-center justify-center font-bold text-xs shadow-xs overflow-hidden shrink-0"
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'Profile'}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span style={{ color: colors.primaryText }}>
                  {(user.displayName || user.email || 'U')[0].toUpperCase()}
                </span>
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <span 
                style={{ color: colors.primaryText }}
                className="text-xs font-semibold truncate"
              >
                {user.displayName || 'Student User'}
              </span>
              <span 
                style={{ color: colors.mutedText }}
                className="text-[10px] truncate"
              >
                {user.email || 'student@uniflow'}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Clean Rows (Scrollable Middle Section) */}
        <nav className="flex-1 flex flex-col gap-1 my-3 overflow-y-auto overflow-x-hidden min-h-0 focus:outline-none custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onClose();
                  onSelectPage(item.id);
                }}
                style={{
                  backgroundColor: isActive 
                    ? (isDark ? 'rgba(139, 92, 246, 0.14)' : 'rgba(124, 58, 237, 0.08)') 
                    : 'transparent',
                  color: isActive 
                    ? (isDark ? '#d8b4fe' : '#6d28d9') 
                    : colors.mutedText,
                }}
                className={`relative flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-medium shrink-0 transition-all duration-150 active:scale-98 cursor-pointer ${
                  isActive
                    ? 'font-semibold'
                    : isDark
                      ? 'hover:text-zinc-100 hover:bg-white/[0.04]'
                      : 'hover:text-zinc-900 hover:bg-black/[0.04]'
                }`}
              >
                {/* Active Left Indicator */}
                {isActive && (
                  <div 
                    style={{ backgroundColor: colors.accent }}
                    className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full shadow-[0_0_8px_rgba(139,92,246,0.5)]" 
                  />
                )}

                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4.5 h-4.5 ${
                      isActive 
                        ? (isDark ? 'text-violet-400' : 'text-violet-700') 
                        : (isDark ? 'text-zinc-400' : 'text-zinc-500')
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {item.badge}
                  </span>
                )}

                {isActive && !item.badge && (
                  <ChevronRight 
                    style={{ color: colors.mutedText }}
                    className="w-3.5 h-3.5 opacity-60" 
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Logout Button */}
        <div 
          className="pt-3 border-t shrink-0"
          style={{ borderColor: colors.borderSubtle }}
        >
          <button
            type="button"
            onClick={() => {
              onClose();
              onLogout();
            }}
            className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-medium text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 active:scale-98 transition-all cursor-pointer"
          >
            <LogOut className="w-4.5 h-4.5 text-zinc-400 hover:text-rose-400" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
