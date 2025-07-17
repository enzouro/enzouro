'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function NavBar() {
  // State to track if we've scrolled down
  const [hasScrolled, setHasScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Handle scroll events to add shadow or other effects when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle scrolling to section on homepage load (for cross-page navigation)
  useEffect(() => {
    // Check if we're on the homepage and there's a hash in the URL
    if (pathname === '/' && typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        // Small delay to ensure the page has fully loaded
        const timeoutId = setTimeout(() => {
          scrollToSection(hash);
          // Clean up the hash from URL after scrolling
          window.history.replaceState(null, '', '/');
        }, 100);
        
        return () => clearTimeout(timeoutId);
      }
    }
  }, [pathname]);

  // Enhanced scroll function that works for both same-page and cross-page navigation
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80; // Adjust based on your navbar height
      const elementPosition = element.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // Navigation handler that works for both same-page and cross-page navigation
  const handleNavigation = (sectionId: string) => {
    if (pathname === '/') {
      // We're already on the homepage, just scroll
      scrollToSection(sectionId);
    } else {
      // We're on a different page, navigate to homepage with hash
      router.push(`/#${sectionId}`);
    }
  };

  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${hasScrolled ? 'bg-black/30 backdrop-blur-md' : 'bg-black/10 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-white text-lg sm:text-xl font-bold">
            <Link href="/">JL</Link>
          </div>
          
          {/* Navigation Links - adjust spacing based on screen size */}
          <div className="flex space-x-2 xs:space-x-3 sm:space-x-4 md:space-x-6 lg:space-x-8">
            <button 
              onClick={() => handleNavigation('projects')}
              className={`text-xs xs:text-sm sm:text-base text-white hover:text-gray-300 transition cursor-pointer`}
            >
              Projects
            </button>
            <button 
              onClick={() => handleNavigation('about')}
              className={`text-xs xs:text-sm sm:text-base text-white hover:text-gray-300 transition cursor-pointer`}
            >
              About
            </button>
            <button 
              onClick={() => handleNavigation('contact')}
              className={`text-xs xs:text-sm sm:text-base text-white hover:text-gray-300 transition cursor-pointer`}
            >
              Contact
            </button>
            <Link 
              href="/cv" 
              className={`text-xs xs:text-sm sm:text-base text-white hover:text-gray-300 transition`}
            >
              CV
            </Link>
          </div>
        </div>
      </div>
      
      {/* White divider line */}
      <div className="px-3 sm:px-4 md:px-6 max-w-7xl mx-auto">
        <div className="h-px w-full bg-white opacity-70"></div>
      </div>
    </div>
  );
}