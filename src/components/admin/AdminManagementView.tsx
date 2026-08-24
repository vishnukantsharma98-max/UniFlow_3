import React, { useState, useEffect, useCallback } from 'react';
import { User } from 'firebase/auth';
import { 
  ShieldCheck, 
  ShieldAlert, 
  UserPlus, 
  Trash2, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Mail, 
  Key, 
  Lock, 
  ShieldX,
  Info,
  X
} from 'lucide-react';
import { useTheme } from '../dashboard/ThemeSystem';
import { AdminRecord } from '../../types';
import { 
  fetchAdminsList, 
  addSecondaryAdminApi, 
  removeSecondaryAdminApi,
  PRIMARY_ADMIN_EMAIL 
} from '../../firebase/firestoreService';

interface AdminManagementViewProps {
  currentUser: User;
  isPrimaryAdmin: boolean;
}

export const AdminManagementView: React.FC<AdminManagementViewProps> = ({ 
  currentUser, 
  isPrimaryAdmin 
}) => {
  const { colors, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const [admins, setAdmins] = useState<AdminRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newAdminEmail, setNewAdminEmail] = useState<string>('');
  const [grantState, setGrantState] = useState<'idle' | 'granting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Revocation Confirmation Modal state
  const [adminToRevoke, setAdminToRevoke] = useState<string | null>(null);
  const [isRevoking, setIsRevoking] = useState<boolean>(false);

  const loadAdmins = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAdminsList(currentUser);
      setAdmins(data);
    } catch (err: any) {
      console.error('[UniFlow] Error loading admins list:', err);
      setError(err.message || 'Failed to load administrator accounts.');
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    loadAdmins();
  }, [loadAdmins]);

  const handleAddSecondary = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail.trim() || !isPrimaryAdmin || grantState === 'granting') return;

    const emailToAdd = newAdminEmail.trim().toLowerCase();

    setGrantState('granting');
    setMessage(null);

    // Timeout safety fallback to prevent UI hanging under any circumstances
    const timeoutTimer = setTimeout(() => {
      setGrantState((curr) => {
        if (curr === 'granting') {
          setMessage({
            type: 'error',
            text: 'Request timed out after 10 seconds. Please verify network connection and retry.'
          });
          return 'error';
        }
        return curr;
      });
    }, 10000);

    try {
      const res = await addSecondaryAdminApi(emailToAdd, currentUser);
      clearTimeout(timeoutTimer);

      if (res.success) {
        setGrantState('success');
        setMessage({ type: 'success', text: res.message || `Granted Secondary Admin access to ${emailToAdd}` });
        setNewAdminEmail('');
        
        // Fast local update
        if (res.admin) {
          setAdmins((prev) => {
            const exists = prev.some(a => a.email.toLowerCase() === emailToAdd);
            if (exists) return prev;
            return [...prev, res.admin!];
          });
        } else {
          loadAdmins();
        }
      } else {
        setGrantState('error');
        setMessage({ type: 'error', text: res.message || 'Failed to add secondary admin' });
      }
    } catch (err: any) {
      clearTimeout(timeoutTimer);
      setGrantState('error');
      setMessage({ type: 'error', text: err.message || 'Error occurred while adding admin' });
    }
  };

  const confirmRevokeSecondary = async () => {
    if (!adminToRevoke || !isPrimaryAdmin) return;
    const email = adminToRevoke;

    if (email.toLowerCase() === PRIMARY_ADMIN_EMAIL.toLowerCase()) {
      setMessage({ type: 'error', text: 'The Primary Admin cannot be removed or demoted.' });
      setAdminToRevoke(null);
      return;
    }

    setIsRevoking(true);
    try {
      const res = await removeSecondaryAdminApi(email, currentUser);
      if (res.success) {
        setMessage({ type: 'success', text: `Revoked Secondary Admin access for ${email}` });
        // Fast optimistic removal
        setAdmins((prev) => prev.filter(a => a.email.toLowerCase() !== email.toLowerCase()));
      } else {
        setMessage({ type: 'error', text: res.message || 'Failed to revoke admin access' });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error revoking admin' });
    } finally {
      setIsRevoking(false);
      setAdminToRevoke(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 style={{ color: colors.primaryText }} className="text-xl sm:text-2xl font-extrabold tracking-tight flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-violet-400" />
            Administrator Access & Hierarchy
          </h2>
          <p style={{ color: colors.mutedText }} className="text-xs sm:text-sm mt-1">
            Manage administrative credentials, secondary roles, and authorization boundaries.
          </p>
        </div>

        <button
          type="button"
          onClick={loadAdmins}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold self-start sm:self-auto hover:opacity-80 transition-opacity cursor-pointer"
          style={{
            borderColor: colors.borderSubtle,
            color: colors.primaryText,
            backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'
          }}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh List</span>
        </button>
      </div>

      {/* Grant Secondary Admin Access Card (Primary Admin Only) */}
      {isPrimaryAdmin ? (
        <div 
          style={{
            backgroundColor: isDark ? 'rgba(18, 19, 28, 0.7)' : 'rgba(255, 255, 255, 0.8)',
            borderColor: colors.borderSubtle,
            backdropFilter: 'blur(20px)',
          }}
          className="p-5 sm:p-6 rounded-3xl border shadow-xl space-y-4"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 style={{ color: colors.primaryText }} className="text-sm sm:text-base font-bold">
                Assign Secondary Admin
              </h3>
              <p style={{ color: colors.mutedText }} className="text-xs">
                Enter any student's authorized Google email to grant Secondary Admin access.
              </p>
            </div>
          </div>

          <form onSubmit={handleAddSecondary} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                placeholder="colleague@gmail.com"
                style={{
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
                  borderColor: colors.borderSubtle,
                  color: colors.primaryText,
                }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={grantState === 'granting' || !newAdminEmail.trim()}
              className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-violet-500/20 flex items-center justify-center gap-2"
            >
              {grantState === 'granting' ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Granting...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Grant Secondary Admin</span>
                </>
              )}
            </button>
          </form>

          {message && (
            <div className={`p-3 rounded-xl border text-xs font-medium flex items-center gap-2 ${
              message.type === 'success' 
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
            }`}>
              {message.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              <span>{message.text}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 text-amber-400 text-xs">
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Secondary Admin Session:</span> You have view privileges over administrator listings, student profiles, and reviews. Role assignment and revocations are restricted to the Primary Admin ({PRIMARY_ADMIN_EMAIL}).
          </div>
        </div>
      )}

      {/* Active Administrators Roster */}
      <div 
        style={{
          backgroundColor: isDark ? 'rgba(18, 19, 28, 0.7)' : 'rgba(255, 255, 255, 0.8)',
          borderColor: colors.borderSubtle,
          backdropFilter: 'blur(20px)',
        }}
        className="p-5 sm:p-6 rounded-3xl border shadow-xl space-y-4"
      >
        <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: colors.borderSubtle }}>
          <h3 style={{ color: colors.primaryText }} className="text-base font-extrabold tracking-tight flex items-center gap-2">
            <Lock className="w-4 h-4 text-violet-400" />
            Current Authorized Administrators
          </h3>
          <span className="text-xs text-zinc-500 font-mono">
            {admins.length} Total Account{admins.length === 1 ? '' : 's'}
          </span>
        </div>

        {loading ? (
          <div className="py-10 text-center flex flex-col items-center justify-center gap-2">
            <RefreshCw className="w-6 h-6 text-violet-400 animate-spin" />
            <p style={{ color: colors.mutedText }} className="text-xs">Loading administrators...</p>
          </div>
        ) : error ? (
          <div className="py-6 text-center space-y-2 text-rose-400">
            <AlertCircle className="w-6 h-6 mx-auto" />
            <p className="text-xs font-bold">{error}</p>
            <button
              type="button"
              onClick={loadAdmins}
              className="text-xs underline hover:no-underline font-bold"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {admins.map((adm) => {
              const isPrimary = adm.role === 'primaryAdmin' || adm.email.toLowerCase() === PRIMARY_ADMIN_EMAIL.toLowerCase();

              return (
                <div
                  key={adm.id || adm.email}
                  style={{
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
                    borderColor: colors.borderSubtle,
                  }}
                  className="p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-violet-500/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold ${
                      isPrimary 
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                        : 'bg-violet-500/10 text-violet-400 border border-violet-500/20'
                    }`}>
                      {isPrimary ? <Key className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span style={{ color: colors.primaryText }} className="text-sm font-bold font-mono">
                          {adm.email}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          isPrimary
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            : 'bg-violet-500/10 text-violet-400 border-violet-500/20'
                        }`}>
                          {isPrimary ? 'Primary Admin (Master)' : 'Secondary Admin'}
                        </span>
                      </div>

                      <p style={{ color: colors.mutedText }} className="text-[11px] mt-0.5">
                        Added by {adm.addedBy} • {new Date(adm.addedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  {isPrimaryAdmin && !isPrimary && (
                    <button
                      type="button"
                      onClick={() => setAdminToRevoke(adm.email)}
                      className="px-3 py-1.5 rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
                      title={`Revoke access for ${adm.email}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Revoke Access</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Confirmation Modal for Revoking Access */}
      {adminToRevoke && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div 
            style={{
              backgroundColor: isDark ? '#12131C' : '#FFFFFF',
              borderColor: colors.borderSubtle,
            }}
            className="w-full max-w-sm rounded-3xl border shadow-2xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: colors.borderSubtle }}>
              <div className="flex items-center gap-2 text-rose-400">
                <ShieldX className="w-5 h-5" />
                <h3 className="text-base font-bold">Revoke Admin Access</h3>
              </div>
              <button
                type="button"
                onClick={() => setAdminToRevoke(null)}
                className="text-zinc-400 hover:text-zinc-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p style={{ color: colors.primaryText }} className="text-xs sm:text-sm leading-relaxed">
              Are you sure you want to remove Secondary Admin privileges for <span className="font-mono font-bold text-violet-400">{adminToRevoke}</span>? They will immediately lose access to the Admin Portal.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setAdminToRevoke(null)}
                disabled={isRevoking}
                className="px-4 py-2 rounded-xl border border-zinc-500/20 text-zinc-400 hover:text-zinc-200 text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmRevokeSecondary}
                disabled={isRevoking}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                {isRevoking ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                <span>Confirm Revoke</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
