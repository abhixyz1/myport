/**
 * @file src/components/projects.tsx
 * @description Renders interactive 3D Spotlight project cards with category filtering,
 *              tech stack chips, and smooth Framer Motion layout animations.
 */
'use client';

import React, { useState, useMemo } from 'react';
import { projects } from '@/lib/projects-data';
import { motion, AnimatePresence } from 'framer-motion';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowUpRight, Github, FolderGit2, Layers } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ProjectsProps {
  featuredOnly?: boolean;
}

const CATEGORIES = ['All', 'Web & Frontend', 'Backend & Go', 'Information Systems'] as const;

export default function Projects({ featuredOnly = false }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const projectsToShow = useMemo(() => {
    const base = featuredOnly ? projects.filter((p) => p.isFeatured) : projects;
    if (featuredOnly || selectedCategory === 'All') return base;
    return base.filter((p) => p.category === selectedCategory);
  }, [featuredOnly, selectedCategory]);

  return (
    <section className="space-y-7 w-full">
      {/* Section Header on Homepage */}
      {featuredOnly ? (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5 text-left">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-primary">
              <FolderGit2 className="h-3.5 w-3.5" />
              <span>SELECTED WORKS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Featured <span className="text-gradient">Projects</span>
            </h2>
          </div>
          <Link href="/projects">
            <Button
              variant="ghost"
              size="sm"
              className="group text-muted-foreground hover:text-primary font-mono text-xs"
            >
              View All Archives ({projects.length})
              <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      ) : (
        /* Interactive Category Filter Pills on /projects page */
        <div className="flex flex-wrap items-center justify-center gap-2 pb-2">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  'relative rounded-full px-4 py-2 text-xs font-medium transition-colors z-10',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground glass-pill'
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="project-category-pill"
                    transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                    className="absolute inset-0 -z-10 rounded-full bg-primary/15 border border-primary/40 shadow-sm"
                  />
                )}
                {category}
              </button>
            );
          })}
        </div>
      )}

      {/* Project Grid */}
      <motion.div
        layout
        className={cn(
          'grid grid-cols-1 gap-5',
          featuredOnly ? 'md:grid-cols-3' : 'md:grid-cols-2'
        )}
      >
        <AnimatePresence mode="popLayout">
          {projectsToShow.map((project, index) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, delay: index * 0.07 }}
              className="h-full"
            >
              <SpotlightCard className="h-full p-6 flex flex-col justify-between">
                <div className="space-y-4 text-left">
                  {/* Top Meta Row */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/25 px-2.5 py-0.5 font-mono text-[11px] text-primary">
                      <Layers className="h-3 w-3" />
                      {project.category}
                    </span>
                    {project.status && (
                      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        {project.status}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-muted/70 dark:bg-white/[0.04] border border-border/60 px-2 py-0.5 font-mono text-[11px] text-foreground/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action Row */}
                <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between gap-2">
                  <Badge variant="secondary" className="font-mono text-[10px] bg-muted/60">
                    {project.license}
                  </Badge>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                  >
                    <Github className="h-3.5 w-3.5" />
                    <span>Source Code</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
