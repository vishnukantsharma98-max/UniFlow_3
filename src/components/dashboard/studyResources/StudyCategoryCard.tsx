import React from 'react';
import { 
  Terminal, 
  Code2, 
  Binary, 
  Coffee, 
  Network, 
  Boxes, 
  Database, 
  Cpu, 
  Radio, 
  Microchip, 
  Workflow, 
  FileCode, 
  Globe, 
  Layers, 
  GitBranch, 
  Sparkles, 
  Brain, 
  Cloud, 
  Server, 
  Trophy,
  ChevronRight,
  Folder
} from 'lucide-react';
import { StudyCategory } from './StudyResourcesData';
import { useTheme } from '../ThemeSystem';

interface StudyCategoryCardProps {
  category: StudyCategory;
  resourceCount: number;
  onSelect: (category: StudyCategory) => void;
}

export const StudyCategoryCard: React.FC<StudyCategoryCardProps> = ({
  category,
  resourceCount,
  onSelect,
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const renderIcon = (name: string) => {
    const props = { className: 'w-7 h-7 text-white' };
    switch (name) {
      case 'Terminal': return <Terminal {...props} />;
      case 'Code2': return <Code2 {...props} />;
      case 'Binary': return <Binary {...props} />;
      case 'Coffee': return <Coffee {...props} />;
      case 'Network': return <Network {...props} />;
      case 'Boxes': return <Boxes {...props} />;
      case 'Database': return <Database {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      case 'Radio': return <Radio {...props} />;
      case 'Microchip': return <Microchip {...props} />;
      case 'Workflow': return <Workflow {...props} />;
      case 'FileCode': return <FileCode {...props} />;
      case 'Globe': return <Globe {...props} />;
      case 'Layers': return <Layers {...props} />;
      case 'GitBranch': return <GitBranch {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      case 'Brain': return <Brain {...props} />;
      case 'Cloud': return <Cloud {...props} />;
      case 'Server': return <Server {...props} />;
      case 'Trophy': return <Trophy {...props} />;
      default: return <Folder {...props} />;
    }
  };

  return (
    <div
      id={`study-folder-${category.id}`}
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
      className="group border text-gray-900 dark:text-white p-6 sm:p-7 rounded-[2rem] cursor-pointer relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl shadow-lg flex flex-col justify-between min-h-[220px]"
    >
      {/* Background radial glow */}
      <div 
        className={`absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-br ${category.gradient} rounded-full blur-3xl opacity-15 group-hover:opacity-30 transition-opacity pointer-events-none`} 
      />

      <div className="relative z-10 flex flex-col h-full justify-between gap-5">
        <div>
          {/* Top Row: Icon + Badge */}
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300`}
            >
              {renderIcon(category.iconName)}
            </div>

            <span
              style={{
                backgroundColor: isDark ? category.bgDark : category.bgLight,
                borderColor: isDark ? category.borderDark : category.borderLight,
                color: category.accentHex,
              }}
              className="text-[11px] font-black px-3 py-1 rounded-full border tracking-wide uppercase shadow-xs"
            >
              {resourceCount} {resourceCount === 1 ? 'Resource' : 'Resources'}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
            {category.title}
          </h3>
          <p className="text-gray-500 dark:text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-2">
            {category.shortDescription}
          </p>
        </div>

        {/* Bottom Action Footer */}
        <div className="flex items-center justify-between pt-3.5 border-t border-black/5 dark:border-white/10">
          <span className="text-xs font-bold text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors flex items-center gap-1">
            Browse Folder
          </span>
          <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
            <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
};
