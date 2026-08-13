"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";

interface ConstellationNode {
  id: number;
  name: string;
  icon: string;
  x: number;
  y: number;
  size: number;
  color: string;
}

// 8 Stacks em tons de Roxo, Índigo e Violeta com brilho moderado e elegante
const URSA_MAJOR_NODES: ConstellationNode[] = [
  // 1. Ponta da Cauda (Alkaid)
  {
    id: 0,
    name: "GSAP",
    icon: "/skills/gsap.svg",
    x: 95,
    y: 110,
    size: 42,
    color: "#c084fc", // Lavanda / Roxo claro
  },
  // 2. Curva da Cauda (Mizar)
  {
    id: 1,
    name: "Tailwind",
    icon: "/skills/tailwind.png",
    x: 195,
    y: 155,
    size: 44,
    color: "#a855f7", // Roxo púrpura
  },
  // 3. Junção da Cauda com o Corpo (Alioth)
  {
    id: 2,
    name: "TypeScript",
    icon: "/skills/ts.png",
    x: 305,
    y: 205,
    size: 48,
    color: "#818cf8", // Índigo / Roxo azulado
  },
  // 4. Canto Superior Esquerdo da Panela (Megrez)
  {
    id: 3,
    name: "React",
    icon: "/skills/react.png",
    x: 410,
    y: 265,
    size: 52,
    color: "#a855f7", // Roxo vibrante
  },
  // 5. Canto Superior Direito da Panela (Dubhe)
  {
    id: 4,
    name: "Python",
    icon: "/skills/python.svg",
    x: 535,
    y: 235,
    size: 48,
    color: "#e879f9", // Fuchsia / Magenta
  },
  // 6. Canto Inferior Direito da Panela (Merak)
  {
    id: 5,
    name: "AWS",
    icon: "/skills/aws.svg",
    x: 505,
    y: 435,
    size: 50,
    color: "#fb923c", // Âmbar quente
  },
  // 7. Canto Inferior Esquerdo da Panela (Phecda)
  {
    id: 6,
    name: "SQL",
    icon: "/skills/sql.svg",
    x: 375,
    y: 460,
    size: 46,
    color: "#818cf8", // Índigo
  },
  // 8. Estrela de Apoio / Pata Cósmica (Alula)
  {
    id: 7,
    name: "Docker",
    icon: "/skills/docker.png",
    x: 235,
    y: 530,
    size: 46,
    color: "#9333ea", // Roxo profundo
  },
];

// Linhas astronômicas da URSA MAJOR
const URSA_MAJOR_EDGES = [
  // O Cabo / Cauda
  { start: 0, end: 1, dur: 2.2 }, // GSAP -> Tailwind
  { start: 1, end: 2, dur: 2.3 }, // Tailwind -> TypeScript
  { start: 2, end: 3, dur: 2.4 }, // TypeScript -> React

  // O Corpo / Panela
  { start: 3, end: 4, dur: 2.5 }, // React -> Python
  { start: 4, end: 5, dur: 2.4 }, // Python -> AWS
  { start: 5, end: 6, dur: 2.2 }, // AWS -> SQL
  { start: 6, end: 3, dur: 2.4 }, // SQL -> React

  // Extensão / Apoio
  { start: 6, end: 7, dur: 2.6 }, // SQL -> Docker
  { start: 2, end: 7, dur: 3.2 }, // TypeScript -> Docker
];

