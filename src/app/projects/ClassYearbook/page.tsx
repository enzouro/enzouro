// pages/projects/kist-admin.tsx
'use client'
import ProjectDetails from "@/components/project/ProjectDetails"

const ClassYearbook = () => {
  const projectData = {
    title: "BAcked Up: The 02 Files",
    role: "Fullstack Developer",
    date: "July 2025",
    image: "/images/Yearbook-web.png",
    overview: "A special keepsake for Batangas State University - The National Engineering University - Lipa Campus BSIT-BA 02 — complete with a video to look back on, a chalkboard for heartfelt messages, and a flipbook to remember every one of us.",
    technologies: [
      { name: "NextJs", icon: "/images/icons/mongodb-icon.svg" },
      { name: "React", icon: "/images/icons/react.svg" },
      { name: "Tailwind CSS", icon: "/images/icons/tailwindcss-icon.svg" },
      { name: "Firebase", icon: "/images/icons/firebase-icon.svg" },

    ],
    link: "https://kist-park-admin-demo.netlify.app",
  }

  return (
  <ProjectDetails data={projectData} />
  )
}

export default ClassYearbook