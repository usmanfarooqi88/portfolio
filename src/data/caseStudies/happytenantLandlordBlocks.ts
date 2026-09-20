import type { CaseStudyBlock } from '../caseStudyBlocks'

export const happytenantLandlordBlocks: CaseStudyBlock[] = [
  // Opening
  {
    type: 'text',
    id: 'htl-thesis',
    size: 'lg',
    content:
      'My work on the HappyTenant Landlord experience focused on structuring dense portfolio, financial, and operational data into clear owner decisions and actions — inside an established residential PropTech platform built for multi-property managers.',
  },
  {
    type: 'metrics',
    id: 'htl-summary',
    items: [
      { metric: 'Engagement', value: 'LAVA Brands' },
      { metric: 'Platform', value: 'Mobile app' },
      { metric: 'Status', value: 'Prototype / design' },
      { metric: 'Scope', value: 'Portfolio · finance · operations' },
    ],
  },

  // The challenge
  {
    type: 'heading',
    id: 'htl-problem',
    label: 'The challenge',
    content: 'Dense portfolio data, clear owner decisions',
  },
  {
    type: 'text',
    id: 'htl-problem-p',
    content:
      'Landlord Home had to surface pending payments, income, wallet balance, work-order KPIs, approval requests, and portfolio shortcuts — all in one mobile scroll. The design problem was hierarchy: what needs action now, what provides financial context, and what belongs at secondary depth. Every section competed for the same vertical real estate.',
  },

  // Home
  {
    type: 'heading',
    id: 'htl-home',
    label: 'Home hierarchy',
    content: 'An owner dashboard, not a KPI collage',
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

  // Approvals
  {
    type: 'heading',
    id: 'htl-approvals',
    label: 'Decision support',
    content: 'Approvals: request context paired with action',
  },
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

  // Portfolio → Property → Unit
  {
    type: 'heading',
    id: 'htl-portfolio',
    label: 'Portfolio drill-down',
    content: 'Rentals → Property → Unit: three levels of depth',
  },
  {
    type: 'text',
    id: 'htl-portfolio-p',
    content:
      'A multi-property landlord needs both a portfolio overview and the ability to reach any individual unit. The three-level hierarchy keeps operational information at the right tier: work orders and unit counts at property level, contracts, inventory, and inspections at unit level — not scattered across navigation tabs.',
  },
  {
    type: 'image',
    id: 'htl-portfolio-visual',
    src: '/images/case-studies/happytenant-landlord/_presentation/portfolio-drilldown.webp',
    alt: 'Three-screen portfolio hierarchy: Rentals searchable property list, Property Details for Sky Creek Tower with unit count and active work orders, Unit Details with work order count, contracts, inventory, attachments and inspections',
    caption:
      'Rentals → Property Details → Unit Details. Each level carries its own operational context — property-level work order count, unit-level contracts and inventory.',
    width: 'full',
    zoom: true,
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

  // Work Orders
  {
    type: 'heading',
    id: 'htl-wo',
    label: 'Work orders',
    content: 'Operational volume, made trackable',
  },
  {
    type: 'text',
    id: 'htl-wo-p',
    content:
      'Work orders are the primary operational volume for a landlord — assigned to technicians, categorized, and tracked through New → On Hold → Active → Complete transitions. The design surfaces both the list with status tags and the full detail view with category, due date, technicians, and quotations.',
  },
  {
    type: 'image',
    id: 'htl-wo-detail',
    src: '/images/case-studies/happytenant-landlord/_presentation/work-order-detail.webp',
    alt: 'Work Orders list with New and On Hold status tags alongside Work Order detail showing Electricity Fault at Tiger Tower, category Maintenance and Repair - Air Conditioner, due date, and technicians',
    caption:
      'Work Orders list with status tags (New, On Hold) and Work Order detail — category, property, technicians, due date, and quotations in a single inspectable record.',
    width: 'contained',
    zoom: true,
  },
  {
    type: 'image',
    id: 'htl-wo-states',
    src: '/images/case-studies/happytenant-landlord/_presentation/work-orders.webp',
    alt: 'Work Orders across list view, Active operational view, and Complete view showing status transitions',
    caption:
      'Work order list → Active → Complete. Status transitions and operational context stay connected across the lifecycle.',
    width: 'full',
    zoom: true,
  },

  // Financial
  {
    type: 'heading',
    id: 'htl-financial',
    label: 'Financial oversight',
    content: 'Wallet, due payments, and portfolio-level money',
  },
  {
    type: 'image',
    id: 'htl-financial-visual',
    src: '/images/case-studies/happytenant-landlord/_presentation/financial.webp',
    alt: 'Three financial screens: Wallet showing total income, available balance, management fees expense, and security deposits; Due Payments list with overdue amounts; Payment Details with amount, tax, total, received, and due date',
    caption:
      'Wallet → Due Payments → Payment Details. Financial state at three levels: portfolio balance, overdue list, and individual payment breakdown.',
    width: 'full',
    zoom: true,
  },

  // Supporting records
  {
    type: 'heading',
    id: 'htl-supporting',
    label: 'Portfolio records',
    content: 'Contracts, reports, documents, and download access',
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
  },

  // Real conditions
  {
    type: 'heading',
    id: 'htl-states',
    label: 'Real conditions',
    content: 'State breadth across the product',
  },
  {
    type: 'image',
    id: 'htl-states-visual',
    src: '/images/case-studies/happytenant-landlord/states.webp',
    alt: 'Cross-module states: Work Order status tags, Due Payments overdue list, Work Order complete view with financial summary, and Wallet balance',
    caption:
      'Work order status tags, overdue due payments, completed work orders with financial summary, and wallet balance — state coverage across the four highest-frequency landlord workflows.',
    width: 'full',
    zoom: true,
  },

  // What was established
  {
    type: 'heading',
    id: 'htl-delivered',
    label: 'Delivered design',
    content: 'What the design established',
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

  // Reflection
  {
    type: 'heading',
    id: 'htl-reflection',
    label: 'Reflection',
    content: 'What the product required',
  },
  {
    type: 'text',
    id: 'htl-reflection-p',
    content:
      'The landlord product is denser than the tenant product by design — owners need to read financial position and operational volume at a glance, not navigate to a single task. The hierarchy work on Home and the three-level portfolio structure were the two decisions that made the rest of the product feel organized rather than data-heavy. The challenge was not simplifying the information — it was establishing enough structure that density reads as power rather than noise.',
  },

  // Next
  {
    type: 'heading',
    id: 'htl-next',
    label: 'Next',
    content: 'Continue',
  },
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
