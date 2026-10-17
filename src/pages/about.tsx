"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
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

/* ------------------------------------------------------------------ */
/* Colagem "arte moderna": posição (% de um quadro 1280x1100), tamanho, */
/* giro e velocidade de parallax de cada foto no desktop                */
/* ------------------------------------------------------------------ */
const COLLAGE = [
  { image: "/images/about/SetupEldenring.webp", left: "1%", top: "1.8%", width: "21%", rotate: -6, speed: 70 },
  { image: "/images/about/ShowGuns.webp", left: "27%", top: "10.0%", width: "15%", rotate: 4, speed: -50, tall: true },
  { image: "/images/about/Carbonara.webp", left: "48%", top: "0.0%", width: "19%", rotate: -3, speed: 90 },
  { image: "/images/about/EspelhoGuns.webp", left: "74%", top: "7.3%", width: "22%", rotate: 5, speed: -40 },
  { image: "/images/about/Gatos.webp", left: "7%", top: "42.7%", width: "18%", rotate: 5, speed: -60 },
  { image: "/images/about/GatoThor.webp", left: "31%", top: "50.9%", width: "20%", rotate: -5, speed: 50 },
  { image: "/images/about/Volley.webp", left: "57%", top: "40.9%", width: "17%", rotate: 7, speed: -80 },
  { image: "/images/about/Fogueira.webp", left: "79%", top: "47.3%", width: "17%", rotate: -4, speed: 60 },
  { image: "/images/about/SelfieCarro.webp", left: "46%", top: "70.9%", width: "15%", rotate: 7, speed: -30 },
];

// Pequenas estrelas espalhadas pela colagem (essência espacial do site)
const SPARKLES = [
  { left: "24%", top: "3.6%", size: 18 },
  { left: "70%", top: "36.4%", size: 14 },
  { left: "12%", top: "80.0%", size: 16 },
  { left: "82%", top: "81.8%", size: 20 },
  { left: "40%", top: "42.7%", size: 12 },
];

/* ------------------------------------------------------------------ */
/* Jornada em "notas" soltas, com anotações à mão                       */
/* ------------------------------------------------------------------ */
const JOURNEY: Record<Lang, { year: string; title: string; text: string; note: string; tags?: string[] }[]> = {
  PT: [
    {
      year: "2023",
      title: "Primeiras linhas de código",
      text: "Decidi levar a programação a sério: estudos diários, projetos pessoais e muita lógica até o código começar a virar produto.",
      note: "onde tudo começou",
      tags: ["Python", "JavaScript", "SQL"],
    },
    {
      year: "2024",
      title: "Jovem Aprendiz – EquinoxGold",
      text: "Primeira experiência corporativa, em uma mineradora: rotinas administrativas, documentação rigorosa e trabalho com equipes multidisciplinares.",
      note: "primeiro crachá!",
    },
    {
      year: "2025",
      title: "Engenharia de Software + CMOC",
      text: "Entrei na UNIASSELVI e comecei a desenvolver soluções para a CMOC: sistemas corporativos que substituem planilhas e controles manuais da manutenção.",
      note: "código que vira ferramenta",
      tags: ["Power Apps", "Power BI", "Python"],
    },
    {
      year: "2026",
      title: "Primeiros clientes",
      text: "A plataforma da Barbearia Atual Estilo trouxe 46% mais clientes, e o site da Milena Reis fechou 8 clientes em 3 meses.",
      note: "clientes de verdade :)",
      tags: ["React", "PHP", "MySQL"],
    },
    {
      year: "2026",
      title: "Sistemas de ponta a ponta",
      text: "Flow-Zap automatizou a cobrança de uma loja pelo WhatsApp, e o Club Maravilha passou a gerir mais de 300 sócios com Pix e reservas online.",
      note: "agora é sério",
      tags: ["TypeScript", "FastAPI", "PostgreSQL"],
    },
    {
      year: "Hoje",
      title: "O próximo passo",
      text: "Mais de 10 sistemas em produção e muita vontade de continuar construindo produtos que resolvem problemas reais.",
      note: "isso é só o começo...",
    },
  ],
  EN: [
    {
      year: "2023",
      title: "First lines of code",
      text: "I decided to take programming seriously: daily study, personal projects and a lot of logic until code started turning into products.",
      note: "where it all began",
      tags: ["Python", "JavaScript", "SQL"],
    },
    {
      year: "2024",
      title: "Young Apprentice – EquinoxGold",
      text: "My first corporate experience, at a mining company: administrative workflows, strict documentation and multidisciplinary teamwork.",
      note: "first badge!",
    },
    {
      year: "2025",
      title: "Software Engineering + CMOC",
      text: "I started at UNIASSELVI and began building solutions for CMOC: enterprise systems that replace spreadsheets and manual maintenance controls.",
      note: "code that becomes tools",
      tags: ["Power Apps", "Power BI", "Python"],
    },
    {
      year: "2026",
      title: "First clients",
      text: "Atual Estilo's booking platform brought in 46% more customers, and Milena Reis's website closed 8 clients in 3 months.",
      note: "real clients :)",
      tags: ["React", "PHP", "MySQL"],
    },
    {
      year: "2026",
      title: "End-to-end systems",
      text: "Flow-Zap automated a store's billing over WhatsApp, and Club Maravilha now manages 300+ members with Pix and online booking.",
      note: "now it's serious",
      tags: ["TypeScript", "FastAPI", "PostgreSQL"],
    },
    {
      year: "Today",
      title: "The next step",
      text: "10+ systems in production and plenty of drive to keep building products that solve real problems.",
      note: "just getting started...",
    },
  ],
};

