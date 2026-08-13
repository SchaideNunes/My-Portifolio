"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";

interface ConstellationNode {
  id: number;
  name: string;
  category: "frontend" | "backend" | "cloud";
  icon: string;
  x: number;
  y: number;
  floatX: number[];
  floatY: number[];
  duration: number;
  size: number;
  color: string;
  glowColor: string;
}

// 8 Stacks organizadas em 3 camadas lógicas da arquitetura de software
const CONSTELLATION_NODES: ConstellationNode[] = [
  // Camada 1: Frontend & UI (Topo)
  {
    id: 0,
    name: "React",
    category: "frontend",
    icon: "/skills/react.png",
    x: 300,
    y: 95,
    floatX: [0, 6, -6, 0],
    floatY: [0, -8, 4, 0],
    duration: 6,
    size: 50,
    color: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.5)"
  },
  {
    id: 1,
    name: "TypeScript",
    category: "frontend",
    icon: "/skills/ts.png",
    x: 165,
    y: 145,
    floatX: [0, -8, 5, 0],
    floatY: [0, 6, -6, 0],
    duration: 7,
    size: 44,
    color: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.4)"
  },
  {
    id: 2,
    name: "Tailwind",
    category: "frontend",
    icon: "/skills/tailwind.png",
    x: 435,
    y: 145,
    floatX: [0, 8, -5, 0],
    floatY: [0, 5, -7, 0],
    duration: 6.5,
    size: 44,
    color: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.4)"
  },
  {
    id: 3,
    name: "GSAP",
    category: "frontend",
    icon: "/skills/gsap.svg",
    x: 300,
    y: 215,
    floatX: [0, -5, 6, 0],
    floatY: [0, -6, 8, 0],
    duration: 7.5,
    size: 42,
    color: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.4)"
  },

  // Camada 2: Backend & Data (Centro)
  {
    id: 4,
    name: "Python",
    category: "backend",
    icon: "/skills/python.svg",
    x: 200,
    y: 345,
    floatX: [0, -7, 7, 0],
    floatY: [0, 7, -5, 0],
    duration: 8,
    size: 48,
    color: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.5)"
  },
  {
    id: 5,
    name: "SQL",
    category: "backend",
    icon: "/skills/sql.svg",
    x: 400,
    y: 345,
    floatX: [0, 7, -6, 0],
    floatY: [0, -7, 6, 0],
    duration: 7.2,
    size: 46,
    color: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.5)"
  },

  // Camada 3: DevOps & Cloud (Base)
  {
    id: 6,
    name: "Docker",
    category: "cloud",
    icon: "/skills/docker.png",
    x: 200,
    y: 485,
    floatX: [0, 6, -8, 0],
    floatY: [0, -6, 7, 0],
    duration: 8.5,
    size: 48,
    color: "#818cf8",
    glowColor: "rgba(129, 140, 248, 0.5)"
  },
  {
    id: 7,
    name: "AWS",
    category: "cloud",
    icon: "/skills/aws.svg",
    x: 400,
    y: 485,
    floatX: [0, -6, 8, 0],
    floatY: [0, 8, -6, 0],
    duration: 8,
    size: 50,
    color: "#fb923c",
    glowColor: "rgba(251, 146, 60, 0.5)"
  },
];

// Conexões lógicas: Intra-camadas e Pontes Arquiteturais de Dados
const CONSTELLATION_EDGES = [
  // Camada 1: Frontend Ecosystem
  { start: 0, end: 1, type: "intra" }, // React - TS
  { start: 0, end: 2, type: "intra" }, // React - Tailwind
  { start: 0, end: 3, type: "intra" }, // React - GSAP
  { start: 1, end: 3, type: "intra" }, // TS - GSAP
  { start: 2, end: 3, type: "intra" }, // Tailwind - GSAP

  // Camada 2: Backend Ecosystem
  { start: 4, end: 5, type: "intra" }, // Python - SQL

  // Camada 3: Cloud Ecosystem
  { start: 6, end: 7, type: "intra" }, // Docker - AWS

  // Pontes Inter-camadas (Frontend -> Backend)
  { start: 3, end: 4, type: "bridge" }, // GSAP/UI Hub -> Python (API calls)
  { start: 3, end: 5, type: "bridge" }, // GSAP/UI Hub -> SQL (Data queries)
  { start: 1, end: 4, type: "bridge" }, // TypeScript -> Python (Fullstack types)

  // Pontes Inter-camadas (Backend -> Cloud)
  { start: 4, end: 6, type: "bridge" }, // Python -> Docker (Containerization)
  { start: 5, end: 7, type: "bridge" }, // SQL -> AWS (Cloud DB / RDS)
  { start: 4, end: 7, type: "bridge" }, // Python -> AWS (Lambda / ECS)
  { start: 6, end: 5, type: "bridge" }, // Docker -> SQL
];

