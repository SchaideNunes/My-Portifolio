"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { Image } from "@/components/ui/image";

interface BlackHoleNode {
  id: number;
  name: string;
  role: string;
  category: "Frontend" | "Backend" | "Cloud" | "Core";
  icon: string;
  orbitRadiusX: number;
  orbitRadiusY: number;
  speed: number;
  initialAngle: number;
  size: number;
  color: string;
  glowColor: string;
}

// 8 Stacks em órbita relativística no Disco de Acreção do Buraco Negro
const BLACK_HOLE_NODES: BlackHoleNode[] = [
  // Órbita Interna (Zona de Alta Velocidade relativística)
  {
    id: 0,
    name: "React",
    role: "Core UI Singularity",
    category: "Core",
    icon: "/skills/react.png",
    orbitRadiusX: 135,
    orbitRadiusY: 85,
    speed: 0.28,
    initialAngle: 0,
    size: 54,
    color: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.9)",
  },
  {
    id: 1,
    name: "TypeScript",
    role: "Type-Safe Horizon",
    category: "Frontend",
    icon: "/skills/ts.png",
    orbitRadiusX: 140,
    orbitRadiusY: 90,
    speed: -0.25,
    initialAngle: Math.PI,
    size: 46,
    color: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.8)",
  },

  // Órbita Média (Disco de Acreção Principal)
  {
    id: 2,
    name: "Python",
    role: "Backend & Systems Logic",
    category: "Backend",
    icon: "/skills/python.svg",
    orbitRadiusX: 205,
    orbitRadiusY: 135,
    speed: 0.18,
    initialAngle: Math.PI * 0.4,
    size: 50,
    color: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.9)",
  },
  {
    id: 3,
    name: "AWS",
    role: "Cloud Infrastructure",
    category: "Cloud",
    icon: "/skills/aws.svg",
    orbitRadiusX: 215,
    orbitRadiusY: 140,
    speed: 0.17,
    initialAngle: Math.PI * 1.4,
    size: 52,
    color: "#fb923c",
    glowColor: "rgba(251, 146, 60, 0.85)",
  },
  {
    id: 4,
    name: "Tailwind",
    role: "Modern UI Styling",
    category: "Frontend",
    icon: "/skills/tailwind.png",
    orbitRadiusX: 200,
    orbitRadiusY: 130,
    speed: -0.19,
    initialAngle: Math.PI * 0.85,
    size: 44,
    color: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.75)",
  },

  // Órbita Externa (Borda Gravitacional)
  {
    id: 5,
    name: "Docker",
    role: "Containers & DevOps",
    category: "Cloud",
    icon: "/skills/docker.png",
    orbitRadiusX: 270,
    orbitRadiusY: 180,
    speed: 0.12,
    initialAngle: Math.PI * 0.2,
    size: 48,
    color: "#818cf8",
    glowColor: "rgba(129, 140, 248, 0.8)",
  },
  {
    id: 6,
    name: "SQL",
    role: "Relational Data Storage",
    category: "Backend",
    icon: "/skills/sql.svg",
    orbitRadiusX: 275,
    orbitRadiusY: 185,
    speed: -0.13,
    initialAngle: Math.PI * 1.15,
    size: 46,
    color: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.85)",
  },
  {
    id: 7,
    name: "GSAP",
    role: "Relativistic Motion",
    category: "Frontend",
    icon: "/skills/gsap.svg",
    orbitRadiusX: 280,
    orbitRadiusY: 190,
    speed: 0.11,
    initialAngle: Math.PI * 1.7,
    size: 44,
    color: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.75)",
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

