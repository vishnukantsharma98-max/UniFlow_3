import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'dark' | 'light' | 'system';
export type ResolvedTheme = 'dark' | 'light';

export interface ThemeColors {
  background: string;       // Main Application Canvas
  surface: string;          // Cards and popovers
  elevated: string;         // Dropdowns, modals
  pushUnderlayer: string;   // Background layer behind sidebar
  sidebarGlass: string;     // iOS Liquid Glass surface
  primaryText: string;      // High contrast text
  mutedText: string;        // Secondary subtle text
  border: string;           // Standard border
  borderSubtle: string;     // Ultra subtle hairline border
  accent: string;           // UniFlow signature violet
  highlight: string;        // Amber / champagne warm accent
}

export const DARK_THEME_COLORS: ThemeColors = {
  background: '#08090D', // Deep Obsidian
  surface: '#11121A',    // Dark Graphite
  elevated: '#171923',
  pushUnderlayer: '#1A1E27', // Deep graphite / blue-gray foundation
  sidebarGlass: 'rgba(20, 22, 30, 0.65)', // iOS Liquid Glass (DARK)
  primaryText: '#F3F4F6',
  mutedText: '#9CA3AF',
  border: 'rgba(255, 255, 255, 0.08)',
  borderSubtle: 'rgba(255, 255, 255, 0.08)',
  accent: '#8b5cf6', // Subtle violet
  highlight: '#f3e8d0', // Tiny champagne
};

export const LIGHT_THEME_COLORS: ThemeColors = {
  background: '#F8F8F5', // Pearl / Soft warm-white
  surface: '#FFFFFF',
  elevated: '#F1F1F4',
  pushUnderlayer: '#E2E6EE', // Refined cool blue-gray underlayer
  sidebarGlass: 'rgba(255, 255, 255, 0.70)', // iOS Liquid Glass (LIGHT)
  primaryText: '#16171D', // Dark charcoal text
  mutedText: '#6B6D7B',
  border: 'rgba(0, 0, 0, 0.06)',
  borderSubtle: 'rgba(0, 0, 0, 0.06)',
  accent: '#7c3aed', // Subtle violet
  highlight: '#d97706', // Small amber accent
};

interface ThemeContextType {
  theme: ThemeMode;
  resolvedTheme: ResolvedTheme;
  colors: ThemeColors;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'uniflow_theme_preference';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to 'light' as requested
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'dark' || saved === 'light' || saved === 'system') {
        return saved;
      }
    } catch {
      // Ignore localStorage errors
    }
    return 'light';
  });

  const [systemIsDark, setSystemIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Track system OS color-scheme changes live
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemIsDark(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setSystemIsDark(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Determine the active resolved visual theme
  const resolvedTheme: ResolvedTheme = theme === 'system' 
    ? (systemIsDark ? 'dark' : 'light')
    : theme;

  const colors = resolvedTheme === 'dark' ? DARK_THEME_COLORS : LIGHT_THEME_COLORS;

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // Ignore
    }
  };

  const toggleTheme = () => {
    if (theme === 'system') {
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    } else if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  // Synchronize <html> root class, data-theme attribute, and color-scheme
  useEffect(() => {
    const root = document.documentElement;
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    }
  }, [resolvedTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        colors,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
