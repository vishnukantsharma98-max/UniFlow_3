import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { 
  LayoutDashboard, 
  Users, 
  ShieldCheck, 
  ShieldAlert, 
  ArrowLeft, 
  LogOut, 
  Menu,
  X,
  Lock,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { ThemeProvider, useTheme } from '../dashboard/ThemeSystem';
import { UniFlowLogo } from '../UniFlowLogo';
import { AdminUsersDirectory } from './AdminUsersDirectory';
import { AdminManagementView } from './AdminManagementView';
import { 
  checkUserRole, 
  fetchAdminUsers,
  fetchAdminsList,
  PRIMARY_ADMIN_EMAIL 
} from '../../firebase/firestoreService';

interface AdminPortalProps {
  user: User;
  onReturnToDashboard: () => void;
  onLogout: () => void;
}

export type AdminTab = 'overview' | 'users' | 'admins';

const AdminPortalContent: React.FC<AdminPortalProps> = ({ 
  user, 
  onReturnToDashboard, 
  onLogout 
}) => {
  const { colors, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [roleInfo, setRoleInfo] = useState<{
    role: string;
    isPrimaryAdmin: boolean;
    isSecondaryAdmin: boolean;
    isAdmin: boolean;
  }>({
    role: 'user',
    isPrimaryAdmin: false,
    isSecondaryAdmin: false,
    isAdmin: false,
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [userCount, setUserCount] = useState<number>(0);
  const [adminCount, setAdminCount] = useState<number>(1);

  useEffect(() => {
    checkUserRole(user).then((info) => {
      setRoleInfo(info);
    });

    fetchAdminUsers(user)
      .then((usersList) => {
        setUserCount(usersList.length);
      })
      .catch(() => {});

    fetchAdminsList(user)
      .then((adminsList) => {
        setAdminCount(adminsList.length);
      })
      .catch(() => {});
  }, [user]);

  const navItems = [
    { id: 'overview' as AdminTab, label: 'Admin Overview', icon: LayoutDashboard },
    { id: 'users' as AdminTab, label: 'Auth Users Directory', icon: Users, badge: userCount > 0 ? userCount : undefined },
    { id: 'admins' as AdminTab, label: 'Admin Management', icon: ShieldCheck, badge: adminCount > 0 ? adminCount : undefined },
  ];

  return (
    <div 
      style={{
        backgroundColor: colors.background,
        color: colors.primaryText,
      }}
      className="min-h-screen flex flex-col min-[1200px]:flex-row antialiased selection:bg-violet-500/30 selection:text-white"
    >
      {/* 1. Desktop Admin Sidebar */}
      <aside
        style={{
          backgroundColor: isDark ? 'rgba(18, 19, 28, 0.85)' : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(30px) saturate(170%)',
          borderColor: colors.borderSubtle,
        }}
        className="hidden min-[1200px]:flex flex-col justify-between shrink-0 w-64 h-screen sticky top-0 border-r z-40 p-4"
      >
        {/* Brand & Nav */}
        <div className="space-y-6">
          {/* UniFlow Logo + Return to Dashboard Button */}
          <div className="flex items-center justify-between px-2 pt-2">
            <button
              type="button"
              onClick={onReturnToDashboard}
              title="Return to Student Dashboard (Home)"
              className="flex items-center gap-3 cursor-pointer group"
            >
              <UniFlowLogo size="md" showText={false} />
              <div className="flex flex-col text-left">
                <span className="font-bold tracking-tight text-sm group-hover:text-violet-400 transition-colors">
                  Uni<span className="text-flow-gradient">Flow</span>
                </span>
                <span className="text-[10px] font-mono font-bold text-amber-400">
                  ADMIN PORTAL
                </span>
              </div>
            </button>
          </div>

          {/* Admin User Chip */}
          <div 
            style={{
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
              borderColor: colors.borderSubtle,
            }}
            className="p-3 rounded-2xl border flex items-center gap-3"
          >
            <div 
              style={{
                backgroundColor: roleInfo.isPrimaryAdmin ? 'rgba(245, 158, 11, 0.2)' : 'rgba(139, 92, 246, 0.2)',
                borderColor: roleInfo.isPrimaryAdmin ? '#f59e0b' : '#8b5cf6',
              }}
              className="w-9 h-9 rounded-xl border flex items-center justify-center font-bold text-xs shrink-0"
            >
              {roleInfo.isPrimaryAdmin ? (
                <ShieldAlert className="w-4 h-4 text-amber-400" />
              ) : (
                <ShieldCheck className="w-4 h-4 text-violet-400" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <span className="text-xs font-bold truncate block" style={{ color: colors.primaryText }}>
                {user.displayName || 'Administrator'}
              </span>
              <span className="text-[10px] font-mono text-zinc-400 truncate block">
                {roleInfo.isPrimaryAdmin ? 'Primary Admin' : 'Secondary Admin'}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    backgroundColor: isActive 
                      ? (isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(124, 58, 237, 0.12)')
                      : 'transparent',
                    color: isActive ? (isDark ? '#d8b4fe' : '#6d28d9') : colors.mutedText,
                    borderColor: isActive ? 'rgba(139, 92, 246, 0.3)' : 'transparent',
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                    isActive ? 'font-bold' : isDark ? 'hover:bg-white/[0.04] hover:text-zinc-200' : 'hover:bg-black/[0.04] hover:text-zinc-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-violet-400' : ''}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions: Return to App & Sign Out */}
        <div className="space-y-2 pt-4 border-t" style={{ borderColor: colors.borderSubtle }}>
          <button
            type="button"
            onClick={onReturnToDashboard}
            style={{
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
              borderColor: colors.borderSubtle,
              color: colors.primaryText,
            }}
            className="w-full px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer hover:border-violet-500/40 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Student Dashboard</span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="w-full px-3.5 py-2 rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* 2. Mobile Top Navbar for Admin */}
      <header
        style={{
          backgroundColor: isDark ? 'rgba(18, 19, 28, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          borderColor: colors.borderSubtle,
        }}
        className="min-[1200px]:hidden flex items-center justify-between p-3 border-b sticky top-0 z-50 backdrop-blur-xl"
      >
        <div className="flex items-center gap-2">
          <UniFlowLogo size="sm" showText={false} />
          <span className="font-bold text-xs tracking-tight">Admin Portal</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReturnToDashboard}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20"
          >
            Exit Admin
          </button>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl border"
            style={{ borderColor: colors.borderSubtle }}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div 
          style={{
            backgroundColor: isDark ? '#12131c' : '#FFFFFF',
            borderColor: colors.borderSubtle,
          }}
          className="min-[1200px]:hidden fixed inset-x-0 top-14 z-50 border-b shadow-2xl p-4 space-y-2 animate-fadeIn"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                style={{
                  backgroundColor: isActive ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                  color: isActive ? '#d8b4fe' : colors.primaryText,
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-violet-400" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-violet-500/20 text-violet-300">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* 3. Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 max-w-7xl mx-auto w-full">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Overview Header */}
            <div>
              <h2 style={{ color: colors.primaryText }} className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
                Administrator Control Center
              </h2>
              <p style={{ color: colors.mutedText }} className="text-xs sm:text-sm mt-1">
                Overview of authorized administrators, user authentication directory, and platform security.
              </p>
            </div>

            {/* Metric Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Stat 1: Auth User Directory */}
              <div
                onClick={() => setActiveTab('users')}
                style={{
                  backgroundColor: isDark ? 'rgba(18, 19, 28, 0.7)' : 'rgba(255, 255, 255, 0.8)',
                  borderColor: colors.borderSubtle,
                  backdropFilter: 'blur(20px)',
                }}
                className="p-5 rounded-2xl border shadow-lg space-y-3 cursor-pointer hover:border-violet-500/40 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    Auth Users Directory
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono" style={{ color: colors.primaryText }}>
                    {userCount}
                  </span>
                  <span className="text-xs text-violet-400 font-bold group-hover:underline">
                    Inspect Directory →
                  </span>
                </div>
              </div>

              {/* Stat 2: Active Admins */}
              <div
                onClick={() => setActiveTab('admins')}
                style={{
                  backgroundColor: isDark ? 'rgba(18, 19, 28, 0.7)' : 'rgba(255, 255, 255, 0.8)',
                  borderColor: colors.borderSubtle,
                  backdropFilter: 'blur(20px)',
                }}
                className="p-5 rounded-2xl border shadow-lg space-y-3 cursor-pointer hover:border-violet-500/40 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    Administrators
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400">
                    {adminCount}
                  </span>
                  <span className="text-xs text-amber-400 font-bold group-hover:underline">
                    Manage Roles →
                  </span>
                </div>
              </div>

              {/* Stat 3: Admin Directory Access */}
              <div
                onClick={() => setActiveTab('admins')}
                style={{
                  backgroundColor: isDark ? 'rgba(18, 19, 28, 0.7)' : 'rgba(255, 255, 255, 0.8)',
                  borderColor: colors.borderSubtle,
                  backdropFilter: 'blur(20px)',
                }}
                className="p-5 rounded-2xl border shadow-lg space-y-3 cursor-pointer hover:border-violet-500/40 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    Your Privileges
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-lg font-bold text-emerald-400">
                    {roleInfo.isPrimaryAdmin ? 'Primary Master Admin' : 'Secondary Admin'}
                  </span>
                  <span className="text-xs text-zinc-400">
                    {roleInfo.isPrimaryAdmin ? 'Full Control' : 'Authorized'}
                  </span>
                </div>
              </div>
            </div>

            {/* Operational Management Shortcuts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tool 1: Auth User Directory */}
              <div
                onClick={() => setActiveTab('users')}
                style={{
                  backgroundColor: isDark ? 'rgba(18, 19, 28, 0.7)' : 'rgba(255, 255, 255, 0.8)',
                  borderColor: colors.borderSubtle,
                  backdropFilter: 'blur(20px)',
                }}
                className="p-6 rounded-3xl border shadow-xl space-y-4 cursor-pointer hover:border-violet-500/40 transition-all group"
              >
                <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: colors.borderSubtle }}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 style={{ color: colors.primaryText }} className="text-base font-bold tracking-tight">
                        User Directory
                      </h3>
                      <p className="text-xs text-zinc-400">Inspect authenticated accounts & sign-in providers</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-violet-400 transition-colors" />
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Access live Firebase Authentication user records, inspect account creation dates, verify Google account linking, and audit system users.
                </p>
              </div>

              {/* Tool 2: Admin Delegation Management */}
              <div
                onClick={() => setActiveTab('admins')}
                style={{
                  backgroundColor: isDark ? 'rgba(18, 19, 28, 0.7)' : 'rgba(255, 255, 255, 0.8)',
                  borderColor: colors.borderSubtle,
                  backdropFilter: 'blur(20px)',
                }}
                className="p-6 rounded-3xl border shadow-xl space-y-4 cursor-pointer hover:border-violet-500/40 transition-all group"
              >
                <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: colors.borderSubtle }}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 style={{ color: colors.primaryText }} className="text-base font-bold tracking-tight">
                        Admin Delegation & Roles
                      </h3>
                      <p className="text-xs text-zinc-400">Grant or revoke Secondary Admin privileges</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-amber-400 transition-colors" />
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Authorize trusted team members as Secondary Administrators with Firestore Cloud persistence and instant role synchronization.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && <AdminUsersDirectory currentUser={user} />}
        {activeTab === 'admins' && (
          <AdminManagementView 
            currentUser={user} 
            isPrimaryAdmin={roleInfo.isPrimaryAdmin} 
          />
        )}
      </main>
    </div>
  );
};

export const AdminPortal: React.FC<AdminPortalProps> = (props) => {
  return (
    <ThemeProvider>
      <AdminPortalContent {...props} />
    </ThemeProvider>
  );
};
