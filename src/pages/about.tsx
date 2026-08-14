"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Image } from "@/components/ui/image";
import { useRef } from "react";
import { TESTIMONIALS } from "@/constants";
import { TRANSLATIONS } from "@/constants/translations";
import { useLang } from "@/lib/lang-context";
import { SparklesIcon } from "@heroicons/react/24/solid";

const INTERESTS = [
  { title: "Games", image: "/images/about/SetupEldenring.webp", color: "#f59e0b" },
  { title: "Música", image: "/images/about/ShowGuns.webp", color: "#61dafb" },
  { title: "Comida", image: "/images/about/Carbonara.webp", color: "#3178c6" },
  { title: "Academia", image: "/images/about/EspelhoGuns.webp", color: "#38b2ac" },
  { title: "Gatos", image: "/images/about/Gatos.webp", color: "#f24e1e" },
  { title: "Thor", image: "/images/about/GatoThor.webp", color: "#f59e0b" },
  { title: "Fogueira", image: "/images/about/Fogueira.webp", color: "#f59e0b" },
  { title: "Selfie", image: "/images/about/SelfieCarro.webp", color: "#f59e0b" },
  { title: "Volley", image: "/images/about/Volley.webp", color: "#f59e0b" }
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
    <main className="h-full w-full pt-20 px-[10%] md:px-20 flex flex-col gap-32 mb-20">
      {/* About Me Hero Section */}
      <section className="flex flex-col gap-12 md:gap-16 lg:gap-24 w-full">
        {/* Intro text row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl"
        >
          <h2 className="text-2xl md:text-4xl lg:text-[40px] text-gray-300 font-medium leading-snug md:leading-snug lg:leading-[1.2] tracking-tight">
            {TRANSLATIONS[lang].about.introText.split(TRANSLATIONS[lang].about.introTextHighlight).map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className="text-[#f59e0b]">
                    {TRANSLATIONS[lang].about.introTextHighlight}
                  </span>
                )}
              </span>
            ))}
          </h2>
        </motion.div>

        {/* 2 Column layout: Photo Left, Text Right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="col-span-1 lg:col-span-2 w-full max-w-sm mx-auto lg:max-w-none aspect-square relative rounded-xl overflow-hidden shadow-2xl border border-white/5"
          >
            <Image
              src="/images/about/Selfie.webp"
              alt="Schaide Nunes"
              fill
              className="object-cover object-top"
            />
          </motion.div>

          {/* Journey Text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="col-span-1 lg:col-span-3 flex flex-col gap-6 lg:mt-2"
          >
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white lowercase tracking-tight">
              {TRANSLATIONS[lang].about.heading}
            </h3>
            
            <div className="flex flex-col gap-5 text-gray-400 text-base md:text-lg leading-relaxed text-justify md:text-left">
              <p>{TRANSLATIONS[lang].about.description1}</p>
              <p>{TRANSLATIONS[lang].about.description2}</p>
              <p>{TRANSLATIONS[lang].about.description3}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interests Carousel */}
      <section ref={carouselRef} className="flex flex-col gap-6 md:gap-10 overflow-hidden">
        <h3 className="text-3xl md:text-5xl font-bold text-white">{TRANSLATIONS[lang].about.whatILove}</h3>
        <motion.div
          style={{ x: xTranslate }}
          className="flex gap-4 sm:gap-6 md:gap-10 whitespace-nowrap w-max"
        >
          {[...ROW_1, ...ROW_1, ...ROW_1].map((interest, index) => (
            <div
              key={`row1-${index}`}
              className="w-[180px] sm:w-[220px] md:w-[300px] h-[220px] sm:h-[280px] md:h-[400px] relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 group shrink-0"
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
          className="flex gap-4 sm:gap-6 md:gap-10 whitespace-nowrap w-max"
        >
          {[...ROW_2, ...ROW_2, ...ROW_2, ...ROW_2].map((interest, index) => (
            <div
              key={`row2-${index}`}
              className="w-[180px] sm:w-[220px] md:w-[300px] h-[220px] sm:h-[280px] md:h-[400px] relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 group shrink-0"
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
            className="flex gap-6 md:gap-8 w-max"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 35,
                ease: "linear",
              },
            }}
          >
            {[...TESTIMONIALS[lang], ...TESTIMONIALS[lang], ...TESTIMONIALS[lang], ...TESTIMONIALS[lang]].map((testimonial, index) => (
              <div
                key={index}
                className="w-[280px] sm:w-[340px] md:w-[450px] bg-white/[0.03] border border-white/10 p-6 md:p-10 rounded-2xl md:rounded-[2rem] flex flex-col gap-4 md:gap-8 shrink-0"
              >
                <div className="text-[#f59e0b] text-3xl md:text-5xl font-serif leading-none">&quot;</div>
                <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed italic">
                  {testimonial.text}
                </p>
                <div className="flex items-center gap-3 md:gap-4 mt-auto pt-2">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-white/10 shrink-0">
                    <Image src={testimonial.image} alt={testimonial.author} width={48} height={48} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-white font-bold text-sm md:text-base">{testimonial.author}</p>
                    <p className="text-gray-500 text-xs md:text-sm">{testimonial.role}</p>
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
