import React from 'react';
import { 
  Bot, 
  Sparkles, 
  Zap, 
  Search, 
  Terminal, 
  Cpu, 
  Layers, 
  CircleDot, 
  Flame, 
  Compass, 
  MessageSquare, 
  Activity, 
  Film, 
  Clapperboard, 
  Video, 
  PlaySquare, 
  Image, 
  Palette, 
  Aperture, 
  Wand2, 
  Dice5, 
  Presentation, 
  Sliders, 
  Sparkle, 
  LayoutTemplate, 
  MonitorPlay, 
  Globe, 
  Layout, 
  PanelTop, 
  Code, 
  AppWindow,
  Lock,
  ArrowUpRight
} from 'lucide-react';
import { AITool } from './AIData';
import { useTheme } from '../ThemeSystem';

interface AIToolCardProps {
  tool: AITool;
  onOpenTool: (tool: AITool) => void;
}

export const AIToolCard: React.FC<AIToolCardProps> = ({ tool, onOpenTool }) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const renderIcon = (iconName: string) => {
    const props = { className: 'w-6 h-6 text-white' };
    switch (iconName) {
      case 'Bot': return <Bot {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      case 'Zap': return <Zap {...props} />;
      case 'Search': return <Search {...props} />;
      case 'Terminal': return <Terminal {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      case 'Layers': return <Layers {...props} />;
      case 'CircleDot': return <CircleDot {...props} />;
      case 'Flame': return <Flame {...props} />;
      case 'Compass': return <Compass {...props} />;
      case 'MessageSquare': return <MessageSquare {...props} />;
      case 'Activity': return <Activity {...props} />;
      case 'Film': return <Film {...props} />;
      case 'Clapperboard': return <Clapperboard {...props} />;
      case 'Video': return <Video {...props} />;
      case 'PlaySquare': return <PlaySquare {...props} />;
      case 'Image': return <Image {...props} />;
      case 'Palette': return <Palette {...props} />;
      case 'Aperture': return <Aperture {...props} />;
      case 'Wand2': return <Wand2 {...props} />;
      case 'Dice5': return <Dice5 {...props} />;
      case 'Presentation': return <Presentation {...props} />;
      case 'Sliders': return <Sliders {...props} />;
      case 'Sparkle': return <Sparkle {...props} />;
      case 'LayoutTemplate': return <LayoutTemplate {...props} />;
      case 'MonitorPlay': return <MonitorPlay {...props} />;
      case 'Globe': return <Globe {...props} />;
      case 'Layout': return <Layout {...props} />;
      case 'PanelTop': return <PanelTop {...props} />;
      case 'Code': return <Code {...props} />;
      case 'AppWindow': return <AppWindow {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  return (
    <div
      id={`ai-tool-${tool.id}`}
      style={{
        backgroundColor: isDark ? 'rgba(15, 23, 42, 0.88)' : 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(24px) saturate(160%)',
        WebkitBackdropFilter: 'blur(24px) saturate(160%)',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      className="group relative p-6 sm:p-7 rounded-[2rem] border shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.015] active:scale-[0.99] flex flex-col justify-between"
    >
      {/* Top Section: Icon, Title & Category */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center shadow-lg shrink-0 group-hover:scale-105 transition-transform duration-300`}
        >
          {renderIcon(tool.iconName)}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-extrabold text-lg sm:text-xl text-gray-900 dark:text-white tracking-tight leading-snug truncate">
            {tool.name}
          </h4>
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            {tool.categoryLabel}
          </span>
        </div>
      </div>

      {/* Action Area & Password Footer */}
      <div className="flex flex-col gap-3.5">
        <button
          type="button"
          onClick={() => onOpenTool(tool)}
          className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-white/10 dark:bg-white/10 hover:bg-white/20 text-gray-900 dark:text-white transition-all border border-black/5 dark:border-white/10 flex items-center justify-center gap-1.5 shadow-sm active:scale-98 cursor-pointer group-hover:border-violet-500/30"
        >
          <span>Open {tool.name}</span>
          <ArrowUpRight className="w-4 h-4 text-violet-500 dark:text-violet-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>

        <div className="text-center pt-2.5 border-t border-black/5 dark:border-white/5 flex items-center justify-center gap-2">
          <span className="text-[11px] text-red-500 dark:text-red-400 font-bold bg-red-500/10 dark:bg-red-950/80 px-3 py-1 rounded-lg border border-red-500/20 dark:border-red-500/30 inline-flex items-center gap-1">
            <Lock className="w-3 h-3 text-red-500 dark:text-red-400 shrink-0" />
            <span>Password: vishnu</span>
          </span>
        </div>
      </div>
    </div>
  );
};
