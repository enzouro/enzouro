'use client'
import React, { useEffect, useRef, useState } from 'react';

const Project = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lastScrollY = useRef(0);
  const visibleCards = useRef<Set<number>>(new Set());
  const animationTimeouts = useRef<Map<number, NodeJS.Timeout>>(new Map());
  const headerVisible = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [pressedCard, setPressedCard] = useState<number | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Mock project data with tech stacks
  const projects = [
    {
      id: 1,
      title: "KIST Park Website",
      description: "May.2025/Dev & Maintenance",
      image: "/images/kist-park-logo.png",
      hoverGif: "/images/kist-park-web.png",
      detailsUrl: "/projects/FirstKISTPark",
      techStack: [
        { name: "Html5", icon: "/images/icons/html-5.svg" },
        { name: "CSS3", icon: "/images/icons/css-3.svg" },
        { name: "JavaScript", icon: "/images/icons/javascript.svg" },
        { name: "Google Search Console", icon: "/images/icons/google-search-console.svg" },
        { name: "Google Analytics", icon: "/images/icons/google-analytics.svg" },
      ]
    },
    {
      id: 2,
      title: "KIST Park Admin Dashboard",
      description: "May.2025/Dev & Design",
      image: "/images/kist-admin-login.png",
      hoverGif: "/images/kist-admin-web.png",
      detailsUrl: "/projects/KISTParkAdmin",
      techStack: [
        { name: "MongoDb", icon: "/images/icons/mongodb-icon.svg" },
        { name: "Express.Js", icon: "/images/icons/express.svg" },
        { name: "React", icon: "/images/icons/react.svg" },
        { name: "Node.Js", icon: "/images/icons/nodejs-icon.svg" }
      ]
    },
    {
      id: 3,
      title: "Part Procurement System",
      description: "Dec.2025/Capstone/Dev, Design & Documentation",
      image: "/images/capstone-login.png",
      hoverGif: "/images/capstone-web.png",
      detailsUrl: "/projects/Capstone",
      techStack: [
        { name: "MongoDb", icon: "/images/icons/mongodb-icon.svg" },
        { name: "Express.Js", icon: "/images/icons/express.svg" },
        { name: "React", icon: "/images/icons/react.svg" },
        { name: "Node.Js", icon: "/images/icons/nodejs-icon.svg" },
        { name: "TensorFlow", icon: "/images/icons/tensorflow.svg" }
      ]
    },
    {
      id: 4,
      title: "WakeNav",
      description: "July.2025/Dev, Design & Documentation",
      image: "/images/flutter-splash.png",
      hoverGif: "/images/flutter-app.png",
      detailsUrl: "/projects/WakeNav",
      techStack: [
        { name: "Flutter", icon: "/images/icons/flutter.svg" },
        { name: "Dart", icon: "/images/icons/dart.svg" },
        { name: "Leaflet", icon: "/images/icons/leaflet.svg" },
      ]
    },
  ];

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const clearTimeouts = () => {
    animationTimeouts.current.forEach(timeout => clearTimeout(timeout));
    animationTimeouts.current.clear();
  };

  const animateCard = (index: number, isVisible: boolean, delay: number = 0) => {
    const card = cardsRef.current[index];
    if (!card) return;

    // Clear existing timeout for this card
    const existingTimeout = animationTimeouts.current.get(index);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }

    const timeoutId = setTimeout(() => {
      if (isVisible) {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.opacity = '1';
      } else {
        card.style.transform = 'translateY(50px) scale(0.9)';
        card.style.opacity = '0';
      }
      animationTimeouts.current.delete(index);
    }, delay);

    animationTimeouts.current.set(index, timeoutId);
  };

  const animateHeader = (isVisible: boolean) => {
    const header = headerRef.current;
    if (!header) return;

    if (isVisible && !headerVisible.current) {
      header.style.transform = 'translateY(0)';
      header.style.opacity = '1';
      headerVisible.current = true;
    } else if (!isVisible && headerVisible.current) {
      header.style.transform = 'translateY(30px)';
      header.style.opacity = '0';
      headerVisible.current = false;
    }
  };

  // Check if element is in viewport
  const isElementInViewport = (element: HTMLElement, threshold: number = 0.15) => {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const thresholdPx = windowHeight * threshold;
    
    return rect.top < windowHeight - thresholdPx && rect.bottom > thresholdPx;
  };

  // Initial visibility check and animation setup
  const initializeAnimations = () => {
    // Set up initial styles for header
    const header = headerRef.current;
    if (header) {
      header.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      
      // Check if header is initially visible
      if (isElementInViewport(header, 0.2)) {
        header.style.transform = 'translateY(0)';
        header.style.opacity = '1';
        headerVisible.current = true;
      } else {
        header.style.transform = 'translateY(30px)';
        header.style.opacity = '0';
        headerVisible.current = false;
      }
    }

    // Set up initial styles for cards
    const cards = cardsRef.current;
    const initialVisibleCards = new Set<number>();
    
    cards.forEach((card, index) => {
      if (card) {
        card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        // Check if card is initially visible
        if (isElementInViewport(card)) {
          card.style.transform = 'translateY(0) scale(1)';
          card.style.opacity = '1';
          initialVisibleCards.add(index);
        } else {
          card.style.transform = 'translateY(50px) scale(0.9)';
          card.style.opacity = '0';
        }
      }
    });

    // If cards are initially visible, animate them in with stagger
    if (initialVisibleCards.size > 0) {
      const sortedVisible = Array.from(initialVisibleCards).sort((a, b) => {
        const cardA = cardsRef.current[a];
        const cardB = cardsRef.current[b];
        if (!cardA || !cardB) return 0;
        
        const rectA = cardA.getBoundingClientRect();
        const rectB = cardB.getBoundingClientRect();
        return rectA.top - rectB.top;
      });

      sortedVisible.forEach((index, arrayIndex) => {
        const delay = arrayIndex * 150;
        setTimeout(() => {
          animateCard(index, true, 0);
        }, delay);
      });
    }

    visibleCards.current = initialVisibleCards;
    setIsInitialized(true);
  };

  const handleCardClick = (project: any) => {
    // Navigate to project details page
    window.location.href = project.detailsUrl;
  };

  const handleSeeAllClick = () => {
    // Navigate to all projects page
    window.location.href = '/projects';
  };

  const handleTouchStart = (index: number) => {
    if (isMobile) {
      setPressedCard(index);
    }
  };

  const handleTouchEnd = () => {
    if (isMobile) {
      setPressedCard(null);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!isInitialized) return;

      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY > lastScrollY.current ? 'down' : 'up';
      lastScrollY.current = currentScrollY;

      // Check header visibility
      const header = headerRef.current;
      if (header) {
        const isHeaderInView = isElementInViewport(header, 0.2);
        animateHeader(isHeaderInView);
      }

      const cards = cardsRef.current;
      const newVisibleCards = new Set<number>();
      const enteringCards: number[] = [];
      const exitingCards: number[] = [];

      // Check each card's visibility
      cards.forEach((card, index) => {
        if (!card) return;

        const isInView = isElementInViewport(card);

        if (isInView) {
          newVisibleCards.add(index);
          if (!visibleCards.current.has(index)) {
            enteringCards.push(index);
          }
        } else {
          if (visibleCards.current.has(index)) {
            exitingCards.push(index);
          }
        }
      });

      // Handle entering cards with stagger
      if (enteringCards.length > 0) {
        const sortedEntering = [...enteringCards].sort((a, b) => {
          const cardA = cardsRef.current[a];
          const cardB = cardsRef.current[b];
          if (!cardA || !cardB) return 0;
          
          const rectA = cardA.getBoundingClientRect();
          const rectB = cardB.getBoundingClientRect();
          return rectA.top - rectB.top;
        });

        sortedEntering.forEach((index, arrayIndex) => {
          const delay = scrollDirection === 'down' 
            ? arrayIndex * 150 
            : (sortedEntering.length - arrayIndex - 1) * 150;
          animateCard(index, true, delay);
        });
      }

      // Handle exiting cards with reverse stagger
      if (exitingCards.length > 0) {
        const sortedExiting = [...exitingCards].sort((a, b) => {
          const cardA = cardsRef.current[a];
          const cardB = cardsRef.current[b];
          if (!cardA || !cardB) return 0;
          
          const rectA = cardA.getBoundingClientRect();
          const rectB = cardB.getBoundingClientRect();
          return rectA.top - rectB.top;
        });

        sortedExiting.forEach((index, arrayIndex) => {
          const delay = scrollDirection === 'down'
            ? (sortedExiting.length - arrayIndex - 1) * 100
            : arrayIndex * 100;
          animateCard(index, false, delay);
        });
      }

      visibleCards.current = newVisibleCards;
    };

    // Throttled scroll handler
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initialize animations after a short delay to ensure DOM is ready
    const initTimeout = setTimeout(() => {
      initializeAnimations();
      
      // Add scroll listener after initialization
      window.addEventListener('scroll', throttledHandleScroll);
      
      // Perform initial scroll check
      handleScroll();
    }, 100);

    return () => {
      clearTimeout(initTimeout);
      window.removeEventListener('scroll', throttledHandleScroll);
      clearTimeouts();
    };
  }, [isInitialized]);

  // Handle page load scroll position
  useEffect(() => {
    const handlePageLoad = () => {
      // Small delay to ensure the page has settled after navigation
      setTimeout(() => {
        initializeAnimations();
      }, 200);
    };

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      handlePageLoad();
    } else {
      window.addEventListener('load', handlePageLoad);
      return () => window.removeEventListener('load', handlePageLoad);
    }
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with scroll trigger */}
        <div className="text-center mb-16">
          <h2 
            ref={headerRef}
            className="text-5xl md:text-6xl text-white mb-6"
          >
            Selected
            <span className="text-blue-400 ml-4 relative">
              Projects
              <div className="absolute -inset-2 bg-blue-500/20 blur-xl rounded-full opacity-60"></div>
            </span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto"></div>
        </div>

        {/* Projects Grid */}
        <div 
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={addToRefs}
              className={`group relative ${isMobile ? 'cursor-pointer' : ''}`}
              onClick={() => handleCardClick(project)}
              onTouchStart={() => handleTouchStart(index)}
              onTouchEnd={handleTouchEnd}
            >
              <div className={`relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-slate-900 to-blue-950 border border-slate-700 hover:border-blue-400 transition-all duration-500 h-96 cursor-pointer ${
                isMobile && pressedCard === index ? 'border-blue-400' : ''
              }`}>
                {/* Glowing effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 transition-opacity duration-500 rounded-2xl blur-xl ${
                  isMobile && pressedCard === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}></div>
                
                {/* Background image - lightens on hover */}
                <div 
                  className={`absolute inset-0 bg-cover bg-center transition-all duration-500 ${
                    isMobile && pressedCard === index ? 'scale-110' : 'group-hover:scale-110'
                  }`}
                  style={{
                    backgroundImage: `url(${project.image})`,
                    filter: isMobile && pressedCard === index ? 'brightness(0.8)' : 'brightness(0.5) group-hover:brightness(0.8)'
                  }}
                ></div>
                
                {/* Hover GIF overlay - also lightens on hover */}
                <div 
                  className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 z-10 ${
                    isMobile && pressedCard === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                  style={{
                    backgroundImage: `url(${project.hoverGif})`,
                    filter: 'brightness(0.8)'
                  }}
                ></div>
                
                {/* Content overlay - ensures text area stays dark */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-20"></div>
                
                {/* See More indicator - bottom right */}
                <div className={`absolute bottom-2 right-4 z-40 flex items-center gap-1 text-white/80 text-sm transition-all duration-300 ${
                  isMobile && pressedCard === index ? 'text-blue-300 opacity-100' : 'group-hover:text-blue-300 opacity-0 group-hover:opacity-100'
                }`}>
                  <span className="font-medium">See More</span>
                  <svg 
                    className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                
                {/* Content container with additional darkening */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent z-30 p-6 rounded-b-2xl">
                  <div className={`transform transition-transform duration-500 ${
                    isMobile && pressedCard === index ? 'translate-y-0' : 'translate-y-4 group-hover:translate-y-0'
                  }`}>
                    <h2 className={`text-2xl md:text-3xl font-bold text-white mb-5 transition-all duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] ${
                      isMobile && pressedCard === index ? 'text-blue-300 -translate-y-8 drop-shadow-[0_0_15px_rgba(59,130,246,0.9)]' : 'group-hover:text-blue-300 group-hover:-translate-y-8 group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.9)]'
                    }`}>
                      {project.title}
                    </h2>
                    
                    {/* Default description */}
                    <p className={`text-gray-200 text-sm md:text-base leading-relaxed transition-opacity duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] ${
                      isMobile && pressedCard === index ? 'opacity-0' : 'opacity-90 group-hover:opacity-0'
                    }`}>
                      {project.description}
                    </p>
                    
                    {/* Tech stack chips - shown on hover */}
                    <div className={`transition-opacity duration-300 absolute inset-0 flex flex-col justify-end ${
                      isMobile && pressedCard === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}>
                      <div className="mb-2">
                        <h3 className="text-sm font-semibold text-blue-300 mb-1.5 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">
                          Tech Stack
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                          {project.techStack.map((tech, techIndex) => (
                            <div 
                              key={techIndex}
                              className="flex items-center gap-1 px-2 py-0.5 bg-black/40 backdrop-blur-sm rounded-full border border-blue-400/50 text-xs text-blue-200 hover:bg-black/60 transition-colors duration-200"
                            >
                              {tech.icon && (
                                <img 
                                  src={tech.icon} 
                                  alt={tech.name}
                                  className="w-3 h-3 object-contain"
                                />
                              )}
                              <span className="font-medium">{tech.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Subtle glow line */}
                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-cyan-400 transform transition-transform duration-500 origin-left shadow-[0_0_10px_rgba(59,130,246,0.8)] z-40 ${
                  isMobile && pressedCard === index ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></div>
                
                {/* Corner glow effect */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/40 to-transparent rounded-full blur-2xl transition-opacity duration-500 -translate-y-16 translate-x-16 ${
                  isMobile && pressedCard === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}></div>
              </div>

              {/* Mobile instruction text */}
              {isMobile && (
                <div className="text-center mt-0">
                  <span className="text-white/30 text-xs font-light drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                    Hold | Tap to see more
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Bottom fade */}
      <div className="z-0 pointer-events-none absolute bottom-0 left-0 w-full h-25 bg-gradient-to-t from-[#000000] to-transparent" />
    </div>
  );
};

export default Project;