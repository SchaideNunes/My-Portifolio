"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  animate,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import {
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { FaWhatsapp } from "react-icons/fa";

import { PROJECTS } from "@/constants";
import { TRANSLATIONS } from "@/constants/translations";
import { useLang } from "@/lib/lang-context";
import { Lightbox } from "@/components/sub/project-gallery";

type Project = (typeof PROJECTS)["PT"][number];
type Category = "all" | "fullstack" | "web" | "corporate";
type Viewer = { project: Project; mode: "desktop" | "mobile"; index: number } | null;
type T = (typeof TRANSLATIONS)["PT"]["work"];

// Categoria derivada da disciplina do projeto (evita duplicar dados)
const categoryOf = (project: Project): Exclude<Category, "all"> => {
  const d = project.discipline.toLowerCase();
  if (d.includes("low-code")) return "corporate";
  if (d.includes("design")) return "web";
  return "fullstack";
};

const isRepo = (link: string) => link.includes("github.com");

/* ------------------------------------------------------------------ */
/* Contador animado dos números do topo                                 */
/* ------------------------------------------------------------------ */
const Counter = ({ value, label, delay }: { value: number; label: string; delay: number }) => {
  const [display, setDisplay] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.4,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [value, delay, reduceMotion]);

  return (
    <div className="flex flex-col">
      <span className="text-3xl md:text-5xl font-bold text-white tabular-nums">
        {display}
        <span className="text-amber-500">+</span>
      </span>
      <span className="mt-1 text-[10px] md:text-sm uppercase tracking-[0.15em] md:tracking-[0.2em] text-gray-500">{label}</span>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Card com brilho que segue o mouse e telas em rotação no hover       */
/* ------------------------------------------------------------------ */
const ProjectCard = ({
  project,
  index,
  featured,
  t,
  onOpen,
  register,
}: {
  project: Project;
  index: number;
  featured: boolean;
  t: T;
  onOpen: (mode: "desktop" | "mobile", index?: number) => void;
  register: (el: HTMLDivElement | null) => void;
}) => {
  const reduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [shot, setShot] = useState(0);

  const desktop = project.gallery.desktop;
  const mobile = project.gallery.mobile;

  // Ao passar o mouse, as telas do projeto vão se alternando
  useEffect(() => {
    if (!hovered || reduceMotion || desktop.length < 2) return;
    const timer = setInterval(() => setShot((s) => (s + 1) % desktop.length), 1300);
    return () => clearInterval(timer);
  }, [hovered, reduceMotion, desktop.length]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const onLeave = () => {
    setHovered(false);
    setShot(0);
  };

  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={register}
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`relative z-10 ${featured ? "lg:col-span-2" : ""}`}
    >
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onLeave}
        className="group relative h-full rounded-2xl p-px bg-white/10"
      >
        {/* Borda âmbar que acompanha o cursor (só no hover) */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 [background:radial-gradient(400px_circle_at_var(--mx,50%)_var(--my,0%),rgba(245,158,11,0.7),transparent_45%)]" />

        {/* Brilho âmbar que acompanha o cursor, por dentro do card */}
        <div className="pointer-events-none absolute inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 [background:radial-gradient(420px_circle_at_var(--mx,50%)_var(--my,0%),rgba(245,158,11,0.12),transparent_60%)] z-10" />

        <div
          className={`relative h-full rounded-2xl bg-[#07070a]/95 backdrop-blur-sm overflow-hidden flex flex-col ${
            featured ? "lg:grid lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]" : ""
          }`}
        >
          {/* Número grande em contorno, ao fundo */}
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-6 right-4 text-[120px] md:text-[150px] font-black leading-none text-transparent [-webkit-text-stroke:1px_rgba(245,158,11,0.18)] select-none"
          >
            {number}
          </span>

          {/* Vitrine: telas desktop em rotação + celular saindo pelo canto */}
          <div className={`relative ${featured ? "p-5 lg:p-8" : "p-5 pb-0"}`}>
            <button
              onClick={() => onOpen("desktop", shot)}
              aria-label={`${t.viewScreens}: ${project.title}`}
              className="relative block w-full rounded-xl overflow-hidden border border-white/10 bg-neutral-950 cursor-zoom-in"
            >
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10 bg-white/[0.03]">
                <span className="w-2 h-2 rounded-full bg-red-500/70" />
                <span className="w-2 h-2 rounded-full bg-amber-500/70" />
                <span className="w-2 h-2 rounded-full bg-green-500/70" />
                {/* Indicador de qual tela está aparecendo */}
                <div className="ml-auto flex gap-1">
                  {desktop.map((src, i) => (
                    <span
                      key={src}
                      className={`h-1 rounded-full transition-all duration-500 ${i === shot ? "w-4 bg-amber-500" : "w-1 bg-white/20"}`}
                    />
                  ))}
                </div>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={desktop[shot]}
                    src={desktop[shot]}
                    alt={project.title}
                    loading={featured ? "eager" : "lazy"}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 text-[11px] text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <PhotoIcon className="w-3.5 h-3.5 text-amber-400" />
                  {desktop.length + mobile.length} {t.screens}
                </span>
              </div>
            </button>

            {mobile.length > 0 && (
              <motion.button
                onClick={() => onOpen("mobile", 0)}
                aria-label={`${t.viewScreens} (mobile): ${project.title}`}
                whileHover={reduceMotion ? undefined : { y: -6, rotate: 0 }}
                className={`absolute z-20 p-1 rounded-[18px] bg-neutral-900 border border-white/15 shadow-[0_15px_40px_rgba(0,0,0,0.7)] rotate-[6deg] group-hover:rotate-0 transition-transform duration-500 cursor-zoom-in ${
                  featured ? "w-[22%] -bottom-2 right-2 md:right-3" : "w-[24%] -bottom-6 right-2"
                }`}
              >
                <div className="relative overflow-hidden rounded-[14px] aspect-[390/844] bg-black">
                  <img src={mobile[0]} alt="" loading="lazy" className="w-full h-full object-cover object-top" />
                </div>
              </motion.button>
            )}
          </div>

          {/* Informações */}
          <div className={`relative z-10 flex flex-col gap-3 ${featured ? "p-6 pt-8 lg:p-8 lg:pl-2 justify-center" : "p-6 pt-8"}`}>
            {featured && (
              <span className="self-start flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-400 text-[11px] font-bold uppercase tracking-widest">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
                </span>
                {t.featured}
              </span>
            )}

            <div className="flex items-baseline justify-between gap-3 pr-[26%] lg:pr-0">
              <h3
                className={`font-semibold text-white tracking-tight group-hover:text-amber-400 transition-colors duration-300 ${
                  featured ? "text-3xl md:text-4xl" : "text-2xl"
                }`}
              >
                {project.title}
              </h3>
              <span className="text-xs font-mono text-amber-500 tracking-widest shrink-0">{project.timeframe}</span>
            </div>
            <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
              {project.discipline} · {project.industry}
            </p>
            <p className={`text-gray-400 leading-relaxed ${featured ? "text-base" : "text-sm line-clamp-3"}`}>
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border border-white/10 text-gray-400 group-hover:border-amber-500/30 group-hover:text-amber-400 transition-colors duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-3">
              <button
                onClick={() => onOpen("desktop", 0)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-black text-xs font-bold uppercase tracking-widest hover:bg-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all"
              >
                <PhotoIcon className="w-4 h-4" />
                {t.viewScreens}
              </button>
              {mobile.length > 0 && (
                <button
                  onClick={() => onOpen("mobile", 0)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/15 text-gray-300 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                >
                  <DevicePhoneMobileIcon className="w-4 h-4" />
                  Mobile
                </button>
              )}
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-amber-500/40 text-amber-400 text-xs font-bold uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-colors"
                >
                  {isRepo(project.link) ? <CodeBracketIcon className="w-4 h-4" /> : <ArrowTopRightOnSquareIcon className="w-4 h-4" />}
                  {isRepo(project.link) ? t.viewCode : t.visitSite}
                </a>
              ) : (
                <span className="flex items-center px-3 py-2 rounded-lg border border-white/10 text-gray-500 text-xs font-bold uppercase tracking-widest">
                  {t.internal}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/* Constelação: linha orbital ligando os projetos, com estrelas nos     */
/* pontos de conexão e um cometa que percorre o caminho com o scroll    */
/* ------------------------------------------------------------------ */
type Point = { x: number; y: number };
type Box = { left: number; top: number; width: number; height: number };
type Geometry = { d: string; nodes: Point[]; planets: Point[]; width: number; height: number };

// Liga dois cards pelo vão entre eles: lado a lado (mesma linha) ou de cima para baixo
const segmentBetween = (a: Box, b: Box) => {
  const { left: ax, top: ay } = a;
  const { left: bx, top: by } = b;

  if (Math.abs(ay - by) < 24 && bx > ax) {
    const p1 = { x: ax + a.width, y: ay + a.height * 0.45 };
    const p2 = { x: bx, y: by + b.height * 0.45 };
    // Vão estreito entre colunas: linha reta com um pequeno planeta no meio
    const planet = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
    return { p1, p2, planet, d: `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}` };
  }

  const p1 = { x: ax + a.width / 2, y: ay + a.height };
  const p2 = { x: bx + b.width / 2, y: by };
  const dy = p2.y - p1.y;
  return { p1, p2, planet: null, d: `M ${p1.x} ${p1.y} C ${p1.x} ${p1.y + dy * 0.75}, ${p2.x} ${p2.y - dy * 0.75}, ${p2.x} ${p2.y}` };
};

const Constellation = ({
  containerRef,
  cards,
  version,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  cards: React.MutableRefObject<Map<string, HTMLDivElement>>;
  version: string;
}) => {
  const reduceMotion = useReducedMotion();
  const [geo, setGeo] = useState<Geometry | null>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const cometRef = useRef<SVGGElement>(null);

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    // offsetTop/offsetLeft dão a posição real no layout, sem as transformações das animações
    const rects: Box[] = version
      .split("|")
      .map((key) => cards.current.get(key))
      .filter((el): el is HTMLDivElement => !!el)
      .map((el) => ({ left: el.offsetLeft, top: el.offsetTop, width: el.offsetWidth, height: el.offsetHeight }));

    const parts: string[] = [];
    const nodes: Point[] = [];
    const planets: Point[] = [];
    for (let i = 0; i < rects.length - 1; i++) {
      const seg = segmentBetween(rects[i], rects[i + 1]);
      parts.push(seg.d);
      nodes.push(seg.p1, seg.p2);
      if (seg.planet) planets.push(seg.planet);
    }
    setGeo({ d: parts.join(" "), nodes, planets, width: container.offsetWidth, height: container.offsetHeight });
  }, [containerRef, cards, version]);

  // Remede quando o layout muda (resize, filtro, imagens carregando)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(() => measure());
    observer.observe(container);
    const settle = setTimeout(measure, 650); // depois das animações de layout dos cards
    return () => {
      observer.disconnect();
      clearTimeout(settle);
    };
  }, [containerRef, measure]);

  // Progresso do scroll pela grade: desenha a linha e move o cometa
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 70%", "end 70%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  useMotionValueEvent(progress, "change", (v) => {
    const path = pathRef.current;
    const comet = cometRef.current;
    if (!path || !comet) return;
    const length = path.getTotalLength();
    if (!length) return;
    const p = path.getPointAtLength(Math.min(Math.max(v, 0), 1) * length);
    comet.setAttribute("transform", `translate(${p.x} ${p.y})`);
    comet.style.opacity = v > 0.005 && v < 0.995 ? "1" : "0";
  });

  if (!geo || !geo.d) return null;

  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 overflow-visible"
      width={geo.width}
      height={geo.height}
      viewBox={`0 0 ${geo.width} ${geo.height}`}
    >
      <defs>
        <linearGradient id="orbit-line" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        <radialGradient id="orbit-planet" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="55%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#451a03" />
        </radialGradient>
        <filter id="orbit-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Trajetória pontilhada (sempre visível, bem sutil) */}
      <path d={geo.d} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeDasharray="2 7" strokeLinecap="round" />

      {/* Trecho já percorrido: acende conforme o scroll */}
      <motion.path
        ref={pathRef}
        d={geo.d}
        fill="none"
        stroke="url(#orbit-line)"
        strokeWidth="1.5"
        strokeLinecap="round"
        filter="url(#orbit-glow)"
        style={{ pathLength: reduceMotion ? 1 : progress }}
        opacity={0.85}
      />

      {/* Estrelas nos pontos de conexão */}
      {geo.nodes.map((n, i) => (
        <g key={i} transform={`translate(${n.x} ${n.y})`}>
          <circle r="7" fill="rgba(245,158,11,0.15)" />
          <circle r="3" fill="#fff7d6" filter="url(#orbit-glow)" />
          {/* brilho em cruz, como uma estrela */}
          <path d="M -7 0 L 7 0 M 0 -7 L 0 7" stroke="rgba(253,230,138,0.6)" strokeWidth="0.8" strokeLinecap="round" />
        </g>
      ))}

      {/* Pequenos planetas com anel nos vãos entre colunas */}
      {geo.planets.map((p, i) => (
        <g key={`planet-${i}`} transform={`translate(${p.x} ${p.y})`}>
          <circle r="14" fill="rgba(245,158,11,0.12)" filter="url(#orbit-glow)" />
          <ellipse rx="13" ry="4" fill="none" stroke="rgba(253,230,138,0.45)" strokeWidth="1" transform="rotate(-20)" />
          <circle r="6" fill="url(#orbit-planet)" />
          <path d="M -12.2 -0.3 A 13 4 -20 0 0 12.2 0.3" fill="none" stroke="rgba(253,230,138,0.85)" strokeWidth="1.2" transform="rotate(-20)" />
        </g>
      ))}

      {/* Cometa que percorre a constelação */}
      {!reduceMotion && (
        <g ref={cometRef} style={{ opacity: 0, transition: "opacity 0.3s" }}>
          <circle r="10" fill="rgba(251,191,36,0.25)" filter="url(#orbit-glow)" />
          <circle r="4" fill="#ffffff" filter="url(#orbit-glow)" />
        </g>
      )}
    </svg>
  );
};

