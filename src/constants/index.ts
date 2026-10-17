import { FaWhatsapp } from "react-icons/fa";
import {
  RxGithubLogo,
  RxInstagramLogo,
  RxLinkedinLogo,
} from "react-icons/rx";

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
  {
    name: "WhatsApp",
    icon: FaWhatsapp,
    link: "https://wa.me/5575991503949",
  },
] as const;

export const FRONTEND_SKILL = [
  {
    skill_name: "HTML",
    image: "html.webp",
    width: 80,
    height: 80,
  },
  {
    skill_name: "CSS",
    image: "css.webp",
    width: 80,
    height: 80,
  },
  {
    skill_name: "JavaScript",
    image: "js.webp",
    width: 65,
    height: 65,
  },
  {
    skill_name: "Tailwind CSS",
    image: "tailwind.webp",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React",
    image: "react.webp",
    width: 80,
    height: 80,
  },
  {
    skill_name: "TypeScript",
    image: "ts.webp",
    width: 80,
    height: 80,
  },
  {
    skill_name: "GSAP",
    image: "gsap.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Three.js",
    image: "threejs.svg",
    width: 80,
    height: 80,
  },
] as const;

export const BACKEND_SKILL = [
  {
    skill_name: "Node.js",
    image: "nodejs.svg",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Express",
    image: "express.svg",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Python",
    image: "python.svg",
    width: 70,
    height: 70,
  },
  {
    skill_name: "FastAPI",
    image: "fastapi.svg",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Django",
    image: "django.svg",
    width: 70,
    height: 70,
  },
] as const;

export const DATABASE_SKILL = [
  {
    skill_name: "PostgreSQL",
    image: "postgresql.webp",
    width: 70,
    height: 70,
  },
  {
    skill_name: "MongoDB",
    image: "mongodb.webp",
    width: 40,
    height: 40,
  },
  {
    skill_name: "MySQL",
    image: "mysql.webp",
    width: 70,
    height: 70,
  },
] as const;

export const CLOUD_SKILL = [
  {
    skill_name: "AWS",
    image: "aws.svg",
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
    image: "docker.webp",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Figma",
    image: "figma.webp",
    width: 50,
    height: 50,
  },
] as const;

export type ProjectGallery = {
  desktop: string[];
  mobile: string[];
};

// Monta os caminhos das capturas em /public/images/projects/<slug>/
const gallery = (slug: string, desktop: number, mobile: number): ProjectGallery => ({
  desktop: Array.from({ length: desktop }, (_, i) => `/images/projects/${slug}/desktop-${i + 1}.webp`),
  mobile: Array.from({ length: mobile }, (_, i) => `/images/projects/${slug}/mobile-${i + 1}.webp`),
});

const GALLERIES = {
  atualEstilo: gallery("atual-estilo", 4, 3),
  milena: gallery("milena-reis", 6, 3),
  flowZap: gallery("flow-zap", 6, 4),
  clubMaravilha: gallery("club-maravilha", 5, 3),
  acaiCardapio: gallery("acai-cardapio", 3, 3),
  acaiLanding: gallery("acai-landing", 6, 3),
  gestaoAcoes: { desktop: ["/images/projects/GestaoAcoes.svg"], mobile: [] },
};

