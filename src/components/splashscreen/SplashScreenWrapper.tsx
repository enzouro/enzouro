'use client'
import { useState, useEffect } from 'react'
import SplashScreen from './SplashScreen'

interface SplashScreenWrapperProps {
  children: React.ReactNode
}

export default function SplashScreenWrapper({ children }: SplashScreenWrapperProps) {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    // Hide splash screen after animation completes
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 5000) // Adjust timing based on your animation

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {showSplash && <SplashScreen />}
      <div style={{ display: showSplash ? 'none' : 'block' }}>
        {children}
      </div>
    </>
  )
}