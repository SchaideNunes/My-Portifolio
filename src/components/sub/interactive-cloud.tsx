"use client";

import React, { useState, useEffect, useRef } from "react";
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
}

// 8 Stacks desenhadas na anatomia clássica da URSA MAJOR (A Grande Ursa / Big Dipper)
// Espaçamento amplo e distribuição harmoniosa no espaço
const URSA_MAJOR_NODES: ConstellationNode[] = [
  // 1. Ponta da Cauda do Carro (Alkaid)
  {
    id: 0,
    name: "GSAP",
    astronomyName: "Alkaid (Eta Ursae Majoris)",
    role: "Creative Motion & FX",
    category: "Frontend",
    icon: "/skills/gsap.svg",
    x: 95,
    y: 110,
    size: 42,
    color: "#38bdf8",
  },
  // 2. Curva da Cauda (Mizar)
  {
    id: 1,
    name: "Tailwind",
    astronomyName: "Mizar (Zeta Ursae Majoris)",
    role: "Modern UI Styling",
    category: "Frontend",
    icon: "/skills/tailwind.png",
    x: 195,
    y: 155,
    size: 44,
    color: "#38bdf8",
  },
  // 3. Junção da Cauda com o Corpo (Alioth - Estrela Mais Brilhante da Ursa)
  {
    id: 2,
    name: "TypeScript",
    astronomyName: "Alioth (Epsilon Ursae Majoris)",
    role: "Type-Safe Engineering",
    category: "Frontend",
    icon: "/skills/ts.png",
    x: 305,
    y: 205,
    size: 48,
    color: "#38bdf8",
  },
  // 4. Canto Superior Esquerdo da Panela (Megrez)
  {
    id: 3,
    name: "React",
    astronomyName: "Megrez (Delta Ursae Majoris)",
    role: "Core UI Architecture",
    category: "Core",
    icon: "/skills/react.png",
    x: 410,
    y: 265,
    size: 52,
    color: "#38bdf8",
  },
  // 5. Canto Superior Direito da Panela (Dubhe - Estrela Guia Alfa)
  {
    id: 4,
    name: "Python",
    astronomyName: "Dubhe (Alpha Ursae Majoris)",
    role: "Backend & Systems Logic",
    category: "Backend",
    icon: "/skills/python.svg",
    x: 535,
    y: 235,
    size: 48,
    color: "#f59e0b",
  },
  // 6. Canto Inferior Direito da Panela (Merak - Estrela Guia Beta)
  {
    id: 5,
    name: "AWS",
    astronomyName: "Merak (Beta Ursae Majoris)",
    role: "Cloud Infrastructure & Scale",
    category: "Cloud",
    icon: "/skills/aws.svg",
    x: 505,
    y: 435,
    size: 50,
    color: "#fb923c",
  },
  // 7. Canto Inferior Esquerdo da Panela (Phecda)
  {
    id: 6,
    name: "SQL",
    astronomyName: "Phecda (Gamma Ursae Majoris)",
    role: "Relational Data Storage",
    category: "Backend",
    icon: "/skills/sql.svg",
    x: 375,
    y: 460,
    size: 46,
    color: "#f59e0b",
  },
  // 8. Estrela de Apoio / Pata Cósmica (Alula Australis)
  {
    id: 7,
    name: "Docker",
    astronomyName: "Alula (Xi Ursae Majoris)",
    role: "Containers & DevOps",
    category: "Cloud",
    icon: "/skills/docker.png",
    x: 235,
    y: 530,
    size: 46,
    color: "#818cf8",
  },
];

// Linhas astronômicas exatas da URSA MAJOR
const URSA_MAJOR_EDGES = [
  // 1. O Cabo / Cauda da Grande Ursa
  { start: 0, end: 1, type: "handle", dur: 2.2 }, // GSAP -> Tailwind
  { start: 1, end: 2, type: "handle", dur: 2.3 }, // Tailwind -> TypeScript
  { start: 2, end: 3, type: "handle", dur: 2.4 }, // TypeScript -> React

  // 2. O Corpo / Panela Quadrilátera (The Bowl)
  { start: 3, end: 4, type: "bowl", dur: 2.5 },   // React (Megrez) -> Python (Dubhe) [Borda Superior]
  { start: 4, end: 5, type: "bowl", dur: 2.4 },   // Python (Dubhe) -> AWS (Merak) [Ponteiras para o Norte]
  { start: 5, end: 6, type: "bowl", dur: 2.2 },   // AWS (Merak) -> SQL (Phecda) [Borda Inferior]
  { start: 6, end: 3, type: "bowl", dur: 2.4 },   // SQL (Phecda) -> React (Megrez) [Fechamento do Corpo]

  // 3. Extensão / Estrela de Apoio
  { start: 6, end: 7, type: "support", dur: 2.6 }, // SQL (Phecda) -> Docker (Alula)
  { start: 2, end: 7, type: "bridge", dur: 3.2 },  // TypeScript (Alioth) -> Docker (Alula)
];

