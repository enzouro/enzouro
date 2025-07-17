'use client';

import About from "@/components/about/About";
import Contact from "@/components/contact/Contact";
import Background from "@/components/home/Background";
import HomePage from "@/components/home/HomePage";
import Project from "@/components/project/Projects"
import TechStack from "@/components/techstack/TechStack";

export default function Home() {
  
  return (
    <div className="relative flex flex-col items-center justify-center bg-[#02000D] text-white overflow-hidden">
      <div className="w-full relative">
        <div className="absolute inset-0 z-0 h-full max-h-[150vh] md:max-h-[100vh] w-full">
          <Background />
        </div>
        <div id="home" className="relative z-10">
          <HomePage />
        </div>
        <div id="projects" className="z-20 relative">
          <Project />
        </div>
        <div id="about" className="z-20 relative">
          <About />
          <TechStack/>
        </div>
        <div id="contact" className="z-20 relative">
          <Contact />
        </div>
      </div>
    </div>
  );
}