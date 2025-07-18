'use client'
import React, { useEffect, useRef } from 'react'

const SplashScreen = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    // Import GSAP from CDN
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'
    script.onload = () => {
      const { gsap } = window as any
      
      // Set initial states
      gsap.set(containerRef.current, {
        opacity: 0
      })
      
      gsap.set([titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: 50,
        scale: 0.9
      })

      // Create master timeline
      const masterTl = gsap.timeline()
      
      // 1. Fade in the entire page/container first
      masterTl.to(containerRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      })
      
      // 2. Wait a moment, then start text animations
      masterTl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out"
      }, "+=0.3")
      
      // 3. Subtitle animation (slightly delayed)
      masterTl.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8")
      
      // 4. Hold for 2.5 seconds, then exit animations
      masterTl.to([titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: -30,
        scale: 1.1,
        duration: 0.8,
        ease: "power3.in"
      }, "+=2.5")
      
      // 5. Fade out entire container
      masterTl.to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut"
      }, "-=0.2")
    }
    
    document.head.appendChild(script)
    
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
    >
      <div className="text-center">
        <h1 
          ref={titleRef}
          className="text-6xl md:text-8xl font-light text-white mb-4"
          style={{
            textShadow: '0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.3)',
            letterSpacing: '0.05em',
            fontFamily: 'var(--font-geist-sans)'
          }}
        >
          LORENZ
        </h1>
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl font-light text-white opacity-80"
          style={{
            textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
            letterSpacing: '0.2em',
            fontFamily: 'var(--font-geist-sans)'
          }}
        >
          PORTFOLIO
        </p>
      </div>
    </div>
  )
}

export default SplashScreen