"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/constants";
import { ArrowTopRightOnSquareIcon, CodeBracketSquareIcon } from "@heroicons/react/24/outline";

const matchTechIcon = (tech: string) => {
  const t = tech.toLowerCase();
  if (t.includes("react")) return "/skills/react.png";
  if (t.includes("next")) return "/skills/next.png";
  if (t.includes("tailwind")) return "/skills/tailwind.png";
  if (t.includes("node")) return "/skills/node.png";
  if (t.includes("postgre")) return "/skills/postgresql.png";
  if (t.includes("prisma")) return "/skills/prisma.png";
  if (t.includes("framer")) return "/skills/framer.png";
  if (t.includes("mongo")) return "/skills/mongodb.png";
  if (t.includes("firebase")) return "/skills/firebase.png";
  if (t.includes("vite")) return "/skills/js.png"; 
  return null;
};

// Componente individual para a linha que monitora o quão centralizado ele está na tela
const ProjectRow = ({ project, index, activeProject, setActiveProject }: any) => {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveProject(index);
        } else {
          // Desativa o projeto se a linha sair da zona de 40% da tela
          setActiveProject((prev: number | null) => (prev === index ? null : prev));
        }
      },
      {
        // Zona de trigger exata no centro absoluto (50%) da tela
        rootMargin: "-50% 0px -50% 0px",
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
      // Fundo solido "bg-black" quando ativo para evitar transparencia
      className={`group w-full py-16 md:py-24 px-5 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between border-b transition-all duration-500 ease-out z-20 relative ${
        isActive ? "bg-black border-white/20 shadow-xl" : "bg-transparent border-white/10"
      }`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 w-full md:w-auto relative z-20">
        <CodeBracketSquareIcon className={`w-6 h-6 transition-colors duration-500 hidden md:block ${isActive ? "text-amber-500" : "text-gray-400 group-hover:text-amber-500/50"}`} />
        <h3 className={`text-2xl md:text-3xl font-semibold transition-colors duration-500 ${isActive ? "text-white" : "text-gray-400 group-hover:text-gray-200"}`}>
          {project.title}
        </h3>
      </div>

      <div 
        onClick={() => window.open(project.link, "_blank")}
        className={`mt-4 md:mt-0 flex items-center justify-between w-full md:w-auto md:p-0 rounded-full transition-colors duration-500 border relative z-30 cursor-pointer ${isActive ? "border-transparent" : "border-transparent group-hover:border-white/20"}`}
      >
        <span className="text-sm font-medium block md:hidden text-gray-300">Visit Site</span>
        <span className={`text-sm font-medium hidden md:block pr-4 transition-colors duration-500 ${isActive ? "text-amber-400" : "text-gray-400"}`}>
          VISIT PROJECT
        </span>
        <ArrowTopRightOnSquareIcon className={`w-5 h-5 transition-colors duration-500 ${isActive ? "text-amber-400" : "text-gray-400"}`} />
      </div>
    </div>
  );
};

