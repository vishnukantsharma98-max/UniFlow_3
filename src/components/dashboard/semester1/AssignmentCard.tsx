import React from 'react';
import { FileText, CheckCircle2, ExternalLink, Sparkles } from 'lucide-react';
import { useTheme } from '../ThemeSystem';

interface AssignmentCardProps {
  title: string;
  subtitle?: string;
  badge?: string;
  questionUrl?: string;
  answerUrl?: string;
  index?: number;
  accentColor?: 'violet' | 'blue' | 'amber' | 'emerald' | 'cyan' | 'indigo';
}

export const AssignmentCard: React.FC<AssignmentCardProps> = ({
  title,
  subtitle,
  badge,
  questionUrl,
  answerUrl,
  index,
  accentColor = 'violet',
}) => {
  const { colors, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const hasQuestion = Boolean(questionUrl && questionUrl.trim().length > 0 && questionUrl !== 'NONE');
  const hasAnswer = Boolean(answerUrl && answerUrl.trim().length > 0 && answerUrl !== 'NONE');

  // Accent color themes
  const colorMap = {
    violet: {
      borderHover: 'hover:border-violet-500/40',
      iconBg: isDark ? 'bg-violet-500/15' : 'bg-violet-100',
      iconText: 'text-violet-400',
      badgeBg: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
      btnPrimaryBg: 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-600/20',
      btnSecondaryBorder: 'border-violet-500/30 hover:border-violet-500/60 text-violet-300 hover:bg-violet-500/10',
    },
    blue: {
      borderHover: 'hover:border-blue-500/40',
      iconBg: isDark ? 'bg-blue-500/15' : 'bg-blue-100',
      iconText: 'text-blue-400',
      badgeBg: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
      btnPrimaryBg: 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20',
      btnSecondaryBorder: 'border-blue-500/30 hover:border-blue-500/60 text-blue-300 hover:bg-blue-500/10',
    },
    amber: {
      borderHover: 'hover:border-amber-500/40',
      iconBg: isDark ? 'bg-amber-500/15' : 'bg-amber-100',
      iconText: 'text-amber-400',
      badgeBg: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      btnPrimaryBg: 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/20',
      btnSecondaryBorder: 'border-amber-500/30 hover:border-amber-500/60 text-amber-300 hover:bg-amber-500/10',
    },
    emerald: {
      borderHover: 'hover:border-emerald-500/40',
      iconBg: isDark ? 'bg-emerald-500/15' : 'bg-emerald-100',
      iconText: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      btnPrimaryBg: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20',
      btnSecondaryBorder: 'border-emerald-500/30 hover:border-emerald-500/60 text-emerald-300 hover:bg-emerald-500/10',
    },
    cyan: {
      borderHover: 'hover:border-cyan-500/40',
      iconBg: isDark ? 'bg-cyan-500/15' : 'bg-cyan-100',
      iconText: 'text-cyan-400',
      badgeBg: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
      btnPrimaryBg: 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-600/20',
      btnSecondaryBorder: 'border-cyan-500/30 hover:border-cyan-500/60 text-cyan-300 hover:bg-cyan-500/10',
    },
    indigo: {
      borderHover: 'hover:border-indigo-500/40',
      iconBg: isDark ? 'bg-indigo-500/15' : 'bg-indigo-100',
      iconText: 'text-indigo-400',
      badgeBg: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
      btnPrimaryBg: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20',
      btnSecondaryBorder: 'border-indigo-500/30 hover:border-indigo-500/60 text-indigo-300 hover:bg-indigo-500/10',
    },
  }[accentColor];

  return (
    <div
      style={{
        backgroundColor: isDark ? 'rgba(19, 21, 31, 0.72)' : 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(24px) saturate(160%)',
        borderColor: colors.borderSubtle,
      }}
      className={`group relative p-4 sm:p-5 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl ${colorMap.borderHover} flex flex-col justify-between gap-4`}
    >
      {/* Top Details */}
      <div className="flex items-start gap-3.5">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/5 transition-transform duration-200 group-hover:scale-105 ${colorMap.iconBg}`}
        >
          {badge?.toLowerCase().includes('lab') ? (
            <Sparkles className={`w-5 h-5 ${colorMap.iconText}`} />
          ) : (
            <FileText className={`w-5 h-5 ${colorMap.iconText}`} />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4
              style={{ color: colors.primaryText }}
              className="text-sm sm:text-base font-bold tracking-tight line-clamp-1"
            >
              {title}
            </h4>
            {badge && (
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider border ${colorMap.badgeBg}`}>
                {badge}
              </span>
            )}
            {hasAnswer && !badge && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border bg-emerald-500/15 text-emerald-300 border-emerald-500/30">
                Solution
              </span>
            )}
          </div>
          {subtitle && (
            <p style={{ color: colors.mutedText }} className="text-xs mt-0.5 line-clamp-1">
              {subtitle}
            </p>
          )}
          {index !== undefined && !subtitle && (
            <p style={{ color: colors.mutedText }} className="text-[11px] font-mono mt-0.5">
              Unit {Math.min(5, Math.ceil((index + 1) / 3))} • Module {index + 1}
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons (Strict rule: No dead buttons) */}
      <div className="flex items-center gap-2 pt-1">
        {hasQuestion && (
          <a
            href={questionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 active:scale-95 shadow-sm ${
              hasAnswer
                ? `border ${colorMap.btnSecondaryBorder}`
                : `${colorMap.btnPrimaryBg} shadow-md`
            }`}
          >
            <span>Open Question</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        )}

        {hasAnswer && (
          <a
            href={answerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 active:scale-95 shadow-md ${
              hasQuestion
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
                : `${colorMap.btnPrimaryBg} shadow-md`
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{hasQuestion ? 'Solution' : 'Open Solution'}</span>
            <ExternalLink className="w-3 h-3 opacity-75 ml-0.5" />
          </a>
        )}
      </div>
    </div>
  );
};
