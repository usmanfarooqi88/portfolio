import type { CaseStudyBlock } from './caseStudyBlocks'
import { danatBehaviorsBlocks } from './caseStudies/danatBehaviorsBlocks'
import { happytenantLandlordBlocks } from './caseStudies/happytenantLandlordBlocks'
import { happytenantTenantBlocks } from './caseStudies/happytenantTenantBlocks'
import { heardBlocks } from './caseStudies/heardBlocks'
import { nhrBlocks } from './caseStudies/nhrBlocks'
import { nozulHotelsWebsiteBlocks } from './caseStudies/nozulHotelsWebsiteBlocks'
import { wanderlyBlocks } from './caseStudies/wanderlyBlocks'
import { skrewwwBlocks } from './caseStudies/skrewwwBlocks'

export type CaseStudyProjectType = 'MOBILE APP' | 'ANNUAL REPORT' | 'WEBSITE' | 'DESIGN SYSTEM'

export interface CaseStudyDetails {
  client?: string
  industry?: string
  timeline: string
  role: string
  deliverables?: string[]
  team?: string
  tools: string[]
  year: string
  date?: string
  liveUrl?: string
  /** Overrides sidebar live-project button label */
  liveLabel?: string
  status?: string
}

export interface CaseStudy {
  id: string
  slug: string
  title: string
  subtitle: string
  projectType: CaseStudyProjectType
  thumbnail: string
  heroImage: string
  /** Optional WebM for hero autoplay. Absent = static image hero. Poster is heroImage. */
  heroVideo?: string
  category: string[]
  description: string
  /** Optional Behance-style modular stream. Falls back to legacy sections when omitted. */
  blocks?: CaseStudyBlock[]
  overview: {
    description: string
    keyPoints: string[]
  }
  challenge: {
    description: string
    painPoints: string[]
  }
  solution: {
    description: string
    approach: string[]
  }
  highlights: {
    features: Array<{
      name: string
      description: string
    }>
  }
  results?: {
    description: string
    metrics?: Array<{
      metric: string
      value: string
    }>
  }
  media: {
    gallery: Array<{
      type: 'image' | 'video'
      src: string
      caption?: string
    }>
    figmaPrototypeUrl?: string
  }
  details: CaseStudyDetails
  behanceUrl: string
}

