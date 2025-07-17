// pages/projects/kist-admin.tsx
'use client'
import ProjectDetails from "@/components/project/ProjectDetails"

const Capstone = () => {
  const projectData = {
    title: "KIST Park Admin Dashboard",
    role: "Intern Web Developer and Maintenance",
    date: "Dec 2025",
    image: "/images/capstone-web.png",
    overview: `A MERN Stack Parts Procurement System, a web based application using MongoDB for the
database, Express.js for the backend, ReactJs for the frontend, and Node.js for the server environment.
Integrated with Tensorflow JS Node for predictive data analytics using JavaScript, enabling detailed analysis
of procurement trends, and sales and expenses performance. Hosted online, the system enhances decisionmaking and operational efficiency`,
    technologies: [
      { name: "MongoDB", icon: "/images/icons/mongodb-icon.svg" },
      { name: "Express", icon: "/images/icons/express.svg" },
      { name: "React", icon: "/images/icons/react.svg" },
      { name: "Node.js", icon: "/images/icons/nodejs-icon.svg" },
      {name: 'Tensorflow', icon: "/images/icons/tensorflow.svg"},

    ]
  }

  return (
  <ProjectDetails data={projectData} />
  )
}

export default Capstone