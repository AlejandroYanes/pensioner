import { type Metadata } from 'next';
import { Geist } from 'next/font/google';

import { TRPCReactProvider } from '@/trpc/react';
import { Toaster } from '@/components/sooner';
import { ScreenSize } from '@/components/screen-size';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Retirement Planner',
  description: 'See how much you can have in your retirement',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <Toaster closeButton richColors position="bottom-right" visibleToasts={3} />
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <ScreenSize />
      </body>
    </html>
  );
}
