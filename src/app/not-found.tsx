import FuzzyText from '@/components/ui/FuzzyText'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="relative flex items-center justify-center min-h-screen w-full">
      <div className="text-center">
        <FuzzyText 
          baseIntensity={0.2} 
          hoverIntensity={0.5} 
          enableHover={true}
        >
          404 Page Not Found
        </FuzzyText>
        
        {/* Return Home Button - centered below FuzzyText */}
        <div className="mt-8">
        <Link 
          href="/"
          className="group relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-all duration-300 ease-out hover:scale-105 focus:outline-none"
        >
          {/* Simple white glow */}
          <div className="absolute -inset-0.5 bg-white/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Button background */}
          <div className="relative bg-black/60 border border-white/20 rounded-lg px-4 py-2 transition-all duration-300 group-hover:border-white/40">
            {/* Text */}
            <span className="relative z-10 text-white/80 group-hover:text-white transition-colors duration-300">
              Return Home
            </span>
          </div>
        </Link>
      </div>
    </div>
  </div>
  )
}