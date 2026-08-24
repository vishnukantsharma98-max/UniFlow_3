import React, { useState, useEffect, useRef } from 'react';
import { Lock, ArrowRight, X, AlertCircle, KeyRound, ExternalLink } from 'lucide-react';
import { useTheme } from '../ThemeSystem';

export interface PasswordGateTarget {
  url: string;
  title?: string;
  target?: string;
}

export interface PasswordGateModalProps {
  isOpen: boolean;
  target: PasswordGateTarget | null;
  onClose: () => void;
}

export const GLOBAL_PASSWORD = 'vishnu';

/**
 * Universal Zero-Delay Password Gate Modal
 * Instant client-side validation. Auto-focuses, handles enter key and escape key.
 * Triggers window.open immediately upon matching 'vishnu'.
 */
export const PasswordGateModal: React.FC<PasswordGateModalProps> = ({
  isOpen,
  target,
  onClose,
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPasswordInput('');
      setError(null);
      // Focus instantly on mount across mobile & desktop
      const focusTimer = requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
      return () => cancelAnimationFrame(focusTimer);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !target) return null;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    const cleanPass = passwordInput.trim().toLowerCase();

    if (!cleanPass) {
      setError('Please enter the password');
      inputRef.current?.focus();
      return;
    }

    if (cleanPass === GLOBAL_PASSWORD) {
      // INSTANT open: no delays, no loaders, no timeouts
      window.open(target.url, target.target || '_blank', 'noopener,noreferrer');
      onClose();
    } else {
      setError('Incorrect password');
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  };

  return (
    <div
      id="password-gate-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="password-gate-title"
    >
      <div
        id="password-gate-modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(24px) saturate(160%)',
          WebkitBackdropFilter: 'blur(24px) saturate(160%)',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)',
        }}
        className="w-full max-w-md rounded-3xl border shadow-2xl p-6 sm:p-7 relative overflow-hidden"
      >
        {/* Ambient Top Glow Accent */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          id="password-gate-close-btn"
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-900 dark:hover:text-white bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 flex items-center justify-center text-white shadow-lg shrink-0">
            <Lock className="w-6 h-6" />
          </div>
          <div className="min-w-0 pr-6">
            <h3
              id="password-gate-title"
              className="text-xl font-black text-gray-900 dark:text-white tracking-tight leading-snug"
            >
              Enter Password
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Enter the password shown on the resource card.
            </p>
          </div>
        </div>

        {/* Target Title (if present) */}
        {target.title && (
          <div className="mb-4 px-3.5 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-xs text-gray-600 dark:text-gray-300 font-medium truncate flex items-center gap-1.5">
            <ExternalLink className="w-3.5 h-3.5 shrink-0 text-indigo-500" />
            <span className="truncate">{target.title}</span>
          </div>
        )}

        {/* Password Hint Pill */}
        <div className="mb-5 p-3 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/30 text-indigo-600 dark:text-indigo-300 text-xs font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-indigo-500 shrink-0" />
            <span>Protected External Link</span>
          </div>
          <span className="font-black underline tracking-wider uppercase">
            Password: {GLOBAL_PASSWORD}
          </span>
        </div>

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="global-password-input"
              className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                ref={inputRef}
                id="global-password-input"
                type="text"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Password"
                autoComplete="off"
                autoFocus
                style={{
                  backgroundColor: isDark ? 'rgba(30, 41, 59, 0.8)' : 'rgba(241, 245, 249, 0.9)',
                  borderColor: error
                    ? 'rgba(239, 68, 68, 0.8)'
                    : isDark
                    ? 'rgba(255, 255, 255, 0.15)'
                    : 'rgba(0, 0, 0, 0.1)',
                }}
                className={`w-full px-4 py-3.5 rounded-2xl border text-sm font-semibold text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
                  error ? 'focus:ring-red-500' : 'focus:ring-indigo-500'
                } transition-all`}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div
                id="password-gate-error"
                className="flex items-center gap-1.5 mt-2 text-xs font-bold text-red-500 dark:text-red-400 animate-fade-in"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              id="password-gate-cancel-btn"
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 font-bold text-xs sm:text-sm transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              id="password-gate-submit-btn"
              type="submit"
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Open</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
