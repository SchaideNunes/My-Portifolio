"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { slideInFromTop } from "@/lib/motion";
import { ShieldCheckIcon, KeyIcon, CircleStackIcon } from "@heroicons/react/24/outline";

export const Encryption = () => {
  return (
    <div className="relative w-full overflow-hidden">

      <div className="absolute inset-0 bg-black/60 pointer-events-none -z-10" />

      {/* ====== MOBILE LAYOUT (< md) ====== */}
      <div className="flex md:hidden flex-col items-center justify-center gap-8 py-16 px-6 text-center">
        
        {/* Title */}
        <motion.h2
          variants={slideInFromTop}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-[26px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-[#fbbf24]"
        >
          Performance &amp; security.
        </motion.h2>

        {/* Lock */}
        <div className="flex flex-col items-center group cursor-pointer">
          <Image src="/lock-top.png" alt="Lock top" width={40} height={40}
            className="translate-y-4 transition-all duration-200 group-hover:translate-y-9"
          />
          <Image src="/lock-main.png" alt="Lock main" width={60} height={60} className="z-10" />
        </div>

        <div className="Welcome-box px-[15px] py-[4px] border border-[#f59e0b8b] opacity-[0.9]">
          <h1 className="Welcome-text text-[12px]">Encryption</h1>
        </div>

        {/* Cards — stacked vertically on mobile */}
        <div className="flex flex-col gap-4 w-full max-w-[320px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }} viewport={{ once: true }}
            className="flex flex-row items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md"
          >
            <ShieldCheckIcon className="w-8 h-8 text-amber-500 shrink-0" />
            <div className="text-left">
              <h3 className="text-white font-medium text-sm">SSL/TLS Security</h3>
              <p className="text-gray-400 text-xs mt-0.5">End-to-end encryption across all transactions.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }} viewport={{ once: true }}
            className="flex flex-row items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md"
          >
            <KeyIcon className="w-8 h-8 text-amber-500 shrink-0" />
            <div className="text-left">
              <h3 className="text-white font-medium text-sm">JWT Authentication</h3>
              <p className="text-gray-400 text-xs mt-0.5">Zero-Trust architecture and robust session management.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }} viewport={{ once: true }}
            className="flex flex-row items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md"
          >
            <CircleStackIcon className="w-8 h-8 text-amber-500 shrink-0" />
            <div className="text-left">
              <h3 className="text-white font-medium text-sm">Data Protection</h3>
              <p className="text-gray-400 text-xs mt-0.5">Database with mitigated SQL injection and secure backups.</p>
            </div>
          </motion.div>
        </div>

        {/* Subtitle */}
        <p className="text-[14px] text-gray-400 tracking-[-2%]">
          Secure your data with end-to-end encryption
        </p>
      </div>

      {/* ====== DESKTOP LAYOUT (>= md) ====== */}
      <div className="hidden md:flex flex-row relative items-center justify-center min-h-screen w-full h-full">
        
        {/* Title */}
        <div className="absolute w-auto h-auto top-0 z-[5]">
          <motion.div
            variants={slideInFromTop}
            className="text-[40px] font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] tracking-[-2%]"
          >
            Performance &amp; security.
          </motion.div>
        </div>

        {/* Lock + badge */}
        <div className="flex flex-col items-center justify-center translate-y-[-50px] absolute z-[20] w-auto h-auto">
          <div className="flex flex-col items-center group cursor-pointer">
            <Image src="/lock-top.png" alt="Lock top" width={50} height={50}
              className="w-[50px] translate-y-5 transition-all duration-200 group-hover:translate-y-11"
            />
            <Image src="/lock-main.png" alt="Lock main" width={70} height={70} className="z-10" />
          </div>
          <div className="Welcome-box px-[15px] py-[4px] z-[20] border my-[20px] border-[#f59e0b8b] opacity-[0.9]">
            <h1 className="Welcome-text text-[12px]">Encryption</h1>
          </div>
        </div>

        {/* Subtitle */}
        <div className="absolute z-[20] bottom-[10px] px-[5px]">
          <div className="text-[20px] font-medium text-center text-gray-400 tracking-[-2%]">
            Secure your data with end-to-end encryption
          </div>
        </div>

        {/* Cards positioned absolute on desktop */}
        <div className="absolute w-full h-full inset-0 z-[20] flex items-center justify-center pointer-events-none max-w-[1200px] mx-auto">
          <motion.div
            initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }} viewport={{ once: true }}
            className="absolute left-[15%] top-[35%] flex flex-col items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.1)] pointer-events-auto hover:border-amber-500/50 transition-colors"
          >
            <ShieldCheckIcon className="w-8 h-8 text-amber-500" />
            <div className="text-center">
              <h3 className="text-white font-medium text-sm">SSL/TLS Security</h3>
              <p className="text-gray-400 text-xs mt-1 w-40">End-to-end encryption across all transactions.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }} viewport={{ once: true }}
            className="absolute right-[15%] top-[35%] flex flex-col items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.1)] pointer-events-auto hover:border-amber-500/50 transition-colors"
          >
            <KeyIcon className="w-8 h-8 text-amber-500" />
            <div className="text-center">
              <h3 className="text-white font-medium text-sm">JWT Authentication</h3>
              <p className="text-gray-400 text-xs mt-1 w-40">Zero-Trust architecture and robust session management.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }} viewport={{ once: true }}
            className="absolute bottom-[20%] flex flex-col items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.1)] pointer-events-auto hover:border-amber-500/50 transition-colors"
          >
            <CircleStackIcon className="w-8 h-8 text-amber-500" />
            <div className="text-center">
              <h3 className="text-white font-medium text-sm">Data Protection</h3>
              <p className="text-gray-400 text-xs mt-1 w-48">Database with mitigated SQL injection and secure backups.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
