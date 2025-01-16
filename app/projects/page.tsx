import ProjectCard from '../components/project-card';

export default function Page() {
  return (
    <>
      <h1 className="text-4xl font-bold text-slate-100">My Projects</h1>
      <div className="flex flex-wrap gap-6 mt-4 justify-center">
        <ProjectCard
          title="Convolink"
          description="A messaging app built with Next.js, Tailwind, Supabase and Socket.io (still in development)"
          imageUrl="/images/convolink.png"
          githubLink="https://github.com/alienworld1/messenger-app"
          externalLink="https://messenger-app-wheat.vercel.app/"
        />
        <ProjectCard
          title="Node.js File Uploader"
          description="A cloud storage service, that holds files, similar to Google Drive, created with Nodejs, Express and Prisma"
          githubLink="https://github.com/alienworld1/nodejs-file-uploader"
        />
        <ProjectCard
          title="Where's Waldo"
          description="A photo tagging app, based on the popular series of books with the same name, created with React, Tailwind, Express, Node.js and MongoDB"
          githubLink="https://github.com/alienworld1/wheres-waldo"
        />
        <ProjectCard
          title="Blog API"
          description="A REST API built for a blogging platform with Node, Express and Mongoose. The API utilizes JSON web tokens for authorization. The frontend was created with Vite, React and TailwindCSS"
          imageUrl="/images/blog.png"
          githubLink="https://github.com/alienworld1/blog-api"
          externalLink="https://blog-frontend-six-sigma.vercel.app/"
        />
        <ProjectCard
          title="Members Only"
          description="An exclusive clubhouse where members can post anonymous messages. An external visitor can only see the messages, but only a member would know who posted them. This site was created with MongoDB, Node.js, Express and Pug. (Thank you, Nikhil.)"
          githubLink="https://github.com/alienworld1/members-only"
          externalLink="https://pastoral-eight-archduke.glitch.me/"
          imageUrl="/images/members-only.png"
        />
        <ProjectCard
          title="Battleship"
          description='An implementation of the classic game "Battleship" in the web browser using Javascript, with webpack for module bundling.'
          imageUrl="/images/battleship.png"
          githubLink="https://github.com/alienworld1/battleship"
          externalLink="https://alienworld1.github.io/battleship/"
        />
      </div>
    </>
  );
}
