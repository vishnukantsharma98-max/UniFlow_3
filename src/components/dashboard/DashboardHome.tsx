import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { 
  GraduationCap, 
  FolderGit2, 
  Sparkles, 
  Library, 
  LayoutGrid, 
  Share2, 
  PlayCircle, 
  Gamepad2, 
  ArrowUpRight,
} from 'lucide-react';
import { DashboardPageId } from './types';
import { useTheme } from './ThemeSystem';
import { WelcomePopup } from './WelcomePopup';
import { shouldShowWelcomePopup, markWelcomePopupShown } from '../../firebase/welcomeSession';
import { navigate } from './navigationRouter';

interface DashboardHomeProps {
  user: User;
  onSelectPage?: (page: DashboardPageId) => void;
  onOpenSearch?: () => void;
}

interface DestinationCardItem {
  id: DashboardPageId;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  iconGradient: string;
  iconShadow: string;
  arrowColor: string;
  arrowColorLight: string;
  arrowBgDark: string;
  arrowBgLight: string;
  // Full card surface colors (Dark & Light modes)
  cardBgDark: string;
  cardBgLight: string;
  borderDark: string;
  borderLight: string;
  glowDark: string;
  glowLight: string;
}

const DESTINATION_CARDS: DestinationCardItem[] = [
  {
    // 1. Semester 1 → PURPLE / VIOLET
    id: 'semester-1',
    title: 'Semester 1',
    subtitle: 'Maths, Physics & PYQs',
    icon: GraduationCap,
    iconGradient: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
    iconShadow: 'rgba(124, 58, 237, 0.40)',
    arrowColor: 'rgb(192, 132, 252)',
    arrowColorLight: '#6d28d9',
    arrowBgDark: 'rgba(168, 85, 247, 0.18)',
    arrowBgLight: 'rgba(124, 58, 237, 0.12)',
    cardBgDark: 'linear-gradient(145deg, rgba(67, 24, 110, 0.55) 0%, rgba(24, 14, 46, 0.95) 100%)',
    cardBgLight: 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(244, 236, 255, 0.92) 100%)',
    borderDark: 'rgba(168, 85, 247, 0.35)',
    borderLight: 'rgba(168, 85, 247, 0.25)',
    glowDark: 'rgba(168, 85, 247, 0.22)',
    glowLight: 'rgba(168, 85, 247, 0.08)',
  },
  {
    // 2. Semester 2 → BLUE / INDIGO (ONLY strong blue/indigo treatment)
    id: 'semester-2',
    title: 'Semester 2',
    subtitle: 'DSA, Math for AI & Notes',
    icon: GraduationCap,
    iconGradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    iconShadow: 'rgba(29, 78, 216, 0.40)',
    arrowColor: 'rgb(147, 197, 253)',
    arrowColorLight: '#1d4ed8',
    arrowBgDark: 'rgba(59, 130, 246, 0.18)',
    arrowBgLight: 'rgba(29, 78, 216, 0.12)',
    cardBgDark: 'linear-gradient(145deg, rgba(23, 50, 115, 0.55) 0%, rgba(13, 22, 50, 0.95) 100%)',
    cardBgLight: 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(235, 244, 255, 0.92) 100%)',
    borderDark: 'rgba(59, 130, 246, 0.35)',
    borderLight: 'rgba(59, 130, 246, 0.25)',
    glowDark: 'rgba(59, 130, 246, 0.22)',
    glowLight: 'rgba(59, 130, 246, 0.08)',
  },
  {
    // 3. Semester 3 → PINK / MAGENTA
    id: 'semester-3',
    title: 'Semester 3',
    subtitle: 'COA, OS, DBMS & Exam Vault',
    icon: GraduationCap,
    iconGradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
    iconShadow: 'rgba(236, 72, 153, 0.40)',
    arrowColor: 'rgb(249, 168, 212)',
    arrowColorLight: '#be185d',
    arrowBgDark: 'rgba(236, 72, 153, 0.18)',
    arrowBgLight: 'rgba(190, 24, 93, 0.12)',
    cardBgDark: 'linear-gradient(145deg, rgba(110, 20, 75, 0.55) 0%, rgba(44, 12, 34, 0.95) 100%)',
    cardBgLight: 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(253, 237, 247, 0.92) 100%)',
    borderDark: 'rgba(236, 72, 153, 0.35)',
    borderLight: 'rgba(236, 72, 153, 0.25)',
    glowDark: 'rgba(236, 72, 153, 0.22)',
    glowLight: 'rgba(236, 72, 153, 0.08)',
  },
  {
    // 4. Entertainment → RED / CORAL (Distinct from Semester 3)
    id: 'entertainment',
    title: 'Entertainment',
    subtitle: 'Cinema Lounge & Shows',
    icon: PlayCircle,
    iconGradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    iconShadow: 'rgba(239, 68, 68, 0.40)',
    arrowColor: 'rgb(252, 165, 165)',
    arrowColorLight: '#b91c1c',
    arrowBgDark: 'rgba(239, 68, 68, 0.18)',
    arrowBgLight: 'rgba(185, 28, 28, 0.12)',
    cardBgDark: 'linear-gradient(145deg, rgba(115, 25, 25, 0.55) 0%, rgba(48, 12, 12, 0.95) 100%)',
    cardBgLight: 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(254, 238, 238, 0.92) 100%)',
    borderDark: 'rgba(239, 68, 68, 0.35)',
    borderLight: 'rgba(239, 68, 68, 0.25)',
    glowDark: 'rgba(239, 68, 68, 0.22)',
    glowLight: 'rgba(239, 68, 68, 0.08)',
  },
  {
    // 5. Study Resources → TEAL / EMERALD
    id: 'study-resources',
    title: 'Study Resources',
    subtitle: 'Placement & Roadmaps',
    icon: FolderGit2,
    iconGradient: 'linear-gradient(135deg, #14b8a6 0%, #059669 100%)',
    iconShadow: 'rgba(20, 184, 166, 0.40)',
    arrowColor: 'rgb(94, 234, 212)',
    arrowColorLight: '#0f766e',
    arrowBgDark: 'rgba(20, 184, 166, 0.18)',
    arrowBgLight: 'rgba(15, 118, 110, 0.12)',
    cardBgDark: 'linear-gradient(145deg, rgba(13, 78, 70, 0.55) 0%, rgba(8, 34, 30, 0.95) 100%)',
    cardBgLight: 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(234, 250, 247, 0.92) 100%)',
    borderDark: 'rgba(20, 184, 166, 0.35)',
    borderLight: 'rgba(20, 184, 166, 0.25)',
    glowDark: 'rgba(20, 184, 166, 0.22)',
    glowLight: 'rgba(20, 184, 166, 0.08)',
  },
  {
    // 6. Books → ORANGE / AMBER
    id: 'books',
    title: 'Books',
    subtitle: 'Digital Library & Literature',
    icon: Library,
    iconGradient: 'linear-gradient(135deg, #f97316 0%, #d97706 100%)',
    iconShadow: 'rgba(249, 115, 22, 0.40)',
    arrowColor: 'rgb(253, 186, 116)',
    arrowColorLight: '#c2410c',
    arrowBgDark: 'rgba(249, 115, 22, 0.18)',
    arrowBgLight: 'rgba(194, 65, 12, 0.12)',
    cardBgDark: 'linear-gradient(145deg, rgba(95, 48, 14, 0.55) 0%, rgba(42, 20, 8, 0.95) 100%)',
    cardBgLight: 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 245, 235, 0.92) 100%)',
    borderDark: 'rgba(249, 115, 22, 0.35)',
    borderLight: 'rgba(249, 115, 22, 0.25)',
    glowDark: 'rgba(249, 115, 22, 0.22)',
    glowLight: 'rgba(249, 115, 22, 0.08)',
  },
  {
    // 7. Game Zone → GREEN / LIME (NOT blue or cyan)
    id: 'games',
    title: 'Game Zone',
    subtitle: 'Quick brain breaks',
    icon: Gamepad2,
    iconGradient: 'linear-gradient(135deg, #84cc16 0%, #16a34a 100%)',
    iconShadow: 'rgba(132, 204, 22, 0.40)',
    arrowColor: 'rgb(190, 242, 100)',
    arrowColorLight: '#3f6212',
    arrowBgDark: 'rgba(132, 204, 22, 0.18)',
    arrowBgLight: 'rgba(63, 98, 18, 0.12)',
    cardBgDark: 'linear-gradient(145deg, rgba(38, 75, 14, 0.55) 0%, rgba(16, 34, 8, 0.95) 100%)',
    cardBgLight: 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 253, 236, 0.92) 100%)',
    borderDark: 'rgba(132, 204, 22, 0.35)',
    borderLight: 'rgba(132, 204, 22, 0.25)',
    glowDark: 'rgba(132, 204, 22, 0.22)',
    glowLight: 'rgba(132, 204, 22, 0.08)',
  },
  {
    // 8. AI Lab → VIOLET / ELECTRIC PURPLE
    id: 'ai',
    title: 'AI Lab',
    subtitle: 'Tools & Intelligence',
    icon: Sparkles,
    iconGradient: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
    iconShadow: 'rgba(139, 92, 246, 0.40)',
    arrowColor: 'rgb(196, 181, 253)',
    arrowColorLight: '#5b21b6',
    arrowBgDark: 'rgba(139, 92, 246, 0.18)',
    arrowBgLight: 'rgba(91, 33, 182, 0.12)',
    cardBgDark: 'linear-gradient(145deg, rgba(58, 28, 115, 0.55) 0%, rgba(24, 14, 48, 0.95) 100%)',
    cardBgLight: 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(247, 244, 255, 0.92) 100%)',
    borderDark: 'rgba(139, 92, 246, 0.35)',
    borderLight: 'rgba(139, 92, 246, 0.25)',
    glowDark: 'rgba(139, 92, 246, 0.22)',
    glowLight: 'rgba(139, 92, 246, 0.08)',
  },
  {
    // 9. Student Apps → CYAN / TURQUOISE
    id: 'student-apps',
    title: 'Student Apps',
    subtitle: 'Productivity & Utilities',
    icon: LayoutGrid,
    iconGradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
    iconShadow: 'rgba(6, 182, 212, 0.40)',
    arrowColor: 'rgb(103, 232, 249)',
    arrowColorLight: '#0e7490',
    arrowBgDark: 'rgba(6, 182, 212, 0.18)',
    arrowBgLight: 'rgba(14, 116, 144, 0.12)',
    cardBgDark: 'linear-gradient(145deg, rgba(12, 72, 90, 0.55) 0%, rgba(6, 32, 40, 0.95) 100%)',
    cardBgLight: 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(238, 252, 255, 0.92) 100%)',
    borderDark: 'rgba(6, 182, 212, 0.35)',
    borderLight: 'rgba(6, 182, 212, 0.25)',
    glowDark: 'rgba(6, 182, 212, 0.22)',
    glowLight: 'rgba(6, 182, 212, 0.08)',
  },
  {
    // 10. Social Media Apps → INDIGO / ROSE
    id: 'social-media-apps',
    title: 'Social Media Apps',
    subtitle: 'Student Networks',
    icon: Share2,
    iconGradient: 'linear-gradient(135deg, #6366f1 0%, #f43f5e 100%)',
    iconShadow: 'rgba(99, 102, 241, 0.40)',
    arrowColor: 'rgb(165, 180, 252)',
    arrowColorLight: '#4338ca',
    arrowBgDark: 'rgba(99, 102, 241, 0.18)',
    arrowBgLight: 'rgba(67, 56, 202, 0.12)',
    cardBgDark: 'linear-gradient(145deg, rgba(65, 25, 80, 0.55) 0%, rgba(26, 12, 38, 0.95) 100%)',
    cardBgLight: 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(252, 242, 255, 0.92) 100%)',
    borderDark: 'rgba(168, 85, 247, 0.35)',
    borderLight: 'rgba(244, 63, 94, 0.25)',
    glowDark: 'rgba(99, 102, 241, 0.22)',
    glowLight: 'rgba(244, 63, 94, 0.08)',
  },
];

