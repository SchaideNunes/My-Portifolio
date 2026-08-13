"use client";

import { DocumentDuplicateIcon, CheckIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

import {
  slideInFromLeft,
  slideInFromTop,
} from "@/lib/motion";

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
    if (!isReady) return;

    const delayGsap = setTimeout(() => {
      gsap.to(cursorRef.current, {
        opacity: 0,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        duration: 0.5,
      });

      const words = ["Software Engineer", "Web Designer", "Full-Stack Developer"];
      let tl = gsap.timeline({ repeat: -1 });

      words.forEach((word) => {
        tl.to(textRef.current, {
          duration: Math.max(1, word.length * 0.08),
          text: word,
          ease: "none",
        })
          .to({}, { duration: 1.5 })
          .to(textRef.current, {
            duration: Math.max(0.5, word.length * 0.04),
            text: "",
            ease: "none",
          });
      });

      return () => {
        tl.kill();
      };
    }, 1000);

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
      className="flex flex-col items-center justify-center text-center px-[5%] md:px-10 lg:px-20 pt-28 sm:pt-36 md:pt-44 pb-20 w-full z-[20] min-h-[85vh] max-w-5xl mx-auto"
    >
      <div className="w-full flex flex-col gap-6 sm:gap-7 items-center justify-center my-auto">
        {/* HUGE Name Perfeitamente Centralizado */}
        <motion.div
          variants={slideInFromTop}
          className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-1 sm:gap-y-2 leading-none text-center"
        >
          <h1 className="text-[52px] sm:text-[75px] md:text-[95px] lg:text-[115px] font-black text-white tracking-tighter uppercase leading-[0.9]">
            SCHAIDE
          </h1>
          <h1 className="text-[52px] sm:text-[75px] md:text-[95px] lg:text-[115px] font-black text-[#f59e0b] tracking-tighter uppercase leading-[0.9]">
            NUNES
          </h1>
        </motion.div>

        {/* GSAP Typing Animation Centralizada */}
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-300 min-h-[36px] md:min-h-[44px] flex items-center justify-center text-center"
        >
          <span className="text-white mr-2.5">I am a</span>{" "}
          <span ref={textRef} className="font-semibold text-[#f59e0b]"></span>
          <span ref={cursorRef} className="text-[#f59e0b] ml-[2px]">
            |
          </span>
        </motion.div>

        {/* Description Summary Centralizado */}
        <motion.p
          variants={slideInFromLeft(0.7)}
          className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed text-center mx-auto px-4"
        >
          {TRANSLATIONS[lang].hero.description}
        </motion.p>

        {/* Action Buttons Centralizados */}
        <motion.div
          variants={slideInFromLeft(0.9)}
          className="flex flex-wrap items-center justify-center gap-4 mt-3"
        >
          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-[#0300145e] hover:bg-[#f59e0b]/10 backdrop-blur-md transition-all text-gray-300 hover:text-white group border border-white/10 hover:border-[#f59e0b]/40 shadow-lg shadow-[#030014]/50"
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
            className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-[#0300145e] hover:bg-[#f59e0b]/10 backdrop-blur-md transition-all text-gray-300 hover:text-white group border border-white/10 hover:border-[#f59e0b]/40 shadow-lg shadow-[#030014]/50"
          >
            <ArrowDownTrayIcon className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
            <span className="font-mono text-sm sm:text-base tracking-wide">
              {TRANSLATIONS[lang].hero.downloadCV}
            </span>
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};
