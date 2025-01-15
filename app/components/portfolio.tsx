import { ReactNode } from 'react';

function Portfolio({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col bg-slate-900/40 backdrop-blur-sm px-8 py-9 rounded-lg">
      {children}
    </div>
  );
}

export default Portfolio;
