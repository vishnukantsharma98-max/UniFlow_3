import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
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
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  ShieldCheck
} from 'lucide-react';
import { DashboardPageId } from './types';
import { UniFlowLogo } from '../UniFlowLogo';
import { useTheme } from './ThemeSystem';
import { checkUserRole } from '../../firebase/firestoreService';

interface DesktopNavRailProps {
  activePage: DashboardPageId;
  user: User;
  onSelectPage: (page: DashboardPageId) => void;
  onLogout: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

interface NavItem {
  id: DashboardPageId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const PRIMARY_NAV_ITEMS: NavItem[] = [
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

export const DesktopNavRail: React.FC<DesktopNavRailProps> = ({
  activePage,
  user,
  onSelectPage,
  onLogout,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const { resolvedTheme, colors } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
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
    ? [...PRIMARY_NAV_ITEMS, { id: 'admin' as DashboardPageId, label: 'Admin Portal', icon: ShieldCheck, badge: 'ADMIN' }]
    : PRIMARY_NAV_ITEMS;

  // On desktop, expanded by default (!isCollapsed). If user collapsed it, hovering can preview expand.
  const isExpanded = !isCollapsed || isHovered;
  const isDark = resolvedTheme === 'dark';

  return (
    <aside
      onMouseEnter={() => {
        if (isCollapsed) setIsHovered(true);
      }}
      onMouseLeave={() => {
        if (isCollapsed) setIsHovered(false);
      }}
      aria-label="Sidebar Navigation"
      style={{
        backgroundColor: isDark ? 'rgba(20, 20, 28, 0.65)' : 'rgba(255, 255, 255, 0.65)',
        backdropFilter: isDark ? 'blur(30px) saturate(170%)' : 'blur(30px) saturate(160%)',
        WebkitBackdropFilter: isDark ? 'blur(30px) saturate(170%)' : 'blur(30px) saturate(160%)',
        borderRight: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.06)',
        boxShadow: isDark 
          ? 'inset 0 1px 0 rgba(255, 255, 255, 0.12), inset -1px 0 0 rgba(255, 255, 255, 0.04), 4px 0 24px rgba(0, 0, 0, 0.35)' 
          : 'inset 0 1px 0 rgba(255, 255, 255, 0.8), inset -1px 0 0 rgba(0, 0, 0, 0.02), 4px 0 24px rgba(0, 0, 0, 0.04)',
      }}
      className={`hidden min-[1200px]:flex flex-col justify-between shrink-0 h-screen sticky top-0 z-40 transition-[width,background-color,border-color] duration-220 ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-[width] select-none ${
        isExpanded ? 'w-[244px]' : 'w-[76px]'
      }`}
    >
      {/* Top Section: Brand + User Profile */}
      <div className="flex flex-col shrink-0">
        {/* 1. Primary UniFlow Brand */}
        <div 
          className="h-16 flex items-center px-4 overflow-hidden border-b transition-colors shrink-0"
          style={{ borderColor: colors.borderSubtle }}
        >
          <div className="flex items-center justify-between w-full">
            {/* Logo and Wordmark */}
            <div className="flex items-center gap-3 min-w-0">
              <button 
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectPage('home');
                }}
                aria-label="UniFlow Home"
                title="Return to Home"
                className="shrink-0 flex items-center justify-center w-10 h-10 cursor-pointer rounded-xl transition-transform duration-150 active:scale-95 focus:outline-none"
              >
                <UniFlowLogo size="md" showText={false} />
              </button>
              
              {/* Wordmark */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectPage('home');
                }}
                className={`text-left font-bold tracking-tight font-sans text-[17px] cursor-pointer hover:opacity-80 transition-all duration-200 whitespace-nowrap ${
                  isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none'
                }`}
                style={{ color: colors.primaryText }}
              >
                Uni<span className="text-flow-gradient">Flow</span>
              </button>
            </div>

