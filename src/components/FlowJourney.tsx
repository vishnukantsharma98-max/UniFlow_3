import React from 'react';
import { 
  Compass, 
  BookOpen, 
  Sparkles, 
  Gamepad2, 
  Share2, 
  TrendingUp, 
  ArrowRight 
} from 'lucide-react';
import { FLOW_STAGES } from '../data';

export const FlowJourney: React.FC = () => {
  const getStageIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Gamepad2': return <Gamepad2 className="w-5 h-5" />;
      case 'Share2': return <Share2 className="w-5 h-5" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="features" className="relative py-14 sm:py-18 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-12 scroll-reveal">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3.5 shadow-xs">
            <span>The One Flow Journey</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight leading-tight">
            Connect Your Whole Campus Life. <br />
            <span className="text-flow-gradient">All in One Continuous Flow.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed max-w-2xl mx-auto">
            Your student life already has dozens of tools. UniFlow connects them into one experience — seamlessly moving from discovery to study, creation, organization, play, and growth.
          </p>
        </div>

        {/* 6-Stage Visual Journey Flow Ribbon */}
        <div className="relative">
          
          {/* Connecting Flow Vector (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 opacity-30 dark:opacity-40 z-0 blur-[0.5px]">
            {/* Animated Energy Pulses */}
            <div className="w-24 h-full bg-white blur-sm animate-shimmer" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5 sm:gap-4 relative z-10">
            {FLOW_STAGES.map((stage, idx) => (
              <div
                key={stage.step}
                className={`group relative p-4 sm:p-5 rounded-3xl bg-white/85 dark:bg-[#0d0722]/90 border border-slate-200/80 dark:border-purple-500/20 backdrop-blur-xl hover:border-purple-400/60 hover:bg-white dark:hover:bg-[#150c33] transition-all duration-300 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_14px_35px_rgba(124,58,237,0.12)] dark:hover:shadow-[0_15px_35px_rgba(168,85,247,0.25)] hover:-translate-y-1.5 scroll-reveal stagger-${Math.min(idx + 1, 6)}`}
              >
                {/* Step Marker */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                    {stage.step}
                  </span>
                  <div 
                    className="p-2.5 rounded-2xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/10 group-hover:scale-110 transition-transform shadow-xs"
                    style={{ color: stage.color }}
                  >
                    {getStageIcon(stage.icon)}
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold font-display text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                {/* Bottom Flow Connector Indicator */}
                <div className="pt-3.5 mt-3.5 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between text-[11px] text-purple-700 dark:text-purple-300 font-semibold">
                  <span>Flow Link</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-300 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
