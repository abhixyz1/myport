/**
 * @file src/app/layout.tsx
 * @description Root layout for Muhammad Abhinaya Zurfa's portfolio.
 */
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import AnimatedBackground from '@/components/animated-background';
import MainNav from '@/components/main-nav';
import { Analytics } from '@vercel/analytics/react';
import { PostHogProvider } from './providers';
import { ThemeProvider } from '@/components/theme-provider';
import GuidedTour from '@/components/guided-tour';

export const metadata: Metadata = {
  metadataBase: new URL('https://abhixyz1.github.io/myport'),
  title: 'Muhammad Abhinaya Zurfa | Web & Backend Developer',
  description:
    'Personal developer portfolio of Muhammad Abhinaya Zurfa — Information Systems student at Politeknik Negeri Malang, building modern web applications and backend systems with JavaScript, TypeScript, and Go.',
  keywords: [
    'Muhammad Abhinaya',
    'Muhammad Abhinaya Zurfa',
    'abhixyz1',
    'Politeknik Negeri Malang',
    'Polinema',
    'Information Systems',
    'Web Developer',
    'Backend Developer',
    'Next.js',
    'TypeScript',
    'Golang',
  ],
  openGraph: {
    title: 'Muhammad Abhinaya Zurfa | Web & Backend Developer',
    description:
      'Information Systems @ Polinema · Web & Backend Engineering · JavaScript, TypeScript & Go',
    url: 'https://abhixyz1.github.io/myport',
    siteName: 'Muhammad Abhinaya Portfolio',
    images: [
      {
        url: 'https://abhixyz1.github.io/myport/profile.webp',
        width: 800,
        height: 800,
        alt: 'Muhammad Abhinaya Zurfa Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Abhinaya Zurfa | Web & Backend Developer',
    description:
      'Information Systems @ Polinema · Web & Backend Engineering · JavaScript, TypeScript & Go',
    images: ['https://abhixyz1.github.io/myport/profile.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://abhixyz1.github.io/myport',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Muhammad Abhinaya Zurfa',
  alternateName: ['M Abhinaya', 'Muhammad Abhinaya', 'abhixyz1'],
  url: 'https://abhixyz1.github.io/myport',
  jobTitle: 'Web & Backend Developer · Information Systems Student',
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Politeknik Negeri Malang (Polinema)',
  },
  sameAs: [
    'https://www.linkedin.com/in/m-abhinaya-zurfa-683b9a248/',
    'https://github.com/abhixyz1',
    'https://www.instagram.com/m_abhinayaa',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta
          name="google-site-verification"
          content="-ggF-eMSfmD9YH-4yLzcQDEjUmv9WBmZuwxjsFAHifA"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased">
        <PostHogProvider>
          <ThemeProvider>
            <AnimatedBackground />
            <MainNav />
            <main>{children}</main>
            <Toaster />
            <Analytics />
            <GuidedTour />
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
