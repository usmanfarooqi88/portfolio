export interface Project {
  id: string
  /** Internal / legacy title */
  title: string
  /** Recruiter-facing card title (falls back to title) */
  displayTitle?: string
  category: string
  tags: string[]
  description: string
  /** One concise product problem / value / scope line for evidence cards */
  productStatement?: string
  /** e.g. Shipped, Prototype, Concept — only when documented */
  status?: string
  role?: string
  year?: string
  /** Platform or team context — keep short */
  context?: string
  /** One verified proof / scope line — omit when unverified */
  proofPoint?: string
  /** Shared ecosystem id (e.g. happytenant) for related-product cue */
  ecosystem?: string
  ecosystemLabel?: string
  caseStudyHref?: string
  caseStudySlug?: string
  embedUrl?: string
  figmaUrl?: string
  externalUrl?: string
  image: string
  /** Optional looping WebM thumbnail for project cards (muted, autoplay). Poster/fallback remains `image`. */
  video?: string
  /** @deprecated Prefer FEATURED_PRODUCT_IDS — kept for filter compatibility */
  featured: boolean
}

/** Local fallback thumbnail: public/images/projects/{id}_1x.webp */
export function projectImagePath(id: string): string {
  const filename = `${id.replace(/-/g, '_')}_1x.webp`
  return `/images/projects/${filename}`
}

