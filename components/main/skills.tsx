"use client";

import { SkillDataProvider } from "@/components/sub/skill-data-provider";
import { SkillText } from "@/components/sub/skill-text";
import { CloudIcon } from "@heroicons/react/24/outline";
import {
  BACKEND_SKILL,
  FRONTEND_SKILL,
  CLOUD_SKILL,
} from "@/constants";

export const Skills = () => {
  // Figma data for UI/UX slot
  const UI_UX_SKILL = [
    {
      skill_name: "Figma",
      image: "figma.png",
      width: 50,
      height: 50,
    },
  ];

  return (
    <section
      id="skills"
      className="flex flex-col items-center justify-center gap-12 h-full relative overflow-hidden py-20 px-10"
    >
      <SkillText />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 w-full max-w-[1200px] z-[20]">
        {/* Frontend */}
        <div className="flex flex-col items-center gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-cyan-500/30 transition-colors duration-500">
          <h3 className="text-xl font-bold text-cyan-400 tracking-[-2%] uppercase">Frontend</h3>
          <div className="flex flex-row flex-wrap justify-center gap-4">
            {FRONTEND_SKILL.map((skill, i) => (
              <SkillDataProvider
                key={skill.skill_name}
                src={skill.image}
                name={skill.skill_name}
                width={50}
                height={50}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* Backend */}
        <div className="flex flex-col items-center gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-purple-500/30 transition-colors duration-500">
          <h3 className="text-xl font-bold text-purple-400 tracking-[-2%] uppercase">Backend</h3>
          <div className="flex flex-row flex-wrap justify-center gap-4">
            {BACKEND_SKILL.map((skill, i) => (
              <SkillDataProvider
                key={skill.skill_name}
                src={skill.image}
                name={skill.skill_name}
                width={50}
                height={50}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* Cloud */}
        <div className="flex flex-col items-center gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-orange-500/30 transition-colors duration-500">
          <h3 className="text-xl font-bold text-orange-400 tracking-[-2%] uppercase">Cloud</h3>
          <div className="flex flex-row flex-wrap justify-center gap-4">
            {/* AWS Placeholder as the image is missing */}
            <div className="relative group flex items-center justify-center cursor-pointer hover:scale-125 transition-all duration-300">
               <CloudIcon className="w-12 h-12 text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]" />
               <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#030014] border border-[#7042f88b] text-white text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-xl">
                 AWS
               </span>
            </div>
            {CLOUD_SKILL.filter(s => s.skill_name !== "Figma" && s.skill_name !== "AWS").map((skill, i) => (
              <SkillDataProvider
                key={skill.skill_name}
                src={skill.image}
                name={skill.skill_name}
                width={50}
                height={50}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* UI/UX */}
        <div className="flex flex-col items-center gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-pink-500/30 transition-colors duration-500">
          <h3 className="text-xl font-bold text-pink-400 tracking-[-2%] uppercase">UI/UX</h3>
          <div className="flex flex-row flex-wrap justify-center gap-4">
            {UI_UX_SKILL.map((skill, i) => (
              <SkillDataProvider
                key={skill.skill_name}
                src={skill.image}
                name={skill.skill_name}
                width={50}
                height={50}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full h-full absolute">
        <div className="w-full h-full z-[-10] opacity-20 absolute flex items-center justify-center bg-cover">
          <video
            className="w-full h-auto"
            preload="false"
            playsInline
            loop
            muted
            autoPlay
          >
            <source src="/videos/skills-bg.webm" type="video/webm" />
          </video>
        </div>
      </div>
    </section>
  );
};
