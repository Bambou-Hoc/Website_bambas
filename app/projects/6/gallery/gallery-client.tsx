'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useLanguage } from '@/lib/language-context'

export default function PortraitGalleryClient({ images }: { images: string[] }) {
  const { language, setLanguage, t } = useLanguage()
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  
  const portraits = images

  const openLightbox = (image: string, index: number) => {
    setLightboxImage(image)
    setLightboxIndex(index)
  }

  const closeLightbox = () => {
    setLightboxImage(null)
  }

  const goToNext = () => {
    const nextIndex = (lightboxIndex + 1) % portraits.length
    setLightboxIndex(nextIndex)
    setLightboxImage(portraits[nextIndex])
  }

  const goToPrev = () => {
    const prevIndex = (lightboxIndex - 1 + portraits.length) % portraits.length
    setLightboxIndex(prevIndex)
    setLightboxImage(portraits[prevIndex])
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Gallery Grid */}
      <main className="px-4 py-8 pb-20">
        <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-1">
          {portraits.map((image, index) => (
            <button
              key={index}
              onClick={() => openLightbox(image, index)}
              className="relative aspect-[3/4] overflow-hidden group"
              onContextMenu={(e) => e.preventDefault()}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Portrait ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105 select-none"
                sizes="(min-width: 1024px) 10vw, (min-width: 768px) 12.5vw, 20vw"
                unoptimized
                draggable={false}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </button>
          ))}
        </div>
      </main>

      {/* Back to Project link - fixed bottom right */}
      <div className="fixed bottom-8 right-8 z-20">
        <Link
          href="/projects/6"
          className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
        >
          Back to Project
        </Link>
      </div>

      {/* Lightbox Modal - transparent overlay showing faded grid behind */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
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

          <button
            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-2xl z-50 transition-colors"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-2xl z-50 transition-colors"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          <div 
            className="relative w-[70vw] h-[70vh]"
            onContextMenu={(e) => e.preventDefault()}
          >
            <Image
              src={lightboxImage || "/placeholder.svg"}
              alt="Portrait - Enlarged view"
              fill
              className="object-contain select-none"
              sizes="70vw"
              priority
              unoptimized
              draggable={false}
            />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground text-sm tracking-wider">
            {lightboxIndex + 1} / {portraits.length}
          </div>
        </div>
      )}
    </div>
  )
}