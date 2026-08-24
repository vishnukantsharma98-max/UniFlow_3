import React, { createContext, useContext, useState, useCallback } from 'react';
import { PasswordGateModal, PasswordGateTarget, GLOBAL_PASSWORD } from './PasswordGateModal';
import { Lock, ShieldCheck } from 'lucide-react';

/**
 * Exempt URL verification
 * Instagram, WhatsApp, and LinkedIn are personal links that always bypass the password modal.
 */
export function isExemptPersonalLink(url?: string | null): boolean {
  if (!url) return false;
  const lower = url.toLowerCase();
  return (
    lower.includes('instagram.com') ||
    lower.includes('instagr.am') ||
    lower.includes('whatsapp.com') ||
    lower.includes('wa.me') ||
    lower.includes('api.whatsapp.com') ||
    lower.includes('linkedin.com')
  );
}

interface PasswordGateContextType {
  openProtectedResource: (url: string, title?: string, target?: string) => void;
  isExemptUrl: (url: string) => boolean;
  globalPassword: string;
}

const PasswordGateContext = createContext<PasswordGateContextType | undefined>(undefined);

export const PasswordGateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    target: PasswordGateTarget | null;
  }>({
    isOpen: false,
    target: null,
  });

  const openProtectedResource = useCallback(
    (url: string, title?: string, target: string = '_blank') => {
      if (!url || !url.trim()) return;

      const trimmedUrl = url.trim();

      // Check if this is an exempt personal social link
      if (isExemptPersonalLink(trimmedUrl)) {
        window.open(trimmedUrl, target, 'noopener,noreferrer');
        return;
      }

      // Check if this is an internal link (e.g. /app/...)
      if (trimmedUrl.startsWith('/app') || trimmedUrl.startsWith('#')) {
        window.location.href = trimmedUrl;
        return;
      }

      // Open the global instant password gate modal
      setModalState({
        isOpen: true,
        target: {
          url: trimmedUrl,
          title,
          target,
        },
      });
    },
    []
  );

  const handleClose = useCallback(() => {
    setModalState({
      isOpen: false,
      target: null,
    });
  }, []);

  return (
    <PasswordGateContext.Provider
      value={{
        openProtectedResource,
        isExemptUrl: isExemptPersonalLink,
        globalPassword: GLOBAL_PASSWORD,
      }}
    >
      {children}
      <PasswordGateModal
        isOpen={modalState.isOpen}
        target={modalState.target}
        onClose={handleClose}
      />
    </PasswordGateContext.Provider>
  );
};

export function usePasswordGate(): PasswordGateContextType {
  const context = useContext(PasswordGateContext);
  if (!context) {
    // Fallback safe handler if outside provider
    return {
      openProtectedResource: (url: string, _title?: string, target: string = '_blank') => {
        if (!url) return;
        window.open(url, target, 'noopener,noreferrer');
      },
      isExemptUrl: isExemptPersonalLink,
      globalPassword: GLOBAL_PASSWORD,
    };
  }
  return context;
}

/**
 * Reusable ProtectedLink Component
 * Seamlessly replaces standard <a href="..."> or custom buttons with the instant password-gate.
 */
interface ProtectedLinkProps {
  url: string;
  title?: string;
  target?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  id?: string;
  disabled?: boolean;
}

export const ProtectedLink: React.FC<ProtectedLinkProps> = ({
  url,
  title,
  target = '_blank',
  className = '',
  children,
  onClick,
  id,
  disabled = false,
}) => {
  const { openProtectedResource } = usePasswordGate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (disabled) return;
    if (onClick) {
      onClick(e);
    }
    openProtectedResource(url, title, target);
  };

  return (
    <button
      id={id}
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  );
};

/**
 * Reusable Password Badge / Pill
 */
interface PasswordBadgeProps {
  className?: string;
  isPersonalLink?: boolean;
  prefix?: string;
}

export const PasswordBadge: React.FC<PasswordBadgeProps> = ({
  className = '',
  isPersonalLink = false,
  prefix = 'Pass:',
}) => {
  if (isPersonalLink) {
    return (
      <span
        className={`text-[10px] font-bold text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 inline-flex items-center gap-1 ${className}`}
      >
        <ShieldCheck className="w-3 h-3" />
        <span>Direct Access</span>
      </span>
    );
  }

  return (
    <span
      className={`text-[10px] font-bold text-red-400 dark:text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-500/30 inline-flex items-center gap-1 ${className}`}
    >
      <Lock className="w-2.5 h-2.5" />
      <span>{prefix} {GLOBAL_PASSWORD}</span>
    </span>
  );
};