function thumb(id: string): string {
  return `/images/projects/${id.replace(/-/g, '_')}_1x.webp`
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'skrewww',
    slug: 'skrewww-design-system',
    title: 'Skrewww',
    subtitle: 'AI-First Design System',
    projectType: 'DESIGN SYSTEM',
    thumbnail: thumb('skrewww'),
    heroImage: '/images/case-studies/skrewww/hero.jpg',
    heroVideo: '/images/projects/skrewww.webm',
    category: ['Design Systems', 'AI', 'Tokens', 'React', 'Figma'],
    description:
      'A design system connecting Figma, tokens, reusable components, documentation and React into one design-to-code foundation.',
    blocks: skrewwwBlocks,
    overview: {
      description:
        'Skrewww is an AI-first design system platform connecting Figma, tokens, components, documentation and React — built to be read by designers, developers and coding agents.',
      keyPoints: [
        '66 documented components adapting through tokens — never forks',
        '225 variables across 7 Pro Figma collections (live audit)',
        'Agent Kit contracts and Guard Beta for AI-safe consumption',
        'Public platform 1.0 with open-source MIT React codebase',
      ],
    },
    challenge: {
      description:
        'Figma, tokens, docs and production components drift apart; AI coding tools amplify invented APIs when system rules are unclear.',
      painPoints: [
        'Design/code property drift',
        'Disconnected documentation',
        'Variant explosion across shape and surface',
        'Agents inventing components, maturity and installability',
      ],
    },
    solution: {
      description:
        'A layered system with semantic tokens, ambient Shape/Surface modes, machine-readable contracts and narrow validation tooling.',
      approach: [
        'Primitive → Semantic token resolution',
        'Shared component contracts across Figma and React',
        'Agent Kit compiled from registry + authored docs',
        'Guard for offline claim validation',
      ],
    },
    highlights: {
      features: [
        {
          name: 'Connected foundation',
          description: 'Tokens, components, docs and React share one resolution model.',
        },
        {
          name: 'AI-readable contracts',
          description: 'Agents check current contracts instead of relying on model memory.',
        },
      ],
    },
    media: {
      gallery: [
        {
          type: 'image',
          src: '/images/case-studies/skrewww/system.webp',
          caption: 'Skrewww system overview',
        },
      ],
    },
    details: {
      industry: 'Design systems · AI tooling',
      timeline: 'Aug 2026 – present · Platform 1.0',
      role: 'Founder / Design Systems Designer',
      deliverables: [
        'Token foundations',
        'Component library',
        'Docs platform',
        'Agent Kit',
        'Guard CLI',
        'Figma Free / Pro',
      ],
      team: 'Solo · AI-assisted implementation',
      tools: ['Figma', 'React', 'TypeScript', 'Design tokens', 'shadcn registry'],
      year: '2026',
      date: '2026',
      status: 'Live',
      liveUrl: 'https://skrewww.com',
      liveLabel: 'Visit Skrewww ↗',
    },
    behanceUrl: 'https://skrewww.com',
  },
  {
    id: 'wanderly',
    slug: 'wanderly-ai-travel-planner',
    title: 'Wanderly',
    subtitle: 'AI Travel Planner App',
    projectType: 'MOBILE APP',
    thumbnail: thumb('wanderly'),
    heroImage: '/images/case-studies/wanderly/screen-home.png',
    category: ['Product Design', 'AI', 'Mobile', 'Travel', 'Conversational UI'],
    description:
      'An AI-assisted travel experience that turns conversational intent into structured trip packages and a unified path to booking.',
    blocks: wanderlyBlocks,
    overview: {
      description:
        'Mobile travel concept centered on conversational planning — AI intent becomes Budget / Mid / Luxury packages, then customization and booking, with Explore and membership as supporting layers.',
      keyPoints: [
        'AI-first home entry with prompt chips',
        'Conversation resolves into comparable trip packages',
        'Unified path from package to booking commitment',
        'Direct discovery (activities / hotels) alongside AI planning',
      ],
    },
    challenge: {
      description:
        'Create one mobile experience that can move from travel intent through AI conversation, structured recommendations, comparison, customization and booking — without stranding guests in chat or assembling inventory as unrelated flows.',
      painPoints: [
        'Open-ended AI input vs comparable choices',
        'Recommendation speed vs control before payment',
        'AI-guided planning vs direct inventory browse',
        'Trip booking focus vs membership breadth',
      ],
    },
    solution: {
      description:
        'Lead with conversational intent, hand off to structured Budget / Mid / Luxury packages, carry selection into an explicit booking funnel, and keep Explore/membership as supporting paths.',
      approach: [
        'AI-first home entry',
        'Chat → structured package comparison',
        'Customize → booking continuity',
        'Direct discovery as a parallel path',
      ],
    },
    highlights: {
      features: [
        {
          name: 'Conversational planning',
          description: 'Natural-language intent starts the journey.',
        },
        {
          name: 'Structured packages',
          description: 'Budget / Mid / Luxury cards for comparison.',
        },
        {
          name: 'Unified booking path',
          description: 'Package selection connects into a multi-step commitment flow.',
        },
      ],
    },
    media: {
      gallery: [
        {
          type: 'image',
          src: '/images/case-studies/wanderly/screen-home.png',
          caption: 'AI-first home entry',
        },
        {
          type: 'image',
          src: '/images/case-studies/wanderly/screen-ai-trip-plan.png',
          caption: 'Chat → packages',
        },
        {
          type: 'image',
          src: '/images/case-studies/wanderly/architecture.webp',
          caption: 'Product structure',
        },
      ],
    },
    details: {
      client: 'Wanderly',
      industry: 'Travel Tech',
      timeline: 'Freelance Project · 20-day design case · 4 sprints',
      role: 'Product Designer',
      deliverables: [
        'Mobile product UX/UI (freelance)',
        'AI planning · packages · booking journeys',
        'Prototype presentation',
      ],
      tools: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop'],
      year: 'Freelance Project',
      date: 'Freelance Project',
      status: 'Prototype / product design',
      liveUrl: 'https://www.behance.net/gallery/243279399/Wanderly-AI-Travel-Planner-App-UXUI',
      liveLabel: 'View Behance case ↗',
    },
    behanceUrl: 'https://www.behance.net/gallery/243279399/Wanderly-AI-Travel-Planner-App-UXUI',
  },
  {
    id: 'heard-app',
    slug: 'heard-mobile-app',
    title: 'Heard',
    subtitle: 'Cross-platform Restaurant Product',
    projectType: 'MOBILE APP',
    thumbnail: thumb('heard-app'),
    heroImage: '/images/case-studies/heard/hero.webp',
    heroVideo: '/images/projects/Heard_app_ordering.webm',
    category: ['Product Design', 'Restaurant Tech', 'Mobile', 'iOS', 'Android'],
    description:
      'Multi-mode restaurant ordering product spanning delivery, pickup, and table order — with shared checkout patterns and engineering handoff.',
    blocks: heardBlocks,
    overview: {
      description:
        'Heard is a multi-mode restaurant ordering product covering delivery, pickup, and table order, with shared cart/payment/status patterns and Zeplin handoff for mobile engineering.',
      keyPoints: [
        'Three fulfillment paths with a shared order pipeline',
        'Home redesign: mode grid + Near Me discovery',
        'Reusable restaurant cards, modifiers, and order-status patterns',
        'Figma + Zeplin handoff; PM and iOS/Android collaboration',
      ],
    },
    challenge: {
      description:
        'Support different restaurant intents without duplicating the entire ordering stack for each mode.',
      painPoints: [
        'Multiple fulfillment entry points',
        'Home density vs discoverability',
        'Consistent cart, payment, and status across modes',
        'Booking on roadmap but not ready to ship fully',
      ],
    },
    solution: {
      description:
        'A shared select → cart → pay → prepare spine with mode-specific entry/completion, plus a restructured home and reusable status patterns.',
      approach: [
        'App-flow model across delivery, pickup, and table order',
        'Before→after home information architecture',
        'Reusable cards, modifiers, and steppers',
        'Zeplin-ready handoff alongside Figma',
      ],
    },
    highlights: {
      features: [
        {
          name: 'Multi-mode ordering',
          description: 'Delivery, pickup, and QR table order on one product spine.',
        },
        {
          name: 'Reusable UI patterns',
          description: 'Cards, modifiers, payment rows, and status steppers shared across flows.',
        },
        {
          name: 'Engineering handoff',
          description: 'Figma design with Zeplin delivery for mobile implementation.',
        },
      ],
    },
    media: {
      gallery: [
        {
          type: 'image',
          src: '/images/case-studies/heard/cover.webp',
          caption: 'Heard product cover',
        },
        {
          type: 'image',
          src: '/images/case-studies/heard/home-before-after.webp',
          caption: 'Home before → after',
        },
        {
          type: 'image',
          src: '/images/case-studies/heard/app-flow.webp',
          caption: 'App flow across fulfillment modes',
        },
      ],
    },
    details: {
      client: 'Heard',
      industry: 'Restaurant technology',
      timeline: 'Client engagement at Frontier Labs · published on Behance Feb 2023',
      role: 'Product Designer',
      deliverables: [
        'Wireframes',
        'Hi-fi mobile UI',
        'App flow',
        'Reusable UI patterns',
        'Zeplin handoff',
      ],
      team: 'Product Manager · iOS & Android engineers',
      tools: ['Figma', 'Zeplin', 'Photoshop', 'Illustrator'],
      year: '2021–2023',
      date: '2021–2023',
      status: 'Delivered design',
      liveUrl: 'https://www.behance.net/gallery/164092641/Heard-App',
      liveLabel: 'View Behance case study ↗',
    },
    behanceUrl: 'https://www.behance.net/gallery/164092641/Heard-App',
  },
  {
    id: 'happytenant-tenant',
    slug: 'happytenant-tenant-experience',
    title: 'HappyTenant',
    subtitle: 'Tenant Experience',
    projectType: 'MOBILE APP',
    thumbnail: thumb('happytenant-tenant'),
    heroImage: '/images/case-studies/happytenant-tenant/hero.webp',
    heroVideo: '/images/projects/HappyTenant_residential_lifestyle.webm',
    category: ['Product Design', 'PropTech', 'Mobile', 'SaaS'],
    description:
      'A mobile self-service experience bringing rent, lease information, bookings, requests, documents and property communication into one connected tenant journey.',
    blocks: happytenantTenantBlocks,
    overview: {
      description:
        'Tenant-facing mobile experience for an established multi-role property platform — organizing financial, property, service, and communication workflows into one coherent self-service product.',
      keyPoints: [
        'Home hierarchy balancing status, frequent actions, and secondary services',
        'Payments with dues, details, history, and overdue states',
        'Booking state model: available → pending → approved / rejected',
        'Request → Ticket → Work Order → Updates operational path',
      ],
    },
    challenge: {
      description:
        'Multiple unrelated but recurring tenant jobs compete for attention inside one mobile app — without reading as a payments-only or maintenance-only product.',
      painPoints: [
        'Financial, property, service, and communication workflows colliding',
        'Home information hierarchy under competing urgency',
        'State coverage beyond happy paths (overdue, pending, rejected, empty)',
        'Coherence across a broad module set without a screen inventory',
      ],
    },
    solution: {
      description:
        'Organize the tenant product around status-first home hierarchy, clear financial state, explicit booking states, and a followable request/work-order path — with supporting services as breadth, not equal weight.',
      approach: [
        'Prioritize lease/balance/rent status, then unit/payments/bookings',
        'Keep amount + due date + status + property context together in payments',
        'Design booking as a stateful workflow, not only a form',
        'Expose request → ticket → work order → updates using product terminology',
      ],
    },
    highlights: {
      features: [
        {
          name: 'Connected tenant journey',
          description:
            'Property, financial, service, and communication workflows in one mobile experience.',
        },
        {
          name: 'State-aware flows',
          description:
            'Overdue payments, booking outcomes, visitor empty/list, and operational updates.',
        },
        {
          name: 'Shared patterns',
          description:
            'Repeated tags, lists, headers, and cards across modules — without claiming a full personal component library.',
        },
      ],
    },
    media: {
      gallery: [
        {
          type: 'image',
          src: '/images/case-studies/happytenant-tenant/home.webp',
          caption: 'Tenant Home',
        },
        {
          type: 'image',
          src: '/images/case-studies/happytenant-tenant/payments.webp',
          caption: 'Payments sequence',
        },
        {
          type: 'image',
          src: '/images/case-studies/happytenant-tenant/bookings-states.webp',
          caption: 'Booking states',
        },
      ],
      figmaPrototypeUrl: 'https://www.figma.com/proto/zdt9Yi8B8XQ4teVHnWL21F/',
    },
    details: {
      client: 'HappyTenant',
      industry: 'PropTech · property management',
      timeline: 'Contributed during LAVA Brands tenure · Jul 2024 – Jan 2026',
      role: 'Product Designer',
      deliverables: [
        'Tenant mobile UX/UI (contribution)',
        'Multi-module self-service flows',
        'Figma prototype',
      ],
      tools: ['Figma'],
      year: '2024–2026',
      date: '2024–2026',
      status: 'Prototype / design',
      liveUrl: 'https://www.figma.com/proto/zdt9Yi8B8XQ4teVHnWL21F/',
      liveLabel: 'View Figma prototype ↗',
    },
    behanceUrl: 'https://www.figma.com/proto/zdt9Yi8B8XQ4teVHnWL21F/',
  },
  {
    id: 'happytenant-landlord',
    slug: 'happytenant-landlord-experience',
    title: 'HappyTenant',
    subtitle: 'Landlord Experience',
    projectType: 'MOBILE APP',
    thumbnail: thumb('happytenant-landlord'),
    heroImage: '/images/case-studies/happytenant-landlord/hero.webp',
    heroVideo: '/images/projects/Landlord_app.webm',
    category: ['Product Design', 'PropTech', 'Mobile', 'SaaS', 'B2B'],
    description:
      'A landlord-facing mobile experience designed to make portfolio performance, financial states, property operations and approvals easier to understand and act on.',
    blocks: happytenantLandlordBlocks,
    overview: {
      description:
        'Owner-facing mobile experience for an established multi-role property platform — structuring dense portfolio, financial and operational information into clearer decision workflows.',
      keyPoints: [
        'Home hierarchy balancing attention, money snapshot and portfolio health',
        'Portfolio → property → unit drill-down',
        'Work-order state model across volume and lifecycle',
        'Wallet and due-payment financial state clarity',
      ],
    },
    challenge: {
      description:
        'Prevent a landlord dashboard from becoming a wall of financial and operational data while still supporting owner decisions across many properties.',
      painPoints: [
        'Dense KPIs and money states competing for attention',
        'Portfolio overview vs property/unit detail',
        'Operational volume across many work-order statuses',
        'Approvals that must convert information into action',
      ],
    },
    solution: {
      description:
        'Organize the Landlord product around status-first Home hierarchy, portfolio drill-down, explicit work-order states and distinct financial money states — with records as supporting breadth.',
      approach: [
        'Lead Home with attention and actionable money',
        'Rentals → Property → Unit ladder',
        'Expose work-order lifecycle as a state model',
        'Separate available, due and portfolio-level finance',
      ],
    },
    highlights: {
      features: [
        {
          name: 'Owner decision surface',
          description:
            'Home combines pending payments, financial snapshot, WO KPIs and approvals.',
        },
        {
          name: 'Portfolio drill-down',
          description: 'Rentals to property to unit without losing portfolio context.',
        },
        {
          name: 'Operational + financial states',
          description:
            'Work-order lifecycle tags and wallet/due money states beyond happy path.',
        },
      ],
    },
    media: {
      gallery: [
        {
          type: 'image',
          src: '/images/case-studies/happytenant-landlord/home.webp',
          caption: 'Landlord Home hierarchy',
        },
        {
          type: 'image',
          src: '/images/case-studies/happytenant-landlord/portfolio-drilldown.webp',
          caption: 'Portfolio drill-down',
        },
        {
          type: 'image',
          src: '/images/case-studies/happytenant-landlord/work-orders.webp',
          caption: 'Work Order states',
        },
      ],
      figmaPrototypeUrl: 'https://www.figma.com/proto/zdt9Yi8B8XQ4teVHnWL21F/',
    },
    details: {
      client: 'HappyTenant',
      industry: 'PropTech · property management',
      timeline: 'Contributed during LAVA Brands tenure · Jul 2024 – Jan 2026',
      role: 'Product Designer',
      deliverables: [
        'Landlord mobile UX/UI (contribution)',
        'Portfolio / finance / operations flows',
        'Figma prototype',
      ],
      tools: ['Figma'],
      year: '2024–2026',
      date: '2024–2026',
      status: 'Prototype / design',
      liveUrl: 'https://www.figma.com/proto/zdt9Yi8B8XQ4teVHnWL21F/',
      liveLabel: 'View Figma prototype ↗',
    },
    behanceUrl: 'https://www.figma.com/proto/zdt9Yi8B8XQ4teVHnWL21F/',
  },
  {
    id: 'danat-behavior',
    slug: 'danat-behaviors',
    title: 'Danat Behaviors',
    subtitle: 'Behavior & Rewards Ecosystem',
    projectType: 'MOBILE APP',
    thumbnail: thumb('danat-behavior'),
    heroImage: '/images/case-studies/danat-behaviors/hero.webp',
    heroVideo: '/images/projects/danat.webm',
    category: ['Product Design', 'HealthTech', 'Mobile', 'Gamification'],
    description:
      'Designing a mobile ecosystem that turns healthy and positive activities into visible progress, Danat points, recognition and redeemable rewards.',
    blocks: danatBehaviorsBlocks,
    overview: {
      description:
        'Zero-to-one mobile product connecting challenges, activity tracking, Danat points, recognition systems and a rewards marketplace into one engagement ecosystem.',
      keyPoints: [
        'Designed from zero to one',
        'Core loop: challenge → progress → points → recognition → redeem',
        'Points economy with active / earned / redeemed / expired states',
        'Marketplace earn → redeem journey with partners and pillars',
      ],
    },
    challenge: {
      description:
        'Connect activities, challenges, progress, points, recognition, rewards and partners into a system users can understand and repeatedly participate in.',
      painPoints: [
        'Ecosystem complexity vs single-feature thinking',
        'Home overload from many engagement mechanics',
        'Challenge motivation vs information density',
        'Points meaning without clear states',
      ],
    },
    solution: {
      description:
        'Establish a clear engagement loop, home hierarchy, challenge comprehension/enrollment, multi-scale activity tracking, points state model and earn→redeem marketplace — with partners and pillars as ecosystem breadth.',
      approach: [
        'Product architecture around the core loop',
        'Challenge detail + multi-step enrollment',
        'Daily / Weekly / Monthly activity model',
        'My Danat states + marketplace redemption',
      ],
    },
    highlights: {
      features: [
        {
          name: 'Zero-to-one ownership',
          description:
            'Product architecture, journeys, UX/UI, progression presentation and reward flows designed from the ground up.',
        },
        {
          name: 'Engagement loop',
          description:
            'Challenges and activities feed points, recognition and redeemable rewards.',
        },
        {
          name: 'Points + marketplace',
          description:
            'Danat points behave as a state system connected to cart and checkout.',
        },
      ],
    },
    media: {
      gallery: [
        {
          type: 'image',
          src: '/images/case-studies/danat-behaviors/loop.webp',
          caption: 'Engagement loop',
        },
        {
          type: 'image',
          src: '/images/case-studies/danat-behaviors/challenges.webp',
          caption: 'Challenges',
        },
        {
          type: 'image',
          src: '/images/case-studies/danat-behaviors/marketplace.webp',
          caption: 'Earn → redeem',
        },
      ],
      figmaPrototypeUrl: 'https://www.figma.com/proto/8EHDksjpGgM5QOAdvhxCEi/',
    },
    details: {
      client: 'Danat Behaviors',
      industry: 'HealthTech · engagement & rewards',
      timeline: 'Freelance Project',
      role: 'Product Designer',
      deliverables: [
        'Zero-to-one mobile product design',
        'Engagement / points / rewards ecosystem',
        'Figma prototype',
      ],
      tools: ['Figma'],
      year: 'Freelance Project',
      date: 'Freelance Project',
      status: 'Prototype / product design',
      liveUrl: 'https://www.figma.com/proto/8EHDksjpGgM5QOAdvhxCEi/',
      liveLabel: 'View Figma prototype ↗',
    },
    behanceUrl: 'https://www.figma.com/proto/8EHDksjpGgM5QOAdvhxCEi/',
  },
  {
    id: 'nhr-hotels',
    slug: 'nhr',
    title: 'NHR',
    subtitle: 'Nozul Hospitality Guest Experience',
    projectType: 'MOBILE APP',
    thumbnail: thumb('nhr-hotels'),
    heroImage: '/images/case-studies/nhr/hero.webp',
    category: ['Product Design', 'Hospitality', 'Mobile', 'Consumer'],
    description:
      'A hospitality guest experience that makes dining discovery and booking feel as primary as the stay — organizing restaurants, events, and reservations into one mobile product.',
    blocks: nhrBlocks,
    overview: {
      description:
        'Mobile guest experience for Nozul hospitality — dining discovery, table and event booking, stay reservations, and supporting brand/account surfaces.',
      keyPoints: [
        'Dining-led home as the guest gateway',
        'Restaurant → menu → reserve a table',
        'Upcoming vs Previous booking states',
        'Events as a second booking mode alongside rooms',
      ],
    },
    challenge: {
      description:
        'Unify dining, events, and stay bookings in one branded guest app without reducing hospitality to a room-booking utility.',
      painPoints: [
        'Dining vs stay priority on home',
        'Restaurant context before reservation commitment',
        'Multiple booking modes in one bookings area',
        'Brand storytelling vs functional paths',
      ],
    },
    solution: {
      description:
        'Lead home with dining discovery, separate restaurant comprehension from reservation forms, split bookings into Upcoming/Previous, and keep events as an explicit booking mode.',
      approach: [
        'Dining-first home hierarchy',
        'Details → menu → reserve path',
        'Booking state model',
        'Events as a parallel commitment path',
      ],
    },
    highlights: {
      features: [
        {
          name: 'Dining-led hospitality',
          description: 'Home prioritizes food discovery and venue categories.',
        },
        {
          name: 'Multi-mode booking',
          description: 'Table, event, and room reservations in one guest product.',
        },
        {
          name: 'Clear booking states',
          description: 'Upcoming vs Previous keeps active stays actionable.',
        },
      ],
    },
    media: {
      gallery: [
        {
          type: 'image',
          src: '/images/case-studies/nhr/home.webp',
          caption: 'Home dining gateway',
        },
        {
          type: 'image',
          src: '/images/case-studies/nhr/restaurant-flow.webp',
          caption: 'Restaurant → reserve',
        },
        {
          type: 'image',
          src: '/images/case-studies/nhr/bookings.webp',
          caption: 'Booking states',
        },
      ],
      figmaPrototypeUrl: 'https://www.figma.com/proto/B645e7Kn52Sbw0d1KCQVpe/',
    },
    details: {
      client: 'Nozul',
      industry: 'Hospitality · hotels & dining',
      timeline: 'Product design',
      role: 'Product Designer',
      deliverables: [
        'Hospitality guest mobile UX/UI (contribution)',
        'Dining · events · bookings journeys',
        'Figma prototype',
      ],
      tools: ['Figma'],
      year: 'Freelance Project',
      date: 'Freelance Project',
      status: 'Prototype / product design',
      liveUrl: 'https://www.figma.com/proto/B645e7Kn52Sbw0d1KCQVpe/',
      liveLabel: 'View Figma prototype ↗',
    },
    behanceUrl: 'https://www.figma.com/proto/B645e7Kn52Sbw0d1KCQVpe/',
  },
  {
    id: 'nozul-website',
    slug: 'nozul-hotels-website',
    title: 'Nozul Hotels',
    subtitle: 'Hospitality Website Concept',
    projectType: 'WEBSITE',
    thumbnail: thumb('nozul-website'),
    heroImage: '/images/case-studies/nozul-hotels-website/hero.webp',
    heroVideo: '/images/projects/Nozul_hotel.webm',
    category: ['Product Design', 'Hospitality', 'Website', 'Consumer'],
    description:
      'A content-rich hospitality website structured so guests can move from brand and venue discovery to reservation intent — across dining, offers, and events — while bridging the brand’s mobile app.',
    blocks: nozulHotelsWebsiteBlocks,
    overview: {
      description:
        'Desktop hospitality website concept for Nozul — multi-service discovery, restaurant filtering, reservation funnel, brand/corporate content, and web→app bridge.',
      keyPoints: [
        'Home as a paced hospitality discovery journey',
        'Restaurant category filtering → venue detail',
        'Reservation review → payment → confirmed',
        'Clear bridge to the NHR mobile guest experience',
      ],
    },
    challenge: {
      description:
        'Organize a multi-service hospitality brand on the web without flattening modules or reducing the property to room booking only.',
      painPoints: [
        'Long-home content breadth vs scanability',
        'Dining inventory needing filters before detail',
        'Marketing content needing transactional reservation states',
        'Broad menu IA vs designed destination depth',
      ],
    },
    solution: {
      description:
        'Sequence Home by service priority, filter restaurants before detail, carry reservation through explicit states, and promote the mobile guest app as a parallel channel.',
      approach: [
        'Discovery-first home hierarchy',
        'Category filter → venue detail path',
        'Multi-state reservation summary',
        'Get the App as channel bridge',
      ],
    },
    highlights: {
      features: [
        {
          name: 'Content-rich IA',
          description: 'Dining, offers, events, and brand content in one discoverable structure.',
        },
        {
          name: 'Conversion hierarchy',
          description: 'Persistent reservation entry with review, payment, and confirmation states.',
        },
        {
          name: 'Web → app bridge',
          description: 'Website discovery paired with promotion of the mobile guest product.',
        },
      ],
    },
    media: {
      gallery: [
        {
          type: 'image',
          src: '/images/case-studies/nozul-hotels-website/home-discovery.webp',
          caption: 'Home discovery journey',
        },
        {
          type: 'image',
          src: '/images/case-studies/nozul-hotels-website/reservation-flow.webp',
          caption: 'Reservation states',
        },
        {
          type: 'image',
          src: '/images/case-studies/nozul-hotels-website/restaurants.webp',
          caption: 'Restaurant filtering',
        },
      ],
      figmaPrototypeUrl: 'https://www.figma.com/proto/B645e7Kn52Sbw0d1KCQVpe/',
    },
    details: {
      client: 'Nozul',
      industry: 'Hospitality · hotels & dining',
      timeline: 'Website concept',
      role: 'Product Designer',
      deliverables: [
        'Hospitality website UX/UI (contribution)',
        'Discovery · reservation · brand content journeys',
        'Figma prototype',
      ],
      tools: ['Figma'],
      year: 'Freelance Project',
      date: 'Freelance Project',
      status: 'Prototype / website design',
      liveUrl: 'https://www.figma.com/proto/B645e7Kn52Sbw0d1KCQVpe/',
      liveLabel: 'View Figma prototype ↗',
    },
    behanceUrl: 'https://www.figma.com/proto/B645e7Kn52Sbw0d1KCQVpe/',
  },
]

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug)
}

export function getCaseStudyByProjectId(projectId: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.id === projectId)
}
