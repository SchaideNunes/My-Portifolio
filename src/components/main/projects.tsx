"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image } from "@/components/ui/image";
import { PROJECTS } from "@/constants";
import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from "@heroicons/react/24/outline";
import { ProjectGallery } from "@/components/sub/project-gallery";

import { useLang } from "@/lib/lang-context";
import { TRANSLATIONS } from "@/constants/translations";

// Texto do botão de link: site publicado ou repositório no GitHub
const linkLabel = (link: string, lang: string) => {
  const isRepo = link.includes("github.com");
  if (lang === "PT") return isRepo ? "Ver código" : "Visitar site";
  return isRepo ? "View code" : "Visit website";
};

// Componente individual para a linha de projeto
const ProjectRow = ({ project, index, activeProject, setActiveProject, lang }: any) => {
  const isActive = activeProject === index;

  const toggleProject = () => {
    setActiveProject((prev: number | null) => (prev === index ? null : index));
  };

  return (
    <div className="group w-full border-b border-white/10 transition-all duration-300 relative z-20 bg-transparent">
      {/* Header Row - Clickable to expand/collapse */}
      <div
        onClick={toggleProject}
        className={`w-full py-8 md:py-12 px-[10%] md:px-10 flex items-center justify-between cursor-pointer select-none transition-all duration-300 ${
          isActive
            ? "bg-gradient-to-r from-amber-500/[0.08] via-white/[0.02] to-transparent text-white border-l-[3px] border-amber-500"
            : "bg-transparent text-gray-400 hover:text-white border-l-[3px] border-transparent"
        }`}
      >
        {/* Left side: Icon + Title/Description */}
        <div className="flex items-center gap-6 md:gap-12 flex-1 min-w-0">
          {/* Figma-like Icon Placeholder with rotation when active */}
          <motion.div
            animate={{ rotate: isActive ? 90 : 0 }}
            transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="flex flex-col items-center gap-1 shrink-0"
          >
            <svg
              className={`w-5 h-5 transition-colors duration-300 ${
                isActive ? "text-amber-500" : "text-gray-500 group-hover:text-white"
              }`}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
            </svg>
          </motion.div>

          <div className="flex flex-col gap-2 min-w-0">
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
              <h3 className="text-xl md:text-2xl font-medium tracking-tight truncate">
                {project.title}
              </h3>
              <span className="hidden md:block text-lg opacity-40">—</span>
              <p className="text-sm md:text-lg opacity-60 truncate max-w-[300px] md:max-w-none">
                {project.discipline}, {project.industry}
              </p>
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mt-1">
              {project.technologies?.map((tech: string, idx: number) => (
                <span
                  key={idx}
                  className={`text-[10px] font-bold px-2 py-1 rounded border tracking-wider uppercase transition-colors ${
                    isActive
                      ? "border-amber-500/30 text-amber-400 bg-amber-500/5"
                      : "border-white/10 text-gray-500 group-hover:border-white/20 group-hover:text-gray-300"
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right side: Button */}
        <div className="shrink-0 z-10 relative ml-4">
          {!project.link ? (
            <span className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">
              {lang === "PT" ? "Uso interno" : "Internal tool"}
            </span>
          ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.open(project.link, "_blank");
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all ${
              isActive
                ? "border-amber-500/50 text-amber-400 bg-amber-500/10 hover:bg-amber-500 hover:text-black hover:border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                : "border-white/20 text-white hover:bg-white hover:text-black"
            }`}
          >
            {project.link.includes("github.com") ? (
              <CodeBracketIcon className="w-3.5 h-3.5" />
            ) : (
              <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
            )}
            {linkLabel(project.link, lang)}
          </button>
          )}
        </div>
      </div>

      {/* Expanded Accordion Area - Smooth & Simple Animation */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            onClick={(e) => e.stopPropagation()}
            className="overflow-hidden w-full cursor-default"
          >
            <motion.div
              initial={{ y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.35, delay: 0.05, ease: "easeOut" }}
              className="w-full py-8 md:py-10 px-[10%] md:px-10"
            >
              {/* Galeria à esquerda (tamanho contido) e descrição à direita */}
              <div className="w-full max-w-6xl mx-auto grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-10 items-start">
                <ProjectGallery gallery={project.gallery} title={project.title} link={project.link} lang={lang} />

                <div className="flex flex-col gap-6 pt-12 text-white">
                  {project.description && (
                    <p className="text-base text-gray-400 leading-relaxed">
                      {project.description}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full border border-amber-500/30 text-amber-500 text-[10px] font-bold uppercase tracking-widest bg-amber-500/5"
                    >
                      {tag}
                    </span>
                  ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Projects = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const { lang } = useLang();

  return (
    <section id="projects" className="relative w-full z-[30] pb-10">

      {/* Header Section */}
      <div className="w-full px-[10%] md:px-10 pt-10">
        {/* Title with Curved Arrow & Scroll Indicator */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-16">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="pt-2 sm:pt-3 lg:pt-4">
              <svg viewBox="0 0 40 40" fill="none" className="text-white w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10">
                <path d="M35 10C35 10 30 10 25 15C20 20 20 35 20 35" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M15 30L20 35L25 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="text-[38px] sm:text-[48px] md:text-[64px] lg:text-[110px] font-medium text-white leading-none tracking-tight">
              {TRANSLATIONS[lang].projects.title}
            </h1>
          </div>

          {/* Scroll Indicator Animation - Mini Planet */}
          <div className="hidden lg:flex relative items-center justify-center w-28 h-28 mt-4">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center text-amber-500 opacity-70"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                <path
                  id="scrollCirclePath"
                  d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                  fill="transparent"
                />
                <text className="text-[10px] font-bold tracking-[0.2em] uppercase" fill="currentColor">
                  <textPath href="#scrollCirclePath" startOffset="0%">
                    SCROLL DOWN • SCROLL DOWN •
                  </textPath>
                </text>
              </svg>
            </motion.div>
            
            {/* Core planet */}
            <div className="relative w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-700 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.5)] overflow-hidden">
               {/* Pequena textura pro planeta */}
               <div className="absolute inset-0 bg-black/20 rounded-full blur-[2px] translate-x-2 translate-y-2"></div>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP VIEW: Project List with dropdown accordion */}
      <div className="hidden lg:block relative w-full border-t border-white/10">
        <div className="w-full flex flex-col">
          <div className="pt-[10vh] pb-[20vh]">
            {PROJECTS[lang].map((project, index) => (
              <ProjectRow
                key={project.title}
                project={project}
                index={index}
                activeProject={activeProject}
                setActiveProject={setActiveProject}
                lang={lang}
              />
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE VIEW: cards com a mesma galeria (desktop/mobile + lightbox) */}
      <div className="flex lg:hidden w-full px-[10%] flex-col gap-10 mt-10">
        {PROJECTS[lang].map((project, index) => (
          <div key={index} className="flex flex-col gap-4 bg-white/[0.03] border border-white/10 rounded-2xl p-4">
            <ProjectGallery gallery={project.gallery} title={project.title} link={project.link} lang={lang} />
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-2xl font-bold text-white">{project.title}</h3>
              <span className="text-xs font-mono text-amber-500 shrink-0">{project.timeframe}</span>
            </div>
            <p className="text-gray-400 text-sm">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag: string, idx: number) => (
                <span key={idx} className="text-[10px] text-amber-500 font-bold border border-amber-500/30 px-2 py-1 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 mt-1 px-4 py-2.5 rounded-lg border border-amber-500/40 text-amber-400 text-xs font-bold uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-colors"
              >
                {project.link.includes("github.com") ? (
                  <CodeBracketIcon className="w-4 h-4" />
                ) : (
                  <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                )}
                {linkLabel(project.link, lang)}
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

