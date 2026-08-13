"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image } from "@/components/ui/image";

interface ConstellationNode {
  id: number;
  name: string;
  role: string;
  category: "Frontend" | "Backend" | "Cloud" | "Core";
  icon: string;
  x: number;
  y: number;
  size: number;
  color: string;
  glowColor: string;
}

// 8 Stacks dispostas em um Nexus Cósmico Geométrico (Estrela Central + Coroa Estelar)
const CONSTELLATION_NODES: ConstellationNode[] = [
  // 1. Núcleo Cósmico Central (The Nexus)
  {
    id: 0,
    name: "React",
    role: "Core UI Architecture",
    category: "Core",
    icon: "/skills/react.png",
    x: 300,
    y: 280,
    size: 58,
    color: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.85)"
  },
  // 2. Estrela do Norte (Apex Superior)
  {
    id: 1,
    name: "TypeScript",
    role: "Type-Safe Development",
    category: "Frontend",
    icon: "/skills/ts.png",
    x: 300,
    y: 90,
    size: 48,
    color: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.75)"
  },
  // 3. Estrela Noroeste (Motion & FX)
  {
    id: 2,
    name: "GSAP",
    role: "Creative Animations",
    category: "Frontend",
    icon: "/skills/gsap.svg",
    x: 135,
    y: 165,
    size: 46,
    color: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.75)"
  },
  // 4. Estrela Nordeste (Design System)
  {
    id: 3,
    name: "Tailwind",
    role: "Modern UI Styling",
    category: "Frontend",
    icon: "/skills/tailwind.png",
    x: 465,
    y: 165,
    size: 46,
    color: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.75)"
  },
  // 5. Estrela Sudoeste (Backend Logic)
  {
    id: 4,
    name: "Python",
    role: "Automation & Backend Logic",
    category: "Backend",
    icon: "/skills/python.svg",
    x: 125,
    y: 395,
    size: 50,
    color: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.85)"
  },
  // 6. Estrela Sudeste (Cloud Infrastructure)
  {
    id: 5,
    name: "AWS",
    role: "Cloud Services & Deploy",
    category: "Cloud",
    icon: "/skills/aws.svg",
    x: 475,
    y: 395,
    size: 52,
    color: "#fb923c",
    glowColor: "rgba(251, 146, 60, 0.85)"
  },
  // 7. Base Sul-Esquerda (Data Storage)
  {
    id: 6,
    name: "SQL",
    role: "Relational Database & Queries",
    category: "Backend",
    icon: "/skills/sql.svg",
    x: 215,
    y: 505,
    size: 48,
    color: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.8)"
  },
  // 8. Base Sul-Direita (Containers)
  {
    id: 7,
    name: "Docker",
    role: "Containerization & DevOps",
    category: "Cloud",
    icon: "/skills/docker.png",
    x: 385,
    y: 505,
    size: 48,
    color: "#818cf8",
    glowColor: "rgba(129, 140, 248, 0.8)"
  },
];

// Conexões Estelares formando um Octógono / Nexus Sagrado
const CONSTELLATION_EDGES = [
  // 1. Anel Externo da Constelação (Crown)
  { start: 1, end: 3, type: "perimeter", dur: 2.4 }, // TS -> Tailwind
  { start: 3, end: 5, type: "perimeter", dur: 2.6 }, // Tailwind -> AWS
  { start: 5, end: 7, type: "perimeter", dur: 2.2 }, // AWS -> Docker
  { start: 7, end: 6, type: "perimeter", dur: 2.0 }, // Docker -> SQL
  { start: 6, end: 4, type: "perimeter", dur: 2.2 }, // SQL -> Python
  { start: 4, end: 2, type: "perimeter", dur: 2.6 }, // Python -> GSAP
  { start: 2, end: 1, type: "perimeter", dur: 2.4 }, // GSAP -> TS

  // 2. Raios Centrais (Nexus Radiance do React para todas as stacks)
  { start: 0, end: 1, type: "radial", dur: 2.0 }, // React <-> TS
  { start: 0, end: 2, type: "radial", dur: 2.2 }, // React <-> GSAP
  { start: 0, end: 3, type: "radial", dur: 2.2 }, // React <-> Tailwind
  { start: 0, end: 4, type: "radial", dur: 2.5 }, // React <-> Python
  { start: 0, end: 5, type: "radial", dur: 2.5 }, // React <-> AWS
  { start: 0, end: 6, type: "radial", dur: 2.3 }, // React <-> SQL
  { start: 0, end: 7, type: "radial", dur: 2.3 }, // React <-> Docker

  // 3. Pontes Estruturais Internas
  { start: 2, end: 3, type: "cross", dur: 3.0 }, // GSAP <-> Tailwind
  { start: 4, end: 6, type: "cross", dur: 2.2 }, // Python <-> SQL
  { start: 7, end: 5, type: "cross", dur: 2.2 }, // Docker <-> AWS
];

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
}

