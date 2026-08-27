import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Bot, 
  BookOpen, 
  ShieldAlert, 
  Gamepad2, 
  LayoutGrid, 
  Library, 
  Sparkles, 
  CheckCircle2,
  Instagram,
  Linkedin,
  Sun
} from 'lucide-react';
import { FOUNDER_INFO } from '../data';
import { useTheme } from './dashboard/ThemeSystem';

export interface CosmicOrbItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
  colorKey: 'magenta' | 'indigo' | 'violet' | 'amber' | 'cyan' | 'emerald';
  // Orbital characteristics
  orbitIndex: 0 | 1 | 2; // Which of the 3 orbits
  initialAngle: number;   // In radians
  speed: number;          // Radians per second
  mobileVisible?: boolean;
}

const COSMIC_FEATURE_ORBS: CosmicOrbItem[] = [
  {
    id: 'ai-assistant',
    title: 'AI Assistant',
    subtitle: 'GPT-4o, Code & Research',
    tag: 'AI Tools',
    icon: Bot,
    colorKey: 'magenta',
    orbitIndex: 0,
    initialAngle: 0.2,
    speed: 0.16,
    mobileVisible: true,
  },
  {
    id: 'study',
    title: 'Study',
    subtitle: 'Notes, Syllabus & Roadmaps',
    tag: 'Handwritten',
    icon: BookOpen,
    colorKey: 'indigo',
    orbitIndex: 0,
    initialAngle: 3.3,
    speed: 0.16,
    mobileVisible: true,
  },
  {
    id: 'exam-vault',
    title: 'Exam Vault',
    subtitle: 'PYQs, Papers & Solutions',
    tag: 'Question Banks',
    icon: ShieldAlert,
    colorKey: 'violet',
    orbitIndex: 1,
    initialAngle: 1.6,
    speed: -0.13,
    mobileVisible: true,
  },
  {
    id: 'games',
    title: 'Games',
    subtitle: '2048, Wordle & Chess AI',
    tag: 'Arcade Flow',
    icon: Gamepad2,
    colorKey: 'amber',
    orbitIndex: 1,
    initialAngle: 4.8,
    speed: -0.13,
    mobileVisible: false,
  },
  {
    id: 'apps',
    title: 'Apps',
    subtitle: 'GPA, Resume & Utilities',
    tag: 'Productivity',
    icon: LayoutGrid,
    colorKey: 'cyan',
    orbitIndex: 2,
    initialAngle: 2.7,
    speed: 0.11,
    mobileVisible: true,
  },
  {
    id: 'books',
    title: 'Books',
    subtitle: 'E-Books & Audiobooks',
    tag: 'Library',
    icon: Library,
    colorKey: 'emerald',
    orbitIndex: 2,
    initialAngle: 5.9,
    speed: 0.11,
    mobileVisible: false,
  },
];

