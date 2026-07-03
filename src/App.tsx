import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Footer } from "@/components/main/footer";
import { Navbar } from "@/components/main/navbar";
import { Preloader } from "@/components/main/preloader";
import { SmoothScroll } from "@/components/main/smooth-scroll";
import { StarsCanvas } from "@/components/main/star-background";
import { LangProvider } from "@/lib/lang-context";

import AboutPage from "@/pages/about";
import Home from "@/pages/home";
import WorkPage from "@/pages/work";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <LangProvider>
        <SmoothScroll>
          <Preloader />
          <StarsCanvas />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/work" element={<WorkPage />} />
          </Routes>
          <Footer />
        </SmoothScroll>
      </LangProvider>
    </BrowserRouter>
  );
};

export default App;
