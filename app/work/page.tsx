"use client";

import { motion } from "framer-motion";
import { PROJECTS } from "@/constants";
import { ProjectCard } from "@/components/sub/project-card";
import { SparklesIcon } from "@heroicons/react/24/solid";

export default function WorkPage() {
  return (
    <main className="h-full w-full pt-32 px-[10%] md:px-20 mb-20 flex flex-col gap-16">
      <section className="flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="Welcome-box py-[8px] px-[7px] border border-[#f59e0b8b] w-fit"
        >
          <SparklesIcon className="text-[#fbbf24] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">My Work</h1>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-white tracking-tight"
        >
          Recent <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-[#fbbf24]">Projects</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 text-lg max-w-2xl"
        >
          A selection of projects I&apos;ve worked on recently, ranging from web applications to branding and design.
        </motion.p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <ProjectCard
              src={project.image}
              title={project.title}
              description={project.description}
              link={project.link}
            />
          </motion.div>
        ))}
      </section>

      {/* Placeholder for more projects */}
      <section className="mt-20 py-20 border-t border-white/10 flex flex-col items-center justify-center gap-6">
        <h3 className="text-3xl text-white font-medium">More coming soon...</h3>
        <p className="text-gray-400 max-w-md text-center text-lg">
          I&apos;m constantly working on new things. Check back later for more updates!
        </p>
      </section>
    </main>
  );
}
