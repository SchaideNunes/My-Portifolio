"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowsPointingOutIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import type { ProjectGallery as Gallery } from "@/constants";

type Mode = "desktop" | "mobile";
type Lang = "PT" | "EN";

const LABELS = {
  PT: { desktop: "Desktop", mobile: "Mobile", expand: "Ampliar", close: "Fechar", prev: "Anterior", next: "Próxima", screen: "Tela" },
  EN: { desktop: "Desktop", mobile: "Mobile", expand: "Expand", close: "Close", prev: "Previous", next: "Next", screen: "Screen" },
} as const;

// Quantos pixels arrastar para trocar de imagem no lightbox (swipe)
const SWIPE_THRESHOLD = 60;

const hostFrom = (link: string) => {
  try {
    return new URL(link).host + new URL(link).pathname.replace(/\/$/, "");
  } catch {
    return "";
  }
};

/* ------------------------------------------------------------------ */
/* Lightbox: tela cheia com setas, teclado, swipe e miniaturas          */
/* ------------------------------------------------------------------ */
export const Lightbox = ({
  images,
  index,
  mode,
  title,
  lang,
  onClose,
  onChange,
}: {
  images: string[];
  index: number;
  mode: Mode;
  title: string;
  lang: Lang;
  onClose: () => void;
  onChange: (index: number) => void;
}) => {
  const t = LABELS[lang];
  const [direction, setDirection] = useState(0);

  const go = useCallback(
    (step: number) => {
      setDirection(step);
      onChange((index + step + images.length) % images.length);
    },
    [index, images.length, onChange],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);

    // Trava o scroll da página (inclusive o Lenis) enquanto o lightbox está aberto
    const lenis = (window as any).__lenis;
    lenis?.stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
      document.body.style.overflow = previousOverflow;
    };
  }, [go, onClose]);

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[1000] flex flex-col bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Topo: título, contador e fechar */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-4 text-white" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 min-w-0">
          {mode === "desktop" ? (
            <ComputerDesktopIcon className="w-5 h-5 text-amber-400 shrink-0" />
          ) : (
            <DevicePhoneMobileIcon className="w-5 h-5 text-amber-400 shrink-0" />
          )}
          <span className="font-medium truncate">{title}</span>
          <span className="text-sm text-gray-400 tabular-nums shrink-0">
            {index + 1} / {images.length}
          </span>
        </div>
        <button
          onClick={onClose}
          aria-label={t.close}
          className="p-2 rounded-full border border-white/15 hover:bg-white hover:text-black transition-colors"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Imagem atual */}
      <div className="relative flex-1 min-h-0 flex items-center justify-center px-4 sm:px-20">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={images[index]}
            src={images[index]}
            alt={`${title} — ${t.screen} ${index + 1}`}
            custom={direction}
            initial={{ opacity: 0, x: direction * 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -80 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            drag={images.length > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={(_, info) => {
              if (info.offset.x < -SWIPE_THRESHOLD) go(1);
              else if (info.offset.x > SWIPE_THRESHOLD) go(-1);
            }}
            onClick={(e) => e.stopPropagation()}
            draggable={false}
            className={`max-w-full max-h-full object-contain select-none cursor-grab active:cursor-grabbing shadow-[0_20px_60px_rgba(0,0,0,0.6)] ${
              mode === "mobile" ? "rounded-[28px] border-4 border-neutral-800" : "rounded-lg"
            }`}
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label={t.prev}
              className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-amber-500 hover:text-black transition-colors"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label={t.next}
              className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-amber-500 hover:text-black transition-colors"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 px-4 py-4 overflow-x-auto" onClick={(e) => e.stopPropagation()}>
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                onChange(i);
              }}
              aria-label={`${t.screen} ${i + 1}`}
              className={`shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                mode === "mobile" ? "w-10 h-16" : "w-20 h-12"
              } ${i === index ? "border-amber-500 opacity-100" : "border-transparent opacity-50 hover:opacity-90"}`}
            >
              <img src={src} alt="" loading="lazy" className="w-full h-full object-cover object-top" />
            </button>
          ))}
        </div>
      )}
    </motion.div>,
    document.body,
  );
};

