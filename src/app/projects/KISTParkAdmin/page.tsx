// pages/projects/kist-admin.tsx
'use client'
import ProjectDetails from "@/components/project/ProjectDetails"

const KistAdminPage = () => {
  const projectData = {
    title: "KIST Park Admin Dashboard",
    role: "Intern Web Developer and Maintenance",
    date: "May 2025",
    image: "/images/kist-admin-web.png",
    overview: "A MERN stack web application to streamline blog content management and facilitate easy blog posting on the website.",
    technologies: [
      { name: "MongoDB", icon: "/images/icons/mongodb-icon.svg" },
      { name: "Express", icon: "/images/icons/express.svg" },
      { name: "React", icon: "/images/icons/react.svg" },
      { name: "Node.js", icon: "/images/icons/nodejs-icon.svg" },
    ]
  }

  return (
  <ProjectDetails data={projectData} />
  )
}

export default KistAdminPage