'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function UnderConstruction() {
  // State to control text animation
  const [visible, setVisible] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  interface Particle {
    id: number;
    width: number;
    height: number;
    top: number;
    left: number;
    animation: number;
    delay: number;
  }
  
  const [particles, setParticles] = useState<Particle[]>([]);
  
  // Array of construction-related symbols for the animation
  const constructionSymbols = ['⚙️', '🔧', '⚡', '💻', '🛠️', '📐'];
  const [currentSymbol, setCurrentSymbol] = useState(constructionSymbols[0]);
  
  // Alternative text phrases to cycle through
  const textPhrases = [
    "Building something extraordinary...",
    "Crafting digital experiences...",
    "Architecture in progress...",
    "Digital blueprint evolving..."
  ];

  // Effect for initial fade-in
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Effect for cycling through symbols
  useEffect(() => {
    const symbolInterval = setInterval(() => {
      setCurrentSymbol(prev => {
        const currentIndex = constructionSymbols.indexOf(prev);
        return constructionSymbols[(currentIndex + 1) % constructionSymbols.length];
      });
    }, 2000);
    
    return () => clearInterval(symbolInterval);
  }, []);
  
  // Effect for cycling through text phrases
  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentTextIndex(prev => (prev + 1) % textPhrases.length);
    }, 4000);
    
    return () => clearInterval(textInterval);
  }, []);

  // Generate background particles only on client-side
  useEffect(() => {
    // Generate particles only in the browser
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      width: Math.random() * 10 + 2,
      height: Math.random() * 10 + 2,
      top: Math.random() * 100,
      left: Math.random() * 100,
      animation: Math.random() * 20 + 10,
      delay: Math.random() * 5
    }));
    
    setParticles(newParticles);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <div className={`transition-all duration-1000 ease-in-out transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Animated construction icon */}
        <div className="text-6xl mb-6 animate-pulse text-center">
          <span className="transition-all duration-500">{currentSymbol}</span>
        </div>
        
        {/* Main message */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          <span className="line-through decoration-1 opacity-75">Portfolio</span> 
          <span className="relative">
            <span className="ml-3 inline-block overflow-hidden whitespace-nowrap border-r-2 border-white animate-cursor">
              {textPhrases[currentTextIndex]}
            </span>
          </span>
        </h1>
        
        {/* Descriptive text with staggered fade in */}
        <p className={`text-xl md:text-2xl mb-8 text-center max-w-2xl mx-auto opacity-90 transition-all duration-1000 delay-300 ${visible ? 'opacity-90' : 'opacity-0'}`}>
          This digital space is currently undergoing a creative metamorphosis.
          While I shape the visual narrative, my professional story awaits.
        </p>

        {/* CV link with hover effect */}
        <div className={`transition-all duration-1000 delay-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <Link 
            href="/cv" 
            className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white border border-white rounded-md shadow-inner hover:scale-105 transition-all duration-300"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
            <span className="relative flex items-center">
              Explore My CV
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </span>
          </Link>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-16 opacity-20">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i} 
              className="w-px h-16 bg-white animate-pulse"
              style={{ animationDelay: `${i * 0.3}s` }}
            ></div>
          ))}
        </div>
      </div>
      
      {/* Background animation elements - Client-side only rendering */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {particles.map((particle) => (
          <div 
            key={particle.id}
            className="absolute bg-white opacity-5 rounded-full"
            style={{
              width: `${particle.width}px`,
              height: `${particle.height}px`,
              top: `${particle.top}%`,
              left: `${particle.left}%`,
              animation: `float ${particle.animation}s linear infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          ></div>
        ))}
      </div>
      
      {/* Custom animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-100px) translateX(20px);
          }
          100% {
            transform: translateY(-200px) translateX(0);
            opacity: 0;
          }
        }
        
        @keyframes cursor {
          0%, 100% { border-color: transparent }
          50% { border-color: white }
        }
        
        .animate-cursor {
          animation: cursor 1s step-end infinite;
        }
      `}</style>
    </div>
  );
}