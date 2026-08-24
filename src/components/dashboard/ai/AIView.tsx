import React, { useState, useMemo, useEffect } from 'react';
import { 
  Sparkles, 
  Search, 
  ArrowLeft, 
  Lock, 
  Layers,
  X,
  Bot,
  Video,
  Image as ImageIcon,
  Presentation,
  Globe
} from 'lucide-react';
import { 
  AI_CATEGORIES, 
  AI_TOOLS_DATA, 
  AICategory, 
  AITool 
} from './AIData';
import { AICategoryCard } from './AICategoryCard';
import { AIToolCard } from './AIToolCard';
import { useTheme } from '../ThemeSystem';
import { parseRoute, navigate, goBack } from '../navigationRouter';
import { usePasswordGate } from '../passwordGate/PasswordGateContext';

export const AIView: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const { openProtectedResource } = usePasswordGate();

  // Read current route state
  const getCurrentState = () => {
    const parsed = parseRoute(window.location.pathname);
    if (parsed.page === 'ai' && parsed.aiState) {
      if (parsed.aiState.mode === 'category' && parsed.aiState.context.category) {
        const found = AI_CATEGORIES.find((c) => c.id === parsed.aiState?.context.category);
        if (found) {
          return { mode: 'category' as const, selectedCategory: found };
        }
      }
    }
    return { mode: 'aiHome' as const, selectedCategory: null as AICategory | null };
  };

  const [viewState, setViewState] = useState(getCurrentState);
  const [searchQuery, setSearchQuery] = useState('');

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setViewState(getCurrentState());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToCategory = (cat: AICategory) => {
    navigate(`/app/ai/${cat.id}`);
    setViewState({ mode: 'category', selectedCategory: cat });
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToAIHome = () => {
    goBack('/app/ai');
    setViewState({ mode: 'aiHome', selectedCategory: null });
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dynamic counts for each category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    AI_CATEGORIES.forEach((cat) => {
      counts[cat.id] = AI_TOOLS_DATA.filter((tool) => tool.category === cat.id).length;
    });
    return counts;
  }, []);

  // Filtered tools when actively searching
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return AI_TOOLS_DATA.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.categoryLabel.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Tools belonging ONLY to the currently selected category
  const currentCategoryTools = useMemo(() => {
    if (viewState.mode !== 'category' || !viewState.selectedCategory) return [];
    return AI_TOOLS_DATA.filter((tool) => tool.category === viewState.selectedCategory?.id);
  }, [viewState]);

  // Open password modal handler
  const handleOpenTool = (tool: AITool) => {
    openProtectedResource(tool.url, tool.name);
  };

  // Prominent Red Password Banner matching reference screenshot
  const renderPasswordBanner = () => (
    <div className="mt-2 mb-8 p-3.5 sm:p-4 bg-red-500/10 dark:bg-red-950/60 border-2 border-red-500/40 text-red-600 dark:text-red-400 rounded-2xl font-black text-center text-sm sm:text-base shadow-lg max-w-2xl mx-auto flex items-center justify-center gap-2.5">
      <Lock className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 animate-pulse" />
      <span>
        IMPORTANT: The password is{' '}
        <span className="font-black text-red-600 dark:text-red-400 uppercase underline decoration-2 underline-offset-4 tracking-wider">
          VISHNU
        </span>
      </span>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 md:px-8 py-6 pb-24 font-sans animate-fade-in">
      {/* 1. TOP BACK BUTTON (ONLY WHEN INSIDE A SPECIFIC CATEGORY) */}
      {viewState.mode === 'category' && (
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <button
            type="button"
            onClick={handleBackToAIHome}
            className="px-5 py-2.5 rounded-full text-violet-700 dark:text-violet-300 font-extrabold text-sm flex items-center gap-2 transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer border border-white/40 bg-white/80 dark:bg-slate-800/90 backdrop-blur-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to AI</span>
          </button>

          {viewState.selectedCategory && (
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400">
              <span 
                onClick={handleBackToAIHome} 
                className="hover:underline cursor-pointer"
              >
                AI
              </span>
              <span>/</span>
              <span className="text-gray-900 dark:text-white">
                {viewState.selectedCategory.title}
              </span>
            </div>
          )}
        </div>
      )}

      {/* 2. SEARCH BAR (Instant search across all AI tools) */}
      <div className="mb-8 max-w-2xl mx-auto">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="ai-search-input"
            type="text"
            placeholder="Search AI tools (e.g., ChatGPT, Claude, PixVerse, Ideogram)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              backgroundColor: isDark ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(24px) saturate(160%)',
              WebkitBackdropFilter: 'blur(24px) saturate(160%)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
            }}
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl border text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40 shadow-lg transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 3. ACTIVE SEARCH RESULTS (If user types in the search bar) */}
      {searchQuery.trim() !== '' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Search Results for "{searchQuery}" ({searchResults.length})
            </h2>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-xs font-semibold text-violet-500 hover:underline cursor-pointer"
            >
              Clear search
            </button>
          </div>

          {searchResults.length === 0 ? (
            <div className="text-center py-16 p-8 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 max-w-md mx-auto">
              <Search className="w-10 h-10 text-gray-400 mx-auto mb-3 opacity-50" />
              <h3 className="text-base font-bold text-gray-800 dark:text-gray-200">
                No matching AI tools found
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Try searching for another tool name or category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((tool) => (
                <AIToolCard key={tool.id} tool={tool} onOpenTool={handleOpenTool} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4. AI MAIN PAGE (ONLY 5 CATEGORY / FOLDER CARDS, NO TOOLS) */}
      {viewState.mode === 'aiHome' && !searchQuery.trim() && (
        <div className="space-y-8 animate-fade-in">
          {/* Hero Section */}
          <div className="text-center mb-8 flex flex-col items-center">
            {/* Glowing AI Orb Visual */}
            <div className="relative mb-6 flex items-center justify-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-violet-600 via-indigo-500 to-cyan-400 p-[2px] shadow-[0_0_50px_rgba(139,92,246,0.4)] animate-pulse">
                <div className="w-full h-full rounded-full bg-slate-950/80 backdrop-blur-xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.3)_0%,transparent_70%)] animate-spin" />
                  <Sparkles className="w-10 h-10 text-white relative z-10 drop-shadow-md" />
                </div>
              </div>
            </div>

            <div className="inline-block bg-violet-500/10 dark:bg-violet-500/20 border border-violet-500/30 px-4 py-1.5 rounded-full mb-3 shadow-xs">
              <span className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                AI Hub
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-3">
              Your intelligent toolkit.
            </h1>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
              Explore powerful AI tools for chat, video, images, presentations and websites.
            </p>
          </div>

          {renderPasswordBanner()}

          {/* EXACTLY THE 5 MAIN CATEGORY FOLDERS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {AI_CATEGORIES.map((cat) => (
              <AICategoryCard
                key={cat.id}
                category={cat}
                toolCount={categoryCounts[cat.id] || 0}
                onSelect={navigateToCategory}
              />
            ))}
          </div>
        </div>
      )}

      {/* 5. CATEGORY DETAIL PAGE (ONLY THAT SPECIFIC CATEGORY'S TOOLS) */}
      {viewState.mode === 'category' && viewState.selectedCategory && !searchQuery.trim() && (
        <div className="space-y-8 animate-fade-in">
          <div className="text-center max-w-2xl mx-auto mb-4">
            <div className="inline-block bg-white/60 dark:bg-white/10 backdrop-blur-md border border-white/30 px-4 py-1 rounded-full mb-2">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: viewState.selectedCategory.accentHex }}>
                {viewState.selectedCategory.title}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">
              {viewState.selectedCategory.title}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {viewState.selectedCategory.shortDescription} &bull; {currentCategoryTools.length} Tools
            </p>
          </div>

          {renderPasswordBanner()}

          {/* Grid of ONLY the tools belonging to this category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {currentCategoryTools.map((tool) => (
              <AIToolCard key={tool.id} tool={tool} onOpenTool={handleOpenTool} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