export const PROJECTS = {
  PT: [
    {
      title: "Barbearia Atual Estilo",
      timeframe: "2026",
      discipline: "Desenvolvimento Full Stack",
      tools: "React, PHP, MySQL",
      industry: "Serviços / Beleza",
      tags: ["React", "PHP", "MySQL", "JWT", "Vitest"],
      description:
        "Plataforma de agendamento online da barbearia: o cliente escolhe barbeiro, serviço e horário em poucos toques, e a equipe gerencia tudo num painel administrativo. Desde o lançamento, a base de clientes cresceu 46% e passou de 30 agendamentos automáticos por dia.",
      technologies: ["React", "PHP", "MySQL"],
      image: GALLERIES.atualEstilo.desktop[0],
      gallery: GALLERIES.atualEstilo,
      link: "https://atualestilo.com/",
      color: "#0a0a0a",
      testimonial: {
        text: "O Schaide entendeu perfeitamente a visão do nosso negócio. O sistema de agendamento não só ficou com um design premium como facilitou a vida de todos os nossos clientes!",
        author: "Geilson, Atual Estilo",
      },
    },
    {
      title: "Milena Reis Arquitetura",
      timeframe: "2026",
      discipline: "Design & Desenvolvimento Web",
      tools: "JavaScript, GSAP, Tailwind CSS",
      industry: "Arquitetura / Design",
      tags: ["JavaScript", "GSAP", "Tailwind CSS", "Vercel Functions"],
      description:
        "Portfólio interativo com animação 3D guiada pelo scroll, galeria arrastável e orçamento em 3 etapas direto no WhatsApp, além de um painel para a arquiteta publicar projetos sozinha. Trouxe 8 clientes fechados em 3 meses.",
      technologies: ["JavaScript", "GSAP", "Tailwind CSS"],
      image: GALLERIES.milena.desktop[0],
      gallery: GALLERIES.milena,
      link: "https://portifolio-milena.vercel.app/",
      color: "#111111",
      testimonial: {
        text: "O portfólio superou minhas expectativas. A forma como as imagens são apresentadas consegue transmitir exatamente a essência e elegância dos meus projetos de arquitetura.",
        author: "Milena Reis",
      },
    },
    {
      title: "Flow-Zap",
      timeframe: "2026",
      discipline: "Desenvolvimento Full Stack",
      tools: "React, TypeScript, Node.js, Supabase",
      industry: "Varejo / Cobrança",
      tags: ["React", "TypeScript", "Node.js", "Supabase", "WhatsApp", "TDD"],
      description:
        "Sistema de cobrança de vendas parceladas da A&V Store: envia lembretes automáticos pelo WhatsApp antes do vencimento, organiza quem deve e mostra o caixa do mês. Cobra cerca de 30 parcelas por mês sem o dono precisar conferir nada. As imagens usam a loja de demonstração, com dados fictícios.",
      technologies: ["React", "TypeScript", "Node.js", "Supabase"],
      image: GALLERIES.flowZap.desktop[0],
      gallery: GALLERIES.flowZap,
      link: "https://github.com/SchaideNunes/FlowZap",
      color: "#0f0f0f",
    },
    {
      title: "Club Maravilha",
      timeframe: "2026",
      discipline: "Desenvolvimento Full Stack",
      tools: "React, Python, FastAPI, PostgreSQL",
      industry: "Esporte / Lazer",
      tags: ["React", "Python", "FastAPI", "PostgreSQL", "Docker", "Pix"],
      description:
        "Plataforma do clube com site público, área do associado e painel da diretoria: cobrança por Pix com baixa automática, lembretes no WhatsApp, reserva de quadras sem conflito e carteirinha digital para mais de 300 sócios. Os dados das imagens são fictícios.",
      technologies: ["React", "FastAPI", "PostgreSQL"],
      image: GALLERIES.clubMaravilha.desktop[0],
      gallery: GALLERIES.clubMaravilha,
      link: "https://club-maravilha.vercel.app/",
      color: "#0f0f0f",
    },
    {
      title: "Cardápio Açaí no Kilo",
      timeframe: "2026",
      discipline: "Desenvolvimento Full Stack",
      tools: "React, TypeScript, Node.js, MongoDB",
      industry: "Alimentação / Delivery",
      tags: ["React", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB"],
      description:
        "Cardápio digital mobile-first: o cliente monta o açaí em etapas (tamanho, sabor, complementos e entrega) ou escolhe um pronto, vê o total na hora e envia o pedido completo para o WhatsApp da loja. Inclui painel administrativo para preços, estoque e pedidos.",
      technologies: ["React", "TypeScript", "MongoDB"],
      image: GALLERIES.acaiCardapio.desktop[0],
      gallery: GALLERIES.acaiCardapio,
      link: "https://cardapio-acai-no-kilo.vercel.app/",
      color: "#0f0f0f",
    },
    {
      title: "Açaí no Kilo — Franquias",
      timeframe: "2026",
      discipline: "Design & Desenvolvimento Web",
      tools: "React, TypeScript, GSAP, Tailwind CSS",
      industry: "Franquias / Alimentação",
      tags: ["React", "TypeScript", "GSAP", "Tailwind CSS", "Canvas"],
      description:
        "Landing page para atrair novos franqueados da rede: números da marca, formatos de loja, vitrine de produtos e formulário que leva o interessado direto ao WhatsApp da expansão, com uma animação de 120 quadros guiada pelo scroll.",
      technologies: ["React", "GSAP", "Tailwind CSS"],
      image: GALLERIES.acaiLanding.desktop[0],
      gallery: GALLERIES.acaiLanding,
      link: "https://acai-no-kilo.vercel.app/",
      color: "#0f0f0f",
    },
    {
      title: "Gestão de Ações (CMOC)",
      timeframe: "2026",
      discipline: "Aplicativo Corporativo Low-Code",
      tools: "Power Apps, Power Fx, SharePoint, Power Automate, Teams",
      industry: "Mineração / Uso Interno",
      tags: ["Power Apps", "Power Fx", "SharePoint", "Power Automate", "Teams"],
      description:
        "App interno que substituiu agendas pessoais e planilhas no controle das pendências da equipe: quadro Kanban, alertas de prazo, ações privadas, histórico de cada alteração e aprovação de mudanças críticas por cartões no Microsoft Teams.",
      technologies: ["Power Apps", "SharePoint", "Power Automate", "Teams"],
      image: GALLERIES.gestaoAcoes.desktop[0],
      gallery: GALLERIES.gestaoAcoes,
      link: "", // Ferramenta interna, sem link público
      color: "#0f0f0f",
    },
  ],
  EN: [
    {
      title: "Atual Estilo Barbershop",
      timeframe: "2026",
      discipline: "Full Stack Development",
      tools: "React, PHP, MySQL",
      industry: "Service / Grooming",
      tags: ["React", "PHP", "MySQL", "JWT", "Vitest"],
      description:
        "Online booking platform for a barbershop: clients pick a barber, service, and time slot in a few taps, and the team manages everything from an admin panel. Since launch, the customer base grew 46% and it handles 30+ automated bookings a day.",
      technologies: ["React", "PHP", "MySQL"],
      image: GALLERIES.atualEstilo.desktop[0],
      gallery: GALLERIES.atualEstilo,
      link: "https://atualestilo.com/",
      color: "#0a0a0a",
      testimonial: {
        text: "Schaide perfectly understood our business vision. The booking system not only turned out with a premium design but also made life easier for all our customers!",
        author: "Geilson, Atual Estilo",
      },
    },
    {
      title: "Milena Reis Architecture",
      timeframe: "2026",
      discipline: "Web Design & Development",
      tools: "JavaScript, GSAP, Tailwind CSS",
      industry: "Architecture / Design",
      tags: ["JavaScript", "GSAP", "Tailwind CSS", "Vercel Functions"],
      description:
        "Interactive portfolio with a scroll-driven 3D animation, a draggable gallery, and a 3-step quote form that goes straight to WhatsApp, plus an admin panel so the architect can publish projects on her own. It brought in 8 closed clients in 3 months.",
      technologies: ["JavaScript", "GSAP", "Tailwind CSS"],
      image: GALLERIES.milena.desktop[0],
      gallery: GALLERIES.milena,
      link: "https://portifolio-milena.vercel.app/",
      color: "#111111",
      testimonial: {
        text: "The portfolio exceeded my expectations. The way the images are presented manages to convey exactly the essence and elegance of my architectural projects.",
        author: "Milena Reis",
      },
    },
    {
      title: "Flow-Zap",
      timeframe: "2026",
      discipline: "Full Stack Development",
      tools: "React, TypeScript, Node.js, Supabase",
      industry: "Retail / Billing",
      tags: ["React", "TypeScript", "Node.js", "Supabase", "WhatsApp", "TDD"],
      description:
        "Installment billing system for A&V Store: it sends automated WhatsApp reminders before each due date, tracks who owes what, and shows the month's cash flow. It collects about 30 installments a month without the owner checking anything by hand. Screenshots use the demo store with fictional data.",
      technologies: ["React", "TypeScript", "Node.js", "Supabase"],
      image: GALLERIES.flowZap.desktop[0],
      gallery: GALLERIES.flowZap,
      link: "https://github.com/SchaideNunes/FlowZap",
      color: "#0f0f0f",
    },
    {
      title: "Club Maravilha",
      timeframe: "2026",
      discipline: "Full Stack Development",
      tools: "React, Python, FastAPI, PostgreSQL",
      industry: "Sports / Leisure",
      tags: ["React", "Python", "FastAPI", "PostgreSQL", "Docker", "Pix"],
      description:
        "Club platform with a public site, a member area, and a board dashboard: Pix billing with automatic reconciliation, WhatsApp reminders, conflict-free court booking, and digital membership cards for 300+ members. Screenshot data is fictional.",
      technologies: ["React", "FastAPI", "PostgreSQL"],
      image: GALLERIES.clubMaravilha.desktop[0],
      gallery: GALLERIES.clubMaravilha,
      link: "https://club-maravilha.vercel.app/",
      color: "#0f0f0f",
    },
    {
      title: "Açaí no Kilo Menu",
      timeframe: "2026",
      discipline: "Full Stack Development",
      tools: "React, TypeScript, Node.js, MongoDB",
      industry: "Food / Delivery",
      tags: ["React", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB"],
      description:
        "Mobile-first digital menu: customers build their açaí step by step (size, flavor, toppings, and delivery) or pick a ready-made one, see the total instantly, and send the complete order to the store's WhatsApp. Includes an admin panel for prices, stock, and orders.",
      technologies: ["React", "TypeScript", "MongoDB"],
      image: GALLERIES.acaiCardapio.desktop[0],
      gallery: GALLERIES.acaiCardapio,
      link: "https://cardapio-acai-no-kilo.vercel.app/",
      color: "#0f0f0f",
    },
    {
      title: "Açaí no Kilo — Franchising",
      timeframe: "2026",
      discipline: "Web Design & Development",
      tools: "React, TypeScript, GSAP, Tailwind CSS",
      industry: "Franchising / Food",
      tags: ["React", "TypeScript", "GSAP", "Tailwind CSS", "Canvas"],
      description:
        "Landing page to attract new franchisees: brand numbers, store formats, a product showcase, and a form that sends leads straight to the expansion team's WhatsApp, with a 120-frame scroll-driven animation.",
      technologies: ["React", "GSAP", "Tailwind CSS"],
      image: GALLERIES.acaiLanding.desktop[0],
      gallery: GALLERIES.acaiLanding,
      link: "https://acai-no-kilo.vercel.app/",
      color: "#0f0f0f",
    },
    {
      title: "Action Management (CMOC)",
      timeframe: "2026",
      discipline: "Low-Code Enterprise App",
      tools: "Power Apps, Power Fx, SharePoint, Power Automate, Teams",
      industry: "Mining / Internal Tool",
      tags: ["Power Apps", "Power Fx", "SharePoint", "Power Automate", "Teams"],
      description:
        "Internal app that replaced personal calendars and spreadsheets for tracking team action items: Kanban board, deadline alerts, private actions, a full history of every change, and Microsoft Teams adaptive-card approvals for critical edits.",
      technologies: ["Power Apps", "SharePoint", "Power Automate", "Teams"],
      image: GALLERIES.gestaoAcoes.desktop[0],
      gallery: GALLERIES.gestaoAcoes,
      link: "", // Internal tool, no public link
      color: "#0f0f0f",
    },
  ],
};

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
        name: "schaidenunes.dev@gmail.com",
        icon: null,
        link: "mailto:schaidenunes.dev@gmail.com",
      },
      {
        name: "+55 (75) 99150-3949",
        icon: FaWhatsapp,
        link: "https://wa.me/5575991503949",
      },
    ],
  },
] as const;


