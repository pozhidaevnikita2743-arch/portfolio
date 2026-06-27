export interface Project {
  id: string
  title: string
  description: string
  descriptionRu?: string
  tech: string[]
  github?: string
  githubBase: string
  live?: string
  image?: string
  previewPosition?: string   // CSS object-position, default 'top'
  featured?: boolean
  year: number
  category: ProjectCategory
}

export type ProjectCategory = 'commercial' | 'portfolio' | 'corporate'

export interface Skill {
  name: string
  level: number
  group: SkillGroup
}

export type SkillGroup = 'language' | 'framework' | 'tooling'
