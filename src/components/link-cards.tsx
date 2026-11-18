/**
 * @file src/components/link-cards.tsx
 * @description Renders a responsive Bento Grid of social & direct contact cards.
 */
"use client";

import LinkCard from './link-card';
import { WhatsappIcon } from '@/components/icons/whatsapp';
import { InstagramIcon } from '@/components/icons/instagram';
import { GithubIcon } from '@/components/icons/github';
import { MailIcon } from '@/components/icons/mail';
import { LinkedinIcon } from './icons/linkedin';

const links = [
  {
    href: 'https://github.com/abhixyz1/',
    title: 'GitHub',
    handle: '@abhixyz1',
    badge: 'Code & Repos',
    accentColor: 'rgba(20, 225, 195, 0.22)',
    Icon: GithubIcon,
    span: 'sm:col-span-2',
  },
  {
    href: 'https://www.linkedin.com/in/m-abhinaya-zurfa-683b9a248/',
    title: 'LinkedIn',
    handle: 'Muhammad Abhinaya Zurfa',
    badge: 'Network',
    accentColor: 'rgba(56, 189, 248, 0.22)',
    Icon: LinkedinIcon,
    span: 'sm:col-span-1',
  },
  {
    href: 'https://www.instagram.com/m_abhinayaa/',
    title: 'Instagram',
    handle: '@m_abhinayaa',
    badge: 'Social',
    accentColor: 'rgba(236, 72, 153, 0.20)',
    Icon: InstagramIcon,
    span: 'sm:col-span-1',
  },
  {
    href: 'https://wa.me/6285338364410',
    title: 'WhatsApp',
    handle: '+62 853-3836-4410',
    badge: 'Fast Reply',
    accentColor: 'rgba(34, 197, 94, 0.22)',
    Icon: WhatsappIcon,
    span: 'sm:col-span-1',
  },
  {
    href: 'mailto:abhinayazrf@gmail.com',
    title: 'Direct Email',
    handle: 'abhinayazrf@gmail.com',
    badge: 'Inquiries',
    accentColor: 'rgba(139, 92, 246, 0.22)',
    Icon: MailIcon,
    span: 'sm:col-span-1',
  },
];

export default function LinkCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
      {links.map((link, index) => (
        <LinkCard
          key={link.href}
          {...link}
          className={link.span}
          delay={100 + index * 70}
        />
      ))}
    </div>
  );
}
