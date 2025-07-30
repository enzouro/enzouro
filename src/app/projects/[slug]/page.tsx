// app/projects/[slug]/page.tsx
import React from 'react'
import { notFound } from 'next/navigation'
import ProjectDetails from "@/components/project/ProjectDetails"

const projectsData = [
  {
    id: 1,
    title: "BAcked Up: The 02 Files",
    slug: "backed-up-the-02-files", // Fixed slug format
    role: "Fullstack Developer",
    date: "July 2025",
    images: [
      "/images/yearbook/yearbook-1.png",
      "/images/yearbook/yearbook-2.png",
      "/images/yearbook/yearbook-3.png",
      "/images/yearbook/yearbook-4.png",

    ], 
    overview: "A special keepsake for Batangas State University - The National Engineering University - Lipa Campus BSIT-BA 02 — complete with a video to look back on, a chalkboard for heartfelt messages, and a flipbook to remember every one of us. Created using Next.js, React, Tailwind CSS, and Firebase for real-time database functionality.",
    technologies: [
      { name: "NextJs", icon: "/images/icons/nextjs-icon.svg" }, // Fixed icon path
      { name: "React", icon: "/images/icons/react.svg" },
      { name: "Tailwind CSS", icon: "/images/icons/tailwindcss-icon.svg" },
      { name: "Firebase", icon: "/images/icons/firebase-icon.svg" },
    ],
  },
  {
    id: 2,
    title: "First KIST Park Website",
    slug: "first-kist-park-website",
    role: "Intern Web Developer and Maintenance",
    date: "May 2025",
    images: [
      "/images/kist-park/kistpark-1.png",
      "/images/kist-park/kistpark-2.png",
      "/images/kist-park/kistpark-3.png",
      "/images/kist-park/kistpark-4.png",
    ], 
    overview: `Maintained and enhanced the KIST Park website (firstkistpark.com) to improve functionality and user experience across devices. Designed and implemented additional pages to provide essential information for future locators and STEER Hub service users. Implemented website crawling via Google Search Console and integrating Google Analytics for search engine optimization and website traffic monitoring.`,
    technologies: [
      { name: "HTML5", icon: "/images/icons/html-5.svg" }, // Fixed icon path
      { name: "CSS3", icon: "/images/icons/css-3.svg" }, // Fixed icon path
      { name: "JavaScript", icon: "/images/icons/javascript.svg" },
      { name: "Google Search Console", icon: "/images/icons/google-search-console.svg" },
      { name: "Google Analytics", icon: "/images/icons/google-analytics.svg" },
    ],
    link: "https://firstkistpark.com",
  },
  {
    id: 3,
    title: "KIST Park Admin Dashboard",
    slug: "kist-park-admin-dashboard",
    role: "Intern Web Developer and Maintenance",
    date: "May 2025",
    images: [
      "/images/kist-admin/kistadmin-1.png",
      "/images/kist-admin/kistadmin-2.png",
      "/images/kist-admin/kistadmin-3.png",
      "/images/kist-admin/kistadmin-4.png",
      "/images/kist-admin/kistadmin-5.png",
      "/images/kist-admin/kistadmin-6.png",
    ], 
    overview: "Developed and maintained the KIST Park Admin Dashboard, a web-based application for managing KIST Park operations. The dashboard features user management, service requests, and real-time data analytics. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js) for robust performance and scalability.",
    technologies: [
      { name: "MongoDB", icon: "/images/icons/mongodb-icon.svg" },
      { name: "Express", icon: "/images/icons/express.svg" },
      { name: "React", icon: "/images/icons/react.svg" },
      { name: "Node.js", icon: "/images/icons/nodejs-icon.svg" },
    ],
    link: "https://kist-park-admin-demo.netlify.app",
  },
  {
    id: 4,
    title: "Part Procurement System Integrated with Predictive Analytics",
    slug: "part-procurement-system",
    role: "Capstone Project Developer",
    date: "Dec 2025",
    images: [
      "/images/capstone/capstone-1.png",
      "/images/capstone/capstone-2.png",
      "/images/capstone/capstone-3.png",
      "/images/capstone/capstone-4.png",
      "/images/capstone/capstone-5.png",
      "/images/capstone/capstone-6.png",
    ], 
    overview: `A MERN Stack Parts Procurement System, a web based application using MongoDB for the database, Express.js for the backend, ReactJs for the frontend, and Node.js for the server environment. Integrated with Tensorflow JS Node for predictive data analytics using JavaScript, enabling detailed analysis of procurement trends, and sales and expenses performance. Hosted online, the system enhances decision-making and operational efficiency.`,
    technologies: [
      { name: "MongoDB", icon: "/images/icons/mongodb-icon.svg" },
      { name: "Express", icon: "/images/icons/express.svg" },
      { name: "React", icon: "/images/icons/react.svg" },
      { name: "Node.js", icon: "/images/icons/nodejs-icon.svg" },
      { name: "TensorFlow", icon: "/images/icons/tensorflow.svg" },
    ],
    link: "https://capstoneproject-demo.netlify.app",
  },
  { 
    id: 5,
    title: "WakeNav: Navigation Alarm App",
    slug: "wakenav-navigation-alarm-app",
    role: "FullStack Developer",
    date: "July 2025",
    images: ["/images/wakenav.png"], 
    overview: "Wakenav, a location-based alarm app using Flutter to help travelers avoid missed stops. Leveraging GPS technology, it tracks real-time location and triggers an alarm when approaching a set destination, allowing users to relax or nap without worry.",
    technologies: [
      { name: "Flutter", icon: "/images/icons/flutter.svg" },
      { name: "Dart", icon: "/images/icons/dart.svg" },
      { name: "Leaflet", icon: "/images/icons/leaflet.svg" },
    ]
  },
]

// Utility function to create slug from title
export const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Remove special characters
    .replace(/\s+/g, '-')         // Replace spaces with hyphens
    .replace(/-+/g, '-')          // Replace multiple hyphens with single
    .trim()                       // Remove leading/trailing spaces
}

// Utility function to get project by slug
export const getProjectBySlug = (slug: string) => {
  return projectsData.find(project => project.slug === slug)
}

// Generate static params for static generation (optional)
export async function generateStaticParams() {
  return projectsData.map(project => ({
    slug: project.slug
  }))
}

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  
  // Find the project data based on the slug
  const project = getProjectBySlug(slug)
  
  // If project not found, show 404
  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <ProjectDetails data={project} />
    </main>
  )
}

// Metadata generation for SEO
export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  
  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.'
    }
  }

  return {
    title: `${project.title} - John Lorenz Portfolio`,
    description: project.overview.substring(0, 160) + '...',
    keywords: project.technologies.map(tech => tech.name).join(', '),
    openGraph: {
      title: project.title,
      description: project.overview.substring(0, 160) + '...',
      images: [project.images[0]], // Use first image as OG image
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.overview.substring(0, 160) + '...',
      images: [project.images[0]],
    }
  }
}