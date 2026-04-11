"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      
      // Dispara o evento "preloaderComplete" após o delay da animação de saída, para as animações de entrada começarem perfeitamente no timing
      setTimeout(() => {
        window.dispatchEvent(new Event("preloaderComplete"));
      }, 800); 
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
        >
          {/* Planetas ao fundo */}
          <motion.div 
            initial={{ scale: 1, opacity: 0.2 }}
            animate={{ scale: 1.05, opacity: 0.4 }}
            transition={{ duration: 3, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
            className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center"
          >
            <div className="relative w-full h-full max-w-[1200px] max-h-[1200px]">
               <Image 
                 src="/Planetas_new.png" 
                 alt="Planets" 
                 fill
                 className="object-cover md:object-contain opacity-50 mix-blend-lighten"
                 priority
               />
            </div>
          </motion.div>

          {/* Subtle Glow */}
          <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
            <div className="w-[400px] h-[400px] bg-amber-600/10 blur-[120px] rounded-full" />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-[280px] sm:max-w-[350px]">
            <div className="w-full flex justify-between items-end text-amber-500 font-mono text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
              <span>System</span>
              <span>{Math.round(progress)}%</span>
            </div>

            {/* Barra de Loading minimalista */}
            <div className="w-full h-[2px] bg-white/10 relative overflow-hidden rounded-full">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-600 to-amber-400"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <motion.div 
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="text-gray-500 text-[10px] tracking-[0.3em] uppercase"
            >
              Loading experience...
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
