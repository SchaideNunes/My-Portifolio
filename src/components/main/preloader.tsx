"use client";

import { useEffect, useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRocket } from "react-icons/fa";
import { Canvas } from "@react-three/fiber";
import { StarBackground } from "@/components/main/star-background";

// Configuração de estrelas cadentes orgânicas
const SHOOTING_STARS = [
  { id: 1, top: "8%", left: "5%", angle: 35, length: 160, distance: 500, duration: 1.1, delay: 0.3, repeatDelay: 2.5 },
  { id: 2, top: "22%", left: "40%", angle: 38, length: 190, distance: 560, duration: 0.95, delay: 1.2, repeatDelay: 3.1 },
  { id: 3, top: "42%", left: "10%", angle: 32, length: 140, distance: 440, duration: 1.3, delay: 1.9, repeatDelay: 2.7 },
  { id: 4, top: "14%", left: "68%", angle: 39, length: 175, distance: 520, duration: 1.05, delay: 0.7, repeatDelay: 3.4 },
  { id: 5, top: "58%", left: "25%", angle: 36, length: 150, distance: 480, duration: 1.25, delay: 1.5, repeatDelay: 2.9 },
  { id: 6, top: "6%", left: "30%", angle: 34, length: 210, distance: 620, duration: 1.15, delay: 2.3, repeatDelay: 3.7 },
];