export const projects: Project[] = [
  {
    id: 'heard-app',
    title: 'Heard Mobile App',
    displayTitle: 'Heard — Cross-platform Restaurant Product',
    category: 'SaaS',
    tags: ['Hospitality', 'SaaS', 'Product'],
    description:
      'A mobile app experience designed with a clean, accessible, and user-friendly interface.',
    productStatement:
      'Multi-mode restaurant ordering — delivery, pickup, and table order — with shared checkout patterns and engineering handoff.',
    role: 'Product Designer',
    year: '2021–2023',
    context: 'Frontier Labs · iOS & Android · with PM & engineers',
    proofPoint: '3 fulfillment modes · shared order pipeline · Figma + Zeplin handoff',
    caseStudySlug: 'heard-mobile-app',
    externalUrl: 'https://www.behance.net/gallery/164092641/Heard-App',
    image: projectImagePath('heard-app'),
    video: '/images/projects/Heard_app_ordering.webm',
    featured: true,
  },
  {
    id: 'skrewww',
    title: 'Skrewww Design System',
    displayTitle: 'Skrewww — AI-First Design System',
    category: 'Design System',
    tags: ['AI', 'SaaS', 'Design Systems'],
    description:
      'An AI-first design-system foundation connecting Figma, tokens, components, and React.',
    productStatement:
      'AI-first design-system foundation connecting Figma variables, components, documentation, and React implementation.',
    status: 'Live',
    role: 'Founder / Design Systems Designer',
    context: 'Figma ↔ tokens ↔ React',
    // Counts omitted from card — see case study for verified public scope
    caseStudySlug: 'skrewww-design-system',
    externalUrl: 'https://skrewww.com',
    image: projectImagePath('skrewww'),
    video: '/images/projects/skrewww.webm',
    featured: true,
  },
  {
    id: 'wanderly',
    title: 'Wanderly — AI Travel Planner',
    displayTitle: 'Wanderly — AI Travel Planner',
    category: 'AI Product',
    tags: ['Travel', 'AI'],
    description:
      'An AI-powered travel planning app focused on itinerary creation, discovery, and smooth user journeys.',
    productStatement:
      'AI-assisted travel planning that turns travel intent into structured, comparable trip experiences.',
    status: 'Prototype / Product Design',
    role: 'Product Designer',
    year: 'Freelance Project',
    context: 'Mobile · 20-day design case · 4 sprints',
    caseStudyHref: '/work/wanderly',
    externalUrl: 'https://www.behance.net/gallery/243279399/Wanderly-AI-Travel-Planner-App-UXUI',
    image: projectImagePath('wanderly'),
    video: '/images/projects/wanderly.webm',
    featured: true,
  },
  {
    id: 'nhr-hotels',
    title: 'NHR Hotels App',
    displayTitle: 'NHR',
    category: 'Hospitality',
    tags: ['Travel', 'Hospitality'],
    description:
      'A hospitality guest experience that makes dining discovery and booking feel as primary as the stay.',
    productStatement:
      'Nozul hospitality mobile app for dining discovery, table and event booking, and stay reservations.',
    role: 'Product Designer',
    year: 'Freelance Project',
    caseStudySlug: 'nhr',
    embedUrl:
      'https://embed.figma.com/proto/B645e7Kn52Sbw0d1KCQVpe/Nozul-Hotel-and-Resorts?node-id=1253-2266&viewport=300%2C142%2C0.1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1253%3A2266&page-id=0%3A1&embed-host=share',
    figmaUrl: 'https://www.figma.com/proto/B645e7Kn52Sbw0d1KCQVpe/',
    image: projectImagePath('nhr-hotels'),
    video: '/images/projects/NHR_mobile_app.webm',
    featured: true,
  },
  {
    id: 'heard-pos',
    title: 'Heard POS Handheld App',
    category: 'Food',
    tags: ['Hospitality', 'SaaS'],
    description: 'A handheld POS interface designed for fast restaurant/service workflows.',
    role: 'Product Designer',
    context: 'Frontier Labs',
    embedUrl:
      'https://embed.figma.com/proto/bgi8xnhJ9EyTdZZraMxyxD/Heard-POS---Handheld-design?node-id=2-5141&p=f&viewport=483%2C319%2C0.06&scaling=scale-down&content-scaling=fixed&starting-point-node-id=3%3A1717&page-id=2%3A1059&embed-host=share',
    figmaUrl: 'https://www.figma.com/proto/bgi8xnhJ9EyTdZZraMxyxD/',
    image: projectImagePath('heard-pos'),
    featured: false,
  },
  {
    id: 'danat-behavior',
    title: 'Danat Behavior App',
    displayTitle: 'Danat Behaviors — Behavior & Rewards',
    category: 'HealthTech',
    tags: ['Services', 'Product'],
    description:
      'A mobile ecosystem that turns activities and challenges into progress, Danat points, recognition and redeemable rewards.',
    productStatement:
      'Zero-to-one mobile experience connecting challenges, points, recognition and partner rewards.',
    role: 'Product Designer',
    year: 'Freelance Project',
    caseStudySlug: 'danat-behaviors',
    embedUrl:
      'https://embed.figma.com/proto/8EHDksjpGgM5QOAdvhxCEi/Danat-Behaviors--Shareable-?node-id=99-2104&p=f&viewport=276%2C125%2C0.03&scaling=scale-down&content-scaling=fixed&starting-point-node-id=99%3A2103&page-id=0%3A1&embed-host=share',
    figmaUrl: 'https://www.figma.com/proto/8EHDksjpGgM5QOAdvhxCEi/',
    image: projectImagePath('danat-behavior'),
    video: '/images/projects/danat.webm',
    featured: true,
  },
  {
    id: 'happytenant-tenant',
    title: 'HappyTenant Tenant App',
    displayTitle: 'HappyTenant — Tenant Experience',
    category: 'PropTech',
    tags: ['SaaS', 'PropTech'],
    description:
      'A tenant-focused property management app for requests, communication, payments, and service workflows.',
    productStatement:
      'Tenant self-service for property workflows, maintenance, documents, and day-to-day communication.',
    role: 'Product Designer',
    year: '2024–2026',
    context: 'LAVA Brands',
    ecosystem: 'happytenant',
    ecosystemLabel: 'HappyTenant ecosystem · Tenant',
    caseStudySlug: 'happytenant-tenant-experience',
    embedUrl:
      'https://embed.figma.com/proto/zdt9Yi8B8XQ4teVHnWL21F/Happy-Tenant-Plus---App?node-id=1-954&p=f&viewport=805%2C25%2C0.02&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A984&page-id=0%3A1&embed-host=share',
    figmaUrl: 'https://www.figma.com/proto/zdt9Yi8B8XQ4teVHnWL21F/',
    image: projectImagePath('happytenant-tenant'),
    video: '/images/projects/HappyTenant_residential_lifestyle.webm',
    featured: true,
  },
  {
    id: 'happytenant-landlord',
    title: 'HappyTenant Landlord App',
    displayTitle: 'HappyTenant — Landlord Experience',
    category: 'PropTech',
    tags: ['SaaS', 'PropTech'],
    description:
      'A landlord app experience for property visibility, tenant communication, and portfolio tracking.',
    productStatement:
      'Landlord-facing portfolio visibility, property information, and owner decision workflows.',
    role: 'Product Designer',
    year: '2024–2026',
    context: 'LAVA Brands',
    ecosystem: 'happytenant',
    ecosystemLabel: 'HappyTenant ecosystem · Landlord',
    caseStudySlug: 'happytenant-landlord-experience',
    embedUrl:
      'https://embed.figma.com/proto/zdt9Yi8B8XQ4teVHnWL21F/Happy-Tenant-Plus---App?node-id=507-2706&p=f&viewport=734%2C39%2C0.02&scaling=scale-down&content-scaling=fixed&starting-point-node-id=507%3A2749&page-id=332%3A12372&embed-host=share',
    figmaUrl: 'https://www.figma.com/proto/zdt9Yi8B8XQ4teVHnWL21F/',
    image: projectImagePath('happytenant-landlord'),
    video: '/images/projects/Landlord_app.webm',
    featured: true,
  },
  {
    id: 'riyad-2021',
    title: 'Riyad Bank Annual Report 2021',
    category: 'FinTech',
    tags: ['Editorial'],
    description:
      'An interactive digital annual report experience for a leading Gulf banking brand.',
    role: 'Art Director & Designer',
    context: 'LAVA Brands',
    externalUrl: 'https://www.behance.net/gallery/164166937/Riyad-Bank-Annual-Report-2021',
    image: projectImagePath('riyad-2021'),
    featured: false,
  },
  {
    id: 'riyad-2022',
    title: 'Riyad Bank Annual Report 2022',
    category: 'FinTech',
    tags: ['Editorial'],
    description: 'Digital annual report focused on readability and investor communication.',
    role: 'Art Director & Designer',
    context: 'LAVA Brands',
    embedUrl:
      'https://embed.figma.com/proto/CWhpNcRBRIcgu0CDB7nDp6/Riyad-Bank?node-id=1595-5186&viewport=172%2C281%2C0.08&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1503%3A216&page-id=1503%3A215&embed-host=share',
    figmaUrl: 'https://www.figma.com/proto/CWhpNcRBRIcgu0CDB7nDp6/',
    image: projectImagePath('riyad-2022'),
    featured: false,
  },
  {
    id: 'mobily-2023',
    title: 'Mobily Annual Report 2023',
    category: 'Telecom',
    tags: ['Editorial'],
    description: 'Premium annual report website with strong visual presentation.',
    role: 'Art Director & Designer',
    context: 'LAVA Brands',
    embedUrl:
      'https://embed.figma.com/proto/DHaU8topnd2ibAvQZEisUB/Mobily?node-id=74-216&viewport=107%2C199%2C0.03&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1%3A2&page-id=0%3A1&embed-host=share',
    figmaUrl: 'https://www.figma.com/proto/DHaU8topnd2ibAvQZEisUB/',
    image: projectImagePath('mobily-2023'),
    featured: false,
  },
  {
    id: 'mobily-2024',
    title: 'Mobily Annual Report 2024',
    category: 'Telecom',
    tags: ['Editorial'],
    description: 'Modern telecom annual report with interactive data visualization.',
    role: 'Art Director & Designer',
    context: 'LAVA Brands',
    embedUrl:
      'https://embed.figma.com/proto/DHaU8topnd2ibAvQZEisUB/Mobily?node-id=572-70&viewport=739%2C219%2C0.05&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=566%3A19&show-proto-sidebar=1&page-id=535%3A164&embed-host=share',
    figmaUrl: 'https://www.figma.com/proto/DHaU8topnd2ibAvQZEisUB/',
    image: projectImagePath('mobily-2024'),
    featured: false,
  },
  {
    id: 'almarai-2021',
    title: 'Almarai Annual Report 2021',
    category: 'Food',
    tags: ['Editorial'],
    description: 'Interactive corporate reporting designed for clarity and engagement.',
    role: 'Art Director & Designer',
    context: 'LAVA Brands',
    embedUrl:
      'https://embed.figma.com/proto/tN1NuA0EtrkA2aygRzZpCH/Almarai-Report?node-id=237-2538&viewport=406%2C542%2C0.05&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=74%3A667&page-id=0%3A1&embed-host=share',
    figmaUrl: 'https://www.figma.com/proto/tN1NuA0EtrkA2aygRzZpCH/',
    image: projectImagePath('almarai-2021'),
    featured: false,
  },
  {
    id: 'almarai-2023',
    title: 'Almarai Annual Report 2023',
    category: 'Food',
    tags: ['Editorial'],
    description: 'Polished digital annual report with strong visual storytelling.',
    role: 'Art Director & Designer',
    context: 'LAVA Brands',
    embedUrl:
      'https://embed.figma.com/proto/tN1NuA0EtrkA2aygRzZpCH/Almarai-Report?node-id=1727-762&viewport=15%2C75%2C0.04&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1727%3A1375&page-id=1727%3A761&embed-host=share',
    figmaUrl: 'https://www.figma.com/proto/tN1NuA0EtrkA2aygRzZpCH/',
    image: projectImagePath('almarai-2023'),
    featured: false,
  },
  {
    id: 'almarai-2024',
    title: 'Almarai Annual Report 2024',
    category: 'Food',
    tags: ['Editorial'],
    description: 'Latest Almarai report with enhanced interactivity and data presentation.',
    role: 'Art Director & Designer',
    context: 'LAVA Brands',
    embedUrl:
      'https://embed.figma.com/proto/tN1NuA0EtrkA2aygRzZpCH/Almarai-Report?node-id=2295-594&viewport=533%2C248%2C0.02&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=2295%3A370&show-proto-sidebar=1&page-id=2221%3A1968&embed-host=share',
    figmaUrl: 'https://www.figma.com/proto/tN1NuA0EtrkA2aygRzZpCH/',
    image: projectImagePath('almarai-2024'),
    featured: false,
  },
  {
    id: 'stc-2023',
    title: 'STC Annual Report 2023',
    category: 'Telecom',
    tags: ['Editorial'],
    description: 'Corporate digital report with premium visual direction.',
    role: 'Art Director & Designer',
    context: 'LAVA Brands',
    embedUrl:
      'https://embed.figma.com/proto/RBgP1V64BOFgA9WPOR2qTZ/STC?node-id=22-583&viewport=44%2C321%2C0.03&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=0%3A3&page-id=0%3A1&embed-host=share',
    figmaUrl: 'https://www.figma.com/proto/RBgP1V64BOFgA9WPOR2qTZ/',
    image: projectImagePath('stc-2023'),
    featured: false,
  },
  {
    id: 'stc-2024',
    title: 'STC Annual Report 2024',
    category: 'Telecom',
    tags: ['Editorial'],
    description: 'Latest STC report with modern design and interactive elements.',
    role: 'Art Director & Designer',
    context: 'LAVA Brands',
    embedUrl:
      'https://embed.figma.com/proto/RBgP1V64BOFgA9WPOR2qTZ/STC?node-id=723-67&viewport=134%2C108%2C0.03&scaling=min-zoom&content-scaling=fixed&page-id=699%3A604&embed-host=share',
    figmaUrl: 'https://www.figma.com/proto/RBgP1V64BOFgA9WPOR2qTZ/',
    image: projectImagePath('stc-2024'),
    featured: false,
  },
  {
    id: 'savola-2024',
    title: 'Savola Annual Report 2024',
    category: 'Food',
    tags: ['Editorial'],
    description: 'Comprehensive annual report for Savola Group with financial data visualization.',
    role: 'Art Director & Designer',
    context: 'LAVA Brands',
    embedUrl:
      'https://embed.figma.com/proto/jIKBAK1We4Y9aABoLS6ZiE/Savola?node-id=107-200&p=f&viewport=-152%2C56%2C0.04&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=107%3A166&page-id=0%3A1&embed-host=share',
    figmaUrl: 'https://www.figma.com/proto/jIKBAK1We4Y9aABoLS6ZiE/',
    image: projectImagePath('savola-2024'),
    featured: false,
  },
  {
    id: 'etisalat-2023',
    title: 'Etisalat Annual Report 2023',
    category: 'Telecom',
    tags: ['Editorial'],
    description: 'Digital report microsite for a leading telecom brand.',
    role: 'Art Director & Designer',
    context: 'LAVA Brands',
    embedUrl:
      'https://embed.figma.com/proto/PgoYX6KjmkfNTd2J834Z3x/Etisalat?node-id=549-1418&viewport=73%2C215%2C0.04&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=549%3A1397&page-id=549%3A1387&embed-host=share',
    figmaUrl: 'https://www.figma.com/proto/PgoYX6KjmkfNTd2J834Z3x/',
    image: projectImagePath('etisalat-2023'),
    featured: false,
  },
  {
    id: 'sabb-2024',
    title: 'SABB Annual Report 2024',
    category: 'FinTech',
    tags: ['Editorial'],
    description: 'Saudi British Bank annual report with clean layout and financial storytelling.',
    role: 'Art Director & Designer',
    context: 'LAVA Brands',
    embedUrl:
      'https://embed.figma.com/proto/BlY8NtFiLCdjiIikJVZidS/SABB-Annual-Report?node-id=2213-5&viewport=229%2C37%2C0.04&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=2213%3A3&page-id=2202%3A86&embed-host=share',
    figmaUrl: 'https://www.figma.com/proto/BlY8NtFiLCdjiIikJVZidS/',
    image: projectImagePath('sabb-2024'),
    featured: false,
  },
  {
    id: 'pcm',
    title: 'PCM — Prescription Care Management',
    category: 'HealthTech',
    tags: ['Services'],
    description:
      'A prescription care management platform designed to simplify medication savings and patient support.',
    role: 'Product Designer',
    context: 'Frontier Labs',
    externalUrl: 'https://www.pcmsavings.com/',
    image: '/images/projects/pcm.webp',
    featured: false,
  },
  {
    id: 'happytenant-website',
    title: 'HappyTenant Website',
    category: 'PropTech',
    tags: ['SaaS'],
    description: 'Modern PropTech website presenting property management features clearly.',
    role: 'Product Designer',
    context: 'LAVA Brands',
    externalUrl: 'https://happytenant.io/',
    image: projectImagePath('happytenant-website'),
    featured: false,
  },
  {
    id: 'jaan-digital',
    title: 'Jaan Digital',
    category: 'Services',
    tags: [],
    description: 'Clean digital brand website experience.',
    role: 'Product Designer',
    context: 'Jaan Digital',
    embedUrl:
      'https://embed.figma.com/proto/LkL7HJHkHgQ0Y2FpfRzs0C/Jaan-Digital?node-id=162-2088&viewport=170%2C372%2C0.03&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=169%3A2614&page-id=0%3A1&embed-host=share',
    figmaUrl: 'https://www.figma.com/proto/LkL7HJHkHgQ0Y2FpfRzs0C/',
    image: projectImagePath('jaan-digital'),
    featured: false,
  },
  {
    id: 'nozul-website',
    title: 'Nozul Hotel and Restaurants',
    displayTitle: 'Nozul Hotels',
    category: 'Hospitality',
    tags: ['Food', 'Travel', 'Hospitality'],
    description:
      'A content-rich hospitality website for discovery across dining, offers, and events — with clear reservation intent and a bridge to the mobile guest app.',
    productStatement:
      'Hospitality website concept for multi-service discovery, reservation intent, and brand storytelling.',
    role: 'Product Designer',
    year: 'Freelance Project',
    caseStudySlug: 'nozul-hotels-website',
    embedUrl:
      'https://embed.figma.com/proto/B645e7Kn52Sbw0d1KCQVpe/Nozul-Hotel-and-Resorts?node-id=720-3215&viewport=-220%2C274%2C0.03&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=720%3A3215&page-id=1%3A2&embed-host=share',
    figmaUrl: 'https://www.figma.com/proto/B645e7Kn52Sbw0d1KCQVpe/',
    image: projectImagePath('nozul-website'),
    video: '/images/projects/Nozul_hotel.webm',
    featured: true,
  },
]

