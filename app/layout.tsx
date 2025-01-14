import type { Metadata } from 'next';
import './globals.css';

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
      <body className="min-h-screen bg-gradient-to-b from-[#0a0a2a] via-[#1a1a4a] to-[#2a2a6a] relative font-body">
        {children}
      </body>
    </html>
  );
}
