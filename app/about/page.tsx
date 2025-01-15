import {
  SiTypescript,
  SiPostgresql,
  SiNodedotjs,
  SiMongodb,
  SiRust,
  SiC,
  SiCplusplus,
  SiGit,
  SiGithub,
  SiPython,
  SiGo,
  SiUnity,
  SiJavascript,
  SiArduino,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { TbBrandCSharp } from 'react-icons/tb';

import SkillCard from '../components/skill-card';

const skillProps = [
  { icon: <SiTypescript />, title: 'TypeScript', hoverColor: '#3178C6' },
  { icon: <SiPostgresql />, title: 'PostgreSQL', hoverColor: '#336791' },
  { icon: <SiNodedotjs />, title: 'Node.js', hoverColor: '#68A063' },
  { icon: <SiMongodb />, title: 'MongoDB', hoverColor: '#4DB33D' },
  { icon: <SiJavascript />, title: 'JavaScript', hoverColor: '#F7DF1E', switchToDarkTextOnHover: true },
  { icon: <SiRust />, title: 'Rust', hoverColor: '#DEA584' },
  { icon: <SiC />, title: 'C', hoverColor: '#5C6BC0' },
  { icon: <SiCplusplus />, title: 'C++', hoverColor: '#00599C' },
  { icon: <SiGit />, title: 'Git', hoverColor: '#F05032' },
  { icon: <SiGithub />, title: 'GitHub', hoverColor: '#6e5494' },
  { icon: <SiPython />, title: 'Python', hoverColor: '#FFD43B', switchToDarkTextOnHover: true },
  { icon: <FaJava />, title: 'Java', hoverColor: '#E76F00' },
  { icon: <SiGo />, title: 'Go', hoverColor: '#00ADD8' },
  { icon: <TbBrandCSharp />, title: 'C#', hoverColor: '#9B4F96' },
  { icon: <SiUnity />, title: 'Unity', hoverColor: '#A0A0A0' },
  { icon: <SiArduino />, title: 'Arduino', hoverColor: '#00979C' },
];

export default function Page() {
  return (
    <>
      <h1 className="text-4xl font-bold text-slate-100">About Me</h1>
      <p className="text-lg text-slate-100">
        I&apos;m Aditya, a software developer, and a second-year college student,
        from Chennai. I&apos;ve had an interest in software since I was a kid, and
        right now, I&apos;ve worked on full-stack applications, and systems software
        with C++ and Rust.
      </p>
      <h2 className="text-3xl font-bold text-slate-100">Skills</h2>
      <div className="flex flex-wrap gap-16 mt-4">
        {skillProps.map((props, index) => (
          <SkillCard key={index} {...props} />
        ))}
      </div>
    </>
  );
}
