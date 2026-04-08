import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { PropsWithChildren } from "react";

import { Footer } from "@/components/main/footer";
import { Navbar } from "@/components/main/navbar";
import { StarsCanvas } from "@/components/main/star-background";
import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";

import { Preloader } from "@/components/main/preloader";
import { SmoothScroll } from "@/components/main/smooth-scroll";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#000000",
};

export const metadata: Metadata = siteConfig;

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="video" href="/videos/hero_new.mp4" type="video/mp4" />
      </head>
      <body
        className={cn(
          "bg-[#000000] overflow-y-scroll overflow-x-hidden",
          inter.className
        )}
      >
        <SmoothScroll>
          <Preloader />
          <StarsCanvas />
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
