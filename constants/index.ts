import { FaYoutube, FaFacebook } from "react-icons/fa";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";

export const SKILL_DATA = [
  {
    skill_name: "HTML",
    image: "html.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "CSS",
    image: "css.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "JavaScript",
    image: "js.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "Tailwind CSS",
    image: "tailwind.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React",
    image: "react.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "TypeScript",
    image: "ts.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Next.js 14",
    image: "next.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Framer Motion",
    image: "framer.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Node.js",
    image: "node.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "AWS",
    image: "aws.png", // Ensure this exists in public/
    width: 80,
    height: 80,
  },
  {
    skill_name: "PostgreSQL",
    image: "postgresql.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "MongoDB",
    image: "mongodb.png",
    width: 40,
    height: 40,
  },
  {
    skill_name: "Figma",
    image: "figma.png",
    width: 50,
    height: 50,
  },
] as const;

export const SOCIALS = [
  {
    name: "Github",
    icon: RxGithubLogo,
    link: "https://github.com/SchaideNunes",
  },
  {
    name: "Linkedin",
    icon: RxLinkedinLogo,
    link: "https://www.linkedin.com/in/schaidenunes/",
  },
  {
    name: "Instagram",
    icon: RxInstagramLogo,
    link: "https://www.instagram.com/schaide_nunes/",
  },
] as const;

export const FRONTEND_SKILL = [
  {
    skill_name: "HTML",
    image: "html.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "CSS",
    image: "css.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "JavaScript",
    image: "js.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "Tailwind CSS",
    image: "tailwind.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React",
    image: "react.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Next.js 14",
    image: "next.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "TypeScript",
    image: "ts.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "GSAP",
    image: "gsap.svg",
    width: 80,
    height: 80,
  },
] as const;

export const BACKEND_SKILL = [
  {
    skill_name: "Node.js",
    image: "node.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Python",
    image: "python.svg",
    width: 70,
    height: 70,
  },
  {
    skill_name: "PostgreSQL",
    image: "postgresql.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "MongoDB",
    image: "mongodb.png",
    width: 40,
    height: 40,
  },
  {
    skill_name: "Prisma",
    image: "prisma.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "MySQL",
    image: "mysql.png",
    width: 70,
    height: 70,
  },
] as const;

export const CLOUD_SKILL = [
  {
    skill_name: "AWS",
    image: "aws.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "GCP",
    image: "gcp.svg",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Docker",
    image: "docker.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Figma",
    image: "figma.png",
    width: 50,
    height: 50,
  },
] as const;

export const PROJECTS = [
  {
    title: "Barbearia Atual Estilo",
    timeframe: "2023-24",
    discipline: "Full Stack Development",
    tools: "HTML, CSS, JS, DB",
    industry: "Service / Grooming",
    tags: ["HTML", "CSS", "JavaScript", "Banco de Dados"],
    description:
      "Uma plataforma web completa de agendamentos para barbearia, focada em performance, interface moderna e UX fluida para clientes e administradores.",
    technologies: ["HTML", "CSS", "JavaScript", "Banco de Dados"],
    image: "/projects/atualestilo.png",
    link: "https://atualestilo.com/",
    color: "#0a0a0a", // Dark space theme
    testimonial: {
      text: "O Schaide entendeu perfeitamente a visão do nosso negócio. O sistema de agendamento não só ficou com um design premium como facilitou a vida de todos os nossos clientes!",
      author: "Geilson, Atual Estilo"
    }
  },
  {
    title: "Milena Reis Arquitetura",
    timeframe: "2022-23",
    discipline: "Web Design & Development",
    tools: "HTML, CSS, JS, Tailwind, GSAP",
    industry: "Architecture / Design",
    tags: ["HTML", "CSS", "JavaScript", "Tailwind", "GSAP"],
    description:
      "Portfólio de arquitetura elegante e interativo, construído focado em impacto visual e exposição refinada de design de interiores.",
    technologies: ["HTML", "CSS", "JavaScript", "Tailwind", "GSAP"],
    image: "/projects/milenareis.png",
    link: "https://milenareis-fbff1.web.app/",
    color: "#111111", // Slightly lighter dark theme
    testimonial: {
      text: "O portfólio superou minhas expectativas. A forma como as imagens são apresentadas consegue transmitir exatamente a essência e elegância dos meus projetos de arquitetura.",
      author: "Milena Reis"
    }
  },
] as const;

export const FOOTER_DATA = [
  {
    title: "Connect",
    data: [
      {
        name: "GitHub",
        icon: RxGithubLogo,
        link: "https://github.com/SchaideNunes",
      },
      {
        name: "LinkedIn",
        icon: RxLinkedinLogo,
        link: "https://www.linkedin.com/in/schaidenunes/",
      },
    ],
  },
  {
    title: "Social",
    data: [
      {
        name: "Instagram",
        icon: RxInstagramLogo,
        link: "https://www.instagram.com/schaide_nunes/",
      },
    ],
  },
  {
    title: "Contact",
    data: [
      {
        name: "schaide.nunes@gmail.com",
        icon: null,
        link: "mailto:schaide.nunes@gmail.com",
      },
    ],
  },
] as const;

export const NAV_LINKS = [
  {
    title: "About me",
    link: "/about",
  },
  {
    title: "Work",
    link: "/work",
  },
  {
    title: "Skills",
    link: "/#skills",
  },
] as const;

export const TESTIMONIALS = [
  {
    text: "Schaide perfectly understood our business vision. The booking system not only turned out with a premium design but also made life easier for all our customers!",
    author: "Geilson",
    role: "CEO - Barbearia Atual Estilo",
    image: "/logo.png",
  },
  {
    text: "The portfolio exceeded my expectations. The way the images are presented manages to convey exactly the essence and elegance of my architectural projects.",
    author: "Milena Reis",
    role: "Architect",
    image: "/logo.png",
  },
  {
    text: "Working with Schaide was an incredible experience. He has an immense ability to transform complex ideas into simple and intuitive interfaces. A top-tier developer.",
    author: "Mateus Silva",
    role: "Senior Full Stack Developer",
    image: "/logo.png",
  }
] as const;

export const LINKS = {
  sourceCode: "https://github.com/SchaideNunes/My-Portifolio",
};
