'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NavBar() {
  
  // State to track if we've scrolled down
  const [hasScrolled, setHasScrolled] = useState(false);

  // Handle scroll events to add shadow or other effects when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${hasScrolled ? 'bg-black bg-opacity-80 backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-white text-xl font-bold">
            <Link href="/">JL</Link>
          </div>
          
          {/* Navigation Links */}
          <div className="flex space-x-8">
            <Link 
              href="/" 
              className={`text-white hover:text-gray-300 transition line-through decoration-1`}
            >
              Projects
            </Link>
            <Link 
              href="/" 
              className={`text-white hover:text-gray-300 transition line-through decoration-1`}
            >
              About
            </Link>
            <Link 
              href="/" 
              className={`text-white hover:text-gray-300 transition line-through decoration-1`}
            >
              Contact
            </Link>
            <Link 
              href="/cv" 
              className={`text-white hover:text-gray-300 transition`}
            >
              CV
            </Link>
          </div>
        </div>
      </div>
      {/* White divider line */}
      <div className="px-6 max-w-7xl mx-auto">
        <div className="h-px w-full bg-white opacity-70"></div>
      </div>
    </div>
  );
}