// Color definitions for the 6 harmonic UniFlow shades
const ORB_COLOR_THEMES = {
  magenta: {
    orbBg: 'radial-gradient(circle at 35% 30%, #f472b6 0%, #db2777 55%, #831843 100%)',
    glow: 'rgba(236, 72, 153, 0.25)',
    border: 'rgba(244, 114, 182, 0.4)',
    pillBgDark: 'rgba(29, 14, 38, 0.88)',
    pillBgLight: 'rgba(255, 255, 255, 0.96)',
    pillBorderDark: 'rgba(236, 72, 153, 0.35)',
    pillBorderLight: 'rgba(226, 232, 240, 0.95)',
    tagColorDark: 'text-pink-300',
    tagColorLight: 'text-pink-600',
  },
  indigo: {
    orbBg: 'radial-gradient(circle at 35% 30%, #818cf8 0%, #4f46e5 55%, #312e81 100%)',
    glow: 'rgba(99, 102, 241, 0.25)',
    border: 'rgba(129, 140, 248, 0.4)',
    pillBgDark: 'rgba(17, 18, 48, 0.88)',
    pillBgLight: 'rgba(255, 255, 255, 0.96)',
    pillBorderDark: 'rgba(99, 102, 241, 0.35)',
    pillBorderLight: 'rgba(226, 232, 240, 0.95)',
    tagColorDark: 'text-indigo-300',
    tagColorLight: 'text-indigo-600',
  },
  violet: {
    orbBg: 'radial-gradient(circle at 35% 30%, #c084fc 0%, #9333ea 55%, #581c87 100%)',
    glow: 'rgba(168, 85, 247, 0.25)',
    border: 'rgba(192, 132, 252, 0.4)',
    pillBgDark: 'rgba(25, 14, 46, 0.88)',
    pillBgLight: 'rgba(255, 255, 255, 0.96)',
    pillBorderDark: 'rgba(168, 85, 247, 0.35)',
    pillBorderLight: 'rgba(226, 232, 240, 0.95)',
    tagColorDark: 'text-purple-300',
    tagColorLight: 'text-purple-600',
  },
  amber: {
    orbBg: 'radial-gradient(circle at 35% 30%, #fbbf24 0%, #d97706 55%, #78350f 100%)',
    glow: 'rgba(245, 158, 11, 0.25)',
    border: 'rgba(251, 191, 36, 0.4)',
    pillBgDark: 'rgba(38, 25, 12, 0.88)',
    pillBgLight: 'rgba(255, 255, 255, 0.96)',
    pillBorderDark: 'rgba(245, 158, 11, 0.35)',
    pillBorderLight: 'rgba(226, 232, 240, 0.95)',
    tagColorDark: 'text-amber-300',
    tagColorLight: 'text-amber-700',
  },
  cyan: {
    orbBg: 'radial-gradient(circle at 35% 30%, #38bdf8 0%, #0284c7 55%, #0c4a6e 100%)',
    glow: 'rgba(14, 165, 233, 0.25)',
    border: 'rgba(56, 189, 248, 0.4)',
    pillBgDark: 'rgba(12, 28, 42, 0.88)',
    pillBgLight: 'rgba(255, 255, 255, 0.96)',
    pillBorderDark: 'rgba(14, 165, 233, 0.35)',
    pillBorderLight: 'rgba(226, 232, 240, 0.95)',
    tagColorDark: 'text-cyan-300',
    tagColorLight: 'text-cyan-700',
  },
  emerald: {
    orbBg: 'radial-gradient(circle at 35% 30%, #34d399 0%, #059669 55%, #064e3b 100%)',
    glow: 'rgba(16, 185, 129, 0.25)',
    border: 'rgba(52, 211, 153, 0.4)',
    pillBgDark: 'rgba(10, 32, 24, 0.88)',
    pillBgLight: 'rgba(255, 255, 255, 0.96)',
    pillBorderDark: 'rgba(16, 185, 129, 0.35)',
    pillBorderLight: 'rgba(226, 232, 240, 0.95)',
    tagColorDark: 'text-emerald-300',
    tagColorLight: 'text-emerald-700',
  },
};

interface VishnuCosmicCenterpieceProps {
  onSelectItem?: (id: string) => void;
  mousePos?: { x: number; y: number };
  revealed?: boolean;
}

