import React, { useState } from 'react';
import { KeyRound, Check, Copy } from 'lucide-react';

interface PasswordChipProps {
  password?: string;
  className?: string;
}

export const PasswordChip: React.FC<PasswordChipProps> = ({ 
  password = 'vishnu',
  className = ''
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={handleCopy}
      title="Click to copy password"
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-mono font-semibold cursor-pointer hover:bg-amber-500/20 active:scale-95 transition-all select-none group shadow-xs ${className}`}
    >
      <KeyRound className="w-3.5 h-3.5 text-amber-400 shrink-0" />
      <span className="text-zinc-400 group-hover:text-zinc-300 transition-colors">
        Password:
      </span>
      <span className="font-bold text-amber-300 group-hover:text-amber-200">
        {password}
      </span>
      <span className="ml-1 opacity-70 group-hover:opacity-100 transition-opacity">
        {copied ? (
          <Check className="w-3 h-3 text-emerald-400 inline" />
        ) : (
          <Copy className="w-3 h-3 text-amber-400 inline" />
        )}
      </span>
    </div>
  );
};
