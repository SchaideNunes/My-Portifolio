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
      className={`group w-full py-8 md:py-12 px-5 md:px-10 flex items-center justify-between border-b border-white/10 transition-all duration-300 relative z-20 ${
        isActive ? "bg-white text-black" : "bg-transparent text-gray-400 hover:text-white"
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
        
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
          <h3 className="text-xl md:text-2xl font-medium tracking-tight">
            {project.title}
          </h3>
          <span className={`hidden md:block text-lg opacity-40`}>—</span>
          <p className="text-sm md:text-lg opacity-60 truncate max-w-[300px] md:max-w-none">
            {project.discipline}, {project.industry}
          </p>
        </div>
      </div>

      {/* Right side: Button */}
      <div className="shrink-0">
        <button
          onClick={() => window.open(project.link, "_blank")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all ${
            isActive 
            ? "border-black text-black hover:bg-black hover:text-white" 
            : "border-white/20 text-white hover:bg-white hover:text-black"
          }`}
        >
          <LockClosedIcon className="w-3 h-3" />
          Contact for details
        </button>
      </div>
    </div>
  );
};

export const Projects = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <section id="projects" className="relative w-full z-[30] pb-40">
      
      {/* Header Section */}
      <div className="w-full px-5 md:px-10 pt-10">
        {/* Title with Curved Arrow */}
        <div className="flex items-start gap-4 mb-16">
          <div className="pt-4">
             <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-white">
                <path d="M35 10C35 10 30 10 25 15C20 20 20 35 20 35" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                <path d="M15 30L20 35L25 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
          </div>
          <h1 className="text-[60px] md:text-[120px] font-medium text-white leading-none tracking-tight">
            Projects
          </h1>
        </div>

        {/* Metadata Header Bar */}
        <div className="grid grid-cols-4 w-full border-t border-white/20 pt-4 pb-2">
           <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Timeframe</span>
           <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Discipline</span>
           <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Tools</span>
           <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Industry</span>
        </div>
        <div className="grid grid-cols-4 w-full pb-8">
           <span className="text-xs text-white/60">Year 2023-24</span>
           <span className="text-xs text-white/60">Product Design, Web</span>
           <span className="text-xs text-white/60">Framer, Next.js</span>
           <span className="text-xs text-white/60">Tech, SaaS</span>
        </div>
      </div>

      {/* DESKTOP VIEW: Sticky Popup + Project List */}
      <div className="hidden lg:block relative w-full h-full border-t border-white/10">
        
        {/* Trigger Line (Subtle) */}
        <div className="fixed top-[40%] left-0 w-full h-[1px] bg-white/5 z-[100] pointer-events-none" />

        {/* Floating Container (Popup) */}
        <div className="absolute inset-0 z-[40] pointer-events-none">
          <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
            <AnimatePresence mode="wait">
              {activeProject !== null && (
                <motion.div
                  key={activeProject}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -40, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "circOut" }}
                  className="w-[450px] overflow-hidden rounded-2xl shadow-2xl flex flex-col pointer-events-auto"
                  style={{ backgroundColor: PROJECTS[activeProject].color || "#ffffff" }}
                >
                  {/* Image Area */}
                  <div className="w-full aspect-[4/5] relative bg-black/10">
                    <Image
                      src={PROJECTS[activeProject].image}
                      alt={PROJECTS[activeProject].title}
                      fill
                      className="object-cover p-6 rounded-[2.5rem]"
                    />
                  </div>
                  
                  {/* Content Area */}
                  <div className="p-8 flex flex-col gap-4 text-black">
                    <h2 className="text-3xl font-bold tracking-tight">
                      {PROJECTS[activeProject].title}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {PROJECTS[activeProject].tags.map((tag, idx) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1 rounded-full border border-black/20 text-[10px] font-bold uppercase tracking-widest"
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

        {/* Project List */}
        <div className="w-full flex flex-col">
          <div className="pt-[10vh] pb-[40vh]">
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
      <div className="flex lg:hidden w-full px-5 flex-col gap-10 mt-10">
        {PROJECTS.map((project, index) => (
          <div key={index} className="flex flex-col gap-4 bg-white/[0.03] border border-white/10 rounded-2xl p-4">
             <div className="w-full aspect-[4/3] relative rounded-xl overflow-hidden bg-black">
                <Image src={project.image} alt={project.title} fill className="object-cover" />
             </div>
             <h3 className="text-2xl font-bold text-white">{project.title}</h3>
             <p className="text-gray-400 text-sm">{project.description}</p>
             <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
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
