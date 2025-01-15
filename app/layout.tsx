import type { Metadata } from 'next';
import './globals.css';

import NightSky from './components/night-sky';

export const metadata: Metadata = {
  title: 'Personal Homepage',
  description: 'My personal portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-body relative h-screen">
        <NightSky />
        {children}
      </body>
    </html>
  );
}