export const DashboardHome: React.FC<DashboardHomeProps> = ({ 
  user, 
  onSelectPage, 
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [showWelcomePopup, setShowWelcomePopup] = useState<boolean>(false);

  // Compute user's first name
  const getUserFirstName = () => {
    if (user?.displayName && user.displayName.trim().length > 0) {
      const parts = user.displayName.trim().split(/\s+/);
      if (parts[0]) return parts[0];
    }
    if (user?.email) {
      const localPart = user.email.split('@')[0];
      const cleaned = localPart.replace(/[0-9._-]/g, ' ').trim().split(/\s+/)[0];
      if (cleaned && cleaned.length > 0) {
        return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
      }
    }
    return 'Vishnu';
  };

  const userFirstName = getUserFirstName() || 'Vishnu';

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

  const handleCardClick = (pageId: DashboardPageId) => {
    if (onSelectPage) {
      onSelectPage(pageId);
    } else {
      navigate(pageId === 'home' ? '/app' : `/app/${pageId}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      id="uniflow-home-container"
      className="relative min-h-screen w-full flex flex-col items-center justify-start pb-20 selection:bg-violet-500/20"
    >
      {/* Soft Ambient Glows in Background */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden flex items-center justify-center select-none"
      >
        <div 
          className="absolute -top-16 left-1/2 -translate-x-1/2 w-[700px] h-[450px] rounded-full blur-[140px] opacity-40 transition-all duration-700"
          style={{
            background: isDark 
              ? 'radial-gradient(circle, rgba(139, 92, 246, 0.30) 0%, rgba(99, 102, 241, 0.15) 50%, transparent 75%)'
              : 'radial-gradient(circle, rgba(199, 210, 254, 0.55) 0%, rgba(243, 232, 255, 0.35) 50%, transparent 75%)',
          }}
        />
        <div 
          className="absolute top-[45%] right-[-5%] w-[450px] h-[450px] rounded-full blur-[150px] opacity-25"
          style={{
            background: isDark 
              ? 'radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, transparent 70%)' 
              : 'radial-gradient(circle, rgba(254, 205, 211, 0.45) 0%, transparent 70%)'
          }}
        />
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 flex flex-col gap-6 sm:gap-8 items-center">

        {/* Minimal Header */}
        <header id="home-minimal-header" className="w-full text-center flex flex-col items-center gap-1.5">
          <h1 
            id="home-greeting-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-sans bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 dark:from-violet-400 dark:via-indigo-300 dark:to-blue-400 bg-clip-text text-transparent"
          >
            Hey, {userFirstName} 👋
          </h1>
          <p 
            style={{ color: isDark ? '#9CA3AF' : '#6B7280' }}
            className="text-sm sm:text-base font-medium"
          >
            Your centralized academic & creative companion
          </p>
        </header>

        {/* Equal-Sized Multi-Column Card Grid */}
        <main 
          id="home-quick-access-grid"
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
        >
          {DESTINATION_CARDS.map((card) => {
            const Icon = card.icon;

            return (
              <button
                key={card.id}
                id={`card-${card.id}`}
                type="button"
                onClick={() => handleCardClick(card.id)}
                style={{
                  background: isDark ? card.cardBgDark : card.cardBgLight,
                  borderColor: isDark ? card.borderDark : card.borderLight,
                  boxShadow: isDark 
                    ? `0 16px 36px -10px rgba(0, 0, 0, 0.65), 0 0 20px -4px ${card.glowDark}, inset 0 1px 0 rgba(255, 255, 255, 0.12)`
                    : `0 14px 34px -10px rgba(0, 0, 0, 0.06), 0 0 18px -4px ${card.glowLight}, inset 0 1px 0 rgba(255, 255, 255, 0.95)`,
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                }}
                className="group relative w-full h-full min-h-[175px] sm:min-h-[195px] rounded-[26px] sm:rounded-[30px] p-5 sm:p-7 border transition-all duration-300 ease-out flex flex-col items-center text-center justify-between cursor-pointer select-none hover:-translate-y-1.5 hover:shadow-xl active:scale-[0.98]"
              >
                {/* Matching Subtle Top-Right Arrow Indicator */}
                <div 
                  style={{
                    color: isDark ? card.arrowColor : card.arrowColorLight,
                    backgroundColor: isDark ? card.arrowBgDark : card.arrowBgLight,
                  }}
                  className="absolute top-4 right-4 sm:top-5 sm:right-5 w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                </div>

                {/* Centered Squircle Icon */}
                <div 
                  style={{
                    background: card.iconGradient,
                    boxShadow: `0 8px 22px -4px ${card.iconShadow}`,
                  }}
                  className="w-13 h-13 sm:w-15 sm:h-15 rounded-[18px] sm:rounded-[20px] flex items-center justify-center text-white mb-3 group-hover:scale-110 group-hover:rotate-1 transition-transform duration-300 shrink-0"
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={2.2} />
                </div>

                {/* Content Block */}
                <div className="flex flex-col items-center">
                  {/* Title */}
                  <h3 
                    style={{ color: isDark ? '#F3F4F6' : '#16171D' }}
                    className="text-base sm:text-lg font-extrabold tracking-tight"
                  >
                    {card.title}
                  </h3>

                  {/* Subtitle */}
                  <p 
                    style={{ color: isDark ? '#9CA3AF' : '#4B5563' }}
                    className="text-xs sm:text-[13px] font-normal mt-1 leading-snug"
                  >
                    {card.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </main>

      </div>

      {/* Welcome to UniFlow Modal (Preserved for session compatibility) */}
      <WelcomePopup
        isOpen={showWelcomePopup}
        onClose={handleClosePopup}
      />
    </div>
  );
};
