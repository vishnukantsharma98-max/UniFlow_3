import React from 'react';
import { 
  Gamepad2, 
  ExternalLink, 
  Lock
} from 'lucide-react';
import { GameItem } from './GamesData';
import { useTheme } from '../ThemeSystem';

interface GameCardProps {
  game: GameItem;
  onOpenGame: (game: GameItem) => void;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  onOpenGame,
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div
      id={`game-card-${game.id}`}
      style={{
        backgroundColor: isDark ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(24px) saturate(160%)',
        WebkitBackdropFilter: 'blur(24px) saturate(160%)',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      className="group border text-gray-900 dark:text-white p-6 sm:p-7 rounded-[2rem] shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none" />

      <div>
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${game.gradient} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform shrink-0`}>
            <Gamepad2 className="w-7 h-7" />
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 uppercase tracking-wider">
              {game.category}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight leading-snug mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {game.name}
        </h3>

        {/* Description */}
        <p className="text-gray-500 dark:text-gray-300 text-xs sm:text-sm leading-relaxed mt-1 line-clamp-2">
          {game.description}
        </p>
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/10 space-y-3">
        {/* Password Info Pill */}
        <div className="flex items-center justify-between text-xs font-bold text-gray-500 dark:text-gray-400 bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-xl">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-indigo-500" />
            <span>Access Requirement</span>
          </div>
          <span className="text-indigo-600 dark:text-indigo-400 uppercase font-black tracking-wider">
            Password: vishnu
          </span>
        </div>

        {/* Launch Button */}
        <button
          type="button"
          onClick={() => onOpenGame(game)}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Launch Gaming Hub</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
