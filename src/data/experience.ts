export interface ExperienceRole {
  title: string
  startDate: string
  endDate: string
}

export interface ExperienceEntry {
  company: string
  /** Single role (most entries). Omit when `roles` is provided. */
  role?: string
  startDate?: string
  endDate?: string
  /** Multiple roles under the same company, newest first. */
  roles?: ExperienceRole[]
  location: string
  summary: string
  contributions: string[]
}

export const experience: ExperienceEntry[] = [
  {
    company: 'Frontier Labs',
    roles: [
      { title: 'Senior UX/UI Designer', startDate: 'May 2023', endDate: 'Aug 2026' },
      { title: 'UX/UI Designer',        startDate: 'Feb 2021', endDate: 'May 2023' },
    ],
    location: 'Lahore, Pakistan',
    summary:
      'Worked on digital products for US-based clients across property technology, restaurant technology, healthcare savings, SaaS, and consumer platforms. Key clients and products included Heard, SRVE, Livium, LetM8, and PCM.',
    contributions: [
      'Led redesigns of core website user flows using analytics and user feedback.',
      'Conducted UX audits and resolved usability issues.',
      'Developed and maintained a design system for web and mobile interfaces.',
    ],
  },
  {
    company: 'LAVA Brands',
    role: 'Senior Product Designer',
    startDate: 'Jul 2024',
    endDate: 'Jan 2026',
    location: 'Lahore, Pakistan',
    summary:
      'Led and contributed to product design, UX/UI, and digital projects for a UAE-based design and branding company serving clients across the UAE and GCC.',
    contributions: [
      'Led UI/UX for client-facing digital products and annual report websites.',
      'Developed reusable component libraries and design systems.',
      'Collaborated across 8+ major client projects.',
    ],
  },
  {
    company: 'Logicon',
    role: 'User Interface Designer',
    startDate: 'Jul 2019',
    endDate: 'Jan 2021',
    location: 'Lahore, Pakistan',
    summary:
      'Designed and improved mobile applications, responsive products, user flows, prototypes, and lead-generation experiences.',
    contributions: [
      'Redesigned mobile application interfaces and lead-generation forms.',
      'Conducted usability testing.',
      'Created interactive Figma prototypes for stakeholder reviews and design approval.',
    ],
  },
]
