/**
 * @file src/components/desktop-nav.tsx
 * @description Floating glassmorphic navigation bar with Framer Motion sliding active pill,
 *              Command Palette trigger (Cmd+K), and Dark/Light theme switcher.
 */
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Home, User, Code2, FolderGit2, Search, Sun, Moon, Terminal } from 'lucide-react';
import { useThemeContext } from './theme-provider';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'About', icon: User },
  { href: '/projects', label: 'Projects', icon: FolderGit2 },
  { href: '/skills', label: 'Skills', icon: Code2 },
];

export default function DesktopNav() {
  const pathname = usePathname();
  const { theme, toggleTheme, setIsCommandOpen } = useThemeContext();

  return (
    <header className="hidden md:flex items-center gap-3 rounded-full glass-card px-3 py-1.5 shadow-2xl">
      {/* Brand Monogram */}
      <Link
        href="/"
        className="flex items-center gap-2 pl-2 pr-3 py-1 text-sm font-bold tracking-tight text-foreground hover:text-primary transition-colors border-r border-border/60"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-primary border border-primary/30">
          <Terminal className="h-3.5 w-3.5" />
        </span>
        <span className="font-mono text-xs tracking-normal">
          abhi<span className="text-primary">.dev</span>
        </span>
      </Link>

      {/* Navigation Links with Framer Motion sliding pill */}
      <nav className="flex items-center gap-1">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'relative flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors z-10',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="desktop-nav-pill"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  className="absolute inset-0 -z-10 rounded-full bg-primary/15 border border-primary/30 shadow-[0_0_20px_-5px_hsl(var(--primary)/0.4)]"
                />
              )}
              <link.icon className="h-3.5 w-3.5" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="h-5 w-px bg-border/60" />

      {/* Command Palette Trigger */}
      <button
        onClick={() => setIsCommandOpen(true)}
        className="flex items-center gap-2 rounded-full bg-muted/50 hover:bg-primary/15 border border-border/60 hover:border-primary/40 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-all"
        title="Open Command Menu (Ctrl+K / Cmd+K)"
      >
        <Search className="h-3.5 w-3.5 text-primary" />
        <span className="font-mono text-[11px]">⌘K</span>
      </button>

      {/* Theme Switcher */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle color theme"
        className="relative flex h-8 w-8 items-center justify-center rounded-full bg-muted/50 hover:bg-primary/15 border border-border/60 hover:border-primary/40 text-foreground transition-all"
        title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
      >
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4 text-amber-400" />
          ) : (
            <Moon className="h-4 w-4 text-indigo-500" />
          )}
        </motion.div>
      </button>
    </header>
  );
}
