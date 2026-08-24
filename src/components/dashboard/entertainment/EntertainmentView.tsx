import React from 'react';
import { 
  Tv, 
  Film, 
  ExternalLink, 
  Lock, 
  Flame
} from 'lucide-react';
import { useTheme } from '../ThemeSystem';
import { usePasswordGate } from '../passwordGate/PasswordGateContext';

export const EntertainmentView: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const { openProtectedResource } = usePasswordGate();

  const entertainmentResource = {
    title: 'TBCPL',
    url: 'https://tbcpl.lol/',
    description: 'Movies, Shows, Web Series, Anime, Manga, Live TV & Sports, Apps',
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-8 py-6 pb-24 font-sans animate-fade-in">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-500/10 via-rose-500/10 to-pink-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
          <Film className="w-3.5 h-3.5" />
          <span>Streaming & Entertainment Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight mb-3">
          Entertainment
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">
          Access all-in-one entertainment streaming for movies, shows, anime, live TV, sports, and media.
        </p>

        {/* Global Password Notice Banner */}
        <div className="mt-5 p-3.5 sm:p-4 bg-red-500/10 dark:bg-red-950/60 border-2 border-red-500/40 text-red-600 dark:text-red-400 rounded-2xl font-black text-center text-sm sm:text-base shadow-lg max-w-xl mx-auto flex items-center justify-center gap-2.5">
          <Lock className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 animate-pulse" />
          <span>
            IMPORTANT: The password is{' '}
            <span className="font-black text-red-600 dark:text-red-400 uppercase underline decoration-2 underline-offset-4 tracking-wider">
              VISHNU
            </span>
          </span>
        </div>
      </div>

      {/* Main Entertainment Resource Card */}
      <div className="max-w-2xl mx-auto">
        <div
          id="entertainment-card-tbcpl"
          style={{
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(24px) saturate(160%)',
            WebkitBackdropFilter: 'blur(24px) saturate(160%)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)',
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          className="group border text-gray-900 dark:text-white p-7 sm:p-9 rounded-[2.5rem] shadow-2xl hover:shadow-red-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
        >
          {/* Ambient glow */}
          <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-gradient-to-br from-red-600 to-rose-600 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity pointer-events-none" />

          <div>
            {/* Header Row */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-red-600 via-rose-600 to-pink-600 flex items-center justify-center text-white shadow-xl shadow-red-500/25 group-hover:scale-105 transition-transform duration-300 shrink-0">
                <Tv className="w-9 h-9" />
              </div>

              <div className="flex flex-col items-end gap-1.5">
                <span className="text-xs font-black px-3.5 py-1.5 rounded-full bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30 uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Streaming Portal</span>
                </span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight leading-tight mb-3 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors">
              {entertainmentResource.title}
            </h2>

            {/* Exact Description */}
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-medium">
              {entertainmentResource.description}
            </p>

            {/* Feature tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['Movies', 'Shows', 'Web Series', 'Anime', 'Manga', 'Live TV & Sports', 'Apps'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-xs font-bold text-gray-700 dark:text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-5 border-t border-black/5 dark:border-white/10 space-y-4">
            {/* Password Info Pill */}
            <div className="flex items-center justify-between text-xs font-bold text-gray-500 dark:text-gray-400 bg-black/5 dark:bg-white/5 px-3.5 py-2 rounded-xl">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-red-500" />
                <span>Access Requirement</span>
              </div>
              <span className="text-red-600 dark:text-red-400 uppercase font-black tracking-wider">
                Password: vishnu
              </span>
            </div>

            {/* Launch Button */}
            <button
              type="button"
              onClick={() => openProtectedResource(entertainmentResource.url, entertainmentResource.title)}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 hover:from-red-500 hover:via-rose-500 hover:to-pink-500 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-red-600/30 hover:shadow-red-600/50 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>Launch Entertainment Portal</span>
              <ExternalLink className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
