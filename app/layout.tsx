import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppShell } from '@/components/layout/app-shell';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Helios Investments | AI Wealth & Portfolio Intelligence',
  description:
    'AI-driven portfolio and multi-asset wealth intelligence platform with real-time analytics, rebalancing insights, and Excel reporting.',
  keywords: [
    'Helios Investments',
    'portfolio management',
    'AI investing',
    'wealth intelligence',
    'stock analytics',
  ],
  openGraph: {
    title: 'Helios Investments | AI Wealth & Portfolio Intelligence',
    description:
      'A dark luxury multi-asset portfolio intelligence platform powered by AI-driven decisions.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-helios-bg text-white antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
