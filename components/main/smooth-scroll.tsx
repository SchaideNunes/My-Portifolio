"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth curve
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 2,
    });

    const handlePreloaderComplete = () => {
      lenis.start();
    };

    // Pausa o scroll caso o preloader ainda não tenha finalizado
    if (typeof window !== "undefined" && !(window as any).__preloaderCompleted) {
      lenis.stop();
      window.addEventListener("preloaderComplete", handlePreloaderComplete);
    }

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      window.removeEventListener("preloaderComplete", handlePreloaderComplete);
    };
  }, []);

  return <>{children}</>;
};
