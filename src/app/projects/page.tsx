/**
 * @file src/app/projects/page.tsx
 * @description Dedicated page showcasing Muhammad Abhinaya's projects and repositories.
 */
import PageFooter from '@/components/page-footer';
import Projects from '@/components/projects';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { FolderGit2, Github, ArrowUpRight, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects & Repositories | Muhammad Abhinaya Zurfa',
  description:
    "Explore Muhammad Abhinaya Zurfa's web development, Information Systems, and Go backend projects on GitHub (@abhixyz1).",
  alternates: {
    canonical: '/projects',
  },
};

export default function ProjectsPage() {
  return (
    <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl flex-grow pt-28 space-y-10">
        {/* Page Header */}
        <header className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full glass-pill px-3.5 py-1 font-mono text-xs text-primary">
            <FolderGit2 className="h-3.5 w-3.5" />
            <span>OPEN SOURCE &amp; LABS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Projects &amp; <span className="text-gradient">Contributions</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            A curated archive of web applications, Information Systems prototypes, and backend experiments in JavaScript, TypeScript, and Go.
          </p>
        </header>

        {/* Context Banner */}
        <SpotlightCard enableTilt={false} className="p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/25 text-primary">
                <Terminal className="h-5 w-5" />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Public repositories and active labs since <span className="text-foreground font-medium">August 2024</span>. More experiments and source code are hosted directly on my GitHub profile.
              </p>
            </div>
            <a
              href="https://github.com/abhixyz1"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              <Button variant="outline" size="sm" className="rounded-full glass-pill">
                <Github className="mr-2 h-4 w-4 text-primary" />
                @abhixyz1
                <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </a>
          </div>
        </SpotlightCard>

        {/* Interactive Projects Grid with Category Filter */}
        <Projects />
      </div>

      <PageFooter />
    </div>
  );
}