            {/* Desktop Collapse / Expand Toggle Button */}
            {onToggleCollapse && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleCollapse();
                }}
                title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                style={{ color: colors.mutedText }}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
                  isDark ? 'hover:text-zinc-100 hover:bg-zinc-800/50' : 'hover:text-zinc-900 hover:bg-zinc-100'
                } ${!isExpanded ? 'mx-auto' : ''}`}
              >
                {isCollapsed && !isHovered ? (
                  <PanelLeftOpen className="w-4 h-4" />
                ) : (
                  <PanelLeftClose className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* 2. User Info Near Top */}
        <div className="p-2.5 shrink-0">
          <div 
            style={{
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.025)',
              borderColor: colors.borderSubtle,
            }}
            className="flex items-center gap-3 p-2 rounded-xl border transition-all duration-150 overflow-hidden"
            title={user.displayName || user.email || 'User'}
          >
            {/* Avatar */}
            <div 
              style={{
                backgroundColor: isDark ? '#171923' : '#F1F1F4',
                borderColor: colors.borderSubtle,
              }}
              className="w-8.5 h-8.5 rounded-full border flex items-center justify-center font-bold text-xs shadow-xs overflow-hidden shrink-0"
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

            {/* User Info */}
            <div
              className={`flex flex-col min-w-0 transition-all duration-200 ${
                isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none'
              }`}
            >
              <span 
                style={{ color: colors.primaryText }}
                className="text-xs font-semibold leading-tight truncate"
              >
                {user.displayName || 'Vishnu Kant Sharma'}
              </span>
              <span 
                style={{ color: colors.mutedText }}
                className="text-[10.5px] leading-tight truncate mt-0.5"
              >
                {user.email || 'vishnukantsharma98@gmail.com'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Navigation Items (Scrollable Middle Section) */}
      <nav className="flex-1 flex flex-col gap-1 px-2.5 py-1 overflow-y-auto overflow-x-hidden min-h-0 focus:outline-none custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectPage(item.id);
              }}
              title={!isExpanded ? item.label : undefined}
              aria-current={isActive ? 'page' : undefined}
              style={{
                backgroundColor: isActive
                  ? (isDark ? 'rgba(139, 92, 246, 0.12)' : 'rgba(124, 58, 237, 0.08)')
                  : 'transparent',
                color: isActive
                  ? (isDark ? '#d8b4fe' : '#6d28d9')
                  : (isDark ? '#F3F4F6' : colors.primaryText),
              }}
              className={`relative group flex items-center h-10 px-3 rounded-xl text-[14px] font-medium shrink-0 transition-all duration-150 ease-out cursor-pointer ${
                isActive 
                  ? 'font-semibold' 
                  : isDark 
                    ? 'hover:text-zinc-100 hover:bg-white/[0.04]' 
                    : 'hover:text-zinc-900 hover:bg-black/[0.04]'
              }`}
            >
              {/* Active Left Indicator Strip */}
              {isActive && (
                <div 
                  style={{ backgroundColor: colors.accent }}
                  className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full shadow-[0_0_8px_rgba(139,92,246,0.5)]" 
                />
              )}

              {/* Icon Row */}
              <div
                className={`shrink-0 w-6 h-6 flex items-center justify-center transition-colors ${
                  isActive 
                    ? (isDark ? 'text-violet-400' : 'text-violet-700') 
                    : (isDark ? 'text-[#D1D5DB] group-hover:text-zinc-100' : 'text-zinc-500 group-hover:text-zinc-900')
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>

              {/* Label */}
              <span
                className={`ml-3 whitespace-nowrap overflow-hidden text-[13.5px] transition-all duration-200 ${
                  isExpanded
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-2 pointer-events-none'
                }`}
              >
                {item.label}
              </span>

              {item.badge && isExpanded && (
                <span className="ml-auto px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {item.badge}
                </span>
              )}

              {isActive && isExpanded && !item.badge && (
                <ChevronRight 
                  style={{ color: colors.mutedText }}
                  className="w-3.5 h-3.5 ml-auto opacity-60" 
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Footer Actions (Sign Out) */}
      <div 
        className="flex flex-col gap-1 p-2.5 border-t transition-colors shrink-0 bg-inherit"
        style={{ borderColor: colors.borderSubtle }}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onLogout();
          }}
          title={!isExpanded ? 'Sign Out' : undefined}
          className="group flex items-center h-10 px-3 rounded-xl text-[13.5px] font-medium text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-150 ease-out cursor-pointer shrink-0"
        >
          <div className="shrink-0 w-6 h-6 flex items-center justify-center text-zinc-400 group-hover:text-rose-400 transition-colors">
            <LogOut className="w-5 h-5" />
          </div>

          <span
            className={`ml-3 whitespace-nowrap overflow-hidden text-[13.5px] transition-all duration-200 ${
              isExpanded
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-2 pointer-events-none'
            }`}
          >
            Sign Out
          </span>
        </button>
      </div>
    </aside>
  );
};
