"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { IconType } from "react-icons";
import { SiGit, SiPhp, SiSupabase, SiVercel } from "react-icons/si";
import { TbApps, TbChartBar } from "react-icons/tb";

import { Image } from "@/components/ui/image";
import { TRANSLATIONS } from "@/constants/translations";
import { useLang } from "@/lib/lang-context";

// Ícone de uma tecnologia: imagem em /images/skills ou ícone do react-icons
type Tech = { name: string; image?: string; icon?: IconType; color?: string; daily?: boolean };
type CardKey = "cardFrontend" | "cardBackend" | "cardDatabase" | "cardTools";

const CARDS: { title: (t: (typeof TRANSLATIONS)["PT"]["skills"]) => string; desc: CardKey; techs: Tech[] }[] = [
  {
    title: () => "Frontend",
    desc: "cardFrontend",
    techs: [
      { name: "React", image: "react.webp", daily: true },
      { name: "TypeScript", image: "ts.webp" },
      { name: "JavaScript", image: "js.webp" },
      { name: "Tailwind", image: "tailwind.webp" },
      { name: "GSAP", image: "gsap.svg" },
      { name: "HTML", image: "html.webp" },
      { name: "CSS", image: "css.webp" },
    ],
  },
  {
    title: () => "Backend",
    desc: "cardBackend",
    techs: [
      { name: "Python", image: "python.svg", daily: true },
      { name: "FastAPI", image: "fastapi.svg" },
      { name: "Node.js", image: "nodejs.svg" },
      { name: "Express", image: "express.svg" },
      { name: "PHP", icon: SiPhp, color: "#8892BF" },
    ],
  },
  {
    title: (t) => t.database,
    desc: "cardDatabase",
    techs: [
      { name: "SQL", image: "postgresql.webp", daily: true },
      { name: "MySQL", image: "mysql.webp" },
      { name: "MongoDB", image: "mongodb.webp" },
      { name: "Supabase", icon: SiSupabase, color: "#3FCF8E" },
    ],
  },
  {
    title: (t) => t.tools,
    desc: "cardTools",
    techs: [
      { name: "Docker", image: "docker.webp" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "Vercel", icon: SiVercel, color: "#ffffff" },
      { name: "Power Apps", icon: TbApps, color: "#D45DBF" },
      { name: "Power BI", icon: TbChartBar, color: "#F2C811" },
    ],
  },
];

const TechIcon = ({ tech, index }: { tech: Tech; index: number }) => {
  const reduceMotion = useReducedMotion();
  const Icon = tech.icon;
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="group/skill flex flex-col items-center gap-2 w-16"
    >
      <div
        className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 group-hover/skill:-translate-y-1 ${
          tech.daily
            ? "bg-amber-500/10 ring-1 ring-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.25)]"
            : "bg-white/[0.04] ring-1 ring-white/10 group-hover/skill:ring-amber-500/40"
        }`}
      >
        {tech.image ? (
          <Image src={`/images/skills/${tech.image}`} alt={tech.name} width={30} height={30} className="w-[30px] h-[30px] object-contain" />
        ) : (
          Icon && <Icon className="w-7 h-7" style={{ color: tech.color }} />
        )}
        {tech.daily && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
        )}
      </div>
      <span className={`text-[11px] text-center leading-tight ${tech.daily ? "text-amber-300 font-semibold" : "text-gray-400 group-hover/skill:text-white"} transition-colors`}>
        {tech.name}
      </span>
    </motion.div>
  );
};

export const Skills = () => {
  const { lang } = useLang();
  const t = TRANSLATIONS[lang].skills;
  const reduceMotion = useReducedMotion();

  return (
    <section id="skills" className="relative w-full py-24 px-[6%] md:px-10">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-12">
        {/* Cabeçalho */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <span className="px-3 py-1 rounded-full border border-amber-500/40 bg-amber-500/5 text-amber-400 text-xs font-bold uppercase tracking-[0.25em]">
            {t.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            {t.title1} <span className="text-amber-500">{t.title2}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl">{t.subtitle}</p>
          <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-500">
            <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
            {t.daily}
          </span>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 w-full">
          {CARDS.map((card, ci) => (
            <motion.div
              key={card.desc}
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
              className="relative flex flex-col gap-5 p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm group/card hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(245,158,11,0.18)] transition-all duration-300 overflow-hidden"
            >
              {/* Borda âmbar girando (mesmo efeito dos cards antigos) */}
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
                style={{
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  padding: "1.5px",
                }}
              >
                <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_60%,#f59e0b_90%,#fbbf24_100%)] opacity-50 group-hover/card:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Número grande ao fundo */}
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-4 -right-1 text-[90px] font-black leading-none text-transparent [-webkit-text-stroke:1px_rgba(245,158,11,0.15)] select-none"
              >
                {String(ci + 1).padStart(2, "0")}
              </span>

              <div className="relative z-10 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-amber-400 uppercase tracking-wide">{card.title(t)}</h3>
                  <span className="text-xs font-mono text-gray-500">{card.techs.length}</span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{t[card.desc]}</p>
              </div>

              <div className="relative z-10 flex flex-wrap justify-center gap-x-2 gap-y-4 pt-1">
                {card.techs.map((tech, i) => (
                  <TechIcon key={tech.name} tech={tech} index={i} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