export default function WorkPage() {
  const { lang } = useLang();
  const t = TRANSLATIONS[lang].work;
  const projects = PROJECTS[lang];
  const [category, setCategory] = useState<Category>("all");
  const [viewer, setViewer] = useState<Viewer>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardEls = useRef(new Map<string, HTMLDivElement>());

  const filters: { id: Category; label: string }[] = [
    { id: "all", label: t.filterAll },
    { id: "fullstack", label: t.filterFullstack },
    { id: "web", label: t.filterWeb },
    { id: "corporate", label: t.filterCorporate },
  ];
  const countOf = (id: Category) => (id === "all" ? projects.length : projects.filter((p) => categoryOf(p) === id).length);
  const visible = projects.filter((p) => category === "all" || categoryOf(p) === category);

  // Números do topo. Clientes: Atual Estilo, Milena Reis, A&V Store (Flow-Zap),
  // Club Maravilha e Açaí no Kilo (cardápio + landing são do mesmo cliente).
  const clients = 5;
  // Anos desde que comecei a programar com foco (2023)
  const years = new Date().getFullYear() - 2023;

  return (
    <main className="relative h-full w-full pt-32 px-[6%] md:px-20 mb-20 flex flex-col gap-14 overflow-x-hidden">
      {/* Brilho de fundo, no tom do eclipse do hero */}
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-amber-500/10 blur-[140px]" />

      {/* Cabeçalho */}
      <section className="relative flex flex-col gap-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="self-start px-3 py-1 rounded-full border border-amber-500/40 bg-amber-500/5 text-amber-400 text-xs font-bold uppercase tracking-[0.25em]"
        >
          {t.tag}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[0.95]"
        >
          {t.title1}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#f59e0b] bg-[length:200%_auto] animate-[shine_6s_linear_infinite]">
            {t.title2}
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 text-lg max-w-2xl"
        >
          {t.desc}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-3 gap-4 md:flex md:gap-16 mt-4 pt-6 border-t border-white/10"
        >
          <Counter value={projects.length} label={t.statProjects} delay={0.6} />
          <Counter value={clients} label={t.statClients} delay={0.75} />
          <Counter value={years} label={t.statYears} delay={0.9} />
        </motion.div>
      </section>

      {/* Filtros */}
      <div className="relative flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setCategory(f.id)}
            aria-pressed={category === f.id}
            className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              category === f.id ? "text-black" : "text-gray-400 hover:text-white border border-white/10"
            }`}
          >
            {category === f.id && (
              <motion.span
                layoutId="work-filter"
                className="absolute inset-0 rounded-full bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">
              {f.label} <span className="opacity-60 tabular-nums">{countOf(f.id)}</span>
            </span>
          </button>
        ))}
      </div>

      {/* Grade de projetos, ligada pela constelação */}
      <LayoutGroup>
        <section
          ref={gridRef}
          className="relative grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-24 lg:gap-y-28 pt-4"
        >
          <Constellation containerRef={gridRef} cards={cardEls} version={visible.map((p) => p.title).join("|")} />
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={projects.indexOf(project)}
                featured={category === "all" && i === 0}
                t={t}
                onOpen={(mode, index = 0) => setViewer({ project, mode, index })}
                register={(el) => {
                  if (el) cardEls.current.set(project.title, el);
                  else cardEls.current.delete(project.title);
                }}
              />
            ))}
          </AnimatePresence>
        </section>
      </LayoutGroup>

      {/* Convite final */}
      <section className="relative mt-16 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-amber-500/[0.08] via-transparent to-transparent px-8 py-16 md:px-16 md:py-20 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        {/* Planeta orbitando, como o indicador da home */}
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 w-80 h-80">
          <div className="absolute inset-0 rounded-full border border-amber-500/20" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <span className="absolute left-1/2 -top-1.5 w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.9)]" />
          </motion.div>
          <div className="absolute inset-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-800 opacity-30 blur-sm" />
        </div>

        <div className="relative flex flex-col gap-3 max-w-xl">
          <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{t.ctaTitle}</h3>
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

      <AnimatePresence>
        {viewer && (
          <Lightbox
            images={viewer.project.gallery[viewer.mode]}
            index={viewer.index}
            mode={viewer.mode}
            title={viewer.project.title}
            lang={lang}
            onClose={() => setViewer(null)}
            onChange={(index) => setViewer((v) => (v ? { ...v, index } : v))}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
