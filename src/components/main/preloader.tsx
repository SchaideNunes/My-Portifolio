"use client";

import { useEffect, useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image } from "@/components/ui/image";
import { FaRocket } from "react-icons/fa";
import { Canvas } from "@react-three/fiber";
import { StarBackground } from "@/components/main/star-background";

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
  }, []);

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
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#000000] overflow-hidden"
        >
          {/* Fundo de estrelas animadas */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 1] }}>
              <Suspense fallback={null}>
                <StarBackground />
              </Suspense>
            </Canvas>
          </div>

          {/* Subtle Glow da Terra */}
          <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
            <div className="w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full" />
          </div>

          {/* Porcentagem de Carregamento (Canto direito) */}
          <div className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12 z-20 text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)] font-sans text-5xl sm:text-7xl font-bold tracking-tighter">
            {Math.round(progress)}%
          </div>

          <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-[280px] sm:max-w-[350px]">
            
            {/* Foguete decolando */}
            <div className="relative w-16 h-48 sm:h-64 flex justify-center items-end mt-12 mb-4">
              {/* A Terra detalhada e a Lua */}
              <div className="absolute -bottom-4 flex items-center justify-center w-32 h-32">
                {/* Glow externo */}
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl" />
                
                {/* Globo terrestre */}
                <div className="relative w-24 h-24 bg-gradient-to-tr from-blue-900 via-blue-600 to-blue-400 rounded-full shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.5),0_0_20px_rgba(59,130,246,0.5)] overflow-hidden">
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
                  <div className="w-5 h-5 bg-gradient-to-tr from-gray-500 to-gray-200 rounded-full shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.4),0_0_5px_rgba(255,255,255,0.3)] flex items-center justify-center overflow-hidden">
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
                  className="text-white text-3xl sm:text-4xl drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                >
                  <FaRocket className="-rotate-45" />
                </motion.div>
                {/* Rastro de fogo */}
                <motion.div
                  animate={{ height: ["15px", "30px", "15px"], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 0.2, repeat: Infinity }}
                  className="w-1.5 bg-gradient-to-b from-orange-500 via-amber-400 to-transparent mt-1 rounded-full blur-[1px]"
                />
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
