'use client'

import React from "react"

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useLanguage } from '@/lib/language-context'

const projectsData: Record<string, {
  title: string
  location: string
  year: string
  summary: string
  description: string
  area: string
  architect: string
  images: string[]
}> = {
  '1': {
    title: 'DWELL IN MEMORY',
    location: 'Porto Santo, Portugal',
    year: '2023',
    summary: 'Drawing (in) Aridity. Idle Instances. An architectural thesis exploring the relationship between landscape, memory, and winemaking traditions on the island of Porto Santo.',
    description: 'This project documents an architectural proposal developed to deeply understand and reconnect with the nature of Porto Santo island. The design proposes a cooperative winery that links the local population with visitors, celebrating both the visit and the routine of traditional winemaking. The gravity winery follows the rhythm suggested by crocheted walls, stretching towards the sea and culminating in a courtyard sheltered by the dunes.',
    area: 'Architecture Thesis',
    architect: 'Bambou Hocepied',
    images: [
      '/project1-img1.jpg',
      '/project1-img2.jpg',
      '/project1-img3.jpg',
      '/project1-img4.jpg',
      '/project1-img5.jpg',
      '/project1-img6.jpg',
      '/project1-img7.jpg',
      '/project1-img8.jpg',
      '/project1-img9.jpg',
      '/project1-img10.jpg',
      '/project1-img11.jpg',
      '/project1-img12.jpg',
      '/project1-img13.jpg',
      '/project1-img14.jpg',
    ]
  },
  '2': {
    title: 'HANDBAG COLLECTION',
    location: 'Studio',
    year: '2024',
    summary: 'A handcrafted handbag made from cotton saree fabric sourced from India, featuring intricate geometric patterns and rich, vibrant colors.',
    description: 'A handcrafted handbag made from cotton saree fabric sourced from India, featuring intricate geometric patterns and rich, vibrant colors.',
    area: 'Limited Edition',
    architect: 'Bambou Hocepied',
    images: [
      '/project2-img1.jpg',
      '/project2-img3.jpg',
      '/project2-img4.jpg',
    ]
  },
  '3': {
    title: 'MINIMALIST STUDIO',
    location: 'Madrid',
    year: '2023',
    summary: 'A clean, minimalist workspace designed for creative professionals.',
    description: 'A thoughtfully designed studio space that prioritizes simplicity and functionality.',
    area: '150 m²',
    architect: 'Bambou Hocepied',
    images: ['/desert-sand-dunes.jpg']
  },
  '4': {
    title: 'FLEA MARKET',
    location: 'Brussels',
    year: '2025',
    summary: 'Event poster design for a community flea market featuring DJ sets, tattoos, upcycled jewelry, and more.',
    description: 'Creative poster design for a Brussels flea market event. The event features DJ sets, tattoos, upcycled jewelry, tooth gems, and second-hand clothes. A vibrant community gathering celebrating creativity and sustainability.',
    area: 'Event Design',
    architect: 'Bambou Hocepied',
    images: ['/project4-img1.png', '/project4-img2.jpg']
  },
  '5': {
    title: 'CALENDAR',
    location: 'Mexico',
    year: '2026',
    summary: 'A 2026 art calendar featuring photography by Dos Cabezas, showcasing vibrant imagery across 12 months.',
    description: 'An artistic 2026 calendar created in collaboration with Dos Cabezas. Each month features unique photography blending surreal compositions with Mexican landscapes and architecture. The calendar showcases creative use of color, light, and composition throughout the year.',
    area: 'Print Design',
    architect: 'Bambou Hocepied',
    images: [
      '/project5-img1.jpg',
      '/project5-img2.jpg',
      '/project5-img3.jpg',
      '/project5-img4.jpg',
      '/project5-img5.jpg',
      '/project5-img6.png',
      '/project5-img7.jpg',
      '/project5-img8.jpg',
      '/project5-img9.jpg',
      '/project5-img10.jpg',
      '/project5-img11.jpg',
      '/project5-img12.jpg',
      '/project5-img13.png',
      '/project5-cover.jpg',
    ]
  },
  '6': {
    title: 'PORTRAIT OF THE DAY',
    location: 'Various',
    year: '2024-2025',
    summary: 'A daily drawing practice spanning one full year, capturing 365 unique portraits.',
    description: 'For one year, I committed to creating a portrait every single day. This discipline resulted in 365 portraits, each one a unique exploration of the human face through various media and techniques. The project became a meditation on consistency, observation, and the infinite variety found in portraiture.',
    area: '365 Portraits',
    architect: 'Bambou Hocepied',
    images: [
      '/project6-cover.jpg',
      '/portrait-1.jpg',
      '/portrait-2.jpg',
      '/portrait-3.jpg',
      '/portrait-4.jpg',
      '/portrait-5.jpg',
      '/portrait-6.jpg',
      '/portrait-7.jpg',
      '/portrait-8.jpg',
      '/portrait-9.jpg',
      '/portrait-10.jpg',
      '/portrait-11.jpg',
      '/portrait-12.jpg',
      '/portrait-13.jpg',
      '/portrait-14.jpg',
      '/portrait-15.jpg',
      '/portrait-16.jpg',
      '/portrait-17.jpg',
      '/portrait-18.jpg',
      '/portrait-19.jpg',
      '/portrait-20.jpg',
    ]
  }
}

