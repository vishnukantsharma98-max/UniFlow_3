import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { 
  GraduationCap, 
  FolderGit2, 
  ShieldAlert, 
  Sparkles, 
  Library, 
  LayoutGrid, 
  Share2, 
  PlayCircle, 
  Gamepad2, 
  Search, 
  ArrowUpRight, 
  ChevronRight, 
  MessageCircle, 
  Instagram, 
  Linkedin, 
  Clock, 
  Compass, 
  ArrowUp,
  Lock,
  Layers,
  Zap,
  CheckCircle2,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { DashboardPageId } from './types';
import { useTheme } from './ThemeSystem';
import { WelcomePopup } from './WelcomePopup';
import { FOUNDER_INFO } from '../../data';
import { VISHNU_BASE64_PHOTO } from '../../assets/vishnuImage';
import { shouldShowWelcomePopup, markWelcomePopupShown } from '../../firebase/welcomeSession';
import { navigate } from './navigationRouter';

interface DashboardHomeProps {
  user: User;
  onSelectPage?: (page: DashboardPageId) => void;
  onOpenSearch?: () => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({ 
  user, 
  onSelectPage, 
  onOpenSearch 
}) => {
  const { resolvedTheme, colors } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [showWelcomePopup, setShowWelcomePopup] = useState<boolean>(false);

  // Time-based personalized greeting
  const [greeting, setGreeting] = useState<string>('Good day');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 12) {
      setGreeting('Good morning');
    } else if (hour >= 12 && hour < 17) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);

  // Compute user's first name
  const getUserName = () => {
    if (user?.displayName && user.displayName.trim().length > 0) {
      const parts = user.displayName.trim().split(' ');
      return parts[0];
    }
    if (user?.email) {
      const emailUser = user.email.split('@')[0];
      const clean = emailUser.replace(/[0-9._-]/g, ' ').trim().split(' ')[0];
      if (clean) {
        return clean.charAt(0).toUpperCase() + clean.slice(1);
      }
    }
    return 'Scholar';
  };

  const userName = getUserName();

  // Automatic popup trigger once per session
  useEffect(() => {
    if (user?.uid && shouldShowWelcomePopup(user.uid)) {
      markWelcomePopupShown(user.uid);
      setShowWelcomePopup(true);
    }
  }, [user?.uid]);

  const handleClosePopup = () => {
    if (user?.uid) {
      markWelcomePopupShown(user.uid);
    }
    setShowWelcomePopup(false);
  };

  const handlePageClick = (page: DashboardPageId, customPath?: string) => {
    if (customPath) {
      navigate(customPath);
    } else if (onSelectPage) {
      onSelectPage(page);
    } else {
      navigate(page === 'home' ? '/app' : `/app/${page}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToQuickAccess = () => {
    const el = document.getElementById('quick-access-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      id="uniflow-home-container"
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-start pb-20 selection:bg-violet-500/20"
      style={{ color: colors.primaryText }}
    >
      {/* ========================================================================= */}
      {/* 1. CINEMATIC AMBIENT BACKGROUND & WATERMARK */}
      {/* ========================================================================= */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden flex items-center justify-center select-none"
      >
        {/* Giant Watermark */}
        <span 
          className={`absolute text-[16vw] font-black tracking-tighter uppercase select-none transition-opacity duration-700 ${
            isDark ? 'text-white/[0.018]' : 'text-slate-900/[0.022]'
          }`}
          style={{ top: '6%', transform: 'translateY(-10%)' }}
        >
          UNIFLOW
        </span>

        {/* Ambient Radial Spotlight Orbs */}
        <div 
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[550px] rounded-full blur-[140px] opacity-40 transition-all duration-700"
          style={{
            background: isDark 
              ? 'radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, rgba(99, 102, 241, 0.15) 50%, transparent 75%)'
              : 'radial-gradient(circle, rgba(167, 139, 250, 0.45) 0%, rgba(199, 210, 254, 0.25) 50%, transparent 75%)',
          }}
        />
        <div 
          className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[160px] opacity-25"
          style={{
            background: isDark 
              ? 'radial-gradient(circle, rgba(236, 72, 153, 0.22) 0%, transparent 70%)' 
              : 'radial-gradient(circle, rgba(244, 114, 182, 0.28) 0%, transparent 70%)'
          }}
        />
        <div 
          className="absolute top-[70%] left-[-10%] w-[550px] h-[550px] rounded-full blur-[170px] opacity-20"
          style={{
            background: isDark 
              ? 'radial-gradient(circle, rgba(245, 158, 11, 0.18) 0%, transparent 70%)' 
              : 'radial-gradient(circle, rgba(251, 191, 36, 0.22) 0%, transparent 70%)'
          }}
        />
      </div>

      {/* Main Content Wrapper */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 flex flex-col gap-12 sm:gap-16">

        {/* ========================================================================= */}
        {/* 2. HERO SECTION WITH CINEMATIC ORB & PERSONALIZED GREETING */}
        {/* ========================================================================= */}
        <section 
          id="hero-section"
          className="relative w-full rounded-3xl p-6 sm:p-10 md:p-14 overflow-hidden border transition-all duration-300"
          style={{
            backgroundColor: isDark ? 'rgba(20, 22, 34, 0.72)' : 'rgba(255, 255, 255, 0.85)',
            borderColor: colors.borderSubtle,
            backdropFilter: 'blur(30px) saturate(160%)',
            WebkitBackdropFilter: 'blur(30px) saturate(160%)',
            boxShadow: isDark 
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)'
              : '0 20px 45px -15px rgba(0, 0, 0, 0.06), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9)',
          }}
        >
          {/* Ambient Corner Refraction */}
          <div 
            aria-hidden="true" 
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none bg-gradient-to-bl from-violet-600 to-indigo-600"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              
              {/* Status Badge & Personalized Greeting Pill */}
              <div 
                style={{
                  backgroundColor: isDark ? 'rgba(139, 92, 246, 0.12)' : 'rgba(139, 92, 246, 0.08)',
                  borderColor: isDark ? 'rgba(139, 92, 246, 0.28)' : 'rgba(139, 92, 246, 0.22)',
                  color: colors.primaryText,
                }}
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-semibold tracking-wide shadow-xs mb-5"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span>
                  {greeting}, <span className="font-bold text-violet-500 dark:text-violet-400">{userName}</span> 👋
                </span>
                <span className="hidden sm:inline-block text-zinc-400 dark:text-zinc-500">|</span>
                <span className="hidden sm:inline-block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  UniFlow 3.0
                </span>
              </div>

              {/* Main Headline */}
              <h1 
                style={{ color: colors.primaryText }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight font-sans leading-[1.12]"
              >
                Your student life,<br />
                <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
                  all in one flow.
                </span>
              </h1>

              {/* Supporting Text */}
              <p 
                style={{ color: colors.mutedText }}
                className="mt-4 sm:mt-6 text-base sm:text-lg font-normal leading-relaxed max-w-xl"
              >
                Study, explore, create, relax and stay connected — everything you need for university life in one place.
              </p>

              {/* Primary Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <button
                  id="hero-explore-btn"
                  type="button"
                  onClick={scrollToQuickAccess}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm sm:text-base inline-flex items-center justify-center gap-2 shadow-lg shadow-violet-600/25 active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>Explore Workspace</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                {onOpenSearch && (
                  <button
                    id="hero-search-btn"
                    type="button"
                    onClick={onOpenSearch}
                    style={{
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
                      borderColor: colors.borderSubtle,
                      color: colors.primaryText,
                    }}
                    className="w-full sm:w-auto px-5 py-3.5 rounded-2xl border font-semibold text-sm sm:text-base inline-flex items-center justify-center gap-2.5 hover:bg-violet-500/10 hover:border-violet-500/30 active:scale-95 transition-all duration-200 cursor-pointer"
                  >
                    <Search className="w-4 h-4 text-violet-400" />
                    <span>Search Anything</span>
                    <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs font-mono rounded-md bg-black/10 dark:bg-white/10 text-zinc-500 dark:text-zinc-400 border border-black/5 dark:border-white/5">
                      ⌘K
                    </kbd>
                  </button>
                )}

                <button
                  id="hero-creator-story-btn"
                  type="button"
                  onClick={() => setShowWelcomePopup(true)}
                  style={{
                    color: colors.mutedText,
                  }}
                  className="px-4 py-2.5 text-xs sm:text-sm font-medium hover:text-violet-500 dark:hover:text-violet-400 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                  <span>Creator Story</span>
                </button>
              </div>
            </div>

            {/* Right Visual Column: The Glowing UniFlow Orb */}
            <div className="lg:col-span-5 flex items-center justify-center py-4 lg:py-0">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 flex items-center justify-center">
                
                {/* Outer Ambient Glow Aura */}
                <div 
                  className="absolute inset-0 rounded-full blur-2xl opacity-60 animate-pulse"
                  style={{
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(99, 102, 241, 0.25) 50%, transparent 80%)',
                    animationDuration: '4s'
                  }}
                />

                {/* Outer Glass Orbital Ring */}
                <div 
                  className="absolute inset-2 sm:inset-3 rounded-full border border-dashed border-violet-500/30 dark:border-violet-400/25 animate-spin"
                  style={{ animationDuration: '30s', animationTimingFunction: 'linear' }}
                />

                {/* Second Orbital Counter-Rotating Ring */}
                <div 
                  className="absolute inset-8 sm:inset-9 rounded-full border border-violet-400/20 dark:border-violet-300/15 animate-spin"
                  style={{ animationDuration: '20s', animationDirection: 'reverse', animationTimingFunction: 'linear' }}
                />

                {/* Central Floating Sphere */}
                <div 
                  style={{
                    background: isDark 
                      ? 'linear-gradient(135deg, rgba(30, 27, 75, 0.85) 0%, rgba(88, 28, 135, 0.8) 50%, rgba(15, 23, 42, 0.9) 100%)'
                      : 'linear-gradient(135deg, rgba(238, 242, 255, 0.95) 0%, rgba(243, 232, 255, 0.9) 50%, rgba(224, 231, 255, 0.95) 100%)',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(139, 92, 246, 0.25)',
                    boxShadow: isDark 
                      ? '0 20px 50px rgba(124, 58, 237, 0.35), inset 0 2px 10px rgba(255, 255, 255, 0.2)'
                      : '0 20px 50px rgba(139, 92, 246, 0.2), inset 0 2px 10px rgba(255, 255, 255, 0.8)',
                  }}
                  className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full border backdrop-blur-xl flex flex-col items-center justify-center text-center p-4 transition-transform duration-500 hover:scale-105 select-none"
                >
                  {/* Inside Emblem */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center text-white font-black text-xl sm:text-2xl shadow-md shadow-violet-600/40 mb-2">
                    U
                  </div>
                  <span className="font-extrabold text-sm sm:text-base tracking-tight" style={{ color: colors.primaryText }}>
                    UniFlow
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-violet-500 dark:text-violet-400">
                    Ecosystem
                  </span>
                </div>

                {/* Floating Micro Feature Chips */}
                <div 
                  className="absolute top-2 left-2 px-3 py-1.5 rounded-full text-[11px] font-bold border backdrop-blur-md shadow-md flex items-center gap-1.5"
                  style={{
                    backgroundColor: isDark ? 'rgba(18, 20, 29, 0.85)' : 'rgba(255, 255, 255, 0.9)',
                    borderColor: colors.borderSubtle,
                    color: colors.primaryText,
                  }}
                >
                  <GraduationCap className="w-3.5 h-3.5 text-violet-400" />
                  <span>Academic Vault</span>
                </div>

                <div 
                  className="absolute bottom-3 right-2 px-3 py-1.5 rounded-full text-[11px] font-bold border backdrop-blur-md shadow-md flex items-center gap-1.5"
                  style={{
                    backgroundColor: isDark ? 'rgba(18, 20, 29, 0.85)' : 'rgba(255, 255, 255, 0.9)',
                    borderColor: colors.borderSubtle,
                    color: colors.primaryText,
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>AI & Tools</span>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* 3. QUICK ACCESS SECTION */}
        {/* ========================================================================= */}
        <section id="quick-access-section" className="w-full flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <h2 
                style={{ color: colors.primaryText }}
                className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight font-sans"
              >
                Quick Access
              </h2>
              <p style={{ color: colors.mutedText }} className="text-xs sm:text-sm mt-1">
                Essential semester portals, study materials, and curated question banks
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {/* Semester 1 Card */}
            <div
              id="quick-card-sem1"
              onClick={() => handlePageClick('semester-1')}
              style={{
                backgroundColor: isDark ? 'rgba(20, 22, 34, 0.65)' : 'rgba(255, 255, 255, 0.8)',
                borderColor: colors.borderSubtle,
              }}
              className="group relative rounded-2xl p-5 sm:p-6 border backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-lg active:scale-[0.98] cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-500 dark:text-violet-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                  Semester 1
                </span>
              </div>
              <div className="mt-4">
                <h3 style={{ color: colors.primaryText }} className="text-base sm:text-lg font-bold group-hover:text-violet-500 transition-colors">
                  Semester 1 Portal
                </h3>
                <p style={{ color: colors.mutedText }} className="text-xs sm:text-sm mt-1.5 line-clamp-2 leading-relaxed">
                  Engineering Math, EVS, Lab Manuals, In-Sem PYQs and lecture notes.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-semibold text-violet-500 dark:text-violet-400">
                <span>Open Semester 1</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Semester 2 Card */}
            <div
              id="quick-card-sem2"
              onClick={() => handlePageClick('semester-2')}
              style={{
                backgroundColor: isDark ? 'rgba(20, 22, 34, 0.65)' : 'rgba(255, 255, 255, 0.8)',
                borderColor: colors.borderSubtle,
              }}
              className="group relative rounded-2xl p-5 sm:p-6 border backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-lg active:scale-[0.98] cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  Semester 2
                </span>
              </div>
              <div className="mt-4">
                <h3 style={{ color: colors.primaryText }} className="text-base sm:text-lg font-bold group-hover:text-indigo-500 transition-colors">
                  Semester 2 Portal
                </h3>
                <p style={{ color: colors.mutedText }} className="text-xs sm:text-sm mt-1.5 line-clamp-2 leading-relaxed">
                  DSA, C++, Maths for AI, Exam Vault, IHVPE and Constitution resources.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-semibold text-indigo-500 dark:text-indigo-400">
                <span>Open Semester 2</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Study Resources Card */}
            <div
              id="quick-card-study"
              onClick={() => handlePageClick('study-resources')}
              style={{
                backgroundColor: isDark ? 'rgba(20, 22, 34, 0.65)' : 'rgba(255, 255, 255, 0.8)',
                borderColor: colors.borderSubtle,
              }}
              className="group relative rounded-2xl p-5 sm:p-6 border backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-lg active:scale-[0.98] cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FolderGit2 className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Resources
                </span>
              </div>
              <div className="mt-4">
                <h3 style={{ color: colors.primaryText }} className="text-base sm:text-lg font-bold group-hover:text-emerald-500 transition-colors">
                  Study Resources
                </h3>
                <p style={{ color: colors.mutedText }} className="text-xs sm:text-sm mt-1.5 line-clamp-2 leading-relaxed">
                  Tech roadmaps, placement prep, coding playlists & core CS guides.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-semibold text-emerald-500 dark:text-emerald-400">
                <span>Explore Curricula</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Exam Vault Card */}
            <div
              id="quick-card-exam-vault"
              onClick={() => handlePageClick('semester-2', '/app/semester-2/exam-vault')}
              style={{
                backgroundColor: isDark ? 'rgba(20, 22, 34, 0.65)' : 'rgba(255, 255, 255, 0.8)',
                borderColor: colors.borderSubtle,
              }}
              className="group relative rounded-2xl p-5 sm:p-6 border backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-lg active:scale-[0.98] cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  High Yield
                </span>
              </div>
              <div className="mt-4">
                <h3 style={{ color: colors.primaryText }} className="text-base sm:text-lg font-bold group-hover:text-amber-500 transition-colors">
                  Exam Vault & PYQs
                </h3>
                <p style={{ color: colors.mutedText }} className="text-xs sm:text-sm mt-1.5 line-clamp-2 leading-relaxed">
                  In-Sem 1, 2 & 3 solved question banks, previous year university papers.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-semibold text-amber-500 dark:text-amber-400">
                <span>View Question Banks</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* AI Assistant Hub Card */}
            <div
              id="quick-card-ai"
              onClick={() => handlePageClick('ai')}
              style={{
                backgroundColor: isDark ? 'rgba(20, 22, 34, 0.65)' : 'rgba(255, 255, 255, 0.8)',
                borderColor: colors.borderSubtle,
              }}
              className="group relative rounded-2xl p-5 sm:p-6 border backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-fuchsia-500/40 hover:shadow-lg active:scale-[0.98] cursor-pointer flex flex-col justify-between sm:col-span-2 lg:col-span-2"
            >
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-500 dark:text-fuchsia-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 border border-fuchsia-500/20">
                  AI Powerhouse
                </span>
              </div>
              <div className="mt-4">
                <h3 style={{ color: colors.primaryText }} className="text-base sm:text-lg font-bold group-hover:text-fuchsia-500 transition-colors">
                  AI Intelligence Tools Hub
                </h3>
                <p style={{ color: colors.mutedText }} className="text-xs sm:text-sm mt-1.5 leading-relaxed">
                  Curated AI chatbots, code debuggers, slide makers, research companions, and visual generators for students.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-semibold text-fuchsia-500 dark:text-fuchsia-400">
                <span>Launch AI Workspace</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* 4. WHAT'S NEW SECTION */}
        {/* ========================================================================= */}
        <section id="whats-new-section" className="w-full flex flex-col gap-5">
          <div>
            <h2 
              style={{ color: colors.primaryText }}
              className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight font-sans"
            >
              What's New
            </h2>
            <p style={{ color: colors.mutedText }} className="text-xs sm:text-sm mt-1">
              Recently expanded tools, literature archives, student hubs and gaming arenas
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Digital Books & Literature */}
            <div
              id="whats-new-books"
              onClick={() => handlePageClick('books')}
              style={{
                backgroundColor: isDark ? 'rgba(20, 22, 34, 0.55)' : 'rgba(255, 255, 255, 0.75)',
                borderColor: colors.borderSubtle,
              }}
              className="group rounded-2xl p-5 border backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-violet-500/30 hover:shadow-md active:scale-[0.98] cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-500 dark:text-violet-400 flex items-center justify-center mb-3">
                  <Library className="w-5 h-5" />
                </div>
                <h4 style={{ color: colors.primaryText }} className="text-sm font-bold group-hover:text-violet-500 transition-colors">
                  Digital Books & Literature
                </h4>
                <p style={{ color: colors.mutedText }} className="text-xs mt-1 leading-relaxed">
                  6 curated categories: Fiction, Non-Fiction, Business, Self-Help & Open Libraries.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-semibold text-violet-500">
                <span>Browse Books</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

            {/* Student Apps Suite */}
            <div
              id="whats-new-apps"
              onClick={() => handlePageClick('student-apps')}
              style={{
                backgroundColor: isDark ? 'rgba(20, 22, 34, 0.55)' : 'rgba(255, 255, 255, 0.75)',
                borderColor: colors.borderSubtle,
              }}
              className="group rounded-2xl p-5 border backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-md active:scale-[0.98] cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 flex items-center justify-center mb-3">
                  <LayoutGrid className="w-5 h-5" />
                </div>
                <h4 style={{ color: colors.primaryText }} className="text-sm font-bold group-hover:text-cyan-500 transition-colors">
                  Essential Student Apps
                </h4>
                <p style={{ color: colors.mutedText }} className="text-xs mt-1 leading-relaxed">
                  14 productivity tools: Notion, Drive, VS Code, Canva, Forest, Overleaf & DigiLocker.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-semibold text-cyan-500">
                <span>Open Apps</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

            {/* Social Media & Communities */}
            <div
              id="whats-new-social"
              onClick={() => handlePageClick('social-media-apps')}
              style={{
                backgroundColor: isDark ? 'rgba(20, 22, 34, 0.55)' : 'rgba(255, 255, 255, 0.75)',
                borderColor: colors.borderSubtle,
              }}
              className="group rounded-2xl p-5 border backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-pink-500/30 hover:shadow-md active:scale-[0.98] cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-500 dark:text-pink-400 flex items-center justify-center mb-3">
                  <Share2 className="w-5 h-5" />
                </div>
                <h4 style={{ color: colors.primaryText }} className="text-sm font-bold group-hover:text-pink-500 transition-colors">
                  Developer Communities
                </h4>
                <p style={{ color: colors.mutedText }} className="text-xs mt-1 leading-relaxed">
                  Join Discord study rooms, Telegram channels, Reddit & GeeksforGeeks forums.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-semibold text-pink-500">
                <span>Explore Social</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

            {/* Entertainment & Gaming */}
            <div
              id="whats-new-entertainment"
              onClick={() => handlePageClick('entertainment')}
              style={{
                backgroundColor: isDark ? 'rgba(20, 22, 34, 0.55)' : 'rgba(255, 255, 255, 0.75)',
                borderColor: colors.borderSubtle,
              }}
              className="group rounded-2xl p-5 border backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-amber-500/30 hover:shadow-md active:scale-[0.98] cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 dark:text-amber-400 flex items-center justify-center mb-3">
                  <PlayCircle className="w-5 h-5" />
                </div>
                <h4 style={{ color: colors.primaryText }} className="text-sm font-bold group-hover:text-amber-500 transition-colors">
                  Cinema & 3D Games
                </h4>
                <p style={{ color: colors.mutedText }} className="text-xs mt-1 leading-relaxed">
                  TBCPL cinema streaming hub & built-in 3D Vishnu Drift racing arena.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-semibold text-amber-500">
                <span>Relax & Play</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* 5. SEMESTER 3 COMING SOON ROADMAP TEASER */}
        {/* ========================================================================= */}
        <section 
          id="semester-3-roadmap-teaser"
          className="relative w-full rounded-3xl p-6 sm:p-8 border overflow-hidden transition-all duration-300"
          style={{
            backgroundColor: isDark ? 'rgba(18, 20, 32, 0.65)' : 'rgba(255, 255, 255, 0.85)',
            borderColor: colors.borderSubtle,
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-violet-500/10 text-violet-500 dark:text-violet-400 border border-violet-500/20 mb-3">
                <Clock className="w-3.5 h-3.5" />
                <span>Upcoming Semester</span>
              </div>
              <h3 
                style={{ color: colors.primaryText }}
                className="text-xl sm:text-2xl font-bold tracking-tight"
              >
                Semester 3 Curriculum & Roadmap
              </h3>
              <p 
                style={{ color: colors.mutedText }}
                className="text-xs sm:text-sm mt-2 leading-relaxed"
              >
                Advanced Data Structures, Computer Organization, Operating Systems, DBMS & AI specialization track curriculum in active compilation.
              </p>
            </div>

            <button
              id="sem3-preview-btn"
              type="button"
              onClick={() => handlePageClick('semester-3', '/app/semester-3/syllabus')}
              className="px-5 py-3 rounded-2xl bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-md shrink-0 cursor-pointer"
            >
              <span>Preview Syllabus</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* 6. STAY CONNECTED & COMMUNITY CHANNELS */}
        {/* ========================================================================= */}
        <section id="community-section" className="w-full flex flex-col gap-5">
          <div>
            <h2 
              style={{ color: colors.primaryText }}
              className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight font-sans"
            >
              Stay Connected
            </h2>
            <p style={{ color: colors.mutedText }} className="text-xs sm:text-sm mt-1">
              Join active student communities and connect directly with the creator for real-time exam alerts, notes updates and networking
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {/* WhatsApp Community */}
            <a
              id="community-whatsapp-link"
              href={FOUNDER_INFO.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: isDark ? 'rgba(20, 22, 34, 0.55)' : 'rgba(255, 255, 255, 0.75)',
                borderColor: colors.borderSubtle,
              }}
              className="group rounded-2xl p-5 border backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-md flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 style={{ color: colors.primaryText }} className="text-sm font-bold group-hover:text-emerald-500 transition-colors truncate">
                    Official WhatsApp
                  </h4>
                  <p style={{ color: colors.mutedText }} className="text-xs mt-0.5 truncate">
                    Class notices & notes
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
            </a>

            {/* Instagram Profile */}
            <a
              id="community-instagram-link"
              href={FOUNDER_INFO.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: isDark ? 'rgba(20, 22, 34, 0.55)' : 'rgba(255, 255, 255, 0.75)',
                borderColor: colors.borderSubtle,
              }}
              className="group rounded-2xl p-5 border backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-pink-500/40 hover:shadow-md flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-pink-500/10 text-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  <Instagram className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 style={{ color: colors.primaryText }} className="text-sm font-bold group-hover:text-pink-500 transition-colors truncate">
                    Instagram
                  </h4>
                  <p style={{ color: colors.mutedText }} className="text-xs mt-0.5 truncate">
                    {FOUNDER_INFO.instagramHandle}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-pink-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
            </a>

            {/* LinkedIn Profile */}
            <a
              id="community-linkedin-link"
              href={FOUNDER_INFO.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: isDark ? 'rgba(20, 22, 34, 0.55)' : 'rgba(255, 255, 255, 0.75)',
                borderColor: colors.borderSubtle,
              }}
              className="group rounded-2xl p-5 border backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-sky-500/40 hover:shadow-md flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 style={{ color: colors.primaryText }} className="text-sm font-bold group-hover:text-sky-500 transition-colors truncate">
                    LinkedIn
                  </h4>
                  <p style={{ color: colors.mutedText }} className="text-xs mt-0.5 truncate">
                    Connect with Vishnu
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-sky-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
            </a>

            {/* Telegram Channel */}
            <a
              id="community-telegram-link"
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: isDark ? 'rgba(20, 22, 34, 0.55)' : 'rgba(255, 255, 255, 0.75)',
                borderColor: colors.borderSubtle,
              }}
              className="group rounded-2xl p-5 border backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-md flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  <Share2 className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 style={{ color: colors.primaryText }} className="text-sm font-bold group-hover:text-cyan-500 transition-colors truncate">
                    Telegram Channel
                  </h4>
                  <p style={{ color: colors.mutedText }} className="text-xs mt-0.5 truncate">
                    Fast PDF download alerts
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-cyan-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
            </a>

            {/* Discord Study Lounge */}
            <a
              id="community-discord-link"
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: isDark ? 'rgba(20, 22, 34, 0.55)' : 'rgba(255, 255, 255, 0.75)',
                borderColor: colors.borderSubtle,
              }}
              className="group rounded-2xl p-5 border backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-md flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 style={{ color: colors.primaryText }} className="text-sm font-bold group-hover:text-indigo-500 transition-colors truncate">
                    Discord Lounge
                  </h4>
                  <p style={{ color: colors.mutedText }} className="text-xs mt-0.5 truncate">
                    24/7 peer study rooms
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
            </a>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* 7. CREATOR SECTION */}
        {/* ========================================================================= */}
        <section 
          id="creator-section"
          className="relative w-full rounded-3xl p-6 sm:p-10 border overflow-hidden transition-all duration-300"
          style={{
            backgroundColor: isDark ? 'rgba(20, 22, 34, 0.75)' : 'rgba(255, 255, 255, 0.9)',
            borderColor: colors.borderSubtle,
            backdropFilter: 'blur(30px)',
            boxShadow: isDark 
              ? '0 20px 40px -15px rgba(0, 0, 0, 0.5)'
              : '0 20px 40px -15px rgba(0, 0, 0, 0.05)',
          }}
        >
          {/* Subtle Ambient Aura */}
          <div 
            aria-hidden="true" 
            className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none bg-gradient-to-tr from-violet-600 to-fuchsia-600"
          />

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
            {/* Creator Photo with Luxury Border */}
            <div className="relative shrink-0">
              <div 
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 p-1"
                style={{
                  borderColor: isDark ? 'rgba(168, 85, 247, 0.5)' : 'rgba(139, 92, 246, 0.4)',
                  boxShadow: '0 8px 24px -6px rgba(139, 92, 246, 0.35)',
                }}
              >
                <img
                  src={VISHNU_BASE64_PHOTO || FOUNDER_INFO.photoUrl}
                  alt={FOUNDER_INFO.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FOUNDER_INFO.fallbackPhotoUrl;
                  }}
                />
              </div>
              <div 
                className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-violet-600 text-white shadow-xs"
              >
                CREATOR
              </div>
            </div>

            {/* Creator Bio & Social Links */}
            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1.5">
                <h3 
                  style={{ color: colors.primaryText }}
                  className="text-lg sm:text-xl font-black tracking-tight"
                >
                  Built by {FOUNDER_INFO.name}
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-violet-500/10 text-violet-500 font-semibold border border-violet-500/20">
                  {FOUNDER_INFO.department}
                </span>
              </div>

              <p 
                style={{ color: colors.mutedText }}
                className="text-xs sm:text-sm font-normal max-w-xl leading-relaxed mt-1"
              >
                “Created to make student life simpler, smarter and more connected.”
              </p>

              {/* Social Connect Pills */}
              <div className="mt-5 flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                <a
                  id="creator-whatsapp-btn"
                  href={FOUNDER_INFO.links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 hover:text-white border border-emerald-500/20 transition-all duration-150"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>

                <a
                  id="creator-instagram-btn"
                  href={FOUNDER_INFO.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 bg-pink-500/10 hover:bg-pink-500 text-pink-600 hover:text-white border border-pink-500/20 transition-all duration-150"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>

                <a
                  id="creator-linkedin-btn"
                  href={FOUNDER_INFO.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 bg-sky-500/10 hover:bg-sky-500 text-sky-600 hover:text-white border border-sky-500/20 transition-all duration-150"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>

                <button
                  id="creator-modal-trigger"
                  type="button"
                  onClick={() => setShowWelcomePopup(true)}
                  style={{
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
                    borderColor: colors.borderSubtle,
                    color: colors.primaryText,
                  }}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 border hover:bg-violet-500/10 hover:border-violet-500/30 transition-all duration-150 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                  <span>Creator Story</span>
                </button>
              </div>
            </div>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* 8. EDITORIAL STATEMENT & MINIMAL FOOTER */}
        {/* ========================================================================= */}
        <footer 
          id="home-editorial-footer"
          className="w-full pt-6 pb-4 border-t border-black/5 dark:border-white/5 flex flex-col items-center justify-center text-center gap-4"
        >
          {/* Editorial Philosophy Statement */}
          <div className="flex flex-col items-center gap-1">
            <p 
              style={{ color: colors.primaryText }}
              className="text-base sm:text-lg font-black tracking-tight font-sans"
            >
              “Everything you need. One flow.”
            </p>
            <p 
              style={{ color: colors.mutedText }}
              className="text-xs sm:text-sm font-medium tracking-wide"
            >
              Study smarter. Explore more.
            </p>
          </div>

          {/* Clean Copyright & Back To Top */}
          <div className="flex items-center justify-between w-full max-w-xl px-4 text-xs text-zinc-400 dark:text-zinc-500 mt-2">
            <span>
              © {new Date().getFullYear()} UniFlow • Student Command Center
            </span>
            <button
              id="back-to-top-btn"
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 hover:text-violet-500 dark:hover:text-violet-400 transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </footer>

      </div>

      {/* Welcome to UniFlow Modal (Creator Story) */}
      <WelcomePopup
        isOpen={showWelcomePopup}
        onClose={handleClosePopup}
      />
    </div>
  );
};
