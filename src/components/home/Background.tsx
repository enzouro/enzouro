import React from 'react'
import Beams from '../ui/Beams'

const Background = () => {
  return (
    <div className="relative h-full w-full">
      <Beams
        beamWidth={2}
        beamHeight={15}
        beamNumber={12}
        lightColor="#009AEE"
        speed={2}
        noiseIntensity={1.75}
        scale={0.2}
        rotation={25}
      />
      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-50 bg-gradient-to-t from-[#02000D] to-transparent" />
    </div>
  )
}

export default Background