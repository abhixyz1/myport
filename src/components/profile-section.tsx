/**
 * @file src/components/profile-section.tsx
 * @description Modern hero section with animated role cycling, magnetic CTAs,
 *              status indicator, and interactive avatar aura.
 */
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useThemeContext } from './theme-provider';
import Link from 'next/link';
import {
  MapPin,
  GraduationCap,
  ArrowUpRight,
  Copy,
  Check,
  Command,
  Sparkles,
} from 'lucide-react';

const ROLES = [
  'Web & Backend Developer',
  'Information Systems @ Polinema',
  'JavaScript & TypeScript Builder',
  'Exploring Go (Golang) & APIs',
];

export default function ProfileSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { toast } = useToast();
  const { setIsCommandOpen } = useThemeContext();

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('abhinayazrf@gmail.com');
    setCopiedEmail(true);
    toast({
      title: 'Email Copied!',
      description: 'abhinayazrf@gmail.com is ready in your clipboard.',
    });
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section className="relative pt-24 md:pt-28 pb-4">
      <div className="flex flex-col items-center text-center">
        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2.5 rounded-full glass-pill px-4 py-1.5 text-xs font-medium text-foreground/90 shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>Available for Collaboration &amp; Web/Backend Projects</span>
        </motion.div>

        {/* Avatar with Rotating Gradient Halo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 20, delay: 0.1 }}
          className="relative group mb-6"
        >
          <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-primary via-teal-400 to-accent opacity-55 blur-xl transition-all duration-500 group-hover:opacity-95 group-hover:blur-2xl group-hover:scale-105" />
          <div className="relative rounded-full p-1 bg-gradient-to-tr from-primary via-teal-400/50 to-accent">
            <Avatar className="h-28 w-28 md:h-32 md:w-32 border-4 border-background shadow-2xl transition-transform duration-500 group-hover:scale-[1.03]">
              <AvatarImage
                src="/profile.webp"
                alt="Muhammad Abhinaya Zurfa Profile Picture"
                className="object-cover"
              />
              <AvatarFallback className="bg-card text-primary font-bold text-2xl font-mono">
                MAZ
              </AvatarFallback>
            </Avatar>
          </div>
          {/* Floating Verified Code Badge */}
          <div
            className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg border-2 border-background"
            title="Verified Builder"
          >
            <Sparkles className="h-4 w-4" />
          </div>
        </motion.div>

        {/* Name & Dynamic Role */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="space-y-3 max-w-2xl"
        >
          <h1 className="font-headline text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Muhammad{' '}
            <span className="text-gradient">Abhinaya</span>{' '}
            Zurfa
          </h1>

          {/* Animated Role Switcher */}
          <div className="h-7 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={ROLES[roleIndex]}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.28 }}
                className="font-mono text-sm sm:text-base text-primary font-medium"
              >
                &gt; {ROLES[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Motto & Bio Summary */}
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed pt-1">
            Building fast, clean web interfaces and scalable backend systems. Passionate about{' '}
            <span className="text-foreground font-medium">JavaScript/TypeScript</span>,{' '}
            <span className="text-foreground font-medium">Next.js</span>, and diving deep into{' '}
            <span className="text-foreground font-medium">Go (Golang)</span>.
          </p>

          {/* Signature Tagline Pill */}
          <div className="pt-1 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 rounded-full glass-pill px-3 py-1 font-mono text-[11px] text-foreground/80">
              &ldquo;Liquor, Ladies, Leverage.&rdquo;
            </span>
            <span className="inline-flex items-center gap-1 rounded-full glass-pill px-3 py-1">
              <GraduationCap className="h-3.5 w-3.5 text-primary" />
              Politeknik Negeri Malang
            </span>
            <span className="inline-flex items-center gap-1 rounded-full glass-pill px-3 py-1">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              Malang, Indonesia
            </span>
          </div>
        </motion.div>

        {/* Hero Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.28 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-3"
        >
          <Link href="/projects">
            <Button className="rounded-full px-6 h-11 font-medium shadow-lg shadow-primary/20 group">
              Explore Projects
              <ArrowUpRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </Link>

          <Button
            variant="outline"
            onClick={handleCopyEmail}
            className="rounded-full px-5 h-11 glass-pill hover:border-primary/50"
          >
            {copiedEmail ? (
              <>
                <Check className="mr-2 h-4 w-4 text-emerald-400" />
                Email Copied
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4 text-primary" />
                abhinayazrf@gmail.com
              </>
            )}
          </Button>

          <button
            onClick={() => setIsCommandOpen(true)}
            className="hidden sm:inline-flex items-center gap-2 rounded-full glass-pill px-4 h-11 text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
          >
            <Command className="h-3.5 w-3.5 text-primary" />
            <span>Quick Menu</span>
            <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-foreground/80">
              ⌘K
            </kbd>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
