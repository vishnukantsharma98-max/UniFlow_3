import React from 'react';
import { 
  MessageSquareText, 
  Video, 
  Image as ImageIcon, 
  Presentation, 
  Globe, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { AICategory } from './AIData';
import { useTheme } from '../ThemeSystem';

interface AICategoryCardProps {
  category: AICategory;
  toolCount: number;
  onSelect: (category: AICategory) => void;
}

export const AICategoryCard: React.FC<AICategoryCardProps> = ({
  category,
  toolCount,
  onSelect,
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const renderIcon = (name: string) => {
    const props = { className: 'w-7 h-7 text-white' };
    switch (name) {
      case 'MessageSquareText': return <MessageSquareText {...props} />;
      case 'Video': return <Video {...props} />;
      case 'Image': return <ImageIcon {...props} />;
      case 'Presentation': return <Presentation {...props} />;
      case 'Globe': return <Globe {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  return (
    <div
      id={`ai-folder-${category.id}`}
      onClick={() => onSelect(category)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(category);
        }
      }}
      style={{
        backgroundColor: isDark ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(24px) saturate(160%)',
        WebkitBackdropFilter: 'blur(24px) saturate(160%)',
        borderColor: isDark ? category.borderDark : category.borderLight,
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      className="group border text-gray-900 dark:text-white p-7 sm:p-8 rounded-[2.2rem] cursor-pointer relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-xl flex flex-col justify-between min-h-[240px]"
    >
      {/* Background glow */}
      <div 
        className={`absolute -right-8 -bottom-8 w-36 h-36 bg-gradient-to-br ${category.gradient} rounded-full blur-3xl opacity-15 group-hover:opacity-30 transition-opacity pointer-events-none`} 
      />

      <div className="relative z-10 flex flex-col h-full justify-between gap-6">
        <div>
          {/* Top Row: Icon + Badge */}
          <div className="flex items-center justify-between mb-5">
            <div
              className={`w-15 h-15 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300`}
            >
              {renderIcon(category.iconName)}
            </div>

            <span
              style={{
                backgroundColor: isDark ? category.bgDark : category.bgLight,
                borderColor: isDark ? category.borderDark : category.borderLight,
                color: category.accentHex,
              }}
              className="text-xs font-black px-3.5 py-1 rounded-full border tracking-wide uppercase"
            >
              {toolCount} {toolCount === 1 ? 'tool' : 'tools'}
            </span>
          </div>

          <h3 className="text-2xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
            {category.title}
          </h3>
          <p className="text-gray-500 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
            {category.shortDescription}
          </p>
        </div>

        {/* Bottom Explore Link */}
        <div className="flex items-center justify-between pt-4 border-t border-black/5 dark:border-white/10">
          <span className="text-xs font-bold text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
            Explore Tools
          </span>
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/10 group-hover:translate-x-1 transition-all"
            style={{ color: category.accentHex }}
          >
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
