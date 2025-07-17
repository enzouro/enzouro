'use client'
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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
  image: string
  overview: string
  technologies: Technology[]
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
  const imageRef = useRef<HTMLDivElement>(null)
  const overviewRef = useRef<HTMLDivElement>(null)
  const techRef = useRef<HTMLDivElement>(null)
  const techItemsRef = useRef<HTMLDivElement[]>([])
  const backButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for initial page load animations
      const tl = gsap.timeline({ delay: 0.2 })

      // Back button animation
      tl.fromTo(backButtonRef.current,
        {
          opacity: 0,
          scale: 0.8,
          y: -20
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }
      )

      // Title animation
      tl.fromTo(titleRef.current, 
        { 
          opacity: 0, 
          y: 50,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out"
        },
        "-=0.5"
      )

      // Role animation
      tl.fromTo(roleRef.current,
        {
          opacity: 0,
          x: -30
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out"
        },
        "-=0.5"
      )

      // Date animation
      tl.fromTo(dateRef.current,
        {
          opacity: 0,
          x: -30
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out"
        },
        "-=0.7"
      )

      // Image animation
      tl.fromTo(imageRef.current,
        {
          opacity: 0,
          scale: 0.8,
          rotateY: 15
        },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 1,
          ease: "power2.out"
        },
        "-=0.3"
      )

      // Overview animation with ScrollTrigger
      gsap.fromTo(overviewRef.current,
        {
          opacity: 0,
          y: 40
        },
        {
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
        }
      )

      // Tech section title
      gsap.fromTo(techRef.current,
        {
          opacity: 0,
          y: 30
        },
        {
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
        }
      )

      // Tech items animation
      techItemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(item,
            {
              opacity: 0,
              y: 30,
              scale: 0.8
            },
            {
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
            }
          )
        }
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  const addToTechRefs = (el: HTMLDivElement) => {
    if (el && !techItemsRef.current.includes(el)) {
      techItemsRef.current.push(el)
    }
  }

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      window.history.back()
    }
  }

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black overflow-hidden">
      {/* Floating Back Button */}
      <button
        ref={backButtonRef}
        onClick={handleBack}
        className="fixed top-22 left-10 z-50 group"
      >
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative bg-slate-900/20 backdrop-blur-sm border border-blue-500/20 rounded-xl p-3 transition-all duration-300 group-hover:border-blue-500/40 group-hover:bg-slate-900/30">
          <div className="flex items-center gap-2">
            <svg 
              className="w-5 h-5 text-blue-400 transition-colors duration-300 group-hover:text-blue-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-white text-sm font-medium transition-colors duration-300 group-hover:text-blue-300">
              Back
            </span>
          </div>
          
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </button>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 py-20 max-w-6xl">
        
        {/* Header Section - Left Aligned */}
        <div className="text-left mb-16">
          <h1 
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl text-white mb-8 font-bold"
          >
            {data.title}
          </h1>
          
          <div className="flex flex-col gap-4 text-lg">
            <div 
              ref={roleRef}
              className="text-blue-300 font-medium"
            >
              {data.role}
            </div>
            
            <div 
              ref={dateRef}
              className="text-cyan-300 font-medium"
            >
              {data.date}
            </div>
          </div>
        </div>

        {/* Full Width Image Section */}
        <div 
          ref={imageRef}
          className="relative group mb-16"
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative bg-slate-900/20 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-4 transition-all duration-300 group-hover:border-blue-500/40 group-hover:bg-slate-900/30">
            <div className="relative overflow-hidden rounded-xl aspect-[16/9]">
              <Image
                src={data.image}
                width={1200}
                height={675}
                alt={`${data.title} project screenshot`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>

        {/* Overview and Tech Stack Row */}
        <div className="grid lg:grid-cols-10 gap-12">
          
          {/* Overview Section - 60% width */}
          <div 
            ref={overviewRef}
            className="lg:col-span-6 flex flex-col justify-start"
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
            className="lg:col-span-4"
          >
            <h3 className="text-2xl md:text-3xl text-white mb-8">
              Technologies <span className="text-blue-400">Used</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {data.technologies.map((tech, index) => (
                <div
                  key={tech.name}
                  ref={addToTechRefs}
                  className="group relative"
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
    </div>
  )
}

export default ProjectDetails