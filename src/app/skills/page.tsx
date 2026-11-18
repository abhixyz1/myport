/**
 * @file src/app/skills/page.tsx
 * @description Dedicated page for Muhammad Abhinaya's technical skills and stack.
 */
import PageFooter from '@/components/page-footer';
import SkillsClientPage from '@/components/skills-client-page';
import { Code2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Technical Skills & Stack | Muhammad Abhinaya Zurfa',
  description:
    'A detailed breakdown of the languages, web frameworks, backend technologies, and developer tools used by Muhammad Abhinaya Zurfa — including JavaScript, TypeScript, Go, Next.js, and Linux.',
  alternates: {
    canonical: '/skills',
  },
};

export default function SkillsPage() {
  return (
    <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl flex-grow pt-28 space-y-10">
        <header className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full glass-pill px-3.5 py-1 font-mono text-xs text-primary">
            <Code2 className="h-3.5 w-3.5" />
            <span>LANGUAGES, FRAMEWORKS &amp; TOOLS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Skills &amp; <span className="text-gradient">Technologies</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            The core languages, frontend frameworks, backend runtimes, and Linux workflow tools I use to build and ship software.
          </p>
        </header>

        <main>
          <SkillsClientPage />
        </main>
      </div>

      <PageFooter />
    </div>
  );
}
