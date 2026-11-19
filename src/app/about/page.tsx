/**
 * @file src/app/about/page.tsx
 * @description Dedicated "About Me" page for Muhammad Abhinaya Zurfa with 3D Spotlight Bento cards.
 */
import PageFooter from '@/components/page-footer';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import {
  BookOpen,
  Terminal,
  Users,
  GraduationCap,
  Code2,
  Rocket,
  MapPin,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'About Muhammad Abhinaya Zurfa | Journey & Engineering Focus',
  description:
    'Learn more about Muhammad Abhinaya Zurfa — Information Systems student at Politeknik Negeri Malang (Polinema) passionate about web development, backend engineering, JavaScript, and Go.',
  alternates: {
    canonical: '/about',
  },
};

const aboutSections = [
  {
    icon: <BookOpen className="h-6 w-6" />,
    tag: '01 / EDUCATION',
    title: 'My Studies at Polinema',
    content:
      "I am currently studying at Politeknik Negeri Malang (Malang State Polytechnic) in the Information Systems department. Sitting through long theoretical lectures every day can get pretty monotonous — which is why I channel my energy into hands-on coding, building real projects, and learning by doing.",
    highlights: ['Politeknik Negeri Malang', 'Information Systems', 'Hands-On Builder'],
  },
  {
    icon: <Terminal className="h-6 w-6" />,
    tag: '02 / ENGINEERING',
    title: 'Curiosity, Web & Backend',
    content:
      'I am deeply interested in modern website development and backend engineering. I enjoy tinkering with programs and web architectures using JavaScript & TypeScript, and I am actively learning and diving deeper into the Go (Golang) language for fast, scalable backend services.',
    highlights: ['Web Development', 'Backend Engineering', 'JavaScript / TS', 'Go (Golang)'],
  },
  {
    icon: <Users className="h-6 w-6" />,
    tag: '03 / TEAMWORK',
    title: 'Collaboration & Growth',
    content:
      "I believe that building and problem-solving with others is one of the best ways to grow. Through school and campus life, I've participated in group projects and student organizations — experiences that shaped my approach to teamwork, communication, and ownership.",
    highlights: ['Team Collaboration', 'Student Organizations', 'Open Source'],
  },
];

const quickFacts = [
  {
    label: 'Institution',
    value: 'Politeknik Negeri Malang',
    sub: 'Department of Information Systems',
    icon: <GraduationCap className="h-4 w-4 text-primary" />,
  },
  {
    label: 'Primary Focus',
    value: 'Web & Backend Systems',
    sub: 'Full-Stack JS/TS & REST APIs',
    icon: <Code2 className="h-4 w-4 text-primary" />,
  },
  {
    label: 'Currently Learning',
    value: 'Go (Golang)',
    sub: 'Concurrency & Microservices',
    icon: <Rocket className="h-4 w-4 text-primary" />,
  },
  {
    label: 'Base Location',
    value: 'Malang, East Java',
    sub: 'Indonesia (UTC+7)',
    icon: <MapPin className="h-4 w-4 text-primary" />,
  },
];

export default function AboutPage() {
  return (
    <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl flex-grow pt-28 space-y-12">
        {/* Header */}
        <header className="text-center space-y-3 max-w-2xl mx-auto animate-fade-in-up">
          <div className="inline-flex items-center gap-2 rounded-full glass-pill px-3.5 py-1 font-mono text-xs text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>BIOGRAPHY &amp; MINDSET</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
            About <span className="text-gradient">Muhammad Abhinaya</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            An Information Systems student at Polinema turning curiosity into clean web interfaces and resilient backend code.
          </p>
        </header>

        {/* Quick Facts Bento Strip */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {quickFacts.map((fact) => (
            <SpotlightCard key={fact.label} className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                  {fact.icon}
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {fact.label}
                  </p>
                  <p className="font-bold text-sm text-foreground truncate mt-0.5">
                    {fact.value}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{fact.sub}</p>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </section>

        {/* Main 3 Story Cards */}
        <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aboutSections.map((section) => (
            <SpotlightCard
              key={section.title}
              className="p-6 flex flex-col justify-between h-full"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/25 text-primary transition-transform duration-300 group-hover:scale-110">
                    {section.icon}
                  </div>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {section.tag}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {section.title}
                </h2>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-border/50 flex flex-wrap gap-1.5">
                {section.highlights.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-md bg-muted/70 dark:bg-white/[0.04] border border-border/60 px-2.5 py-0.5 font-mono text-[10px] text-foreground/80"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          ))}
        </main>

        {/* Bottom CTA Banner */}
        <SpotlightCard enableTilt={false} className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="space-y-1.5">
              <p className="font-mono text-xs text-primary">
                &ldquo;Liquor, Ladies, Leverage.&rdquo;
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                Want to see what I&apos;ve been building?
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
                Explore my open-source repositories, web applications, and Go backend experiments, or check out my full technical stack.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link href="/projects">
                <Button className="rounded-full px-5">
                  View Projects
                  <ArrowUpRight className="ml-1.5 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/skills">
                <Button variant="outline" className="rounded-full px-5 glass-pill">
                  Explore Tech Stack
                </Button>
              </Link>
            </div>
          </div>
        </SpotlightCard>
      </div>

      <PageFooter />
    </div>
  );
}
