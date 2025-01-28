import { LuMail } from 'react-icons/lu';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function Page() {
  return (
    <>
      <h1 className="text-4xl font-bold text-slate-100">Contact Me</h1>
      <div className="mt-4 text-lg text-slate-100">
        <ul className="text-2xl font-semibold flex flex-col gap-2">
          <li className="p-4 hover:bg-slate-800/60 rounded-lg transition-colors">
            <a
              href="mailto:alienwurld@proton.me"
              className="flex w-full items-center gap-4"
            >
              <LuMail />
              <span>E-mail</span>
            </a>
          </li>
          <li className="p-4 hover:bg-slate-800/60 rounded-lg transition-colors">
            <a
              href="https://github.com/alienworld1"
              className="flex w-full items-center gap-4"
              target="_blank"
            >
              <FaGithub />
              <span>Github</span>
            </a>
          </li>
          <li className="p-4 hover:bg-slate-800/60 rounded-lg transition-colors">
            <a
              href="https://www.x.com/alienworl1"
              className="flex w-full items-center gap-4"
              target="_blank"
            >
              <FaXTwitter />
              <span>Twitter/X</span>
            </a>
          </li>
          <li className="p-4 hover:bg-slate-800/60 rounded-lg transition-colors">
            <a
              href="https://www.linkedin.com/in/aditya-a-b-762453290/"
              className="flex w-full items-center gap-4"
              target="_blank"
            >
              <FaLinkedin />
              <span>Linkedin</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
