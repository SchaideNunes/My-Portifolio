"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useSpring } from "framer-motion";
import { Image } from "@/components/ui/image";

interface ConstellationNode {
  id: number;
  name: string;
  category: "frontend" | "backend" | "cloud";
  icon: string;
  x: number;
  y: number;
  size: number;
  color: string;
  glowColor: string;
}

// 8 Stacks organizadas em 3 camadas arquiteturais
const CONSTELLATION_NODES: ConstellationNode[] = [
  // Camada 1: Frontend & UI (Topo)
  {
    id: 0,
    name: "React",
    category: "frontend",
    icon: "/skills/react.png",
    x: 300,
    y: 95,
    size: 52,
    color: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.7)"
  },
  {
    id: 1,
    name: "TypeScript",
    category: "frontend",
    icon: "/skills/ts.png",
    x: 160,
    y: 150,
    size: 46,
    color: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.6)"
  },
  {
    id: 2,
    name: "Tailwind",
    category: "frontend",
    icon: "/skills/tailwind.png",
    x: 440,
    y: 150,
    size: 46,
    color: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.6)"
  },
  {
    id: 3,
    name: "GSAP",
    category: "frontend",
    icon: "/skills/gsap.svg",
    x: 300,
    y: 220,
    size: 44,
    color: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.6)"
  },

  // Camada 2: Backend & Data (Centro)
  {
    id: 4,
    name: "Python",
    category: "backend",
    icon: "/skills/python.svg",
    x: 195,
    y: 345,
    size: 48,
    color: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.7)"
  },
  {
    id: 5,
    name: "SQL",
    category: "backend",
    icon: "/skills/sql.svg",
    x: 405,
    y: 345,
    size: 46,
    color: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.7)"
  },

  // Camada 3: DevOps & Cloud (Base)
  {
    id: 6,
    name: "Docker",
    category: "cloud",
    icon: "/skills/docker.png",
    x: 195,
    y: 485,
    size: 48,
    color: "#818cf8",
    glowColor: "rgba(129, 140, 248, 0.7)"
  },
  {
    id: 7,
    name: "AWS",
    category: "cloud",
    icon: "/skills/aws.svg",
    x: 405,
    y: 485,
    size: 52,
    color: "#fb923c",
    glowColor: "rgba(251, 146, 60, 0.7)"
  },
];

// Conexões da constelação
const CONSTELLATION_EDGES = [
  // Camada 1: Frontend Ecosystem
  { start: 0, end: 1, type: "intra", dur: 2.2 },
  { start: 0, end: 2, type: "intra", dur: 2.4 },
  { start: 0, end: 3, type: "intra", dur: 2.0 },
  { start: 1, end: 3, type: "intra", dur: 2.5 },
  { start: 2, end: 3, type: "intra", dur: 2.3 },

  // Camada 2: Backend Ecosystem
  { start: 4, end: 5, type: "intra", dur: 2.1 },

  // Camada 3: Cloud Ecosystem
  { start: 6, end: 7, type: "intra", dur: 2.2 },

  // Pontes Inter-camadas (Frontend -> Backend)
  { start: 3, end: 4, type: "bridge", dur: 3.0 },
  { start: 3, end: 5, type: "bridge", dur: 2.8 },
  { start: 1, end: 4, type: "bridge", dur: 3.2 },

  // Pontes Inter-camadas (Backend -> Cloud)
  { start: 4, end: 6, type: "bridge", dur: 2.6 },
  { start: 5, end: 7, type: "bridge", dur: 2.7 },
  { start: 4, end: 7, type: "bridge", dur: 3.4 },
  { start: 6, end: 5, type: "bridge", dur: 3.1 },
];

const LAYERS_INFO = [
  { label: "FRONTEND & UI", y: 40, color: "text-sky-400", dot: "bg-sky-400 shadow-[0_0_8px_#38bdf8]" },
  { label: "BACKEND & DATA", y: 285, color: "text-amber-400", dot: "bg-amber-400 shadow-[0_0_8px_#fbbf24]" },
  { label: "DEVOPS & CLOUD", y: 425, color: "text-indigo-400", dot: "bg-indigo-400 shadow-[0_0_8px_#818cf8]" },
];

// Distância de um ponto a um segmento de reta (para proximidade com o mouse)
function distToSegment(px: number, py: number, x1: number, y1: number, x2: number, y2: number) {
  const l2 = (x2 - x1) ** 2 + (y2 - y1) ** 2;
  if (l2 === 0) return Math.hypot(px - x1, py - y1);
  let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (x1 + t * (x2 - x1)), py - (y1 + t * (y2 - y1)));
}

