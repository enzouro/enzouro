// pages/projects/kist-admin.tsx
'use client'
import ProjectDetails from "@/components/project/ProjectDetails"

const FirstKISTPark = () => {
  const projectData = {
    title: "First KIST Park Website",
    role: "Intern Web Developer and Maintenance",
    date: "May 2025",
    image: "/images/kist-park.png",
    overview: `Maintained and enhanced the KIST Park website (firstkistpark.com) to improve functionality and user experience across devices. Designed and implemented additional pages to provide essential information for future locators and STEER Hub service users. Implemented website crawling via Google Search Console and integrating Google Analytics for search endgine optimization and website traffic monitoring.`,
    technologies: [
      { name: "Html", icon: "/images/icons/mongodb-icon.svg" },
      { name: "CSS", icon: "/images/icons/express.svg" },
      { name: "JavaScript", icon: "/images/icons/react.svg" },
      { name: "Google Search Console", icon: "/images/icons/google-search-console.svg" },
      { name: "Google Analytics", icon: "/images/icons/google-analytics.svg" },
    ],
    link: "https://firstkistpark.com",
  }

  return (
  <ProjectDetails data={projectData} />
  )
}

export default FirstKISTPark