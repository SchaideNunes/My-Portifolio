"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { useLang } from "@/lib/lang-context";

// Tempo mínimo para a animação não "piscar" em conexões rápidas
// e tempo máximo para nunca prender o visitante.
const MIN_DURATION = 1400;
const MAX_DURATION = 3000;
const LAUNCH_DURATION = 750; // foguete saindo da tela
const EXIT_DURATION = 500; // fade para o hero

const STATUS = {
  PT: ["Checando sistemas", "Abastecendo motores", "Contagem regressiva", "Decolagem!"],
  EN: ["Checking systems", "Fueling engines", "Final countdown", "Liftoff!"],
} as const;

// Promessas que representam o que realmente precisa carregar antes do hero
const waitForAssets = () => {
  const fonts = (document as any).fonts?.ready ?? Promise.resolve();

  const pageLoad = new Promise<void>((resolve) => {
    if (document.readyState === "complete") resolve();
    else window.addEventListener("load", () => resolve(), { once: true });
  });

  const heroVideo = new Promise<void>((resolve) => {
    const video = document.createElement("video");
    video.preload = "auto";
    video.muted = true;
    video.addEventListener("canplaythrough", () => resolve(), { once: true });
    video.addEventListener("error", () => resolve(), { once: true });
    video.src = "/videos/hero_new.webm";
    video.load();
  });

  return Promise.all([fonts, pageLoad, heroVideo]);
};

// Campo de estrelas 2D leve: as estrelas descem mais rápido conforme o progresso
// e viram rastros de "velocidade de dobra" na decolagem.
const Starfield = ({
  speedRef,
  still,
}: {
  speedRef: React.MutableRefObject<number>;
  still: boolean;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const count = Math.round(Math.min(220, (width * height) / 6000));
    const stars = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      depth: 0.2 + Math.random() * 0.8, // estrelas próximas são maiores e mais rápidas
      warm: Math.random() < 0.15, // algumas estrelas âmbar, na paleta do site
    }));

    let frame = 0;
    const draw = () => {
      const speed = speedRef.current;
      ctx.clearRect(0, 0, width, height);

      for (const star of stars) {
        const v = speed * star.depth;
        if (!still) {
          star.y += v;
          if (star.y > height + 40) {
            star.y = -40;
            star.x = Math.random() * width;
          }
        }

        const alpha = 0.25 + star.depth * 0.75;
        const color = star.warm ? `rgba(251, 191, 36, ${alpha})` : `rgba(255, 255, 255, ${alpha})`;
        const streak = Math.min(v * 3, 160);

        if (streak > 2) {
          ctx.strokeStyle = color;
          ctx.lineWidth = star.depth * 1.6;
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(star.x, star.y - streak);
          ctx.stroke();
        } else {
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.depth * 1.3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [speedRef, still]);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 w-full h-full pointer-events-none" />;
};

const Rocket = ({ power }: { power: number }) => (
  <svg viewBox="0 0 64 132" className="w-[72px] h-[148px] sm:w-[84px] sm:h-[173px] overflow-visible" aria-hidden>
    <defs>
      <linearGradient id="rocket-body" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#9ca3af" />
        <stop offset="45%" stopColor="#f9fafb" />
        <stop offset="100%" stopColor="#6b7280" />
      </linearGradient>
      <linearGradient id="rocket-accent" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#b45309" />
        <stop offset="50%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#92400e" />
      </linearGradient>
      <radialGradient id="rocket-window" cx="40%" cy="35%" r="70%">
        <stop offset="0%" stopColor="#fef3c7" />
        <stop offset="45%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#451a03" />
      </radialGradient>
      <linearGradient id="rocket-flame" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fffbeb" />
        <stop offset="30%" stopColor="#fcd34d" />
        <stop offset="70%" stopColor="#f97316" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* Chama: cresce com o progresso e tremula */}
    <motion.g
      style={{ originX: 0.5, originY: 0 }}
      animate={{ scaleY: [1, 1.18, 0.92, 1.1, 1], scaleX: [1, 0.92, 1.05, 0.95, 1] }}
      transition={{ duration: 0.35, repeat: Infinity, ease: "linear" }}
    >
      <path
        d={`M21 104 Q32 ${124 + power * 90} 43 104 Z`}
        fill="url(#rocket-flame)"
        style={{ filter: "drop-shadow(0 0 14px rgba(251,146,60,0.95))" }}
      />
      <path d={`M27 104 Q32 ${116 + power * 40} 37 104 Z`} fill="#fffbeb" opacity="0.9" />
    </motion.g>

    {/* Aletas */}
    <path d="M18 70 L4 96 L6 104 L20 92 Z" fill="url(#rocket-accent)" />
    <path d="M46 70 L60 96 L58 104 L44 92 Z" fill="url(#rocket-accent)" />

    {/* Corpo */}
    <path d="M32 2 C46 18 50 44 48 72 L46 98 L18 98 L16 72 C14 44 18 18 32 2 Z" fill="url(#rocket-body)" />
    {/* Bico âmbar */}
    <path d="M32 2 C40 11 44 22 45.5 31 L18.5 31 C20 22 24 11 32 2 Z" fill="url(#rocket-accent)" />
    {/* Faixa */}
    <rect x="16.6" y="80" width="30.8" height="4" fill="#d97706" opacity="0.85" />
    {/* Janela */}
    <circle cx="32" cy="52" r="8" fill="#1f2937" />
    <circle cx="32" cy="52" r="6" fill="url(#rocket-window)" />
    {/* Bocal */}
    <path d="M22 98 L42 98 L39 105 L25 105 Z" fill="#374151" />
    {/* Aleta central (frente) */}
    <path d="M30.5 84 L33.5 84 L33.5 104 L30.5 104 Z" fill="#92400e" />
  </svg>
);

