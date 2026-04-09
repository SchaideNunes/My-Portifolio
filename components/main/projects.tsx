"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/constants";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

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
  if (t.includes("html")) return "/skills/html.png";
  if (t.includes("css")) return "/skills/css.png";
  if (t.includes("javascript") || t.includes("js") || t.includes("vite")) return "/skills/js.png";
  return null;
};

export const Projects = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Map scroll progress (0 to 1) to horizontal movement
  // We move from 0% to -60% (adjust based on number of projects and card widths)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <section id="projects" ref={targetRef} className="relative w-full z-[30]">
      {/* ========================================================= */}
      {/* DESKTOP VIEW (>= lg): Horizontal Scroll Effect */}
      {/* ========================================================= */}
      <div className="hidden lg:block h-[300vh] relative">
        <div className="sticky top-0 h-screen flex flex-col items-start justify-center overflow-hidden">
          
          {/* TITLE SECTION (Static inside sticky) */}
          <div className="w-[90%] mx-auto mb-10 flex items-center gap-4 absolute top-20 left-1/2 -translate-x-1/2 z-[50]">
            <svg className="w-12 h-12 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 9h7a4 4 0 0 1 4 4v7" />
              <polyline points="12 16 16 20 20 16" />
            </svg>
            <h1 className="text-[40px] md:text-[80px] font-bold text-white tracking-[-2%] leading-none">
              Projects
            </h1>
          </div>

          {/* HORIZONTAL TRACK */}
          <motion.div style={{ x }} className="flex items-center gap-20 pl-[10%] pr-[20%] pt-20">
            {PROJECTS.map((project, index) => {
              const techIcons = project.technologies?.map(tech => matchTechIcon(tech)).filter(Boolean);
              
              return (
                <div key={index} className="flex flex-row items-center gap-12 shrink-0">
                  {/* Main Card: Imagem + Tech Stack */}
                  <div className="flex flex-col items-center gap-3 bg-[#050505] border border-white/20 rounded-[40px] shadow-[0_0_50px_rgba(245,158,11,0.08)] backdrop-blur-xl overflow-hidden p-4 w-[600px]">
                    {project.image && (
                      <div className="w-full h-[400px] relative rounded-[32px] overflow-hidden shadow-inner bg-black group">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Overlay on Hover */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                           <Link 
                            href={project.link} 
                            target="_blank"
                            className="px-8 py-3 bg-amber-500 text-black font-bold rounded-full flex items-center gap-2 hover:bg-amber-400 transition-colors"
                           >
                             VIEW PROJECT
                             <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                           </Link>
                        </div>
                      </div>
                    )}
                    {/* Project Title & Skills */}
                    <div className="flex flex-col items-center gap-4 px-6 py-4 w-full">
                      <h3 className="text-3xl font-bold text-white tracking-tight">{project.title}</h3>
                      <div className="flex flex-col items-center gap-2 w-full">
                        <span className="text-[10px] font-semibold text-amber-500 uppercase tracking-[0.2em]">Tech Stack</span>
                        <div className="flex flex-row items-center justify-center gap-6">
                          {techIcons?.map((iconSrc, idx) => (
                            <div key={idx} className="relative w-10 h-10 hover:scale-125 transition-transform">
                              <Image src={iconSrc as string} alt="tech icon" fill className="object-contain drop-shadow-xl" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Testimonial Panel */}
                  {(project as any).testimonial && (
                    <div className="flex flex-col gap-6 px-10 py-10 w-[400px] h-fit bg-white/[0.02] border border-white/10 rounded-[40px] shadow-2xl backdrop-blur-md relative overflow-hidden shrink-0">
                      <span className="absolute -top-6 -left-4 text-[160px] text-white/[0.03] font-serif select-none pointer-events-none">"</span>
                      <p className="text-lg text-gray-300 italic font-medium leading-relaxed relative z-10">
                        "{(project as any).testimonial.text}"
                      </p>
                      <div className="flex flex-col items-end w-full mt-4">
                        <div className="h-[2px] w-12 bg-amber-500 mb-3" />
                        <p className="text-sm text-amber-500 font-bold tracking-widest uppercase">
                          {(project as any).testimonial.author}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>

          {/* SCROLL INDICATOR (Bottom Right) */}
          <div className="absolute bottom-10 right-10 flex flex-col items-end gap-2">
             <div className="h-[1px] w-24 bg-white/20 relative overflow-hidden">
                <motion.div 
                  style={{ scaleX: scrollYProgress }} 
                  className="absolute inset-0 bg-amber-500 origin-left"
                />
             </div>
             <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Progress</span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE / TABLET VIEW (< lg): Sequential Linear Vertical Layout */}
      {/* ========================================================= */}
      <div className="flex lg:hidden w-[90%] mx-auto flex-col gap-14 relative z-[20] mt-4 border-t border-white/20 pt-10 pb-20">
        <div className="w-full flex items-center gap-4 mb-4">
          <svg className="w-10 h-10 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 9h7a4 4 0 0 1 4 4v7" />
            <polyline points="12 16 16 20 20 16" />
          </svg>
          <h1 className="text-4xl font-bold text-white">Projects</h1>
        </div>
        
        {PROJECTS.map((project, index) => {
          const techIcons = project.technologies?.map((tech) => matchTechIcon(tech)).filter(Boolean);

          return (
            <div key={index} className="flex flex-col gap-5 bg-[#050505] border border-white/10 rounded-3xl p-5 shadow-2xl backdrop-blur-md">
              {/* Image */}
              {project.image && (
                <div className="w-full h-[220px] sm:h-[350px] relative rounded-2xl overflow-hidden shadow-inner bg-black border border-white/5">
                  <Image src={project.image} alt={project.title} fill className="object-cover object-top" />
                </div>
              )}

              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-col gap-2 mt-2">
                <span className="text-[10px] font-semibold text-amber-500 uppercase tracking-widest">Tech Stack</span>
                <div className="flex flex-row items-center gap-3 overflow-x-auto pb-2">
                  {techIcons?.map((iconSrc, idx) => (
                    <div key={idx} className="relative w-8 h-8 shrink-0">
                      <Image src={iconSrc as string} alt="tech icon" fill className="object-contain" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial if exists */}
              {(project as any).testimonial && (
                <div className="mt-2 p-4 bg-white/[0.03] rounded-2xl border border-white/5 relative">
                  <span className="absolute -top-3 -left-1 text-4xl text-amber-500/20 font-serif">"</span>
                  <p className="text-xs text-gray-300 italic">"{(project as any).testimonial.text}"</p>
                  <p className="text-[10px] text-amber-500 font-semibold text-right mt-2 uppercase">- {(project as any).testimonial.author}</p>
                </div>
              )}

              {/* Button */}
              <Link href={project.link} target="_blank" className="w-full mt-2 py-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-amber-500/20 transition-all active:scale-95">
                VISIT PROJECT
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};