// Giro e deslocamento de cada nota no desktop, para parecerem "jogadas" na mesa
const NOTE_LAYOUT = [
  { rotate: -1.2, y: 0 },
  { rotate: 1, y: 70 },
  { rotate: -0.8, y: 20 },
  { rotate: 1.1, y: 40 },
  { rotate: -1, y: 100 },
  { rotate: 0.8, y: 30 },
];

/* Seta desenhada à mão entre as notas */
const DoodleArrow = ({ className, flip = false }: { className?: string; flip?: boolean }) => (
  <svg aria-hidden viewBox="0 0 120 60" className={className} style={flip ? { transform: "scaleX(-1)" } : undefined}>
    <path
      d="M4 40 C 30 6, 70 4, 104 26"
      fill="none"
      stroke="#f59e0b"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeDasharray="1 7"
    />
    <path d="M92 16 L106 27 L90 34" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Journey = ({ lang }: { lang: Lang }) => {
  const t = TRANSLATIONS[lang].about;
  const reduceMotion = useReducedMotion();
  const steps = JOURNEY[lang];

  return (
    <section className="flex flex-col gap-16">
      <div className="flex flex-col gap-4">
        <span className="self-start px-3 py-1 rounded-full border border-amber-500/40 bg-amber-500/5 text-amber-400 text-xs font-bold uppercase tracking-[0.25em]">
          {t.journeyTag}
        </span>
        <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
          {t.journeyTitle1} <span className="text-amber-500">{t.journeyTitle2}</span>
        </h3>
      </div>

      <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-14 gap-y-28 md:gap-y-32 pt-14 pb-16">
        {steps.map((step, i) => {
          const layout = NOTE_LAYOUT[i % NOTE_LAYOUT.length];
          const last = i === steps.length - 1;
          // Na grade de 3 colunas, a seta aponta para a direita, exceto no fim da linha
          const endOfRow = (i + 1) % 3 === 0;
          return (
            <motion.li
              key={`${step.year}-${step.title}`}
              initial={reduceMotion ? false : { opacity: 0, y: 40, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: layout.rotate }}
              whileHover={reduceMotion ? undefined : { rotate: 0, scale: 1.03 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "spring", stiffness: 120, damping: 16, delay: (i % 3) * 0.08 }}
              // Deslocamento vertical só no desktop (3 colunas), para as notas ficarem desalinhadas
              style={{ ["--offset" as string]: `${layout.y}px` }}
              className="group relative lg:mt-[var(--offset)]"
            >
              <div className="relative">
                {/* Ano gigante em contorno, atrás da nota */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-[4.6rem] md:-top-[5.2rem] -left-2 text-[88px] md:text-[104px] font-black leading-none tracking-tight text-amber-500/[0.07] [-webkit-text-stroke:2px_rgba(245,158,11,0.75)] drop-shadow-[0_0_18px_rgba(245,158,11,0.25)] select-none"
                >
                  {step.year}
                </span>

                <div className="relative rounded-2xl border border-white/10 bg-[#0b0b10]/90 backdrop-blur-sm p-6 md:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group-hover:border-amber-500/40 transition-colors">
                  {/* "Fita adesiva" segurando a nota */}
                  <span aria-hidden className="absolute -top-3 right-8 w-20 h-6 rotate-[4deg] bg-amber-200/15 border border-amber-200/20 backdrop-blur-sm" />

                  <h4 className="text-xl md:text-2xl font-semibold text-white">{step.title}</h4>
                  <p className="handwritten mt-1 text-2xl font-bold text-amber-400">{step.note}</p>
                  <p className="mt-3 text-[15px] md:text-base text-gray-300 leading-relaxed">{step.text}</p>

                  {step.tags && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {step.tags.map((tag, k) => (
                        <span
                          key={tag}
                          style={{ transform: `rotate(${k % 2 === 0 ? -2 : 2}deg)` }}
                          className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-500 text-black shadow-[0_4px_12px_rgba(245,158,11,0.3)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Setas à mão: para a direita entre colunas (desktop), para baixo no celular */}
                {!last && !endOfRow && (
                  <DoodleArrow className="hidden lg:block absolute top-1/2 -right-14 w-16 rotate-[8deg]" />
                )}
                {!last && endOfRow && (
                  <DoodleArrow className="hidden lg:block absolute -bottom-20 left-[-30%] w-28 rotate-[155deg]" flip />
                )}
                {!last && (
                  <DoodleArrow className="lg:hidden absolute -bottom-16 left-1/2 -translate-x-1/2 w-16 rotate-[100deg]" />
                )}
              </div>
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/* Foto da colagem com parallax próprio                                 */
/* ------------------------------------------------------------------ */
const CollagePhoto = ({
  item,
  progress,
  index,
}: {
  item: (typeof COLLAGE)[number];
  progress: MotionValue<number>;
  index: number;
}) => {
  const reduceMotion = useReducedMotion();
  const y = useTransform(progress, [0, 1], reduceMotion ? [0, 0] : [item.speed, -item.speed]);

  return (
    <motion.div
      style={{ left: item.left, top: item.top, width: item.width, y }}
      className="absolute"
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 0.85, rotate: 0 }}
        whileInView={{ opacity: 1, scale: 1, rotate: item.rotate }}
        whileHover={reduceMotion ? undefined : { rotate: 0, scale: 1.06, zIndex: 20 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ type: "spring", stiffness: 110, damping: 15, delay: (index % 4) * 0.07 }}
        className={`relative overflow-hidden rounded-xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.7)] hover:shadow-[0_25px_60px_rgba(245,158,11,0.25)] transition-shadow ${
          item.tall ? "aspect-[9/16]" : "aspect-[3/4]"
        }`}
      >
        <Image src={item.image} alt="" fill className="object-cover" />
      </motion.div>
    </motion.div>
  );
};

const Collage = ({ lang }: { lang: Lang }) => {
  const t = TRANSLATIONS[lang].about;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section className="flex flex-col gap-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tight">{t.whatILove}</h3>
        <p className="handwritten text-3xl md:text-4xl font-bold text-amber-400 md:text-right">{t.lovesDesc}</p>
      </div>

      {/* Desktop: fotos soltas, como uma colagem */}
      <div ref={ref} className="relative hidden lg:block aspect-[1280/1100]">
        {SPARKLES.map((s, i) => (
          <span
            key={i}
            aria-hidden
            className="absolute text-amber-400/80 animate-pulse select-none"
            style={{ left: s.left, top: s.top, fontSize: s.size, animationDelay: `${i * 0.4}s` }}
          >
            ✦
          </span>
        ))}
        {COLLAGE.map((item, i) => (
          <CollagePhoto key={item.image} item={item} progress={scrollYProgress} index={i} />
        ))}
      </div>

      {/* Celular e tablet: colunas desencontradas, levemente giradas */}
      <div className="grid lg:hidden grid-cols-2 md:grid-cols-3 gap-x-4 md:gap-x-6 gap-y-6">
        {COLLAGE.map((item, i) => (
          <div
            key={item.image}
            style={{ transform: `rotate(${item.rotate * 0.6}deg)` }}
            className={`relative overflow-hidden rounded-xl border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)] aspect-[3/4] ${
              i % 2 === 1 ? "mt-10" : ""} ${i % 3 === 1 ? "md:mt-14" : "md:mt-0"
            }`}
          >
            <Image src={item.image} alt="" fill className="object-cover" />
          </div>
        ))}
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
    { value: "10+", label: t.statSystems },
    { value: "C1", label: t.statEnglish },
    { value: "CMOC", label: t.statCmoc },
    { value: "2023", label: t.statSince },
  ];

  return (
    <main className="relative h-full w-full pt-28 md:pt-32 px-[6%] md:px-20 flex flex-col gap-28 md:gap-36 mb-20 overflow-x-hidden">
      {/* Brilho de fundo no tom do site */}
      <div aria-hidden className="pointer-events-none absolute -top-40 right-0 w-[700px] h-[500px] rounded-full bg-amber-500/10 blur-[140px]" />

      {/* Hero: texto + foto grande */}
      <section className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-14 lg:gap-16 items-center">
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

          <span className="self-start flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-sm text-gray-300">
            <MapPinIcon className="w-4 h-4 text-amber-400" />
            {t.location}
          </span>

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

        {/* Foto grande, sem moldura de órbita */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: reduceMotion ? 0 : 2 }}
          whileHover={reduceMotion ? undefined : { rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="order-1 lg:order-2 relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[480px] mx-auto"
        >
          <div aria-hidden className="absolute inset-[8%] rounded-[2rem] bg-amber-500/30 blur-[80px]" />
          <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.7)]">
            <Image src="/images/about/Selfie.webp" alt="Schaide Nunes" fill priority className="object-cover object-top" />
          </div>
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
              {s.value.replace("+", "")}
              {s.value.endsWith("+") && <span className="text-amber-500">+</span>}
            </p>
            <p className="mt-1 text-xs md:text-sm uppercase tracking-[0.15em] text-gray-500">{s.label}</p>
          </motion.div>
        ))}
      </section>

      {/* Jornada em notas soltas */}
      <Journey lang={lang} />

      {/* O que eu amo: colagem de fotos soltas */}
      <Collage lang={lang} />

      {/* Depoimentos */}
      <section className="flex flex-col gap-12 pt-4">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight">
            {t.trust} <span className="text-amber-500">{t.trust2}</span> {t.trust3}
          </h2>
          <p className="text-gray-400 text-lg max-w-md lg:text-right">{t.trustDesc}</p>
        </div>

        <div className="flex lg:grid lg:grid-cols-3 gap-5 lg:gap-6 overflow-x-auto snap-x snap-mandatory pb-2 -mx-[6%] px-[6%] md:-mx-20 md:px-20 lg:mx-0 lg:px-0">
          {TESTIMONIALS[lang].map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative snap-center shrink-0 w-[85%] sm:w-[60%] md:w-[45%] lg:w-auto bg-white/[0.03] border border-white/10 p-7 md:p-8 rounded-[2rem] flex flex-col gap-6 group/card hover:shadow-[0_0_25px_rgba(245,158,11,0.2)] transition-shadow duration-300 overflow-hidden"
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
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-amber-500/[0.08] via-transparent to-transparent px-8 py-14 md:px-16 md:py-16 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
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
            href="mailto:schaidenunes.dev@gmail.com"
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