const LAYERS_INFO = [
  { label: "FRONTEND & UI", y: 45, color: "text-sky-400", dot: "bg-sky-400 shadow-[0_0_8px_#38bdf8]" },
  { label: "BACKEND & DATA", y: 285, color: "text-amber-400", dot: "bg-amber-400 shadow-[0_0_8px_#fbbf24]" },
  { label: "DEVOPS & CLOUD", y: 425, color: "text-indigo-400", dot: "bg-indigo-400 shadow-[0_0_8px_#818cf8]" },
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

  const activeCategory = hoveredNode !== null ? CONSTELLATION_NODES.find(n => n.id === hoveredNode)?.category : null;

  return (
    <div className="relative w-full h-[700px] flex items-center justify-center select-none overflow-visible">
      {/* Background Deep Cosmic Glow */}
      <div className="absolute w-[520px] h-[580px] bg-gradient-to-b from-sky-950/20 via-amber-950/20 to-indigo-950/20 blur-[130px] rounded-full pointer-events-none -z-30" />

      <div className="relative w-[600px] h-[600px]">
        {/* Rótulos das 3 Camadas Cósmicas */}
        {LAYERS_INFO.map((layer, idx) => (
          <div
            key={`layer-label-${idx}`}
            style={{ top: layer.y }}
            className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-[#030014]/40 border border-white/[0.04] backdrop-blur-sm pointer-events-none z-0"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${layer.dot}`} />
            <span className={`font-mono text-[10px] font-bold tracking-[0.25em] ${layer.color} opacity-80 uppercase`}>
              {layer.label}
            </span>
          </div>
        ))}

        {/* Camada SVG das Linhas da Constelação */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
          <defs>
            {/* Gradientes para linhas da constelação */}
            <linearGradient id="intraLineFrontend" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.45" />
            </linearGradient>

            <linearGradient id="intraLineBackend" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.5" />
            </linearGradient>

            <linearGradient id="intraLineCloud" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#fb923c" stopOpacity="0.5" />
            </linearGradient>

            <linearGradient id="bridgeLine" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.2" />
            </linearGradient>

            <linearGradient id="activeBeam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.95" />
            </linearGradient>

            <filter id="lineGlow">
              <feGaussianBlur stdDeviation="3.5" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Render das Conexões */}
          {CONSTELLATION_EDGES.map((edge, idx) => {
            const startNode = CONSTELLATION_NODES.find((n) => n.id === edge.start)!;
            const endNode = CONSTELLATION_NODES.find((n) => n.id === edge.end)!;
            const isDirectConnected = hoveredNode === edge.start || hoveredNode === edge.end;
            const isSameCategoryHovered =
              activeCategory !== null &&
              startNode.category === activeCategory &&
              endNode.category === activeCategory;

            const isHighlighted = isDirectConnected || isSameCategoryHovered;

            // Escolhe a cor base da linha
            let baseStroke = "url(#bridgeLine)";
            if (edge.type === "intra") {
              if (startNode.category === "frontend") baseStroke = "url(#intraLineFrontend)";
              else if (startNode.category === "backend") baseStroke = "url(#intraLineBackend)";
              else baseStroke = "url(#intraLineCloud)";
            }

            return (
              <g key={`constellation-edge-${idx}`}>
                {/* Linha da Constelação */}
                <line
                  x1={startNode.x}
                  y1={startNode.y}
                  x2={endNode.x}
                  y2={endNode.y}
                  stroke={isHighlighted ? "url(#activeBeam)" : baseStroke}
                  strokeWidth={isHighlighted ? 2.5 : edge.type === "bridge" ? 1.2 : 1.6}
                  strokeDasharray={isHighlighted ? "none" : edge.type === "bridge" ? "4, 4" : "none"}
                  filter={isHighlighted ? "url(#lineGlow)" : undefined}
                  className="transition-all duration-300"
                />

                {/* Pulso de fóton / feixe estelar viajando na linha */}
                <circle
                  r={isHighlighted ? 2.5 : 1.5}
                  fill={isHighlighted ? "#ffffff" : startNode.color}
                  opacity={isHighlighted ? 1 : 0.6}
                >
                  <animateMotion
                    path={`M ${startNode.x} ${startNode.y} L ${endNode.x} ${endNode.y}`}
                    dur={`${3 + (idx % 3) * 1.2}s`}
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
          const isCategoryHovered = activeCategory !== null && node.category === activeCategory;
          const isDirectConnected =
            hoveredNode !== null &&
            CONSTELLATION_EDGES.some(
              (e) => (e.start === hoveredNode && e.end === node.id) || (e.end === hoveredNode && e.start === node.id)
            );

          const isNodeActive = isHovered || isDirectConnected || isCategoryHovered;

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
              <div className="relative flex items-center justify-center p-3">
                {/* Aura Cósmica de Brilho */}
                <div
                  style={{
                    backgroundColor: isNodeActive ? node.color : "rgba(255,255,255,0.05)",
                  }}
                  className={`absolute inset-0 rounded-full transition-all duration-500 ${
                    isHovered
                      ? "blur-xl opacity-60 scale-150"
                      : isNodeActive
                      ? "blur-lg opacity-35 scale-125"
                      : "blur-md opacity-10"
                  }`}
                />

                {/* Card Translúcido da Estrela / Tecnologia */}
                <div
                  style={{
                    borderColor: isHovered
                      ? node.color
                      : isNodeActive
                      ? `${node.color}80`
                      : "rgba(255, 255, 255, 0.1)",
                    boxShadow: isHovered
                      ? `0 0 25px ${node.glowColor}`
                      : isNodeActive
                      ? `0 0 15px ${node.glowColor}`
                      : "0 0 10px rgba(0,0,0,0.5)",
                  }}
                  className={`relative flex items-center justify-center rounded-2xl p-2.5 backdrop-blur-md transition-all duration-300 border ${
                    isHovered
                      ? "bg-black/85"
                      : isNodeActive
                      ? "bg-[#030014]/80"
                      : "bg-[#030014]/60 hover:bg-[#030014]/80"
                  }`}
                >
                  <Image
                    src={node.icon}
                    alt={node.name}
                    width={node.size}
                    height={node.size}
                    className="object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.25)] transition-transform duration-300"
                  />
                </div>

                {/* Etiqueta / Tag Estelar com Nome da Stack */}
                <div
                  className={`absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 transition-all duration-300 pointer-events-none whitespace-nowrap ${
                    isHovered ? "opacity-100 translate-y-0" : isCategoryHovered ? "opacity-80 translate-y-0" : "opacity-0 -translate-y-1"
                  }`}
                >
                  <span
                    style={{ backgroundColor: node.color }}
                    className="w-1.5 h-1.5 rounded-full shadow-[0_0_6px_currentColor]"
                  />
                  <span
                    style={{ color: isHovered ? "#ffffff" : node.color }}
                    className="font-mono text-[11px] font-bold uppercase tracking-wider drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]"
                  >
                    {node.name}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Micro-estrelas de Fundo / Star Dust */}
        {[
          { top: "12%", left: "15%", size: 3, delay: 0 },
          { top: "20%", left: "85%", size: 2.5, delay: 1 },
          { top: "35%", left: "8%", size: 2, delay: 2 },
          { top: "50%", left: "92%", size: 3, delay: 0.5 },
          { top: "70%", left: "12%", size: 2.5, delay: 1.5 },
          { top: "88%", left: "85%", size: 3.5, delay: 2.5 },
          { top: "60%", left: "50%", size: 2, delay: 1.8 },
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
              scale: [0.8, 1.3, 0.8],
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
      </div>
    </div>
  );
};
