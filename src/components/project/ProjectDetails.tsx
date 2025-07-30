'use client'
import React, { useEffect, useRef, useLayoutEffect, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRouter } from 'next/navigation'
import Contact from '../contact/Contact'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

interface Technology {
  name: string
  icon?: string
}

interface ProjectData {
  title: string
  role: string
  date: string
  images: string[]
  overview: string
  technologies: Technology[]
  link?: string
}

interface ProjectDetailProps {
  data: ProjectData
  onBack?: () => void
}

const ProjectDetails: React.FC<ProjectDetailProps> = ({ data, onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const roleRef = useRef<HTMLDivElement>(null)
  const dateRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const overviewRef = useRef<HTMLDivElement>(null)
  const techRef = useRef<HTMLDivElement>(null)
  const techItemsRef = useRef<HTMLDivElement[]>([])
  const backButtonRef = useRef<HTMLButtonElement>(null)
  const viewProjectRef = useRef<HTMLAnchorElement>(null)
  const router = useRouter()
  
  // Carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || data.images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % data.images.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, data.images.length])

  // Set initial states immediately to prevent flash
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Set all initial states immediately
      gsap.set([
        backButtonRef.current,
        titleRef.current,
        roleRef.current,
        dateRef.current,
        carouselRef.current,
        overviewRef.current,
        techRef.current,
        viewProjectRef.current,
        ...techItemsRef.current
      ], {
        opacity: 0,
        clearProps: "transform"
      })

      // Set specific initial transforms
      gsap.set(backButtonRef.current, { scale: 0.8, y: -20 })
      gsap.set(titleRef.current, { y: 50, scale: 0.8 })
      gsap.set(roleRef.current, { x: -30 })
      gsap.set(dateRef.current, { x: -30 })
      gsap.set(carouselRef.current, { scale: 0.8, rotateY: 15 })
      gsap.set(overviewRef.current, { y: 40 })
      gsap.set(techRef.current, { y: 30 })
      gsap.set(viewProjectRef.current, { y: 20, scale: 0.9 })
      
      // Set tech items initial states
      techItemsRef.current.forEach((item) => {
        if (item) {
          gsap.set(item, { y: 30, scale: 0.8 })
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for initial page load animations
      const tl = gsap.timeline({ delay: 0.1 })

      // Back button animation
      tl.to(backButtonRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      })

      // Title animation
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out"
      }, "-=0.5")

      // Role animation
      tl.to(roleRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.5")

      // Date animation
      tl.to(dateRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.7")

      // View Project button animation
      if (viewProjectRef.current) {
        tl.to(viewProjectRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.6")
      }

      // Carousel animation
      tl.to(carouselRef.current, {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=0.3")

      // Overview animation with ScrollTrigger
      gsap.to(overviewRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: overviewRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      })

      // Tech section title
      gsap.to(techRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: techRef.current,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      })

      // Tech items animation
      techItemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.to(item, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse"
            }
          })
        }
      })

    }, containerRef)

    return () => ctx.revert()
  }, [data])

  const addToTechRefs = (el: HTMLDivElement | null) => {
    if (el && !techItemsRef.current.includes(el)) {
      techItemsRef.current.push(el)
    }
  }

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.back()
    }
  }

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % data.images.length)
  }

  const goToPrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + data.images.length) % data.images.length)
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black overflow-hidden">
      {/* Floating Back Button */}
      <button
        ref={backButtonRef}
        onClick={handleBack}
        className="fixed top-6 left-6 lg:top-22 lg:left-15 z-50 group gsap-hidden"
      >
        <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-lg sm:rounded-xl blur-lg sm:blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative bg-slate-900/30 sm:bg-slate-900/20 backdrop-blur-sm border border-blue-500/30 sm:border-blue-500/20 rounded-lg sm:rounded-xl p-2 sm:p-3 transition-all duration-300 group-hover:border-blue-500/40 group-hover:bg-slate-900/40 sm:group-hover:bg-slate-900/30">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <svg 
              className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 transition-colors duration-300 group-hover:text-blue-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-white text-xs sm:text-sm font-medium transition-colors duration-300 group-hover:text-blue-300">
              Back
            </span>
          </div>
          
          <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </button>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 py-20 max-w-6xl">
        
        {/* Header Section - Left Aligned */}
        <div className="text-left mb-16">
          <h1 
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl text-white mb-8 font-bold gsap-hidden"
          >
            {data.title}
          </h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-lg mb-8">
            <div 
              ref={roleRef}
              className="text-blue-300 font-medium gsap-hidden"
            >
              {data.role}
            </div>
            
            <div 
              ref={dateRef}
              className="text-cyan-300 font-medium gsap-hidden"
            >
              {data.date}
            </div>
          </div>

          {/* View Project Button */}
          {data.link && (
            <a
              ref={viewProjectRef}
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 group gsap-hidden"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/30 rounded-xl px-6 py-3 transition-all duration-300 group-hover:border-blue-500/50 group-hover:bg-gradient-to-r group-hover:from-blue-500/20 group-hover:to-cyan-500/20">
                <div className="flex items-center gap-3">
                  <svg 
                    className="w-5 h-5 text-blue-400 transition-all duration-300 group-hover:text-blue-300 group-hover:scale-110" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span className="text-white font-medium transition-colors duration-300 group-hover:text-blue-300">
                    View Project
                  </span>
                  <svg 
                    className="w-4 h-4 text-blue-400 transition-all duration-300 group-hover:text-blue-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </a>
          )}
        </div>

        {/* Image Carousel Section */}
        <div 
          ref={carouselRef}
          className="relative group mb-16 gsap-hidden"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative bg-slate-900/20 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-4 transition-all duration-300 group-hover:border-blue-500/40 group-hover:bg-slate-900/30">
            <div className="relative overflow-hidden rounded-xl aspect-[16/9]">
              {/* Images */}
              <div className="relative w-full h-full">
                {data.images.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${data.title} project screenshot ${index + 1}`}
                      fill
                      className="object-contain w-full h-full"
                    />

                  </div>
                ))}
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Navigation Arrows - Only show if more than 1 image */}
              {data.images.length > 1 && (
                <>
                  <button
                    onClick={goToPrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                    aria-label="Previous image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    onClick={goToNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                    aria-label="Next image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Image Counter */}
              {data.images.length > 1 && (
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {currentImageIndex + 1} / {data.images.length}
                </div>
              )}
            </div>

            {/* Dot Indicators - Only show if more than 1 image */}
            {data.images.length > 1 && (
              <div className="flex justify-center mt-4 gap-2">
                {data.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'bg-blue-400 scale-125'
                        : 'bg-gray-500 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Overview and Tech Stack Row */}
        <div className="grid lg:grid-cols-10 gap-12">
          
          {/* Overview Section - 60% width */}
          <div 
            ref={overviewRef}
            className="lg:col-span-6 flex flex-col justify-start gsap-hidden"
          >
            <div className="mb-6">
              <h3 className="text-2xl md:text-3xl text-white mb-4">
                Project <span className="text-blue-400">Overview</span>
              </h3>
              <div className="w-16 h-px bg-gradient-to-r from-blue-400 to-cyan-400 mb-6"></div>
            </div>
            
            <p className="text-gray-300 leading-relaxed text-lg">
              {data.overview}
            </p>
          </div>

          {/* Technologies Section - 40% width */}
          <div 
            ref={techRef}
            className="lg:col-span-4 gsap-hidden"
          >
            <h3 className="text-2xl md:text-3xl text-white mb-8">
              Technologies <span className="text-blue-400">Used</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {data.technologies.map((tech, index) => (
                <div
                  key={tech.name}
                  ref={addToTechRefs}
                  className="group relative gsap-hidden"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative bg-slate-900/20 backdrop-blur-sm border border-blue-500/20 rounded-xl p-4 h-full transition-all duration-300 group-hover:border-blue-500/40 group-hover:bg-slate-900/30">
                    {tech.icon && (
                      <div className="mb-3 flex justify-center">
                        <div className="relative">
                          <div className="absolute inset-0 w-8 h-8 bg-white/10 rounded-full blur-sm"></div>
                          <div className="absolute inset-0 w-8 h-8 bg-blue-400/20 rounded-full blur-md"></div>
                          <img 
                            src={tech.icon} 
                            alt={tech.name} 
                            className="relative w-8 h-8 object-contain z-10 drop-shadow-lg"
                          />
                        </div>
                      </div>
                    )}
                    
                    <h4 className="text-white text-sm font-medium transition-colors duration-300 group-hover:text-blue-300 text-center">
                      {tech.name}
                    </h4>
                    
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="mt-16 text-center">
          <div className="inline-block">
            <div className="w-2 h-2 bg-blue-400 rounded-full mx-auto mb-3"></div>
            <p className="text-blue-300/60 text-sm">
              John Lorenz
            </p>
          </div>
        </div>
      </div>

      {/* Ambient lighting effects */}
      <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-1/3 right-1/6 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl opacity-50"></div>

      <div>
        <Contact />
      </div>

      <style jsx>{`
        .gsap-hidden {
          opacity: 0;
        }
      `}</style>
    </div>
  )
}

export default ProjectDetails