"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { PROJECTS } from "@/constants";
import { LockClosedIcon } from "@heroicons/react/24/outline";

// Componente individual para a linha de projeto
const ProjectRow = ({ project, index, activeProject, setActiveProject }: any) => {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveProject(index);
        } else {
          setActiveProject((prev: number | null) => (prev === index ? null : prev));
        }
      },
      {
        rootMargin: "-40% 0px -60% 0px",
      }
    );

    if (rowRef.current) {
      observer.observe(rowRef.current);
    }

    return () => observer.disconnect();
  }, [index, setActiveProject]);

  const isActive = activeProject === index;

  return (
    <div
      ref={rowRef}
      className={`group w-full py-8 md:py-12 px-[10%] md:px-10 flex items-center justify-between border-b border-white/10 transition-all duration-300 relative z-20 ${isActive ? "bg-white text-black" : "bg-transparent text-gray-400 hover:text-white"
        }`}
    >
      {/* Left side: Icon + Title/Description */}
      <div className="flex items-center gap-6 md:gap-12 flex-1">
        {/* Figma-like Icon Placeholder */}
        <div className="flex flex-col items-center gap-1">
          <svg className={`w-5 h-5 ${isActive ? "text-black" : "text-gray-500"}`} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
          </svg>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
            <h3 className="text-xl md:text-2xl font-medium tracking-tight">
              {project.title}
            </h3>
            <span className={`hidden md:block text-lg opacity-40`}>—</span>
            <p className="text-sm md:text-lg opacity-60 truncate max-w-[300px] md:max-w-none">
              {project.discipline}, {project.industry}
            </p>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mt-1">
            {project.technologies?.map((tech: string, idx: number) => (
              <span
                key={idx}
                className={`text-[10px] font-bold px-2 py-1 rounded border tracking-wider uppercase transition-colors ${isActive
                  ? 'border-black/20 text-black/70'
                  : 'border-white/10 text-gray-500'
                  }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* Right side: Button */}
      <div className="shrink-0 z-10 relative">
        <button
          onClick={() => window.open(project.link, "_blank")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all ${isActive
            ? "border-black text-black hover:bg-black hover:text-white"
            : "border-white/20 text-white hover:bg-white hover:text-black"
            }`}
        >
          <LockClosedIcon className="w-3 h-3" />
          Visist website
        </button>
      </div>

      {/* Floating Card bound specifically to this row (Desktop Only) */}
      <div className="hidden lg:block absolute right-[15vw] top-1/2 -translate-y-[35%] z-[50] pointer-events-none">
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-[400px] max-w-[45vw] max-h-[85vh] overflow-y-auto no-scrollbar rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col pointer-events-auto"
              style={{
                backgroundColor: project.color || "#0a0a0a",
              }}
            >
              {/* Image Area */}
              <div className="w-full aspect-[4/5] relative bg-white/5 shrink-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover p-4 rounded-[2.5rem]"
                  priority
                />
              </div>

              {/* Content Area */}
              <div className="p-6 md:p-8 flex flex-col gap-4 text-white shrink-0">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                  {project.title}
                </h2>
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const Projects = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <section id="projects" className="relative w-full z-[30] pb-10">

      {/* Header Section */}
      <div className="w-full px-[10%] md:px-10 pt-10">
        {/* Title with Curved Arrow & Scroll Indicator */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-16">
          <div className="flex items-start gap-4">
            <div className="pt-4">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-white">
                <path d="M35 10C35 10 30 10 25 15C20 20 20 35 20 35" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M15 30L20 35L25 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="text-[60px] md:text-[120px] font-medium text-white leading-none tracking-tight">
              Projects
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

      {/* DESKTOP VIEW: Project List with attached cards */}
      <div className="hidden lg:block relative w-full border-t border-white/10">

        {/* Trigger Line (Invisible) */}
        <div className="fixed top-[40%] left-0 w-full h-[1px] bg-transparent z-[100] pointer-events-none" />

        {/* Project List */}
        <div className="w-full flex flex-col">
          <div className="pt-[10vh] pb-[20vh]">
            {PROJECTS.map((project, index) => (
              <ProjectRow
                key={project.title}
                project={project}
                index={index}
                activeProject={activeProject}
                setActiveProject={setActiveProject}
              />
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div className="flex lg:hidden w-full px-[10%] flex-col gap-10 mt-10">
        {PROJECTS.map((project, index) => (
          <div key={index} className="flex flex-col gap-4 bg-white/[0.03] border border-white/10 rounded-2xl p-4">
            <div className="w-full aspect-[4/3] relative rounded-xl overflow-hidden bg-black">
              <Image src={project.image} alt={project.title} fill className="object-cover" />
            </div>
            <h3 className="text-2xl font-bold text-white">{project.title}</h3>
            <p className="text-gray-400 text-sm">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag: string, idx: number) => (
                <span key={idx} className="text-[10px] text-amber-500 font-bold border border-amber-500/30 px-2 py-1 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
