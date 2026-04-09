"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

import { InteractiveCloud } from "./interactive-cloud";

export const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col lg:flex-row items-center justify-center px-5 md:px-10 lg:px-20 mt-32 md:mt-40 w-full z-[20] gap-10 lg:gap-0"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
        {/* Badge — hide on small mobile */}
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#f59e0b8b] opacity-[0.9] hidden sm:inline-flex"
        >
          <SparklesIcon className="text-[#fbbf24] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">
            Schaide Nunes | Web Developer &amp; Software Engineer
          </h1>
        </motion.div>

        {/* Headline */}
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-2 lg:mt-6 text-4xl sm:text-5xl lg:text-[70px] font-bold text-white max-w-[600px] tracking-[-2%] leading-[1.1]"
        >
          <span>
            Providing{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-[#fbbf24]">
              creative, hand-coded
            </span>{" "}
            digital solutions.
          </span>
        </motion.div>

        {/* Description — hide on mobile, show sm+ */}
        <motion.p
          variants={slideInFromLeft(0.8)}
          className="hidden sm:block text-lg text-gray-400 my-5 max-w-[600px] leading-relaxed"
        >
          Software Engineering student from Bahia, Brazil. Specialized in crafting 
          high-performance web experiences with React, Node.js, and AWS. 
          Bilingual (EN/PT) and focused on professional UI/UX systems.
        </motion.p>
      </div>

      {/* Interactive Cloud — desktop only */}
      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full hidden lg:flex justify-center items-center"
      >
        <InteractiveCloud />
      </motion.div>
    </motion.div>
  );
};
