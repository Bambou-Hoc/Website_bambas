'use client'

import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from '@studio-freight/lenis'
import { useLanguage } from "@/lib/language-context"

export default function ProjectClient() {
  const { language, setLanguage, t } = useLanguage()
  const params = useParams()
  const id = params?.id
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis()

    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    // Refresh ScrollTrigger after a short delay to ensure layout is stable
    const stRefreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 100)

    // Parallax effect for columns
    const columns = document.querySelectorAll('.column')
    if (columns.length) {
      // Define different "drift" speeds for each column. Negative values move up, positive move down.
      const driftSpeeds = [-30, -90, 50, -120, 70]

      columns.forEach((col, i) => {
        const speed = driftSpeeds[i] ?? 0
        gsap.to(col, {
          y: speed,
          ease: "none",
          scrollTrigger: {
            trigger: ".wendy-grid",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
      })
    }

    // Subtle fade-in as images enter view
    gsap.utils.toArray(".item").forEach((item: any) => {
      gsap.from(item, {
        opacity: 0,
        y: 30,
        duration: 1.5,
        scrollTrigger: {
          trigger: item,
          start: "top 95%",
        }
      })
    })

    return () => {
      lenis.destroy()
      gsap.ticker.remove(ticker)
      ScrollTrigger.getAll().forEach(t => t.kill())
      clearTimeout(stRefreshTimeout)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      {/* Sidebar/Menu */}
      <aside className="fixed left-0 top-0 h-screen w-[250px] p-8 flex flex-col justify-between z-50 bg-[#FDFDFD]">
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
      <main className="ml-[250px] min-h-screen bg-[#FDFDFD] py-[10vh] px-[5vw]">
        {id !== '3' && (
        <div className="wendy-grid flex items-start gap-[6vw]">
          
          {/* Column 1 */}
          <div className="column flex-1 flex flex-col gap-[15vh]">
            <div className="item">
              <Image 
                src="/Watercolors/tiendas/tienda%2001.jpg" 
                alt="Tienda 01" 
                width={1200}
                height={1600}
                className="w-full h-auto block" 
              />
            </div>
          </div>

          {/* Column 2 */}
          <div className="column flex-1 flex flex-col gap-[15vh] mt-[20vh]">
            <div className="item">
              <Image 
                src="/Watercolors/tiendas/tienda%2002.jpg" 
                alt="Tienda 02" 
                width={1200}
                height={1600}
                className="w-full h-auto block" 
              />
            </div>
          </div>

          {/* Column 3 */}
          <div className="column flex-1 flex flex-col gap-[15vh] mt-[5vh]">
            <div className="item poetic-text text-center">
              <p className="text-sm uppercase tracking-widest text-gray-500 font-serif italic">BARCELONA, 2024</p>
            </div>
            <div className="item">
              <Image 
                src="/Watercolors/tiendas/tienda%2003.jpg" 
                alt="Tienda 03" 
                width={1200}
                height={1600}
                className="w-full h-auto block" 
              />
            </div>
          </div>

          {/* Column 4 */}
          <div className="column flex-1 flex flex-col gap-[15vh] mt-[25vh]">
            <div className="item">
              <Image 
                src="/Watercolors/tiendas/tienda%2004.jpg" 
                alt="Tienda 04" 
                width={1200}
                height={1600}
                className="w-full h-auto block" 
              />
            </div>
          </div>

          {/* Column 5 */}
          <div className="column flex-1 flex flex-col gap-[15vh] mt-[10vh]">
            <div className="item">
              <Image src="/Watercolors/tiendas/tienda%2001.jpg" alt="Tienda 01" width={1200} height={1600} className="w-full h-auto block opacity-60" />
            </div>
          </div>
        </div>
        )}

        {/* Taco Images Row */}
        {id === '3' && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 w-full my-8">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
            <div 
              key={index} 
              className="relative w-full"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={index === 6 ? `/Watercolors/comida/taco6.jpg?v=3` : `/Watercolors/comida/taco${index}.jpg`}
                alt={`Taco illustration ${index}`}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              {index === 1 && hoveredIndex === 1 && (
                <img
                  src="/Watercolors/comida/nombre%20comida/chilaquiles.png"
                  alt="Chilaquiles"
                  className="absolute top-0 right-0 w-[65%] h-auto object-contain z-10 pointer-events-none"
                />
              )}
              {index === 4 && hoveredIndex === 4 && (
                <img
                  src="/Watercolors/comida/nombre%20comida/tamales.png"
                  alt="Tamales"
                  className="absolute top-0 right-0 w-1/2 h-auto object-contain z-10 pointer-events-none"
                />
              )}
            </div>
          ))}
        </div>
        )}
      </main>
    </div>
  )
}