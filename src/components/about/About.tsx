import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

import Particles from '../ui/Particle'
import { ContainerTextFlip } from '../ui/container-text-flip'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const AboutMe = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardRefs = useRef<HTMLDivElement[]>([])
  const [showTooltip, setShowTooltip] = useState(false)
  const profileImageRef = useRef<HTMLDivElement>(null)
  const words = ["Web", "Software", "Front-end", "Full-stack", "Designer &"];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      gsap.fromTo(titleRef.current, 
        { 
          opacity: 0, 
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Animate each card individually with their own ScrollTrigger
      cardRefs.current.forEach((card, index) => {
        if (card) {
          // Set initial state
          gsap.set(card, {
            opacity: 0,
            y: 40,
            scale: 0.95
          })

          // Create individual ScrollTrigger for each card
          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse",
              onEnter: () => {
                // Additional entrance animation for the card inner content
                gsap.to(card.querySelector('.card-content'), {
                  rotateY: 0,
                  duration: 0.3,
                  ease: "power2.out"
                })
              },
              onLeave: () => {
                // Additional exit animation
                gsap.to(card.querySelector('.card-content'), {
                  rotateY: -2,
                  duration: 0.3,
                  ease: "power2.out"
                })
              },
              onEnterBack: () => {
                // Re-entrance animation
                gsap.to(card.querySelector('.card-content'), {
                  rotateY: 0,
                  duration: 0.3,
                  ease: "power2.out"
                })
              },
              onLeaveBack: () => {
                // Exit back animation
                gsap.to(card.querySelector('.card-content'), {
                  rotateY: 2,
                  duration: 0.3,
                  ease: "power2.out"
                })
              }
            }
          })
        }
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el)
    }
  }

  // Separate handlers for better debugging
  const handleMouseEnter = () => {
    console.log('Mouse enter triggered') // Debug log
    setShowTooltip(true)
  }

  const handleMouseLeave = () => {
    console.log('Mouse leave triggered') // Debug log
    setShowTooltip(false)
  }

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={150}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 py-16">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl text-white mb-4"
          >
            About
            <span className="text-blue-400 ml-3 relative">
              Me
              <div className="absolute -inset-2 bg-blue-500/20 blur-xl rounded-full opacity-60"></div>
            </span>
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto"></div>
        </div>

        {/* Bento Grid Layout */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
            
            {/* Main About Paragraph - Optimized Card */}
            <div ref={addToRefs} className="lg:col-span-7 group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="card-content relative bg-slate-900/20 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 md:p-8 h-full transition-all duration-300 group-hover:border-blue-500/40 group-hover:bg-slate-900/30">
                {/* Profile Header */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-shrink-0">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/40 to-cyan-400/40 rounded-full blur opacity-60"></div>
                    <div 
                      ref={profileImageRef}
                      className="relative w-16 h-16 md:w-20 md:h-20 bg-slate-800/50 rounded-full border-2 border-blue-500/30 flex items-center justify-center overflow-hidden cursor-pointer z-20"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Image
                        src="/images/Lorenzo.png" // Replace with your actual image path
                        alt="Profile"
                        width={80}
                        height={80}
                        className="w-full h-full object-cover rounded-full pointer-events-none"
                        priority
                      />
                    </div>
                    
                    {/* Tooltip - Mobile responsive positioning */}
                    {showTooltip && (
                      <div className="absolute -top-12 md:-top-16 left-0 lg:left-1/2 transform -translate-x-0 lg:-translate-x-1/2 z-50 pointer-events-none">
                        <div className="bg-slate-800/95 backdrop-blur-sm border border-blue-500/30 rounded-lg px-2 md:px-3 py-1.5 md:py-2 shadow-lg ">
                          <p className="text-white text-xs leading-tight sm:leading-normal text-center sm:text-left whitespace-nowrap">
                            My profile picture on every social media <br></br> after getting one decent photo lol
                          </p>
                          {/* Tooltip arrow */}
                          <div className="absolute top-full left-0 lg:left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-slate-800/95"></div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white text-xl md:text-2xl mb-1 group-hover:text-blue-300 transition-colors">
                     <ContainerTextFlip words={words} className="text-xl md:text-2xl"/>  Developer
                    </h3>
                    <p className="text-blue-400/70 text-sm">Passionate about creating meaningful solutions</p>
                  </div>
                </div>
                
                {/* About Content */}
                <div className="space-y-4">
                  <p className="text-blue-100/90 text-sm md:text-base leading-relaxed">
                    I'm a passionate web developer who loves turning ideas into functional, user-friendly applications. 
                    My approach centers on writing clean, maintainable code while keeping the end user's experience at the forefront.
                  </p>
                  <p className="text-blue-100/80 text-sm md:text-base leading-relaxed">
                    Through my Information Technology studies and hands-on internship experience, I've developed a strong foundation in 
                    problem-solving and collaborative development practices. I'm actively seeking opportunities to contribute to 
                    innovative projects and grow within a dynamic development team.
                  </p>
                </div>
                
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Right Column - Info Cards */}
            <div className="lg:col-span-5 space-y-4 md:space-y-6">
              
              {/* Education Card */}
              <div ref={addToRefs} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="card-content relative bg-slate-900/20 backdrop-blur-sm border border-blue-500/20 rounded-xl p-5 transition-all duration-300 group-hover:border-blue-500/40 group-hover:bg-slate-900/30">
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 w-12 h-12 bg-white/10 rounded-full blur-sm"></div>
                      <div className="absolute inset-0 w-12 h-12 bg-blue-400/20 rounded-full blur-md"></div>
                      <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                        <SchoolOutlinedIcon className="text-white/80 text-xl" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-lg mb-1 group-hover:text-blue-300 transition-colors">
                        Education
                      </h3>
                      <p className="text-blue-200 text-sm font-medium">Bachelor of Science in Information Technology <br></br>
                        Major in Business Analytics
                      </p>
                      <p className="text-blue-400/70 text-xs">Batangas State University TNEU -Lipa Campus • 2021 - 2025</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>

              {/* Experience Card */}
              <div ref={addToRefs} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="card-content relative bg-slate-900/20 backdrop-blur-sm border border-blue-500/20 rounded-xl p-5 transition-all duration-300 group-hover:border-blue-500/40 group-hover:bg-slate-900/30">
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 w-12 h-12 bg-white/10 rounded-full blur-sm"></div>
                      <div className="absolute inset-0 w-12 h-12 bg-blue-400/20 rounded-full blur-md"></div>
                      <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                        <WorkOutlineOutlinedIcon className="text-white/80 text-xl" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-lg mb-1 group-hover:text-blue-300 transition-colors">
                        Experience
                      </h3>
                      <p className="text-blue-200 text-sm font-medium">Web Developer & Maintenance</p>
                      <p className="text-blue-400/70 text-xs">BatStateU KIST Park • May 2025</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>

              {/* Skills Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                
                {/* Skills Highlight Card */}
                <div ref={addToRefs} className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="card-content relative bg-slate-900/20 backdrop-blur-sm border border-blue-500/20 rounded-xl p-4 transition-all duration-300 group-hover:border-blue-500/40 group-hover:bg-slate-900/30">
                    <div className="text-center">
                      <div className="relative inline-block mb-3">
                        <div className="absolute inset-0 w-10 h-10 bg-white/10 rounded-full blur-sm"></div>
                        <div className="absolute inset-0 w-10 h-10 bg-blue-400/20 rounded-full blur-md"></div>
                        <div className="relative w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center border border-blue-500/30 mx-auto">
                          <BoltOutlinedIcon className="text-white/80 text-lg" />
                        </div>
                      </div>
                      <h3 className="text-white text-sm font-medium mb-2 group-hover:text-blue-300 transition-colors">
                        Core Strengths
                      </h3>
                      <p className="text-blue-200/80 text-xs leading-relaxed">
                        Problem-solving, Clean Code, User-Centered Design
                      </p>
                    </div>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>

                {/* Current Focus Card */}
                <div ref={addToRefs} className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="card-content relative bg-slate-900/20 backdrop-blur-sm border border-blue-500/20 rounded-xl p-4 transition-all duration-300 group-hover:border-blue-500/40 group-hover:bg-slate-900/30">
                    <div className="text-center">
                      <div className="relative inline-block mb-3">
                        <div className="absolute inset-0 w-10 h-10 bg-white/10 rounded-full blur-sm"></div>
                        <div className="absolute inset-0 w-10 h-10 bg-blue-400/20 rounded-full blur-md"></div>
                        <div className="relative w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center border border-blue-500/30 mx-auto">
                          <GpsFixedIcon className="text-white/80 text-lg" />
                        </div>
                      </div>
                      <h3 className="text-white text-sm font-medium mb-2 group-hover:text-blue-300 transition-colors">
                        Currently Learning
                      </h3>
                      <p className="text-blue-200/80 text-xs leading-relaxed">
                        React Patterns, NextJs Architecture, UI/UX Designs
                      </p>
                    </div>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Ambient lighting effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-40"></div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-50 bg-gradient-to-t from-[#02000D] to-transparent" />
      
    </div>
  )
}

export default AboutMe