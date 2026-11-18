/**
 * @file /src/lib/tour-data.tsx
 * @description Step-by-step content for the interactive portfolio assistant.
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';

export interface TourStep {
  id: string;
  title: string;
  content: React.ReactNode;
  autoAdvanceAfter?: number;
  action?: {
    type: 'scroll_to';
    label: string;
    elementId: string;
    pointTo: string;
    path?: string;
  };
  awaits?: 'path_change';
}

export const tourSteps: TourStep[] = [
  {
    id: 'welcome',
    title: "Welcome to Abhi's Space! 👋",
    content:
      "Hi! I'm your quick guide. Press Cmd+K (or Ctrl+K) anytime to launch the Command Palette, or explore the interactive Bento cards right here.",
    autoAdvanceAfter: 3500,
  },
  {
    id: 'interactive-ui',
    title: 'Spotlight & 3D Physics',
    content:
      'Hover over any card to experience real-time cursor spotlight tracking and spring-damped 3D tilt, plus a live interactive Go/TypeScript terminal!',
    autoAdvanceAfter: 4500,
  },
  {
    id: 'skills-prompt',
    title: 'Explore the Tech Stack',
    content:
      'Check out the full breakdown of languages, web frameworks, and backend tools I use at Polinema and in my projects.',
    action: {
      type: 'scroll_to',
      label: 'Jump to Skills →',
      elementId: 'skills-section',
      pointTo: 'see-all-skills-button',
      path: '/skills',
    },
    awaits: 'path_change',
  },
  {
    id: 'outro-final',
    title: "Let's Connect & Build!",
    content: (
      <>
        <p className="mb-3 text-xs leading-relaxed">
          Have an interesting web or backend project in mind? Check out my GitHub or reach out directly!
        </p>
        <a href="https://github.com/abhixyz1" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="sm" className="w-full">
            <Github className="mr-2 h-4 w-4" />
            Visit @abhixyz1 on GitHub
          </Button>
        </a>
        <p className="text-[11px] text-muted-foreground text-center mt-2.5 font-mono">
          Muhammad Abhinaya Zurfa
        </p>
      </>
    ),
  },
];