export const InteractiveCloud = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = -((y - cy) / cy) * 5;
    const rotY = ((x - cx) / cx) * 5;
    setTilt({ rotateX: rotX, rotateY: rotY });
  };

  const handleMouseLeave = () => {
    setHoveredNode(null);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  if (!isMounted) {
    return <div className="relative w-full h-[720px]" />;
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[720px] flex items-center justify-center select-none overflow-visible group"
      style={{ perspective: "1000px" }}
    >
      {/* 1. Glow Roxo Cósmico de Fundo Discreto */}
      <div className="absolute w-[520px] h-[560px] bg-gradient-to-tr from-purple-950/20 via-indigo-950/15 to-transparent blur-[120px] rounded-full pointer-events-none -z-30" />

      {/* 2. Container da Constelação */}
      <motion.div
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 25 }}
        className="relative w-[620px] h-[620px] transform-style-3d"
      >
        {/* Grade Celestial Linear Discreta */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
          <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.02] to-transparent" />
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/[0.04] to-transparent" />
          <div className="absolute top-3/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.02] to-transparent" />
          <div className="absolute left-1/3 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />
          <div className="absolute left-2/3 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-indigo-500/[0.04] to-transparent" />
        </div>

        {/* Camada SVG: Linhas da Grande Ursa com Feixes Laser Roxos Suaves */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
          <defs>
            {/* Glow Roxo Refinado e Suave */}
            <filter id="purpleGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Gradientes Roxos para os Feixes */}
            <linearGradient id="purpleBeam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#c084fc" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
            </linearGradient>

            <linearGradient id="purpleActiveBeam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e879f9" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>

          {/* Linhas da Ursa Maior */}
          {URSA_MAJOR_EDGES.map((edge, idx) => {
            const startNode = URSA_MAJOR_NODES.find((n) => n.id === edge.start)!;
            const endNode = URSA_MAJOR_NODES.find((n) => n.id === edge.end)!;

            const isDirectConnected =
              hoveredNode !== null && (edge.start === hoveredNode || edge.end === hoveredNode);

            const isHighEnergy = isDirectConnected;
            const lineLen = Math.hypot(endNode.x - startNode.x, endNode.y - startNode.y);

            return (
              <g key={`ursa-purple-edge-${idx}`}>
                {/* 1. Linha Base Sutil */}
                <line
                  x1={startNode.x}
                  y1={startNode.y}
                  x2={endNode.x}
                  y2={endNode.y}
                  stroke={isHighEnergy ? "rgba(192, 132, 252, 0.35)" : "rgba(255, 255, 255, 0.06)"}
                  strokeWidth={isHighEnergy ? 1.4 : 0.8}
                  className="transition-colors duration-300"
                />

                {/* 2. Feixe de Luz Laser Contínuo Suave */}
                <line
                  x1={startNode.x}
                  y1={startNode.y}
                  x2={endNode.x}
                  y2={endNode.y}
                  stroke={isHighEnergy ? "url(#purpleActiveBeam)" : "url(#purpleBeam)"}
                  strokeWidth={isHighEnergy ? 2 : 1.2}
                  strokeDasharray={`${Math.max(18, lineLen * 0.28)} ${lineLen * 1.5}`}
                  strokeLinecap="round"
                  filter="url(#purpleGlow)"
                  className="transition-all duration-300"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from={lineLen * 2}
                    to={0}
                    dur={isHighEnergy ? `${Math.max(1, edge.dur * 0.65)}s` : `${edge.dur}s`}
                    repeatCount="indefinite"
                  />
                </line>

                {/* 3. Fóton de Luz Estelar Suave */}
                <circle
                  r={isHighEnergy ? 2.2 : 1.4}
                  fill="#ffffff"
                  filter="url(#purpleGlow)"
                  opacity={isHighEnergy ? 0.9 : 0.6}
                >
                  <animateMotion
                    path={`M ${startNode.x} ${startNode.y} L ${endNode.x} ${endNode.y}`}
                    dur={isHighEnergy ? `${Math.max(1, edge.dur * 0.65)}s` : `${edge.dur}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}
        </svg>

        {/* As 8 Estrelas da Ursa Maior */}
        {URSA_MAJOR_NODES.map((node) => {
          const isHovered = hoveredNode === node.id;
          const isDirectConnected =
            hoveredNode !== null &&
            URSA_MAJOR_EDGES.some(
              (e) => (e.start === hoveredNode && e.end === node.id) || (e.end === hoveredNode && e.start === node.id)
            );

          const isNodeActive = isHovered;

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
                scale: isHovered ? 1.08 : isDirectConnected ? 1.03 : 1,
              }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="z-20 cursor-pointer"
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <div className="relative flex items-center justify-center p-2">
                {/* Aura Suave (Menos brilho / Mais clean) */}
                <div
                  style={{
                    backgroundColor: isNodeActive ? node.color : "transparent",
                  }}
                  className={`absolute inset-0 rounded-full transition-all duration-300 ${
                    isHovered ? "blur-md opacity-35 scale-120" : "opacity-0"
                  }`}
                />

                {/* Card Translúcido Minimalista com Borda Giratória Sutil */}
                <div className="relative flex items-center justify-center rounded-2xl p-[1px] overflow-hidden group/card shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                  <div
                    className={`absolute inset-[-150%] animate-[spin_3.5s_linear_infinite] transition-opacity duration-300 pointer-events-none ${
                      isNodeActive ? "opacity-90" : "opacity-0 group-hover/card:opacity-60"
                    }`}
                    style={{
                      background: `conic-gradient(from 0deg at 50% 50%, transparent 65%, ${node.color} 100%)`,
                    }}
                  />

                  {/* Conteúdo do Card */}
                  <div
                    className={`relative flex items-center justify-center rounded-[15px] p-2.5 backdrop-blur-xl border transition-all duration-300 ${
                      isNodeActive
                        ? "bg-[#030014]/90 border-purple-400/30"
                        : "bg-[#030014]/75 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <Image
                      src={node.icon}
                      alt={node.name}
                      width={node.size}
                      height={node.size}
                      className="object-contain drop-shadow-[0_0_6px_rgba(255,255,255,0.2)] transition-transform duration-300 group-hover/card:scale-105"
                    />
                  </div>
                </div>

                {/* Etiqueta Discreta de Nome da Stack */}
                <div
                  className={`absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 transition-all duration-300 pointer-events-none whitespace-nowrap z-30 ${
                    isNodeActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
                  }`}
                >
                  <span
                    style={{ backgroundColor: node.color }}
                    className="w-1 h-1 rounded-full"
                  />
                  <span
                    style={{ color: isHovered ? "#ffffff" : node.color }}
                    className="font-mono text-[10px] font-bold uppercase tracking-wider drop-shadow-[0_0_4px_rgba(0,0,0,0.9)]"
                  >
                    {node.name}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Estrelas de Fundo Sutis */}
        {[
          { top: "8%", left: "10%", size: 2, delay: 0 },
          { top: "15%", left: "88%", size: 1.5, delay: 1 },
          { top: "32%", left: "6%", size: 1.5, delay: 2 },
          { top: "48%", left: "95%", size: 2, delay: 0.5 },
          { top: "70%", left: "10%", size: 1.5, delay: 1.5 },
          { top: "88%", left: "88%", size: 2.5, delay: 2.5 },
          { top: "55%", left: "48%", size: 1.5, delay: 1.8 },
        ].map((star, i) => (
          <motion.div
            key={`ursa-subtle-star-${i}`}
            style={{
              position: "absolute",
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: [0.1, 0.5, 0.1],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 3 + (i % 2),
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
            className="rounded-full bg-white shadow-[0_0_4px_#ffffff] pointer-events-none"
          />
        ))}
      </motion.div>
    </div>
  );
};
