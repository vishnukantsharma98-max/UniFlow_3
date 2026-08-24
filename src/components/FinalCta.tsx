import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { UniFlowLogo } from './UniFlowLogo';

interface FinalCtaProps {
  onOpenAuth: () => void;
  isSigningIn?: boolean;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenAuth, isSigningIn = false }) => {
  return (
    <section className="relative py-14 sm:py-18 lg:py-24 overflow-hidden text-center">
      {/* High-Impact Background Radial Nebula */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-gradient-to-tr from-violet-600/25 via-fuchsia-600/25 to-amber-500/20 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-glow" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Floating Logo Badge */}
        <div className="flex justify-center mb-6">
          <div className="p-3 rounded-3xl bg-white/[0.06] border border-purple-500/30 backdrop-blur-2xl shadow-[0_0_40px_rgba(217,70,239,0.4)]">
            <UniFlowLogo size="lg" showText={false} />
          </div>
        </div>

        {/* Big High-Contrast Headline (Line 1) */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight leading-[1.15] mb-4 drop-shadow-md">
          Ready to simplify the way you study, create, and explore?
        </h2>

        {/* High-Contrast Subtitle (Line 2) */}
        <p className="text-lg sm:text-2xl text-purple-200 font-semibold max-w-2xl mx-auto leading-relaxed mb-8 drop-shadow-sm">
          Everything you need for student life, in one flow.
        </p>

        {/* High-Impact Google Auth Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onOpenAuth}
            className="w-full sm:w-auto relative group overflow-hidden px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-bold text-base sm:text-lg shadow-[0_12px_45px_rgba(217,70,239,0.6)] hover:shadow-[0_18px_55px_rgba(217,70,239,0.8)] transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 cursor-pointer pointer-events-auto"
          >
            {/* Shimmer reflection sweep */}
            <div className="absolute inset-0 w-1/2 h-full bg-white/25 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 pointer-events-none" />

            {/* Google Icon */}
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center p-1 shadow-md shrink-0 pointer-events-none">
              <svg className="w-full h-full pointer-events-none" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            </div>
            <span className="pointer-events-none">
              {isSigningIn ? 'Signing in...' : 'Continue with Google'}
            </span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform pointer-events-none" />
          </button>
        </div>

        {/* Feature assurance badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Free for Students</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Instant Single-Click Access</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Zero Third-Party Ads</span>
          </div>
        </div>

      </div>
    </section>
  );
};
