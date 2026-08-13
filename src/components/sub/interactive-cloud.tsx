"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image } from "@/components/ui/image";

interface ConstellationNode {
  id: number;
  name: string;
  astronomyName: string;
  role: string;
  category: "Frontend" | "Backend" | "Cloud" | "Core";
  icon: string;
  x: number;
  y: number;
  size: number;
  color: string;
  glowColor: string;
}

// 8 Stacks desenhadas com a anatomia exata da Constelação de ORION (O Caçador Cósmico)
const ORION_NODES: ConstellationNode[] = [
  // 1. Cabeça de Órion (Meissa / Apex)
  {
    id: 0,
    name: "TypeScript",
    astronomyName: "Meissa (Apex)",
    role: "Type-Safe Architecture",
    category: "Frontend",
    icon: "/skills/ts.png",
    x: 300,
    y: 75,
    size: 46,
    color: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.8)"
  },
  // 2. Ombro Esquerdo de Órion (Betelgeuse - Supergigante Vermelha/Âmbar)
  {
    id: 1,
    name: "Python",
    astronomyName: "Betelgeuse (Alpha Orionis)",
    role: "Backend & Systems Logic",
    category: "Backend",
    icon: "/skills/python.svg",
    x: 145,
    y: 175,
    size: 52,
    color: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.9)"
  },
  // 3. Ombro Direito de Órion (Bellatrix - Estrela Azulada)
  {
    id: 2,
    name: "React",
    astronomyName: "Bellatrix (Gamma Orionis)",
    role: "UI & Component Architecture",
    category: "Core",
    icon: "/skills/react.png",
    x: 455,
    y: 175,
    size: 54,
    color: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.9)"
  },
  // 4. Cinturão de Órion - Estrela 1 (Alnitak)
  {
    id: 3,
    name: "Tailwind",
    astronomyName: "Alnitak (Zeta Orionis)",
    role: "Modern Responsive Styling",
    category: "Frontend",
    icon: "/skills/tailwind.png",
    x: 215,
    y: 315,
    size: 44,
    color: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.75)"
  },
  // 5. Cinturão de Órion - Estrela 2 (Alnilam - Centro do Cinturão)
  {
    id: 4,
    name: "GSAP",
    astronomyName: "Alnilam (Epsilon Orionis)",
    role: "High-Performance Motion",
    category: "Frontend",
    icon: "/skills/gsap.svg",
    x: 300,
    y: 330,
    size: 44,
    color: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.75)"
  },
  // 6. Cinturão de Órion - Estrela 3 (Mintaka)
  {
    id: 5,
    name: "SQL",
    astronomyName: "Mintaka (Delta Orionis)",
    role: "Relational Data Storage",
    category: "Backend",
    icon: "/skills/sql.svg",
    x: 385,
    y: 345,
    size: 46,
    color: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.85)"
  },
  // 7. Pé Esquerdo de Órion (Saiph)
  {
    id: 6,
    name: "Docker",
    astronomyName: "Saiph (Kappa Orionis)",
    role: "DevOps & Containerization",
    category: "Cloud",
    icon: "/skills/docker.png",
    x: 180,
    y: 505,
    size: 48,
    color: "#818cf8",
    glowColor: "rgba(129, 140, 248, 0.8)"
  },
  // 8. Pé Direito de Órion (Rigel - Supergigante Azul/Dourada)
  {
    id: 7,
    name: "AWS",
    astronomyName: "Rigel (Beta Orionis)",
    role: "Cloud Infrastructure & Scale",
    category: "Cloud",
    icon: "/skills/aws.svg",
    x: 430,
    y: 505,
    size: 52,
    color: "#fb923c",
    glowColor: "rgba(251, 146, 60, 0.85)"
  },
];

