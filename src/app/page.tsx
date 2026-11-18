/**
 * @file src/app/page.tsx
 * @description Modern Bento Grid homepage for Muhammad Abhinaya Zurfa's portfolio.
 */
import ProfileSection from '@/components/profile-section';
import LinkCards from '@/components/link-cards';
import PageFooter from '@/components/page-footer';
import Skills from '@/components/skills';
import Projects from '@/components/projects';
import InteractiveTerminal from '@/components/interactive-terminal';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import Link from 'next/link';
import {
  GraduationCap,
  Code2,
  ArrowRight,
  Compass,
  Share2,
  TerminalSquare,
  Flame,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl flex-grow space-y-16 md:space-y-20">
        {/* Hero Section */}
        <ProfileSection />

        {/* Interactive Bento Grid Section */}
        <section aria-label="Bento Overview" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-primary">
              <TerminalSquare className="h-3.5 w-3.5" />
              <span>DEVELOPER WORKSPACE</span>
            </div>
            <Link
              href="/about"
              className="group inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <span>More about my journey</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left Bento: Interactive Code & Terminal */}
            <div className="lg:col-span-7 min-h-[340px]">
              <InteractiveTerminal />
            </div>

            {/* Right Bento Stack */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* Campus & Studies Card */}
              <SpotlightCard className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/25 px-2.5 py-0.5 font-mono text-[11px] text-primary">
                      <GraduationCap className="h-3.5 w-3.5" />
                      Education &amp; Major
                    </span>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      Malang, ID
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      Politeknik Negeri Malang
                    </h3>
                    <p className="text-xs text-primary font-mono mt-0.5">
                      Department of Information Systems
                    </p>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Hands-on learner who prefers building real web systems, experimenting with code, and collaborating on practical engineering challenges over passive lectures.
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-border/50 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="rounded bg-muted/70 px-2 py-0.5 font-mono text-[10px] text-foreground/80">
                      Information Systems
                    </span>
                    <span className="rounded bg-muted/70 px-2 py-0.5 font-mono text-[10px] text-foreground/80">
                      Software Eng
                    </span>
                  </div>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    Read Bio <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </SpotlightCard>

              {/* Current Engineering Radar Card */}
              <SpotlightCard className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 border border-accent/30 px-2.5 py-0.5 font-mono text-[11px] text-accent-foreground">
                      <Compass className="h-3.5 w-3.5" />
                      Current Focus
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-emerald-400">
                      <Flame className="h-3 w-3" /> Active
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-foreground">
                    Web Architecture &amp; Golang Backend
                  </h3>

                  <div className="space-y-2.5 pt-1">
                    <div className="space-y-1">
                      <div className="flex justify-between font-mono text-[11px]">
                        <span className="text-foreground/90 flex items-center gap-1.5">
                          <Code2 className="h-3 w-3 text-primary" /> JavaScript / TypeScript &amp; Next.js
                        </span>
                        <span className="text-primary">Daily Driver</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-full w-[88%] rounded-full bg-gradient-to-r from-primary to-teal-400" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between font-mono text-[11px]">
                        <span className="text-foreground/90 flex items-center gap-1.5">
                          <Code2 className="h-3 w-3 text-accent-foreground" /> Go (Golang) &amp; REST APIs
                        </span>
                        <span className="text-accent-foreground">Deep Diving</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-indigo-500 to-purple-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </div>
        </section>

        {/* Social & Direct Connect Bento Section */}
        <section className="space-y-5">
          <div className="space-y-1.5 text-left">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-primary">
              <Share2 className="h-3.5 w-3.5" />
              <span>CONNECT &amp; COLLABORATE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Find Me <span className="text-gradient">Online</span>
            </h2>
          </div>
          <LinkCards />
        </section>

        {/* Featured Projects Section */}
        <Projects featuredOnly />

        {/* Infinite Marquee Skills Section */}
        <Skills />
      </div>

      <PageFooter />
    </div>
  );
}
