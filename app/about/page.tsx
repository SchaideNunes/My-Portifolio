"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { TESTIMONIALS } from "@/constants";
import { SparklesIcon } from "@heroicons/react/24/solid";

const INTERESTS = [
  { title: "Games", image: "/skills/next.png", color: "#f59e0b" },
  { title: "Música", image: "/skills/react.png", color: "#61dafb" },
  { title: "Programação", image: "/skills/ts.png", color: "#3178c6" },
  { title: "Academia", image: "/skills/tailwind.png", color: "#38b2ac" },
  { title: "Design", image: "/skills/figma.png", color: "#f24e1e" },
];

export default function AboutPage() {
  const carouselRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: carouselRef,
    offset: ["start end", "end start"],
  });

  const xTranslate = useTransform(scrollYProgress, [0, 1], [0, -500]);

  return (
    <main className="h-full w-full pt-32 px-[10%] md:px-20 flex flex-col gap-32 mb-20">
      {/* About Me Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between gap-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6 max-w-2xl"
        >
          <div className="Welcome-box py-[8px] px-[7px] border border-[#f59e0b8b] w-fit">
            <SparklesIcon className="text-[#fbbf24] mr-[10px] h-5 w-5" />
            <h1 className="Welcome-text text-[13px]">About me</h1>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            I build digital experiences with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-[#fbbf24]">passion.</span>
          </h2>
          <p className="text-gray-400 text-lg leading-normal">
            I&apos;m Schaide Nunes, a Software Engineering student based in Bahia, Brazil.
            My journey in technology started with a curiosity about how things work behind the scenes,
            which led me to specialize in modern web development.
            <br /><br />
            I focus on creating high-performance, accessible, and visually stunning applications
            using the latest technologies like Next.js, TypeScript, and AWS.
            When I&apos;m not coding, you can find me exploring new games, listening to music,
            or hitting the gym.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-80 h-80 md:w-[450px] md:h-[450px] rounded-full overflow-hidden border-2 border-[#f59e0b]/20 p-2 shadow-[0_0_50px_rgba(245,158,11,0.1)]"
        >
          <div className="w-full h-full rounded-full overflow-hidden relative">
            <Image
              src="/Logo.png"
              alt="Schaide Nunes"
              fill
              className="object-cover mix-blend-lighten grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </motion.div>
      </section>

      {/* Interests Carousel */}
      <section ref={carouselRef} className="flex flex-col gap-10 overflow-hidden">
        <h3 className="text-3xl md:text-5xl font-bold text-white">What I love</h3>
        <motion.div
          style={{ x: xTranslate }}
          className="flex gap-10 whitespace-nowrap"
        >
          {[...INTERESTS, ...INTERESTS].map((interest, index) => (
            <div
              key={index}
              className="min-w-[300px] h-[400px] relative rounded-3xl overflow-hidden border border-white/10 group"
            >
              <Image
                src={interest.image}
                alt={interest.title}
                fill
                className="object-cover opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                <p className="text-2xl font-bold text-white">{interest.title}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="flex flex-col lg:flex-row gap-20 py-20 border-t border-white/5">
        <div className="lg:w-1/3 flex flex-col gap-6">
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            People who <br />
            <span className="text-[#f59e0b]">trust</span> me.
          </h2>
          <p className="text-gray-400 text-lg">
            I have collaborated with different people on various products and in different contexts.
            Here you can find some of their experiences working with me.
          </p>
        </div>

        <div className="lg:w-2/3 overflow-hidden relative">
          {/* Infinite Auto-sliding Carousel */}
          <motion.div
            className="flex gap-8"
            animate={{
              x: [0, -1500],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, index) => (
              <div
                key={index}
                className="min-w-[350px] md:min-w-[450px] bg-white/[0.03] border border-white/10 p-10 rounded-[2rem] flex flex-col gap-8"
              >
                <div className="text-[#f59e0b] text-5xl font-serif">&quot;</div>
                <p className="text-gray-300 text-lg leading-relaxed italic">
                  {testimonial.text}
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10">
                    <Image src={testimonial.image} alt={testimonial.author} width={48} height={48} />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-white font-bold">{testimonial.author}</p>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Gradient Overlays for smooth transition */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        </div>
      </section>
    </main>
  );
}
