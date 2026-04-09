"use client";

import { useRef, useEffect } from "react";
import { HeroContent } from "@/components/sub/hero-content";

export const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);
  return (
    <div className="relative flex flex-col h-full w-full">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="rotate-180 absolute top-[-50px] sm:top-[-150px] md:top-[-340px] left-0 w-full h-full object-cover -z-20 opacity-70"
      >
        <source src="/videos/hero_new.webm" type="video/webm" />
      </video>

      <HeroContent />
    </div>
  );
};
