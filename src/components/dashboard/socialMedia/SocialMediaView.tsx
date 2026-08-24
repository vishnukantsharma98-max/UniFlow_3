import React, { useState, useMemo } from 'react';
import { 
  Share2, 
  Search, 
  Lock, 
  X,
  Users
} from 'lucide-react';
import { SOCIAL_MEDIA_DATA, SocialMediaItem } from './SocialMediaData';
import { SocialMediaCard } from './SocialMediaCard';
import { useTheme } from '../ThemeSystem';
import { usePasswordGate } from '../passwordGate/PasswordGateContext';

export const SocialMediaView: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const { openProtectedResource } = usePasswordGate();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return SOCIAL_MEDIA_DATA;
    const q = searchQuery.toLowerCase().trim();
    return SOCIAL_MEDIA_DATA.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleOpenItem = (item: SocialMediaItem) => {
    if (item.isDirectAccess) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else {
      openProtectedResource(item.url, item.name);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-8 py-6 pb-24 font-sans animate-fade-in">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
          <Share2 className="w-3.5 h-3.5" />
          <span>Social Media & Student Communities</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight mb-3">
          Social Media Apps
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">
          Connect with developer communities, peer study groups, campus networks, and tech forums.
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

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-8 relative">
        <div className="relative flex items-center">
          <Search className="w-5 h-5 absolute left-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search platforms (e.g., Discord, Reddit, Telegram)..."
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

      {/* Grid of Social Media Cards */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredItems.map((item) => (
            <SocialMediaCard
              key={item.id}
              item={item}
              onOpenItem={handleOpenItem}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 max-w-lg mx-auto">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-3 opacity-50" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            No Platforms Found
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            No communities match your search query "{searchQuery}".
          </p>
        </div>
      )}
    </div>
  );
};
