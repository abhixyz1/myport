/**
 * @file src/components/link-card.tsx
 * @description Interactive 3D spring-tilted social/contact card with real-time cursor spotlight.
 */
"use client";

import React, { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LinkCardProps {
  href: string;
  title: string;
  handle?: string;
  badge?: string;
  accentColor?: string;
  Icon: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  delay?: number;
  isVisible?: boolean;
  className?: string;
}

export default function LinkCard({
  href,
  title,
  handle,
  badge,
  accentColor = 'rgba(20, 225, 195, 0.22)',
  Icon,
  delay = 0,
  className,
}: LinkCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 22, mass: 0.5 };
  const rotateX = useSpring(useTransform(normY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(normX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);
    normX.set(x / rect.width - 0.5);
    normY.set(y / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    normX.set(0);
    normY.set(0);
  };

  const spotlight = useMotionTemplate`radial-gradient(260px circle at ${mouseX}px ${mouseY}px, ${accentColor}, transparent 80%)`;

  return (
    <motion.a
      ref={cardRef}
      href={href}
      target={href.startsWith('mailto:') ? '_self' : '_blank'}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, delay: delay / 1000 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.02, y: -3 }}
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group relative flex items-center justify-between gap-3 rounded-2xl p-4 glass-card transition-colors duration-300',
        'hover:border-primary/50 hover:shadow-[0_10px_40px_-15px_hsl(var(--primary)/0.35)]',
        'focus:outline-none focus:ring-2 focus:ring-ring overflow-hidden',
        className
      )}
    >
      {/* Cursor-tracking radial spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />

      <div className="relative z-10 flex items-center gap-3.5 min-w-0">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-foreground/80 group-hover:text-primary group-hover:scale-110 group-hover:bg-primary/15 transition-all duration-300">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 text-left">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
              {title}
            </span>
            {badge && (
              <span className="rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 font-mono text-[10px] text-primary">
                {badge}
              </span>
            )}
          </div>
          {handle && (
            <p className="truncate font-mono text-xs text-muted-foreground group-hover:text-foreground/80 transition-colors">
              {handle}
            </p>
          )}
        </div>
      </div>

      <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background/40 border border-border/60 text-muted-foreground group-hover:border-primary/40 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </motion.a>
  );
}
