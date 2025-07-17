import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Particles from '../ui/Particle'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

interface TechStack {
  name: string
  category: string
  icon: string
}

const TechStack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const techGridRef = useRef<HTMLDivElement>(null)
  const techItemsRef = useRef<HTMLDivElement[]>([])

  const techstacks: TechStack[] = [
    { name: 'Html', category: 'Frontend', icon: '/images/icons/html-5.svg' },
    { name: 'Css', category: 'Styling', icon: '/images/icons/css-3.svg' },
    { name: 'Javascript', category: 'Language', icon: '/images/icons/javascript.svg' },
    { name: 'TypeScript', category: 'Language', icon: '/images/icons/typescript-icon.svg' },
    { name: 'Tailwind CSS', category: 'Styling', icon: '/images/icons/tailwindcss-icon.svg' },
    { name: 'Gsap', category: 'Styling', icon: '/images/icons/greensock-icon.svg' },
    { name: "Google Search Console", category: 'SEO', icon: "/images/icons/google-search-console.svg" },
    { name: "Google Analytics", category: 'SEO', icon: "/images/icons/google-analytics.svg" },
    { name: 'Python', category: 'Language', icon: '/images/icons/python.svg' },
    { name: 'MongoDB', category: 'Database', icon: '/images/icons/mongodb-icon.svg' },
    { name: 'Express', category: 'Framework', icon: '/images/icons/express.svg' },
    { name: 'React', category: 'Frontend', icon: '/images/icons/react.svg' },
    { name: 'Node.js', category: 'Backend', icon: '/images/icons/nodejs-icon.svg' },
    { name: 'TensorFlow', category: 'Analytics', icon: '/images/icons/tensorflow.svg' },
    { name: 'Flutter', category: 'Framework', icon: '/images/icons/flutter.svg' },
    { name: 'Dart', category: 'Language', icon: '/images/icons/dart.svg' },
    { name: 'Leaflet', category: 'Plugin', icon: '/images/icons/leaflet.svg' },
    { name: 'Next.js', category: 'Framework', icon: '/images/icons/nextjs-icon.svg' },
    { name: 'Vite', category: 'Framework', icon: '/images/icons/vitejs.svg' },
    { name: 'Vercel', category: 'Hosting', icon: '/images/icons/vercel-icon.svg' },
    { name: 'Netlify', category: 'Hosting', icon: '/images/icons/netlify-icon.svg' },

  ]

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

      // Animate each tech item individually with their own ScrollTrigger
      techItemsRef.current.forEach((item, index) => {
        if (item) {
          // Set initial state
          gsap.set(item, {
            opacity: 0,
            y: 40,
            scale: 0.8
          })

          // Create individual ScrollTrigger for each item
          gsap.to(item, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse",
              // Optional: add some debugging
              // markers: true,
              onEnter: () => {
                // Additional entrance animation
                gsap.to(item.querySelector('.tech-card'), {
                  rotateY: 0,
                  duration: 0.3,
                  ease: "power2.out"
                })
              },
              onLeave: () => {
                // Additional exit animation
                gsap.to(item.querySelector('.tech-card'), {
                  rotateY: -5,
                  duration: 0.3,
                  ease: "power2.out"
                })
              },
              onEnterBack: () => {
                // Re-entrance animation
                gsap.to(item.querySelector('.tech-card'), {
                  rotateY: 0,
                  duration: 0.3,
                  ease: "power2.out"
                })
              },
              onLeaveBack: () => {
                // Exit back animation
                gsap.to(item.querySelector('.tech-card'), {
                  rotateY: 5,
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

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !techItemsRef.current.includes(el)) {
      techItemsRef.current.push(el)
    }
  }

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#02000D] overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Title Section */}
        <div className="text-center mb-10">
          <h2 
            ref={titleRef}
            className="text-5xl md:text-6xl text-white mb-4"
          >
            Tech
            <span className="text-blue-400 ml-4 relative">
              Stack
              <div className="absolute -inset-2 bg-blue-500/20 blur-xl rounded-full opacity-60"></div>
            </span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto"></div>
        </div>

        {/* Tech Grid */}
        <div ref={techGridRef} className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {techstacks.map((tech, index) => (
              <div
                key={tech.name}
                ref={addToRefs}
                className="group relative"
              >
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Card */}
                <div className="tech-card relative bg-slate-900/20 backdrop-blur-sm border border-blue-500/20 rounded-xl p-4 h-full transition-all duration-300 group-hover:border-blue-500/40 group-hover:bg-slate-900/30">
                  {/* Icon */}
                  <div className="mb-3 flex justify-center">
                    <div className="relative">
                      {/* Glow effect behind icon */}
                      <div className="absolute inset-0 w-10 h-10 bg-white/10 rounded-full blur-sm"></div>
                      <div className="absolute inset-0 w-10 h-10 bg-blue-400/20 rounded-full blur-md"></div>
                      <div className="absolute inset-0 w-10 h-10 bg-cyan-400/10 rounded-full blur-lg"></div>
                      
                      {/* Icon */}
                      <img 
                        src={tech.icon} 
                        alt={tech.name} 
                        className="relative w-10 h-10 object-contain z-10 drop-shadow-lg"
                      />
                    </div>
                  </div>
                  
                  {/* Tech Name */}
                  <h3 className="text-white text-base mb-1 transition-colors duration-300 group-hover:text-blue-300 text-center">
                    {tech.name}
                  </h3>
                  
                  {/* Category */}
                  <span className="text-blue-400/70 text-xs block text-center">
                    {tech.category}
                  </span>

                  {/* Subtle inner glow */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="mt-12 text-center">
          <div className="inline-block">
            <div className="w-2 h-2 bg-blue-400 rounded-full mx-auto mb-3"></div>
            <p className="text-blue-300/60 text-sm">
              Constantly Evolving
            </p>
          </div>
        </div>
      </div>

      {/* Ambient lighting effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-40"></div>

            {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-50 bg-gradient-to-t from-[#000000] to-transparent backdrop-blur-sm" />
      
    </div>
  )
}

export default TechStack