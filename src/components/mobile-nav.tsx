/**
 * @file src/components/mobile-nav.tsx
 * @description Sleek glassmorphic mobile navigation bar with Framer Motion drawer,
 *              Command Palette trigger, and Dark/Light theme switcher.
 */
'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  User,
  Code2,
  FolderGit2,
  Menu,
  X,
  Search,
  Sun,
  Moon,
  Terminal,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useThemeContext } from './theme-provider';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'About', icon: User },
  { href: '/projects', label: 'Projects', icon: FolderGit2 },
  { href: '/skills', label: 'Skills', icon: Code2 },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme, setIsCommandOpen } = useThemeContext();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="md:hidden w-full">
      <div className="flex items-center justify-between rounded-full glass-card px-3.5 py-2 shadow-xl">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 font-mono text-xs font-bold">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-primary border border-primary/30">
            <Terminal className="h-3.5 w-3.5" />
          </span>
          <span>
            abhi<span className="text-primary">.dev</span>
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsCommandOpen(true)}
            aria-label="Open Command Palette"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/50 border border-border/60 text-primary"
          >
            <Search className="h-4 w-4" />
          </button>

          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/50 border border-border/60 text-foreground"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-indigo-500" />
            )}
          </button>

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle Menu"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 border border-primary/30 text-primary"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Animated Dropdown Pill Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="mt-2 grid grid-cols-2 gap-2 rounded-2xl glass-card p-2.5 shadow-2xl"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all',
                    isActive
                      ? 'bg-primary/15 text-primary border border-primary/30'
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
