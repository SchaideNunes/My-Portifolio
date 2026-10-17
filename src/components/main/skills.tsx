"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiDocker,
  SiExpress,
  SiFastapi,
  SiGit,
  SiGreensock,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
} from "react-icons/si";
import { TbApps, TbBolt, TbChartBar, TbFileSpreadsheet, TbSql } from "react-icons/tb";

import { TRANSLATIONS } from "@/constants/translations";
import { useLang } from "@/lib/lang-context";

type Group = "languages" | "frontend" | "backend" | "data" | "corporate";
type Skill = { name: string; icon: IconType; color: string; group: Group; ring?: 0 | 1 | 2 };

// ring: 0 = núcleo (uso todo dia), 1 = uso com frequência, 2 = já usei em projetos.
// Sem ring = aparece só na lista (ferramentas corporativas).
const SKILLS: Skill[] = [
  { name: "Python", icon: SiPython, color: "#3776AB", group: "languages", ring: 0 },
  { name: "React", icon: SiReact, color: "#61DAFB", group: "frontend", ring: 0 },
  { name: "SQL", icon: TbSql, color: "#f59e0b", group: "languages", ring: 0 },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", group: "languages", ring: 0 },

  { name: "FastAPI", icon: SiFastapi, color: "#009688", group: "backend", ring: 1 },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", group: "data", ring: 1 },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", group: "languages", ring: 1 },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", group: "frontend", ring: 1 },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E", group: "backend", ring: 1 },
  { name: "MySQL", icon: SiMysql, color: "#4479A1", group: "data", ring: 1 },
  { name: "Supabase", icon: SiSupabase, color: "#3FCF8E", group: "data", ring: 1 },
  { name: "Docker", icon: SiDocker, color: "#2496ED", group: "data", ring: 1 },

  { name: "PHP", icon: SiPhp, color: "#777BB4", group: "languages", ring: 2 },
  { name: "Express", icon: SiExpress, color: "#ffffff", group: "backend", ring: 2 },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248", group: "data", ring: 2 },
  { name: "GSAP", icon: SiGreensock, color: "#88CE02", group: "frontend", ring: 2 },
  { name: "Vite", icon: SiVite, color: "#A855F7", group: "frontend", ring: 2 },
  { name: "HTML & CSS", icon: SiHtml5, color: "#E34F26", group: "frontend", ring: 2 },
  { name: "Git", icon: SiGit, color: "#F05032", group: "data", ring: 2 },
  { name: "Vercel", icon: SiVercel, color: "#ffffff", group: "data", ring: 2 },

  { name: "Power Apps", icon: TbApps, color: "#B4009E", group: "corporate" },
  { name: "Power Automate", icon: TbBolt, color: "#0066FF", group: "corporate" },
  { name: "Power BI", icon: TbChartBar, color: "#F2C811", group: "corporate" },
  { name: "Excel / VBA", icon: TbFileSpreadsheet, color: "#217346", group: "corporate" },
];

// Raio de cada órbita (% do lado do sistema) e duração de uma volta
const RINGS = [
  { radius: 21, duration: 60, reverse: false },
  { radius: 34, duration: 90, reverse: true },
  { radius: 47, duration: 130, reverse: false },
];

const GROUPS: { id: Group; key: "groupLanguages" | "groupFrontend" | "groupBackend" | "groupData" | "groupCorporate" }[] = [
  { id: "languages", key: "groupLanguages" },
  { id: "frontend", key: "groupFrontend" },
  { id: "backend", key: "groupBackend" },
  { id: "data", key: "groupData" },
  { id: "corporate", key: "groupCorporate" },
];

