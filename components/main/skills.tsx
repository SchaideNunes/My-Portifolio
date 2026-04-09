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

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10 w-full max-w-[1200px] z-[20]">
        {/* Frontend */}
        <div className="flex flex-col items-center justify-between gap-3 md:gap-6 p-4 md:p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-yellow-500/30 transition-colors duration-500">
          <h3 className="text-sm md:text-xl font-bold text-yellow-500 tracking-[-2%] uppercase">Frontend</h3>
          <div className="flex flex-row flex-wrap justify-center items-center gap-2 md:gap-4 flex-1">
            {FRONTEND_SKILL.map((skill, i) => (
              <SkillDataProvider
                key={skill.skill_name}
                src={skill.image}
                name={skill.skill_name}
                width={36}
                height={36}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* Backend */}
        <div className="flex flex-col items-center justify-between gap-3 md:gap-6 p-4 md:p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-orange-500/30 transition-colors duration-500">
          <h3 className="text-sm md:text-xl font-bold text-orange-400 tracking-[-2%] uppercase">Backend</h3>
          <div className="flex flex-row flex-wrap justify-center items-center gap-2 md:gap-4 flex-1">
            {BACKEND_SKILL.map((skill, i) => (
              <SkillDataProvider
                key={skill.skill_name}
                src={skill.image}
                name={skill.skill_name}
                width={36}
                height={36}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* Cloud */}
        <div className="flex flex-col items-center justify-between gap-3 md:gap-6 p-4 md:p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-amber-600/30 transition-colors duration-500">
          <h3 className="text-sm md:text-xl font-bold text-amber-600 tracking-[-2%] uppercase">Cloud</h3>
          <div className="flex flex-row flex-wrap justify-center items-center gap-2 md:gap-4 flex-1">
            {/* AWS Placeholder as the image is missing */}
            <div className="relative group flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300">
              <CloudIcon className="w-8 h-8 md:w-12 md:h-12 text-amber-600 drop-shadow-[0_0_2px_rgba(217,119,6,0.3)] group-hover:drop-shadow-[0_0_5px_rgba(251,191,36,0.5)] transition-all duration-300" />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#000000] border border-[#f59e0b8b] text-white text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-xl">
                AWS
              </span>
            </div>
            {CLOUD_SKILL.filter(s => s.skill_name !== "Figma" && s.skill_name !== "AWS").map((skill, i) => (
              <SkillDataProvider
                key={skill.skill_name}
                src={skill.image}
                name={skill.skill_name}
                width={36}
                height={36}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* UI/UX */}
        <div className="flex flex-col items-center justify-between gap-3 md:gap-6 p-4 md:p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-yellow-600/30 transition-colors duration-500">
          <h3 className="text-sm md:text-xl font-bold text-yellow-600 tracking-[-2%] uppercase">UI/UX</h3>
          <div className="flex flex-row flex-wrap justify-center items-center gap-2 md:gap-4 flex-1">
            {UI_UX_SKILL.map((skill, i) => (
              <SkillDataProvider
                key={skill.skill_name}
                src={skill.image}
                name={skill.skill_name}
                width={36}
                height={36}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full h-full absolute">
        <div className="w-full h-full z-[-10] opacity-15 absolute flex items-center justify-center bg-cover">
          <video
            className="w-full h-auto brightness-50"
            preload="false"
            playsInline
            loop
            muted
            autoPlay
          >
            <source src="/videos/skills-bg.webm" type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-amber-900/10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
};
