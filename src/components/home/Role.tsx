import React from 'react'
import { ContainerTextFlip } from '../ui/container-text-flip'
import { motion } from "motion/react";
import { cn } from "@/lib/utils";


const Role = () => {
  const words = ["Web", "Software", "Front-end", "Full-stack", "Designer &"];
  return (
    <motion.h1
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      className={cn(
        "relative text-left text-9xl leading-normal font-bold tracking-tight text-white md:text-8xl dark:text-white-100",
      )}
      layout
    >
      <div className="inline-flex flex-col items-start">
          <ContainerTextFlip words={words} />
        <span className="text-7xl md:text-9xl font-bold mt-1">Developer</span>
      </div>
    </motion.h1>
  )
}

export default Role