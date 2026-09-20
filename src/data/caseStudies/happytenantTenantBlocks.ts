import type { CaseStudyBlock } from '../caseStudyBlocks'

export const happytenantTenantBlocks: CaseStudyBlock[] = [
  // Opening
  {
    type: 'text',
    id: 'ht-thesis',
    size: 'lg',
    content:
      'I redesigned the complete tenant-facing mobile experience for HappyTenant — an established residential PropTech platform — replacing a fragmented legacy self-service product with a coherent app spanning payments, bookings, requests, documents, visitors, and property communication.',
  },
  {
    type: 'metrics',
    id: 'ht-summary',
    items: [
      { metric: 'Engagement', value: 'LAVA Brands' },
      { metric: 'Platform', value: 'Mobile app' },
      { metric: 'Status', value: 'Prototype / design' },
      { metric: 'Scope', value: 'End-to-end redesign' },
    ],
  },

  // The problem
  {
    type: 'heading',
    id: 'ht-problem',
    label: 'The problem',
    content: 'Everyday property tasks that felt like unrelated services',
  },
  {
    type: 'text',
    id: 'ht-problem-p',
    content:
      'The legacy HappyTenant tenant app handled many recurring jobs — pay rent, book amenities, raise a maintenance request, check documents — but each area lived as an isolated module. Tenants moved between unconnected surfaces with no shared context, no visible status after an action, and no clear sense of what needed attention when they opened the app.',
  },
  {
    type: 'list',
    id: 'ht-scope',
    label: 'Tenant jobs the redesign covers',
    items: [
      'Property & lease status — days remaining, My Unit details',
      'Payments — dues, due details, history, overdue states',
      'Bookings — amenity spaces and services, approval states',
      'Requests — ticket → work order → operational updates',
      'Documents, Visitors, Guest Access',
      'Broadcasts, Chat, Events, Notifications',
      'Help Desk, Settings, Guide',
    ],
  },

  // Home
  {
    type: 'heading',
    id: 'ht-home',
    label: 'Home hierarchy',
    content: 'The tenant dashboard as an organizing surface',
  },
  {
    type: 'text',
    id: 'ht-home-p',
    content:
      'Tenant Home had to carry property context, lease countdown, rent status, active bookings, broadcast access, and secondary services — without reading like a navigation drawer. The hierarchy problem was real: what is urgent, what is frequent, and what can live below the fold.',
  },
  {
    type: 'image',
    id: 'ht-home-visual',
    src: '/images/case-studies/happytenant-tenant/_presentation/home.webp',
    alt: 'HappyTenant Tenant Home screen showing lease status, upcoming rent, balance, My Unit, Payments, My Bookings, Broadcasts and secondary services',
    caption:
      'Tenant Home: lease countdown and financial status above the fold → My Unit / Payments / Bookings as primary actions → Broadcasts, Guest Access, Events, Promotions as secondary reach.',
    width: 'inset',
    zoom: true,
  },
  {
    type: 'decision',
    id: 'ht-d-home',
    title: 'Prioritize status, then frequent actions, then secondary services',
    evidence:
      'Tenants opening the app most often need to check rent status or take a financial action. Property context and balance give immediate orientation. Bookings and unit information are frequent but not daily. Broadcasts, events, and promotions are lower urgency.',
    options: [
      'Equal-weight grid of all services (feature launcher)',
      'Status-first hierarchy: lease/balance at top, primary actions mid, secondary below',
      'Single default view (payments only) with everything else behind navigation',
    ],
    decision:
      'Structure Home as a status dashboard: lease days remaining + financial summary at the top, primary shortcuts (My Unit, Payments, Bookings) in the middle band, secondary services (Broadcasts, Guest Access, Events, Promotions) below.',
    tradeoff:
      'A dense home trades whitespace for information completeness. Secondary modules remain visible but must not look equally urgent — spacing, type weight, and section separation carry that distinction.',
    result:
      'Home reads as an organizing surface for the whole tenant product — not a single-feature dashboard or a flat list of unrelated screens.',
  },

  // Payments
  {
    type: 'heading',
    id: 'ht-payments',
    label: 'Payments',
    content: 'Financial state, not just a payment form',
  },
  {
    type: 'image',
    id: 'ht-payments-visual',
    src: '/images/case-studies/happytenant-tenant/_presentation/payments.webp',
    alt: 'Payments screens: My Dues with overdue tags and amounts, Due Details with total and received breakdown, History showing no paid invoices empty state',
    caption:
      'My Dues → Due Details → History. Overdue status, amount, due date, received amount, and property context stay together — the tenant can understand their position without navigating between screens.',
    width: 'full',
    zoom: true,
  },
  {
    type: 'text',
    id: 'ht-payments-note',
    content:
      'The payment detail screen surfaces account, property/unit, due date, and attachment access alongside the financial breakdown. The goal was financial-state clarity — what is owed, when, and in what condition — not claiming collection improvements.',
  },

  // Requests / Work Orders
  {
    type: 'heading',
    id: 'ht-requests',
    label: 'Service requests',
    content: 'Request → Ticket → Work Order → Updates',
  },
  {
    type: 'text',
    id: 'ht-requests-p',
    content:
      'The legacy approach to maintenance was a submission form with no visible lifecycle after. The redesign exposes the operational path — from tenant request through internal ticket to work order, with a Updates stage tracking progress. Actions do not disappear after submit.',
  },
  {
    type: 'image',
    id: 'ht-requests-visual',
    src: '/images/case-studies/happytenant-tenant/_presentation/requests.webp',
    alt: 'Four screens: Requests empty state, Ticket details with category and property metadata, Work Order with Ballantind Tower property and status, Ticket Updates empty state',
    caption:
      'Requests → Ticket → Work Order → Updates. The product uses this terminology exactly — not "maintenance" as a catch-all. Each stage is inspectable.',
    width: 'full',
    zoom: true,
  },
  {
    type: 'decision',
    id: 'ht-d-requests',
    title: 'Expose the operational lifecycle, not just intake',
    evidence:
      'A submit-and-forget maintenance form leaves tenants without a mental model of what happens next. The redesign artifacts show a full path: Requests list, Ticket with category/property metadata, Work Order with status, and a dedicated Updates view.',
    options: [
      'Single form with no visible post-submission tracking',
      'Request + status tag only (collapsed tracking)',
      'Requests → Ticket → Work Order → Updates — each stage inspectable',
    ],
    decision:
      "Model the full operational path using the product's own terminology. Give each stage a screen that carries forward the relevant context: who requested, which property, current status.",
    tradeoff:
      'More stages mean more empty states to design (e.g. unassigned Updates). But hiding the lifecycle after submission makes the product feel less trustworthy, not simpler.',
    result:
      'Tenants can inspect their request at any stage. The design uses the real operational terms (Ticket, Work Order, Updates) rather than simplifying to a generic "maintenance" abstraction.',
  },

  // Bookings
  {
    type: 'heading',
    id: 'ht-bookings',
    label: 'Bookings',
    content: 'A stateful amenity model, not just a request form',
  },
  {
    type: 'image',
    id: 'ht-bookings-states',
    src: '/images/case-studies/happytenant-tenant/_presentation/bookings-states.webp',
    alt: 'My Bookings in three states: Approved tab showing Gym and Squash Court, Pending tab showing Car Wash and Tennis Court, Rejected tab showing Habiba with rejected badge',
    caption:
      'Approved · Pending · Rejected — three outcomes on the same list surface. A tenant who was rejected sees that explicitly rather than having their booking silently disappear.',
    width: 'full',
    zoom: true,
  },
  {
    type: 'image',
    id: 'ht-bookings-flow',
    src: '/images/case-studies/happytenant-tenant/_presentation/bookings-flow.webp',
    alt: 'Available Spaces list with activity photos and availability status, and Booking Details showing reserver name, phone, email, booking date, time, space name and contact',
    caption:
      'Available Spaces → Booking Details. Entry and confirmation in the same service model, carrying forward name, date, time, and space information.',
    width: 'contained',
    zoom: true,
  },

  // Beyond the core
  {
    type: 'heading',
    id: 'ht-beyond',
    label: 'Supporting services',
    content: 'Property life beyond transactions',
  },
  {
    type: 'text',
    id: 'ht-beyond-p',
    content:
      'Documents, Visitors, Broadcasts, Events, Chat, and Help Desk extend the tenant product into ongoing communication and property management. The same interaction language — headers, list rows, empty states, status tags — carries across all six modules.',
  },
  {
    type: 'image',
    id: 'ht-supporting-visual',
    src: '/images/case-studies/happytenant-tenant/_presentation/supporting.webp',
    alt: 'Supporting screens: My Unit lease details with status tags, Documents with expiry dates, Visitors empty state, Visitors list, Broadcast list, Events empty state',
    caption:
      'My Unit, Documents (with expiry status), Visitors, Broadcasts, and Events — consistent patterns across supporting modules.',
    width: 'full',
    zoom: true,
  },

  // States
  {
    type: 'heading',
    id: 'ht-states',
    label: 'Real conditions',
    content: 'Designing beyond the happy path',
  },
  {
    type: 'image',
    id: 'ht-states-visual',
    src: '/images/case-studies/happytenant-tenant/_presentation/states.webp',
    alt: 'State pairs: overdue dues list with OVERDUE tags, rejected booking in My Bookings, empty visitors screen with onboarding prompt, populated visitor list',
    caption:
      'Overdue dues, rejected bookings, empty visitors, visitor list — states across different modules using a consistent visual language for status.',
    width: 'full',
    zoom: true,
  },

  // What was delivered
  {
    type: 'heading',
    id: 'ht-delivered',
    label: 'Delivered design',
    content: 'What the redesign established',
  },
  {
    type: 'features',
    id: 'ht-deliverables',
    items: [
      {
        name: 'Coherent tenant self-service architecture',
        description:
          'A single mobile product covering financial, property, service, communication, and access workflows — organized around what needs attention, not around app sections.',
      },
      {
        name: 'Status-first information hierarchy',
        description:
          'Home surfaces lease status and rent balance above the fold. Payments, bookings, and requests use explicit state tags (Overdue, Pending, Approved, Rejected) rather than requiring tenants to infer outcome.',
      },
      {
        name: 'Connected operational model for requests',
        description:
          "Requests → Ticket → Work Order → Updates uses the product's own operational terms, making the post-submission lifecycle inspectable rather than opaque.",
      },
    ],
  },

  // Reflection
  {
    type: 'heading',
    id: 'ht-reflection',
    label: 'Reflection',
    content: 'What connected it',
  },
  {
    type: 'text',
    id: 'ht-reflection-p',
    content:
      'The central design challenge was not any single module — it was coherence across 17+ product areas that tenants use with very different frequencies. The home hierarchy, the shared state language, and the request lifecycle were the structural decisions that made the product feel connected rather than like a collection of unrelated property utilities.',
  },

  // Next
  {
    type: 'heading',
    id: 'ht-next',
    label: 'Next',
    content: 'Continue',
  },
  {
    type: 'cta-pair',
    id: 'ht-ctas',
    primary: {
      label: 'View HappyTenant Landlord →',
      href: '/case-studies/happytenant-landlord-experience',
    },
    secondary: {
      label: 'View Figma prototype ↗',
      href: 'https://www.figma.com/proto/zdt9Yi8B8XQ4teVHnWL21F/',
      external: true,
    },
  },
]
