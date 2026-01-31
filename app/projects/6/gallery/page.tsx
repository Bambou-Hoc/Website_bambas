import fs from 'fs'
import path from 'path'
import PortraitGalleryClient from './gallery-client'

export default function PortraitGalleryPage() {
  const portraitsDir = path.join(process.cwd(), 'public', 'portraits')
  let images: string[] = []
  
  if (fs.existsSync(portraitsDir)) {
    images = fs.readdirSync(portraitsDir)
      .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .sort((a, b) => {
        const numA = parseInt(a)
        const numB = parseInt(b)
        if (!isNaN(numA) && !isNaN(numB)) {
          return numA - numB
        }
        return a.localeCompare(b)
      })
      .map(file => `/portraits/${file}`)
  }

  return <PortraitGalleryClient images={images} />
}