interface DroppedImage {
  id: number
  x: number
  y: number
  imageIndex: number
  floatOffsetX: number
  floatOffsetY: number
  rotation: number
}

export default function ProjectPage() {
  const params = useParams()
  const { language, setLanguage, t } = useLanguage()
  const [showInfo, setShowInfo] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [droppedImages, setDroppedImages] = useState<DroppedImage[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const lastDropTime = React.useRef(0)
  const imageIdCounter = React.useRef(0)
  
  const projectId = typeof params.id === 'string' ? params.id : '1'
  const project = projectsData[projectId] || projectsData['1']

  const openLightbox = (image: string, index: number) => {
    setLightboxImage(image)
    setLightboxIndex(index)
  }

  const closeLightbox = () => {
    setLightboxImage(null)
  }

  const goToNext = () => {
    const nextIndex = (lightboxIndex + 1) % project.images.length
    setLightboxIndex(nextIndex)
    setLightboxImage(project.images[nextIndex])
  }

  const goToPrev = () => {
    const prevIndex = (lightboxIndex - 1 + project.images.length) % project.images.length
    setLightboxIndex(prevIndex)
    setLightboxImage(project.images[prevIndex])
  }

  // Handle mouse movement for portrait gallery
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (projectId !== '6') return
    
    const now = Date.now()
    // Drop an image every 400ms of movement (slower, more spaced out like the example)
    if (now - lastDropTime.current < 400) return
    lastDropTime.current = now
    
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const newImage: DroppedImage = {
      id: imageIdCounter.current++,
      x,
      y,
      imageIndex: currentImageIndex,
      // Gentle floating movement
      floatOffsetX: (Math.random() - 0.5) * 12,
      floatOffsetY: (Math.random() - 0.5) * 12,
      // Slight random rotation
      rotation: (Math.random() - 0.5) * 4,
    }
    
    setDroppedImages(prev => [...prev, newImage])
    setCurrentImageIndex(prev => (prev + 1) % project.images.length)
    
    // Remove instantly after 3.5 seconds (no fade)
    setTimeout(() => {
      setDroppedImages(prev => prev.filter(img => img.id !== newImage.id))
    }, 3500)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxImage) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') goToNext()
      if (e.key === 'ArrowLeft') goToPrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxImage, lightboxIndex])

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar with Project Info */}
      <aside className="fixed left-0 top-0 bottom-0 w-80 border-r border-border p-12 flex flex-col">
        <h1 className="font-bold text-3xl tracking-tight mb-16">
          <a href="/" className="hover:opacity-70 transition-opacity">BAMBOU HOCEPIED</a>
        </h1>
        
        <div className="flex-1">
          <h2 className="font-normal text-xl mb-2 tracking-wide">{project.title}</h2>
          <p className="text-muted-foreground mb-4">{project.location}, {project.year}</p>
          
          <p className="text-sm leading-relaxed mb-6 text-foreground/80">{project.summary}</p>
          
          <button 
            onClick={() => setShowInfo(!showInfo)}
            className="text-lg mb-4 hover:opacity-70 transition-opacity text-left"
          >
            {showInfo ? `- ${t('project.info')}` : `+ ${t('project.info')}`}
          </button>
          
          {showInfo && (
            <div className="space-y-4 text-sm text-muted-foreground animate-in fade-in duration-200">
              <div>
                <p className="font-medium text-foreground mb-1">{t('project.description')}</p>
                <p className="leading-relaxed">{project.description}</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">{t('project.area')}</p>
                <p>{project.area}</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">{t('project.architect')}</p>
                <p>{project.architect}</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Navigation */}
        <nav className="space-y-2 text-sm uppercase tracking-wider">
          <a href="/" className="block hover:opacity-70 transition-opacity">{t('nav.projects')}</a>
          <a href="#" className="block hover:opacity-70 transition-opacity">{t('project.press')}</a>
          <a href="#" className="block hover:opacity-70 transition-opacity">{t('project.pavilion')}</a>
        </nav>
        
        <div className="mt-8 flex flex-col gap-2 text-xs text-muted-foreground tracking-widest">
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
          <a 
            href="mailto:bambouhocepied@gmail.com" 
            className="text-left hover:text-foreground transition-colors mt-4"
          >
            bambouhocepied@gmail.com
          </a>
        </div>
      </aside>

      {/* Main Content Area - Images */}
      <main className="ml-80 flex-1">
        {projectId === '6' ? (
          /* Interactive Mouse Trail Gallery for Portrait of the Day */
          <div 
            className="relative w-full h-screen overflow-hidden cursor-crosshair"
            onMouseMove={handleMouseMove}
          >
            {/* Dropped images that appear on mouse movement */}
            {droppedImages.map((img) => (
              <div
                key={img.id}
                className="absolute pointer-events-none animate-float"
                style={{
                  left: img.x,
                  top: img.y,
                  zIndex: img.id % 100,
                  ['--float-x' as string]: `${img.floatOffsetX}px`,
                  ['--float-y' as string]: `${img.floatOffsetY}px`,
                  ['--rotation' as string]: `${img.rotation}deg`,
                }}
              >
                <div className="relative w-52 h-72">
                  <Image
                    src={project.images[img.imageIndex] || "/placeholder.svg"}
                    alt={`Portrait ${img.imageIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="220px"
                  />
                </div>
              </div>
            ))}
            
            {/* VIEW ALL WORK link at bottom right - always above images */}
            <div className="absolute bottom-8 right-8 z-[200]">
              <a
                href="/projects/6/gallery"
                className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                View All Work
              </a>
            </div>
          </div>
        ) : projectId === '1' ? (
          /* Horizontal carousel for project 1 - stays within main content area */
          <div 
            className="h-screen overflow-x-auto overflow-y-hidden flex items-center scrollbar-hide"
            onWheel={(e) => {
              e.preventDefault()
              const container = e.currentTarget
              const scrollAmount = e.deltaY * 2
              
              container.scrollTo({
                left: container.scrollLeft + scrollAmount,
                behavior: 'smooth'
              })
              
              // Loop back to beginning when reaching the end
              setTimeout(() => {
                const maxScroll = container.scrollWidth - container.clientWidth
                if (container.scrollLeft >= maxScroll - 20) {
                  container.scrollTo({ left: 0, behavior: 'smooth' })
                }
              }, 100)
            }}
          >
            <div className="flex items-center gap-16 px-12 h-full">
              {project.images.map((image, index) => (
                <div 
                  key={index} 
                  className="relative flex-shrink-0 cursor-pointer"
                  style={{ height: '85vh', width: 'auto' }}
                  onClick={() => openLightbox(image, index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${project.title} - Image ${index + 1}`}
                    width={800}
                    height={1000}
                    className="h-full w-auto object-contain protected-image"
                    sizes="80vw"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Standard vertical layout for other projects */
          <div className="space-y-12">
            {project.images.map((image, index) => (
              <div 
                key={index} 
                className="relative w-full h-[70vh] px-8 cursor-zoom-in"
                onClick={() => openLightbox(image, index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${project.title} - Image ${index + 1}`}
                  fill
                  className="object-contain protected-image"
                  sizes="(min-width: 1024px) calc(100vw - 320px), 100vw"
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-muted-foreground hover:text-foreground text-2xl z-50 transition-colors"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-2xl z-50 transition-colors"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          {/* Next button */}
          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-2xl z-50 transition-colors"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          {/* Image */}
          <div 
            className="relative w-[70vw] h-[70vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxImage || "/placeholder.svg"}
              alt={`${project.title} - Enlarged view`}
              fill
              className="object-contain"
              sizes="70vw"
              priority
            />
          </div>

          {/* Image counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground text-sm tracking-wider">
            {lightboxIndex + 1} / {project.images.length}
          </div>
        </div>
      )}
    </div>
  )
}