export const Projects = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  const activeTechIcons = activeProject !== null 
    ? PROJECTS[activeProject].technologies?.map(tech => matchTechIcon(tech)).filter(Boolean) 
    : [];

  return (
    <section id="projects" className="relative w-full min-h-screen z-[30] pb-20">
      
      {/* --------- DEBUG GRID VISUAL --------- */}
      {/* --- EIXO Y (HORIZONTAL) --- */}
      <div className="fixed top-[25vh] left-0 w-full border-t border-dashed border-blue-500/50 z-[100] pointer-events-none opacity-80 flex items-center">
         <span className="text-blue-400 bg-black px-2 py-0.5 font-mono text-[10px] font-bold shadow-md transform -translate-y-1/2">Y = 25% (25vh)</span>
      </div>
      <div className="fixed top-[50vh] left-0 w-full border-t-2 border-dashed border-blue-500 z-[100] pointer-events-none opacity-80 flex items-center">
         <span className="text-blue-400 bg-black px-2 py-0.5 font-mono text-[10px] font-bold shadow-md transform -translate-y-1/2">TRIGGER START / Y = 50% (MEIO DA TELA)</span>
      </div>
      <div className="fixed top-[75vh] left-0 w-full border-t border-dashed border-blue-500/50 z-[100] pointer-events-none opacity-80 flex items-center">
         <span className="text-blue-400 bg-black px-2 py-0.5 font-mono text-[10px] font-bold shadow-md transform -translate-y-1/2">Y = 75% (75vh)</span>
      </div>

      {/* --- EIXO X (VERTICAL) --- */}
      <div className="fixed top-0 left-[25vw] h-full border-l border-dashed border-green-500/50 z-[100] pointer-events-none opacity-80 flex items-start pt-[15vh] overflow-visible">
         <span className="text-green-400 bg-black px-2 py-0.5 font-mono text-[10px] font-bold shadow-md transform -translate-x-1/2 whitespace-nowrap">X = 25%</span>
      </div>
      <div className="fixed top-0 left-[50vw] h-full border-l-2 border-dashed border-green-500 z-[100] pointer-events-none opacity-80 flex items-start pt-[15vh]">
         <span className="text-green-400 bg-black px-2 py-0.5 font-mono text-[10px] font-bold shadow-md transform -translate-x-1/2 whitespace-nowrap">X = 50% (MEIO)</span>
      </div>
      <div className="fixed top-0 left-[75vw] h-full border-l border-dashed border-green-500/50 z-[100] pointer-events-none opacity-80 flex items-start pt-[15vh]">
         <span className="text-green-400 bg-black px-2 py-0.5 font-mono text-[10px] font-bold shadow-md transform -translate-x-1/2 whitespace-nowrap">X = 75%</span>
      </div>

      {/* --- POSIÇÃO ATUAL DO CONTAINER (Vermelho) --- */}
      {/* O container está sendo empurrado pra esquerda com margin right. Em Telas grandes (lg), é lg:pr-[25vw]. */}
      <div className="fixed top-0 right-[25vw] h-full border-r-2 border-solid border-red-500 z-[100] pointer-events-none opacity-100 flex items-start pt-[20vh]">
         <span className="text-red-500 bg-black border border-red-500 px-2 py-1 font-mono text-[10px] font-bold shadow-md transform translate-x-1/2 whitespace-nowrap">LIMITE DIREITO ATUAL DO CARTÃO</span>
      </div>
      {/* ------------------------------- */}

      {/* Container Flutuante */}
      <div className="absolute inset-0 z-[40] pointer-events-none">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          
          {/* Âncora Exata: No celular (50%), no Desktop nas coordenadas exatas (58%) */}
          <div className="absolute top-[50vh] left-[50vw] md:left-[58vw] transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {activeProject !== null && activeTechIcons && activeTechIcons.length > 0 && (
                <motion.div
                  key={activeProject}
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -30 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex flex-col md:flex-row items-center gap-6"
                >
                  {/* Main Card: Imagem + Tech Stack */}
                  <div className="flex flex-col items-center gap-3 bg-[#050505] border border-white/20 rounded-3xl shadow-[0_0_50px_rgba(245,158,11,0.08)] backdrop-blur-xl overflow-hidden p-3 w-fit shrink-0">
                    {/* Imagem do Projeto */}
                    {PROJECTS[activeProject]?.image && (
                      <div className="w-[300px] h-[250px] md:w-[400px] md:h-[300px] relative rounded-2xl overflow-hidden shadow-inner bg-black">
                        <Image
                          src={PROJECTS[activeProject].image}
                          alt={PROJECTS[activeProject].title}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                    )}

                    {/* Skills (Tech Stack) */}
                    <div className="flex flex-col items-center gap-3 px-4 py-3 w-full">
                      <span className="text-xs font-semibold text-amber-500 uppercase tracking-widest">Tech Stack</span>
                      <div className="flex flex-row items-center justify-center gap-6">
                        {activeTechIcons.map((iconSrc, idx) => (
                          <div key={idx} className="relative w-10 h-10">
                            <Image src={iconSrc as string} alt="tech icon" fill className="object-contain drop-shadow-xl" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Depoimento do Cliente Separado na Direita */}
                  {(PROJECTS[activeProject] as any)?.testimonial && (
                    <div className="flex flex-col gap-2 px-6 py-6 w-[300px] md:w-[350px] h-fit bg-[#050505] border border-white/20 rounded-3xl shadow-xl backdrop-blur-xl relative overflow-hidden shrink-0 mt-4 md:mt-0">
                      <span className="absolute -top-4 -left-2 text-8xl text-white/5 font-serif select-none pointer-events-none">"</span>
                      <p className="text-sm text-gray-300 italic leading-relaxed relative z-10 px-2">
                        "{(PROJECTS[activeProject] as any).testimonial.text}"
                      </p>
                      <p className="text-xs text-amber-500 font-semibold text-right w-full mt-4 tracking-wide uppercase">
                        - {(PROJECTS[activeProject] as any).testimonial.author}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Ao invés de max-w-7xl, usando largura de 90% */}
      <div className="w-[90%] mx-auto flex flex-col items-start justify-center relative z-[20]">
        
        <div className="w-full mb-10 pt-20 flex items-center gap-4">
          <svg className="w-12 h-12 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 9h7a4 4 0 0 1 4 4v7" />
            <polyline points="12 16 16 20 20 16" />
          </svg>
          <h1 className="text-[40px] md:text-[80px] font-bold text-white tracking-[-2%] leading-none">
            Projects
          </h1>
        </div>

        <div className="w-full flex flex-col border-t border-white/20 mt-10">
          <div className="py-[15vh]">
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
    </section>
  );
};
