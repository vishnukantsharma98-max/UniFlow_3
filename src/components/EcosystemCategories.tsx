import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Gamepad2, 
  Library, 
  LayoutGrid, 
  PlayCircle, 
  FolderGit2, 
  ArrowRight, 
  Check, 
  Zap
} from 'lucide-react';
import { CATEGORIES_DATA } from '../data';

interface EcosystemCategoriesProps {
  onOpenAuth: () => void;
}

export const EcosystemCategories: React.FC<EcosystemCategoriesProps> = ({ onOpenAuth }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ai' | 'study' | 'resources' | 'tools'>('all');

  const getCategoryIcon = (iconName: string, className = 'w-6 h-6') => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      case 'Gamepad2': return <Gamepad2 className={className} />;
      case 'Library': return <Library className={className} />;
      case 'LayoutGrid': return <LayoutGrid className={className} />;
      case 'PlayCircle': return <PlayCircle className={className} />;
      case 'FolderGit2': return <FolderGit2 className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  const filteredCategories = CATEGORIES_DATA.filter((cat) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'ai') return cat.id === 'ai-hub';
    if (activeFilter === 'study') return cat.id === 'study' || cat.id === 'books';
    if (activeFilter === 'resources') return cat.id === 'resources' || cat.id === 'study';
    if (activeFilter === 'tools') return cat.id === 'apps' || cat.id === 'games' || cat.id === 'entertainment';
    return true;
  });

  return (
    <section id="explore" className="relative py-14 sm:py-18 lg:py-24 overflow-hidden scroll-mt-20">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Anchor landmarks for navbar linking */}
      <div id="ai-hub" className="absolute top-1/4 left-0 -mt-20 pointer-events-none" />
      <div id="resources" className="absolute top-1/2 left-0 -mt-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 scroll-reveal">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            <span>Modular Student Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight leading-tight">
            Everything you need. <br />
            <span className="text-flow-gradient">One place.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
            Stop switching across dozen tabs and unverified drives. UniFlow integrates every essential branch of your university journey into one single intelligent interface.
          </p>

          {/* Quick Filter Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {[
              { id: 'all', label: 'All Modules' },
              { id: 'ai', label: 'AI Hub ⚡' },
              { id: 'resources', label: 'Resources & PYQs 📁' },
              { id: 'study', label: 'Study & Books 📚' },
              { id: 'tools', label: 'Apps & Games 🎮' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/25 border border-purple-400/40'
                    : 'bg-white/80 dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 hover:text-slate-900 dark:hover:text-white shadow-xs'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 7-Card Category Grid - Crisp & Compact for Fast Scanning */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4.5">
          {filteredCategories.map((cat, idx) => {
            return (
              <div
                key={cat.id}
                id={`cat-${cat.id}`}
                onClick={onOpenAuth}
                className={`group relative rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] cursor-pointer flex flex-col justify-between overflow-hidden bg-white/85 dark:bg-[#0d0722]/90 border border-slate-200/80 dark:border-purple-500/20 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_14px_35px_rgba(124,58,237,0.12)] dark:hover:shadow-[0_12px_35px_rgba(168,85,247,0.25)] hover:border-purple-400/60 scroll-reveal stagger-${Math.min(idx + 1, 6)}`}
              >
                {/* Subtle top iridescent line */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent group-hover:via-pink-500 transition-all" />

                {/* Top: Icon + Badge + Titles */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div 
                      className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/10 group-hover:scale-105 transition-transform shadow-xs"
                      style={{ color: cat.accentColor }}
                    >
                      {getCategoryIcon(cat.icon, 'w-5 h-5')}
                    </div>
                    {cat.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30 shadow-xs">
                        {cat.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                      {cat.title}
                    </h3>
                    <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400">
                      · {cat.tagline}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Compact Quick Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-slate-200/80 dark:border-white/10">
                    {cat.items.slice(0, 3).map((item, i) => (
                      <span 
                        key={i} 
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 text-[11px] text-slate-700 dark:text-slate-300"
                      >
                        <Check className="w-3 h-3 text-emerald-500 dark:text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom: Direct Access Action */}
                <div className="pt-3 mt-3 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-purple-700 dark:text-purple-300 font-semibold truncate mr-2">
                    {cat.highlightText}
                  </span>
                  <div className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/[0.06] flex items-center gap-1 text-[11px] font-semibold text-slate-700 dark:text-slate-200 group-hover:text-white group-hover:bg-purple-600 transition-all shrink-0 shadow-xs">
                    <span>Open</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
