'use client';
import { useState } from "react";
import { Image } from "@/components/ui/image";
import { Link } from "@/components/ui/link";
import { motion, AnimatePresence } from "framer-motion";

import { SOCIALS } from "@/constants";
import { TRANSLATIONS } from "@/constants/translations";
import { useLang } from "@/lib/lang-context";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, setLang } = useLang();

  const navLinks = [
    { title: TRANSLATIONS[lang].nav.about, link: "/about" },
    { title: TRANSLATIONS[lang].nav.work, link: "/work" },
    { title: TRANSLATIONS[lang].nav.skills, link: "/#skills" },
  ];

  return (
    <>
      <div className="w-full h-[65px] fixed top-0 shadow shadow-[#f59e0b]/5 bg-[#03001417] backdrop-blur-xl z-50 px-[10%] md:px-10 transition-all duration-300">
        {/* Navbar Container */}
        <div className="w-full h-full flex items-center justify-between m-auto">
          {/* Logo + Name */}
          <Link href="/" className="flex items-center">
            <Image
              src="/Logo.png"
              alt="Logo"
              width={50}
              height={50}
              draggable={false}
              className="cursor-pointer hover:animate-slowspin mix-blend-lighten"
            />
            <span className="font-bold ml-[10px] hidden md:block text-gray-300">
              Schaide Nunes
            </span>
          </Link>

          {/* Web Navbar Pill */}
          <div className="hidden md:flex w-[500px] h-full flex-row items-center justify-between">
            <div className="flex items-center justify-between w-full h-auto border border-[#f59e0b]/20 bg-[#0300145e] backdrop-blur-md mr-[15px] px-[20px] py-[10px] rounded-full text-gray-200">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.link}
                  className="cursor-pointer hover:text-[#f59e0b] transition whitespace-nowrap"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Section: Social Icons + Language Toggle (Web) */}
          <div className="hidden md:flex flex-row items-center gap-5">
            {SOCIALS.map(({ link, name, icon: Icon }) => (
              <Link
                href={link}
                target="_blank"
                rel="noreferrer noopener"
                key={name}
              >
                <Icon className="h-6 w-6 text-white hover:text-[#f59e0b] transition-colors" />
              </Link>
            ))}
            <div className="w-[1px] h-6 bg-white/20 ml-2 mr-1" />
            <div className="flex items-center gap-2 text-sm font-medium">
              <button 
                onClick={() => setLang('PT')} 
                className={`transition-colors ${lang === 'PT' ? 'text-[#f59e0b]' : 'text-gray-400 hover:text-white'}`}
              >
                PT
              </button>
              <span className="text-gray-600">/</span>
              <button 
                onClick={() => setLang('EN')} 
                className={`transition-colors ${lang === 'EN' ? 'text-[#f59e0b]' : 'text-gray-400 hover:text-white'}`}
              >
                EN
              </button>
            </div>
          </div>

          {/* 2x2 grid dots → X menu button */}
          <button
            className="md:hidden focus:outline-none z-[60] relative flex items-center justify-center w-9 h-9 transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="grid grid-cols-2 gap-[5px]">
              {/* Top-left */}
              <motion.span
                animate={isMobileMenuOpen
                  ? { rotate: 45, x: 4.5, y: 4.5, backgroundColor: "#f59e0b" }
                  : { rotate: 0, x: 0, y: 0, backgroundColor: "#ffffff" }
                }
                transition={{ duration: 0.25 }}
                className="block w-[6px] h-[6px] rounded-sm"
              />
              {/* Top-right */}
              <motion.span
                animate={isMobileMenuOpen
                  ? { rotate: -45, x: -4.5, y: 4.5, backgroundColor: "#f59e0b" }
                  : { rotate: 0, x: 0, y: 0, backgroundColor: "#ffffff" }
                }
                transition={{ duration: 0.25 }}
                className="block w-[6px] h-[6px] rounded-sm"
              />
              {/* Bottom-left */}
              <motion.span
                animate={isMobileMenuOpen
                  ? { rotate: -45, x: 4.5, y: -4.5, backgroundColor: "#f59e0b" }
                  : { rotate: 0, x: 0, y: 0, backgroundColor: "#ffffff" }
                }
                transition={{ duration: 0.25 }}
                className="block w-[6px] h-[6px] rounded-sm"
              />
              {/* Bottom-right */}
              <motion.span
                animate={isMobileMenuOpen
                  ? { rotate: 45, x: -4.5, y: -4.5, backgroundColor: "#f59e0b" }
                  : { rotate: 0, x: 0, y: 0, backgroundColor: "#ffffff" }
                }
                transition={{ duration: 0.25 }}
                className="block w-[6px] h-[6px] rounded-sm"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Backdrop overlay (click outside to close) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] bg-black/40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Right Sidebar Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="sidebar"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-[40%] max-w-[160px] z-[58] md:hidden
                       bg-[#03001480] backdrop-blur-2xl border-l border-[#f59e0b]/10
                       flex flex-col justify-center items-center gap-8 shadow-2xl"
          >
            {/* Close hint */}
            <div className="absolute top-6 right-6">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-500 hover:text-white transition"
              >
                ✕
              </button>
            </div>



            {/* Nav Links */}
            <nav className="flex flex-col items-center gap-7">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  <Link
                    href={link.link}
                    className="text-gray-200 text-xl font-medium hover:text-[#f59e0b] transition"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.title}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Divider */}
            <div className="w-16 h-px bg-[#f59e0b]/20" />

            {/* Social Icons */}
            <div className="flex flex-col items-center gap-5">
              {SOCIALS.map(({ link, name, icon: Icon }, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                >
                  <Link href={link} target="_blank" rel="noreferrer noopener">
                    <Icon className="h-7 w-7 text-gray-400 hover:text-[#f59e0b] transition" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Language Toggle Mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3 text-lg font-medium mt-2"
            >
              <button 
                onClick={() => { setLang('PT'); setIsMobileMenuOpen(false); }} 
                className={`transition-colors ${lang === 'PT' ? 'text-[#f59e0b]' : 'text-gray-400 hover:text-white'}`}
              >
                PT
              </button>
              <span className="text-gray-600">/</span>
              <button 
                onClick={() => { setLang('EN'); setIsMobileMenuOpen(false); }} 
                className={`transition-colors ${lang === 'EN' ? 'text-[#f59e0b]' : 'text-gray-400 hover:text-white'}`}
              >
                EN
              </button>
            </motion.div>

            {/* Bottom amber glow accent */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f59e0b]/5 to-transparent pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};