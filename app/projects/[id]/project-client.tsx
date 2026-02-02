'use client'

import React from "react"
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/lib/language-context'
import { projectsData } from '@/lib/projects-data'
import CalendarBook from './calendar-book'

interface DroppedImage {
  id: number
  x: number
  y: number
  imageIndex: number
  floatOffsetX: number
  floatOffsetY: number
  rotation: number
}

export default function ProjectClient({ id, portraitImages }: { id: string, portraitImages?: string[] }) {
  const { language, setLanguage, t } = useLanguage()
  const [showInfo, setShowInfo] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [droppedImages, setDroppedImages] = useState<DroppedImage[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const lastDropTime = React.useRef(0)
  const imageIdCounter = React.useRef(0)
  
  const projectId = id
  const rawProject = projectsData[projectId] || projectsData['1']

  // Create a derived project object to avoid mutating the global constant
  const project = {
    ...rawProject,
    images: (projectId === '6' && portraitImages && portraitImages.length > 0) 
      ? portraitImages 
      : (projectId === '5')
      ? rawProject.images.slice(1)
      : rawProject.images
  }

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

  // Randomize the starting image so you don't always see the first ones
  useEffect(() => {
    if (projectId === '6') {
      setCurrentImageIndex(Math.floor(Math.random() * project.images.length))
    } else {
      setCurrentImageIndex(0)
    }
  }, [projectId, project.images.length])

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
      <aside className="fixed left-0 top-0 bottom-0 w-80 border-r border-border p-12 flex flex-col overflow-y-auto scrollbar-hide">
        <h1 className="font-bold text-3xl tracking-tight mb-16">
          <a href="/" className="hover:opacity-70 transition-opacity">BAMBOU HOCEPIED</a>
        </h1>
        
        <div className="flex-1">
          <h2 className="font-bold text-xl mb-2 tracking-wide">{project.title}</h2>
          {projectId === '2' && (
            <h3 className="font-normal text-lg mb-2 tracking-wide text-muted-foreground">Textile Study 01</h3>
          )}
          {projectId !== '2' && (
            <p className="text-muted-foreground mb-4">{project.location}, {project.year}</p>
          )}
          
          <p className="text-sm leading-relaxed mb-6 text-foreground/80 text-justify">{project.summary}</p>
          
          {projectId === '2' ? (
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground mb-1">Project Type</p>
                <p>One-of-a-Kind / Personal Study</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Year</p>
                <p>2025</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Designer/Maker</p>
                <p>Bambou Hocepied</p>
              </div>
            </div>
          ) : projectId === '5' ? (
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>On desktop? <span className="font-bold">Hover to listen.</span></p>
              <div>
                <p className="font-medium text-foreground mb-1">Designers</p>
                <p>Bambou Hocepied</p>
                <p>Lucia Hagerman</p>
              </div>
            </div>
          ) : (
            <>
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
                    <p className="leading-relaxed text-justify">{project.description}</p>
                  </div>
                  {projectId !== '6' && (
                    <>
                      <div>
                        <p className="font-medium text-foreground mb-1">{t('project.area')}</p>
                        <p>{project.area}</p>
                      </div>
                      <div>
                        <p className="font-medium text-foreground mb-1">{t('project.architect')}</p>
                        <p>{project.architect}</p>
                      </div>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Navigation */}
        <nav className="space-y-2 text-sm uppercase tracking-wider mt-8">
          <a href="/" className="block hover:opacity-70 transition-opacity">{t('nav.projects')}</a>
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
          {/* Email removed from project pages secondary menu */}
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
                  ['--float-x']: `${img.floatOffsetX}px`,
                  ['--float-y']: `${img.floatOffsetY}px`,
                  ['--rotation']: `${img.rotation}deg`,
                }}
              >
                <div className="relative w-52 h-72">
                  <Image
                    src={project.images[img.imageIndex] || "/placeholder.svg"}
                    alt={`Portrait ${img.imageIndex + 1}`}
                    fill
                    className="object-cover select-none"
                    sizes="220px"
                    unoptimized
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
              </div>
            ))}
            
            {/* VIEW ALL WORK link at bottom right - always above images */}
            <div className="absolute bottom-8 right-8 z-[200]">
              <Link
                href="/projects/6/gallery"
                className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                View All Work
              </Link>
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
                    className="h-full w-auto object-contain protected-image select-none"
                    sizes="80vw"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : projectId === '5' ? (
          /* Single image view for Project 5 (Calendar) - Click to advance */
          <div 
            className="h-screen w-full flex items-center justify-center p-4 md:p-12 bg-background overflow-hidden"
          >
            <CalendarBook />
          </div>
        ) : projectId === '2' ? (
          /* Vertical layout for project 2 - Same width (full width) */
          <div className="space-y-12 px-8 md:px-24 pb-12">
            {project.images.map((image, index) => (
              <div 
                key={index} 
                className="relative w-full max-w-[70%] mx-auto"
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${project.title} - Image ${index + 1}`}
                  width={1200}
                  height={800}
                  className="w-full h-auto protected-image select-none"
                  sizes="(min-width: 1024px) calc(100vw - 320px), 100vw"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
            ))}
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
                  className="object-contain protected-image select-none"
                  sizes="(min-width: 1024px) calc(100vw - 320px), 100vw"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
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
          >
            <Image
              src={lightboxImage || "/placeholder.svg"}
              alt={`${project.title} - Enlarged view`}
              fill
              className="object-contain select-none"
              sizes="70vw"
              priority
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
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