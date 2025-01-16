import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FaGithub } from 'react-icons/fa';
import { LuExternalLink } from 'react-icons/lu';

type ProjectCardProps = {
  title: string;
  description: string;
  imageUrl?: string;
  githubLink?: string;
  externalLink?: string;
};

const ProjectCard = ({
  title,
  description,
  imageUrl = 'https://placehold.co/600x300/png',
  githubLink,
  externalLink,
}: ProjectCardProps) => {
  return (
    <Card className="w-full max-w-md bg-slate-900/40 backdrop-blur-md text-slate-100 border-slate-100/10 border hover:border-slate-100/20 transition-all shadow-lg hover:shadow-xl">
      <CardHeader>
        <Image
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover rounded-lg mb-4"
          width={600}
          height={300}
        />
        <CardTitle className="text-2xl font-bold text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg text-slate-100 h-min">{description}</p>
      </CardContent>
      <CardFooter className="flex gap-4 pt-4">
        {githubLink && (
          <Link
            className="flex items-center px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all"
            href={githubLink}
            target="_blank"
          >
            <FaGithub className="mr-2 h-4 w-4" />
            Github
          </Link>
        )}
        {externalLink && (
          <Link
            className="flex items-center px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all"
            href={externalLink}
            target="_blank"
          >
            <LuExternalLink className="mr-2 h-4 w-4" />
            Live Demo
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
