import React from 'react'
import BlurText from '../ui/BlurText'
import MessageIcon from '@mui/icons-material/Message';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import DarkVeil from '../ui/DarkVeil';

const Contact = () => {

  // Customize these links as needed
  const socialLinks = {
    twitter: "https://twitter.com/your-handle",
    facebook: "https://www.facebook.com/johnlorenz.mayo.15",
    contact: "mailto:johnlorenz22.w@gmail.com" // or your contact form URL
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* DarkVeil positioned at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 transform rotate-180 h-[300px] sm:h-[400px] lg:h-[600px]">
        <DarkVeil 
        speed={1}
        hueShift={32}
        />
      </div>
      
      {/* Subtle background glow effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-purple-900/5" />
      <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-blue-500/3 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-purple-500/3 rounded-full blur-3xl" />
      
      <div className="flex flex-col relative z-10 container mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-24">
        <div className="flex flex-row w-full items-start mb-3 sm:mb-4">
          <div className="relative">
            <div className="absolute inset-0 text-3xl sm:text-5xl lg:text-7xl font-light tracking-tight text-white/20 blur-sm">
              Have something in mind?
            </div>
            <BlurText
              text="Have something in mind?"
              delay={150}
              animateBy="words"
              direction="top"
              className="relative text-3xl sm:text-5xl lg:text-7xl text-white font-light tracking-tight"
            />
          </div>
        </div>
        
        <div className="flex flex-row items-center gap-3 sm:gap-4 mb-8 sm:mb-12 lg:mb-16">
          <div className="relative">
            <div className="absolute inset-0 text-3xl sm:text-5xl lg:text-7xl font-light tracking-tight text-white/20 blur-sm">
              Share it!
            </div>
            <BlurText
              text="Share it!"
              delay={150}
              animateBy="words"
              direction="top"
              className="relative text-3xl sm:text-5xl lg:text-7xl text-white font-light tracking-tight"
            />
          </div>
        </div>
        
        {/* Mobile-first layout: stack vertically, desktop: side by side */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8 lg:gap-0">
          {/* Social section */}
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <h5 className="text-white/70 text-base sm:text-lg font-light">Say hello</h5>
              <div className="flex gap-2 sm:gap-3">
                <a 
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-2.5 sm:p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
                >
                  <div className="absolute inset-0 rounded-full bg-blue-400/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <XIcon className="relative text-white/60 group-hover:text-white/90 transition-colors duration-300 text-lg sm:text-xl" />
                </a>
                <a 
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-2.5 sm:p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
                >
                  <div className="absolute inset-0 rounded-full bg-sky-400/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <FacebookIcon className="relative text-white/60 group-hover:text-white/90 transition-colors duration-300 text-lg sm:text-xl" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact section */}
          <div className="flex flex-col items-start lg:items-end gap-4 sm:gap-6">
            <div className="text-left lg:text-right max-w-full lg:max-w-md">
              <p className="text-white/60 text-base sm:text-lg font-light leading-relaxed">
                Ready for collaboration, and need to create an innovation
              </p>
            </div>
            
            <div className="relative w-full sm:w-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <a 
                href={socialLinks.contact}
                className="group relative inline-block w-full sm:w-auto text-center px-6 sm:px-8 py-3 sm:py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-xl hover:shadow-white/20"
              >
                <span className="text-white/90 text-base sm:text-lg font-light tracking-wide group-hover:text-white transition-colors duration-300">
                  Drop a Message
                </span>
              </a>
            </div>
          </div>
        </div>

      </div>
        <div className="w-full absolute bottom-0 backdrop-blur-sm p-6 sm:p-8 lg:p-12 text-center items-center justify-center align-middle text-white">
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <h4 className="text-sm sm:text-base font-light tracking-tight text-white/70">
              © 2025 John Lorenz Mayo. All Rights Reserved.
            </h4>
          </div>
          <div>
            <p className="text-xs sm:text-sm font-light tracking-tight text-white/50">
              Fullstack Web Developer
            </p>
          </div>
        </div>
    </div>
  )
}

export default Contact