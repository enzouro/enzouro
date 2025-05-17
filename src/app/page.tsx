'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function UnderConstruction() {
  // State to control text animation
  const [visible, setVisible] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
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

  // Construction tape patterns
  const tapeStyles = [
    {
      background: 'repeating-linear-gradient(-45deg, #000000, #000000 20px, #ffff00 20px, #ffff00 40px)'
    },
    {
      background: 'repeating-linear-gradient(45deg, #000000, #000000 15px, #ffff00 15px, #ffff00 30px)'
    },
    {
      background: 'repeating-linear-gradient(-60deg, #000000, #000000 18px, #ffff00 18px, #ffff00 36px)'
    },
    {
      background: 'repeating-linear-gradient(30deg, #000000, #000000 12px, #ffff00 12px, #ffff00 24px)'
    },
    {
      background: 'repeating-linear-gradient(-30deg, #000000, #000000 25px, #ffff00 25px, #ffff00 50px)'
    },
    {
      background: 'repeating-linear-gradient(60deg, #000000, #000000 14px, #ffff00 14px, #ffff00 28px)'
    }
  ];

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Construction tapes background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Tape 1 - Top diagonal */}
        <div 
          className="absolute top-[10%] left-[-20%] w-[140%] h-8 sm:h-10 opacity-5 transform rotate-[-15deg] animate-stripe-right"
          style={tapeStyles[0]}
        />
        
        {/* Tape 2 - Upper mid diagonal */}
        <div 
          className="absolute top-[25%] left-[-20%] w-[140%] h-6 sm:h-8 opacity-4 transform rotate-[12deg] animate-stripe-left-med"
          style={tapeStyles[1]}
        />
        
        {/* Tape 3 - Center diagonal */}
        <div 
          className="absolute top-[45%] left-[-20%] w-[140%] h-9 sm:h-11 opacity-6 transform rotate-[-8deg] animate-stripe-right-slow"
          style={tapeStyles[2]}
        />
        
        {/* Tape 4 - Lower mid diagonal */}
        <div 
          className="absolute top-[65%] left-[-20%] w-[140%] h-7 sm:h-9 opacity-3 transform rotate-[20deg] animate-stripe-left"
          style={tapeStyles[3]}
        />
        
        {/* Tape 5 - Lower diagonal */}
        <div 
          className="absolute top-[80%] left-[-20%] w-[140%] h-5 sm:h-7 opacity-5 transform rotate-[-25deg] animate-stripe-right-fast"
          style={tapeStyles[4]}
        />
        
        {/* Tape 6 - Bottom diagonal */}
        <div 
          className="absolute top-[90%] left-[-20%] w-[140%] h-8 sm:h-10 opacity-4 transform rotate-[5deg] animate-stripe-left-fast"
          style={tapeStyles[5]}
        />
        
        {/* Additional variation tapes for more density */}
        <div 
          className="absolute top-[35%] left-[-20%] w-[140%] h-6 sm:h-8 opacity-3 transform rotate-[35deg] animate-stripe-left-slow"
          style={tapeStyles[0]}
        />
        
        {/* Tape 7 - Additional diagonal */}
        <div 
          className="absolute top-[55%] left-[-20%] w-[140%] h-5 sm:h-7 opacity-2 transform rotate-[-30deg] animate-stripe-right-med"
          style={tapeStyles[1]}
        />
      </div>

      <div className={`transition-all duration-1000 ease-in-out transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} w-full max-w-4xl mx-auto relative z-10`}>
        {/* Animated construction icon */}
        <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 animate-pulse text-center">
          <span className="transition-all duration-500">{currentSymbol}</span>
        </div>
        
        {/* Main message */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-center px-2">
          <span className="line-through decoration-1 opacity-75">Portfolio</span> 
          <span className="relative block sm:inline">
            <span className="mt-2 sm:mt-0 sm:ml-3 inline-block overflow-hidden whitespace-nowrap border-r-2 border-white animate-cursor text-lg sm:text-xl md:text-2xl lg:text-3xl">
              {textPhrases[currentTextIndex]}
            </span>
          </span>
        </h1>
        
        {/* Descriptive text with staggered fade in */}
        <p className={`text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-center max-w-2xl mx-auto opacity-90 transition-all duration-1000 delay-300 px-2 leading-relaxed ${visible ? 'opacity-90' : 'opacity-0'}`}>
          This digital space is currently undergoing a creative metamorphosis.
          While I shape the visual narrative, my professional story awaits.
        </p>

        {/* CV link with hover effect */}
        <div className={`transition-all duration-1000 delay-500 text-center ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <Link 
            href="/cv" 
            className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 overflow-hidden font-medium text-white border border-white rounded-md shadow-inner hover:scale-105 transition-all duration-300 text-sm sm:text-base"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-sky-500/75 to-red-500/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
            <span className="relative flex items-center">
              Explore My CV
              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </span>
          </Link>
        </div>
        
      </div>
      
      {/* Custom animation keyframes */}
      <style jsx>{`
        @keyframes cursor {
          0%, 100% { border-color: transparent }
          50% { border-color: white }
        }
        
        /* Stripe animations - seamless loops matching pattern repetition */
        @keyframes stripe-right {
          0% { background-position: 0 0; }
          100% { background-position: 40px 0; }
        }
        
        @keyframes stripe-left {
          0% { background-position: 0 0; }
          100% { background-position: -40px 0; }
        }
        
        @keyframes stripe-right-slow {
          0% { background-position: 0 0; }
          100% { background-position: 36px 0; }
        }
        
        @keyframes stripe-left-slow {
          0% { background-position: 0 0; }
          100% { background-position: -36px 0; }
        }
        
        @keyframes stripe-right-fast {
          0% { background-position: 0 0; }
          100% { background-position: 30px 0; }
        }
        
        @keyframes stripe-left-fast {
          0% { background-position: 0 0; }
          100% { background-position: -30px 0; }
        }
        
        @keyframes stripe-right-med {
          0% { background-position: 0 0; }
          100% { background-position: 48px 0; }
        }
        
        @keyframes stripe-left-med {
          0% { background-position: 0 0; }
          100% { background-position: -48px 0; }
        }
        
        .animate-cursor {
          animation: cursor 1s step-end infinite;
        }
        
        .animate-stripe-right {
          animation: stripe-right 3s linear infinite;
        }
        
        .animate-stripe-left {
          animation: stripe-left 3.5s linear infinite;
        }
        
        .animate-stripe-right-slow {
          animation: stripe-right-slow 5s linear infinite;
        }
        
        .animate-stripe-left-slow {
          animation: stripe-left-slow 4.5s linear infinite;
        }
        
        .animate-stripe-right-fast {
          animation: stripe-right-fast 2s linear infinite;
        }
        
        .animate-stripe-left-fast {
          animation: stripe-left-fast 2.2s linear infinite;
        }
        
        .animate-stripe-right-med {
          animation: stripe-right-med 3.8s linear infinite;
        }
        
        .animate-stripe-left-med {
          animation: stripe-left-med 4.2s linear infinite;
        }
      `}</style>
    </div>
  );
}