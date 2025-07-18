// pages/projects/kist-admin.tsx
'use client'
import ProjectDetails from "@/components/project/ProjectDetails"

const WakeNav = () => {
  const projectData = {
    title: "WakeNAv: Navigation Alarm App",
    role: "FullStack Developer",
    date: "July 2025",
    image: "/images/wakenav.png",
    overview: "Wakenav, a location-based alarm app using Flutter to help travelers avoid missed stops. Leveraging GPS technology, it tracks real-time location and triggers an alarm when approaching a set destination, allowingusers to relax or nap without worry.",
    technologies: [
      { name: "Flutter", icon: "/images/icons/flutter.svg" },
      { name: "Dart", icon: "/images/icons/dart.svg" },
      { name: "Leaflet", icon: "/images/icons/leaflet.svg" },
    ]
  }

  return (
  <ProjectDetails data={projectData} />
  )
}

export default WakeNav