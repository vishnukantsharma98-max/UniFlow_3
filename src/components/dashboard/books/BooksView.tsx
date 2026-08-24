import React, { useState, useMemo, useEffect } from 'react';
import { 
  Library, 
  Search, 
  ArrowLeft, 
  Lock, 
  Layers, 
  X,
  BookOpen,
  BookMarked
} from 'lucide-react';
import { 
  BOOK_CATEGORIES, 
  BOOK_RESOURCES_DATA, 
  BookCategory, 
  BookResource 
} from './BooksData';
import { BookCategoryCard } from './BookCategoryCard';
import { BookResourceCard } from './BookResourceCard';
import { useTheme } from '../ThemeSystem';
import { parseRoute, navigate, goBack } from '../navigationRouter';
import { usePasswordGate } from '../passwordGate/PasswordGateContext';

export const BooksView: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const { openProtectedResource } = usePasswordGate();

  // Read current route state from URL
  const getCurrentState = () => {
    const parsed = parseRoute(window.location.pathname);
    if (parsed.page === 'books' && parsed.booksState) {
      if (parsed.booksState.mode === 'category' && parsed.booksState.context.category) {
        const found = BOOK_CATEGORIES.find((c) => c.id === parsed.booksState?.context.category);
        if (found) {
          return { mode: 'category' as const, selectedCategory: found };
        }
      }
    }
    // Fallback URL segment check
    const segments = window.location.pathname.split('/').filter(Boolean);
    if (segments[1] === 'books' && segments[2]) {
      const found = BOOK_CATEGORIES.find((c) => c.id === segments[2]);
      if (found) {
        return { mode: 'category' as const, selectedCategory: found };
      }
    }
    return { mode: 'booksHome' as const, selectedCategory: null as BookCategory | null };
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

  const navigateToCategory = (cat: BookCategory) => {
    navigate(`/app/books/${cat.id}`);
    setViewState({ mode: 'category', selectedCategory: cat });
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToBooksHome = () => {
    goBack('/app/books');
    setViewState({ mode: 'booksHome', selectedCategory: null });
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dynamic counts for each category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    BOOK_CATEGORIES.forEach((cat) => {
      counts[cat.id] = BOOK_RESOURCES_DATA.filter((r) => r.category === cat.id).length;
    });
    return counts;
  }, []);

  // Filtered resources when searching
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return BOOK_RESOURCES_DATA.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.categoryLabel.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Resources for active category
  const currentCategoryResources = useMemo(() => {
    if (viewState.mode !== 'category' || !viewState.selectedCategory) return [];
    return BOOK_RESOURCES_DATA.filter((r) => r.category === viewState.selectedCategory?.id);
  }, [viewState]);

  const handleOpenResource = (res: BookResource) => {
    if (!res.url) return;
    openProtectedResource(res.url, res.title);
  };

  // Red Password Notice Banner
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
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-8 py-6 pb-24 font-sans animate-fade-in">
      {/* 1. TOP BACK BUTTON (WHEN INSIDE A SPECIFIC CATEGORY) */}
      {viewState.mode === 'category' && (
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <button
            type="button"
            onClick={handleBackToBooksHome}
            className="px-5 py-2.5 rounded-full text-indigo-700 dark:text-indigo-300 font-extrabold text-sm flex items-center gap-2 transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer border border-white/40 bg-white/80 dark:bg-slate-800/90 backdrop-blur-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Books</span>
          </button>

          {viewState.selectedCategory && (
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400">
              <span 
                onClick={handleBackToBooksHome} 
                className="hover:underline cursor-pointer"
              >
                Books & Libraries
              </span>
              <span>/</span>
              <span className="text-gray-900 dark:text-white font-black">
                {viewState.selectedCategory.name}
              </span>
            </div>
          )}
        </div>
      )}

      {/* 2. HEADER TITLE & SEARCH (WHEN ON BOOKS HOME) */}
      {viewState.mode === 'booksHome' && (
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Library className="w-3.5 h-3.5" />
            <span>Digital Library & Literature Vault</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight mb-3">
            Books & Libraries
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">
            Explore curated book categories and open-access repositories across Fiction, Self-Help, Non-Fiction, Finance, Mysteries, and Classic Novels.
          </p>

          {renderPasswordBanner()}

          {/* Search Box */}
          <div className="max-w-xl mx-auto mt-6 relative">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 absolute left-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search book libraries or categories..."
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
        </div>
      )}

      {/* 3. ACTIVE SEARCH RESULTS VIEW */}
      {searchQuery.trim() !== '' && viewState.mode === 'booksHome' ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              <Search className="w-5 h-5 text-indigo-500" />
              <span>Search Results ({searchResults.length})</span>
            </h2>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Clear Search
            </button>
          </div>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {searchResults.map((res) => (
                <BookResourceCard
                  key={res.id}
                  resource={res}
                  onOpenResource={handleOpenResource}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 max-w-lg mx-auto">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3 opacity-50" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                No Book Resources Found
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                No library or repository matches "{searchQuery}". Try a different keyword.
              </p>
            </div>
          )}
        </div>
      ) : (
        /* 4. DEFAULT VIEWS (MAIN 6 CATEGORY FOLDERS OR INNER CATEGORY RESOURCES) */
        <>
          {viewState.mode === 'booksHome' ? (
            /* MAIN BOOKS VIEW: EXACT 6 CATEGORY FOLDERS */
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                    Book Categories
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Select a genre or category to access curated online libraries and public domain collections.
                  </p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  {BOOK_CATEGORIES.length} Categories
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {BOOK_CATEGORIES.map((cat) => (
                  <BookCategoryCard
                    key={cat.id}
                    category={cat}
                    resourceCount={categoryCounts[cat.id] || 0}
                    onClick={() => navigateToCategory(cat)}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* INNER CATEGORY VIEW: LIST OF EXACT RESOURCES IN SELECTED CATEGORY */
            <div className="space-y-6">
              {viewState.selectedCategory && (
                <div className="p-6 sm:p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-950/40 via-purple-950/30 to-slate-900/40 border border-white/10 shadow-2xl backdrop-blur-xl relative overflow-hidden mb-8">
                  <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4 sm:gap-5">
                      <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br ${viewState.selectedCategory.gradient} flex items-center justify-center text-white shadow-xl shrink-0`}>
                        <BookOpen className="w-8 h-8 sm:w-10 sm:h-10" />
                      </div>
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 border border-white/20 text-white text-[11px] font-extrabold uppercase tracking-wider mb-2">
                          <Layers className="w-3 h-3" />
                          <span>Category Collection</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                          {viewState.selectedCategory.name}
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-300 max-w-xl mt-1">
                          {viewState.selectedCategory.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
                      <span className="px-4 py-2 rounded-2xl bg-white/10 text-white font-black text-xs border border-white/20">
                        {currentCategoryResources.length} Libraries & Catalogs
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {renderPasswordBanner()}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {currentCategoryResources.map((res) => (
                  <BookResourceCard
                    key={res.id}
                    resource={res}
                    onOpenResource={handleOpenResource}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