export const InteractiveCloud = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Efeito magnético suave
  const springX = useSpring(0, { stiffness: 120, damping: 15 });
  const springY = useSpring(0, { stiffness: 120, damping: 15 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Leve inclinação 3D cósmica ao mover o mouse
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    springX.set((x - centerX) * 0.04);
    springY.set((y - centerY) * 0.04);
  };

  const handleMouseLeave = () => {
    setMousePos(null);
    setHoveredNode(null);
    springX.set(0);
    springY.set(0);
  };

  if (!isMounted) {
    return <div className="relative w-full h-[700px]" />;
  }

  const activeCategory = hoveredNode !== null ? CONSTELLATION_NODES.find(n => n.id === hoveredNode)?.category : null;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[700px] flex items-center justify-center select-none overflow-visible group"
    >
      {/* Luz cósmica dinâmica seguindo o cursor do mouse */}
      {mousePos && (
        <div
          style={{
            left: mousePos.x,
            top: mousePos.y,
            transform: "translate(-50%, -50%)",
          }}
          className="absolute w-64 h-64 bg-radial from-amber-500/15 via-sky-500/10 to-transparent blur-3xl pointer-events-none rounded-full transition-opacity duration-300 z-0"
        />
      )}

      {/* Glow de Fundo Constante */}
      <div className="absolute w-[520px] h-[580px] bg-gradient-to-b from-sky-950/20 via-amber-950/20 to-indigo-950/20 blur-[130px] rounded-full pointer-events-none -z-30" />

      {/* Container principal com leve parallax magnético */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="relative w-[600px] h-[600px]"
      >
        {/* Rótulos das 3 Camadas Cósmicas */}
        {LAYERS_INFO.map((layer, idx) => (
          <div
            key={`layer-label-${idx}`}
            style={{ top: layer.y }}
            className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-[#030014]/60 border border-white/[0.06] backdrop-blur-md pointer-events-none z-0 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${layer.dot}`} />
            <span className={`font-mono text-[10px] font-bold tracking-[0.25em] ${layer.color} opacity-90 uppercase`}>
              {layer.label}
            </span>
          </div>
        ))}

        {/* Camada SVG: Linhas animadas com feixe de luz em movimento contínuo */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
          <defs>
            {/* Filtros de Brilho Cósmico Laser */}
            <filter id="beamGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Gradientes dos Feixes Laser */}
            <linearGradient id="beamFrontend" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>

            <linearGradient id="beamBackend" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>

            <linearGradient id="beamCloud" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#fb923c" />
            </linearGradient>

            <linearGradient id="beamBridge" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>

            <linearGradient id="activeShockwave" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>

          {/* Renderização das Linhas com Feixes Laser em Movimento */}
          {CONSTELLATION_EDGES.map((edge, idx) => {
            const startNode = CONSTELLATION_NODES.find((n) => n.id === edge.start)!;
            const endNode = CONSTELLATION_NODES.find((n) => n.id === edge.end)!;

            // Proximidade com o cursor do mouse
            let mouseNearLine = false;
            if (mousePos) {
              const d = distToSegment(mousePos.x, mousePos.y, startNode.x, startNode.y, endNode.x, endNode.y);
              if (d < 65) mouseNearLine = true;
            }

            const isDirectConnected = hoveredNode === edge.start || hoveredNode === edge.end;
            const isSameCategory =
              activeCategory !== null &&
              startNode.category === activeCategory &&
              endNode.category === activeCategory;

            const isHighEnergy = isDirectConnected || isSameCategory || mouseNearLine;

            // Determina gradiente do feixe
            let beamGradient = "url(#beamBridge)";
            if (edge.type === "intra") {
              if (startNode.category === "frontend") beamGradient = "url(#beamFrontend)";
              else if (startNode.category === "backend") beamGradient = "url(#beamBackend)";
              else beamGradient = "url(#beamCloud)";
            }
            if (isHighEnergy) beamGradient = "url(#activeShockwave)";

            // Comprimento da linha
            const lineLen = Math.hypot(endNode.x - startNode.x, endNode.y - startNode.y);

            return (
              <g key={`beam-edge-${idx}`}>
                {/* 1. Linha Base Sutil de Conexão */}
                <line
                  x1={startNode.x}
                  y1={startNode.y}
                  x2={endNode.x}
                  y2={endNode.y}
                  stroke={isHighEnergy ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.07)"}
                  strokeWidth={isHighEnergy ? 2 : 1}
                  className="transition-colors duration-300"
                />

                {/* 2. Feixe de Luz Circulando / Correndo Contínuo (Efeito Estilo Header) */}
                <line
                  x1={startNode.x}
                  y1={startNode.y}
                  x2={endNode.x}
                  y2={endNode.y}
                  stroke={beamGradient}
                  strokeWidth={isHighEnergy ? 3.5 : 2}
                  strokeDasharray={`${Math.max(25, lineLen * 0.35)} ${lineLen * 1.5}`}
                  strokeLinecap="round"
                  filter="url(#beamGlow)"
                  className="transition-all duration-300"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from={lineLen * 2}
                    to={0}
                    dur={isHighEnergy ? `${Math.max(1, edge.dur * 0.55)}s` : `${edge.dur}s`}
                    repeatCount="indefinite"
                  />
                </line>

                {/* 3. Fóton de Luz Brilhante na ponta do feixe */}
                <circle
                  r={isHighEnergy ? 3.5 : 2}
                  fill="#ffffff"
                  filter="url(#beamGlow)"
                  opacity={isHighEnergy ? 1 : 0.75}
                >
                  <animateMotion
                    path={`M ${startNode.x} ${startNode.y} L ${endNode.x} ${endNode.y}`}
                    dur={isHighEnergy ? `${Math.max(1, edge.dur * 0.55)}s` : `${edge.dur}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}
        </svg>

        {/* Nós das Tecnologias (com borda de luz giratória e atração magnética) */}
        {CONSTELLATION_NODES.map((node) => {
          const isHovered = hoveredNode === node.id;
          const isCategoryHovered = activeCategory !== null && node.category === activeCategory;
          const isDirectConnected =
            hoveredNode !== null &&
            CONSTELLATION_EDGES.some(
              (e) => (e.start === hoveredNode && e.end === node.id) || (e.end === hoveredNode && e.start === node.id)
            );

          // Proximidade com o cursor
          let isMouseNear = false;
          let pullX = 0;
          let pullY = 0;
          if (mousePos) {
            const dist = Math.hypot(mousePos.x - node.x, mousePos.y - node.y);
            if (dist < 120) {
              isMouseNear = true;
              // Efeito de atração magnética cósmica suave em direção ao cursor
              const pullStrength = (120 - dist) * 0.08;
              pullX = ((mousePos.x - node.x) / dist) * pullStrength;
              pullY = ((mousePos.y - node.y) / dist) * pullStrength;
            }
          }

          const isNodeActive = isHovered || isDirectConnected || isCategoryHovered || isMouseNear;

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
                x: pullX,
                y: pullY,
                scale: isHovered ? 1.3 : isMouseNear ? 1.15 : isNodeActive ? 1.08 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 18,
              }}
              className="z-20 cursor-pointer"
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <div className="relative flex items-center justify-center p-3">
                {/* Aura Cósmica Pulsante ao Redor do Card */}
                <div
                  style={{
                    backgroundColor: isNodeActive ? node.color : "rgba(255,255,255,0.05)",
                  }}
                  className={`absolute inset-0 rounded-3xl transition-all duration-500 ${
                    isHovered
                      ? "blur-2xl opacity-75 scale-160"
                      : isNodeActive
                      ? "blur-xl opacity-45 scale-130"
                      : "blur-md opacity-10"
                  }`}
                />

                {/* Card Translúcido com Feixe de Borda Giratório (Estilo Header) */}
                <div className="relative flex items-center justify-center rounded-2xl p-[1px] overflow-hidden group/card shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                  {/* Borda de Luz Laser Giratória com Conic Gradient */}
                  <div
                    className={`absolute inset-[-150%] animate-[spin_3s_linear_infinite] transition-opacity duration-500 pointer-events-none ${
                      isHovered
                        ? "opacity-100"
                        : isNodeActive
                        ? "opacity-60"
                        : "opacity-0 group-hover/card:opacity-100"
                    }`}
                    style={{
                      background: `conic-gradient(from 0deg at 50% 50%, transparent 60%, ${node.color} 100%)`,
                    }}
                  />

                  {/* Conteúdo Interno do Card */}
                  <div className="relative flex items-center justify-center rounded-[15px] p-2.5 bg-[#030014]/90 backdrop-blur-xl border border-white/10 z-10">
                    <Image
                      src={node.icon}
                      alt={node.name}
                      width={node.size}
                      height={node.size}
                      className="object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-transform duration-300 group-hover/card:scale-110"
                    />
                  </div>
                </div>

                {/* Etiqueta de Nome da Stack com Brilho Cósmico */}
                <div
                  className={`absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 transition-all duration-300 pointer-events-none whitespace-nowrap z-30 ${
                    isHovered ? "opacity-100 translate-y-0" : isCategoryHovered ? "opacity-90 translate-y-0" : isMouseNear ? "opacity-80 translate-y-0" : "opacity-0 -translate-y-1"
                  }`}
                >
                  <span
                    style={{ backgroundColor: node.color }}
                    className="w-1.5 h-1.5 rounded-full shadow-[0_0_6px_currentColor]"
                  />
                  <span
                    style={{ color: isHovered ? "#ffffff" : node.color }}
                    className="font-mono text-[11px] font-bold uppercase tracking-wider drop-shadow-[0_0_8px_rgba(0,0,0,0.9)]"
                  >
                    {node.name}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Micro-estrelas / Poeira Estelar Cintilante */}
        {[
          { top: "10%", left: "10%", size: 3, delay: 0 },
          { top: "18%", left: "88%", size: 2.5, delay: 1 },
          { top: "32%", left: "6%", size: 2, delay: 2 },
          { top: "52%", left: "94%", size: 3, delay: 0.5 },
          { top: "72%", left: "10%", size: 2.5, delay: 1.5 },
          { top: "86%", left: "88%", size: 3.5, delay: 2.5 },
          { top: "62%", left: "50%", size: 2, delay: 1.8 },
        ].map((star, i) => (
          <motion.div
            key={`stardust-${i}`}
            style={{
              position: "absolute",
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: [0.15, 0.8, 0.15],
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
      </motion.div>
    </div>
  );
};