export const VishnuCosmicCenterpiece: React.FC<VishnuCosmicCenterpieceProps> = ({
  onSelectItem,
  mousePos = { x: 0, y: 0 },
}) => {
  const [hoveredOrbId, setHoveredOrbId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === 'light';

  // Responsive breakpoint tracking
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Smooth continuous high-performance animation clock
  useEffect(() => {
    const animate = (currentTime: number) => {
      if (previousTimeRef.current !== null) {
        const delta = (currentTime - previousTimeRef.current) / 1000;
        // Slow down orbit when hovering an orb
        const speedFactor = hoveredOrbId ? 0.35 : 1.0;
        setTime((prev) => prev + delta * speedFactor);
      }
      previousTimeRef.current = currentTime;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [hoveredOrbId]);

  // Orbital geometries configuration (Desktop vs Mobile)
  const orbitConfigs = useMemo(() => {
    if (isMobile) {
      return [
        { rx: 140, ry: 92, tiltDeg: -16 },  // Inner
        { rx: 156, ry: 105, tiltDeg: 20 },  // Middle
        { rx: 168, ry: 115, tiltDeg: -32 }, // Outer
      ];
    }
    return [
      { rx: 220, ry: 125, tiltDeg: -18 }, // Inner (Study, AI Assistant)
      { rx: 275, ry: 150, tiltDeg: 22 },  // Middle (Exam Vault, Games)
      { rx: 320, ry: 140, tiltDeg: -38 }, // Outer (Apps, Books)
    ];
  }, [isMobile]);

  // Compute 3D Coordinates and depth for an orb
  const computeOrb3D = (orb: CosmicOrbItem) => {
    const config = orbitConfigs[orb.orbitIndex];
    const currentAngle = orb.initialAngle + time * orb.speed;
    const tiltRad = (config.tiltDeg * Math.PI) / 180;

    // Unrotated ellipse position
    const cosAngle = Math.cos(currentAngle);
    const sinAngle = Math.sin(currentAngle);
    const unrotatedX = config.rx * cosAngle;
    const unrotatedY = config.ry * sinAngle;

    // Rotated by inclination tilt
    const x = unrotatedX * Math.cos(tiltRad) - unrotatedY * Math.sin(tiltRad);
    const y = unrotatedX * Math.sin(tiltRad) + unrotatedY * Math.cos(tiltRad);

    // Depth: sin(currentAngle) determines front (>0) vs back (<0) of orbit
    const depth = sinAngle; // -1 to +1
    const isFront = depth >= -0.15;
    
    // Scale and opacity mapping for 3D realism
    const baseScale = isMobile ? 0.8 : 1.0;
    const depthScale = isFront ? baseScale * (1 + depth * 0.12) : baseScale * (1 + depth * 0.16);
    const depthOpacity = isFront ? 1.0 : 0.76 + (depth + 1) * 0.12;
    const zIndex = isFront ? (hoveredOrbId === orb.id ? 40 : 25) : 5;

    return {
      x,
      y,
      depth,
      scale: depthScale,
      opacity: depthOpacity,
      zIndex,
      isFront,
    };
  };

  // Parallax offsets from mouse position
  const parallaxX = (mousePos.x || 0) * (isMobile ? 4 : 12);
  const parallaxY = (mousePos.y || 0) * (isMobile ? 4 : 12);

  return (
    <div className="relative w-full min-h-[460px] h-[500px] sm:h-[560px] lg:h-[620px] flex items-center justify-center select-none overflow-visible">
      
      {/* ================= 1. SOLAR NEBULA & GRAVITATIONAL WAVES ================= */}
      
      {/* Expanding Ambient Waves */}
      <div className="absolute w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] rounded-full border border-purple-300/30 dark:border-purple-500/20 pointer-events-none animate-gravity-wave-1" />
      <div className="absolute w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] rounded-full border border-pink-300/25 dark:border-pink-500/15 pointer-events-none animate-gravity-wave-2" />

      {/* Solar Rays SVG Layer - Subtle Architectural Rays */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${-parallaxX * 0.6}px, ${-parallaxY * 0.6}px, 0)`
        }}
      >
        <svg 
          className="w-[420px] h-[420px] sm:w-[560px] sm:h-[560px] opacity-20 dark:opacity-40 animate-solar-rays" 
          viewBox="0 0 400 400" 
          fill="none"
        >
          <defs>
            <radialGradient id="solarCenterGlowCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.15" />
              <stop offset="40%" stopColor="#ec4899" stopOpacity="0.08" />
              <stop offset="70%" stopColor="#8b5cf6" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#f8fafc" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="rayGradA" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#d946ef" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="rayGradB" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Core glow */}
          <circle cx="200" cy="200" r="150" fill="url(#solarCenterGlowCore)" />

          {/* 16 Solar Flare Petals */}
          {[...Array(16)].map((_, i) => {
            const angle = (i * 360) / 16;
            return (
              <polygon
                key={i}
                points="198,200 200,35 202,200"
                fill={i % 2 === 0 ? "url(#rayGradA)" : "url(#rayGradB)"}
                transform={`rotate(${angle} 200 200)`}
                opacity={i % 3 === 0 ? 0.6 : 0.3}
              />
            );
          })}
        </svg>
      </div>

      {/* ================= 2. 3D ORBITAL PATH TRACKS (SVG) ================= */}
      <div 
        className="absolute inset-0 pointer-events-none flex items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${-parallaxX * 0.8}px, ${-parallaxY * 0.8}px, 0)`
        }}
      >
        <svg 
          className="w-full h-full max-w-[680px] max-h-[680px] overflow-visible opacity-45 dark:opacity-65" 
          viewBox="-340 -340 680 680" 
          fill="none"
        >
          <defs>
            <linearGradient id="orbitTrack1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="orbitTrack2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#ec4899" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="orbitTrack3" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          {/* Orbit 1 Ellipse */}
          <ellipse 
            cx="0" 
            cy="0" 
            rx={orbitConfigs[0].rx} 
            ry={orbitConfigs[0].ry} 
            transform={`rotate(${orbitConfigs[0].tiltDeg} 0 0)`} 
            stroke="url(#orbitTrack1)" 
            strokeWidth="1.2" 
            strokeDasharray="4 8"
          />

          {/* Orbit 2 Ellipse */}
          <ellipse 
            cx="0" 
            cy="0" 
            rx={orbitConfigs[1].rx} 
            ry={orbitConfigs[1].ry} 
            transform={`rotate(${orbitConfigs[1].tiltDeg} 0 0)`} 
            stroke="url(#orbitTrack2)" 
            strokeWidth="1.2" 
            strokeDasharray="3 9"
          />

          {/* Orbit 3 Ellipse (Desktop Only or Scaled on Mobile) */}
          {!isMobile && (
            <ellipse 
              cx="0" 
              cy="0" 
              rx={orbitConfigs[2].rx} 
              ry={orbitConfigs[2].ry} 
              transform={`rotate(${orbitConfigs[2].tiltDeg} 0 0)`} 
              stroke="url(#orbitTrack3)" 
              strokeWidth="1.1" 
              strokeDasharray="5 10"
            />
          )}

          {/* Ambient Starlight Nodes */}
          <circle cx="-160" cy="-90" r="2" fill="#f43f5e" opacity="0.5" />
          <circle cx="180" cy="110" r="2.5" fill="#fbbf24" opacity="0.5" />
          <circle cx="210" cy="-80" r="1.5" fill="#c084fc" opacity="0.4" />
          <circle cx="-200" cy="120" r="2" fill="#38bdf8" opacity="0.4" />
        </svg>
      </div>

      {/* ================= 3. VISHNU'S REAL PHOTO — THE CENTRAL ANCHOR ================= */}
      <div 
        className="relative z-10 w-full max-w-[270px] sm:max-w-[320px] md:max-w-[340px] rounded-[34px] p-[2px] bg-gradient-to-tr from-purple-200 via-pink-200 to-amber-200 dark:from-amber-500 dark:via-fuchsia-500 dark:to-violet-600 shadow-[0_20px_45px_-10px_rgba(0,0,0,0.08),0_4px_12px_-2px_rgba(0,0,0,0.03)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-[1.01]"
        style={{
          transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)`
        }}
      >
        <div className="w-full bg-white/95 dark:bg-[#0c0820] rounded-[32px] overflow-hidden relative flex flex-col justify-between p-3.5 sm:p-4.5 border border-slate-200/80 dark:border-purple-500/30">
          
          {/* Subtle Ambient Halo */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(245,158,11,0.04)_0%,rgba(217,70,239,0.03)_40%,transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_30%,rgba(245,158,11,0.12)_0%,rgba(217,70,239,0.1)_40%,rgba(12,8,32,0.96)_80%)] pointer-events-none" />

          {/* Top Status Badges */}
          <div className="relative z-10 w-full flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-500/30 backdrop-blur-md shadow-xs">
              <Sun className="w-3 h-3 text-amber-500 dark:text-amber-400 animate-spin" style={{ animationDuration: '10s' }} />
              <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 tracking-wide uppercase">
                Founder & Architect
              </span>
            </div>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-500/15 border border-purple-200 dark:border-purple-500/30 text-[10px] font-semibold text-purple-700 dark:text-purple-300 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Flow</span>
            </div>
          </div>

          {/* Vishnu's Portrait Image */}
          <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center my-2 sm:my-2.5">
            <div className="relative w-44 h-56 sm:w-48 sm:h-64 flex items-center justify-center">
              
              {/* Photo Frame */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-purple-200 dark:border-purple-400/60 shadow-[0_8px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.55)] bg-slate-100 dark:bg-slate-950 group">
                <img
                  src={FOUNDER_INFO.photoUrl}
                  alt="Vishnu Kant Sharma - Founder UniFlow"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 dark:from-[#0c0820]/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Natural Base Contact Shadow */}
              <div className="absolute -bottom-1.5 w-32 h-3 bg-slate-900/10 dark:bg-black/40 rounded-full blur-xs pointer-events-none" />
            </div>

            {/* Founder Label */}
            <div className="mt-2.5 text-center">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-900/5 dark:bg-white/[0.08] border border-purple-200/80 dark:border-purple-500/40 shadow-xs backdrop-blur-md">
                <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white tracking-wide">
                  {FOUNDER_INFO.name}
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20 dark:text-amber-400 dark:fill-amber-400/20" />
              </div>
              <p className="text-[10px] sm:text-xs text-purple-700 dark:text-purple-300 font-semibold mt-0.5">
                AI & DS Student · {FOUNDER_INFO.university}
              </p>
            </div>
          </div>

          {/* Connect Bar */}
          <div className="relative z-10 w-full p-2 rounded-xl bg-slate-50/90 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-xl flex items-center justify-between">
            <span className="text-[10px] text-slate-600 dark:text-slate-300 font-semibold pl-1">
              Direct Connect:
            </span>
            <div className="flex items-center gap-1.5">
              <a
                href={FOUNDER_INFO.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Vishnu"
                className="p-1 rounded-lg bg-pink-100 dark:bg-pink-500/15 hover:bg-pink-200 dark:hover:bg-pink-500/25 border border-pink-200 dark:border-pink-500/30 text-pink-700 dark:text-pink-300 transition-all hover:scale-110"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-600 dark:text-pink-400" />
              </a>
              <a
                href={FOUNDER_INFO.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Vishnu"
                className="p-1 rounded-lg bg-blue-100 dark:bg-blue-500/15 hover:bg-blue-200 dark:hover:bg-blue-500/25 border border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-300 transition-all hover:scale-110"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ================= 4. 3D ORBITING PLANET / ORB ECOSYSTEM ================= */}
      {COSMIC_FEATURE_ORBS.map((orb) => {
        // On mobile, show only the 4 most critical orbs for clean layout without overflow
        if (isMobile && !orb.mobileVisible) return null;

        const coords = computeOrb3D(orb);
        const theme = ORB_COLOR_THEMES[orb.colorKey];
        const isHovered = hoveredOrbId === orb.id;
        const Icon = orb.icon;

        // Interactive hover scale boost
        const currentScale = isHovered ? coords.scale * 1.12 : coords.scale;
        const pillBg = isLight ? theme.pillBgLight : theme.pillBgDark;
        const pillBorder = isLight ? (isHovered ? 'rgba(124, 58, 237, 0.4)' : theme.pillBorderLight) : (isHovered ? theme.border : theme.pillBorderDark);
        const tagColor = isLight ? theme.tagColorLight : theme.tagColorDark;

        // Soft, professional high-end SaaS shadows (no fluorescent halos in light mode)
        const lightBoxShadow = isHovered
          ? '0 10px 25px -4px rgba(0, 0, 0, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.04)'
          : '0 4px 14px -2px rgba(0, 0, 0, 0.07), 0 2px 6px -1px rgba(0, 0, 0, 0.03)';
        
        const darkBoxShadow = isHovered
          ? `0 0 20px ${theme.glow}, 0 10px 25px rgba(0, 0, 0, 0.4)`
          : `0 4px 14px rgba(0, 0, 0, 0.3)`;

        const sphereShadow = isLight
          ? 'inset -1px -2px 4px rgba(0, 0, 0, 0.25), inset 1px 1px 3px rgba(255, 255, 255, 0.7), 0 2px 5px rgba(0, 0, 0, 0.08)'
          : `inset -2px -3px 6px rgba(0, 0, 0, 0.6), inset 2px 2px 5px rgba(255, 255, 255, 0.4), 0 0 8px ${theme.glow}`;

        return (
          <div
            key={orb.id}
            onMouseEnter={() => setHoveredOrbId(orb.id)}
            onMouseLeave={() => setHoveredOrbId(null)}
            onClick={() => onSelectItem && onSelectItem(orb.id)}
            style={{
              transform: `translate3d(${coords.x + parallaxX * 1.2}px, ${coords.y + parallaxY * 1.2}px, 0) scale(${currentScale})`,
              opacity: coords.opacity,
              zIndex: coords.zIndex,
              willChange: 'transform, opacity',
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-[box-shadow,border-color] duration-200 group"
          >
            {/* Glass Pill Flex Container */}
            <div 
              className="flex items-center gap-2.5 p-1.5 sm:p-2 rounded-full backdrop-blur-xl border transition-all duration-200"
              style={{
                backgroundColor: pillBg,
                borderColor: pillBorder,
                boxShadow: isLight ? lightBoxShadow : darkBoxShadow,
              }}
            >
              {/* 3D Glossy Planet Sphere */}
              <div 
                className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 overflow-hidden border"
                style={{
                  background: theme.orbBg,
                  borderColor: theme.border,
                  boxShadow: sphereShadow,
                }}
              >
                {/* 3D Specular Light Reflection Highlight */}
                <div className="absolute top-1 left-1.5 w-3 h-1.5 rounded-full bg-white/70 blur-[0.6px] -rotate-35 pointer-events-none" />
                
                {/* Micro Icon */}
                <div className="relative z-10 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                  <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>
              </div>

              {/* Clean Typography Glass Pill Content */}
              <div className="flex flex-col pr-2 text-left min-w-[70px] sm:min-w-[84px]">
                <div className="flex items-center gap-1">
                  <span className="text-[11px] sm:text-xs font-bold text-slate-800 dark:text-zinc-100 tracking-tight whitespace-nowrap">
                    {orb.title}
                  </span>
                  {isHovered && (
                    <Sparkles className="w-2.5 h-2.5 text-amber-500 dark:text-amber-300 animate-spin" />
                  )}
                </div>
                
                <span className={`text-[9px] sm:text-[10px] font-semibold tracking-tight whitespace-nowrap ${tagColor} opacity-95`}>
                  {isHovered ? orb.subtitle : orb.tag}
                </span>
              </div>
            </div>
          </div>
        );
      })}

    </div>
  );
};
