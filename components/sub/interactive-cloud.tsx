"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { CodeBracketIcon } from "@heroicons/react/24/outline";

const technologies = [
  // Core (Inner Circle)
  { name: "JavaScript", icon: "/skills/js.png", orbit: 1, speed: 0.25 },
  { name: "TypeScript", icon: "/skills/ts.png", orbit: 1, speed: -0.2 },
  { name: "React", icon: "/skills/react.png", orbit: 1, speed: 0.3 },
  
  // Frameworks (Middle Circle)
  { name: "Next.js", icon: "/skills/next.png", orbit: 2, speed: -0.15 },
  { name: "Node.js", icon: "/skills/node.png", orbit: 2, speed: 0.18 },
  { name: "Tailwind", icon: "/skills/tailwind.png", orbit: 2, speed: -0.22 },
  { name: "Figma", icon: "/skills/figma.png", orbit: 2, speed: 0.2 },
  
  // Tools & DB (Outer Circle)
  { name: "PostgreSQL", icon: "/skills/postgresql.png", orbit: 3, speed: 0.1 },
  { name: "MongoDB", icon: "/skills/mongodb.png", orbit: 3, speed: -0.12 },
  { name: "HTML", icon: "/skills/html.png", orbit: 3, speed: 0.15 },
  { name: "CSS", icon: "/skills/css.png", orbit: 3, speed: -0.14 },
];

const OrbitingIcon = ({ tech, index }: any) => {
  const radius = tech.orbit * 95; 
  const initialAngle = (index * (360 / technologies.length)) * (Math.PI / 180);
  const angle = useMotionValue(initialAngle);
  
  useEffect(() => {
    let frame: number;
    const animate = () => {
      angle.set(angle.get() + (tech.speed * 0.01));
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, [angle, tech.speed]);

  const x = useTransform(angle, (a) => Math.cos(a) * radius);
  const y = useTransform(angle, (a) => Math.sin(a) * radius);

  return (
    <motion.div
      style={{ 
        position: "absolute",
        left: "50%",
        top: "50%",
        x,
        y,
        translateX: "-50%",
        translateY: "-50%"
      }}
      className="group cursor-pointer z-20"
      whileHover={{ scale: 1.5 }}
    >
      <div className="relative p-2">
        <Image
          src={tech.icon}
          alt={tech.name}
          width={tech.orbit === 1 ? 55 : tech.orbit === 2 ? 45 : 35}
          height={tech.orbit === 1 ? 55 : tech.orbit === 2 ? 45 : 35}
          className="drop-shadow-[0_0_10px_rgba(112,66,248,0.5)] transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]"
        />
        <div className="absolute inset-0 bg-purple-500/5 blur-xl rounded-full -z-10 group-hover:bg-cyan-500/20" />
      </div>
      
      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-cyan-400 text-[10px] font-bold tracking-tighter uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
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
        {/* Orbital Rings */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{ 
              width: i * 190, 
              height: i * 190,
              border: "1px solid rgba(112, 66, 248, 0.15)"
            }}
            className="absolute rounded-full pointer-events-none"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10 + i * 5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-t border-cyan-500/20 rounded-full" 
            />
          </div>
        ))}

        {/* Core Sun */}
        <div className="relative w-28 h-28 flex items-center justify-center z-10">
          <div className="absolute inset-0 bg-purple-600/30 blur-[40px] animate-pulse rounded-full" />
          <motion.div 
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="relative w-20 h-20 flex items-center justify-center rounded-full backdrop-blur-sm bg-white/5 border border-white/10 shadow-[0_0_50px_rgba(112,66,248,0.4)]"
          >
            <CodeBracketIcon className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
          </motion.div>
        </div>

        {/* Orbiting Technologies */}
        {technologies.map((tech, index) => (
          <OrbitingIcon 
            key={tech.name} 
            tech={tech} 
            index={index} 
          />
        ))}

        {/* Decorative Star Dust */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(112,66,248,0.03)_1.5px,transparent_1.5px)] bg-[size:50px_50px] pointer-events-none" />
      </div>

      {/* Extreme background glow */}
      <div className="absolute w-[600px] h-[600px] bg-purple-900/10 blur-[150px] rounded-full -z-30" />
    </div>
  );
};
