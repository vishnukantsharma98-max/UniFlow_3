import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, Bot, Gamepad2, Library, LayoutGrid, ArrowUpRight, Sparkles } from 'lucide-react';
import { SEARCH_INDEX } from '../data';
import { SearchResultItem } from '../types';

interface SearchSpotlightModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchSpotlightModal: React.FC<SearchSpotlightModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = ['All', 'Study', 'Exam Vault', 'AI Hub', 'Games', 'Apps', 'Books', 'Resources'];

  const filteredResults = SEARCH_INDEX.filter((item: SearchResultItem) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase()) ||
                         item.type.toLowerCase().includes(query.toLowerCase()) ||
                         item.category.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'AI Hub': return <Bot className="w-4 h-4 text-pink-400" />;
      case 'Games': return <Gamepad2 className="w-4 h-4 text-amber-400" />;
      case 'Books': return <Library className="w-4 h-4 text-purple-400" />;
      case 'Apps': return <LayoutGrid className="w-4 h-4 text-indigo-400" />;
      default: return <BookOpen className="w-4 h-4 text-violet-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-[#0e0a18]/95 border border-purple-500/20 rounded-2xl shadow-[0_20px_60px_-15px_rgba(168,85,247,0.3)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
          <Search className="w-5 h-5 text-purple-400 shrink-0 animate-pulse" />
          <input
            type="text"
            placeholder="Search notes, PYQs, AI models, games, books, cheat sheets..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-white text-base focus:outline-none placeholder:text-slate-400"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={onClose}
            className="px-2 py-1 text-xs font-medium text-slate-400 bg-white/5 border border-white/10 rounded-md hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 px-4 py-2.5 overflow-x-auto border-b border-white/5 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-purple-600/30 text-purple-200 border border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.2)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredResults.length > 0 ? (
            filteredResults.map((item) => (
              <a
                key={item.id}
                href={item.link}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all group border border-transparent hover:border-purple-500/20"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/5 group-hover:border-purple-500/30">
                    {getCategoryIcon(item.category)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                        {item.title}
                      </span>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400">{item.type} · <span className="text-purple-400">{item.category}</span></p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            ))
          ) : (
            <div className="text-center py-10 px-4">
              <Sparkles className="w-8 h-8 text-purple-400/50 mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-300">No matching student resources found</p>
              <p className="text-xs text-slate-500 mt-1">Try searching for &quot;DSA&quot;, &quot;PYQ&quot;, &quot;Math&quot;, or &quot;AI&quot;</p>
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2.5 bg-black/40 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
          <span>Search 30,000+ indexed university resources</span>
          <span className="text-purple-400 font-medium">UniFlow Ecosystem</span>
        </div>
      </div>
    </div>
  );
};
