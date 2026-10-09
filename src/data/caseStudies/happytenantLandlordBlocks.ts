import type { CaseStudyBlock } from '../caseStudyBlocks'

export const happytenantLandlordBlocks: CaseStudyBlock[] = [
  // ── Opening ────────────────────────────────────────────────────────────────
  // De-boxed intro: plain text, no callout box
  {
    type: 'text',
    id: 'htl-thesis',
    size: 'lg',
    content:
      'My work on the HappyTenant Landlord experience focused on structuring dense portfolio, financial, and operational data into clear owner decisions — inside an established residential PropTech platform built for multi-property managers.',
  },
  {
    type: 'metrics',
    id: 'htl-summary',
    paddingTop: '0.5rem',
    items: [
      { metric: 'Engagement', value: 'LAVA Brands' },
      { metric: 'Platform', value: 'Mobile app' },
      { metric: 'Status', value: 'Prototype / design' },
      { metric: 'Scope', value: 'Portfolio · finance · operations' },
    ],
  },

  // ── Product video — large cinematic stage ──────────────────────────────────
  {
    type: 'video',
    id: 'htl-product-video',
    src: '/images/projects/Landlord_app.webm',
    poster: '/images/case-studies/happytenant-landlord/hero.webp',
    autoPlay: true,
    loop: true,
    muted: true,
    className: 'htl-video-stage',
  },

  // ── 01 · THE CHALLENGE ──────────────────────────────────────────────────────
  {
    type: 'heading',
    id: 'htl-problem',
    label: 'The challenge',
    content: 'Complexity, made readable.',
  },
  // Visual-first: show the density problem at showcase width
  {
    type: 'image',
    id: 'htl-density-visual',
    src: '/images/case-studies/happytenant-landlord/density.webp',
    alt: 'Overview of the landlord product showing multiple high-frequency modules competing for the same mobile screen real estate: financial data, work orders, approvals, and portfolio navigation',
    caption:
      'Four high-frequency workflows in a single mobile scroll — financial position, operational volume, approval actions, and portfolio depth. Every section competed for the same vertical real estate.',
    width: 'full',
    zoom: true,
    className: 'htl-showcase',
  },
  // De-boxed: plain text, no callout border
  {
    type: 'text',
    id: 'htl-problem-text',
    size: 'md',
    content:
      'The design problem was hierarchy: what needs action now, what provides financial context, and what belongs at secondary depth. The challenge was not simplifying the information — it was establishing enough structure that density reads as power rather than noise.',
  },

  // ── 02 · INFORMATION ARCHITECTURE ─────────────────────────────────────────
  {
    type: 'heading',
    id: 'htl-ia',
    label: 'Information architecture',
    content: 'Structure before screens.',
  },
  {
    type: 'image',
    id: 'htl-ia-visual',
    src: '/images/case-studies/happytenant-landlord/ia-map.webp',
    alt: 'Information architecture map showing the landlord app navigation structure across Home, Portfolio, Work Orders, Financial, and Supporting Records modules',
    caption:
      'Navigation structure for the landlord experience — five primary modules, each with its own operational depth and distinct user intent.',
    width: 'full',
    zoom: true,
    className: 'htl-showcase',
  },

  // ── 03 · HOME — DARK + CINEMATIC STATEMENT ────────────────────────────────
  {
    type: 'heading',
    id: 'htl-home',
    label: 'Home',
    content: 'An owner dashboard, not a KPI collage.',
    // htl-statement: cinematic scale — large Syne, max-width 12ch
    // htl-dark: full-bleed dark background
    className: 'htl-dark htl-statement',
  },
  {
    type: 'image',
    id: 'htl-home-visual',
    src: '/images/case-studies/happytenant-landlord/_presentation/home.webp',
    alt: 'HappyTenant Landlord Home showing three panels: financial snapshot with pending payments and income, share breakdown and shortcuts, and WO KPIs with approvals and portfolio summary',
    caption:
      'Landlord Home: financial snapshot and wallet status above the fold → share breakdown and shortcuts mid-band → WO KPIs, approval cards, and portfolio reach below.',
    width: 'full',
    zoom: true,
    className: 'htl-cin htl-dark',
  },
  {
    type: 'decision',
    id: 'htl-d-home',
    title: 'Prioritize financial status, then operational actions, then portfolio depth',
    evidence:
      'A landlord opening the dashboard most often needs to know their financial position — pending income, wallet balance, due payments. Work-order KPIs and approval requests are action-oriented but lower-frequency. Portfolio navigation belongs below both.',
    options: [
      'Equal-weight grid of all modules (feature launcher)',
      'Financial-first hierarchy: income and balance at top, WO KPIs and approvals mid, portfolio below',
      'Single-purpose view (payments only) with portfolio behind a separate tab',
    ],
    decision:
      'Structure Home as an owner status dashboard: financial snapshot (income, pending, wallet) at top, share breakdown and key shortcuts mid-section, WO KPIs and approval requests as action items, portfolio shortcuts at the base.',
    tradeoff:
      'A dense home trades whitespace for information completeness. Approval requests must feel actionable — not decorative — which required pairing Approve / Reject buttons directly in the card rather than behind a separate detail screen.',
    result:
      'Home reads as a financial and operational command surface. The owner can orient themselves, take an approval action, and navigate to portfolio depth from one scroll.',
  },

  // ── 04 · APPROVALS (functional heading — sub-section) ─────────────────────
  {
    type: 'heading',
    id: 'htl-approvals',
    label: 'Decision support',
    content: 'Context before action.',
    // htl-functional: smaller scale, Inter — sub-section under Home
    className: 'htl-functional',
  },
  // Deliberately NARROW (inset) — scale contrast after cinematic Home
  {
    type: 'image',
    id: 'htl-approvals-visual',
    src: '/images/case-studies/happytenant-landlord/approvals.webp',
    alt: 'Requests for Approval section from Landlord Home showing approval cards with Approve and Reject buttons alongside unit KPIs: Units 77, Leases 65, Work Orders 12',
    caption:
      'Approval cards on Home: request context and Approve / Reject inline. Unit, lease, and work-order counts give operational orientation at a glance.',
    width: 'inset',
    zoom: true,
  },

  // ── 05 · PORTFOLIO ─────────────────────────────────────────────────────────
  {
    type: 'heading',
    id: 'htl-portfolio',
    label: 'Portfolio',
    content: 'Portfolio, three levels deep.',
  },
  {
    type: 'image',
    id: 'htl-portfolio-visual',
    src: '/images/case-studies/happytenant-landlord/_presentation/portfolio-drilldown.webp',
    alt: 'Three-screen portfolio hierarchy: Rentals searchable property list, Property Details for Sky Creek Tower with unit count and active work orders, Unit Details with contracts, inventory, attachments and inspections',
    caption:
      'Rentals → Property Details → Unit Details. Each level carries its own operational context — property-level work order count, unit-level contracts and inventory.',
    width: 'full',
    zoom: true,
    className: 'htl-cin',
  },
  {
    type: 'decision',
    id: 'htl-d-portfolio',
    title: 'Three-level hierarchy over a flat unit list',
    evidence:
      'A flat unit list works for a single property. Across multiple properties, landlords need the property aggregate first — unit count, active work orders — before drilling to a specific unit. The Property Details tier carries this context without overloading unit detail.',
    options: [
      'Flat searchable unit list (no property-level tier)',
      'Rentals → Property Details → Unit Details — three levels, each with its own context',
      'Tab-based navigation with Units, Work Orders, and Documents as parallel tabs',
    ],
    decision:
      'Establish three drill-down levels. Rentals provides portfolio overview with search. Property Details surfaces unit count and active work orders. Unit Details carries contracts, inventory, inspections, and attachments.',
    tradeoff:
      'Three levels adds navigation depth. For a landlord managing dozens of units across multiple properties, the property aggregate tier saves scanning a long undifferentiated unit list — the tradeoff is more taps for single-property cases.',
    result:
      'The portfolio hierarchy scales to multi-property portfolios without requiring landlords to search by unit alone. Each level is purposeful rather than a navigation pass-through.',
  },

  // ── 06 · WORK ORDERS ───────────────────────────────────────────────────────
  {
    type: 'heading',
    id: 'htl-wo',
    label: 'Work orders',
    content: 'Operations in one view.',
  },
  // Wide lifecycle sequence: 3-screen WO progression at showcase width
  {
    type: 'image',
    id: 'htl-wo-states',
    src: '/images/case-studies/happytenant-landlord/_presentation/work-orders.webp',
    alt: 'Work Orders across list view, Active operational view, and Complete view showing status transitions from New to On Hold to Active to Complete',
    caption:
      'Work order list → Active → Complete. Status transitions and operational context stay connected across the lifecycle.',
    width: 'full',
    zoom: true,
    className: 'htl-showcase',
  },
  // Narrow detail shot — scale contrast after the wide lifecycle sequence
  {
    type: 'image',
    id: 'htl-wo-detail',
    src: '/images/case-studies/happytenant-landlord/_presentation/work-order-detail.webp',
    alt: 'Work Order detail showing Electricity Fault at Tiger Tower, category Maintenance and Repair - Air Conditioner, due date, technicians, and quotations',
    caption:
      'Work Order detail — category, property, technicians, due date, and quotations in a single inspectable record.',
    width: 'contained',
    zoom: true,
  },

  // ── 07 · FINANCIAL OVERSIGHT ───────────────────────────────────────────────
  {
    type: 'heading',
    id: 'htl-financial',
    label: 'Financial oversight',
    content: 'Money at every level.',
  },
  // Cinematic: financial hierarchy earns the full stage
  {
    type: 'image',
    id: 'htl-financial-visual',
    src: '/images/case-studies/happytenant-landlord/_presentation/financial.webp',
    alt: 'Three financial screens: Wallet showing total income, available balance, management fees, and security deposits; Due Payments list with overdue amounts; Payment Details with amount, tax, total, received, and due date',
    caption:
      'Wallet → Due Payments → Payment Details. Financial state at three levels: portfolio balance, overdue list, and individual payment breakdown.',
    width: 'full',
    zoom: true,
    className: 'htl-cin',
  },

  // ── 08 · PORTFOLIO RECORDS ─────────────────────────────────────────────────
  {
    type: 'heading',
    id: 'htl-supporting',
    label: 'Portfolio records',
    content: 'Records within reach.',
  },
  {
    type: 'image',
    id: 'htl-supporting-visual',
    src: '/images/case-studies/happytenant-landlord/supporting.webp',
    alt: 'Four supporting screens: Contracts list, Reports, Documents with expiry dates and status tags, and Download Center',
    caption:
      'Contracts, Reports, Documents (with expiry status tags), and Download Center — consistent record-access patterns across portfolio administration.',
    width: 'full',
    zoom: true,
    className: 'htl-showcase',
  },

  // ── 09 · REAL CONDITIONS — DARK + CINEMATIC STATEMENT ─────────────────────
  {
    type: 'heading',
    id: 'htl-states',
    label: 'Real conditions',
    content: 'Every state, covered.',
    className: 'htl-dark htl-statement',
  },
  {
    type: 'image',
    id: 'htl-states-visual',
    src: '/images/case-studies/happytenant-landlord/states.webp',
    alt: 'Cross-module states: Work Order status tags (New, On Hold, Active, Complete), Due Payments overdue list, Work Order complete view with financial summary, and Wallet balance',
    caption:
      'Work order status tags, overdue due payments, completed work orders with financial summary, and wallet balance — state coverage across the four highest-frequency landlord workflows.',
    width: 'full',
    zoom: true,
    className: 'htl-cin htl-dark',
  },

  // ── 10 · DELIVERED DESIGN ──────────────────────────────────────────────────
  {
    type: 'heading',
    id: 'htl-delivered',
    label: 'Delivered design',
    content: 'What was delivered.',
    className: 'htl-functional',
  },
  {
    type: 'features',
    id: 'htl-deliverables',
    items: [
      {
        name: 'Financial-first home hierarchy',
        description:
          'Landlord Home surfaces income, wallet balance, and due payments above the fold — giving owners a financial position read before they take operational action.',
      },
      {
        name: 'Three-level portfolio navigation',
        description:
          'Rentals → Property Details → Unit Details provides a scalable hierarchy for multi-property portfolios, with operational context at each appropriate tier.',
      },
      {
        name: 'Status-explicit operational tracking',
        description:
          'Work orders and due payments use explicit status tags (New, On Hold, Active, Complete, Overdue) across list and detail views — owners can assess operational load without opening individual records.',
      },
    ],
  },

  // ── 11 · REFLECTION ────────────────────────────────────────────────────────
  {
    type: 'heading',
    id: 'htl-reflection',
    label: 'Reflection',
    content: 'What the product required.',
    className: 'htl-functional',
  },
  {
    type: 'callout',
    id: 'htl-reflection-callout',
    tone: 'neutral',
    content:
      'The landlord product is denser than the tenant product by design — owners need to read financial position and operational volume at a glance. The hierarchy work on Home and the three-level portfolio structure were the two decisions that made the rest of the product feel organized rather than data-heavy.',
  },

  // ── Navigation ────────────────────────────────────────────────────────────
  {
    type: 'cta-pair',
    id: 'htl-ctas',
    primary: {
      label: 'View Tenant experience →',
      href: '/case-studies/happytenant-tenant-experience',
    },
    secondary: {
      label: 'View Figma prototype ↗',
      href: 'https://www.figma.com/proto/zdt9Yi8B8XQ4teVHnWL21F/',
      external: true,
    },
  },
]