export const Preloader = () => {
  const { lang } = useLang();
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [launching, setLaunching] = useState(false);
  const [isLoading, setIsLoading] = useState(() => {
    // Se o preloader já rodou nessa sessão, não mostra de novo (ex: ao voltar pra Home)
    return !(typeof window !== "undefined" && (window as any).__preloaderCompleted);
  });
  const assetsReady = useRef(false);
  const speedRef = useRef(0.4);

  // Progresso guiado pelo carregamento real: avança devagar até ~90% enquanto
  // os assets carregam e só completa quando estão prontos (ou no tempo máximo).
  useEffect(() => {
    if (!isLoading) return;

    let frame = 0;
    let current = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const start = performance.now();

    waitForAssets().then(() => {
      assetsReady.current = true;
    });

    const tick = (now: number) => {
      const elapsed = now - start;
      const canFinish =
        (assetsReady.current && elapsed >= MIN_DURATION) || elapsed >= MAX_DURATION;

      const target = canFinish ? 100 : 90;
      const ease = canFinish ? 0.12 : 0.025;
      current += (target - current) * ease;
      if (target - current < 0.4) current = target;
      setProgress(current);
      speedRef.current = 0.4 + current * 0.06; // estrelas aceleram com o progresso

      if (current >= 100) {
        // Pausa curta no 100%, decolagem e então abre a tela
        timers.push(
          setTimeout(() => {
            setLaunching(true);
            speedRef.current = 45;
          }, 300),
          setTimeout(() => setIsLoading(false), 300 + LAUNCH_DURATION),
        );
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
    };
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
      return;
    }

    document.body.style.overflow = "auto";
    // Avisa o resto do site (hero, smooth scroll) quando a saída termina
    const timer = setTimeout(() => {
      (window as any).__preloaderCompleted = true;
      window.dispatchEvent(new Event("preloaderComplete"));
    }, EXIT_DURATION);
    return () => clearTimeout(timer);
  }, [isLoading]);

  const rounded = Math.round(progress);
  const statusList = STATUS[lang] ?? STATUS.PT;
  const status = launching
    ? statusList[statusList.length - 1]
    : statusList[Math.min(statusList.length - 2, Math.floor(rounded / 34))];

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          role="status"
          aria-live="polite"
          aria-label={`${status}: ${rounded}%`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: EXIT_DURATION / 1000, ease: "easeInOut" }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black overflow-hidden select-none"
        >
          <Starfield speedRef={speedRef} still={!!reduceMotion} />

          {/* Brilho âmbar no fundo, mais forte conforme o motor esquenta */}
          <div
            aria-hidden
            className="absolute bottom-[-20%] w-[700px] h-[500px] rounded-full bg-amber-500/20 blur-[140px] pointer-events-none"
            style={{ opacity: 0.2 + (progress / 100) * 0.8 }}
          />

          {/* Foguete */}
          <motion.div
            className="relative z-10"
            initial={reduceMotion ? false : { y: 40, opacity: 0 }}
            animate={
              launching
                ? { y: "-120vh", opacity: 1 }
                : { y: 0, opacity: 1, x: reduceMotion ? 0 : [0, -0.6, 0.6, 0] }
            }
            transition={
              launching
                ? { duration: LAUNCH_DURATION / 1000, ease: [0.6, 0, 0.9, 0.4] }
                : { y: { duration: 0.8, ease: "easeOut" }, opacity: { duration: 0.6 }, x: { duration: 0.12, repeat: Infinity } }
            }
          >
            <Rocket power={launching ? 1.6 : progress / 100} />
          </motion.div>

          {/* Contador + nome + status */}
          <motion.div
            className="relative z-10 mt-12 flex flex-col items-center"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={launching ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
            transition={{ duration: launching ? 0.3 : 0.7, delay: launching ? 0 : 0.2, ease: "easeOut" }}
          >
            <div className="flex items-start text-white">
              <span className="font-sans text-6xl sm:text-7xl font-bold tracking-tighter tabular-nums">
                {rounded}
              </span>
              <span className="mt-2 ml-1 font-sans text-2xl sm:text-3xl font-semibold text-amber-400">%</span>
            </div>

            {/* Barra fina de combustível */}
            <div className="mt-4 h-[2px] w-48 sm:w-56 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 shadow-[0_0_10px_rgba(251,191,36,0.8)]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <span className="mt-6 text-sm sm:text-base font-semibold tracking-[0.45em] pl-[0.45em] text-white/90">
              SCHAIDE NUNES
            </span>
            <span className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-amber-400/80">
              {status}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
