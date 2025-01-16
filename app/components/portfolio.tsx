import Link from 'next/link';

import { ReactNode } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function Portfolio({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col bg-slate-900/40 backdrop-blur-sm px-8 pb-8 pt-4 rounded-lg mx-8 sm:mx-36 sm:my-8">
      <header className="flex mb-4 justify-between items-center gap-8">
        <Link
          className="flex items-center p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
          href="/"
        >
          <Avatar>
            <AvatarImage
              src="https://github.com/alienworld1.png"
              alt="Avatar"
            />
            <AvatarFallback>AW</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold text-slate-100 ml-4">Aditya</h1>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                href="/about"
                className="text-sky-300 hover:text-sky-200 transition-colors text-lg"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="text-sky-300 hover:text-sky-200 transition-colors text-lg"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-sky-300 hover:text-sky-200 transition-colors text-lg"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/resume"
                className="text-sky-300 hover:text-sky-200 transition-colors text-lg"
              >
                Resume
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="max-h-96 overflow-auto">{children}</main>
    </div>
  );
}

export default Portfolio;
