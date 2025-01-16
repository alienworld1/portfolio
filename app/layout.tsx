import type { Metadata } from 'next';
import './globals.css';

import NightSky from './components/night-sky';
import Portfolio from './components/portfolio';

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
        <div className="absolute inset-0 flex flex-col items-center justify-center h-screen">
          <Portfolio>{children}</Portfolio>
        </div>
      </body>
    </html>
  );
}
