"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

export const SkillText = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <motion.div
        variants={slideInFromTop}
        className="Welcome-box py-[8px] px-[7px] border border-[#f59e0b8b] opacity-[0.9]]"
      >
        <SparklesIcon className="text-[#fbbf24] mr-[10px] h-5 w-5" />
        <h1 className="Welcome-text text-[13px]">
          High-end Website Architecture
        </h1>
      </motion.div>

      <motion.div
        variants={slideInFromLeft(0.5)}
        className="text-[30px] text-white font-bold mt-[10px] text-center mb-[15px] tracking-[-2%]"
      >
        Transforming Brands into Digital Assets.
      </motion.div>

      <motion.div
        variants={slideInFromRight(0.5)}
        className="text-[20px] text-gray-400 font-medium mb-10 mt-[10px] text-center tracking-[-2%]"
      >
        Exclusive design, extreme performance, and cutting-edge tech for your business.
      </motion.div>
    </div>
  );
};
