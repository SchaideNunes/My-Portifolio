"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

import { useLang } from "@/lib/lang-context";
import { TRANSLATIONS } from "@/constants/translations";

export const SkillText = () => {
  const { lang } = useLang();

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <motion.div
        variants={slideInFromTop}
        className="relative group flex items-center py-[7px] px-[14px] rounded-full bg-[#030014]/60 border border-purple-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.15)] overflow-hidden"
      >
        {/* Masked Spinning Border */}
        <div 
          className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
          style={{
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1px"
          }}
        >
          <div className="absolute inset-[-100%] animate-[spin_3.5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_60%,#a855f7_90%,#c084fc_100%)] opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <SparklesIcon className="text-purple-400 mr-[8px] h-4 w-4 relative z-10 animate-pulse" />
        <h1 className="relative z-10 text-[13px] font-medium tracking-wide bg-gradient-to-r from-purple-200 via-white to-purple-300 bg-clip-text text-transparent">
          {TRANSLATIONS[lang].skills.badge}
        </h1>
      </motion.div>

      <motion.div
        variants={slideInFromLeft(0.5)}
        className="text-[30px] text-white font-bold mt-[10px] text-center mb-[15px] tracking-[-2%]"
      >
        {TRANSLATIONS[lang].skills.title}
      </motion.div>

      <motion.div
        variants={slideInFromRight(0.5)}
        className="text-[20px] text-gray-400 font-medium mb-10 mt-[10px] text-center tracking-[-2%]"
      >
        {TRANSLATIONS[lang].skills.subtitle}
      </motion.div>
    </div>
  );
};
