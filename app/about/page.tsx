"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { TESTIMONIALS } from "@/constants";
import { TRANSLATIONS } from "@/constants/translations";
import { useLang } from "@/lib/lang-context";
import { SparklesIcon } from "@heroicons/react/24/solid";

const INTERESTS = [
  { title: "Games", image: "/SetupEldenring.jpeg", color: "#f59e0b" },
  { title: "Música", image: "/ShowGuns.jpeg", color: "#61dafb" },
  { title: "Comida", image: "/Carbonara.jpeg", color: "#3178c6" },
  { title: "Academia", image: "/EspelhoGuns.jpeg", color: "#38b2ac" },
  { title: "Gatos", image: "/Gatos.jpeg", color: "#f24e1e" },
  { title: "Thor", image: "/GatoThor.jpeg", color: "#f59e0b" },
  { title: "Fogueira", image: "/Fogueira.jpeg", color: "#f59e0b" },
  { title: "Selfie", image: "/SelfieCarro.jpeg", color: "#f59e0b" },
  { title: "Volley", image: "/Volley.jpeg", color: "#f59e0b" }
];

export default function AboutPage() {
  const { lang } = useLang();
  const carouselRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: carouselRef,
    offset: ["start end", "end start"],
  });

  const xTranslate = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const xTranslateReverse = useTransform(scrollYProgress, [0, 1], [-500, 0]);

  const ROW_1 = INTERESTS.slice(0, 5);
  const ROW_2 = INTERESTS.slice(5);

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
            <h1 className="Welcome-text text-[13px]">{TRANSLATIONS[lang].about.tag}</h1>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            {TRANSLATIONS[lang].about.title1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-[#fbbf24]">{TRANSLATIONS[lang].about.title2}</span>
          </h2>
          <p className="text-gray-400 text-lg leading-normal">
            {TRANSLATIONS[lang].about.description1}
            <br /><br />
            {TRANSLATIONS[lang].about.description2}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-80 h-80 md:w-[500px] md:h-[500px] lg:w-[550px] lg:h-[550px] rounded-full overflow-hidden shrink-0"
        >
          <div className="w-full h-full rounded-full overflow-hidden relative">
            <Image
              src="/FotoAcademia.jpeg"
              alt="Schaide Nunes"
              fill
              className="object-cover transition-all duration-500"
            />
          </div>
        </motion.div>
      </section>

      {/* Interests Carousel */}
      <section ref={carouselRef} className="flex flex-col gap-10 overflow-hidden">
        <h3 className="text-3xl md:text-5xl font-bold text-white">{TRANSLATIONS[lang].about.whatILove}</h3>
        <motion.div
          style={{ x: xTranslate }}
          className="flex gap-10 whitespace-nowrap"
        >
          {[...ROW_1, ...ROW_1, ...ROW_1].map((interest, index) => (
            <div
              key={`row1-${index}`}
              className="min-w-[300px] h-[400px] relative rounded-3xl overflow-hidden border border-white/10 group"
            >
              <Image
                src={interest.image}
                alt={interest.title}
                fill
                className="object-cover opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
              />
            </div>
          ))}
        </motion.div>
        
        <motion.div
          style={{ x: xTranslateReverse }}
          className="flex gap-10 whitespace-nowrap"
        >
          {[...ROW_2, ...ROW_2, ...ROW_2, ...ROW_2].map((interest, index) => (
            <div
              key={`row2-${index}`}
              className="min-w-[300px] h-[400px] relative rounded-3xl overflow-hidden border border-white/10 group"
            >
              <Image
                src={interest.image}
                alt={interest.title}
                fill
                className="object-cover opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
              />
            </div>
          ))}
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="flex flex-col lg:flex-row gap-20 py-20 border-t border-white/5">
        <div className="lg:w-1/3 flex flex-col gap-6">
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            {TRANSLATIONS[lang].about.trust} <br />
            <span className="text-[#f59e0b]">{TRANSLATIONS[lang].about.trust2}</span> {TRANSLATIONS[lang].about.trust3}
          </h2>
          <p className="text-gray-400 text-lg">
            {TRANSLATIONS[lang].about.trustDesc}
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