export const InteractiveCloud = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
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

    // Parallax muito suave e elegante
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = -((y - cy) / cy) * 6;
    const rotY = ((x - cx) / cx) * 6;
    setTilt({ rotateX: rotX, rotateY: rotY });
  };

  const handleMouseLeave = () => {
    setHoveredNode(null);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  if (!isMounted) {
    return <div className="relative w-full h-[720px]" />;
  }

  const activeNodeId = hoveredNode !== null ? hoveredNode : selectedNode;
  const activeNode = activeNodeId !== null ? URSA_MAJOR_NODES.find((n) => n.id === activeNodeId) : null;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[720px] flex items-center justify-center select-none overflow-visible group"
      style={{ perspective: "1000px" }}
    >
      {/* 1. Glow de Fundo Sutil e Refinado */}
      <div className="absolute w-[540px] h-[580px] bg-gradient-to-tr from-sky-950/15 via-amber-950/15 to-indigo-950/20 blur-[130px] rounded-full pointer-events-none -z-30" />

      {/* 2. Container da Constelação */}
      <motion.div
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 25 }}
        className="relative w-[620px] h-[620px] transform-style-3d"
      >
        {/* Marca d'água astronômica sutil e elegante */}
        <div className="absolute top-2 right-4 pointer-events-none z-0">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/20 font-bold">
            CONSTELLATION // URSA MAJOR
          </span>
        </div>

        {/* Grade Celestial Linear Angular */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
          <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-500/[0.05] to-transparent" />
          <div className="absolute top-3/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
          <div className="absolute left-1/3 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />
          <div className="absolute left-2/3 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-amber-500/[0.05] to-transparent" />
        </div>

        {/* Camada SVG: Linhas da Grande Ursa com Feixes de Luz Sutis */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
          <defs>
            {/* Glow Suave e Refinado (Não ofuscante) */}
            <filter id="subtleGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Gradientes dos Feixes da Ursa Maior */}
            <linearGradient id="ursaBeam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>

            <linearGradient id="ursaActiveBeam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>

          {/* Linhas da Ursa Maior */}
          {URSA_MAJOR_EDGES.map((edge, idx) => {
            const startNode = URSA_MAJOR_NODES.find((n) => n.id === edge.start)!;
            const endNode = URSA_MAJOR_NODES.find((n) => n.id === edge.end)!;

            const isDirectConnected =
              activeNodeId !== null && (edge.start === activeNodeId || edge.end === activeNodeId);

            const isHighEnergy = isDirectConnected;
            const lineLen = Math.hypot(endNode.x - startNode.x, endNode.y - startNode.y);

            return (
              <g key={`ursa-edge-${idx}`}>
                {/* 1. Linha Base Estelar Suave */}
                <line
                  x1={startNode.x}
                  y1={startNode.y}
                  x2={endNode.x}
                  y2={endNode.y}
                  stroke={isHighEnergy ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.08)"}
                  strokeWidth={isHighEnergy ? 1.8 : 1}
                  strokeDasharray={edge.type === "bridge" ? "4 4" : "none"}
                  className="transition-colors duration-300"
                />

                {/* 2. Feixe de Luz Laser Contínuo Suave */}
                <line
                  x1={startNode.x}
                  y1={startNode.y}
                  x2={endNode.x}
                  y2={endNode.y}
                  stroke={isHighEnergy ? "url(#ursaActiveBeam)" : "url(#ursaBeam)"}
                  strokeWidth={isHighEnergy ? 2.6 : 1.6}
                  strokeDasharray={`${Math.max(20, lineLen * 0.3)} ${lineLen * 1.5}`}
                  strokeLinecap="round"
                  filter="url(#subtleGlow)"
                  className="transition-all duration-300"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from={lineLen * 2}
                    to={0}
                    dur={isHighEnergy ? `${Math.max(1, edge.dur * 0.6)}s` : `${edge.dur}s`}
                    repeatCount="indefinite"
                  />
                </line>

                {/* 3. Fóton de Luz Estelar */}
                <circle
                  r={isHighEnergy ? 2.8 : 1.8}
                  fill="#ffffff"
                  filter="url(#subtleGlow)"
                  opacity={isHighEnergy ? 0.95 : 0.7}
                >
                  <animateMotion
                    path={`M ${startNode.x} ${startNode.y} L ${endNode.x} ${endNode.y}`}
                    dur={isHighEnergy ? `${Math.max(1, edge.dur * 0.6)}s` : `${edge.dur}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}
        </svg>

        {/* As 8 Estrelas da Ursa Maior (Tecnologias com Hover Refinado) */}
        {URSA_MAJOR_NODES.map((node) => {
          const isHovered = hoveredNode === node.id;
          const isSelected = selectedNode === node.id;
          const isDirectConnected =
            activeNodeId !== null &&
            URSA_MAJOR_EDGES.some(
              (e) => (e.start === activeNodeId && e.end === node.id) || (e.end === activeNodeId && e.start === node.id)
            );

          const isNodeActive = isHovered || isSelected;

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
                scale: isHovered || isSelected ? 1.12 : isDirectConnected ? 1.05 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="z-20 cursor-pointer"
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => setSelectedNode((prev) => (prev === node.id ? null : node.id))}
            >
              <div className="relative flex items-center justify-center p-2.5">
                {/* Aura Estelar Discreta */}
                <div
                  style={{
                    backgroundColor: isNodeActive ? node.color : "rgba(255,255,255,0.05)",
                  }}
                  className={`absolute inset-0 rounded-full transition-all duration-300 ${
                    isHovered || isSelected
                      ? "blur-xl opacity-50 scale-130"
                      : isDirectConnected
                      ? "blur-md opacity-25 scale-115"
                      : "opacity-0"
                  }`}
                />

                {/* Card Translúcido com Feixe de Borda Giratório */}
                <div className="relative flex items-center justify-center rounded-2xl p-[1px] overflow-hidden group/card shadow-[0_0_20px_rgba(0,0,0,0.6)]">
                  <div
                    className={`absolute inset-[-150%] animate-[spin_3s_linear_infinite] transition-opacity duration-300 pointer-events-none ${
                      isNodeActive ? "opacity-100" : "opacity-0 group-hover/card:opacity-100"
                    }`}
                    style={{
                      background: `conic-gradient(from 0deg at 50% 50%, transparent 60%, ${node.color} 100%)`,
                    }}
                  />

                  {/* Conteúdo do Card */}
                  <div
                    className={`relative flex items-center justify-center rounded-[15px] p-2.5 backdrop-blur-xl border transition-all duration-300 ${
                      isNodeActive
                        ? "bg-[#030014]/90 border-white/20 shadow-[0_0_15px_rgba(0,0,0,0.8)]"
                        : "bg-[#030014]/75 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <Image
                      src={node.icon}
                      alt={node.name}
                      width={node.size}
                      height={node.size}
                      className="object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-transform duration-300 group-hover/card:scale-105"
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
                    className="w-1.5 h-1.5 rounded-full shadow-[0_0_6px_currentColor]"
                  />
                  <span
                    style={{ color: isHovered || isSelected ? "#ffffff" : node.color }}
                    className="font-mono text-[11px] font-bold uppercase tracking-wider drop-shadow-[0_0_6px_rgba(0,0,0,0.9)]"
                  >
                    {node.name}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Painel de Informação Astronômica Discreto */}
        <AnimatePresence>
          {activeNode && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{
                left: "50%",
                bottom: "-25px",
                transform: "translateX(-50%)",
              }}
              className="absolute z-40 flex items-center gap-3 px-4 py-2 rounded-2xl bg-[#030014]/90 border border-white/10 backdrop-blur-xl shadow-[0_0_25px_rgba(0,0,0,0.8)] pointer-events-none whitespace-nowrap"
            >
              <div
                style={{ backgroundColor: activeNode.color }}
                className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-white tracking-wide">
                    {activeNode.name}
                  </span>
                  <span className="text-[10px] text-amber-400/80 font-mono">
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

        {/* Estrelas de Fundo Sutis */}
        {[
          { top: "8%", left: "10%", size: 2.5, delay: 0 },
          { top: "15%", left: "88%", size: 2, delay: 1 },
          { top: "32%", left: "6%", size: 2, delay: 2 },
          { top: "48%", left: "95%", size: 2.5, delay: 0.5 },
          { top: "70%", left: "10%", size: 2, delay: 1.5 },
          { top: "88%", left: "88%", size: 3, delay: 2.5 },
          { top: "55%", left: "48%", size: 2, delay: 1.8 },
        ].map((star, i) => (
          <motion.div
            key={`ursa-star-${i}`}
            style={{
              position: "absolute",
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: [0.15, 0.7, 0.15],
              scale: [0.9, 1.2, 0.9],
            }}
            transition={{
              duration: 3 + (i % 2),
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
            className="rounded-full bg-white shadow-[0_0_6px_#ffffff] pointer-events-none"
          />
        ))}
      </motion.div>
    </div>
  );
};
