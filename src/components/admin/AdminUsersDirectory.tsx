import React, { useState, useEffect, useMemo } from 'react';
import { User } from 'firebase/auth';
import { 
  Users, 
  Search, 
  RefreshCw, 
  ShieldCheck, 
  ShieldAlert, 
  User as UserIcon, 
  Mail, 
  Key, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Copy, 
  Check, 
  ExternalLink,
  ChevronRight,
  Filter,
  Eye,
  X
} from 'lucide-react';
import { useTheme } from '../dashboard/ThemeSystem';
import { AuthUserRecord } from '../../types';
import { fetchAdminUsers } from '../../firebase/firestoreService';

interface AdminUsersDirectoryProps {
  currentUser: User;
}

export const AdminUsersDirectory: React.FC<AdminUsersDirectoryProps> = ({ currentUser }) => {
  const { colors, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const [users, setUsers] = useState<AuthUserRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'primaryAdmin' | 'secondaryAdmin' | 'user'>('ALL');
  const [selectedUser, setSelectedUser] = useState<AuthUserRecord | null>(null);
  const [copiedUid, setCopiedUid] = useState<string | null>(null);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAdminUsers(currentUser);
      setUsers(data);
    } catch (err: any) {
      console.error('[AdminUsers] Error loading users:', err);
      setError(err.message || 'Failed to load Firebase Authentication user directory');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [currentUser]);

  const handleCopyUid = (uid: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(uid);
    setCopiedUid(uid);
    setTimeout(() => setCopiedUid(null), 2000);
  };

  // Filtered and searched users
  const filteredUsers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return users.filter((u) => {
      const matchesSearch = 
        !q ||
        u.email?.toLowerCase().includes(q) ||
        u.displayName?.toLowerCase().includes(q) ||
        u.uid?.toLowerCase().includes(q);

      const matchesRole = 
        roleFilter === 'ALL' ||
        u.role === roleFilter;

      const keep = matchesSearch && matchesRole;
      if (!keep && (q || roleFilter !== 'ALL')) {
        console.log(`[Users] Filter removed: ${u.email} (searchMatch: ${matchesSearch}, roleMatch: ${matchesRole})`);
      }
      return keep;
    });
  }, [users, searchQuery, roleFilter]);

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 style={{ color: colors.primaryText }} className="text-xl sm:text-2xl font-extrabold tracking-tight flex items-center gap-2.5">
              <Users className="w-6 h-6 text-violet-400" />
              Authentication User Directory
            </h2>
            {!loading && !error && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                {users.length} Total {users.length === 1 ? 'User' : 'Users'}
              </span>
            )}
          </div>
          <p style={{ color: colors.mutedText }} className="text-xs sm:text-sm mt-1">
            Authoritative directory of all verified Firebase Authentication users and administrators.
          </p>
        </div>

        <button
          type="button"
          onClick={loadUsers}
          disabled={loading}
          style={{
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
            borderColor: colors.borderSubtle,
            color: colors.primaryText,
          }}
          className="px-4 py-2 rounded-xl border text-xs font-semibold flex items-center gap-2 cursor-pointer hover:border-violet-500/40 transition-all self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-violet-400' : ''}`} />
          <span>Refresh List</span>
        </button>
      </div>

      {/* Search and Filter Toolbar */}
      <div 
        style={{
          backgroundColor: isDark ? 'rgba(18, 19, 28, 0.7)' : 'rgba(255, 255, 255, 0.8)',
          borderColor: colors.borderSubtle,
          backdropFilter: 'blur(20px)',
        }}
        className="p-4 rounded-2xl border flex flex-col sm:flex-row items-center gap-3"
      >
        {/* Search Bar */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users by name, email, or UID..."
            style={{
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
              borderColor: colors.borderSubtle,
              color: colors.primaryText,
            }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:border-violet-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-zinc-400 hover:text-zinc-200 text-xs"
            >
              Clear
            </button>
          )}
        </div>

        {/* Role Filter Tabs */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {(['ALL', 'primaryAdmin', 'secondaryAdmin', 'user'] as const).map((r) => {
            const labels = {
              ALL: `All Users (${users.length})`,
              primaryAdmin: 'Primary',
              secondaryAdmin: 'Secondary',
              user: 'Students',
            };
            const isActive = roleFilter === r;

            return (
              <button
                key={r}
                type="button"
                onClick={() => setRoleFilter(r)}
                style={{
                  backgroundColor: isActive 
                    ? (isDark ? 'rgba(139, 92, 246, 0.25)' : 'rgba(124, 58, 237, 0.15)')
                    : 'transparent',
                  color: isActive ? (isDark ? '#d8b4fe' : '#6d28d9') : colors.mutedText,
                  borderColor: isActive ? colors.accent : colors.borderSubtle,
                }}
                className="px-3 py-1.5 rounded-xl border text-xs font-semibold whitespace-nowrap transition-all cursor-pointer"
              >
                {labels[r]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Directory Table / Cards */}
      <div
        style={{
          backgroundColor: isDark ? 'rgba(18, 19, 28, 0.7)' : 'rgba(255, 255, 255, 0.8)',
          borderColor: colors.borderSubtle,
          backdropFilter: 'blur(20px)',
        }}
        className="rounded-3xl border shadow-xl overflow-hidden"
      >
        {loading ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-8 h-8 rounded-full border-2 border-violet-500/20 border-t-violet-500 animate-spin mx-auto" />
            <p style={{ color: colors.mutedText }} className="text-xs">
              Loading Firebase Authentication users...
            </p>
          </div>
        ) : error ? (
          <div className="py-16 text-center space-y-3 px-4">
            <ShieldAlert className="w-10 h-10 mx-auto text-rose-500 opacity-80" />
            <p style={{ color: colors.primaryText }} className="text-sm font-bold">
              Unable to load users
            </p>
            <p style={{ color: colors.mutedText }} className="text-xs max-w-md mx-auto font-mono">
              {error}
            </p>
            <button
              type="button"
              onClick={loadUsers}
              style={{
                backgroundColor: colors.accent,
                color: '#FFFFFF',
              }}
              className="px-5 py-2 rounded-xl text-xs font-bold shadow-md hover:opacity-90 transition-opacity cursor-pointer mt-2"
            >
              Retry
            </button>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <Users className="w-10 h-10 mx-auto text-zinc-600 opacity-60" />
            <p style={{ color: colors.primaryText }} className="text-sm font-bold">
              No users match your criteria
            </p>
            <p style={{ color: colors.mutedText }} className="text-xs">
              Try adjusting your search query or role filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr 
                  style={{
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
                    borderColor: colors.borderSubtle,
                  }}
                  className="border-b text-[11px] font-bold uppercase tracking-wider text-zinc-400"
                >
                  <th className="py-3.5 px-4 sm:px-6">User / Identity</th>
                  <th className="py-3.5 px-4">Role & Access</th>
                  <th className="py-3.5 px-4">Provider / Auth</th>
                  <th className="py-3.5 px-4">Last Active</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: colors.borderSubtle }}>
                {filteredUsers.map((u) => {
                  const isPrimary = u.role === 'primaryAdmin';
                  const isSecondary = u.role === 'secondaryAdmin';

                  return (
                    <tr
                      key={u.uid}
                      onClick={() => setSelectedUser(u)}
                      className={`group transition-colors cursor-pointer ${
                        isDark ? 'hover:bg-white/[0.03]' : 'hover:bg-black/[0.02]'
                      }`}
                    >
                      {/* 1. User Identity */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div
                            style={{
                              backgroundColor: isDark ? '#171923' : '#F1F1F4',
                              borderColor: colors.borderSubtle,
                            }}
                            className="w-10 h-10 rounded-full border flex items-center justify-center font-bold text-sm shadow-xs overflow-hidden shrink-0"
                          >
                            {u.photoURL ? (
                              <img src={u.photoURL} alt={u.displayName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            ) : (
                              <span style={{ color: colors.primaryText }}>
                                {(u.displayName || u.email || 'U')[0].toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div className="min-w-0 flex flex-col">
                            <span style={{ color: colors.primaryText }} className="text-xs sm:text-sm font-bold truncate">
                              {u.displayName || 'UniFlow Student'}
                            </span>
                            <span style={{ color: colors.mutedText }} className="text-[11px] font-mono truncate">
                              {u.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* 2. Role */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        {isPrimary ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30 shadow-xs">
                            <ShieldAlert className="w-3 h-3 text-amber-400" />
                            Primary Admin
                          </span>
                        ) : isSecondary ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                            <ShieldCheck className="w-3 h-3 text-violet-400" />
                            Secondary Admin
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
                            <UserIcon className="w-3 h-3 text-zinc-400" />
                            Student User
                          </span>
                        )}
                      </td>

                      {/* 3. Provider & Verified */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-xs font-mono capitalize" style={{ color: colors.primaryText }}>
                            {u.provider?.replace('.com', '') || 'Google'}
                          </span>
                          <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
                            <CheckCircle className="w-3 h-3" /> Email Verified
                          </span>
                        </div>
                      </td>

                      {/* 4. Last Active */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex flex-col text-[11px] font-mono" style={{ color: colors.mutedText }}>
                          <span>{new Date(u.lastSignInTime).toLocaleDateString()}</span>
                          <span className="text-[10px] text-zinc-500">{new Date(u.lastSignInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </td>

                      {/* 5. Actions */}
                      <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedUser(u);
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-violet-400 hover:bg-violet-500/10 transition-colors inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* User Detail Inspection Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div
            style={{
              backgroundColor: isDark ? '#13141f' : '#FFFFFF',
              borderColor: colors.border,
            }}
            className="w-full max-w-lg rounded-3xl border shadow-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute right-5 top-5 p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4">
              <div
                style={{
                  backgroundColor: isDark ? '#171923' : '#F1F1F4',
                  borderColor: colors.borderSubtle,
                }}
                className="w-16 h-16 rounded-2xl border flex items-center justify-center font-bold text-xl shadow-md overflow-hidden shrink-0"
              >
                {selectedUser.photoURL ? (
                  <img src={selectedUser.photoURL} alt={selectedUser.displayName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <span style={{ color: colors.primaryText }}>
                    {(selectedUser.displayName || selectedUser.email || 'U')[0].toUpperCase()}
                  </span>
                )}
              </div>

              <div>
                <h3 style={{ color: colors.primaryText }} className="text-lg font-bold tracking-tight">
                  {selectedUser.displayName || 'UniFlow Student'}
                </h3>
                <p style={{ color: colors.mutedText }} className="text-xs font-mono">
                  {selectedUser.email}
                </p>
                <div className="mt-1.5">
                  {selectedUser.role === 'primaryAdmin' ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Primary Administrator (Owner)
                    </span>
                  ) : selectedUser.role === 'secondaryAdmin' ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                      Secondary Administrator
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
                      Student User
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="space-y-3 pt-2">
              {/* UID with copy */}
              <div 
                style={{
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                  borderColor: colors.borderSubtle,
                }}
                className="p-3 rounded-2xl border flex items-center justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                    Firebase Auth UID
                  </span>
                  <span className="text-xs font-mono font-semibold" style={{ color: colors.primaryText }}>
                    {selectedUser.uid}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyUid(selectedUser.uid)}
                  className="p-2 rounded-xl hover:bg-violet-500/20 text-violet-400 transition-colors cursor-pointer"
                  title="Copy UID"
                >
                  {copiedUid === selectedUser.uid ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Provider & Verified */}
              <div className="grid grid-cols-2 gap-3">
                <div 
                  style={{
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                    borderColor: colors.borderSubtle,
                  }}
                  className="p-3 rounded-2xl border"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                    Auth Provider
                  </span>
                  <span className="text-xs font-mono font-semibold capitalize" style={{ color: colors.primaryText }}>
                    {selectedUser.provider || 'Google OAuth'}
                  </span>
                </div>

                <div 
                  style={{
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                    borderColor: colors.borderSubtle,
                  }}
                  className="p-3 rounded-2xl border"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                    Email Status
                  </span>
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5" /> Verified
                  </span>
                </div>
              </div>

              {/* Timestamps */}
              <div className="grid grid-cols-2 gap-3">
                <div 
                  style={{
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                    borderColor: colors.borderSubtle,
                  }}
                  className="p-3 rounded-2xl border"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                    Account Created
                  </span>
                  <span className="text-xs font-mono" style={{ color: colors.primaryText }}>
                    {new Date(selectedUser.creationTime).toLocaleString()}
                  </span>
                </div>

                <div 
                  style={{
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                    borderColor: colors.borderSubtle,
                  }}
                  className="p-3 rounded-2xl border"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                    Last Sign In
                  </span>
                  <span className="text-xs font-mono" style={{ color: colors.primaryText }}>
                    {new Date(selectedUser.lastSignInTime).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                style={{
                  backgroundColor: colors.accent,
                  color: '#FFFFFF',
                }}
                className="px-6 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
