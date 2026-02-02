import { projectsData } from '@/lib/projects-data'
import ProjectClient from './project-client'

export function generateStaticParams() {
  return Object.keys(projectsData).map((id) => ({
    id,
  }))
}

export default async function ProjectPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  return <ProjectClient id={params.id} />
}