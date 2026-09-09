import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    // Configura scrollRestoration como manual para impedir que o navegador
    // tente manter a posição de rolagem antiga ao navegar entre páginas
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    // Se a navegação incluir uma âncora/hash (ex: /#skills)
    if (hash) {
      const scrollToHash = () => {
        const element = document.querySelector(hash);
        if (element) {
          const lenis = (window as any).__lenis;
          if (lenis) {
            lenis.scrollTo(element, { offset: -70 });
          } else {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      };

      // Se mudou de rota (ex: veio de /about para /#skills), aguarda a montagem dos componentes
      if (prevPathnameRef.current !== pathname) {
        const timer = setTimeout(scrollToHash, 150);
        prevPathnameRef.current = pathname;
        return () => clearTimeout(timer);
      } else {
        scrollToHash();
        return;
      }
    }

    // Ao mudar de rota sem hash (ex: para /about, /work ou /), vai imediatamente para o topo do scroll
    const resetScroll = () => {
      const lenis = (window as any).__lenis;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true, force: true });
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    resetScroll();

    // Executa também no próximo frame para garantir caso haja transição de layout
    const rafId = requestAnimationFrame(resetScroll);

    prevPathnameRef.current = pathname;

    return () => cancelAnimationFrame(rafId);
  }, [pathname, hash]);

  return null;
};
