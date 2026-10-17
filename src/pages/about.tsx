"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import {
  ArrowDownTrayIcon,
  ArrowRightIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

import { Image } from "@/components/ui/image";
import { TESTIMONIALS } from "@/constants";
import { TRANSLATIONS } from "@/constants/translations";
import { useLang } from "@/lib/lang-context";

type Lang = "PT" | "EN";

// Fotos do "O que eu amo": span define o tamanho no mosaico
const INTERESTS = [
  { label: { PT: "Games", EN: "Games" }, image: "/images/about/SetupEldenring.webp", span: "col-span-2 row-span-2" },
  { label: { PT: "Música", EN: "Music" }, image: "/images/about/ShowGuns.webp", span: "row-span-2" },
  { label: { PT: "Cozinhar", EN: "Cooking" }, image: "/images/about/Carbonara.webp", span: "" },
  { label: { PT: "Academia", EN: "Gym" }, image: "/images/about/EspelhoGuns.webp", span: "" },
  { label: { PT: "Gatos", EN: "Cats" }, image: "/images/about/Gatos.webp", span: "" },
  { label: { PT: "Thor", EN: "Thor" }, image: "/images/about/GatoThor.webp", span: "row-span-2" },
  { label: { PT: "Vôlei", EN: "Volleyball" }, image: "/images/about/Volley.webp", span: "col-span-2" },
  { label: { PT: "Fogueira", EN: "Campfire" }, image: "/images/about/Fogueira.webp", span: "" },
  { label: { PT: "Estrada", EN: "Road trips" }, image: "/images/about/SelfieCarro.webp", span: "col-span-2" },
];

// Linha do tempo (datas conferidas com o currículo)
const JOURNEY: Record<Lang, { year: string; title: string; text: string; tags?: string[] }[]> = {
  PT: [
    {
      year: "2023",
      title: "Primeiras linhas de código",
      text: "Decidi levar a programação a sério: estudos diários, projetos pessoais e muita lógica até o código começar a virar produto.",
      tags: ["Python", "JavaScript", "SQL"],
    },
    {
      year: "2024",
      title: "Jovem Aprendiz – EquinoxGold",
      text: "Primeira experiência corporativa, em uma mineradora: rotinas administrativas, documentação rigorosa e trabalho com equipes multidisciplinares.",
    },
    {
      year: "2025",
      title: "Engenharia de Software + estágio na CMOC",
      text: "Entrei na UNIASSELVI e no estágio da CMOC, onde crio do zero sistemas corporativos que substituem planilhas e controles manuais da manutenção.",
      tags: ["Power Apps", "Power Automate", "Power BI", "Python"],
    },
    {
      year: "2026",
      title: "Primeiros clientes",
      text: "A plataforma da Barbearia Atual Estilo trouxe 46% mais clientes, e o site da Milena Reis fechou 8 clientes em 3 meses.",
      tags: ["React", "PHP", "MySQL", "GSAP"],
    },
    {
      year: "2026",
      title: "Sistemas completos de ponta a ponta",
      text: "Flow-Zap automatizou a cobrança de uma loja pelo WhatsApp, e o Club Maravilha passou a gerir mais de 300 sócios com Pix e reservas online.",
      tags: ["TypeScript", "FastAPI", "PostgreSQL", "Docker"],
    },
    {
      year: "Hoje",
      title: "O próximo passo",
      text: "8 sistemas em produção e buscando minha primeira vaga júnior, de preferência remota, para crescer em um time de produto.",
    },
  ],
  EN: [
    {
      year: "2023",
      title: "First lines of code",
      text: "I decided to take programming seriously: daily study, personal projects and a lot of logic until code started turning into products.",
      tags: ["Python", "JavaScript", "SQL"],
    },
    {
      year: "2024",
      title: "Young Apprentice – EquinoxGold",
      text: "My first corporate experience, at a mining company: administrative workflows, strict documentation and multidisciplinary teamwork.",
    },
    {
      year: "2025",
      title: "Software Engineering + CMOC internship",
      text: "I started at UNIASSELVI and joined CMOC, where I build enterprise systems from scratch that replace spreadsheets and manual maintenance controls.",
      tags: ["Power Apps", "Power Automate", "Power BI", "Python"],
    },
    {
      year: "2026",
      title: "First clients",
      text: "Atual Estilo's booking platform brought in 46% more customers, and Milena Reis's website closed 8 clients in 3 months.",
      tags: ["React", "PHP", "MySQL", "GSAP"],
    },
    {
      year: "2026",
      title: "End-to-end systems",
      text: "Flow-Zap automated a store's billing over WhatsApp, and Club Maravilha now manages 300+ members with Pix and online booking.",
      tags: ["TypeScript", "FastAPI", "PostgreSQL", "Docker"],
    },
    {
      year: "Today",
      title: "The next step",
      text: "8 systems in production and looking for my first junior role, ideally remote, to grow within a product team.",
    },
  ],
};

