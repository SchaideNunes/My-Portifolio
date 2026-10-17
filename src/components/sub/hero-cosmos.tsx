"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { useLang } from "@/lib/lang-context";
import { TRANSLATIONS } from "@/constants/translations";

// Centro aproximado do buraco negro do vídeo, no quadro 1440x760 do SVG
const CX = 720;
const CY = 30;

// Órbitas elípticas ao redor do buraco negro (rx, ry, traço, opacidade)
const ORBITS = [
  { rx: 430, ry: 215, dash: "3 6", color: "rgba(245,158,11,0.4)" },
  { rx: 650, ry: 335, dash: "2 8", color: "rgba(255,255,255,0.22)" },
  { rx: 900, ry: 455, dash: "4 10", color: "rgba(245,158,11,0.28)" },
];

// Caminho de uma elipse completa, usado pelos planetas no animateMotion
const ellipsePath = (rx: number, ry: number) =>
  `M ${CX - rx} ${CY} a ${rx} ${ry} 0 1 0 ${rx * 2} 0 a ${rx} ${ry} 0 1 0 ${-rx * 2} 0`;

// Corpos que percorrem as órbitas
const BODIES = [
  { orbit: 0, r: 4, fill: "#bae6fd", glow: "rgba(186,230,253,0.8)", dur: 18, begin: 0 },
  { orbit: 1, r: 7, fill: "url(#cosmos-planet)", glow: "rgba(245,158,11,0.9)", dur: 34, begin: -12 },
  { orbit: 2, r: 3, fill: "#ffffff", glow: "rgba(255,255,255,0.9)", dur: 52, begin: -30 },
];

// Estrelas cadentes ocasionais na parte de cima
const SHOOTING = [
  { top: "12%", left: "78%", delay: 3, repeatDelay: 9 },
  { top: "28%", left: "30%", delay: 8, repeatDelay: 12 },
];

// Espera o preloader terminar para os elementos aparecerem junto com o hero
const usePreloaderDone = () => {
  const [done, setDone] = useState(() => typeof window !== "undefined" && !!(window as any).__preloaderCompleted);
  useEffect(() => {
    if (done) return;
    const onDone = () => setDone(true);
    window.addEventListener("preloaderComplete", onDone);
    const fallback = setTimeout(onDone, 4500);
    return () => {
      window.removeEventListener("preloaderComplete", onDone);
      clearTimeout(fallback);
    };
  }, [done]);
  return done;
};

export const HeroCosmos = () => {
  const reduceMotion = useReducedMotion();
  const { lang } = useLang();
  const t = TRANSLATIONS[lang].hero;
  const ready = usePreloaderDone();

  const chips = [
    { value: "10+", label: t.chipSystems, className: "left-[3%] 2xl:left-[6%] top-[46%]", float: 7 },
    { value: "2023", label: t.chipSince, className: "right-[3%] 2xl:right-[6%] top-[38%]", float: 8 },
    { value: "CMOC", label: t.chipCmoc, className: "right-[5%] 2xl:right-[9%] top-[62%]", float: 6 },
  ];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Órbitas com planetas ao redor do buraco negro */}
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 1.6, delay: 0.3 }}
        className="absolute top-0 left-0 w-full h-[900px] -z-10"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMin slice"
      >
        <defs>
          <radialGradient id="cosmos-planet" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="55%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#451a03" />
          </radialGradient>
          <filter id="cosmos-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g transform={`rotate(-10 ${CX} ${CY})`}>
          {ORBITS.map((o, i) => (
            <ellipse key={i} cx={CX} cy={CY} rx={o.rx} ry={o.ry} fill="none" stroke={o.color} strokeWidth="1.3" strokeDasharray={o.dash} />
          ))}

          {BODIES.map((b, i) => {
            const o = ORBITS[b.orbit];
            return (
              <g key={i} filter="url(#cosmos-glow)">
                <circle r={b.r * 2.2} fill={b.glow} opacity="0.25" cx={reduceMotion ? CX + o.rx * Math.cos(i * 2) : 0} cy={reduceMotion ? CY + o.ry * Math.sin(i * 2) : 0}>
                  {!reduceMotion && <animateMotion dur={`${b.dur}s`} begin={`${b.begin}s`} repeatCount="indefinite" path={ellipsePath(o.rx, o.ry)} />}
                </circle>
                <circle r={b.r} fill={b.fill} cx={reduceMotion ? CX + o.rx * Math.cos(i * 2) : 0} cy={reduceMotion ? CY + o.ry * Math.sin(i * 2) : 0}>
                  {!reduceMotion && <animateMotion dur={`${b.dur}s`} begin={`${b.begin}s`} repeatCount="indefinite" path={ellipsePath(o.rx, o.ry)} />}
                </circle>
              </g>
            );
          })}
        </g>
      </motion.svg>

      {/* Estrelas cadentes */}
      {!reduceMotion &&
        SHOOTING.map((s, i) => (
          <div key={i} className="absolute -z-10" style={{ top: s.top, left: s.left, transform: "rotate(155deg)", transformOrigin: "left center" }}>
            <motion.div
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: [0, 1, 1, 0], x: [0, 520] }}
              transition={{ duration: 1.1, delay: s.delay, repeat: Infinity, repeatDelay: s.repeatDelay, ease: "easeOut", times: [0, 0.1, 0.75, 1] }}
              className="flex items-center"
            >
              <span className="h-px w-40 bg-gradient-to-r from-transparent via-amber-200/50 to-white" />
              <span className="-ml-0.5 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#fff,0_0_16px_rgba(251,191,36,0.9)]" />
            </motion.div>
          </div>
        ))}

      {/* Chips de "telemetria" flutuando nas laterais (telas grandes) */}
      {chips.map((c, i) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: reduceMotion ? 0 : [0, -10, 0] } : { opacity: 0, y: 20 }}
          transition={
            ready && !reduceMotion
              ? { opacity: { duration: 0.8, delay: 1 + i * 0.25 }, y: { duration: c.float, repeat: Infinity, ease: "easeInOut", delay: 1 + i * 0.25 } }
              : { duration: 0.8, delay: 1 + i * 0.25 }
          }
          className={`hidden xl:flex absolute ${c.className} flex-col gap-1 px-4 py-3 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)]`}
        >
          <span className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-gray-500">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-500" />
            </span>
            {c.label}
          </span>
          <span className="text-2xl font-bold text-white tabular-nums">
            {c.value.replace("+", "")}
            {c.value.endsWith("+") && <span className="text-amber-500">+</span>}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

// Indicador de rolagem no pé do hero
export const ScrollHint = () => {
  const reduceMotion = useReducedMotion();
  const { lang } = useLang();
  const ready = usePreloaderDone();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: ready ? 1 : 0 }}
      transition={{ duration: 0.8, delay: 1.8 }}
      className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 pointer-events-none"
    >
      <span className="w-6 h-10 rounded-full border border-white/25 flex justify-center pt-2">
        <motion.span
          animate={reduceMotion ? undefined : { y: [0, 12, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]"
        />
      </span>
      <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-500">{TRANSLATIONS[lang].hero.scroll}</span>
    </motion.div>
  );
};
