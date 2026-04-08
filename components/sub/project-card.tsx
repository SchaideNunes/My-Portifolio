import Image from "next/image";
import Link from "next/link";

type ProjectCardProps = {
  src: string;
  title: string;
  description: string;
  link: string;
};

export const ProjectCard = ({
  src,
  title,
  description,
  link,
}: ProjectCardProps) => {
  return (
    <Link
      href={link}
      target="_blank"
      rel="noreferrer noopener"
      className="relative overflow-hidden rounded-lg shadow-lg border border-[#f59e0b8b] hover:border-[#f59e0b] transition-colors group"
    >
      <div className="w-full h-[250px] bg-[#000000] p-4 flex items-center justify-center overflow-hidden">
        <Image
          src={src}
          alt={title}
          width={1000}
          height={1000}
          className="max-h-full w-auto object-contain group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="relative p-4">
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        <p className="mt-2 text-gray-300">{description}</p>
      </div>
    </Link>
  );
};
