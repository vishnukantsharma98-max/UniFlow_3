import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Copy, 
  Check, 
  ExternalLink, 
  RefreshCw, 
  Sparkles, 
  X, 
  ChevronRight,
  Globe
} from 'lucide-react';

interface AuthDomainModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
  onContinueDemo: () => void;
  domain?: string;
}

export const AuthDomainModal: React.FC<AuthDomainModalProps> = ({
  isOpen,
  onClose,
  onRetry,
  onContinueDemo,
  domain,
}) => {
  const [copied, setCopied] = useState(false);
  const currentDomain = domain || (typeof window !== 'undefined' ? window.location.hostname : '');
  const firebaseConsoleUrl = 'https://console.firebase.google.com/project/uniflow-280b5/authentication/settings';

  if (!isOpen) return null;

  const handleCopy = async () => {
    if (!currentDomain) return;
    try {
      await navigator.clipboard.writeText(currentDomain);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = currentDomain;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#0e0c18] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_50px_rgba(168,85,247,0.2)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient background glows */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-fuchsia-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400 shadow-inner">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Firebase Domain Setup
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1 font-display tracking-tight">
              Authorize This Domain
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              Firebase Authentication requires your current preview domain to be registered in your Firebase project (<code className="text-purple-300 font-mono text-xs">uniflow-280b5</code>) to allow Google Sign-In.
            </p>
          </div>
        </div>

        {/* Domain Copy Box */}
        <div className="mt-5 p-4 rounded-2xl bg-[#171328] border border-purple-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <Globe className="w-4 h-4 text-purple-400 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
                Domain to Authorize
              </span>
              <code className="text-xs sm:text-sm font-mono font-medium text-purple-200 truncate block">
                {currentDomain}
              </code>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-200 text-xs font-semibold transition-all shrink-0 cursor-pointer active:scale-95 shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Domain</span>
              </>
            )}
          </button>
        </div>

        {/* 3 Quick Steps */}
        <div className="mt-5 space-y-2.5">
          <div className="flex items-start gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-slate-300">
            <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 font-bold flex items-center justify-center shrink-0 text-[11px]">
              1
            </span>
            <div className="flex-1">
              <span>Open </span>
              <a 
                href={firebaseConsoleUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-purple-300 hover:text-purple-200 underline font-medium inline-flex items-center gap-1"
              >
                Firebase Console &gt; Auth Settings
                <ExternalLink className="w-3 h-3 inline" />
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-slate-300">
            <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 font-bold flex items-center justify-center shrink-0 text-[11px]">
              2
            </span>
            <div className="flex-1">
              Under <strong>Authorized domains</strong>, click <strong>Add domain</strong> and paste the copied domain above.
            </div>
          </div>

          <div className="flex items-start gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-slate-300">
            <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 font-bold flex items-center justify-center shrink-0 text-[11px]">
              3
            </span>
            <div className="flex-1">
              Click <strong>Save</strong>, then click <strong>Retry Google Sign-In</strong> below!
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onContinueDemo}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Continue in Demo Mode (Preview)</span>
          </button>

          <div className="w-full sm:w-auto flex items-center gap-2">
            <a
              href={firebaseConsoleUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-semibold text-white transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Console</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={onRetry}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Sign-In</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
