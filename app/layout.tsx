import type { Metadata } from 'next';
import './globals.css';

import Portfolio from './components/portfolio';
import NightSkyWrapper from './components/night-sky-wrapper';

export const metadata: Metadata = {
  title: 'Aditya',
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
        <NightSkyWrapper />
        <div className="absolute inset-0 flex flex-col items-center justify-center h-screen">
          <Portfolio>{children}</Portfolio>
        </div>
      </body>
    </html>
  );
}
