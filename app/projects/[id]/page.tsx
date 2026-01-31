import fs from 'fs'
import path from 'path'
import ProjectClient from './project-client'

export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
  ]
}

export default async function ProjectPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  let portraitImages: string[] = []
  
  // If this is the portraits project, read the directory
  if (params.id === '6') {
    const portraitsDir = path.join(process.cwd(), 'public', 'Portraits')
    if (fs.existsSync(portraitsDir)) {
      portraitImages = fs.readdirSync(portraitsDir)
        .filter(file => file.endsWith('.jpg'))
        .sort((a, b) => {
          const numA = parseInt(a)
          const numB = parseInt(b)
          if (!isNaN(numA) && !isNaN(numB)) {
            return numA - numB
          }
          return a.localeCompare(b)
        })
        .map(file => `/Portraits/${file}`)
    }
  }

  return <ProjectClient id={params.id} portraitImages={portraitImages} />
}
