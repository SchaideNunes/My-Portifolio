"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const duration = 2000; // total duration 2 seconds
    const intervalTime = 20;
    const increment = 100 / (duration / intervalTime);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
          }, 300); // small delay at 100% before fading out
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#000000] overflow-hidden"
        >
          {/* Subtle star-like flickering background elements right inside preloader */}
          <div className="absolute inset-0 z-0">
            {/* Generate deterministic stars to avoid hydration mismatch */}
            {[...Array(40)].map((_, i) => {
              const size = (i % 3) + 1;
              const top = (i * 17) % 100;
              const left = (i * 31) % 100;
              const isAmber = i % 4 === 0;
              const duration = (i % 3) + 2;
              const delay = (i % 5) * 0.5;

              return (
                <motion.div
                  key={i}
                  className="absolute bg-white rounded-full bg-opacity-80"
                  style={{
                    width: size,
                    height: size,
                    top: `${top}%`,
                    left: `${left}%`,
                    backgroundColor: isAmber ? '#fcd34d' : '#ffffff'
                  }}
                  animate={{
                    opacity: [0.1, 1, 0.1],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: duration,
                    repeat: Infinity,
                    delay: delay,
                    ease: "easeInOut"
                  }}
                />
              );
            })}

            {/* Shooting Star */}
            <motion.div
              className="absolute w-[200px] h-[1px] bg-gradient-to-r from-transparent via-amber-300 to-white"
              style={{
                top: "10%",
                left: "-10%",
                rotate: "30deg"
              }}
              animate={{
                x: ["0vw", "110vw"],
                y: ["0vh", "60vh"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 4,
                ease: "linear",
              }}
            />
          </div>
          
          {/* Deep Space Background Glow behind the loader */}
          <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
             <div className="w-[500px] h-[500px] bg-amber-600/10 blur-[100px] rounded-full" />
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
            <div className="relative flex items-center justify-center w-64 h-64">
              {/* Pulsing outer ring */}
              <motion.div
                className="absolute w-48 h-48 rounded-full border border-amber-600/20"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Inner orbital ring */}
              <motion.div
                className="absolute w-36 h-36 rounded-full border-t border-b border-amber-500/80 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Counter Text */}
              <h1 className="absolute text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)] tracking-widest font-mono">
                {Math.round(progress)}<span className="text-3xl text-amber-500/50 absolute top-0 -right-8">%</span>
              </h1>
            </div>
            
            {/* Subtext */}
            <motion.div 
              className="mt-8"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-amber-500/80 tracking-[0.4em] uppercase text-xs font-light">
                System Online
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
