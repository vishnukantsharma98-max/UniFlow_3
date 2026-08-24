import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Star, 
  Instagram,
  Linkedin
} from 'lucide-react';
import { VishnuCosmicCenterpiece } from './VishnuCosmicCenterpiece';
import { SOCIAL_PROOF_STUDENTS, FOUNDER_INFO } from '../data';

interface HeroSectionProps {
  onOpenAuth: () => void;
  onOpenSearch?: () => void;
  isSigningIn?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenAuth,
  onOpenSearch,
  isSigningIn = false
}) => {
  const [revealed, setRevealed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setRevealed(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section 
      id="home"
      onMouseMove={handleMouseMove}
      className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 flex items-center justify-center overflow-hidden"
    >
      {/* ================= HERO READABILITY LAYER (ORGANIC NATURAL GRADIENT) ================= */}
      {/* Organic dark gradient veil behind hero to ensure 100% razor-sharp contrast in all modes */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 30% 35%, rgba(6, 4, 15, 0.88) 0%, rgba(8, 5, 20, 0.65) 45%, rgba(10, 8, 25, 0.3) 75%, transparent 100%)'
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(7, 4, 18, 0.85) 0%, rgba(7, 4, 18, 0.4) 60%, transparent 100%)'
        }}
      />

      {/* Background Ambient Energy Lights */}
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none z-0 animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-pink-600/15 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-amber-500/15 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        
        {/* ================= RESPONSIVE LAYOUT CONTAINER ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* ================= LEFT COLUMN / MOBILE CONTENT CONTAINER ================= */}
          <div 
            className={`lg:col-span-6 flex flex-col z-20 transition-all duration-700 ${
              revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            
            {/* 1. HERO BADGES (Mobile Order 1 / Desktop Top) */}
            <div className="flex flex-wrap items-center gap-2.5 mb-5 order-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#120a28]/90 border border-purple-400/40 backdrop-blur-md shadow-md group hover:border-purple-300 transition-colors">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span className="text-xs font-bold text-purple-200 tracking-wide">
                  All-in-One Student Super App ✨
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0a1e16]/90 border border-emerald-400/40 text-emerald-300 text-xs font-bold backdrop-blur-md shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live by Vishnu Kant Sharma</span>
              </div>
            </div>

            {/* 2. MOBILE CENTERPIECE INSERT (Mobile Order 2 / Hidden on Desktop lg:hidden) */}
            <div className="lg:hidden w-full my-4 order-2 relative z-10 flex justify-center">
              <VishnuCosmicCenterpiece
                onSelectItem={(id) => {
                  if (onOpenSearch) onOpenSearch();
                }}
                mousePos={mousePos}
                revealed={revealed}
              />
            </div>

            {/* 3. MAIN HEADLINE (Mobile Order 3 / Desktop Order) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold font-display tracking-tight leading-[1.08] mb-5 order-3">
              <span className="text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                Your student life,
              </span>
              <span className="text-flow-gradient block mt-1.5 drop-shadow-[0_0_35px_rgba(236,72,153,0.4)]">
                all in one flow.
              </span>
            </h1>

            {/* 4. SUPPORTING PARAGRAPH (Mobile Order 4) */}
            <p className="text-base sm:text-lg text-slate-100 font-medium max-w-2xl leading-relaxed mb-6 order-4 drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
              Assignments, exams, AI tools, games, books, apps, entertainment and everything you need — in one intelligent experience crafted for university students.
            </p>

            {/* 5. CONNECT DIRECTLY (Mobile Order 5) */}
            <div className="flex items-center gap-2 sm:gap-2.5 mb-7 flex-wrap order-5">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider mr-1 drop-shadow-sm">
                Connect directly:
              </span>
              <a
                href={FOUNDER_INFO.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#23091f]/90 hover:bg-[#340d2e] border border-pink-500/40 hover:border-pink-400 text-pink-300 text-xs font-bold transition-all hover:scale-105 shadow-md group"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-400 group-hover:scale-110 transition-transform" />
                <span>Instagram</span>
              </a>
              <a
                href={FOUNDER_INFO.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#091529]/90 hover:bg-[#0d203e] border border-blue-500/40 hover:border-blue-400 text-blue-300 text-xs font-bold transition-all hover:scale-105 shadow-md group"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform" />
                <span>LinkedIn</span>
              </a>
            </div>

            {/* 6. CALLS TO ACTION (Mobile Order 6) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8 order-6">
              {/* Primary Google Auth CTA */}
              <button
                type="button"
                onClick={onOpenAuth}
                className="relative group overflow-hidden px-7 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-bold text-sm sm:text-base shadow-[0_10px_35px_-5px_rgba(217,70,239,0.5)] hover:shadow-[0_15px_45px_-5px_rgba(217,70,239,0.7)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 cursor-pointer shrink-0 pointer-events-auto"
              >
                <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 pointer-events-none" />

                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center p-0.5 shadow shrink-0 pointer-events-none">
                  <svg className="w-full h-full pointer-events-none" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                </div>
                <span className="whitespace-nowrap pointer-events-none">
                  {isSigningIn ? 'Signing in...' : 'Continue with Google'}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform pointer-events-none" />
              </button>

              {/* Secondary Explore CTA */}
              <a
                href="#explore"
                className="px-6 py-3.5 rounded-2xl bg-[#120a28]/90 hover:bg-[#1a0f38] border border-white/15 hover:border-purple-400/60 text-slate-100 hover:text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>Explore UniFlow</span>
                <ArrowRight className="w-4 h-4 text-purple-300" />
              </a>
            </div>

            {/* 7. SOCIAL PROOF (Mobile Order 7) */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/15 order-7">
              <div className="flex -space-x-2.5 overflow-hidden p-0.5">
                {SOCIAL_PROOF_STUDENTS.map((student, i) => (
                  <div 
                    key={i}
                    className="relative inline-block h-10 w-10 rounded-full ring-2 ring-purple-900 overflow-hidden shadow-md border border-purple-500/40 bg-purple-950"
                  >
                    <img 
                      src={student.image} 
                      alt={student.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>

              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-200 mt-0.5 font-medium">
                  Loved by <span className="text-purple-300 font-bold">50,000+ students</span> across universities
                </p>
              </div>
            </div>

          </div>

          {/* ================= DESKTOP RIGHT COLUMN: VISHNU SOLAR CENTERPIECE ================= */}
          <div className="hidden lg:flex lg:col-span-6 relative items-center justify-center w-full z-10">
            <VishnuCosmicCenterpiece
              onSelectItem={(id) => {
                if (onOpenSearch) onOpenSearch();
              }}
              mousePos={mousePos}
              revealed={revealed}
            />
          </div>

        </div>
      </div>
    </section>
  );
};
