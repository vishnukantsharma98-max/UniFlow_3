import React from 'react';
import { 
  Gauge, 
  Cloud, 
  UserCheck, 
  Lock, 
  Zap, 
  KeyRound,
  CheckCircle2
} from 'lucide-react';
import { PLATFORM_FEATURES } from '../data';

export const FeaturesGrid: React.FC = () => {
  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'Gauge': return <Gauge className="w-5 h-5 text-purple-600" />;
      case 'Cloud': return <Cloud className="w-5 h-5 text-pink-600" />;
      case 'UserCheck': return <UserCheck className="w-5 h-5 text-indigo-600" />;
      case 'Lock': return <Lock className="w-5 h-5 text-amber-600" />;
      case 'Zap': return <Zap className="w-5 h-5 text-fuchsia-600" />;
      case 'KeyRound': return <KeyRound className="w-5 h-5 text-emerald-600" />;
      default: return <Zap className="w-5 h-5 text-purple-600" />;
    }
  };

  return (
    <section id="features" className="relative py-14 sm:py-18 lg:py-24 overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 scroll-reveal">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-700 dark:text-pink-300 text-xs font-semibold uppercase tracking-wider mb-3.5 shadow-xs">
            <span>Built for Modern Universities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
            Engineered for <span className="text-flow-gradient">Velocity & Focus.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
            Every feature is calibrated around clean typography, zero ad tracking, and instantaneous cloud synchronization.
          </p>
        </div>

        {/* 6-Card Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {PLATFORM_FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className={`p-5 sm:p-6 rounded-3xl bg-white/85 dark:bg-[#0d0722]/90 border border-slate-200/80 dark:border-purple-500/20 backdrop-blur-xl hover:border-purple-400/60 hover:bg-white dark:hover:bg-[#150c33] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_14px_35px_rgba(124,58,237,0.12)] dark:hover:shadow-[0_15px_35px_rgba(168,85,247,0.25)] hover:-translate-y-1 group flex flex-col justify-between scroll-reveal stagger-${Math.min(idx + 1, 6)}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/10 group-hover:scale-110 transition-transform shadow-xs">
                    {getFeatureIcon(feature.icon)}
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 flex items-center gap-1 shadow-xs">
                    <CheckCircle2 className="w-3 h-3" />
                    {feature.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="pt-3.5 mt-5 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Sub-100ms response</span>
                <span className="text-purple-700 dark:text-purple-300 font-semibold">Ready</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