export const TESTIMONIALS = {
  PT: [
    {
      text: "O Schaide entendeu perfeitamente a visão do nosso negócio. O sistema de agendamento não só ficou com um design premium como facilitou a vida de todos os nossos clientes!",
      author: "Geilson",
      role: "CEO - Barbearia Atual Estilo",
      image: "/images/brand/logo.webp",
    },
    {
      text: "O portfólio superou minhas expectativas. A forma como as imagens são apresentadas consegue transmitir exatamente a essência e elegância dos meus projetos de arquitetura.",
      author: "Milena Reis",
      role: "Arquiteta",
      image: "/images/brand/logo.webp",
    },
    {
      text: "Trabalhar com o Schaide foi uma experiência incrível. Ele tem uma facilidade imensa para transformar ideias complexas em interfaces simples e intuitivas. Um desenvolvedor de alto nível.",
      author: "Mateus Silva",
      role: "Desenvolvedor Full Stack Sênior",
      image: "/images/brand/logo.webp",
    }
  ],
  EN: [
    {
      text: "Schaide perfectly understood our business vision. The booking system not only turned out with a premium design but also made life easier for all our customers!",
      author: "Geilson",
      role: "CEO - Barbearia Atual Estilo",
      image: "/images/brand/logo.webp",
    },
    {
      text: "The portfolio exceeded my expectations. The way the images are presented manages to convey exactly the essence and elegance of my architectural projects.",
      author: "Milena Reis",
      role: "Architect",
      image: "/images/brand/logo.webp",
    },
    {
      text: "Working with Schaide was an incredible experience. He has an immense ability to transform complex ideas into simple and intuitive interfaces. A top-tier developer.",
      author: "Mateus Silva",
      role: "Senior Full Stack Developer",
      image: "/images/brand/logo.webp",
    }
  ]
} as const;
