/**
 * @file src/components/command-palette.tsx
 * @description Interactive Spotlight Command Palette (Cmd+K / Ctrl+K) with Framer Motion.
 */
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useThemeContext } from './theme-provider';
import { useToast } from '@/hooks/use-toast';
import {
  Search,
  Home,
  User,
  Code2,
  FolderGit2,
  Sun,
  Moon,
  Copy,
  ExternalLink,
  Github,
  Linkedin,
  Instagram,
  Mail,
  MessageCircle,
  Sparkles,
  CornerDownLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CommandItem {
  id: string;
  label: string;
  subtitle: string;
  category: 'Navigation' | 'Quick Actions' | 'Social & Contact';
  icon: React.ReactNode;
  action: () => void;
  external?: boolean;
}

export default function CommandPalette() {
  const { isCommandOpen, setIsCommandOpen, theme, toggleTheme } = useThemeContext();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { toast } = useToast();

  const items: CommandItem[] = useMemo(
    () => [
      {
        id: 'nav-home',
        label: 'Go to Home',
        subtitle: 'Bento overview, terminal & featured works',
        category: 'Navigation',
        icon: <Home className="h-4 w-4" />,
        action: () => router.push('/'),
      },
      {
        id: 'nav-about',
        label: 'About Muhammad Abhinaya',
        subtitle: 'Education at Politeknik Negeri Malang, background & engineering focus',
        category: 'Navigation',
        icon: <User className="h-4 w-4" />,
        action: () => router.push('/about'),
      },
      {
        id: 'nav-projects',
        label: 'Explore Projects',
        subtitle: 'Web apps, Go backend services & open-source repos',
        category: 'Navigation',
        icon: <FolderGit2 className="h-4 w-4" />,
        action: () => router.push('/projects'),
      },
      {
        id: 'nav-skills',
        label: 'Technical Stack & Skills',
        subtitle: 'JavaScript, TypeScript, Go, Next.js, databases & tools',
        category: 'Navigation',
        icon: <Code2 className="h-4 w-4" />,
        action: () => router.push('/skills'),
      },
      {
        id: 'act-theme',
        label: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
        subtitle: 'Toggle portfolio color appearance',
        category: 'Quick Actions',
        icon: theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />,
        action: () => toggleTheme(),
      },
      {
        id: 'act-copy-email',
        label: 'Copy Email Address',
        subtitle: 'abhinayazrf@gmail.com',
        category: 'Quick Actions',
        icon: <Copy className="h-4 w-4" />,
        action: () => {
          navigator.clipboard.writeText('abhinayazrf@gmail.com');
          toast({
            title: 'Email Copied!',
            description: 'abhinayazrf@gmail.com has been copied to your clipboard.',
          });
        },
      },
      {
        id: 'soc-github',
        label: 'GitHub (@abhixyz1)',
        subtitle: 'View repositories and source code',
        category: 'Social & Contact',
        icon: <Github className="h-4 w-4" />,
        external: true,
        action: () => window.open('https://github.com/abhixyz1', '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'soc-linkedin',
        label: 'LinkedIn',
        subtitle: 'Connect professionally with Muhammad Abhinaya Zurfa',
        category: 'Social & Contact',
        icon: <Linkedin className="h-4 w-4" />,
        external: true,
        action: () =>
          window.open(
            'https://www.linkedin.com/in/m-abhinaya-zurfa-683b9a248/',
            '_blank',
            'noopener,noreferrer'
          ),
      },
      {
        id: 'soc-instagram',
        label: 'Instagram (@m_abhinayaa)',
        subtitle: 'Follow daily updates and moments',
        category: 'Social & Contact',
        icon: <Instagram className="h-4 w-4" />,
        external: true,
        action: () =>
          window.open('https://www.instagram.com/m_abhinayaa/', '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'soc-whatsapp',
        label: 'Chat on WhatsApp',
        subtitle: 'Direct message (+62 853-3836-4410)',
        category: 'Social & Contact',
        icon: <MessageCircle className="h-4 w-4" />,
        external: true,
        action: () => window.open('https://wa.me/6285338364410', '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'soc-mail',
        label: 'Send an Email',
        subtitle: 'mailto:abhinayazrf@gmail.com',
        category: 'Social & Contact',
        icon: <Mail className="h-4 w-4" />,
        external: true,
        action: () => window.open('mailto:abhinayazrf@gmail.com', '_self'),
      },
    ],
    [router, theme, toggleTheme, toast]
  );

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [items, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, isCommandOpen]);

  useEffect(() => {
    if (!isCommandOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsCommandOpen(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filteredItems.length > 0 ? (prev + 1) % filteredItems.length : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filteredItems.length > 0
            ? (prev - 1 + filteredItems.length) % filteredItems.length
            : 0
        );
      } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
        e.preventDefault();
        filteredItems[selectedIndex].action();
        setIsCommandOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isCommandOpen, filteredItems, selectedIndex, setIsCommandOpen]);

  return (
    <AnimatePresence>
      {isCommandOpen && (
        <div className="fixed inset-0 z-[120] flex items-start justify-center pt-[12vh] px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/70 backdrop-blur-md"
            onClick={() => setIsCommandOpen(false)}
          />

          {/* Command Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -12 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-border/80 bg-card/90 backdrop-blur-2xl shadow-2xl"
          >
            {/* Search Input Header */}
            <div className="flex items-center gap-3 border-b border-border/60 px-4 py-3.5">
              <Search className="h-5 w-5 text-primary shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search (e.g. projects, go, github, theme)..."
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 rounded-md border border-border/80 bg-muted/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div className="max-h-[360px] overflow-y-auto p-2 space-y-1">
              {filteredItems.length === 0 ? (
                <div className="py-10 text-center text-sm text-muted-foreground">
                  No commands found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      onClick={() => {
                        item.action();
                        setIsCommandOpen(false);
                      }}
                      className={cn(
                        'w-full flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-left transition-colors',
                        isSelected
                          ? 'bg-primary/15 text-foreground'
                          : 'text-foreground/80 hover:bg-muted/50'
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={cn(
                            'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors',
                            isSelected
                              ? 'border-primary/40 bg-primary/20 text-primary'
                              : 'border-border/60 bg-background/50 text-muted-foreground'
                          )}
                        >
                          {item.icon}
                        </div>
                        <div className="truncate">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{item.label}</span>
                            <span className="rounded-full bg-muted/80 px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
                              {item.category}
                            </span>
                          </div>
                          <p className="truncate text-xs text-muted-foreground">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                      <div className="shrink-0 text-muted-foreground">
                        {item.external ? (
                          <ExternalLink className="h-3.5 w-3.5" />
                        ) : (
                          <CornerDownLeft
                            className={cn(
                              'h-3.5 w-3.5 transition-opacity',
                              isSelected ? 'opacity-100 text-primary' : 'opacity-30'
                            )}
                          />
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-border/60 bg-muted/30 px-4 py-2 text-[11px] text-muted-foreground font-mono">
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-primary" />
                AbhiPort Command Center
              </span>
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
