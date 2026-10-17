"use client";

import { motion, useReducedMotion } from "framer-motion";

import { TRANSLATIONS } from "@/constants/translations";
import { useLang } from "@/lib/lang-context";

type GroupKey = "groupLanguages" | "groupFrontend" | "groupBackend" | "groupData" | "groupCorporate";

// O que uso todos os dias (destacado no topo)
const DAILY = ["Python", "React", "SQL"];

// Tecnologias por categoria, só o que aparece nos projetos
const GROUPS: { key: GroupKey; items: string[] }[] = [
  { key: "groupLanguages", items: ["Python", "SQL", "TypeScript", "JavaScript", "PHP"] },
  { key: "groupFrontend", items: ["React", "Tailwind CSS", "GSAP"] },
  { key: "groupBackend", items: ["FastAPI", "Node.js", "APIs REST"] },
  { key: "groupData", items: ["PostgreSQL", "MySQL", "MongoDB", "Docker"] },
  { key: "groupCorporate", items: ["Power Apps", "Power Automate", "Power BI"] },
];

export const Skills = () => {
  const { lang } = useLang();
  const t = TRANSLATIONS[lang].skills;
  const reduceMotion = useReducedMotion();

  return (
    <section id="skills" className="relative w-full py-24 px-[6%] md:px-10">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="max-w-[1100px] mx-auto flex flex-col gap-14"
      >
        {/* Cabeçalho */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="flex flex-col gap-5">
            <span className="self-start px-3 py-1 rounded-full border border-amber-500/40 bg-amber-500/5 text-amber-400 text-xs font-bold uppercase tracking-[0.25em]">
              {t.badge}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.1]">
              {t.title1} <span className="text-amber-500">{t.title2}</span>
            </h2>
          </div>
          <p className="text-gray-400 text-lg leading-relaxed max-w-md lg:text-right">{t.subtitle}</p>
        </div>

        {/* Dia a dia */}
        <div className="flex flex-wrap items-baseline gap-x-4 sm:gap-x-6 gap-y-2 border-y border-white/10 py-6">
          <span className="w-full sm:w-auto text-xs font-bold uppercase tracking-[0.2em] text-gray-500">{t.daily}</span>
          {DAILY.map((name, i) => (
            <span key={name} className="text-2xl md:text-3xl font-bold text-white">
              {name}
              {i < DAILY.length - 1 && <span className="ml-4 sm:ml-6 text-amber-500">·</span>}
            </span>
          ))}
        </div>

        {/* Categorias em colunas de texto */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-10">
          {GROUPS.map((group) => (
            <div key={group.key} className="flex flex-col gap-3">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">{t[group.key]}</h3>
              <ul className="flex flex-col gap-2">
                {group.items.map((item) => (
                  <li key={item} className="text-gray-300">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
