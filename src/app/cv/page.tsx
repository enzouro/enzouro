'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import Contact from '@/components/contact/Contact';

// Dynamically import the PDF viewer component with SSR disabled
const PDFViewer = dynamic(
  () => import('../../components/cv/CV'),
  { ssr: false }
);

export default function CVPage() {
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Refs for GSAP animations
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  
  // CV file path
  const cvFile = '/John Lorenz Mayo - CV.pdf';

  // Handle window resize to make the component responsive
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    // Set initial value
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // GSAP entry animations
  useEffect(() => {
    if (!isLoaded) return;

    const tl = gsap.timeline();

    // Set initial states
    gsap.set([titleRef.current, buttonRef.current, pdfContainerRef.current], {
      opacity: 0,
      y: 30,
    });

    // Animate container background
    gsap.set(containerRef.current, {
      opacity: 0,
    });

    // Animation sequence
    tl
      .to(containerRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      })
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.3")
      .to(buttonRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      }, "-=0.5")
      .to(pdfContainerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.4");

    // Subtle floating animation for the title
    gsap.to(titleRef.current, {
      y: -5,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1,
    });

    return () => {
      tl.kill();
    };
  }, [isLoaded]);

  // Set loaded state after component mounts
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Function to handle CV download with animation
  function downloadCV() {
    // Add a subtle scale animation on click
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
    });

    const link = document.createElement('a');
    link.href = cvFile;
    link.download = 'CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-black text-white pt-24 relative overflow-hidden"
    >
      {/* Subtle background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main glow */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Secondary glow */}
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-purple-500/8 rounded-full blur-2xl animate-pulse delay-1000"></div>
        
        {/* Tertiary glow */}
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-cyan-500/6 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 
            ref={titleRef}
            className="text-3xl md:text-4xl font-bold mb-4 md:mb-0 relative"
          >
            <span className="relative z-10">Curriculum Vitae</span>
            {/* Title glow effect */}
            <div className="absolute inset-0 text-3xl md:text-4xl font-bold text-white/20 blur-sm">
              Curriculum Vitae
            </div>
          </h1>
          
          {/* Download button with glow effects */}
          <button 
            ref={buttonRef}
            onClick={downloadCV} 
            className="group relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-white bg-transparent border border-white/50 rounded-md shadow-inner hover:bg-white hover:text-black transition-all duration-300 hover:shadow-lg hover:shadow-white/20"
          >
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-white/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            
            <span className="mr-2 relative z-10">Download CV</span>
            <svg 
              className="w-5 h-5 transform group-hover:translate-y-1 transition-transform duration-300 relative z-10" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </button>
        </div>

        {/* PDF viewer container with glow */}
        <div 
          ref={pdfContainerRef}
          className="relative"
        >
          {/* PDF container glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-lg blur-xl opacity-50"></div>
          
          <div className="relative z-10 bg-black/20 backdrop-blur-sm rounded-lg p-1 border border-white/10">
            {/* Render PDF viewer component */}
            <PDFViewer 
              file={cvFile} 
              windowWidth={windowWidth} 
            />
          </div>
        </div>
      </div>
      <div>
        <Contact />
      </div>
    </div>
  );
}