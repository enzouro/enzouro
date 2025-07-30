// app/projects/[slug]/page.tsx
import React from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import ProjectDetails from "@/components/project/ProjectDetails"
import { projectsData, getProjectBySlug } from "@/lib/project-data"

// Types
interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for static generation
export async function generateStaticParams() {
  return projectsData.map(project => ({
    slug: project.slug
  }))
}

// Main page component
export default async function ProjectPage(props: ProjectPageProps) {
  // Await the params Promise
  const params = await props.params
  const { slug } = params
  
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
export async function generateMetadata(props: ProjectPageProps): Promise<Metadata> {
  // Await the params Promise
  const params = await props.params
  const { slug } = params
  const project = getProjectBySlug(slug)
  
  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
      metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://enzouro.vercel.app' : 'http://localhost:3000'),
    }
  }

  const baseUrl = process.env.NODE_ENV === 'production' ? 'https://enzouro.vercel.app' : 'http://localhost:3000'

  return {
    title: `${project.title} - John Lorenz Portfolio`,
    description: project.overview.substring(0, 160) + (project.overview.length > 160 ? '...' : ''),
    keywords: project.technologies.map(tech => tech.name).join(', '),
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: project.title,
      description: project.overview.substring(0, 160) + (project.overview.length > 160 ? '...' : ''),
      images: [
        {
          url: project.images[0],
          width: 1200,
          height: 630,
          alt: project.title,
        }
      ],
      type: 'website',
      siteName: 'John Lorenz Portfolio',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.overview.substring(0, 160) + (project.overview.length > 160 ? '...' : ''),
      images: [project.images[0]],
    },
    alternates: {
      canonical: `/projects/${slug}`,
    },
  }
}