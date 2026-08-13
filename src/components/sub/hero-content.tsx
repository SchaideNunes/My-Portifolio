"use client";

import { DocumentDuplicateIcon, CheckIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Image } from "@/components/ui/image";

import {
  slideInFromLeft,
  slideInFromRight,
} from "@/lib/motion";

import { useLang } from "@/lib/lang-context";
import { TRANSLATIONS } from "@/constants/translations";

export const HeroContent = () => {
  const { lang } = useLang();
  const [copied, setCopied] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).__preloaderCompleted) {
      setIsReady(true);
      return;
    }

    const fallbackTimer = setTimeout(() => setIsReady(true), 4500);

    const handlePreloaderComplete = () => {
      setIsReady(true);
      clearTimeout(fallbackTimer);
    };

    window.addEventListener("preloaderComplete", handlePreloaderComplete);
    return () => {
      window.removeEventListener("preloaderComplete", handlePreloaderComplete);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("schaidenunes@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial="hidden"
      animate={isReady ? "visible" : "hidden"}
      className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-10 px-[10%] md:px-10 lg:px-20 mt-32 md:mt-40 w-full z-[20] min-h-[60vh]"
    >
      {/* Left Column */}
      <div className="flex flex-col justify-between h-full gap-16 lg:gap-20">
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col leading-none"
        >
          <h1 className="text-[70px] md:text-[110px] lg:text-[130px] font-black text-white tracking-tighter uppercase leading-[0.9]">SCHAIDE</h1>
          <h1 className="text-[70px] md:text-[110px] lg:text-[130px] font-black text-[#f59e0b] tracking-tighter uppercase leading-[0.9]">NUNES</h1>
        </motion.div>

        {/* Email and CV Buttons */}
        <motion.div
          variants={slideInFromLeft(0.8)}
          className="flex flex-wrap items-center gap-4 mt-auto"
        >
          <button 
            onClick={handleCopyEmail}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0300145e] hover:bg-[#f59e0b]/10 backdrop-blur-md transition-all text-gray-300 hover:text-white group border border-white/5 hover:border-[#f59e0b]/30"
          >
            {copied ? (
              <CheckIcon className="w-5 h-5 text-green-500" />
            ) : (
              <DocumentDuplicateIcon className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
            )}
            <span className="font-mono text-sm sm:text-base tracking-wide">
              {copied ? TRANSLATIONS[lang].hero.copied : TRANSLATIONS[lang].hero.copyEmail}
            </span>
          </button>

          <a 
            href="/Curriculo_Schaide_Nunes_2026.pdf" 
            download="Curriculo_Schaide_Nunes_2026.pdf"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0300145e] hover:bg-[#f59e0b]/10 backdrop-blur-md transition-all text-gray-300 hover:text-white group border border-white/5 hover:border-[#f59e0b]/30"
          >
            <ArrowDownTrayIcon className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
            <span className="font-mono text-sm sm:text-base tracking-wide">
              {TRANSLATIONS[lang].hero.downloadCV}
            </span>
          </a>
        </motion.div>
      </div>

      {/* Right Column */}
      <div className="flex flex-col justify-between items-start lg:items-end h-full gap-16 lg:gap-20 mt-4 lg:mt-0">
        <motion.div
          variants={slideInFromRight(0.5)}
          className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden relative shadow-[0_0_30px_rgba(245,158,11,0.15)] shrink-0 border border-[#f59e0b]/20"
        >
          <Image
            src="/images/about/FotoAcademia.jpeg"
            alt="Schaide Nunes"
            fill
            className="object-cover"
          />
        </motion.div>

        <motion.div
          variants={slideInFromRight(0.8)}
          className="flex flex-col max-w-[450px] relative w-full"
        >
          <div className="w-3 h-3 bg-white rounded-full mb-6" />
          <p className="text-gray-300 text-sm md:text-base leading-relaxed text-left font-medium">
            {TRANSLATIONS[lang].hero.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