export const InteractiveCloud = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [shockwaves, setShockwaves] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Animação de partículas de poeira estelar ao clicar/interagir
  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            size: p.size * 0.94,
          }))
          .filter((p) => p.size > 0.4)
      );
    }, 24);
    return () => clearInterval(interval);
  }, [particles]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Inclinação 3D Parallax Suave
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = -((y - cy) / cy) * 12;
    const rotY = ((x - cx) / cx) * 12;
    setTilt({ rotateX: rotX, rotateY: rotY });
  };

  const handleMouseLeave = () => {
    setMousePos(null);
    setHoveredNode(null);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  // Clique em uma estrela: Dispara onda de choque supernova + partículas estelares
  const handleNodeClick = (node: ConstellationNode) => {
    setSelectedNode((prev) => (prev === node.id ? null : node.id));

    // Adiciona onda de choque
    const waveId = Date.now();
    setShockwaves((prev) => [...prev, { id: waveId, x: node.x, y: node.y, color: node.color }]);
    setTimeout(() => {
      setShockwaves((prev) => prev.filter((w) => w.id !== waveId));
    }, 1200);

    // Gera 12 partículas estelares explosivas
    const newParticles: Particle[] = Array.from({ length: 14 }).map((_, i) => {
      const angle = (i / 14) * Math.PI * 2;
      const speed = 2 + Math.random() * 4;
      return {
        id: Math.random(),
        x: node.x,
        y: node.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: node.color,
        size: 3.5 + Math.random() * 3,
      };
    });
    setParticles((prev) => [...prev, ...newParticles]);
  };

  // Encontra os 2 nós mais próximos do cursor do mouse para a corda cósmica (interactive tether)
  const closestNodesToMouse = useMemo(() => {
    if (!mousePos) return [];
    return CONSTELLATION_NODES.map((node) => ({
      node,
      dist: Math.hypot(mousePos.x - node.x, mousePos.y - node.y),
    }))
      .filter((item) => item.dist < 160)
      .sort((a, b) => a.dist - b.dist)
      .slice(0, 2)
      .map((item) => item.node);
  }, [mousePos]);

  if (!isMounted) {
    return <div className="relative w-full h-[720px]" />;
  }

  const activeNodeId = hoveredNode !== null ? hoveredNode : selectedNode;
  const activeNode = activeNodeId !== null ? CONSTELLATION_NODES.find((n) => n.id === activeNodeId) : null;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[720px] flex items-center justify-center select-none overflow-visible group cursor-crosshair"
      style={{ perspective: "1000px" }}
    >
      {/* 1. Halo Cósmico de Fundo */}
      <div className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-sky-950/25 via-amber-950/20 to-indigo-950/30 blur-[140px] rounded-full pointer-events-none -z-30" />

      {/* 2. Spotlight Cósmico Dinâmico do Cursor */}
      {mousePos && (
        <div
          style={{
            left: mousePos.x,
            top: mousePos.y,
            transform: "translate(-50%, -50%)",
          }}
          className="absolute w-80 h-80 bg-radial from-amber-500/15 via-sky-500/10 to-transparent blur-3xl pointer-events-none rounded-full z-0"
        />
      )}

      {/* 3. Container da Constelação com Parallax 3D */}
      <motion.div
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
        className="relative w-[600px] h-[600px] transform-style-3d"
      >
        {/* Gráfico Celestial / Astrolábio Cósmico Giratório */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Anéis orbitais concêntricos */}
          <div className="w-[540px] h-[540px] rounded-full border border-white/[0.04] animate-[spin_180s_linear_infinite]" />
          <div className="absolute w-[440px] h-[440px] rounded-full border border-dashed border-sky-500/[0.08] animate-[spin_100s_linear_infinite_reverse]" />
          <div className="absolute w-[320px] h-[320px] rounded-full border border-amber-500/[0.08] animate-[spin_70s_linear_infinite]" />
          <div className="absolute w-[180px] h-[180px] rounded-full border border-white/[0.06]" />

          {/* Mira Estelar / Eixos */}
          <div className="absolute w-[560px] h-[1px] bg-gradient-to-r from-transparent via-sky-500/[0.1] to-transparent" />
          <div className="absolute h-[560px] w-[1px] bg-gradient-to-b from-transparent via-amber-500/[0.1] to-transparent" />
        </div>

        {/* Camada SVG: Conexões Estelares + Feixes de Luz */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
          <defs>
            {/* Filtro de Glow Neon */}
            <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur1" />
              <feGaussianBlur stdDeviation="8" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Gradientes Estelares */}
            <linearGradient id="coreBeam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>

            <linearGradient id="perimeterBeam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>

            <linearGradient id="hyperBeam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>

            <linearGradient id="cursorTether" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* 1. Conexões Interativas com o Mouse (Cursor Lightning Tether) */}
          {mousePos &&
            closestNodesToMouse.map((node) => (
              <g key={`tether-${node.id}`}>
                <line
                  x1={mousePos.x}
                  y1={mousePos.y}
                  x2={node.x}
                  y2={node.y}
                  stroke="url(#cursorTether)"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  filter="url(#neonGlow)"
                  className="animate-pulse"
                />
                <circle cx={mousePos.x} cy={mousePos.y} r={3} fill="#fbbf24" filter="url(#neonGlow)" />
              </g>
            ))}

          {/* 2. Conexões da Constelação com Feixes de Luz Correndo */}
          {CONSTELLATION_EDGES.map((edge, idx) => {
            const startNode = CONSTELLATION_NODES.find((n) => n.id === edge.start)!;
            const endNode = CONSTELLATION_NODES.find((n) => n.id === edge.end)!;

            const isDirectConnected =
              activeNodeId !== null && (edge.start === activeNodeId || edge.end === activeNodeId);

            const isHighEnergy = isDirectConnected;
            const lineLen = Math.hypot(endNode.x - startNode.x, endNode.y - startNode.y);

            let strokeColor = edge.type === "radial" ? "url(#coreBeam)" : "url(#perimeterBeam)";
            if (isHighEnergy) strokeColor = "url(#hyperBeam)";

            return (
              <g key={`constellation-edge-${idx}`}>
                {/* Linha Base Estelar */}
                <line
                  x1={startNode.x}
                  y1={startNode.y}
                  x2={endNode.x}
                  y2={endNode.y}
                  stroke={isHighEnergy ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.08)"}
                  strokeWidth={isHighEnergy ? 2.5 : edge.type === "radial" ? 1.4 : 1}
                  className="transition-all duration-300"
                />

                {/* Feixe de Luz Laser Contínuo */}
                <line
                  x1={startNode.x}
                  y1={startNode.y}
                  x2={endNode.x}
                  y2={endNode.y}
                  stroke={strokeColor}
                  strokeWidth={isHighEnergy ? 4 : 2}
                  strokeDasharray={`${Math.max(30, lineLen * 0.4)} ${lineLen * 1.6}`}
                  strokeLinecap="round"
                  filter="url(#neonGlow)"
                  className="transition-all duration-300"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from={lineLen * 2}
                    to={0}
                    dur={isHighEnergy ? `${Math.max(0.8, edge.dur * 0.45)}s` : `${edge.dur}s`}
                    repeatCount="indefinite"
                  />
                </line>

                {/* Fóton de Luz Estelar viajando */}
                <circle
                  r={isHighEnergy ? 4 : 2.2}
                  fill="#ffffff"
                  filter="url(#neonGlow)"
                  opacity={isHighEnergy ? 1 : 0.8}
                >
                  <animateMotion
                    path={`M ${startNode.x} ${startNode.y} L ${endNode.x} ${endNode.y}`}
                    dur={isHighEnergy ? `${Math.max(0.8, edge.dur * 0.45)}s` : `${edge.dur}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}
        </svg>

        {/* 3. Ondas de Choque Supernova disparadas ao clicar */}
        {shockwaves.map((wave) => (
          <motion.div
            key={`wave-${wave.id}`}
            initial={{ scale: 0.1, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: wave.x,
              top: wave.y,
              borderColor: wave.color,
              boxShadow: `0 0 30px ${wave.color}`,
            }}
            className="w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 pointer-events-none z-30"
          />
        ))}

        {/* 4. Partículas Estelares Explosivas */}
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              boxShadow: `0 0 10px ${p.color}`,
            }}
            className="rounded-full pointer-events-none z-30"
          />
        ))}

        {/* 5. Estrelas / Nós da Constelação */}
        {CONSTELLATION_NODES.map((node) => {
          const isHovered = hoveredNode === node.id;
          const isSelected = selectedNode === node.id;
          const isDirectConnected =
            activeNodeId !== null &&
            CONSTELLATION_EDGES.some(
              (e) => (e.start === activeNodeId && e.end === node.id) || (e.end === activeNodeId && e.start === node.id)
            );

          // Proximidade magnética com o mouse
          let pullX = 0;
          let pullY = 0;
          if (mousePos) {
            const dist = Math.hypot(mousePos.x - node.x, mousePos.y - node.y);
            if (dist < 140) {
              const pull = (140 - dist) * 0.12;
              pullX = ((mousePos.x - node.x) / dist) * pull;
              pullY = ((mousePos.y - node.y) / dist) * pull;
            }
          }

          const isNodeActive = isHovered || isSelected || isDirectConnected;
          const isCore = node.id === 0;

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
                scale: isHovered || isSelected ? 1.35 : isNodeActive ? 1.15 : 1,
              }}
              transition={{ type: "spring", stiffness: 280, damping: 18 }}
              className="z-20 cursor-pointer"
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => handleNodeClick(node)}
            >
              <div className="relative flex items-center justify-center p-3.5">
                {/* Aura Cósmica de Alta Energia */}
                <div
                  style={{
                    backgroundColor: isNodeActive ? node.color : "rgba(255,255,255,0.06)",
                  }}
                  className={`absolute inset-0 rounded-full transition-all duration-500 ${
                    isHovered || isSelected
                      ? "blur-2xl opacity-90 scale-170"
                      : isNodeActive
                      ? "blur-xl opacity-50 scale-135"
                      : isCore
                      ? "blur-lg opacity-30 scale-110"
                      : "blur-md opacity-10"
                  }`}
                />

                {/* Card Estelar com Feixe Laser Giratório */}
                <div className="relative flex items-center justify-center rounded-2xl p-[1.5px] overflow-hidden group/card shadow-[0_0_25px_rgba(0,0,0,0.9)]">
                  {/* Borda de Luz Laser Giratória */}
                  <div
                    className={`absolute inset-[-150%] animate-[spin_2.8s_linear_infinite] transition-opacity duration-500 pointer-events-none ${
                      isNodeActive ? "opacity-100" : isCore ? "opacity-60" : "opacity-0 group-hover/card:opacity-100"
                    }`}
                    style={{
                      background: `conic-gradient(from 0deg at 50% 50%, transparent 50%, ${node.color} 100%)`,
                    }}
                  />

                  {/* Conteúdo Translúcido do Card */}
                  <div
                    style={{
                      boxShadow: isNodeActive ? `0 0 20px ${node.glowColor}` : undefined,
                    }}
                    className={`relative flex items-center justify-center rounded-[14.5px] p-2.5 backdrop-blur-xl border border-white/15 z-10 transition-all duration-300 ${
                      isNodeActive ? "bg-[#030014]/95" : "bg-[#030014]/80 hover:bg-[#030014]/95"
                    }`}
                  >
                    <Image
                      src={node.icon}
                      alt={node.name}
                      width={node.size}
                      height={node.size}
                      className="object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] transition-transform duration-300 group-hover/card:scale-110"
                    />
                  </div>
                </div>

                {/* Tag de Nome da Stack */}
                <div
                  className={`absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 transition-all duration-300 pointer-events-none whitespace-nowrap z-30 ${
                    isNodeActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
                  }`}
                >
                  <span
                    style={{ backgroundColor: node.color }}
                    className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor]"
                  />
                  <span
                    style={{ color: isHovered || isSelected ? "#ffffff" : node.color }}
                    className="font-mono text-[11px] font-bold uppercase tracking-wider drop-shadow-[0_0_8px_rgba(0,0,0,1)]"
                  >
                    {node.name}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* 6. Painel de Informação Flutuante do Nó Ativo / Clicado */}
        <AnimatePresence>
          {activeNode && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              style={{
                left: "50%",
                bottom: "-25px",
                transform: "translateX(-50%)",
              }}
              className="absolute z-40 flex items-center gap-3 px-4 py-2 rounded-2xl bg-[#030014]/90 border border-white/15 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.8)] pointer-events-none"
            >
              <div
                style={{ backgroundColor: activeNode.color }}
                className="w-2.5 h-2.5 rounded-full shadow-[0_0_10px_currentColor] animate-pulse"
              />
              <div className="flex flex-col">
                <span className="font-mono text-xs font-bold text-white tracking-wide">
                  {activeNode.name}
                </span>
                <span className="text-[10px] text-gray-400 font-medium">
                  {activeNode.role}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[9px] font-mono uppercase text-gray-300 tracking-wider ml-1">
                {activeNode.category}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 7. Poeira Estelar Cintilante */}
        {[
          { top: "6%", left: "6%", size: 3, delay: 0 },
          { top: "14%", left: "92%", size: 2.5, delay: 1 },
          { top: "34%", left: "4%", size: 2, delay: 2 },
          { top: "48%", left: "96%", size: 3, delay: 0.5 },
          { top: "72%", left: "6%", size: 2.5, delay: 1.5 },
          { top: "90%", left: "92%", size: 3.5, delay: 2.5 },
          { top: "58%", left: "50%", size: 2, delay: 1.8 },
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
      </motion.div>
    </div>
  );
};
