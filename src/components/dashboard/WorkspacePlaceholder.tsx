import React from 'react';
import { useTheme } from './ThemeSystem';

interface WorkspacePlaceholderProps {
  pageTitle?: string;
}

export const WorkspacePlaceholder: React.FC<WorkspacePlaceholderProps> = ({ pageTitle }) => {
  const { colors } = useTheme();

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] px-6 py-12 select-none">
      <div className="flex flex-col items-center text-center max-w-lg mx-auto">
        {/* Brand Display Typography */}
        <h1 
          style={{ color: colors.primaryText }}
          className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-sans"
        >
          UNIFLOW
        </h1>
        
        {/* Workspace Ready Subtitle */}
        <p 
          style={{ color: colors.mutedText }}
          className="mt-3 sm:mt-4 text-base sm:text-lg font-normal tracking-wide"
        >
          Your workspace is ready.
        </p>

        {/* Subtle context indicator for the active page if not default */}
        {pageTitle && pageTitle.toLowerCase() !== 'home' && (
          <div 
            style={{
              borderColor: colors.borderSubtle,
              color: colors.mutedText,
              backgroundColor: colors.elevated,
            }}
            className="mt-6 px-3.5 py-1 rounded-full border text-xs font-medium"
          >
            {pageTitle}
          </div>
        )}
      </div>
    </div>
  );
};
