'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { projectsData } from '@/lib/projects-data'

export default function GalleryPage() {
  const params = useParams()
  const id = params?.id as string
  const project = projectsData[id]

  if (!project) return <div className="p-12">Project not found</div>

  const isProject6 = id === '6'

  return (
    <div className="min-h-screen bg-background">
      <div className="p-8 md:p-12 flex justify-between items-center sticky top-0 bg-background/90 backdrop-blur-sm z-50">
        <div>
          <h1 className="font-bold text-xl md:text-2xl tracking-tight uppercase">{project.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">Gallery</p>
        </div>
        <Link 
          href={`/projects/${id}`}
          className="text-sm uppercase tracking-widest hover:opacity-70 transition-opacity"
        >
          Close
        </Link>
      </div>
      
      <div className={isProject6 ? "" : "px-8 md:px-12 pb-12"}>
        <div className={isProject6 ? "grid grid-cols-5 gap-[100px] px-[150px] py-[100px]" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"}>
          {project.images.map((image, index) => (
            <div key={index} className={isProject6 ? "p-[40px]" : ""}>
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${project.title} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}