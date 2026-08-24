import { useState, useEffect } from 'react';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

export interface ResponsiveState {
  breakpoint: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

/**
 * UniFlow Standard Breakpoints Hook
 * - Mobile:  < 768px
 * - Tablet:  768px – 1199px
 * - Desktop: 1200px+
 */
export function useResponsiveBreakpoint(): ResponsiveState {
  const getBreakpoint = (): Breakpoint => {
    if (typeof window === 'undefined') return 'desktop';
    const width = window.innerWidth;
    if (width >= 1200) return 'desktop';
    if (width >= 768) return 'tablet';
    return 'mobile';
  };

  const [breakpoint, setBreakpoint] = useState<Breakpoint>(getBreakpoint);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const desktopQuery = window.matchMedia('(min-width: 1200px)');
    const tabletQuery = window.matchMedia('(min-width: 768px) and (max-width: 1199.98px)');
    const mobileQuery = window.matchMedia('(max-width: 767.98px)');

    const updateBreakpoint = () => {
      if (desktopQuery.matches) {
        setBreakpoint('desktop');
      } else if (tabletQuery.matches) {
        setBreakpoint('tablet');
      } else if (mobileQuery.matches) {
        setBreakpoint('mobile');
      } else {
        // Fallback calculation
        const width = window.innerWidth;
        if (width >= 1200) setBreakpoint('desktop');
        else if (width >= 768) setBreakpoint('tablet');
        else setBreakpoint('mobile');
      }
    };

    // Initial sync
    updateBreakpoint();

    // Event listeners
    if (desktopQuery.addEventListener) {
      desktopQuery.addEventListener('change', updateBreakpoint);
      tabletQuery.addEventListener('change', updateBreakpoint);
      mobileQuery.addEventListener('change', updateBreakpoint);
      window.addEventListener('resize', updateBreakpoint);
      return () => {
        desktopQuery.removeEventListener('change', updateBreakpoint);
        tabletQuery.removeEventListener('change', updateBreakpoint);
        mobileQuery.removeEventListener('change', updateBreakpoint);
        window.removeEventListener('resize', updateBreakpoint);
      };
    } else {
      desktopQuery.addListener(updateBreakpoint);
      tabletQuery.addListener(updateBreakpoint);
      mobileQuery.addListener(updateBreakpoint);
      window.addEventListener('resize', updateBreakpoint);
      return () => {
        desktopQuery.removeListener(updateBreakpoint);
        tabletQuery.removeListener(updateBreakpoint);
        mobileQuery.removeListener(updateBreakpoint);
        window.removeEventListener('resize', updateBreakpoint);
      };
    }
  }, []);

  return {
    breakpoint,
    isMobile: breakpoint === 'mobile',
    isTablet: breakpoint === 'tablet',
    isDesktop: breakpoint === 'desktop',
  };
}
