'use client'

import React, { useState, useRef, useEffect } from 'react'

interface PortraitImage {
  src: string
  alt: string;
  qrCoordinates?: { top: string; left: string }
  audioSrc?: string
}

const portraitImages: PortraitImage[] = [
  {
    src: '/Calendário/calendario__00PORTADA.png',
    alt: 'Portada',
  },
  {
    src: '/Calendário/calendario__01Enero.png',
    alt: 'Enero',
    qrCoordinates: { top: '64.5%', left: '50.5%' },
    audioSrc: '/Calendário/musicas/cristo redentor.mp3'
  },
  {
    src: '/Calendário/calendario__02February.png',
    alt: 'Febrero',
    qrCoordinates: { top: '77.3%', left: '80.0%' },
    audioSrc: '/Calendário/musicas/more women.mp3'
  },
  {
    src: '/Calendário/calendario__03Marzo.png',
    alt: 'Marzo',
    qrCoordinates: { top: '96.8%', left: '15%' },
    audioSrc: '/Calendário/musicas/post industrial boys.mp3'
  },
  {
    src: '/Calendário/calendario__04Abril.png',
    alt: 'Abril',
    qrCoordinates: { top: '64.3%', left: '90.0%' },
    audioSrc: '/Calendário/musicas/the ghost song.mp3'
  },
  {
    src: '/Calendário/calendario__05Maio.png',
    alt: 'Mayo',
    qrCoordinates: { top: '83.7%', left: '41.0%' },
    audioSrc: '/Calendário/musicas/speed racer.mp3'
  },
  {
    src: '/Calendário/calendario__06June.png',
    alt: 'Junio',
    qrCoordinates: { top: '70.8%', left: '40.8%' },
    audioSrc: '/Calendário/musicas/too easy.mp3'
  },
  {
    src: '/Calendário/calendario__07July.png',
    alt: 'Julio',
    qrCoordinates: { top: '77.2%', left: '93.6%' },
    audioSrc: '/Calendário/musicas/cool breeze.mp3'
  },
  {
    src: '/Calendário/calendario__08Agosto.png',
    alt: 'Agosto',
    qrCoordinates: { top: '90.0%', left: '40.9%' },
    audioSrc: '/Calendário/musicas/no caminho do bem.mp3'
  },
  {
    src: '/Calendário/calendario__09September.png',
    alt: 'Septiembre',
    qrCoordinates: { top: '64.6%', left: '24.9%' },
    audioSrc: '/Calendário/musicas/himalaya.mp3'
  },
  {
    src: '/Calendário/calendario__10October.png',
    alt: 'Octubre',
    qrCoordinates: { top: '64.5%', left: '77.2%' },
    audioSrc: '/Calendário/musicas/sogno di monica.mp3'
  },
  {
    src: '/Calendário/calendario__11November.png',
    alt: 'Noviembre',
    qrCoordinates: { top: '90.0%', left: '80.5%' },
    audioSrc: "/Calendário/musicas/can't do a thing.mp3"
  },
  {
    src: '/Calendário/calendario__12December.png',
    alt: 'Diciembre',
    qrCoordinates: { top: '64.6%', left: '64.3%' },
    audioSrc: '/Calendário/musicas/possorinhos.mp3'
  },
  {
    src: '/Calendário/calendario__13 Portada Final.png',
    alt: 'Portada Final',
  },
]

export default function CalendarBook() {
  const [currentSong, setCurrentSong] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fadeIntervalRef = useRef<any>(null)

  const toggleAudio = (src: string) => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current)
      fadeIntervalRef.current = null
    }

    if (!audioRef.current) {
      audioRef.current = new Audio(src)
    }

    if (currentSong === src) {
      if (isPlaying) {
        const audio = audioRef.current
        fadeIntervalRef.current = setInterval(() => {
          if (audio.volume > 0.1) {
            audio.volume -= 0.1
          } else {
            if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
            audio.pause()
            audio.volume = 1
          }
        }, 50)
        setIsPlaying(false)
      } else {
        audioRef.current.volume = 1
        audioRef.current.play()
        setIsPlaying(true)
      }
    } else {
      if (isPlaying) {
        audioRef.current.pause()
      }
      audioRef.current = new Audio(src)
      audioRef.current.play()
      setCurrentSong(src)
      setIsPlaying(true)
      
      audioRef.current.onended = () => setIsPlaying(false)
    }
  }

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [])

  const handleNavigation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current)
      fadeIntervalRef.current = null
    }

    // Pause audio when changing pages
    if (audioRef.current) {
      if (isPlaying) {
        const audio = audioRef.current
        fadeIntervalRef.current = setInterval(() => {
          if (audio.volume > 0.1) {
            audio.volume -= 0.1
          } else {
            if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
            audio.pause()
            audio.volume = 1
          }
        }, 50)
      } else {
        audioRef.current.pause()
      }
      setIsPlaying(false)
    }

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left

    if (x > rect.width / 2) {
      setCurrentIndex((prev) => (prev + 1) % portraitImages.length)
    } else {
      setCurrentIndex((prev) => (prev - 1 + portraitImages.length) % portraitImages.length)
    }
  }

  const currentImage = portraitImages[currentIndex]

  return (
    <div 
      className="relative h-full w-full flex items-center justify-center cursor-pointer"
      onClick={handleNavigation}
    >
      <div className="relative inline-block group/image">
        <img 
          src={currentImage.src} 
          alt={currentImage.alt} 
          className="max-h-[85vh] max-w-[90vw] w-auto h-auto object-contain select-none shadow-xl block"
        />
        
        {currentImage.qrCoordinates && currentImage.audioSrc && (
          <div
            className="absolute w-16 h-16 -ml-8 -mt-8 z-50 group cursor-pointer flex items-center justify-center"
            style={{ top: currentImage.qrCoordinates.top, left: currentImage.qrCoordinates.left }}
            onClick={(e) => {
              e.stopPropagation()
              toggleAudio(currentImage.audioSrc!)
            }}
          >
            <div 
              className={`
                w-9 h-9 flex items-center justify-center drop-shadow-md
                transition-all duration-500 ease-out
                ${
                  currentSong === currentImage.audioSrc && isPlaying 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-75 group-hover/image:opacity-100 group-hover/image:scale-100'
                }
              `}
            >
              {currentSong === currentImage.audioSrc && isPlaying ? (
                <div className="flex gap-1">
                  <div className="w-1 h-3 bg-black rounded-full"></div>
                  <div className="w-1 h-3 bg-black rounded-full"></div>
                </div>
              ) : (
                <div className="w-0 h-0 border-l-[8px] border-l-black border-y-[5px] border-y-transparent ml-1"></div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground tracking-widest uppercase bg-white/50 px-2 py-1 rounded-full backdrop-blur-sm">
        {currentIndex + 1} / {portraitImages.length}
      </div>
    </div>
  )
}