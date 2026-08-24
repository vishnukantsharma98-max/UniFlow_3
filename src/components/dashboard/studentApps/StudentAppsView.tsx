import React, { useState, useMemo } from 'react';
import { 
  AppWindow, 
  Search, 
  Lock, 
  X,
  Layers
} from 'lucide-react';
import { STUDENT_APPS_DATA, StudentAppItem } from './StudentAppsData';
import { StudentAppCard } from './StudentAppCard';
import { useTheme } from '../ThemeSystem';
import { usePasswordGate } from '../passwordGate/PasswordGateContext';

export const StudentAppsView: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const { openProtectedResource } = usePasswordGate();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredApps = useMemo(() => {
    if (!searchQuery.trim()) return STUDENT_APPS_DATA;
    const q = searchQuery.toLowerCase().trim();
    return STUDENT_APPS_DATA.filter(
      (app) =>
        app.name.toLowerCase().includes(q) ||
        app.category.toLowerCase().includes(q) ||
        app.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleOpenApp = (app: StudentAppItem) => {
    if (app.isDirectAccess) {
      window.open(app.url, '_blank', 'noopener,noreferrer');
    } else {
      openProtectedResource(app.url, app.name);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-8 py-6 pb-24 font-sans animate-fade-in">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
          <AppWindow className="w-3.5 h-3.5" />
          <span>Productivity & Utilities Suite</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight mb-3">
          Student Apps
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">
          Curated collection of essential student apps for organization, coding, design, research, and career advancement.
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
            placeholder="Search student apps (e.g., Notion, VS Code, Canva)..."
            style={{
              backgroundColor: isDark ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(20px)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
            }}
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl border text-sm font-semibold text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-md"
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

      {/* Grid of Student Apps */}
      {filteredApps.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredApps.map((app) => (
            <StudentAppCard
              key={app.id}
              app={app}
              onOpenApp={handleOpenApp}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 max-w-lg mx-auto">
          <AppWindow className="w-12 h-12 text-gray-400 mx-auto mb-3 opacity-50" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            No Apps Found
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            No applications match your search query "{searchQuery}".
          </p>
        </div>
      )}
    </div>
  );
};
