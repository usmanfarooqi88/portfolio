export interface ExperienceEntry {
  company: string
  role: string
  startDate: string
  endDate: string
  location: string
  summary: string
  contributions: string[]
}

export const experience: ExperienceEntry[] = [
  {
    company: 'Frontier Labs',
    role: 'Product Designer',
    startDate: 'Jan 2021',
    endDate: 'Jul 2026',
    location: 'Lahore, Pakistan',
    summary:
      'Worked on digital products for US-based clients across property technology, restaurant technology, healthcare savings, SaaS, and consumer platforms. Key clients and products included Heard, SRVE, Livium, LetM8, and PCM.',
    contributions: [
      'Designed end-to-end product experiences across responsive web platforms, mobile applications, dashboards, portals, and complex operational workflows.',
      'Translated business requirements into user journeys, information architecture, wireframes, interactive prototypes, and production-ready interfaces.',
      'Simplified complex, data-heavy workflows for multiple user roles while maintaining usability, scalability, and visual consistency.',
      'Created and maintained reusable Figma components, design patterns, and structured design foundations.',
      'Collaborated with product managers, engineers, business stakeholders, and client teams throughout discovery, design, review, and implementation.',
      'Used AI-assisted research, ideation, prototyping, documentation, and design-to-development workflows to improve delivery efficiency.',
      'Conducted design reviews, supported implementation quality, and helped align user needs with business and technical requirements.',
    ],
  },
  {
    company: 'LAVA Brands',
    role: 'Lead Product Designer',
    startDate: 'Jul 2024',
    endDate: 'Jan 2026',
    location: 'Lahore, Pakistan',
    summary:
      'Led and contributed to product design, UX/UI, branding, and digital transformation projects for a UAE-based design and branding company serving clients across the UAE and GCC. Selected projects included Berto, HappyTenant, SIB You branding, annual report platforms, corporate websites, and other digital design services.',
    contributions: [
      'Designed enterprise SaaS products, CRM platforms, responsive websites, mobile experiences, dashboards, and brand-led digital products.',
      'Led the complete design process from requirements analysis and UX strategy through wireframing, prototyping, high-fidelity UI design, and developer handoff.',
      'Worked on Berto, an AI-enabled CRM platform involving lead management, pipelines, dashboards, automation, and enterprise workflows.',
      'Contributed to HappyTenant, a property-management platform supporting tenants, landlords, managers, vendors, maintenance, and portfolio operations.',
      'Designed digital annual report experiences for major GCC organisations across banking, telecommunications, and consumer industries.',
      'Contributed to SIB You kids account branding and other UAE-focused branding and digital communication projects.',
      'Built reusable Figma components and scalable design systems to improve product consistency and development efficiency.',
      'Collaborated with clients, leadership, engineers, developers, and multidisciplinary design teams across multiple concurrent projects.',
      'Led design reviews, mentored designers, and maintained quality standards across product, website, and branding engagements.',
    ],
  },
  {
    company: 'Logicon',
    role: 'Senior UI/UX Designer',
    startDate: 'Jul 2018',
    endDate: 'Jan 2021',
    location: 'Lahore, Pakistan',
    summary:
      'Designed and improved mobile applications, responsive products, user flows, prototypes, and lead-generation experiences. Used usability testing, customer feedback, and developer collaboration to improve product quality.',
    contributions: [
      'Improved mobile applications and responsive products through usability testing and customer feedback.',
      'Developed user flows, prototypes, and lead-generation experiences in close collaboration with developers.',
    ],
  },
]
