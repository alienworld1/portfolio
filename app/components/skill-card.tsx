import { type ReactNode } from 'react';

function SkillCard({
  icon,
  title,
  hoverColor,
  switchToDarkTextOnHover,
}: {
  icon: ReactNode;
  title: string;
  hoverColor: string;
  switchToDarkTextOnHover?: boolean;
}) {
  return (
    <div
      className={`h-24 w-24 flex flex-col items-center text-slate-100 justify-center gap-2 px-4 transition-colors duration-200 bg-slate-800/50 border-slate-100 border-4 rounded-lg ease-in-out hover:cursor-pointer skill-card ${switchToDarkTextOnHover ? 'hover:text-neutral-800' : ''}`}
      style={{
        ['--hover-color' as string]: hoverColor,
      }}
    >
      <div className="text-3xl">{icon}</div>
      <div className="text-lg">{title}</div>
    </div>
  );
}

export default SkillCard;
