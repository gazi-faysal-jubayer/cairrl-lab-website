import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'CAIRRL Lab — Centre for Advanced Intelligent Robotics Research Laboratory',
    template: '%s | CAIRRL Lab',
  },
  description:
    'CAIRRL Lab at KUET — interdisciplinary robotics and intelligent-systems research bridging Mechanical Engineering and Mechatronics Engineering.',
  keywords: [
    'CAIRRL Lab',
    'KUET',
    'robotics',
    'research',
    'mechatronics',
    'intelligent systems',
    'Bangladesh',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'CAIRRL Lab',
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans text-ink">{children}</body>
    </html>
  );
}
