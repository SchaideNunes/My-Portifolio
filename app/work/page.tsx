"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PROJECTS } from "@/constants";
import { TRANSLATIONS } from "@/constants/translations";
import { useLang } from "@/lib/lang-context";
import { SparklesIcon } from "@heroicons/react/24/solid";

export default function WorkPage() {
  const { lang } = useLang();

  return (
    <main className="h-full w-full pt-32 px-[10%] md:px-20 mb-20 flex flex-col gap-16">
      <section className="flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="Welcome-box py-[8px] px-[7px] border border-[#f59e0b8b] w-fit"
        >
          <SparklesIcon className="text-[#fbbf24] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">{TRANSLATIONS[lang].work.tag}</h1>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-white tracking-tight"
        >
          {TRANSLATIONS[lang].work.title1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-[#fbbf24]">{TRANSLATIONS[lang].work.title2}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 text-lg max-w-2xl"
        >
          {TRANSLATIONS[lang].work.desc}
        </motion.p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
        {PROJECTS[lang].map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="group cursor-pointer flex flex-col"
          >
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="block w-full">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-white/[0.02] border border-white/5 mb-6 p-6">
                <div className="relative w-full h-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-white tracking-wide group-hover:text-[#f59e0b] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <span className="text-xs font-mono text-[#f59e0b] uppercase tracking-widest">{project.timeframe}</span>
                </div>
                <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex gap-2 mt-2">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span key={i} className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          </motion.div>
        ))}
      </section>

      {/* Placeholder for more projects */}
      <section className="mt-20 py-20 border-t border-white/10 flex flex-col items-center justify-center gap-6">
        <h3 className="text-3xl text-white font-medium">{TRANSLATIONS[lang].work.more}</h3>
        <p className="text-gray-400 max-w-md text-center text-lg">
          {TRANSLATIONS[lang].work.moreDesc}
        </p>
      </section>
    </main>
  );
}
