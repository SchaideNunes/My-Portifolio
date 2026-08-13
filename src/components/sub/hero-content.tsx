"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { DocumentDuplicateIcon, CheckIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

import { InteractiveCloud } from "./interactive-cloud";
import { useLang } from "@/lib/lang-context";
import { TRANSLATIONS } from "@/constants/translations";

gsap.registerPlugin(TextPlugin);

export const HeroContent = () => {
  const { lang } = useLang();
  const [copied, setCopied] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).__preloaderCompleted) {
      setIsReady(true);
      return;
    }

    // Timeout de fallback: se por algum motivo o preloader bugar ou for removido no futuro, a página carrega em 4.5s no máximo
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

  useEffect(() => {
    if (!isReady) return; // Inicia o GSAP APENAS DEPOIS que o preloader sumir e a animação de entrada acabar

    // Pequeno atraso para não escrever enquanto o texto ainda está deslizando pela tela
    const delayGsap = setTimeout(() => {
      // Animação de "piscar" o cursor
      gsap.to(cursorRef.current, {
        opacity: 0,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        duration: 0.5
      });

      // Palavras que serão escritas e apagadas
      const words = ["Software Engineer", "Web Designer", "Full-Stack Developer"];
      let tl = gsap.timeline({ repeat: -1 });

      words.forEach((word) => {
        tl.to(textRef.current, {
          duration: Math.max(1, word.length * 0.08),
          text: word,
          ease: "none",
        })
        .to({}, { duration: 1.5 }) // Espera
        .to(textRef.current, {
          duration: Math.max(0.5, word.length * 0.04),
          text: "",
          ease: "none",
        });
      });

      return () => {
        tl.kill();
      };
    }, 1000); // 1 segundo depois de começar a aparecer na tela

    return () => clearTimeout(delayGsap);
  }, [isReady]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("schaidenunes@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial="hidden"
      animate={isReady ? "visible" : "hidden"}
      className="flex flex-col lg:flex-row items-center justify-between px-[10%] md:px-10 lg:px-20 mt-32 md:mt-40 w-full z-[20] gap-10 lg:gap-0"
    >
      <div className="h-full w-full flex flex-col gap-6 justify-center m-auto text-start lg:w-1/2">
        {/* HUGE Name */}
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col leading-none"
        >
          <h1 className="text-[70px] md:text-[90px] lg:text-[110px] xl:text-[130px] font-black text-white tracking-tighter uppercase leading-[0.9]">SCHAIDE</h1>
          <h1 className="text-[70px] md:text-[90px] lg:text-[110px] xl:text-[130px] font-black text-[#f59e0b] tracking-tighter uppercase leading-[0.9]">NUNES</h1>
        </motion.div>

        {/* GSAP Typing Animation */}
        <motion.div
          variants={slideInFromLeft(0.7)}
          className="text-xl md:text-2xl font-medium text-gray-300 min-h-[32px] md:min-h-[40px] flex items-center"
        >
          <span className="text-white mr-2">I am a</span> <span ref={textRef} className="font-semibold text-[#f59e0b]"></span><span ref={cursorRef} className="text-[#f59e0b] ml-[2px]">|</span>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-base sm:text-lg text-gray-400 max-w-[600px] leading-relaxed"
        >
          {TRANSLATIONS[lang].hero.description}
        </motion.p>

        {/* Buttons */}
        <motion.div variants={slideInFromLeft(1)} className="flex flex-wrap items-center gap-4 mt-2">
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

      {/* Interactive Cloud — desktop only */}
      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full hidden lg:flex justify-end items-center lg:w-1/2"
      >
        <InteractiveCloud />
      </motion.div>
    </motion.div>
  );
};
