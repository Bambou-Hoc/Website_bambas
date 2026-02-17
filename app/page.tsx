'use client'

import React from "react"

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { projectsData } from '@/lib/projects-data'

function ProjectCard({ project }: { project: { id: number; title: string; images: string[]; objectPosition?: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
  }

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group relative aspect-[3/4] overflow-hidden"
    >
      <Image
        src={project.images[currentImageIndex] || "/placeholder.svg"}
        alt={project.title}
        fill
        className={`object-cover transition-transform duration-700 group-hover:scale-105 protected-image ${project.objectPosition === 'top' ? 'object-top' : ''}`}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      <div className="absolute top-3 right-3">
        <h3 className="text-background font-bold text-2xl tracking-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.title}
        </h3>
      </div>
      
      {/* Navigation arrows - only show if more than 1 image */}
      {project.images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-background opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={nextImage}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-background opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
          
          {/* Image indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.images.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-background' : 'bg-background/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </Link>
  )
}

export default function Home() {
  const { language, setLanguage, t } = useLanguage()
  
  const projects = [
    {
      id: 1,
      title: 'Dwell in Memory',
      images: projectsData['1'].images,
    },
    {
      id: 2,
      title: 'The Saree Tote',
      images: projectsData['2'].images,
    },
    {
      id: 3,
      title: 'Iconos mexicanos',
      images: projectsData['3'].images,
    },
    {
      id: 4,
      title: 'Tiendas',
      images: [
        '/Watercolors/tiendas/tienda%2001.jpg',
        '/Watercolors/tiendas/tienda%2002.jpg',
        '/Watercolors/tiendas/tienda%2003.jpg',
        '/Watercolors/tiendas/tienda%2004.jpg',
      ],
      objectPosition: 'top',
    },
    {
      id: 5,
      title: 'Calendar',
      images: projectsData['5'].images,
      objectPosition: 'top',
    },
    {
      id: 6,
      title: 'Portrait of the Day',
      images: projectsData['6'].images,
    },
    {
      id: 7,
      title: projectsData['7'].title || 'Project 7',
      images: projectsData['7'].images,
    },
    {
      id: 8,
      title: projectsData['8'].title || 'Project 8',
      images: projectsData['8'].images,
    },
  ]

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault()
    const projectsSection = document.getElementById('projects')
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Side Navigation */}
      <aside className="fixed left-0 top-0 h-screen w-64 p-8 flex flex-col justify-between z-50 bg-background">
        <div>
          <Link href="/" className="block mb-16">
            <h1 className="text-3xl font-bold tracking-tight">
              BAMBOU HOCEPIED
            </h1>
          </Link>
          
          <nav className="flex flex-col gap-4 mt-12">
            <Link 
              href="/about" 
              className="text-foreground hover:text-muted-foreground transition-colors uppercase text-sm tracking-widest"
            >
              {t('nav.about')}
            </Link>
            <a 
              href="/#projects" 
              onClick={scrollToProjects}
              className="text-foreground hover:text-muted-foreground transition-colors uppercase text-sm tracking-widest cursor-pointer"
            >
              {t('nav.projects')}
            </a>
            <Link 
              href="/contact" 
              className="text-foreground hover:text-muted-foreground transition-colors uppercase text-sm tracking-widest"
            >
              {t('nav.contact')}
            </Link>
          </nav>
        </div>
        
        <div className="flex flex-col gap-2 text-xs text-muted-foreground tracking-widest">
          <button 
            onClick={() => setLanguage('en')}
            className={`text-left hover:text-foreground transition-colors ${language === 'en' ? 'text-foreground' : ''}`}
          >
            EN
          </button>
          <button 
            onClick={() => setLanguage('es')}
            className={`text-left hover:text-foreground transition-colors ${language === 'es' ? 'text-foreground' : ''}`}
          >
            ES
          </button>
          <button 
            onClick={() => setLanguage('pt')}
            className={`text-left hover:text-foreground transition-colors ${language === 'pt' ? 'text-foreground' : ''}`}
          >
            PT
          </button>
          <p className="text-left mt-4 text-xs text-muted-foreground leading-tight transform origin-left" style={{ transform: 'scale(0.6)' }}>
            © 2026 Bambou Hocepied. All Rights Reserved. Designed &amp; Built by Bambou Hocepied
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64">
        {/* Hero Section with Full Screen Image */}
        <section className="h-screen relative">
          <div className="relative h-full ml-14 mr-0">
            <Image
              src="/hero-image.jpg"
              alt="Featured Project"
              fill
              className="object-cover object-right protected-image"
              priority
            />
          </div>
        </section>

        {/* Projects Grid */}
        <section id="projects" className="py-16 px-14 flex justify-end">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-[70%]">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
