"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image } from "@/components/ui/image";

interface NebulaNode {
  id: number;
  name: string;
  role: string;
  category: "Frontend" | "Backend" | "Cloud" | "Core";
  icon: string;
  baseX: number;
  baseY: number;
  floatPathX: number[];
  floatPathY: number[];
  duration: number;
  size: number;
  color: string;
  glowColor: string;
}

// 8 Stacks flutuando organicamente no campo de gravidade da Nebulosa Cósmica
const NEBULA_NODES: NebulaNode[] = [
  {
    id: 0,
    name: "React",
    role: "Core UI Architecture",
    category: "Core",
    icon: "/skills/react.png",
    baseX: 300,
    baseY: 270,
    floatPathX: [0, 15, -12, 0],
    floatPathY: [0, -18, 14, 0],
    duration: 8,
    size: 58,
    color: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.9)",
  },
  {
    id: 1,
    name: "TypeScript",
    role: "Type-Safe Engineering",
    category: "Frontend",
    icon: "/skills/ts.png",
    baseX: 180,
    baseY: 130,
    floatPathX: [0, -18, 14, 0],
    floatPathY: [0, 16, -15, 0],
    duration: 9.5,
    size: 48,
    color: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.8)",
  },
  {
    id: 2,
    name: "Tailwind",
    role: "Modern UI Styling",
    category: "Frontend",
    icon: "/skills/tailwind.png",
    baseX: 430,
    baseY: 140,
    floatPathX: [0, 16, -15, 0],
    floatPathY: [0, -14, 18, 0],
    duration: 9,
    size: 46,
    color: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.75)",
  },
  {
    id: 3,
    name: "GSAP",
    role: "Creative Motion & FX",
    category: "Frontend",
    icon: "/skills/gsap.svg",
    baseX: 480,
    baseY: 290,
    floatPathX: [0, -14, 16, 0],
    floatPathY: [0, 18, -12, 0],
    duration: 8.5,
    size: 46,
    color: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.75)",
  },
  {
    id: 4,
    name: "Python",
    role: "Backend & Systems Logic",
    category: "Backend",
    icon: "/skills/python.svg",
    baseX: 120,
    baseY: 290,
    floatPathX: [0, 18, -14, 0],
    floatPathY: [0, -16, 15, 0],
    duration: 10,
    size: 52,
    color: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.9)",
  },
  {
    id: 5,
    name: "SQL",
    role: "Relational Data Storage",
    category: "Backend",
    icon: "/skills/sql.svg",
    baseX: 200,
    baseY: 450,
    floatPathX: [0, -15, 18, 0],
    floatPathY: [0, 14, -16, 0],
    duration: 8.8,
    size: 46,
    color: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.85)",
  },
  {
    id: 6,
    name: "Docker",
    role: "Containers & DevOps",
    category: "Cloud",
    icon: "/skills/docker.png",
    baseX: 400,
    baseY: 450,
    floatPathX: [0, 14, -16, 0],
    floatPathY: [0, -18, 14, 0],
    duration: 9.2,
    size: 48,
    color: "#818cf8",
    glowColor: "rgba(129, 140, 248, 0.8)",
  },
  {
    id: 7,
    name: "AWS",
    role: "Cloud Infrastructure & Scale",
    category: "Cloud",
    icon: "/skills/aws.svg",
    baseX: 300,
    baseY: 535,
    floatPathX: [0, -16, 15, 0],
    floatPathY: [0, 15, -18, 0],
    duration: 10.5,
    size: 52,
    color: "#fb923c",
    glowColor: "rgba(251, 146, 60, 0.85)",
  },
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

  // Animação de poeira cósmica
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

  const handleNodeClick = (node: NebulaNode) => {
    setSelectedNode((prev) => (prev === node.id ? null : node.id));

    const waveId = Date.now();
    setShockwaves((prev) => [...prev, { id: waveId, x: node.baseX, y: node.baseY, color: node.color }]);
    setTimeout(() => {
      setShockwaves((prev) => prev.filter((w) => w.id !== waveId));
    }, 1200);

    const newParticles: Particle[] = Array.from({ length: 16 }).map((_, i) => {
      const angle = (i / 16) * Math.PI * 2;
      const speed = 2 + Math.random() * 5;
      return {
        id: Math.random(),
        x: node.baseX,
        y: node.baseY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: node.color,
        size: 4 + Math.random() * 3,
      };
    });
    setParticles((prev) => [...prev, ...newParticles]);
  };

  if (!isMounted) {
    return <div className="relative w-full h-[720px]" />;
  }

  const activeNodeId = hoveredNode !== null ? hoveredNode : selectedNode;
  const activeNode = activeNodeId !== null ? NEBULA_NODES.find((n) => n.id === activeNodeId) : null;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[720px] flex items-center justify-center select-none overflow-visible group cursor-crosshair"
      style={{ perspective: "1000px" }}
    >
      {/* 1. NUVEM NEBULOSA VOLUMÉTRICA PROFUNDA (Multi-camadas Cósmicas) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-30">
        {/* Núcleo de Plasma da Nebulosa */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-amber-500/20 via-purple-600/25 to-sky-400/20 blur-[110px] rounded-full"
        />

        {/* Nuvem de Poeira Estelar Superior */}
        <motion.div
          animate={{
            scale: [1.1, 0.95, 1.1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 w-[420px] h-[340px] bg-gradient-to-br from-sky-500/20 via-cyan-400/15 to-transparent blur-[90px] rounded-full"
        />

        {/* Nuvem de Poeira Estelar Inferior */}
        <motion.div
          animate={{
            scale: [0.95, 1.15, 0.95],
            x: [0, -30, 0],
            y: [0, 25, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 w-[460px] h-[360px] bg-gradient-to-tr from-amber-600/20 via-orange-500/15 to-purple-700/20 blur-[100px] rounded-full"
        />
      </div>

      {/* 2. Lanterna Cósmica do Cursor */}
      {mousePos && (
        <div
          style={{
            left: mousePos.x,
            top: mousePos.y,
            transform: "translate(-50%, -50%)",
          }}
          className="absolute w-80 h-80 bg-radial from-amber-400/20 via-sky-400/15 to-transparent blur-3xl pointer-events-none rounded-full z-0"
        />
      )}

      {/* 3. Campo da Nebulosa com Parallax 3D */}
      <motion.div
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
        }}
        transition={{ type: "spring", stiffness: 140, damping: 20 }}
        className="relative w-[600px] h-[600px] transform-style-3d"
      >
        {/* Marca d'água sutil */}
        <div className="absolute top-2 right-4 pointer-events-none z-0">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/25 font-bold">
            COSMOS // NEBULA CLOUD
          </span>
        </div>

        {/* Arcos de Plasma e Conexões Dinâmicas no Cursor */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
          <defs>
            <filter id="nebulaGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur1" />
              <feGaussianBlur stdDeviation="8" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <linearGradient id="plasmaArc" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Arcos de Plasma Magnético entre o Cursor e as Stacks Próximas */}
          {mousePos &&
            NEBULA_NODES.map((node) => {
              const dist = Math.hypot(mousePos.x - node.baseX, mousePos.y - node.baseY);
              if (dist > 160) return null;
              return (
                <g key={`nebula-arc-${node.id}`}>
                  <line
                    x1={mousePos.x}
                    y1={mousePos.y}
                    x2={node.baseX}
                    y2={node.baseY}
                    stroke="url(#plasmaArc)"
                    strokeWidth={Math.max(1, (160 - dist) * 0.025)}
                    strokeDasharray="6 4"
                    filter="url(#nebulaGlow)"
                    className="animate-pulse"
                  />
                  <circle cx={mousePos.x} cy={mousePos.y} r={3} fill="#fbbf24" filter="url(#nebulaGlow)" />
                </g>
              );
            })}
        </svg>

        {/* 4. Ondas de Choque Supernova */}
        {shockwaves.map((wave) => (
          <motion.div
            key={`nebula-wave-${wave.id}`}
            initial={{ scale: 0.1, opacity: 1 }}
            animate={{ scale: 5, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: wave.x,
              top: wave.y,
              borderColor: wave.color,
              boxShadow: `0 0 40px ${wave.color}`,
            }}
            className="w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 pointer-events-none z-30"
          />
        ))}

        {/* 5. Partículas de Poeira Estelar */}
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
              boxShadow: `0 0 12px ${p.color}`,
            }}
            className="rounded-full pointer-events-none z-30"
          />
        ))}

        {/* 6. As 8 Stacks Flutuando Organicamente na Nebulosa */}
        {NEBULA_NODES.map((node) => {
          const isHovered = hoveredNode === node.id;
          const isSelected = selectedNode === node.id;

          // Efeito de Gravidade do Mouse
          let pullX = 0;
          let pullY = 0;
          if (mousePos) {
            const dist = Math.hypot(mousePos.x - node.baseX, mousePos.y - node.baseY);
            if (dist < 150) {
              const pull = (150 - dist) * 0.14;
              pullX = ((mousePos.x - node.baseX) / dist) * pull;
              pullY = ((mousePos.y - node.baseY) / dist) * pull;
            }
          }

          const isNodeActive = isHovered || isSelected;

          return (
            <motion.div
              key={node.name}
              style={{
                position: "absolute",
                left: node.baseX,
                top: node.baseY,
                translateX: "-50%",
                translateY: "-50%",
              }}
              animate={{
                x: [node.floatPathX[0] + pullX, node.floatPathX[1] + pullX, node.floatPathX[2] + pullX, node.floatPathX[3] + pullX],
                y: [node.floatPathY[0] + pullY, node.floatPathY[1] + pullY, node.floatPathY[2] + pullY, node.floatPathY[3] + pullY],
                scale: isHovered || isSelected ? 1.4 : isNodeActive ? 1.15 : 1,
              }}
              transition={{
                x: { duration: node.duration, repeat: Infinity, ease: "easeInOut" },
                y: { duration: node.duration, repeat: Infinity, ease: "easeInOut" },
                scale: { type: "spring", stiffness: 280, damping: 18 },
              }}
              className="z-20 cursor-pointer"
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => handleNodeClick(node)}
            >
              <div className="relative flex items-center justify-center p-3.5">
                {/* Aura de Plasma Cósmica */}
                <div
                  style={{
                    backgroundColor: isNodeActive ? node.color : "rgba(255,255,255,0.08)",
                  }}
                  className={`absolute inset-0 rounded-full transition-all duration-500 ${
                    isHovered || isSelected
                      ? "blur-2xl opacity-95 scale-170"
                      : "blur-lg opacity-25 scale-110"
                  }`}
                />

                {/* Card de Tecnologia com Feixe de Borda Giratório (Estilo Header) */}
                <div className="relative flex items-center justify-center rounded-2xl p-[1.5px] overflow-hidden group/card shadow-[0_0_30px_rgba(0,0,0,0.9)]">
                  <div
                    className={`absolute inset-[-150%] animate-[spin_2.8s_linear_infinite] transition-opacity duration-500 pointer-events-none ${
                      isNodeActive ? "opacity-100" : "opacity-40 group-hover/card:opacity-100"
                    }`}
                    style={{
                      background: `conic-gradient(from 0deg at 50% 50%, transparent 50%, ${node.color} 100%)`,
                    }}
                  />

                  {/* Conteúdo Translúcido do Card */}
                  <div
                    style={{
                      boxShadow: isNodeActive ? `0 0 25px ${node.glowColor}` : undefined,
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
                      className="object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] transition-transform duration-300 group-hover/card:scale-110"
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

        {/* 7. Painel de Informação da Stack Ativa */}
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

        {/* 8. Poeira Estelar Cintilante Flutuante */}
        {[
          { top: "8%", left: "15%", size: 3, delay: 0 },
          { top: "14%", left: "80%", size: 2.5, delay: 1 },
          { top: "25%", left: "10%", size: 2, delay: 2 },
          { top: "42%", left: "92%", size: 3, delay: 0.5 },
          { top: "65%", left: "8%", size: 2.5, delay: 1.5 },
          { top: "82%", left: "84%", size: 3.5, delay: 2.5 },
          { top: "50%", left: "50%", size: 2, delay: 1.8 },
          { top: "75%", left: "32%", size: 2.5, delay: 0.8 },
        ].map((star, i) => (
          <motion.div
            key={`nebula-star-${i}`}
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
