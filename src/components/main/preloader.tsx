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

          {/* Telemetria Cósmica (Canto Inferior Esquerdo) */}
          <div className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12 z-20 flex flex-col gap-2 pointer-events-none">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
              </span>
              <span className="text-[11px] sm:text-xs font-mono tracking-widest text-gray-400 uppercase">
                Launch Sequence
              </span>
            </div>
            {/* Barra mini de progresso */}
            <div className="w-32 sm:w-44 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300 shadow-[0_0_8px_rgba(251,191,36,0.8)] transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Porcentagem de Carregamento (Canto Inferior Direito) */}
          <div className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12 z-20 flex items-baseline gap-1 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)] font-sans text-5xl sm:text-7xl font-bold tracking-tighter">
            <span>{Math.round(progress)}</span>
            <span className="text-2xl sm:text-3xl text-amber-300/80 font-normal">%</span>
          </div>

          {/* Elemento Central: Foguete, Terra e Órbita */}
          <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-[280px] sm:max-w-[350px]">
            
            {/* Foguete decolando */}
            <div className="relative w-16 h-52 sm:h-72 flex justify-center items-end mt-12 mb-4">
              
              {/* A Terra detalhada e a Lua */}
              <div className="absolute -bottom-4 flex items-center justify-center w-32 h-32">
                {/* Glow externo */}
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
                
                {/* Globo terrestre */}
                <div className="relative w-24 h-24 bg-gradient-to-tr from-blue-950 via-blue-600 to-cyan-400 rounded-full shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.6),0_0_25px_rgba(59,130,246,0.5)] overflow-hidden">
                  {/* Continentes */}
                  <div className="absolute top-2 left-4 w-12 h-8 bg-green-500/80 rounded-[40%] rotate-12 blur-[1px]" />
                  <div className="absolute bottom-4 right-2 w-10 h-6 bg-green-600/80 rounded-[50%] -rotate-12 blur-[1px]" />
                  <div className="absolute top-10 -left-2 w-8 h-10 bg-green-500/70 rounded-full blur-[1px]" />
                  
                  {/* Nuvens */}
                  <div className="absolute top-4 right-4 w-10 h-3 bg-white/40 rounded-full blur-[2px] rotate-45" />
                  <div className="absolute bottom-6 left-6 w-8 h-2 bg-white/30 rounded-full blur-[1px] -rotate-12" />
                  
                  {/* Atmosfera */}
                  <div className="absolute inset-0 rounded-full shadow-[inset_3px_3px_10px_rgba(255,255,255,0.4)] pointer-events-none" />
                </div>

                {/* A Lua em órbita */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute w-36 h-36 flex items-start justify-end"
                >
                  <div className="w-5 h-5 bg-gradient-to-tr from-gray-500 to-gray-200 rounded-full shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.4),0_0_6px_rgba(255,255,255,0.4)] flex items-center justify-center overflow-hidden">
                    {/* Crateras da lua */}
                    <div className="absolute top-1 left-1 w-1 h-1 bg-gray-400/80 rounded-full" />
                    <div className="absolute bottom-1 right-1.5 w-1.5 h-1.5 bg-gray-400/70 rounded-full" />
                    <div className="absolute top-2.5 right-1 w-0.5 h-0.5 bg-gray-500/80 rounded-full" />
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

