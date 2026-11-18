/**
 * @file src/components/skills-client-page.tsx
 * @description Interactive Bento grid of categorized technical skills with 3D Spotlight cards
 *              and instant category/priority filtering.
 */
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { skillsData, SkillCategory } from '@/lib/skills-data';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

export default function SkillsClientPage() {
  const [highlightCoreOnly, setHighlightCoreOnly] = useState(false);

  const renderCategory = (category: SkillCategory, categoryIndex: number) => {
    const displayedSkills = highlightCoreOnly
      ? category.skills.filter((s) => s.isPriority)
      : category.skills;

    if (displayedSkills.length === 0) return null;

    return (
      <motion.section
        key={category.title}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 border border-primary/25 text-primary shadow-sm">
              {category.icon}
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {category.title}
              </h2>
              {category.subtitle && (
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  {category.subtitle}
                </p>
              )}
            </div>
          </div>

          <span className="font-mono text-xs text-muted-foreground self-start sm:self-center rounded-full glass-pill px-3 py-1">
            {displayedSkills.length} technologies
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedSkills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
            >
              <SpotlightCard
                className={cn(
                  'p-4 h-full flex items-center gap-3.5',
                  skill.isPriority && 'border-primary/30'
                )}
              >
                <div
                  className={cn(
                    'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-foreground group-hover:text-primary group-hover:scale-110 transition-all duration-300',
                    skill.iconClassName
                  )}
                >
                  <div className="h-7 w-7 flex items-center justify-center">{skill.icon}</div>
                </div>

                <div className="min-w-0 text-left">
                  <div className="flex items-center gap-1.5">
                    <p className="font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors">
                      {skill.name}
                    </p>
                    {skill.isPriority && (
                      <span title="Core Focus" className="inline-flex">
                        <Sparkles className="h-3 w-3 text-primary shrink-0" />
                      </span>
                    )}
                  </div>
                  {skill.level && (
                    <p className="font-mono text-[11px] text-muted-foreground truncate">
                      {skill.level}
                    </p>
                  )}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </motion.section>
    );
  };

  return (
    <div className="space-y-12">
      {/* Filter Toggle Bar */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-1 rounded-full glass-card p-1">
          <button
            onClick={() => setHighlightCoreOnly(false)}
            className={cn(
              'rounded-full px-4 py-1.5 text-xs font-medium transition-all',
              !highlightCoreOnly
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            All Technologies
          </button>
          <button
            onClick={() => setHighlightCoreOnly(true)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-all',
              highlightCoreOnly
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Sparkles className="h-3 w-3" />
            Core Focus Only
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-14">{skillsData.map(renderCategory)}</div>
    </div>
  );
}
