import React from 'react';

interface UniFlowLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showText?: boolean;
  className?: string;
  textColor?: string;
}

export const UniFlowLogo: React.FC<UniFlowLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  textColor,
}) => {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
    hero: 'w-24 h-24 sm:w-28 sm:h-28'
  }[size];

  const textSize = {
    sm: 'text-base sm:text-lg',
    md: 'text-lg sm:text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
    hero: 'text-4xl'
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* 3D Iridescent 'U' with Cosmic Orbit and Sparkle */}
      <div className={`relative shrink-0 flex items-center justify-center ${iconDimensions}`}>
        {/* Soft Ambient Refraction Glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-violet-600/50 via-fuchsia-500/40 to-amber-400/40 blur-md -z-10" />

        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_2px_8px_rgba(139,92,246,0.5)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Main U Gradient */}
            <linearGradient id="uf-u-gradient" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="30%" stopColor="#a855f7" />
              <stop offset="65%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>

            {/* Orbit Ring Gradient */}
            <linearGradient id="uf-orbit-gradient" x1="10" y1="35" x2="90" y2="65" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="45%" stopColor="#f472b6" />
              <stop offset="80%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#fde047" />
            </linearGradient>

            {/* Glossy Top Glass Highlight */}
            <linearGradient id="uf-glass-sheen" x1="30" y1="20" x2="70" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#ffffff" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Deep 3D Shadow Accent */}
            <linearGradient id="uf-depth-shade" x1="50" y1="30" x2="50" y2="85" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#000000" stopOpacity="0" />
              <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Back half of the Cosmic Orbit (behind the U) */}
          <path
            d="M 16,46 C 14,38 38,28 72,32 C 86,34 92,39 88,45"
            stroke="url(#uf-orbit-gradient)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeOpacity="0.7"
          />

          {/* 3D Glass Letter 'U' Solid Base Body */}
          <path
            d="M 28,24
               C 28,20.7 30.7,18 34,18
               C 37.3,18 40,20.7 40,24
               L 40,54
               C 40,59.5 44.5,64 50,64
               C 55.5,64 60,59.5 60,54
               L 60,24
               C 60,20.7 62.7,18 66,18
               C 69.3,18 72,20.7 72,24
               L 72,54
               C 72,66.1 62.1,76 50,76
               C 37.9,76 28,66.1 28,54
               Z"
            fill="url(#uf-u-gradient)"
          />

          {/* Inner Depth Gradient for 3D appearance */}
          <path
            d="M 28,24
               C 28,20.7 30.7,18 34,18
               C 37.3,18 40,20.7 40,24
               L 40,54
               C 40,59.5 44.5,64 50,64
               C 55.5,64 60,59.5 60,54
               L 60,24
               C 60,20.7 62.7,18 66,18
               C 69.3,18 72,20.7 72,24
               L 72,54
               C 72,66.1 62.1,76 50,76
               C 37.9,76 28,66.1 28,54
               Z"
            fill="url(#uf-depth-shade)"
          />

          {/* Glossy Reflection on Left Arm of U */}
          <path
            d="M 30,24
               C 30,22 31.5,20.5 33.5,20.5
               C 35.5,20.5 37,22 37,24
               L 37,52
               C 37,56 34,60 30,62
               Z"
            fill="url(#uf-glass-sheen)"
            opacity="0.85"
          />

          {/* Glossy Reflection on Right Arm of U */}
          <path
            d="M 63,24
               C 63,22 64.5,20.5 66.5,20.5
               C 68.5,20.5 70,22 70,24
               L 70,52
               C 70,56 67,60 63,62
               Z"
            fill="url(#uf-glass-sheen)"
            opacity="0.7"
          />

          {/* Front half of the Cosmic Orbit (crossing in front of the U) */}
          <path
            d="M 88,45 C 84,54 62,68 28,66 C 16,65 12,58 16,46"
            stroke="url(#uf-orbit-gradient)"
            strokeWidth="3.8"
            strokeLinecap="round"
          />

          {/* Bright White Specular Streak on Front Orbit */}
          <path
            d="M 80,49 C 68,60 44,64 26,60"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity="0.9"
          />

          {/* Star Sparkle on Upper-Right of the Orbit Ring */}
          <g transform="translate(76, 28)">
            {/* 4-Point Star Flare */}
            <path
              d="M 0,-7 Q 0,0 7,0 Q 0,0 0,7 Q 0,0 -7,0 Q 0,0 0,-7 Z"
              fill="#ffffff"
            />
            {/* Center Golden Core */}
            <circle cx="0" cy="0" r="1.5" fill="#fef08a" />
          </g>
        </svg>
      </div>

      {/* Wordmark */}
      {showText && (
        <div className="flex items-center tracking-tight">
          <span 
            style={{ color: textColor }}
            className={`font-extrabold font-display ${textSize} tracking-tight`}
          >
            Uni<span className="text-flow-gradient">Flow</span>
          </span>
        </div>
      )}
    </div>
  );
};