/* Uma tecnologia como "planeta" na órbita */
const Planet = ({ skill, angle, radius, duration, reverse, core }: {
  skill: Skill;
  angle: number;
  radius: number;
  duration: number;
  reverse: boolean;
  core: boolean;
}) => {
  const Icon = skill.icon;
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${50 + radius * Math.cos(angle)}%`, top: `${50 + radius * Math.sin(angle)}%` }}
    >
      {/* Gira ao contrário da órbita para o ícone ficar sempre em pé */}
      <div
        className="orbit-anim"
        style={{ animation: `spin ${duration}s linear infinite`, animationDirection: reverse ? "normal" : "reverse" }}
      >
        <div
          className={`group/planet relative flex items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 hover:scale-125 ${
            core
              ? "w-14 h-14 sm:w-16 sm:h-16 border-amber-500/50 bg-black/70 shadow-[0_0_25px_rgba(245,158,11,0.35)]"
              : "w-10 h-10 sm:w-12 sm:h-12 border-white/15 bg-black/60 hover:border-amber-500/50"
          }`}
          style={{ ["--brand" as string]: skill.color }}
        >
          <Icon className={`${core ? "w-7 h-7 sm:w-8 sm:h-8" : "w-5 h-5 sm:w-6 sm:h-6"} text-gray-200 group-hover/planet:text-[color:var(--brand)] transition-colors`} />
          <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-amber-500/40 bg-black px-2 py-0.5 text-[11px] text-white opacity-0 group-hover/planet:opacity-100 transition-opacity z-30">
            {skill.name}
          </span>
        </div>
      </div>
    </div>
  );
};

const OrbitSystem = () => {
  return (
    <div className="orbit-system relative w-full max-w-[560px] aspect-square mx-auto">
      {/* Brilho do "sol" central, no tom do eclipse do hero */}
      <div aria-hidden className="absolute inset-[30%] rounded-full bg-amber-500/25 blur-[60px]" />
      <div aria-hidden className="absolute inset-[44%] rounded-full bg-gradient-to-br from-amber-200 via-amber-500 to-amber-800 shadow-[0_0_60px_rgba(245,158,11,0.8),0_0_120px_rgba(245,158,11,0.4)]" />
      <div aria-hidden className="absolute inset-[42.5%] rounded-full border border-amber-300/40" />

      {RINGS.map((ring, r) => {
        const items = SKILLS.filter((s) => s.ring === r);
        return (
          <div key={r} className="absolute inset-0">
            {/* Trilha da órbita */}
            <div
              aria-hidden
              className={`absolute rounded-full border ${r === 0 ? "border-amber-500/40" : "border-dashed border-white/15"}`}
              style={{ inset: `${50 - ring.radius}%` }}
            />
            {/* Planetas girando juntos */}
            <div
              className="orbit-anim absolute inset-0"
              style={{ animation: `spin ${ring.duration}s linear infinite`, animationDirection: ring.reverse ? "reverse" : "normal" }}
            >
              {items.map((skill, i) => (
                <Planet
                  key={skill.name}
                  skill={skill}
                  angle={(i / items.length) * 2 * Math.PI + r * 0.6}
                  radius={ring.radius}
                  duration={ring.duration}
                  reverse={ring.reverse}
                  core={r === 0}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const Skills = () => {
  const { lang } = useLang();
  const t = TRANSLATIONS[lang].skills;
  const reduceMotion = useReducedMotion();

  const legend = [
    { label: t.ringCore, dot: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.9)]" },
    { label: t.ringOften, dot: "border border-white/40" },
    { label: t.ringProjects, dot: "border border-dashed border-white/30" },
  ];

  return (
    <section id="skills" className="relative w-full py-24 px-[6%] md:px-10 overflow-hidden">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-14">
        {/* Cabeçalho */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-5 max-w-3xl"
        >
          <span className="self-start px-3 py-1 rounded-full border border-amber-500/40 bg-amber-500/5 text-amber-400 text-xs font-bold uppercase tracking-[0.25em]">
            {t.badge}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.05]">
            {t.title1} <span className="text-amber-500">{t.title2}</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">{t.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-14 lg:gap-16 items-center">
          {/* Sistema solar de tecnologias */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-6"
          >
            <OrbitSystem />
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {legend.map((l) => (
                <span key={l.label} className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-gray-400">
                  <span className={`w-2.5 h-2.5 rounded-full ${l.dot}`} />
                  {l.label}
                </span>
              ))}
            </div>
            <span className="hidden lg:block text-xs text-gray-600">{t.hoverHint}</span>
          </motion.div>

          {/* Lista por categoria (leitura rápida para recrutadores) */}
          <div className="flex flex-col gap-7">
            {GROUPS.map((g, gi) => (
              <motion.div
                key={g.id}
                initial={reduceMotion ? false : { opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: gi * 0.08 }}
                className="flex flex-col gap-3"
              >
                <h3 className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-gray-300">
                  <span className="w-6 h-px bg-amber-500" />
                  {t[g.key]}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {SKILLS.filter((s) => s.group === g.id).map((skill) => {
                    const Icon = skill.icon;
                    const core = skill.ring === 0;
                    return (
                      <span
                        key={skill.name}
                        style={{ ["--brand" as string]: skill.color }}
                        className={`group/chip flex items-center gap-2 px-3 py-2 rounded-xl border text-sm transition-colors ${
                          core
                            ? "border-amber-500/50 bg-amber-500/10 text-amber-200 font-semibold"
                            : "border-white/10 bg-white/[0.03] text-gray-300 hover:border-white/25 hover:text-white"
                        }`}
                      >
                        <Icon className="w-4 h-4 text-current group-hover/chip:text-[color:var(--brand)] transition-colors" />
                        {skill.name}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
