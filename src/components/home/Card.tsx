import React from 'react'
import ProfileCard from '../ui/ProfileCard'
import Avatar from '../../assets/img/Avatar.png' // <-- Import the image

const reactIconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg";

const Card = () => {
  return (
    <div>
          <ProfileCard
      name="John Lorenz Mayo"
      title="Web Developer"
      handle="enzouro"
      status="Online"
      contactText="Github"
      avatarUrl={Avatar.src}
      iconUrl={reactIconUrl}
      grainUrl={reactIconUrl}
      showBehindGradient={true}
      // behindGradient="linear-gradient(135deg, #02000D 0%, #051426 30%, #204F8C 60%, #194973 80%, #1F72A6 100%)"
      // innerGradient="linear-gradient(120deg, #051426 0%, #204F8C 60%, #1F72A6 100%)"
      showUserInfo={true}
      enableTilt={true}
      onContactClick={() => window.open("https://github.com/enzouro", "_blank")}
    />
    </div>

  )
}

export default Card