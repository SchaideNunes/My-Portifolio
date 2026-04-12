"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { DocumentDuplicateIcon, CheckIcon } from "@heroicons/react/24/outline";
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

gsap.registerPlugin(TextPlugin);

export const HeroContent = () => {
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
      const words = ["Schaide Nunes", "Web Developer", "Software Engineer"];
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
    navigator.clipboard.writeText("schaidenunes.dev@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial="hidden"
      animate={isReady ? "visible" : "hidden"}
      className="flex flex-col lg:flex-row items-center justify-center px-[10%] md:px-10 lg:px-20 mt-32 md:mt-40 w-full z-[20] gap-10 lg:gap-0"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
        {/* Badge - Boas-vindas */}
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#f59e0b8b] w-fit hidden sm:flex"
        >
          <SparklesIcon className="text-[#fbbf24] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">
            Schaide Nunes | Web Developer &amp; Software Engineer
          </h1>
        </motion.div>

        {/* Headline com animação GSAP */}
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-2 mt-2 lg:mt-6 text-4xl sm:text-5xl lg:text-[50px] font-bold text-white max-w-[600px] tracking-[-2%] leading-[1.1] min-h-[90px] sm:min-h-[110px] lg:min-h-[130px]"
        >
          <span>
            Hi, I&apos;m
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] inline-block whitespace-nowrap">
              <span ref={textRef}></span><span ref={cursorRef} className="text-[#f59e0b] -ml-1">|</span>
            </span>
          </span>
        </motion.div>

        {/* Description - Agora visível em todas as telas */}
        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-base sm:text-lg text-gray-400 my-2 max-w-[600px] leading-relaxed"
        >
          Software Engineering student from Bahia, Brazil. Specialized in crafting 
          high-performance web experiences with React, Node.js, and AWS. 
          Bilingual (EN/PT) and focused on professional UI/UX systems.
        </motion.p>

        {/* E-mail copiável */}
        <motion.div variants={slideInFromLeft(1)}>
          <button 
            onClick={handleCopyEmail}
            className="flex items-center gap-3 px-4 py-3 mt-2 rounded-xl bg-[#0300145e] hover:bg-[#f59e0b]/10 backdrop-blur-md transition-all text-gray-300 hover:text-white group"
          >
            {copied ? (
              <CheckIcon className="w-5 h-5 text-green-500" />
            ) : (
              <DocumentDuplicateIcon className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
            )}
            <span className="font-mono text-sm sm:text-base tracking-wide">
              {copied ? "Email copied!" : "schaidenunes.dev@gmail.com"}
            </span>
          </button>
        </motion.div>
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