export type ProjectLinkType = 'case-study' | 'figma' | 'external' | 'none'

export function getProjectLinkType(project: Project): ProjectLinkType {
  if (project.caseStudyHref || project.caseStudySlug) return 'case-study'
  if (project.embedUrl) return 'figma'
  if (project.externalUrl) return 'external'
  return 'none'
}

/** CTA copy must match the real destination. */
export function getProjectCtaLabel(project: Project): string {
  const linkType = getProjectLinkType(project)
  if (linkType === 'case-study') return 'View case study'
  if (linkType === 'figma') return 'View prototype ↗'
  if (linkType === 'external' && project.externalUrl) {
    if (project.externalUrl.includes('behance.net')) return 'View on Behance ↗'
    return 'View website ↗'
  }
  return 'Coming soon'
}

export const filterCategories = [
  { id: 'all', label: 'All Industries' },
  { id: 'annual-reports', label: 'Annual Reports' },
  { id: 'mobile', label: 'Mobile Apps' },
  { id: 'websites', label: 'Websites' },
  { id: 'proptech', label: 'PropTech' },
  { id: 'hospitality', label: 'Hospitality' },
  { id: 'travel', label: 'Travel' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'ai-saas', label: 'AI & SaaS' },
] as const

export type FilterId = (typeof filterCategories)[number]['id']

export function matchesFilter(project: Project, filterId: FilterId): boolean {
  if (filterId === 'all') return true
  if (filterId === 'healthcare') return project.tags.some((t) => t.toLowerCase().includes('health'))
  if (filterId === 'proptech') return project.tags.some((t) => t.includes('PropTech')) || project.category === 'PropTech App'
  if (filterId === 'travel') return project.tags.some((t) => t.toLowerCase().includes('travel'))
  if (filterId === 'ai-saas') return project.tags.some((t) => t.toLowerCase().includes('ai') || t.toLowerCase().includes('saas'))
  if (filterId === 'hospitality') return project.tags.some((t) => t.toLowerCase().includes('hospitality'))
  if (filterId === 'annual-reports') return project.category.includes('Annual Report') || project.tags.includes('Editorial')
  if (filterId === 'mobile') return ['Mobile App', 'PropTech App'].includes(project.category)
  if (filterId === 'websites') return project.category === 'Website Design'
  return true
}
