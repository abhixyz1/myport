/**
 * @file src/components/ui/spotlight-card.tsx
 * @description A glassmorphic card featuring cursor-tracking radial spotlight glow
 *              and smooth Framer Motion 3D spring tilt on hover.
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
import { cn } from '@/lib/utils';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  enableTilt?: boolean;
  tiltIntensity?: number;
  onClick?: () => void;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = 'rgba(20, 225, 195, 0.16)',
  enableTilt = true,
  tiltIntensity = 7,
  onClick,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Mouse coordinates relative to card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Normalized coordinates (-0.5 to 0.5) for 3D spring tilt
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  const springConfig = { damping: 22, stiffness: 260, mass: 0.6 };
  const rotateX = useSpring(
    useTransform(normY, [-0.5, 0.5], [tiltIntensity, -tiltIntensity]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(normX, [-0.5, 0.5], [-tiltIntensity, tiltIntensity]),
    springConfig
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);

    if (enableTilt) {
      normX.set(x / rect.width - 0.5);
      normY.set(y / rect.height - 0.5);
    }
  };

  const handleMouseLeave = () => {
    normX.set(0);
    normY.set(0);
  };

  const spotlightBackground = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 80%)`;
  const borderSpotlight = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, rgba(20, 225, 195, 0.45), rgba(139, 92, 246, 0.25) 50%, transparent 80%)`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX: enableTilt ? rotateX : 0,
        rotateY: enableTilt ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25 }}
      className={cn(
        'group relative overflow-hidden rounded-2xl glass-card transition-colors duration-300',
        'hover:border-primary/40 dark:hover:border-primary/40',
        className
      )}
    >
      {/* Dynamic cursor-tracking border highlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{ background: borderSpotlight }}
      />

      {/* Dynamic cursor-tracking surface spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{ background: spotlightBackground }}
      />

      {/* Card content */}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
