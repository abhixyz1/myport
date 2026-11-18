/**
 * @file src/components/skills.tsx
 * @description Two-row glassmorphic infinite marquee of technical skills on the homepage.
 */
"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowRight, Cpu } from 'lucide-react';
import { skillsData } from '@/lib/skills-data';
import { InfiniteScroller } from './infinite-scroller';

export default function Skills() {
  const allSkills = skillsData.flatMap((category) => category.skills);
  const midPoint = Math.ceil(allSkills.length / 2);
  const firstRowSkills = allSkills.slice(0, midPoint);
  const secondRowSkills = allSkills.slice(midPoint);

  return (
    <section id="skills-section" className="space-y-6 w-full">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1.5 text-left">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-primary">
            <Cpu className="h-3.5 w-3.5" />
            <span>TECHNICAL ARSENAL</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Stack &amp; <span className="text-gradient">Technologies</span>
          </h2>
        </div>

        <Link href="/skills" id="see-all-skills-button">
          <Button
            variant="ghost"
            size="sm"
            className="group text-muted-foreground hover:text-primary font-mono text-xs"
          >
            Full Skill Matrix
            <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>

      {/* Dual-row Infinite Marquee */}
      <div className="space-y-3 py-1">
        <InfiniteScroller speed="normal">
          {firstRowSkills.map((skill) => (
            <div
              key={skill.name}
              className="group flex items-center gap-3.5 rounded-2xl glass-card px-4 py-3 min-w-[175px] transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_8px_30px_-12px_hsl(var(--primary)/0.35)]"
            >
              <div
                className={cn(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-foreground group-hover:text-primary group-hover:scale-110 transition-all',
                  skill.iconClassName
                )}
              >
                <div className="h-6 w-6 flex items-center justify-center">{skill.icon}</div>
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                  {skill.name}
                </p>
                {skill.level && (
                  <p className="font-mono text-[10px] text-muted-foreground">{skill.level}</p>
                )}
              </div>
            </div>
          ))}
        </InfiniteScroller>

        <InfiniteScroller speed="normal" direction="right">
          {secondRowSkills.map((skill) => (
            <div
              key={skill.name}
              className="group flex items-center gap-3.5 rounded-2xl glass-card px-4 py-3 min-w-[175px] transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_8px_30px_-12px_hsl(var(--primary)/0.35)]"
            >
              <div
                className={cn(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-foreground group-hover:text-primary group-hover:scale-110 transition-all',
                  skill.iconClassName
                )}
              >
                <div className="h-6 w-6 flex items-center justify-center">{skill.icon}</div>
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                  {skill.name}
                </p>
                {skill.level && (
                  <p className="font-mono text-[10px] text-muted-foreground">{skill.level}</p>
                )}
              </div>
            </div>
          ))}
        </InfiniteScroller>
      </div>
    </section>
  );
}
