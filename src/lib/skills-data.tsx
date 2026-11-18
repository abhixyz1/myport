/**
 * @file /src/lib/skills-data.tsx
 * @description Categorized technical skills and tools for Muhammad Abhinaya Zurfa.
 */

import React from 'react';
import { Code2, Server, Wrench } from 'lucide-react';
import { JavascriptIcon } from '@/components/icons/javascript';
import { TypescriptIcon } from '@/components/icons/typescript';
import { GolangIcon } from '@/components/icons/golang';
import { PythonIcon } from '@/components/icons/python';
import { ReactIcon } from '@/components/icons/react';
import { NextjsIcon } from '@/components/icons/nextdotjs';
import { TailwindIcon } from '@/components/icons/tailwind';
import { NodejsIcon } from '@/components/icons/nodejs';
import { HtmlIcon } from '@/components/icons/html5';
import { CssIcon } from '@/components/icons/css3';
import { SqliteIcon } from '@/components/icons/sqlite';
import { DjangoIcon } from '@/components/icons/django';
import { CIcon } from '@/components/icons/c';
import { GitIcon } from '@/components/icons/git';
import { GithubIcon } from '@/components/icons/github';
import { VscodeIcon } from '@/components/icons/vscode';
import { BashIcon } from '@/components/icons/bash';
import { ZshIcon } from '@/components/icons/zsh';
import { UbuntuIcon } from '@/components/icons/ubuntu';
import { VercelIcon } from '@/components/icons/vercel';
import { GeminiIcon } from '@/components/icons/gemini';
import { ChatgptIcon } from '@/components/icons/chatgpt';

export interface Skill {
  name: string;
  level?: string;
  icon: React.ReactNode;
  iconClassName?: string;
  isPriority?: boolean;
}

export interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  subtitle?: string;
  skills: Skill[];
}

export const skillsData: SkillCategory[] = [
  {
    title: 'Core Languages & Backend',
    icon: <Server size={28} />,
    subtitle:
      'Languages and server-side technologies I use to architect reliable APIs, backend logic, and data-driven systems.',
    skills: [
      { name: 'JavaScript', level: 'Primary', icon: <JavascriptIcon />, isPriority: true },
      { name: 'TypeScript', level: 'Primary', icon: <TypescriptIcon />, iconClassName: 'p-0.5', isPriority: true },
      { name: 'Go (Golang)', level: 'Exploring', icon: <GolangIcon />, isPriority: true },
      { name: 'Node.js', level: 'Backend', icon: <NodejsIcon />, isPriority: true },
      { name: 'Python', level: 'Scripting', icon: <PythonIcon /> },
      { name: 'SQL / SQLite', level: 'Database', icon: <SqliteIcon /> },
      { name: 'C', level: 'Fundamentals', icon: <CIcon /> },
    ],
  },
  {
    title: 'Modern Web & Frontend',
    icon: <Code2 size={28} />,
    subtitle:
      'Frameworks and UI technologies I use to craft responsive, smooth, and interactive web applications.',
    skills: [
      { name: 'Next.js', level: 'App Router', icon: <NextjsIcon />, isPriority: true },
      { name: 'React', level: 'UI Library', icon: <ReactIcon />, isPriority: true },
      { name: 'Tailwind CSS', level: 'Styling', icon: <TailwindIcon />, isPriority: true },
      { name: 'HTML5', level: 'Semantic Web', icon: <HtmlIcon /> },
      { name: 'CSS3', level: 'Animations', icon: <CssIcon /> },
      { name: 'Django', level: 'Web Framework', icon: <DjangoIcon /> },
    ],
  },
  {
    title: 'Developer Tools & Workflow',
    icon: <Wrench size={28} />,
    subtitle:
      'The daily environment, version control, Linux shell, and AI-assisted tools powering my engineering workflow.',
    skills: [
      { name: 'Git', level: 'VCS', icon: <GitIcon />, isPriority: true },
      { name: 'GitHub', level: 'Collaboration', icon: <GithubIcon />, isPriority: true },
      { name: 'VS Code', level: 'Editor', icon: <VscodeIcon /> },
      { name: 'Ubuntu Linux', level: 'OS', icon: <UbuntuIcon /> },
      { name: 'Zsh', level: 'Shell', icon: <ZshIcon /> },
      { name: 'Bash', level: 'Scripting', icon: <BashIcon /> },
      { name: 'Vercel', level: 'Deployment', icon: <VercelIcon /> },
      { name: 'Gemini', level: 'AI Pair', icon: <GeminiIcon /> },
      { name: 'ChatGPT', level: 'AI Workflow', icon: <ChatgptIcon /> },
    ],
  },
];