export const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(() => {
    // Se o preloader já rodou nessa sessão, não precisa mostrar de novo (ex: ao voltar pra Home)
    if (typeof window !== "undefined" && (window as any).__preloaderCompleted) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    if (!isLoading) return;

    // Tenta forçar o pre-load do vídeo em memória
    if (typeof window !== "undefined") {
      const video = document.createElement("video");
      video.src = "/videos/hero_new.webm";
      video.preload = "auto";
    }

    // Simula a barra de progresso carregando os assets (ex: vídeo do fundo)
    const duration = 2500; 
    const intervalTime = 25;
    const increment = 100 / (duration / intervalTime);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
          }, 400); // 400ms paradinho no 100%
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      
      // Dispara o evento "preloaderComplete" após o delay da animação de saída, para as animações de entrada começarem perfeitamente no timing
      setTimeout(() => {
        if (typeof window !== "undefined") {
          (window as any).__preloaderCompleted = true;
          window.dispatchEvent(new Event("preloaderComplete"));
        }
      }, 800); 
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#000000] overflow-hidden select-none"
        >
          {/* Fundo de estrelas animadas Three.js */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 1] }}>
              <Suspense fallback={null}>
                <StarBackground />
              </Suspense>
            </Canvas>
          </div>

          {/* Nebulosas cósmicas de profundidade */}
          <div className="absolute top-1/4 left-1/5 w-[520px] h-[520px] bg-purple-950/25 blur-[140px] rounded-full pointer-events-none -z-10" />
          <div className="absolute bottom-1/4 right-1/4 w-[460px] h-[460px] bg-blue-900/20 blur-[130px] rounded-full pointer-events-none -z-10" />
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none -z-10">
            <div className="w-[420px] h-[420px] bg-amber-500/10 blur-[120px] rounded-full" />
          </div>

          {/* Camada de Estrelas Cadentes (Shooting Stars) */}
          <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none">
            {SHOOTING_STARS.map((star) => (
              <div
                key={`shooting-star-wrapper-${star.id}`}
                className="absolute"
                style={{
                  top: star.top,
                  left: star.left,
                  transform: `rotate(${star.angle}deg)`,
                  transformOrigin: "left center",
                }}
              >
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    x: [-40, star.distance],
                  }}
                  transition={{
                    duration: star.duration,
                    repeat: Infinity,
                    repeatDelay: star.repeatDelay,
                    delay: star.delay,
                    ease: "easeOut",
                    times: [0, 0.15, 0.8, 1],
                  }}
                  className="flex items-center"
                >
                  {/* Cauda brilhante da estrela cadente com degradê cósmico */}
                  <div
                    className="h-[1.5px] bg-gradient-to-r from-transparent via-cyan-300/30 via-amber-200/70 to-white"
                    style={{ width: `${star.length}px` }}
                  />
                  {/* Cabeça reluzente do meteoro */}
                  <div className="relative w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#ffffff,0_0_20px_rgba(251,191,36,0.9),0_0_30px_rgba(245,158,11,0.7)] -ml-1">
                    <div className="absolute inset-[-3px] rounded-full bg-amber-300/50 blur-[2px]" />
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Planetas Adicionais Minimalistas de Fundo */}
          {/* 1. Saturno com anéis elegantes (Canto Superior Direito) */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[16%] right-[12%] sm:right-[18%] z-[4] flex items-center justify-center pointer-events-none select-none opacity-85"
          >
            <div className="relative flex items-center justify-center">
              {/* Glow sutil de Saturno */}
              <div className="absolute w-14 h-14 bg-amber-500/15 rounded-full blur-md" />
              
              {/* Anéis de Saturno (Trás) */}
              <div 
                className="absolute w-20 h-7 rounded-[50%] border-t-2 border-l-2 border-amber-200/50 -rotate-[26deg] pointer-events-none"
              />

              {/* Corpo de Saturno (Esfera de Gás) */}
              <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-[#684a2d] via-[#b88f3a] to-[#fde68a] shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.8),inset_2px_2px_4px_rgba(255,255,255,0.4),0_0_15px_rgba(245,158,11,0.25)] overflow-hidden">
                {/* Faixas gasosas */}
                <div className="absolute top-2 left-0 right-0 h-1 bg-[#8c6422]/40 blur-[0.5px]" />
                <div className="absolute top-4 left-0 right-0 h-1.5 bg-[#6d4d19]/50 blur-[0.5px]" />
                <div className="absolute bottom-2 left-0 right-0 h-1 bg-[#8c6422]/40 blur-[0.5px]" />
              </div>

              {/* Anéis de Saturno (Frente) */}
              <div 
                className="absolute w-20 h-7 rounded-[50%] border-b-[2.5px] border-r-[2.5px] border-amber-300/80 -rotate-[26deg] pointer-events-none shadow-[0_0_8px_rgba(251,191,36,0.3)]"
              />
            </div>
          </motion.div>

          {/* 2. Marte (Planeta Vermelho - Canto Inferior Esquerdo) */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[20%] left-[10%] sm:left-[14%] z-[4] flex items-center justify-center pointer-events-none select-none opacity-85"
          >
            <div className="relative flex items-center justify-center">
              {/* Glow marciano sutil */}
              <div className="absolute w-9 h-9 bg-red-600/15 rounded-full blur-md" />
              
              {/* Esfera de Marte */}
              <div className="relative w-5 h-5 rounded-full bg-gradient-to-tr from-[#2d0905] via-[#881313] to-[#ea580c] shadow-[inset_-3px_-3px_5px_rgba(0,0,0,0.85),inset_1px_1px_3px_rgba(255,200,160,0.4),0_0_10px_rgba(239,68,68,0.35)] overflow-hidden">
                {/* Calota polar de gelo */}
                <div className="absolute top-0.5 left-1 w-1.5 h-1 bg-white/90 rounded-full blur-[0.5px]" />
                {/* Relevo marciano escuro */}
                <div className="absolute top-2 right-0.5 w-2 h-1.5 bg-[#1f0502]/60 rounded-full blur-[0.5px]" />
              </div>
            </div>
          </motion.div>

          {/* Porcentagem de Carregamento (Canto Inferior Direito) */}
          <div className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12 z-20 flex items-baseline gap-1 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)] font-sans text-5xl sm:text-7xl font-bold tracking-tighter">
            <span>{Math.round(progress)}</span>
            <span className="text-2xl sm:text-3xl text-amber-300/80 font-normal">%</span>
          </div>

          {/* Elemento Central: Foguete, Terra e Órbita */}
          <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-[280px] sm:max-w-[350px]">
            
            {/* Foguete decolando */}
            <div className="relative w-16 h-56 sm:h-76 flex justify-center items-end mt-12 mb-4">
              
              {/* A Terra realista e a Lua */}
              <div className="absolute -bottom-6 flex items-center justify-center w-36 h-36">
                {/* Atmosfera Rayleigh scattering externa */}
                <div className="absolute inset-1 rounded-full bg-cyan-400/20 blur-xl animate-pulse pointer-events-none" />

                {/* Globo terrestre ultra detalhado */}
                <div className="relative w-28 h-28 rounded-full shadow-[inset_-14px_-14px_22px_rgba(0,0,0,0.9),inset_4px_4px_10px_rgba(255,255,255,0.45),0_0_30px_rgba(56,189,248,0.45)] overflow-hidden shrink-0">
                  {/* Oceano base realista com gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#020b1c] via-[#0369a1] to-[#38bdf8]" />

                  {/* Continentes vetoriais orgânicos com relevo */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                    <defs>
                      <linearGradient id="landGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4ade80" />
                        <stop offset="50%" stopColor="#16a34a" />
                        <stop offset="100%" stopColor="#14532d" />
                      </linearGradient>
                      <linearGradient id="shelfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Plataformas continentais (águas rasas) */}
                    <path d="M 22 18 Q 38 12 45 28 Q 50 38 40 50 Q 28 55 18 42 Z" fill="url(#shelfGrad)" filter="blur(1px)" />
                    <path d="M 52 20 Q 75 16 82 35 Q 78 55 60 52 Q 48 45 52 20 Z" fill="url(#shelfGrad)" filter="blur(1px)" />
                    <path d="M 32 52 Q 44 54 42 78 Q 32 88 28 72 Z" fill="url(#shelfGrad)" filter="blur(1px)" />

                    {/* América do Norte */}
                    <path d="M 24 20 C 35 15, 42 22, 40 32 C 38 42, 28 45, 20 38 C 16 30, 18 24, 24 20 Z" fill="url(#landGrad)" />
                    
                    {/* América do Sul */}
                    <path d="M 33 54 C 42 56, 40 72, 35 82 C 30 84, 26 74, 28 64 C 30 58, 31 54, 33 54 Z" fill="url(#landGrad)" />

                    {/* Eurásia e África */}
                    <path d="M 55 22 C 70 18, 80 28, 76 38 C 72 46, 60 48, 54 36 Z" fill="url(#landGrad)" />
                    <path d="M 58 42 C 72 44, 70 66, 62 72 C 55 70, 54 55, 58 42 Z" fill="url(#landGrad)" />

                    {/* Ilhas oceânicas */}
                    <circle cx="21" cy="48" r="1.5" fill="#22c55e" />
                    <circle cx="82" cy="45" r="2" fill="#22c55e" />
                    <circle cx="48" cy="70" r="1.2" fill="#22c55e" />
                  </svg>

                  {/* Nuvens dinâmicas com deriva atmosférica suave */}
                  <motion.div
                    animate={{ x: [-10, 10, -10] }}
                    transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 pointer-events-none opacity-70"
                  >
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <path d="M 15 28 Q 28 22 38 30 Q 32 36 20 34 Z" fill="white" filter="blur(0.8px)" opacity="0.8" />
                      <path d="M 45 16 Q 60 12 68 20 Q 58 24 48 20 Z" fill="white" filter="blur(1px)" opacity="0.7" />
                      <path d="M 25 58 Q 42 52 50 64 Q 38 68 28 64 Z" fill="white" filter="blur(1px)" opacity="0.75" />
                      <path d="M 55 48 Q 72 42 80 54 Q 68 60 58 54 Z" fill="white" filter="blur(0.8px)" opacity="0.85" />
                      <path d="M 32 78 Q 48 74 44 86 Q 30 84 32 78 Z" fill="white" filter="blur(1px)" opacity="0.6" />
                    </svg>
                  </motion.div>

                  {/* Iluminação esférica 3D e sombra terminal da Terra */}
                  <div 
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      background: "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 45%, rgba(0,0,0,0.85) 100%)"
                    }}
                  />
                </div>

                {/* A Lua em órbita com sombreamento 3D */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute w-40 h-40 flex items-start justify-end pointer-events-none"
                >
                  <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-gray-900 via-gray-400 to-gray-200 shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.7),0_0_8px_rgba(255,255,255,0.5)] flex items-center justify-center overflow-hidden">
                    {/* Crateras lunares */}
                    <div className="absolute top-1 left-1 w-1 h-1 bg-gray-500/80 rounded-full" />
                    <div className="absolute bottom-1 right-1.5 w-1.5 h-1.5 bg-gray-500/70 rounded-full" />
                    <div className="absolute top-2.5 right-1 w-0.5 h-0.5 bg-gray-600/80 rounded-full" />
                  </div>
                </motion.div>
              </div>
              
              {/* O Foguete */}
              <div 
                className="absolute flex flex-col items-center transition-all duration-300 ease-out"
                style={{ bottom: `${5 + progress * 0.8}%` }}
              >
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-white text-3xl sm:text-4xl drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]"
                >
                  <FaRocket className="-rotate-45" />
                </motion.div>
                
                {/* Rastro de fogo multi-camadas */}
                <div className="relative flex flex-col items-center">
                  <motion.div
                    animate={{ height: ["16px", "32px", "16px"], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 0.2, repeat: Infinity }}
                    className="w-1.5 bg-gradient-to-b from-orange-500 via-amber-400 to-transparent mt-1 rounded-full blur-[1px]"
                  />
                  {/* Núcleo interno branco do jato */}
                  <motion.div
                    animate={{ height: ["8px", "18px", "8px"] }}
                    transition={{ duration: 0.15, repeat: Infinity }}
                    className="absolute top-1 w-0.5 bg-white rounded-full blur-[0.5px]"
                  />
                  {/* Fagulações / Partículas saindo da turbina */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={`exhaust-spark-${i}`}
                      animate={{
                        opacity: [0.9, 0],
                        y: [0, 20 + i * 6],
                        x: [(i % 2 === 0 ? 1 : -1) * (2 + i * 2), (i % 2 === 0 ? 1 : -1) * (6 + i * 3)],
                        scale: [1, 0.2],
                      }}
                      transition={{
                        duration: 0.35 + i * 0.08,
                        repeat: Infinity,
                        delay: i * 0.07,
                        ease: "easeOut",
                      }}
                      className="absolute top-3 w-1 h-1 rounded-full bg-amber-300 shadow-[0_0_6px_#f59e0b]"
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

