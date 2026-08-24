import React from 'react';
import { Home, GraduationCap, FolderGit2, Sparkles } from 'lucide-react';
import { DashboardPageId } from './types';
import { useTheme } from './ThemeSystem';

interface MobileBottomNavProps {
  activePage: DashboardPageId;
  onSelectPage: (page: DashboardPageId) => void;
}

interface BottomNavItem {
  id: DashboardPageId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const BOTTOM_NAV_ITEMS: BottomNavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'semester-2', label: 'Sem 2', icon: GraduationCap },
  { id: 'semester-1', label: 'Sem 1', icon: GraduationCap },
  { id: 'study-resources', label: 'Resources', icon: FolderGit2 },
  { id: 'ai', label: 'AI', icon: Sparkles },
];

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activePage,
  onSelectPage,
}) => {
  const { resolvedTheme, colors } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <nav
      aria-label="Mobile Navigation"
      style={{
        backgroundColor: isDark ? 'rgba(15, 17, 26, 0.85)' : 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        borderColor: colors.borderSubtle,
        boxShadow: isDark 
          ? '0 -4px 24px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)' 
          : '0 -4px 24px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
      }}
      className="md:hidden absolute bottom-0 left-0 right-0 z-40 border-t px-2 pt-1.5 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] select-none transition-transform duration-200"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {BOTTOM_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectPage(item.id)}
              aria-current={isActive ? 'page' : undefined}
              style={{
                color: isActive ? colors.primaryText : colors.mutedText,
              }}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-150 active:scale-95 cursor-pointer ${
                isActive ? 'font-semibold' : ''
              }`}
            >
              <div
                style={{
                  backgroundColor: isActive
                    ? (isDark ? '#171926' : '#F1F1F7')
                    : 'transparent',
                  color: isActive
                    ? (isDark ? '#a78bfa' : '#6d28d9')
                    : colors.mutedText,
                }}
                className="relative w-8 h-7 flex items-center justify-center rounded-full transition-all duration-200"
              >
                <Icon className="w-4.5 h-4.5" />
                {isActive && (
                  <span 
                    style={{ backgroundColor: colors.accent }}
                    className="absolute -bottom-0.5 w-1 h-1 rounded-full shadow-[0_0_6px_rgba(139,92,246,0.8)]" 
                  />
                )}
              </div>
              <span
                style={{
                  color: isActive ? colors.primaryText : colors.mutedText,
                }}
                className="text-[10px] tracking-tight mt-0.5 font-medium"
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