// Linhas astronômicas reais da Constelação de ÓRION
const ORION_EDGES = [
  // 1. Cabeça conectando aos dois Ombros (Triângulo Superior)
  { start: 0, end: 1, type: "primary", dur: 2.2 }, // TypeScript (Meissa) -> Python (Betelgeuse)
  { start: 0, end: 2, type: "primary", dur: 2.2 }, // TypeScript (Meissa) -> React (Bellatrix)
  { start: 1, end: 2, type: "chest", dur: 2.6 },   // Python (Betelgeuse) <-> React (Bellatrix)

  // 2. Ombros descendo para o Cinturão (Três Marias)
  { start: 1, end: 3, type: "primary", dur: 2.3 }, // Python (Betelgeuse) -> Tailwind (Alnitak)
  { start: 2, end: 5, type: "primary", dur: 2.3 }, // React (Bellatrix) -> SQL (Mintaka)

  // 3. O Cinturão de Órion (Alnitak -> Alnilam -> Mintaka)
  { start: 3, end: 4, type: "belt", dur: 1.8 },    // Tailwind (Alnitak) -> GSAP (Alnilam)
  { start: 4, end: 5, type: "belt", dur: 1.8 },    // GSAP (Alnilam) -> SQL (Mintaka)

  // 4. Cinturão descendo para os Pés (Saiph e Rigel)
  { start: 3, end: 6, type: "primary", dur: 2.4 }, // Tailwind (Alnitak) -> Docker (Saiph)
  { start: 5, end: 7, type: "primary", dur: 2.4 }, // SQL (Mintaka) -> AWS (Rigel)
  { start: 4, end: 6, type: "bridge", dur: 2.8 },  // GSAP (Alnilam) -> Docker (Saiph)
  { start: 4, end: 7, type: "bridge", dur: 2.8 },  // GSAP (Alnilam) -> AWS (Rigel)

  // 5. Linha de Base dos Pés
  { start: 6, end: 7, type: "base", dur: 2.5 },    // Docker (Saiph) <-> AWS (Rigel)
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

  // Animação das partículas estelares
  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            size: p.size * 0.93,
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

    // Parallax angular sutil
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = -((y - cy) / cy) * 10;
    const rotY = ((x - cx) / cx) * 10;
    setTilt({ rotateX: rotX, rotateY: rotY });
  };

  const handleMouseLeave = () => {
    setMousePos(null);
    setHoveredNode(null);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  // Clique em uma estrela: Supernova shockwave + partículas
  const handleNodeClick = (node: ConstellationNode) => {
    setSelectedNode((prev) => (prev === node.id ? null : node.id));

    const waveId = Date.now();
    setShockwaves((prev) => [...prev, { id: waveId, x: node.x, y: node.y, color: node.color }]);
    setTimeout(() => {
      setShockwaves((prev) => prev.filter((w) => w.id !== waveId));
    }, 1200);

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

  // Encontra os nós mais próximos do cursor para o raio laser cósmico
  const closestNodesToMouse = useMemo(() => {
    if (!mousePos) return [];
    return ORION_NODES.map((node) => ({
      node,
      dist: Math.hypot(mousePos.x - node.x, mousePos.y - node.y),
    }))
      .filter((item) => item.dist < 150)
      .sort((a, b) => a.dist - b.dist)
      .slice(0, 2)
      .map((item) => item.node);
  }, [mousePos]);

  if (!isMounted) {
    return <div className="relative w-full h-[720px]" />;
  }

  const activeNodeId = hoveredNode !== null ? hoveredNode : selectedNode;
  const activeNode = activeNodeId !== null ? ORION_NODES.find((n) => n.id === activeNodeId) : null;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[720px] flex items-center justify-center select-none overflow-visible group cursor-crosshair"
      style={{ perspective: "1000px" }}
    >
      {/* 1. Nebulosa Cósmica de Órion (Nuvem de Fundo Orgânica M42) */}
      <div className="absolute w-[560px] h-[640px] bg-gradient-to-b from-indigo-950/20 via-sky-950/20 to-amber-950/25 blur-[140px] rounded-full pointer-events-none -z-30" />
      <div className="absolute top-[280px] left-[260px] w-48 h-48 bg-amber-500/10 blur-[80px] rounded-full pointer-events-none -z-20 animate-pulse" />

      {/* 2. Lanterna Cósmica do Mouse */}
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

      {/* 3. Constelação com Parallax 3D */}
      <motion.div
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
        className="relative w-[600px] h-[600px] transform-style-3d"
      >
        {/* Marca d'água astronômica sutil */}
        <div className="absolute top-2 right-4 pointer-events-none z-0">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/20 font-bold">
            CONSTELLATION // ORION
          </span>
        </div>

        {/* Grade Celestial Linear Angular (Sem círculos redondos) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Linhas de ascensão reta e declinação cósmica */}
          <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-500/[0.06] to-transparent" />
          <div className="absolute top-3/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
          <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/[0.04] to-transparent" />
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-amber-500/[0.06] to-transparent" />
          <div className="absolute left-3/4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/[0.04] to-transparent" />
        </div>

        {/* Camada SVG: Linhas de Órion + Feixes de Laser */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
          <defs>
            <filter id="orionGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur1" />
              <feGaussianBlur stdDeviation="7" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Gradientes dos Feixes de Órion */}
            <linearGradient id="orionBeam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>

            <linearGradient id="beltBeam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>

            <linearGradient id="hyperBeamOrion" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>

            <linearGradient id="tetherBeam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          {/* 1. Raio Laser Interativo com o Cursor */}
          {mousePos &&
            closestNodesToMouse.map((node) => (
              <g key={`orion-tether-${node.id}`}>
                <line
                  x1={mousePos.x}
                  y1={mousePos.y}
                  x2={node.x}
                  y2={node.y}
                  stroke="url(#tetherBeam)"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  filter="url(#orionGlow)"
                  className="animate-pulse"
                />
                <circle cx={mousePos.x} cy={mousePos.y} r={3} fill="#fbbf24" filter="url(#orionGlow)" />
              </g>
            ))}

          {/* 2. Linhas Reais de Órion com Feixes de Luz */}
          {ORION_EDGES.map((edge, idx) => {
            const startNode = ORION_NODES.find((n) => n.id === edge.start)!;
            const endNode = ORION_NODES.find((n) => n.id === edge.end)!;

            const isDirectConnected =
              activeNodeId !== null && (edge.start === activeNodeId || edge.end === activeNodeId);

            const isHighEnergy = isDirectConnected;
            const lineLen = Math.hypot(endNode.x - startNode.x, endNode.y - startNode.y);

            let strokeGradient = edge.type === "belt" ? "url(#beltBeam)" : "url(#orionBeam)";
            if (isHighEnergy) strokeGradient = "url(#hyperBeamOrion)";

            return (
              <g key={`orion-edge-${idx}`}>
                {/* Linha Base Estelar */}
                <line
                  x1={startNode.x}
                  y1={startNode.y}
                  x2={endNode.x}
                  y2={endNode.y}
                  stroke={isHighEnergy ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.12)"}
                  strokeWidth={isHighEnergy ? 2.5 : edge.type === "belt" ? 1.8 : 1.2}
                  strokeDasharray={edge.type === "bridge" ? "4 4" : "none"}
                  className="transition-all duration-300"
                />

                {/* Feixe Laser em Movimento Contínuo */}
                <line
                  x1={startNode.x}
                  y1={startNode.y}
                  x2={endNode.x}
                  y2={endNode.y}
                  stroke={strokeGradient}
                  strokeWidth={isHighEnergy ? 4 : edge.type === "belt" ? 3 : 2.2}
                  strokeDasharray={`${Math.max(25, lineLen * 0.35)} ${lineLen * 1.5}`}
                  strokeLinecap="round"
                  filter="url(#orionGlow)"
                  className="transition-all duration-300"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from={lineLen * 2}
                    to={0}
                    dur={isHighEnergy ? `${Math.max(0.8, edge.dur * 0.5)}s` : `${edge.dur}s`}
                    repeatCount="indefinite"
                  />
                </line>

                {/* Fóton de Luz Estelar */}
                <circle
                  r={isHighEnergy ? 3.8 : 2.2}
                  fill="#ffffff"
                  filter="url(#orionGlow)"
                  opacity={isHighEnergy ? 1 : 0.8}
                >
                  <animateMotion
                    path={`M ${startNode.x} ${startNode.y} L ${endNode.x} ${endNode.y}`}
                    dur={isHighEnergy ? `${Math.max(0.8, edge.dur * 0.5)}s` : `${edge.dur}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}
        </svg>

        {/* 3. Ondas de Choque Supernova ao Clicar */}
        {shockwaves.map((wave) => (
          <motion.div
            key={`shockwave-${wave.id}`}
            initial={{ scale: 0.1, opacity: 1 }}
            animate={{ scale: 4.5, opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: wave.x,
              top: wave.y,
              borderColor: wave.color,
              boxShadow: `0 0 35px ${wave.color}`,
            }}
            className="w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 pointer-events-none z-30"
          />
        ))}

        {/* 4. Partículas Estelares */}
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

        {/* 5. As 8 Estrelas de Órion (Tecnologias) */}
        {ORION_NODES.map((node) => {
          const isHovered = hoveredNode === node.id;
          const isSelected = selectedNode === node.id;
          const isDirectConnected =
            activeNodeId !== null &&
            ORION_EDGES.some(
              (e) => (e.start === activeNodeId && e.end === node.id) || (e.end === activeNodeId && e.start === node.id)
            );

          // Proximidade magnética com o cursor
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
          const isSuperStar = node.id === 1 || node.id === 2 || node.id === 7; // Betelgeuse, Bellatrix, Rigel

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
                {/* Aura Estelar Pulsante */}
                <div
                  style={{
                    backgroundColor: isNodeActive ? node.color : "rgba(255,255,255,0.06)",
                  }}
                  className={`absolute inset-0 rounded-full transition-all duration-500 ${
                    isHovered || isSelected
                      ? "blur-2xl opacity-90 scale-170"
                      : isNodeActive
                      ? "blur-xl opacity-55 scale-135"
                      : isSuperStar
                      ? "blur-lg opacity-25 scale-115"
                      : "blur-md opacity-10"
                  }`}
                />

                {/* Card com Feixe de Borda Laser Giratório (Estilo Header) */}
                <div className="relative flex items-center justify-center rounded-2xl p-[1.5px] overflow-hidden group/card shadow-[0_0_25px_rgba(0,0,0,0.9)]">
                  <div
                    className={`absolute inset-[-150%] animate-[spin_2.8s_linear_infinite] transition-opacity duration-500 pointer-events-none ${
                      isNodeActive ? "opacity-100" : isSuperStar ? "opacity-60" : "opacity-0 group-hover/card:opacity-100"
                    }`}
                    style={{
                      background: `conic-gradient(from 0deg at 50% 50%, transparent 50%, ${node.color} 100%)`,
                    }}
                  />

                  {/* Conteúdo Translúcido */}
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

                {/* Etiqueta de Nome da Stack */}
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

        {/* 6. Painel de Informação Astronômica da Estrela Ativa */}
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
              className="absolute z-40 flex items-center gap-3 px-4 py-2 rounded-2xl bg-[#030014]/90 border border-white/15 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.8)] pointer-events-none whitespace-nowrap"
            >
              <div
                style={{ backgroundColor: activeNode.color }}
                className="w-2.5 h-2.5 rounded-full shadow-[0_0_10px_currentColor] animate-pulse"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-white tracking-wide">
                    {activeNode.name}
                  </span>
                  <span className="text-[10px] text-amber-400/90 font-mono">
                    ★ {activeNode.astronomyName}
                  </span>
                </div>
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

        {/* 7. Estrelas de Fundo Cintilantes */}
        {[
          { top: "6%", left: "12%", size: 3, delay: 0 },
          { top: "12%", left: "85%", size: 2.5, delay: 1 },
          { top: "28%", left: "8%", size: 2, delay: 2 },
          { top: "45%", left: "94%", size: 3, delay: 0.5 },
          { top: "68%", left: "10%", size: 2.5, delay: 1.5 },
          { top: "86%", left: "86%", size: 3.5, delay: 2.5 },
          { top: "54%", left: "50%", size: 2, delay: 1.8 },
          { top: "78%", left: "30%", size: 2.5, delay: 0.8 },
        ].map((star, i) => (
          <motion.div
            key={`orion-stardust-${i}`}
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