/* ------------------------------------------------------------------ */
/* Galeria do projeto: alterna desktop/mobile, miniaturas e lightbox    */
/* ------------------------------------------------------------------ */
export const ProjectGallery = ({
  gallery,
  title,
  link,
  lang,
}: {
  gallery: Gallery;
  title: string;
  link?: string;
  lang: Lang;
}) => {
  const t = LABELS[lang];
  const hasMobile = gallery.mobile.length > 0;
  const [mode, setMode] = useState<Mode>("desktop");
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const images = gallery[mode];
  const current = images[Math.min(index, images.length - 1)];

  const switchMode = (next: Mode) => {
    setMode(next);
    setIndex(0);
  };

  const openAt = (i: number) => {
    setIndex(i);
    setLightboxOpen(true);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Barra de controles: Desktop / Mobile + Ampliar */}
      <div className="flex items-center justify-between gap-3">
        <div className="inline-flex p-1 rounded-full border border-white/10 bg-white/[0.03]">
          {(["desktop", "mobile"] as const).map((m) => {
            const disabled = m === "mobile" && !hasMobile;
            const Icon = m === "desktop" ? ComputerDesktopIcon : DevicePhoneMobileIcon;
            return (
              <button
                key={m}
                onClick={() => switchMode(m)}
                disabled={disabled}
                aria-pressed={mode === m}
                className={`relative flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${
                  disabled ? "text-gray-700 cursor-not-allowed" : mode === m ? "text-black" : "text-gray-400 hover:text-white"
                }`}
              >
                {mode === m && (
                  <motion.span
                    layoutId={`gallery-mode-${title}`}
                    className="absolute inset-0 rounded-full bg-amber-500"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <Icon className="relative w-4 h-4" />
                <span className="relative">{t[m]}</span>
                <span className="relative tabular-nums opacity-70">{gallery[m].length}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => openAt(mode === "desktop" ? index : 0)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 text-xs font-bold uppercase tracking-widest text-gray-300 hover:bg-white hover:text-black transition-colors"
        >
          <ArrowsPointingOutIcon className="w-4 h-4" />
          <span className="hidden sm:inline">{t.expand}</span>
        </button>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {mode === "desktop" ? (
          <motion.div
            key="desktop"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-3"
          >
            {/* Moldura de navegador */}
            <div className="rounded-xl md:rounded-2xl overflow-hidden border border-white/10 bg-neutral-950 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/10 bg-white/[0.03]">
                <div className="flex gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                </div>
                <div className="flex-1 min-w-0 px-3 py-1 rounded-md bg-white/[0.05] text-[11px] text-gray-500 truncate text-center">
                  {link ? hostFrom(link) : title}
                </div>
              </div>

              <button
                onClick={() => openAt(index)}
                aria-label={`${t.expand}: ${title}`}
                className="relative block w-full aspect-[16/10] overflow-hidden group/shot cursor-zoom-in"
              >
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.img
                    key={current}
                    src={current}
                    alt={`${title} — ${t.screen} ${index + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover/shot:scale-[1.02]"
                  />
                </AnimatePresence>

                {images.length > 1 && (
                  <>
                    <span
                      role="button"
                      tabIndex={0}
                      aria-label={t.prev}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIndex((index - 1 + images.length) % images.length);
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white opacity-0 group-hover/shot:opacity-100 hover:bg-amber-500 hover:text-black transition-all"
                    >
                      <ChevronLeftIcon className="w-5 h-5" />
                    </span>
                    <span
                      role="button"
                      tabIndex={0}
                      aria-label={t.next}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIndex((index + 1) % images.length);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white opacity-0 group-hover/shot:opacity-100 hover:bg-amber-500 hover:text-black transition-all"
                    >
                      <ChevronRightIcon className="w-5 h-5" />
                    </span>
                    <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-black/60 text-[11px] text-white tabular-nums">
                      {index + 1} / {images.length}
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Miniaturas */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setIndex(i)}
                    aria-label={`${t.screen} ${i + 1}`}
                    className={`shrink-0 w-20 aspect-[16/10] overflow-hidden rounded-md border-2 transition-all ${
                      i === index ? "border-amber-500" : "border-white/10 opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img src={src} alt="" loading="lazy" className="w-full h-full object-cover object-top" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="mobile"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory pb-2 md:justify-center"
          >
            {/* Molduras de celular lado a lado */}
            {gallery.mobile.map((src, i) => (
              <button
                key={src}
                onClick={() => openAt(i)}
                aria-label={`${t.expand}: ${title} — ${t.mobile} ${i + 1}`}
                className="snap-center shrink-0 w-[46%] sm:w-[170px] md:w-[150px] p-2 rounded-[30px] bg-neutral-900 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-zoom-in group/phone"
              >
                <div className="relative overflow-hidden rounded-[22px] aspect-[390/844] bg-black">
                  <span className="absolute top-1 left-1/2 -translate-x-1/2 w-9 h-2.5 rounded-full bg-black/90 z-10" />
                  <img
                    src={src}
                    alt={`${title} — ${t.mobile} ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/phone:scale-[1.03]"
                  />
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={images}
            index={Math.min(index, images.length - 1)}
            mode={mode}
            title={title}
            lang={lang}
            onClose={() => setLightboxOpen(false)}
            onChange={setIndex}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
