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

export type ProjectGallery = {
  desktop: string[];
  mobile: string[];
  // Caminho base sem extensão: o player usa <base>.webm, <base>.mp4 e <base>.webp (poster)
  video?: { desktop: string; mobile?: string };
};

// Monta os caminhos das capturas em /public/images/projects/<slug>/
const gallery = (slug: string, desktop: number, mobile: number): ProjectGallery => ({
  desktop: Array.from({ length: desktop }, (_, i) => `/images/projects/${slug}/desktop-${i + 1}.webp`),
  mobile: Array.from({ length: mobile }, (_, i) => `/images/projects/${slug}/mobile-${i + 1}.webp`),
});

// Vídeos curtos (até 6s) em /public/videos/projects/<slug>/{desktop,mobile}.{webm,mp4,webp}
const video = (slug: string) => ({
  desktop: `/videos/projects/${slug}/desktop`,
  mobile: `/videos/projects/${slug}/mobile`,
});

const GALLERIES = {
  atualEstilo: { ...gallery("atual-estilo", 4, 3), video: video("atual-estilo") },
  milena: { ...gallery("milena-reis", 6, 3), video: video("milena-reis") },
  flowZap: { ...gallery("flow-zap", 6, 4), video: video("flow-zap") },
  clubMaravilha: { ...gallery("club-maravilha", 5, 3), video: video("club-maravilha") },
  acaiCardapio: { ...gallery("acai-cardapio", 3, 3), video: video("acai-cardapio") },
  acaiLanding: { ...gallery("acai-landing", 6, 3), video: video("acai-landing") },
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
        "A barbearia dependia de agendamentos manuais. Criei uma plataforma em que o cliente escolhe barbeiro, serviço e horário em poucos toques, com validação contra horários duplicados e um painel administrativo para a equipe. Resultado: a base de clientes cresceu 46% e passou de 30 agendamentos automáticos por dia.",
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
        "A arquiteta precisava de um site que transformasse visitas em clientes. Criei um portfólio interativo com animação 3D guiada pelo scroll, galeria arrastável, orçamento em 3 etapas direto no WhatsApp e um painel para ela publicar projetos sozinha. Resultado: 8 clientes fechados em 3 meses.",
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
        "O dono da A&V Store conferia todo dia quem devia as parcelas. Criei um sistema que envia lembretes automáticos pelo WhatsApp antes do vencimento, organiza quem deve e mostra o caixa do mês, validado por 347 testes automatizados. Resultado: cerca de 30 parcelas cobradas por mês sem conferência manual. As imagens usam a loja de demonstração, com dados fictícios.",
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
      tools: "Java 21, Spring Boot, React, PostgreSQL",
      industry: "Esporte / Lazer",
      tags: ["Java 21", "Spring Boot", "PostgreSQL", "Flyway", "Testcontainers", "Docker", "GitHub Actions", "Pix"],
      description:
        "Muitos dos mais de 400 associados atrasavam a mensalidade por esquecimento. Criei a plataforma do clube (site público, área do associado e painel da diretoria) com API em Java 21 e Spring Boot, rodando numa VPS: agendamento de quadras e eventos, régua de cobrança no WhatsApp, Mercado Pago integrado com baixa do Pix em menos de 2 s e carteirinha digital. Resultado: cobrança e reservas no automático, com confiabilidade garantida por 119 testes de integração e CI no GitHub Actions. Os dados das imagens são fictícios.",
      technologies: ["Java", "Spring Boot", "React", "PostgreSQL"],
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
        "Para agilizar os pedidos da loja, criei um cardápio digital mobile-first: o cliente monta o açaí em etapas (tamanho, sabor, complementos e entrega) ou escolhe um pronto e vê o total na hora. Resultado: o pedido chega completo ao WhatsApp da loja, e a equipe controla preços, estoque e pedidos num painel administrativo.",
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
        "A rede precisava atrair novos franqueados. Criei uma landing page com números da marca, formatos de loja, vitrine de produtos e uma animação de 120 quadros guiada pelo scroll. Resultado: o interessado preenche um formulário curto e cai direto no WhatsApp da equipe de expansão.",
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
        "Os gestores controlavam cerca de 600 pendências por mês em agendas pessoais, e-mail e planilhas. Criei um app interno com quadro Kanban, alertas de prazo, ações privadas, histórico de cada alteração e aprovação de mudanças críticas por cartões no Microsoft Teams. Resultado: todas as demandas da equipe centralizadas num só lugar, com auditoria completa.",
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
        "The barbershop relied on manual booking. I built a platform where clients pick a barber, service, and time slot in a few taps, with double-booking protection and an admin panel for the team. Result: the customer base grew 46% and it now handles 30+ automated bookings a day.",
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
        "The architect needed a website that turned visits into clients. I built an interactive portfolio with a scroll-driven 3D animation, a draggable gallery, a 3-step quote form that goes straight to WhatsApp, and a panel so she can publish projects on her own. Result: 8 closed clients in 3 months.",
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
        "The owner of A&V Store checked every day who owed installments. I built a system that sends automated WhatsApp reminders before each due date, tracks who owes what, and shows the month's cash flow, validated by 347 automated tests. Result: about 30 installments collected a month with no manual checking. Screenshots use the demo store with fictional data.",
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
      tools: "Java 21, Spring Boot, React, PostgreSQL",
      industry: "Sports / Leisure",
      tags: ["Java 21", "Spring Boot", "PostgreSQL", "Flyway", "Testcontainers", "Docker", "GitHub Actions", "Pix"],
      description:
        "Many of the club's 400+ members paid their dues late because they forgot. I built the club's platform (public site, member area, and board dashboard) with a Java 21 and Spring Boot API running on a VPS: court and event booking, a WhatsApp billing schedule, integrated Mercado Pago with Pix reconciled in under 2 s, and digital membership cards. Result: billing and bookings on autopilot, backed by 119 integration tests and CI on GitHub Actions. Screenshot data is fictional.",
      technologies: ["Java", "Spring Boot", "React", "PostgreSQL"],
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
        "To speed up the store's orders, I built a mobile-first digital menu: customers build their açaí step by step (size, flavor, toppings, and delivery) or pick a ready-made one and see the total instantly. Result: orders reach the store's WhatsApp complete, and the team manages prices, stock, and orders from an admin panel.",
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
        "The chain needed to attract new franchisees. I built a landing page with brand numbers, store formats, a product showcase, and a 120-frame scroll-driven animation. Result: prospects fill in a short form and land straight in the expansion team's WhatsApp.",
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
        "Managers tracked about 600 tasks a month across personal calendars, email, and spreadsheets. I built an internal app with a Kanban board, deadline alerts, private actions, a full change history, and approval of critical changes through Microsoft Teams cards. Result: all of the team's requests centralized in one place, with a complete audit trail.",
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
