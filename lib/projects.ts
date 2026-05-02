import { Project } from './types'

export const GITHUB_USER = 'pozhidaevnikita2743-arch'
export const GITHUB_BASE  = `https://github.com/${GITHUB_USER}`

export const projects: Project[] = [
  {
    id: 'oaklet-store',
    title: 'OAKLET Store',
    description: 'Clothing e-commerce catalog with cart, VK/Telegram order flow, filterable catalog, and product detail pages.',
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'CSS Modules'],
    github: 'oaklet-store-v2-',
    githubBase: GITHUB_BASE,
    live: 'https://oaklet-store.vercel.app',
    featured: true,
    year: 2025,
    category: 'commercial',
  },
  {
    id: 'kaltansky-modern',
    title: 'Kaltansky Modern',
    description: 'Modern-style website for a coal mining company. Clean layout, professional imagery, fully responsive.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'kaltansky-modern',
    githubBase: GITHUB_BASE,
    year: 2025,
    category: 'corporate',
  },
  {
    id: 'kaltansky-corporate',
    title: 'Kaltansky Corporate',
    description: 'Corporate-style website for the same coal mining company — distinct visual language from the modern version.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'kaltansky-corporate',
    githubBase: GITHUB_BASE,
    year: 2025,
    category: 'corporate',
  },
  {
    id: 'photo-site-3',
    title: 'Photo Site 3.0',
    description: 'Portfolio website for a photographer. Gallery-focused layout, full-bleed imagery, minimalist typography.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'photo-site-3.0',
    githubBase: GITHUB_BASE,
    year: 2025,
    category: 'portfolio',
  },
  {
    id: 'photo-site-multilang',
    title: 'Photo Site Multi-lang',
    description: 'Photographer portfolio in 3 languages — custom i18n implementation, no frameworks.',
    tech: ['HTML', 'CSS', 'JavaScript', 'i18n'],
    github: 'PHOTOSITE-on-3lng-2.0',
    githubBase: GITHUB_BASE,
    year: 2025,
    category: 'portfolio',
  },
  {
    id: 'dip-om-consult',
    title: 'Dip-om-consult',
    description: 'Website for a consulting company — services overview, contact form, clean business aesthetic.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'dip-om-consult',
    githubBase: GITHUB_BASE,
    year: 2025,
    category: 'commercial',
  },
]
