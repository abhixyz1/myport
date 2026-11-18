/**
 * @file src/components/theme-provider.tsx
 * @description Provides global Dark/Light theme switching and Command Palette state.
 */
"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';

type ThemeMode = 'dark' | 'light';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  motionEnabled: boolean;
  isCommandOpen: boolean;
  setIsCommandOpen: (open: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'abhiport-theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>('dark');
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
      const initial: ThemeMode = saved === 'light' || saved === 'dark' ? saved : 'dark';
      setThemeState(initial);
      document.documentElement.classList.toggle('dark', initial === 'dark');
    } catch {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const setTheme = useCallback((nextTheme: ThemeMode) => {
    setThemeState(nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    try {
      localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // ignore storage errors
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  // Global keyboard shortcut Cmd+K / Ctrl+K for the Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      setTheme,
      motionEnabled: true,
      isCommandOpen,
      setIsCommandOpen,
    }),
    [theme, toggleTheme, setTheme, isCommandOpen]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