// Componente de Nó em Órbita Elíptica Gravitacional
const OrbitingBlackHoleNode = ({
  node,
  isHovered,
  isSelected,
  mousePos,
  onHover,
  onLeave,
  onClick,
}: {
  node: BlackHoleNode;
  isHovered: boolean;
  isSelected: boolean;
  mousePos: { x: number; y: number } | null;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) => {
  const angle = useMotionValue(node.initialAngle);

  useEffect(() => {
    // 0.6 radianos/s base
    const radiansPerSecond = 0.6 * Math.abs(node.speed);
    const duration = (2 * Math.PI) / radiansPerSecond;
    const targetAngle = node.initialAngle + 2 * Math.PI * Math.sign(node.speed);

    const controls = animate(angle, targetAngle, {
      ease: "linear",
      duration: isHovered ? duration * 3 : duration, // Dilatação temporal ao passar o mouse
      repeat: Infinity,
    });

    return () => controls.stop();
  }, [angle, node.initialAngle, node.speed, isHovered]);

  // Posição orbital elíptica inclinada
  const x = useTransform(angle, (a) => Math.cos(a) * node.orbitRadiusX);
  const y = useTransform(angle, (a) => Math.sin(a) * node.orbitRadiusY);

  const isNodeActive = isHovered || isSelected;

  return (
    <motion.div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        willChange: "transform",
      }}
      className="z-20 cursor-pointer"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      whileHover={{ scale: 1.35 }}
    >
      <div className="relative flex items-center justify-center p-3">
        {/* Aura Cósmica de Radiação de Hawking */}
        <div
          style={{
            backgroundColor: isNodeActive ? node.color : "rgba(255,255,255,0.06)",
          }}
          className={`absolute inset-0 rounded-full transition-all duration-500 ${
            isNodeActive
              ? "blur-2xl opacity-90 scale-160"
              : "blur-md opacity-20"
          }`}
        />

        {/* Card Translúcido com Feixe de Borda Giratório */}
        <div className="relative flex items-center justify-center rounded-2xl p-[1.5px] overflow-hidden group/card shadow-[0_0_25px_rgba(0,0,0,0.9)]">
          <div
            className={`absolute inset-[-150%] animate-[spin_2.8s_linear_infinite] transition-opacity duration-500 pointer-events-none ${
              isNodeActive ? "opacity-100" : "opacity-40 group-hover/card:opacity-100"
            }`}
            style={{
              background: `conic-gradient(from 0deg at 50% 50%, transparent 50%, ${node.color} 100%)`,
            }}
          />

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
              className="object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.35)] transition-transform duration-300 group-hover/card:scale-110"
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
            style={{ color: isNodeActive ? "#ffffff" : node.color }}
            className="font-mono text-[11px] font-bold uppercase tracking-wider drop-shadow-[0_0_8px_rgba(0,0,0,1)]"
          >
            {node.name}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

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

  // Partículas de radiação
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

    // Parallax relativístico
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = -((y - cy) / cy) * 14;
    const rotY = ((x - cx) / cx) * 14;
    setTilt({ rotateX: rotX, rotateY: rotY });
  };

  const handleMouseLeave = () => {
    setMousePos(null);
    setHoveredNode(null);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  // Clique no horizonte de eventos: Jato Relativístico / Gamma Burst
  const triggerRelativisticBurst = (x: number = 300, y: number = 300, color: string = "#fbbf24") => {
    const waveId = Date.now();
    setShockwaves((prev) => [...prev, { id: waveId, x, y, color }]);
    setTimeout(() => {
      setShockwaves((prev) => prev.filter((w) => w.id !== waveId));
    }, 1200);

    const newParticles: Particle[] = Array.from({ length: 18 }).map((_, i) => {
      const angle = (i / 18) * Math.PI * 2;
      const speed = 3 + Math.random() * 6;
      return {
        id: Math.random(),
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        size: 4 + Math.random() * 3,
      };
    });
    setParticles((prev) => [...prev, ...newParticles]);
  };

  if (!isMounted) {
    return <div className="relative w-full h-[720px]" />;
  }

  const activeNodeId = hoveredNode !== null ? hoveredNode : selectedNode;
  const activeNode = activeNodeId !== null ? BLACK_HOLE_NODES.find((n) => n.id === activeNodeId) : null;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[720px] flex items-center justify-center select-none overflow-visible group cursor-crosshair"
      style={{ perspective: "1000px" }}
    >
      {/* 1. Distorção Gravitacional / Glow Cósmico da Singularidade */}
      <div className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-amber-600/20 via-black/40 to-cyan-600/20 blur-[130px] rounded-full pointer-events-none -z-30" />

      {/* 2. Lanterna Relativística do Mouse */}
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

      {/* 3. Disco de Acreção do Buraco Negro com Parallax 3D */}
      <motion.div
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
        }}
        transition={{ type: "spring", stiffness: 140, damping: 20 }}
        className="relative w-[600px] h-[600px] flex items-center justify-center transform-style-3d"
      >
        {/* Marca d'água */}
        <div className="absolute top-2 right-4 pointer-events-none z-0">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/20 font-bold">
            SINGULARITY // BLACK HOLE
          </span>
        </div>

        {/* ESTRUTURA VISUAL DO BURACO NEGRO (Gargantua Style) */}
        <div
          onClick={() => triggerRelativisticBurst(300, 300, "#f59e0b")}
          className="relative w-64 h-64 flex items-center justify-center cursor-pointer z-10"
        >
          {/* Anel de Fótons / Lente Gravitacional Superior (Warped Light Ring) */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute w-60 h-60 rounded-full border-2 border-amber-400/50 shadow-[0_0_60px_rgba(245,158,11,0.7)] blur-[1px]"
            style={{
              background: "conic-gradient(from 0deg, transparent, #f59e0b 40%, #fbbf24 60%, transparent 100%)",
              WebkitMask: "radial-gradient(circle, transparent 65%, black 70%)",
            }}
          />

          {/* Disco de Acreção Horizontal Inclinado (Accretion Disk) */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute w-[460px] h-[140px] rounded-full border border-amber-500/40 shadow-[0_0_50px_rgba(245,158,11,0.5)] blur-[2px] pointer-events-none"
            style={{
              background: "conic-gradient(from 90deg, transparent 20%, #f59e0b 50%, #38bdf8 70%, transparent 95%)",
              WebkitMask: "radial-gradient(ellipse, transparent 40%, black 65%)",
            }}
          />

          {/* Disco de Acreção Secundário Cruzado */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="absolute w-[360px] h-[110px] rounded-full border border-sky-400/30 shadow-[0_0_40px_rgba(56,189,248,0.4)] blur-[1.5px] pointer-events-none"
            style={{
              background: "conic-gradient(from 180deg, transparent 30%, #38bdf8 60%, #a855f7 85%, transparent 100%)",
              WebkitMask: "radial-gradient(ellipse, transparent 45%, black 70%)",
            }}
          />

          {/* O NÚCLEO ESCURO ABSOLUTO (Event Horizon / Singularidade) */}
          <div className="relative w-28 h-28 rounded-full bg-black border border-amber-500/30 shadow-[0_0_50px_rgba(0,0,0,1)] flex items-center justify-center z-20 group/core overflow-hidden">
            {/* Feixe de Borda de Luz do Horizonte de Eventos */}
            <div className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_60%,#f59e0b_90%,#ffffff_100%)] opacity-80" />
            
            {/* Interior Escuro Pitch Black */}
            <div className="relative w-[106px] h-[106px] rounded-full bg-[#000000] z-10 flex items-center justify-center">
              <span className="font-mono text-[9px] uppercase tracking-widest text-amber-400/60 font-bold group-hover/core:text-amber-300 transition-colors">
                SINGULARITY
              </span>
            </div>
          </div>
        </div>

        {/* Órbitas Elípticas das Tecnologias no Disco de Acreção */}
        {[
          { rx: 135, ry: 85, color: "rgba(56, 189, 248, 0.15)" },
          { rx: 205, ry: 135, color: "rgba(245, 158, 11, 0.15)" },
          { rx: 275, ry: 185, color: "rgba(129, 140, 248, 0.12)" },
        ].map((orbit, idx) => (
          <div
            key={`orbit-ring-${idx}`}
            style={{
              width: orbit.rx * 2,
              height: orbit.ry * 2,
              borderColor: orbit.color,
            }}
            className="absolute rounded-full border border-dashed pointer-events-none"
          />
        ))}

        {/* As 8 Stacks Orbitando o Buraco Negro */}
        {BLACK_HOLE_NODES.map((node) => (
          <OrbitingBlackHoleNode
            key={node.name}
            node={node}
            isHovered={hoveredNode === node.id}
            isSelected={selectedNode === node.id}
            mousePos={mousePos}
            onHover={() => setHoveredNode(node.id)}
            onLeave={() => setHoveredNode(null)}
            onClick={() => {
              setSelectedNode((prev) => (prev === node.id ? null : node.id));
              triggerRelativisticBurst(300, 300, node.color);
            }}
          />
        ))}

        {/* Ondas de Choque Supernova */}
        {shockwaves.map((wave) => (
          <motion.div
            key={`shockwave-${wave.id}`}
            initial={{ scale: 0.1, opacity: 1 }}
            animate={{ scale: 5, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: wave.x,
              top: wave.y,
              borderColor: wave.color,
              boxShadow: `0 0 45px ${wave.color}`,
            }}
            className="w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 pointer-events-none z-30"
          />
        ))}

        {/* Partículas de Radiação de Hawking */}
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

        {/* Painel de Informação da Stack Selecionada */}
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
      </motion.div>
    </div>
  );
};
