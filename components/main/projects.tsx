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
  const rowRef = useRef<HTMLAnchorElement>(null);

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
    <Link
      ref={rowRef}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
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

      <div className={`mt-4 md:mt-0 flex items-center justify-between w-full md:w-auto md:p-0 rounded-full transition-colors duration-500 border relative z-20 ${isActive ? "border-transparent" : "border-transparent group-hover:border-white/20"}`}>
        <span className="text-sm font-medium block md:hidden text-gray-300">Visit Site</span>
        <span className={`text-sm font-medium hidden md:block pr-4 transition-colors duration-500 ${isActive ? "text-amber-400" : "text-gray-400"}`}>
          VISIT PROJECT
        </span>
        <ArrowTopRightOnSquareIcon className={`w-5 h-5 transition-colors duration-500 ${isActive ? "text-amber-400" : "text-gray-400"}`} />
      </div>
    </Link>
  );
};

export const Projects = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  const activeTechIcons = activeProject !== null 
    ? PROJECTS[activeProject].technologies?.map(tech => matchTechIcon(tech)).filter(Boolean) 
    : [];

  return (
    <section id="projects" className="relative w-full min-h-screen z-[30] pb-20">
      
      {/* --------- DEBUG LINES --------- */}
      {/* Esta linha vermelha é apenas para visualizar onde o trigger acontece (50vh, centro absoluto) */}
      <div className="fixed top-[50vh] left-0 w-full border-t-2 border-dashed border-red-500 z-[100] pointer-events-none opacity-80 flex items-center">
         <span className="text-red-500 bg-black px-2 py-1 font-mono text-xs font-bold shadow-md transform -translate-y-1/2">TRIGGER CENTER LINE (50%)</span>
      </div>
      {/* ------------------------------- */}

      {/* Container Flutuante no centro da tela */}
      <div className="absolute inset-0 z-[40] pointer-events-none">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden gap-6">
          <AnimatePresence mode="wait">
            {activeProject !== null && activeTechIcons && activeTechIcons.length > 0 && (
              <motion.div
                key={activeProject}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -30 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex flex-col items-center gap-4"
              >
                <div className="flex flex-col items-center gap-3 bg-[#050505] border border-white/20 rounded-3xl shadow-[0_0_50px_rgba(245,158,11,0.08)] backdrop-blur-xl overflow-hidden p-3 w-fit">
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
              </motion.div>
            )}
          </AnimatePresence>
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
