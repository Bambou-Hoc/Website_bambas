'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'

const images = [
  '/Watercolors/tiendas/tienda%2001.jpg',
  '/Watercolors/tiendas/tienda%2002.jpg',
  '/Watercolors/tiendas/tienda%2003.jpg',
  '/Watercolors/tiendas/tienda%2004.jpg',
]

export default function ProjectFourClient() {
  const { t, language, setLanguage } = useLanguage()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  // Initialize stack with random positions
  const [stack, setStack] = useState<{id: number, src: string, rotation: number, x: number, y: number}[]>([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Initial random-ish rotations matching your snippet
    setStack(images.map((src, i) => ({
      id: i,
      src,
      rotation: i === 0 ? -3 : i === 1 ? 2 : i === 2 ? -1 : 4,
      x: i === 0 ? -5 : i === 1 ? 5 : i === 2 ? 2 : -2,
      y: i === 0 ? -5 : i === 1 ? 2 : i === 2 ? 8 : -3,
    })))
    setIsMounted(true)
  }, [])
  
  const [isAnimating, setIsAnimating] = useState(false)
  const [exitingId, setExitingId] = useState<number | null>(null)

  const rotateImages = () => {
    if (isAnimating || stack.length === 0) return
    setIsAnimating(true)

    // The top image is the last one in the array
    const topImage = stack[stack.length - 1]
    setExitingId(topImage.id)

    setTimeout(() => {
      // Move top to bottom
      setStack(prev => {
        const newStack = [...prev]
        const moved = newStack.pop()!
        
        // Give it new random coordinates for when it reappears at the bottom
        moved.rotation = Math.floor(Math.random() * 10) - 5
        moved.x = Math.floor(Math.random() * 10) - 5
        moved.y = Math.floor(Math.random() * 10) - 5
        
        return [moved, ...newStack]
      })
      setExitingId(null)
      setIsAnimating(false)
    }, 600)
  }

  if (!isMounted) return null

  return (
    <div className="min-h-screen bg-[#f0f0f0] flex flex-col items-center justify-center overflow-hidden">
       {/* Sidebar/Menu */}
       <aside className="fixed left-0 top-0 h-screen w-[250px] p-8 flex flex-col justify-between z-50 pointer-events-none md:pointer-events-auto hidden md:flex">
        <div>
          <Link href="/" className="block mb-16 pointer-events-auto">
            <h1 className="text-3xl font-bold tracking-tight">
              BAMBOU HOCEPIED
            </h1>
          </Link>
          
          <nav className="flex flex-col gap-4 mt-12 pointer-events-auto">
            <Link 
              href="/about" 
              className="text-foreground hover:text-muted-foreground transition-colors uppercase text-sm tracking-widest"
            >
              {t('nav.about')}
            </Link>
            <Link 
              href="/#projects" 
              className="text-foreground hover:text-muted-foreground transition-colors uppercase text-sm tracking-widest"
            >
              {t('nav.projects')}
            </Link>
            <Link 
              href="/contact" 
              className="text-foreground hover:text-muted-foreground transition-colors uppercase text-sm tracking-widest"
            >
              {t('nav.contact')}
            </Link>
          </nav>
        </div>
        
        <div className="flex flex-col gap-2 text-xs text-muted-foreground tracking-widest pointer-events-auto">
          <button onClick={() => setLanguage('en')} className={`text-left hover:text-foreground transition-colors ${language === 'en' ? 'text-foreground' : ''}`}>EN</button>
          <button onClick={() => setLanguage('es')} className={`text-left hover:text-foreground transition-colors ${language === 'es' ? 'text-foreground' : ''}`}>ES</button>
          <button onClick={() => setLanguage('pt')} className={`text-left hover:text-foreground transition-colors ${language === 'pt' ? 'text-foreground' : ''}`}>PT</button>
          <p className="text-left mt-4 text-xs text-muted-foreground leading-tight transform origin-left" style={{ transform: 'scale(0.6)' }}>© 2026 Bambou Hocepied. All Rights Reserved. Designed &amp; Built by Bambou Hocepied</p>
        </div>
      </aside>

      <div 
        className="grid place-items-center w-full h-[80vh] perspective-[1000px] cursor-pointer"
        onClick={rotateImages}
      >
        {stack.map((img, index) => {
          const isExiting = img.id === exitingId
          
          return (
            <div
              key={img.id}
              className={`col-start-1 row-start-1 transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] select-none ${isExiting ? 'opacity-0' : 'opacity-100'}`}
              style={{
                transform: isExiting 
                  ? 'translateX(150%) rotate(20deg)' 
                  : `rotate(${img.rotation}deg) translate(${img.x}px, ${img.y}px)`,
                zIndex: index
              }}
            >
              <img
                src={img.src}
                alt={`Stack image ${img.id}`}
                className="block max-w-[80vw] md:max-w-[600px] max-h-[60vh] w-auto h-auto bg-white shadow-[-10px_10px_20px_rgba(0,0,0,0.1)] pointer-events-none"
              />
            </div>
          )
        })}
      </div>
      {/* Taco Images Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 w-full my-8 px-8">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
          <div
            key={index}
            className="relative w-full"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={`/Watercolors/comida/taco${index}.jpg`}
              alt={`Taco illustration ${index}`}
              className="w-full h-auto object-cover"
            />

            {/* Hover-only overlay for taco1 (index 1) */}
            {index === 1 && hoveredIndex === 1 && (
              <img
                src={'/Watercolors/comida/nombre%20comida/chilaquiles.png'}
                alt="Chilaquiles"
                className="absolute right-2 top-2 w-24 h-24 object-contain pointer-events-none z-10 drop-shadow-lg"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}