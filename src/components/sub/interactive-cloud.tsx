"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";

// 8 Tecnologias solicitadas
const CONSTELLATION_NODES = [
  { id: 0, name: "React", icon: "/skills/react.png", x: 300, y: 110, floatX: [0, 8, -6, 0], floatY: [0, -10, 6, 0], duration: 7, size: 52 },
  { id: 1, name: "TypeScript", icon: "/skills/ts.png", x: 160, y: 190, floatX: [0, -10, 6, 0], floatY: [0, 8, -8, 0], duration: 8, size: 46 },
  { id: 2, name: "Python", icon: "/skills/python.svg", x: 440, y: 180, floatX: [0, 10, -8, 0], floatY: [0, 6, -10, 0], duration: 7.5, size: 48 },
  { id: 3, name: "Docker", icon: "/skills/docker.png", x: 120, y: 340, floatX: [0, 6, -10, 0], floatY: [0, -8, 8, 0], duration: 9, size: 48 },
  { id: 4, name: "AWS", icon: "/skills/aws.svg", x: 470, y: 330, floatX: [0, -8, 10, 0], floatY: [0, 10, -6, 0], duration: 8.5, size: 52 },
  { id: 5, name: "Tailwind", icon: "/skills/tailwind.png", x: 295, y: 285, floatX: [0, -6, 8, 0], floatY: [0, -6, 10, 0], duration: 6.5, size: 46 },
  { id: 6, name: "GSAP", icon: "/skills/gsap.svg", x: 190, y: 470, floatX: [0, 8, -6, 0], floatY: [0, 10, -8, 0], duration: 8, size: 44 },
  { id: 7, name: "SQL", icon: "/skills/sql.svg", x: 410, y: 460, floatX: [0, -10, 8, 0], floatY: [0, -8, 6, 0], duration: 7.8, size: 46 },
];

// Linhas da Constelação interligando as tecnologias
const CONSTELLATION_EDGES = [
  [0, 1], // React - TypeScript
  [0, 2], // React - Python
  [0, 5], // React - Tailwind
  [1, 3], // TypeScript - Docker
  [1, 5], // TypeScript - Tailwind
  [2, 4], // Python - AWS
  [2, 5], // Python - Tailwind
  [3, 6], // Docker - GSAP
  [3, 5], // Docker - Tailwind
  [4, 7], // AWS - SQL
  [4, 5], // AWS - Tailwind
  [5, 6], // Tailwind - GSAP
  [5, 7], // Tailwind - SQL
  [6, 7], // GSAP - SQL
];

