"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

type SkillDataProviderProps = {
  src: string;
  name: string;
  width: number;
  height: number;
  index: number;
};

export const SkillDataProvider = ({
  src,
  name,
  width,
  height,
  index,
}: SkillDataProviderProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const animationDelay = 0.1;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      variants={imageVariants}
      animate={inView ? "visible" : "hidden"}
      custom={index}
      transition={{ delay: index * animationDelay }}
      whileHover={{ 
        scale: 1.1,
        transition: { duration: 0.2 },
        filter: "drop-shadow(0px 0px 5px rgba(251, 191, 36, 0.4))"
      }}
      className="cursor-pointer relative group flex items-center justify-center"
    >
      <Image 
        src={`/skills/${src}`} 
        width={width} 
        height={height} 
        alt={name} 
        className="transition-all duration-300"
      />
      
      {/* Tooltip on hover */}
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#000000] border border-[#f59e0b8b] text-white text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
        {name}
      </span>
    </motion.div>
  );
};
