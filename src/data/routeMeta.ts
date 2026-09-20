import { caseStudies } from './caseStudies'

export const BASE_URL = 'https://www.usmanfarooqi.com'
export const DEFAULT_OG_IMAGE = `${BASE_URL}/images/og-default.jpg`

export interface RouteMeta {
  path: string
  title: string
  description: string
  ogType: 'website' | 'article'
  ogImage: string
  ogImageDimensions?: {
    width: number
    height: number
  }
}

const DEFAULT_OG_IMAGE_DIMENSIONS = { width: 1200, height: 630 }

function absImage(src: string): string {
  return src.startsWith('http') ? src : `${BASE_URL}${src}`
}

const staticRoutes: RouteMeta[] = [
  {
    path: '/',
    title: 'Usman Zahid Farooqi — Senior Product Designer & UI/UX Lead',
    description:
      'Senior Product Designer specialising in SaaS, AI products, design systems, and complex digital experiences. Explore selected product design and UX/UI case studies.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    ogImageDimensions: DEFAULT_OG_IMAGE_DIMENSIONS,
  },
  {
    path: '/about',
    title: 'About — Usman Zahid Farooqi | Senior Product Designer',
    description:
      'Learn about Usman Zahid Farooqi — Senior Product Designer with 18+ years of experience in SaaS, AI products, PropTech, FinTech, and complex digital experiences. Based in Lahore, Pakistan.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    ogImageDimensions: DEFAULT_OG_IMAGE_DIMENSIONS,
  },
  {
    path: '/contact',
    title: 'Contact — Usman Zahid Farooqi | Senior Product Designer',
    description:
      'Get in touch with Usman Zahid Farooqi — open to senior product design roles, selected collaborations, and conversations about AI-powered products and design systems.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    ogImageDimensions: DEFAULT_OG_IMAGE_DIMENSIONS,
  },
  {
    path: '/work',
    title: 'Work — All Projects | Usman Zahid Farooqi',
    description:
      'Complete portfolio of product design, design systems, web, and visual & editorial work by Usman Zahid Farooqi — beyond the curated homepage shortlist.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    ogImageDimensions: DEFAULT_OG_IMAGE_DIMENSIONS,
  },
]

const caseStudyRoutes: RouteMeta[] = caseStudies.map((cs) => ({
  path: cs.slug === 'wanderly-ai-travel-planner' ? '/work/wanderly' : `/case-studies/${cs.slug}`,
  title: `${cs.title} — ${cs.subtitle} | Usman Zahid Farooqi`,
  description: cs.description,
  ogType: 'article' as const,
  ogImage: absImage(cs.heroImage),
}))

export const routeMeta: RouteMeta[] = [...staticRoutes, ...caseStudyRoutes]

export function getRouteMeta(path: string): RouteMeta | undefined {
  return routeMeta.find((r) => r.path === path)
}

export const homeRouteMeta = staticRoutes[0]
