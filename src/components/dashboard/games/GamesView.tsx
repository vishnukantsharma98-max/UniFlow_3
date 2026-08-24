import React, { useState, useMemo } from 'react';
import { 
  Gamepad2, 
  Search, 
  Lock, 
  X,
  Trophy,
  Flame,
  Play
} from 'lucide-react';
import { GAMES_DATA, GameItem } from './GamesData';
import { GameCard } from './GameCard';
import { VishnuDriftGame } from '../../VishnuDriftGame';
import { useTheme } from '../ThemeSystem';
import { usePasswordGate } from '../passwordGate/PasswordGateContext';

export const GamesView: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const { openProtectedResource } = usePasswordGate();

  const [searchQuery, setSearchQuery] = useState('');
  const [isPlayingVishnuDrift, setIsPlayingVishnuDrift] = useState(false);

  const filteredGames = useMemo(() => {
    if (!searchQuery.trim()) return GAMES_DATA;
    const q = searchQuery.toLowerCase().trim();
    return GAMES_DATA.filter(
      (game) =>
        game.name.toLowerCase().includes(q) ||
        game.category.toLowerCase().includes(q) ||
        game.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleOpenGame = (game: GameItem) => {
    openProtectedResource(game.url, game.name);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-8 py-6 pb-24 font-sans animate-fade-in">
      {/* 3D Built-in Drift Game Modal/Overlay if active */}
      {isPlayingVishnuDrift && (
        <VishnuDriftGame onClose={() => setIsPlayingVishnuDrift(false)} />
      )}

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>Interactive Gaming & Arcade Arena</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight mb-3">
          Games
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">
          Decompress and take a high-energy study break with popular web gaming platforms and our built-in 3D arena.
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

      {/* Built-in UniFlow Game Spotlight: Vishnu Drift Arena 3D */}
      <div className="mb-10 p-6 sm:p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-950/70 via-slate-900/80 to-purple-950/60 border border-indigo-500/30 shadow-2xl backdrop-blur-xl relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/20 via-indigo-500/20 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-cyan-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-cyan-500/20 shrink-0 animate-pulse">
              <Flame className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-200" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-black uppercase tracking-wider mb-2">
                <Trophy className="w-3.5 h-3.5" />
                <span>UniFlow Built-In 3D Arcade</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Vishnu Drift — Arena 3D
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 max-w-xl mt-1">
                Real-time 3D physics drift simulator with neon stadium track, high-speed banking curves, dynamic speed HUD, and live lap timing.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsPlayingVishnuDrift(true)}
            className="w-full md:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer shrink-0"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Play Vishnu Drift (In-App)</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-8 relative">
        <div className="relative flex items-center">
          <Search className="w-5 h-5 absolute left-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search web gaming platforms..."
            style={{
              backgroundColor: isDark ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(20px)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
            }}
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl border text-sm font-semibold text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-md"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Grid of Web Game Platforms */}
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onOpenGame={handleOpenGame}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 max-w-lg mx-auto">
          <Gamepad2 className="w-12 h-12 text-gray-400 mx-auto mb-3 opacity-50" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            No Game Platforms Found
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            No gaming platforms match your search "{searchQuery}".
          </p>
        </div>
      )}
    </div>
  );
};
