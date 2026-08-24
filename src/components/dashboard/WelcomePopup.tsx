import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Instagram, Linkedin } from 'lucide-react';
import { FOUNDER_INFO } from '../../data';
import { useTheme } from './ThemeSystem';

interface WelcomePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WelcomePopup: React.FC<WelcomePopupProps> = ({ isOpen, onClose }) => {
  const { resolvedTheme, colors } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isAnimatedIn, setIsAnimatedIn] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let timerId: NodeJS.Timeout;

    if (isOpen) {
      setIsRendered(true);
      // Double rAF ensures browser paints initial state before triggering transition
      animationFrameId = requestAnimationFrame(() => {
        animationFrameId = requestAnimationFrame(() => {
          setIsAnimatedIn(true);
        });
      });
    } else {
      setIsAnimatedIn(false);
      timerId = setTimeout(() => {
        setIsRendered(false);
      }, 280);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timerId);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimatedIn(false);
    setTimeout(() => {
      setIsRendered(false);
      onClose();
    }, 260);
  };

  if (!isRendered) return null;

  return (
    <div
      id="uniflix-welcome-popup-overlay"
      onClick={handleClose}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all ${
        isAnimatedIn
          ? 'opacity-100 backdrop-blur-md'
          : 'opacity-0 backdrop-blur-none pointer-events-none'
      }`}
      style={{
        backgroundColor: isDark ? 'rgba(8, 10, 15, 0.52)' : 'rgba(15, 23, 42, 0.28)',
        transitionDuration: isAnimatedIn ? '380ms' : '260ms',
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      aria-modal="true"
      role="dialog"
      aria-labelledby="welcome-modal-title"
    >
      {/* Modal Card */}
      <div
        id="uniflix-welcome-popup-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: isDark ? 'rgba(18, 20, 29, 0.88)' : 'rgba(255, 255, 255, 0.94)',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
          boxShadow: isAnimatedIn
            ? (isDark
                ? '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 45px -10px rgba(168, 85, 247, 0.22)'
                : '0 25px 60px -15px rgba(0, 0, 0, 0.16), 0 0 45px -10px rgba(139, 92, 246, 0.14)')
            : 'none',
          transform: isAnimatedIn
            ? 'scale(1) translateY(0px)'
            : 'scale(0.94) translateY(16px)',
          filter: isAnimatedIn ? 'blur(0px)' : 'blur(4px)',
          opacity: isAnimatedIn ? 1 : 0,
          transitionDuration: isAnimatedIn ? '380ms' : '260ms',
          transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          transitionProperty: 'transform, opacity, filter, box-shadow',
        }}
        className="relative w-full max-w-md md:max-w-xl rounded-3xl border backdrop-blur-2xl p-6 sm:p-8 overflow-hidden will-change-[transform,opacity,filter]"
      >
        {/* Subtle Ambient Refraction Aura */}
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-25 pointer-events-none bg-gradient-to-br from-violet-600 to-fuchsia-600"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full blur-3xl opacity-18 pointer-events-none bg-gradient-to-tr from-amber-500 to-violet-600"
        />

        {/* Close Button */}
        <button
          id="welcome-popup-close-btn"
          type="button"
          onClick={handleClose}
          aria-label="Close welcome message"
          style={{
            color: colors.mutedText,
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)',
          }}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full border transition-all duration-150 hover:scale-110 active:scale-95 cursor-pointer z-10 hover:text-white hover:bg-violet-600/30"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Responsive Content Container */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-5 sm:gap-7 relative z-1">
          {/* Visual Focus: Prominent Photo with Natural Settling Animation */}
          <div 
            style={{
              opacity: isAnimatedIn ? 1 : 0,
              transform: isAnimatedIn ? 'scale(1) translateY(0px)' : 'scale(0.95) translateY(8px)',
              transitionDuration: isAnimatedIn ? '360ms' : '200ms',
              transitionDelay: isAnimatedIn ? '80ms' : '0ms',
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            className="relative shrink-0 flex items-center justify-center will-change-[transform,opacity]"
          >
            {/* Ambient ring glow */}
            <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-amber-400 opacity-55 blur-sm" />
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl bg-slate-900">
              <img
                src={FOUNDER_INFO.photoUrl}
                alt={FOUNDER_INFO.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Typography and Meta */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left flex-1 min-w-0">
            <span
              style={{
                color: isDark ? '#C084FC' : '#7C3AED',
                backgroundColor: isDark ? 'rgba(192, 132, 252, 0.1)' : 'rgba(124, 58, 237, 0.08)',
                borderColor: isDark ? 'rgba(192, 132, 252, 0.2)' : 'rgba(124, 58, 237, 0.15)',
              }}
              className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase border mb-2 inline-flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-ping" />
              Creator Spotlight
            </span>

            <h2
              id="welcome-modal-title"
              style={{ color: colors.primaryText }}
              className="text-xl sm:text-2xl font-extrabold tracking-tight font-sans"
            >
              WELCOME TO UNIFLIX
            </h2>

            <div className="mt-1.5 flex flex-col items-center sm:items-start">
              <span
                style={{ color: colors.mutedText }}
                className="text-xs font-medium uppercase tracking-wider"
              >
                Made by
              </span>
              <span
                style={{ color: colors.primaryText }}
                className="text-base sm:text-lg font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-500"
              >
                {FOUNDER_INFO.name}
              </span>
            </div>

            <p
              style={{ color: colors.mutedText }}
              className="text-xs mt-1 max-w-xs leading-relaxed line-clamp-2"
            >
              Student ecosystem designed for high-impact learning, resources, and focus.
            </p>
          </div>
        </div>

        {/* Clickable Social Links with subtle staggered entrance */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-center sm:justify-start gap-2.5 sm:gap-3">
          {/* WhatsApp */}
          <a
            id="welcome-popup-whatsapp-link"
            href={FOUNDER_INFO.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: isDark ? 'rgba(34, 197, 94, 0.12)' : 'rgba(34, 197, 94, 0.08)',
              borderColor: isDark ? 'rgba(34, 197, 94, 0.3)' : 'rgba(34, 197, 94, 0.25)',
              color: isDark ? '#4ADE80' : '#16A34A',
              opacity: isAnimatedIn ? 1 : 0,
              transform: isAnimatedIn ? 'translateY(0px)' : 'translateY(6px)',
              transitionDuration: isAnimatedIn ? '300ms' : '180ms',
              transitionDelay: isAnimatedIn ? '140ms' : '0ms',
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            className="flex-1 min-w-[110px] px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-xs hover:bg-emerald-500 hover:text-white will-change-[transform,opacity]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>

          {/* Instagram */}
          <a
            id="welcome-popup-instagram-link"
            href={FOUNDER_INFO.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: isDark ? 'rgba(236, 72, 153, 0.12)' : 'rgba(236, 72, 153, 0.08)',
              borderColor: isDark ? 'rgba(236, 72, 153, 0.3)' : 'rgba(236, 72, 153, 0.25)',
              color: isDark ? '#F472B6' : '#DB2777',
              opacity: isAnimatedIn ? 1 : 0,
              transform: isAnimatedIn ? 'translateY(0px)' : 'translateY(6px)',
              transitionDuration: isAnimatedIn ? '300ms' : '180ms',
              transitionDelay: isAnimatedIn ? '190ms' : '0ms',
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            className="flex-1 min-w-[110px] px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-xs hover:bg-pink-500 hover:text-white will-change-[transform,opacity]"
          >
            <Instagram className="w-4 h-4" />
            <span>Instagram</span>
          </a>

          {/* LinkedIn */}
          <a
            id="welcome-popup-linkedin-link"
            href={FOUNDER_INFO.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: isDark ? 'rgba(59, 130, 246, 0.12)' : 'rgba(59, 130, 246, 0.08)',
              borderColor: isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.25)',
              color: isDark ? '#60A5FA' : '#2563EB',
              opacity: isAnimatedIn ? 1 : 0,
              transform: isAnimatedIn ? 'translateY(0px)' : 'translateY(6px)',
              transitionDuration: isAnimatedIn ? '300ms' : '180ms',
              transitionDelay: isAnimatedIn ? '240ms' : '0ms',
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            className="flex-1 min-w-[110px] px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-xs hover:bg-blue-600 hover:text-white will-change-[transform,opacity]"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  );
};