// Tecnologias que orbitam a foto (as que domino com segurança)
const ORBIT_TECH = ["Python", "React", "SQL"];

/* ------------------------------------------------------------------ */
/* Foto em órbita                                                       */
/* ------------------------------------------------------------------ */
const OrbitPhoto = () => {
  const reduceMotion = useReducedMotion();
  const spin = reduceMotion ? {} : { animate: { rotate: 360 }, transition: { duration: 40, repeat: Infinity, ease: "linear" as const } };
  const counterSpin = reduceMotion ? {} : { animate: { rotate: -360 }, transition: { duration: 40, repeat: Infinity, ease: "linear" as const } };

  return (
    <div className="relative w-[280px] sm:w-[360px] lg:w-[420px] aspect-square mx-auto">
      {/* Brilho âmbar atrás da foto, como o eclipse do hero */}
      <div aria-hidden className="absolute inset-[12%] rounded-full bg-amber-500/25 blur-[70px]" />

      {/* Órbitas */}
      <div aria-hidden className="absolute inset-0 rounded-full border border-dashed border-white/15" />
      <div aria-hidden className="absolute inset-[9%] rounded-full border border-amber-500/20" />

      {/* Tecnologias orbitando (o texto gira ao contrário para ficar sempre em pé) */}
      <motion.div aria-hidden className="absolute inset-0" {...spin}>
        {ORBIT_TECH.map((tech, i) => {
          const angle = (i / ORBIT_TECH.length) * 2 * Math.PI - Math.PI / 2;
          return (
            <div
              key={tech}
              className="absolute"
              style={{ left: `${50 + 50 * Math.cos(angle)}%`, top: `${50 + 50 * Math.sin(angle)}%` }}
            >
              <motion.span
                {...counterSpin}
                className="-translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/40 bg-black/80 backdrop-blur text-xs font-bold text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.35)] whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                {tech}
              </motion.span>
            </div>
          );
        })}
      </motion.div>

      {/* Pequeno planeta na órbita interna */}
      <motion.div
        aria-hidden
        className="absolute inset-[9%]"
        {...(reduceMotion ? {} : { animate: { rotate: -360 }, transition: { duration: 22, repeat: Infinity, ease: "linear" as const } })}
      >
        <span className="absolute left-1/2 -top-2 w-4 h-4 rounded-full bg-gradient-to-br from-amber-200 to-amber-700 shadow-[0_0_12px_rgba(251,191,36,0.8)]" />
      </motion.div>

      {/* Foto */}
      <div className="absolute inset-[18%] rounded-full overflow-hidden border-2 border-amber-500/40 shadow-[0_0_50px_rgba(245,158,11,0.35)]">
        <Image src="/images/about/Selfie.webp" alt="Schaide Nunes" fill priority className="object-cover object-top" />
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Linha do tempo com a mesma linguagem de constelação dos projetos     */
/* ------------------------------------------------------------------ */
const Journey = ({ lang }: { lang: Lang }) => {
  const t = TRANSLATIONS[lang].about;
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  return (
    <section className="flex flex-col gap-14">
      <div className="flex flex-col gap-4">
        <span className="self-start px-3 py-1 rounded-full border border-amber-500/40 bg-amber-500/5 text-amber-400 text-xs font-bold uppercase tracking-[0.25em]">
          {t.journeyTag}
        </span>
        <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
          {t.journeyTitle1} <span className="text-amber-500">{t.journeyTitle2}</span>
        </h3>
      </div>

      <div ref={ref} className="relative">
        {/* Trilha pontilhada + trecho aceso pelo scroll */}
        <div aria-hidden className="absolute top-0 bottom-0 left-[11px] md:left-1/2 md:-translate-x-1/2 w-px border-l border-dashed border-white/20" />
        <motion.div
          aria-hidden
          style={{ scaleY: reduceMotion ? 1 : progress }}
          className="absolute top-0 bottom-0 left-[10px] md:left-1/2 md:-translate-x-1/2 w-[3px] origin-top rounded-full bg-gradient-to-b from-amber-200 via-amber-500 to-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.8)]"
        />

        <ol className="flex flex-col gap-12 md:gap-16">
          {JOURNEY[lang].map((step, i) => {
            const right = i % 2 === 1;
            return (
              <li key={`${step.year}-${step.title}`} className="relative md:grid md:grid-cols-2 md:gap-16 pl-12 md:pl-0">
                {/* Estrela no ponto da linha */}
                <span aria-hidden className="absolute left-[11px] md:left-1/2 top-6 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                  <span className="absolute w-6 h-6 rounded-full bg-amber-500/20 animate-ping" />
                  <span className="relative w-3 h-3 rounded-full bg-amber-100 shadow-[0_0_12px_rgba(251,191,36,1)]" />
                </span>

                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, x: right ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`group rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-7 hover:border-amber-500/40 hover:bg-amber-500/[0.04] transition-colors duration-300 ${
                    right ? "md:col-start-2" : "md:col-start-1 md:text-right"
                  }`}
                >
                  <span className="font-mono text-sm tracking-widest text-amber-500">{step.year}</span>
                  <h4 className="mt-2 text-xl md:text-2xl font-semibold text-white group-hover:text-amber-300 transition-colors">
                    {step.title}
                  </h4>
                  <p className="mt-3 text-gray-400 leading-relaxed">{step.text}</p>
                  {step.tags && (
                    <div className={`mt-4 flex flex-wrap gap-2 ${right ? "" : "md:justify-end"}`}>
                      {step.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border border-white/10 text-gray-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default function AboutPage() {
  const { lang } = useLang();
  const t = TRANSLATIONS[lang].about;
  const reduceMotion = useReducedMotion();
  const cvHref = lang === "PT" ? "/Curriculo_Schaide_Nunes_2026.pdf" : "/Resume_Schaide_Nunes_2026.pdf";

  const stats = [
    { value: "2023", label: t.statSince },
    { value: "8", label: t.statSystems },
    { value: "CMOC", label: t.statCmoc },
    { value: "C1", label: t.statEnglish },
  ];

  return (
    <main className="relative h-full w-full pt-28 md:pt-32 px-[6%] md:px-20 flex flex-col gap-28 md:gap-36 mb-20 overflow-x-hidden">
      {/* Brilho de fundo no tom do site */}
      <div aria-hidden className="pointer-events-none absolute -top-40 right-0 w-[700px] h-[500px] rounded-full bg-amber-500/10 blur-[140px]" />

      {/* Hero: texto + foto em órbita */}
      <section className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-14 lg:gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6 order-2 lg:order-1"
        >
          <span className="self-start px-3 py-1 rounded-full border border-amber-500/40 bg-amber-500/5 text-amber-400 text-xs font-bold uppercase tracking-[0.25em]">
            {t.tag}
          </span>
          <p className="text-lg md:text-xl text-white font-medium">{t.greeting}</p>
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-white leading-[1.15] tracking-tight">
            {t.introText.split(t.introTextHighlight).map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && <span className="text-amber-500">{t.introTextHighlight}</span>}
              </span>
            ))}
          </h2>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl">{t.summary}</p>

          <div className="flex flex-wrap gap-3">
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-sm text-gray-300">
              <MapPinIcon className="w-4 h-4 text-amber-400" />
              {t.location}
            </span>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/5 text-sm text-green-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              {t.available}
            </span>
          </div>

          <div className="flex flex-wrap gap-3 mt-2">
            <a
              href={cvHref}
              download
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] transition-all"
            >
              <ArrowDownTrayIcon className="w-5 h-5" />
              {t.downloadCV}
            </a>
            <Link
              to="/work"
              className="group flex items-center gap-2 px-5 py-3 rounded-xl border border-white/15 text-white font-bold hover:bg-white hover:text-black transition-colors"
            >
              {t.seeProjects}
              <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="order-1 lg:order-2 py-6"
        >
          <OrbitPhoto />
        </motion.div>
      </section>

      {/* Números rápidos */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 -mt-10 md:-mt-16">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6 hover:border-amber-500/40 transition-colors"
          >
            <p className="text-3xl md:text-4xl font-bold text-white">
              {s.value}
              {s.value === "8" && <span className="text-amber-500">+</span>}
            </p>
            <p className="mt-1 text-xs md:text-sm uppercase tracking-[0.15em] text-gray-500">{s.label}</p>
          </motion.div>
        ))}
      </section>

      {/* Linha do tempo */}
      <Journey lang={lang} />

      {/* O que eu amo: mosaico de fotos */}
      <section className="flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tight">{t.whatILove}</h3>
          <p className="text-gray-400 text-lg max-w-sm md:text-right">{t.lovesDesc}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] sm:auto-rows-[190px] md:auto-rows-[210px] gap-3 md:gap-4 grid-flow-dense">
          {INTERESTS.map((item, i) => (
            <motion.figure
              key={item.image}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 ${item.span}`}
            >
              <Image
                src={item.image}
                alt={item.label[lang]}
                fill
                className="object-cover grayscale-[70%] brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <figcaption className="absolute left-4 bottom-4 flex items-center gap-2 text-sm md:text-base font-semibold text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
                {item.label[lang]}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* Depoimentos */}
      <section className="flex flex-col gap-12 pt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight">
            {t.trust} <span className="text-amber-500">{t.trust2}</span> {t.trust3}
          </h2>
          <p className="text-gray-400 text-lg max-w-md md:text-right">{t.trustDesc}</p>
        </div>

        <div className="flex md:grid md:grid-cols-3 gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-2 -mx-[6%] px-[6%] md:mx-0 md:px-0">
          {TESTIMONIALS[lang].map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative snap-center shrink-0 w-[85%] sm:w-[60%] md:w-auto bg-white/[0.03] border border-white/10 p-7 md:p-8 rounded-[2rem] flex flex-col gap-6 group/card hover:shadow-[0_0_25px_rgba(245,158,11,0.2)] transition-shadow duration-300 overflow-hidden"
            >
              {/* Borda âmbar girando (marca do site) */}
              <div
                className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none"
                style={{
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  padding: "1.5px",
                }}
              >
                <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_60%,#f59e0b_90%,#fbbf24_100%)] opacity-40 group-hover/card:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="relative z-10 text-amber-500 text-5xl font-serif leading-none">&quot;</div>
              <p className="relative z-10 text-gray-300 text-base md:text-lg leading-relaxed italic">{testimonial.text}</p>
              <div className="relative z-10 flex items-center gap-4 mt-auto pt-2">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 shrink-0">
                  <Image src={testimonial.image} alt={testimonial.author} width={48} height={48} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <p className="text-white font-bold">{testimonial.author}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Convite final */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-amber-500/[0.08] via-transparent to-transparent px-8 py-14 md:px-16 md:py-16 flex flex-col md:flex-row md:items-center justify-between gap-10">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 w-80 h-80">
          <div className="absolute inset-0 rounded-full border border-amber-500/20" />
          <motion.div
            className="absolute inset-0"
            {...(reduceMotion ? {} : { animate: { rotate: 360 }, transition: { duration: 18, repeat: Infinity, ease: "linear" as const } })}
          >
            <span className="absolute left-1/2 -top-1.5 w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.9)]" />
          </motion.div>
          <div className="absolute inset-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-800 opacity-30 blur-sm" />
        </div>

        <div className="relative flex flex-col gap-3 max-w-xl">
          <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{t.ctaTitle}</h3>
          <p className="text-gray-400 text-lg">{t.ctaDesc}</p>
        </div>
        <div className="relative flex flex-col sm:flex-row gap-3 shrink-0">
          <a
            href="https://wa.me/5575991503949"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all"
          >
            <FaWhatsapp className="w-5 h-5" />
            {t.ctaWhatsapp}
          </a>
          <a
            href="mailto:schaidenunes@gmail.com"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/15 text-white font-bold hover:bg-white hover:text-black transition-colors"
          >
            <EnvelopeIcon className="w-5 h-5" />
            {t.ctaEmail}
          </a>
        </div>
      </section>
    </main>
  );
}
