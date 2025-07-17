'user client'
import React from 'react'
import DecryptedText from '../ui/DecryptedText'

const text = `Yohh, I'm Lorenz - a Web and System developer based in the Philippines.
I love minimalist designs but I'm exploring brutalist designs.
I'm Exploring new technologies and express my ideas in every development I do.`


const Hello = () => {
  return (
    <div className="relative z-10 text-xs xs:text-md md:text-2xl">
      {text.split('.').filter(Boolean).map((sentence, idx) => (
        <React.Fragment key={idx}>
          <DecryptedText
            text={sentence.trim() + (sentence.trim().endsWith('.') ? '' : '.')}
            animateOn="view"
            revealDirection="start"
            speed={50}
            maxIterations={10}
            sequential={true}
          />
          <br />
        </React.Fragment>
      ))}
    </div>
  )
}

export default Hello