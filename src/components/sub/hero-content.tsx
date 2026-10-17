"use client";

import { DocumentDuplicateIcon, CheckIcon, ArrowDownTrayIcon, ArrowRightIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
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

const CV_FILES = {
  PT: "/Curriculo_Schaide_Nunes_2026.pdf",
  EN: "/Resume_Schaide_Nunes_2026.pdf",
} as const;

export const HeroContent = () => {
  // O PT/EN do botão de currículo é o mesmo seletor de idioma do header: troca o site todo
  const { lang, setLang } = useLang();
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

    // Guarda as animações para limpar de verdade ao trocar de idioma ou sair da página
    let tl: gsap.core.Timeline | undefined;
    let cursorTween: gsap.core.Tween | undefined;

    const delayGsap = setTimeout(() => {
      cursorTween = gsap.to(cursorRef.current, {
        opacity: 0,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        duration: 0.5,
      });

      const words = TRANSLATIONS[lang].hero.roles;
      if (textRef.current) textRef.current.textContent = "";
      tl = gsap.timeline({ repeat: -1 });

      words.forEach((word) => {
        tl!.to(textRef.current, {
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
    }, 1000);

    return () => {
      clearTimeout(delayGsap);
      tl?.kill();
      cursorTween?.kill();
    };
  }, [isReady, lang]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("schaidenunes.dev@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial="hidden"
      animate={isReady ? "visible" : "hidden"}
      className="flex flex-col items-center justify-center text-center px-[5%] md:px-10 lg:px-20 pt-40 sm:pt-48 md:pt-56 pb-32 w-full z-[20] min-h-[90vh] max-w-5xl mx-auto"
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
          <span className="text-white mr-2.5">{TRANSLATIONS[lang].hero.iAm}</span>{" "}
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

        {/* Ações: currículo (principal), projetos (secundário) e e-mail */}
        <motion.div variants={slideInFromLeft(0.9)} className="flex flex-col items-center gap-5 mt-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Botão principal com a escolha do idioma do currículo acoplada */}
            <div className="inline-flex items-stretch rounded-xl border border-amber-500/35 bg-black/40 backdrop-blur-md text-amber-300 hover:border-amber-500/60 transition-colors overflow-hidden">
              <a
                href={CV_FILES[lang]}
                download={CV_FILES[lang].slice(1)}
                className="group flex items-center gap-2.5 pl-5 pr-4 py-3 font-semibold hover:bg-amber-500/10 hover:text-amber-200 transition-colors"
              >
                <ArrowDownTrayIcon className="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
                {TRANSLATIONS[lang].hero.downloadCV}
              </a>
              <div className="flex items-center gap-0.5 px-1.5 border-l border-amber-500/20" role="group" aria-label="PT / EN">
                {(["PT", "EN"] as const).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLang(l)}
                    aria-pressed={lang === l}
                    title={l === "PT" ? "Português" : "English"}
                    className={`relative px-2 py-1 rounded-md text-xs font-bold transition-colors ${
                      lang === l ? "text-amber-300" : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    {lang === l && (
                      <motion.span
                        layoutId="langBadge"
                        className="absolute inset-0 rounded-md bg-amber-500/15"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative">{l}</span>
                  </button>
                ))}
              </div>
            </div>

            <Link
              to="/work"
              className="group flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-black/30 backdrop-blur-md text-gray-300 font-semibold hover:text-white hover:border-white/25 transition-colors"
            >
              {TRANSLATIONS[lang].hero.seeProjects}
              <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* E-mail como link discreto, com cópia em um clique */}
          <button
            type="button"
            onClick={handleCopyEmail}
            title={TRANSLATIONS[lang].hero.copyEmailHint}
            className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <EnvelopeIcon className="w-4 h-4 text-amber-500" />
            <span className="underline decoration-white/20 underline-offset-4 group-hover:decoration-amber-500">
              {TRANSLATIONS[lang].hero.copyEmail}
            </span>
            {copied ? (
              <span className="flex items-center gap-1 text-green-400">
                <CheckIcon className="w-4 h-4" />
                {TRANSLATIONS[lang].hero.copied}
              </span>
            ) : (
              <DocumentDuplicateIcon className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
            )}
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};