export const InteractiveCloud = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="relative w-full h-[700px]" />;
  }

  return (
    <div className="relative w-full h-[700px] flex items-center justify-center select-none overflow-visible">
      {/* Glow espacial cósmico no fundo */}
      <div className="absolute w-[550px] h-[550px] bg-gradient-to-tr from-amber-500/10 via-cyan-500/10 to-indigo-500/10 blur-[130px] rounded-full pointer-events-none -z-30" />

      <div className="relative w-[600px] h-[600px]">
        {/* Gráfico Celestial / Astrolábio de Fundo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Círculos de Órbita de Constelação */}
          <div className="w-[500px] h-[500px] rounded-full border border-white/[0.04] animate-[spin_120s_linear_infinite]" />
          <div className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-cyan-500/[0.08] animate-[spin_90s_linear_infinite_reverse]" />
          <div className="absolute w-[220px] h-[220px] rounded-full border border-amber-500/[0.08]" />

          {/* Eixos cardeais e mira cósmica */}
          <div className="absolute w-[520px] h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          <div className="absolute h-[520px] w-[1px] bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />
          <div className="absolute w-[440px] h-[440px] rounded-full border border-white/[0.02] rotate-45" />
        </div>

        {/* Camada SVG das Linhas da Constelação */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
          <defs>
            {/* Gradiente pulsante para as linhas */}
            <linearGradient id="constellationLine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="activeLine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.9" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Render das Linhas Conectadas */}
          {CONSTELLATION_EDGES.map(([startId, endId], idx) => {
            const startNode = CONSTELLATION_NODES.find((n) => n.id === startId)!;
            const endNode = CONSTELLATION_NODES.find((n) => n.id === endId)!;
            const isConnectedToHovered = hoveredNode === startId || hoveredNode === endId;

            return (
              <g key={`edge-${idx}`}>
                {/* Linha base */}
                <line
                  x1={startNode.x}
                  y1={startNode.y}
                  x2={endNode.x}
                  y2={endNode.y}
                  stroke={isConnectedToHovered ? "url(#activeLine)" : "url(#constellationLine)"}
                  strokeWidth={isConnectedToHovered ? 2.2 : 1.2}
                  strokeDasharray={isConnectedToHovered ? "none" : "3, 3"}
                  filter={isConnectedToHovered ? "url(#glow)" : undefined}
                  className="transition-all duration-300"
                />

                {/* Pulso de luz viajando pela linha */}
                <circle r={isConnectedToHovered ? 2.5 : 1.5} fill="#fbbf24" opacity={0.8}>
                  <animateMotion
                    path={`M ${startNode.x} ${startNode.y} L ${endNode.x} ${endNode.y}`}
                    dur={`${4 + (idx % 4)}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}
        </svg>

        {/* Nós das Tecnologias (Estrelas da Constelação) */}
        {CONSTELLATION_NODES.map((node) => {
          const isHovered = hoveredNode === node.id;
          const isConnected =
            hoveredNode !== null &&
            CONSTELLATION_EDGES.some(
              ([a, b]) => (a === hoveredNode && b === node.id) || (b === hoveredNode && a === node.id)
            );

          return (
            <motion.div
              key={node.name}
              style={{
                position: "absolute",
                left: node.x,
                top: node.y,
                translateX: "-50%",
                translateY: "-50%",
              }}
              animate={{
                x: node.floatX,
                y: node.floatY,
              }}
              transition={{
                duration: node.duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="z-20 cursor-pointer"
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              whileHover={{ scale: 1.25 }}
            >
              {/* Núcleo Estelar / Halo de Brilho Cósmico */}
              <div className="relative flex items-center justify-center p-3">
                {/* Aura de pulsar da estrela */}
                <div
                  className={`absolute inset-0 rounded-full transition-all duration-500 ${
                    isHovered
                      ? "bg-amber-400/40 blur-xl scale-150"
                      : isConnected
                      ? "bg-sky-400/30 blur-lg scale-125"
                      : "bg-amber-500/15 blur-md"
                  }`}
                />

                {/* Container do Ícone com vidro translúcido */}
                <div
                  className={`relative flex items-center justify-center rounded-2xl p-2.5 backdrop-blur-md transition-all duration-300 border ${
                    isHovered
                      ? "bg-black/80 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.7)]"
                      : isConnected
                      ? "bg-black/60 border-sky-400/60 shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                      : "bg-[#030014]/60 border-white/10 hover:border-white/30"
                  }`}
                >
                  <Image
                    src={node.icon}
                    alt={node.name}
                    width={node.size}
                    height={node.size}
                    className="object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-transform duration-300"
                  />
                </div>

                {/* Tag de Nome da Tecnologia / Constelação */}
                <div
                  className={`absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 transition-all duration-300 pointer-events-none whitespace-nowrap ${
                    isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
                  }`}
                >
                  <span className="w-1 h-1 rounded-full bg-amber-400 shadow-[0_0_5px_#fbbf24]" />
                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]">
                    {node.name}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Micro-estrelas / Poeira Estelar Cintilante */}
        {[
          { top: "15%", left: "25%", size: 3, delay: 0 },
          { top: "25%", left: "75%", size: 2, delay: 1 },
          { top: "45%", left: "10%", size: 2.5, delay: 2 },
          { top: "65%", left: "80%", size: 3, delay: 0.5 },
          { top: "80%", left: "30%", size: 2, delay: 1.5 },
          { top: "85%", left: "65%", size: 3.5, delay: 2.5 },
          { top: "35%", left: "48%", size: 2, delay: 1.2 },
        ].map((star, i) => (
          <motion.div
            key={`star-${i}`}
            style={{
              position: "absolute",
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: [0.2, 0.9, 0.2],
              scale: [0.8, 1.4, 0.8],
            }}
            transition={{
              duration: 3 + (i % 2),
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
            className="rounded-full bg-white shadow-[0_0_8px_#ffffff] pointer-events-none"
          />
        ))}
      </div>
    </div>
  );
};
