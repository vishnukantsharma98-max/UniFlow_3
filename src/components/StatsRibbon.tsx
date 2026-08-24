import React from 'react';
import { BookOpen, FolderArchive, Bot, Gamepad2, Zap, Target } from 'lucide-react';

export const StatsRibbon: React.FC = () => {
  const stats = [
    {
      value: '12+',
      label: 'Subjects',
      icon: <BookOpen className="w-5 h-5 text-purple-600" />,
      subtext: 'Engineering Core'
    },
    {
      value: '30K+',
      label: 'Resources',
      icon: <FolderArchive className="w-5 h-5 text-amber-600" />,
      subtext: 'Notes, PYQs & Papers'
    },
    {
      value: '15+',
      label: 'AI Tools',
      icon: <Bot className="w-5 h-5 text-pink-600" />,
      subtext: 'Code, Math & Research'
    },
    {
      value: '10+',
      label: 'Games',
      icon: <Gamepad2 className="w-5 h-5 text-indigo-600" />,
      subtext: 'Focus & Arcade'
    },
    {
      value: '24/7',
      label: 'Always Available',
      icon: <Zap className="w-5 h-5 text-amber-600" />,
      subtext: 'Cloud Synchronized'
    },
    {
      value: '100%',
      label: 'Student Focused',
      icon: <Target className="w-5 h-5 text-rose-600" />,
      subtext: 'Zero Clutter'
    }
  ];

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 sm:-mt-6 mb-12 sm:mb-16 scroll-reveal">
      <div className="p-4 sm:p-5 rounded-3xl bg-white/[0.04] border border-purple-500/20 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col items-center text-center p-2.5 sm:p-3 group transition-transform hover:-translate-y-1 ${
                idx > 0 ? 'pt-3 sm:pt-2.5' : ''
              }`}
            >
              <div className="p-2.5 rounded-2xl bg-white/[0.06] border border-white/10 group-hover:border-purple-400/50 group-hover:bg-purple-500/20 transition-all mb-2 shadow-sm">
                {stat.icon}
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight group-hover:text-purple-300 transition-colors">
                {stat.value}
              </span>
              <span className="text-xs font-bold text-slate-200 mt-0.5">
                {stat.label}
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">
                {stat.subtext}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
