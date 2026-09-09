"use client";

import { motion } from "framer-motion";

import {
  slideInFromLeft,
  slideInFromRight,
} from "@/lib/motion";

import { useLang } from "@/lib/lang-context";
import { TRANSLATIONS } from "@/constants/translations";

export const SkillText = () => {
  const { lang } = useLang();

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">

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
