import React from 'react';
import { 
  Folder, 
  ChevronRight, 
  BookMarked,
  Sparkles,
  Library,
  TrendingUp,
  Search,
  BookOpen
} from 'lucide-react';
import { BookCategory } from './BooksData';
import { useTheme } from '../ThemeSystem';

interface BookCategoryCardProps {
  category: BookCategory;
  resourceCount: number;
  onClick: () => void;
}

export const BookCategoryCard: React.FC<BookCategoryCardProps> = ({
  category,
  resourceCount,
  onClick,
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookMarked':
        return <BookMarked className="w-8 h-8" />;
      case 'Sparkles':
        return <Sparkles className="w-8 h-8" />;
      case 'Library':
        return <Library className="w-8 h-8" />;
      case 'TrendingUp':
        return <TrendingUp className="w-8 h-8" />;
      case 'Search':
        return <Search className="w-8 h-8" />;
      case 'BookOpen':
      default:
        return <BookOpen className="w-8 h-8" />;
    }
  };

  return (
    <div
      id={`book-category-card-${category.id}`}
      onClick={onClick}
      style={{
        backgroundColor: isDark ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(24px) saturate(160%)',
        WebkitBackdropFilter: 'blur(24px) saturate(160%)',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      className="group relative cursor-pointer border text-gray-900 dark:text-white p-6 sm:p-7 rounded-[2rem] shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-transparent rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none" />

      <div>
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-300 shrink-0`}
          >
            {getCategoryIcon(category.iconName)}
          </div>

          <span className="text-[11px] font-black px-3.5 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 uppercase tracking-wider flex items-center gap-1.5">
            <Folder className="w-3.5 h-3.5" />
            <span>{resourceCount} {resourceCount === 1 ? 'Resource' : 'Resources'}</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight leading-snug mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {category.name}
        </h3>

        {/* Description */}
        <p className="text-gray-500 dark:text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-2">
          {category.description}
        </p>
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
        <span className="text-xs font-bold text-gray-400 dark:text-gray-500 group-hover:text-indigo-500 transition-colors">
          Explore Books & Libraries
        </span>
        <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
};
