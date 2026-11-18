/**
 * @file src/components/page-footer.tsx
 * @description Sleek glassmorphic developer footer with status badge and social shortcuts.
 */
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Terminal, Github, Linkedin, Instagram, Mail } from 'lucide-react';

export default function PageFooter() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full max-w-5xl mx-auto mt-20 pt-8 pb-10 px-4 border-t border-border/50 text-xs text-muted-foreground">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand & Copyright */}
        <div className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-primary border border-primary/30">
            <Terminal className="h-3.5 w-3.5" />
          </span>
          <span className="font-mono text-foreground/80">
            Muhammad Abhinaya Zurfa &copy; {year || '2026'}
          </span>
          <span className="hidden md:inline text-border">·</span>
          <span className="hidden md:inline font-mono text-[11px] text-primary">
            Polinema · Information Systems
          </span>
        </div>

        {/* Navigation & Social Icons */}
        <div className="flex items-center gap-5">
          <div className="hidden sm:flex items-center gap-4">
            <Link href="/about" className="hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/projects" className="hover:text-primary transition-colors">
              Projects
            </Link>
            <Link href="/skills" className="hover:text-primary transition-colors">
              Skills
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/abhixyz1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-primary transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/m-abhinaya-zurfa-683b9a248/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-primary transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://www.instagram.com/m_abhinayaa/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-primary transition-colors"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="mailto:abhinayazrf@gmail.com"
              aria-label="Email"
              className="hover:text-primary transition-colors"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
