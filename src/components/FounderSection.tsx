import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Instagram, 
  Linkedin, 
  Mail, 
  GraduationCap, 
  Sparkles, 
  Code2,
  Sun,
  Orbit,
  ExternalLink,
  Award,
  BrainCircuit
} from 'lucide-react';
import { FOUNDER_INFO } from '../data';

export const FounderSection: React.FC = () => {
  const [imgSrc, setImgSrc] = useState<string>(FOUNDER_INFO.photoUrl);

  return (
    <section id="founder" className="relative py-14 sm:py-18 lg:py-24 overflow-hidden">
      {/* Background Energy Lights */}
      <div className="absolute top-1/2 left-1/4 w-[450px] h-[450px] bg-purple-600/15 rounded-full blur-[160px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute bottom-10 right-1/4 w-[350px] h-[350px] bg-pink-600/12 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/3 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Founder Card Container */}
        <div className="p-6 sm:p-10 lg:p-12 rounded-[38px] bg-[#0d0722]/95 border border-purple-500/25 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] relative overflow-hidden scroll-reveal">
          
          {/* Subtle Top Light Accent */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-400" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* ================= FOUNDER VISUAL PORTRAIT FRAME (LEFT) ================= */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[340px] aspect-[4/5.2] rounded-[32px] overflow-hidden p-[2px] bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 shadow-[0_12px_40px_rgba(217,70,239,0.25)] group">
                
                {/* Solar Corona Effect */}
                <div className="w-full h-full bg-[#120a2a] rounded-[30px] overflow-hidden relative flex flex-col items-center justify-between p-5 border border-purple-500/30">
                  
                  {/* Atmospheric Glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.15)_0%,rgba(236,72,153,0.1)_40%,rgba(18,10,42,0.95)_80%)]" />

                  {/* Top Status & Verification Badge */}
                  <div className="relative z-10 w-full flex items-center justify-between">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 backdrop-blur-md shadow-sm">
                      <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '10s' }} />
                      <span>Founder & Creator</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>Online</span>
                    </div>
                  </div>

                  {/* Center Real Portrait Photo */}
                  <div className="relative z-10 flex flex-col items-center text-center my-auto w-full">
                    <div className="relative w-44 h-52 sm:w-48 sm:h-56 mb-3 flex items-center justify-center">
                      
                      {/* Background Aura */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-amber-400/30 via-pink-400/30 to-purple-500/25 blur-xl animate-pulse" />

                      {/* Photo Image */}
                      <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-purple-400/50 shadow-xl bg-slate-900">
                        <img 
                          src={FOUNDER_INFO.photoUrl}
                          alt="Vishnu Kant Sharma"
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                          loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#120a2a]/60 via-transparent to-transparent pointer-events-none" />
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 justify-center">
                      <h4 className="text-xl font-bold font-display text-white">
                        {FOUNDER_INFO.name}
                      </h4>
                      <CheckCircle2 className="w-4 h-4 text-amber-400 fill-amber-400/20" />
                    </div>
                    
                    <p className="text-xs text-purple-300 font-bold mt-0.5">
                      {FOUNDER_INFO.role}
                    </p>
                    <p className="text-[11px] text-slate-300 mt-0.5 font-medium">
                      AIDS Student · {FOUNDER_INFO.university}
                    </p>
                  </div>

                  {/* Bottom Department Tag */}
                  <div className="relative z-10 w-full py-2 px-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between text-xs text-slate-300 backdrop-blur-md shadow-sm">
                    <div className="flex items-center gap-1.5">
                      <BrainCircuit className="w-3.5 h-3.5 text-pink-400" />
                      <span className="font-semibold text-white">AI & Data Science (AIDS)</span>
                    </div>
                    <span className="text-[10px] text-purple-300 font-bold">JECRC University</span>
                  </div>

                </div>
              </div>
            </div>

            {/* ================= FOUNDER STORY & SOCIAL CHANNELS (RIGHT) ================= */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4 w-fit shadow-sm">
                <GraduationCap className="w-4 h-4 text-purple-400" />
                <span>Student-Led Innovation</span>
              </div>

              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
                  Built by <span className="text-flow-gradient">{FOUNDER_INFO.name}</span>
                </h3>
                <CheckCircle2 className="w-6 h-6 text-amber-400 fill-amber-400/20 shrink-0" />
              </div>

              <p className="text-base font-semibold text-purple-300 mb-3">
                {FOUNDER_INFO.tagline}
              </p>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 font-normal">
                {FOUNDER_INFO.vision}
              </p>

              {/* Founder Quote Glass Box with Handwritten Signature */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.04] border border-purple-500/30 backdrop-blur-md mb-8 relative shadow-sm">
                <p className="text-sm sm:text-base text-slate-200 italic font-normal">
                  &ldquo;{FOUNDER_INFO.quote}&rdquo;
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Student at JECRC University</span>
                  <span className="font-signature text-2xl sm:text-3xl text-flow-gradient font-bold tracking-wide">
                    Vishnu Kant Sharma
                  </span>
                </div>
              </div>

              {/* Direct Contact & Social Channels */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Let&apos;s Connect & Collaborate</span>
                </h4>
                
                <div className="flex flex-wrap items-center gap-3">
                  {/* Instagram Direct Link */}
                  <a
                    href={FOUNDER_INFO.links.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-pink-500/15 hover:bg-pink-500/25 border border-pink-500/30 text-pink-300 text-xs font-bold transition-all flex items-center gap-2 hover:scale-105 shadow-sm"
                  >
                    <Instagram className="w-4 h-4 text-pink-400" />
                    <span>Instagram</span>
                    <span className="text-[10px] text-pink-300">({FOUNDER_INFO.instagramHandle})</span>
                  </a>

                  {/* LinkedIn Direct Link */}
                  <a
                    href={FOUNDER_INFO.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-300 text-xs font-bold transition-all flex items-center gap-2 hover:scale-105 shadow-sm"
                  >
                    <Linkedin className="w-4 h-4 text-blue-400" />
                    <span>LinkedIn</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>

                  {/* Email Me */}
                  <a
                    href={FOUNDER_INFO.links.email}
                    className="px-4 py-2.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 text-xs font-bold transition-all flex items-center gap-2 hover:scale-105 shadow-sm"
                  >
                    <Mail className="w-4 h-4 text-purple-400" />
                    <span>Email Me</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
