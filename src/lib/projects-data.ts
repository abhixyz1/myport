/**
 * @file /src/lib/projects-data.ts
 * @description Portfolio projects data for Muhammad Abhinaya Zurfa (@abhixyz1).
 */

export interface Project {
  title: string;
  description: string;
  githubUrl: string;
  liveUrl?: string;
  license: string;
  category: 'Web & Frontend' | 'Backend & Go' | 'Information Systems';
  tags: string[];
  status?: string;
  isFeatured?: boolean;
  isContribution?: boolean;
}

export const projects: Project[] = [
  {
    title: 'AbhiPort — Interactive Bento Portfolio',
    description:
    'A high-craft personal developer portfolio engineered with Next.js 15, TypeScript, and Framer Motion. Features cursor-tracking spotlight cards, 3D spring physics, an interactive Go/TS terminal widget, and a Cmd+K command palette.',
    githubUrl: 'https://github.com/abhixyz1/myport',
    license: 'MIT License',
    category: 'Web & Frontend',
    tags: ['Next.js 15', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
    status: 'Production',
    isFeatured: true,
  },
  {
    title: 'GoFlow — RESTful Backend & Task Engine',
    description:
    'A lightweight, fast backend service built while exploring Go (Golang) concurrency and clean architecture. Implements structured routing, middleware logging, JWT authentication, and SQLite persistence.',
    githubUrl: 'https://github.com/abhixyz1',
    license: 'MIT License',
    category: 'Backend & Go',
    tags: ['Go (Golang)', 'REST API', 'SQLite', 'Clean Architecture'],
    status: 'Active Lab',
    isFeatured: true,
  },
  {
    title: 'SiakadHub — Academic & Campus Workflow Tracker',
    description:
    'An Information Systems web application concept tailored for university students at Polinema to organize coursework deadlines, lab schedules, GPA projections, and team assignments in one unified dashboard.',
    githubUrl: 'https://github.com/abhixyz1',
    license: 'Open Source',
    category: 'Information Systems',
    tags: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
    status: 'Prototype',
    isFeatured: true,
  },
  {
    title: 'JS-Backend & Automation Toolkit',
    description:
    'A curated collection of JavaScript & TypeScript utilities, API scrapers, CLI scripts, and algorithmic problem-solving exercises focused on backend engineering fundamentals.',
    githubUrl: 'https://github.com/abhixyz1',
    license: 'MIT License',
    category: 'Backend & Go',
    tags: ['JavaScript', 'Node.js', 'CLI', 'Algorithms'],
    status: 'Collection',
    isFeatured: false,
  },
];
