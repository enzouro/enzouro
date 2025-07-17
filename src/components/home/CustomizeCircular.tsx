import React from 'react'
import CircularText from '../ui/CircularText'

const CustomizeCircular = () => {
  return (
    <div>
      <CircularText
        text="Customize your circular text animation with Framer Motion"
        spinDuration={15}
        onHover="speedUp"
        className="absolute inline-block inset-0 text-xl transition-all duration-500 ease-[cubic-bezier(0,0,0,1)]"
        />
    </div>
  )
}

export default CustomizeCircular