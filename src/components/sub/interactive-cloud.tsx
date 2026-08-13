"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Image } from "@/components/ui/image";
import { SparklesIcon } from "@heroicons/react/24/solid";

const technologies = [
  { name: "JavaScript", icon: "/skills/js.png" },
  { name: "TypeScript", icon: "/skills/ts.png" },
  { name: "React", icon: "/skills/react.png" },
  { name: "MySQL", icon: "/skills/mysql.png" },
  { name: "Tailwind", icon: "/skills/tailwind.png" },
  { name: "Docker", icon: "/skills/docker.png" },
  { name: "PostgreSQL", icon: "/skills/postgresql.png" },
  { name: "MongoDB", icon: "/skills/mongodb.png" },
  { name: "HTML", icon: "/skills/html.png" },
  { name: "CSS", icon: "/skills/css.png" },
  { name: "Python", icon: "/skills/python.svg" },
];

const SpiralNode = ({ tech, index, total }: any) => {
  const NUM_ARMS = 3; // 3 braços da galáxia para distribuir os 11 ícones
  const arm = index % NUM_ARMS;
  // Distância do centro aumenta com o índice dentro do braço
  const positionInArm = Math.floor(index / NUM_ARMS);
  const itemsPerArm = Math.ceil(total / NUM_ARMS);
  const distanceRatio = (positionInArm + 1) / itemsPerArm;
  
  const maxRadius = 260; // Raio máximo da galáxia
  const radius = Math.max(70, distanceRatio * maxRadius); // Raio mínimo de 70

  const swirlFactor = 2.5; // O quão enrolado é o braço da espiral
  const baseAngle = (arm * (Math.PI * 2) / NUM_ARMS) + (distanceRatio * swirlFactor);
  
  const angle = useMotionValue(baseAngle);

  useEffect(() => {
    // Rotação constante para manter o formato da galáxia
    const duration = 25; // 25s para uma volta completa
    const targetAngle = baseAngle + (Math.PI * 2);
    
    const controls = animate(angle, targetAngle, {
      ease: "linear",
      duration: duration,
      repeat: Infinity,
    });

    return () => controls.stop();
  }, [angle, baseAngle]);

  const x = useTransform(angle, (a) => Math.cos(a) * radius);
  const y = useTransform(angle, (a) => Math.sin(a) * radius);

  // Variar um pouco o tamanho dependendo de quão longe está do centro (mais longe = menor, ou vice versa)
  const size = Math.max(35, 55 - (distanceRatio * 15));

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
        willChange: "transform"
      }}
      className="group cursor-pointer z-20"
      whileHover={{ scale: 1.5, zIndex: 50 }}
    >
      <div className="relative p-2">
        <Image
          src={tech.icon}
          alt={tech.name}
          width={size}
          height={size}
          className="drop-shadow-[0_0_12px_rgba(14,165,233,0.5)] transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(14,165,233,0.9)] rounded-full"
        />
        <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full -z-10 group-hover:bg-cyan-400/30" />
      </div>

      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-cyan-300 text-[11px] font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
        {tech.name}
      </span>
    </motion.div>
  );
};

export const InteractiveCloud = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="relative w-full h-[700px]" />;
  }

  return (
    <div className="relative w-full h-[700px] flex items-center justify-center overflow-visible">
      <div className="relative w-full h-full flex items-center justify-center">
        
        {/* Core Galaxy Center */}
        <div className="relative w-40 h-40 flex items-center justify-center z-10 pointer-events-none">
          {/* Brilho supermassivo */}
          <div className="absolute inset-0 bg-amber-500/30 blur-[60px] animate-pulse rounded-full" />
          <div className="absolute inset-0 bg-cyan-500/20 blur-[80px] animate-pulse rounded-full" />
          
          {/* Braços de poeira estelar esfumaçados ao fundo */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute w-[500px] h-[500px]"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[80px] bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent blur-[30px] rotate-45 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[80px] bg-gradient-to-r from-transparent via-amber-500/5 to-transparent blur-[30px] -rotate-45 rounded-full" />
          </motion.div>

          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
            className="relative w-16 h-16 flex items-center justify-center rounded-full backdrop-blur-md bg-white/5 border border-white/20 shadow-[0_0_40px_rgba(34,211,238,0.5)]"
          >
            <SparklesIcon className="w-8 h-8 text-cyan-300 drop-shadow-[0_0_15px_rgba(34,211,238,1)]" />
          </motion.div>
        </div>

        {/* Orbiting Technologies in Spiral */}
        {technologies.map((tech, index) => (
          <SpiralNode
            key={tech.name}
            tech={tech}
            index={index}
            total={technologies.length}
          />
        ))}

        {/* Estrelas de Fundo (Partículas Paradas) */}
        <div className="absolute inset-0 w-[600px] h-[600px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 mask-radial-faded pointer-events-none rounded-full" style={{ WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)' }} />
      </div>

      {/* Extreme background glow */}
      <div className="absolute w-[700px] h-[700px] bg-slate-900/50 blur-[120px] rounded-full -z-30 pointer-events-none" />
    </div>
  );
};
