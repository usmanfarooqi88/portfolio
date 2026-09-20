import type { CaseStudyBlock } from '../caseStudyBlocks'

export const heardBlocks: CaseStudyBlock[] = [
  // Opening
  {
    type: 'text',
    id: 'h-thesis',
    size: 'lg',
    content:
      'Designed a consumer restaurant ordering app spanning delivery, pickup, and table order — three distinct user intents sharing one checkout pipeline.',
  },
  {
    type: 'metrics',
    id: 'h-summary',
    items: [
      { metric: 'Fulfillment modes', value: '3 live paths' },
      { metric: 'Booking', value: 'Coming soon' },
      { metric: 'Platforms', value: 'iOS · Android' },
      { metric: 'Handoff', value: 'Figma + Zeplin' },
    ],
  },
  {
    type: 'image',
    id: 'h-cover',
    src: '/images/case-studies/heard/cover.webp',
    alt: 'Heard app cover showing home, splash, and restaurant menu screens',
    caption: 'Discovery home, restaurant menu, and brand splash.',
    width: 'full',
    zoom: true,
  },

  // Problem
  {
    type: 'heading',
    id: 'h-problem',
    label: 'The problem',
    content: 'Three ordering modes without a fragmented product',
  },
  {
    type: 'text',
    id: 'h-problem-p',
    content:
      'Users reach Heard through different intents — delivery at home, pickup on the go, table order from a scan at a restaurant. The design challenge was giving each mode the right entry point while keeping cart, customization, payment, and order status consistent across all three. Booking was on the roadmap but not ready to ship; the home had to carry it without creating false expectation.',
  },

  // Home redesign
  {
    type: 'heading',
    id: 'h-before-after',
    label: 'Home redesign',
    content: 'From a stacked list to a scannable product map',
  },
  {
    type: 'image',
    id: 'h-ba',
    src: '/images/case-studies/heard/_presentation/home-before-after.webp',
    alt: 'Before and after comparison of Heard home screen information architecture',
    caption:
      'Before: three stacked service cards, cart in the bottom tab bar. After: 2×2 mode grid, Near Me discovery row, cart in the header, Booking marked Coming Soon.',
    width: 'full',
    zoom: true,
  },
  {
    type: 'decision',
    id: 'h-d1',
    title: 'Restructure home for modes + discovery',
    evidence:
      'The earlier home treated fulfillment as a vertical list of three cards. Cart lived in the bottom tab bar alongside primary navigation — competing with Home, Search, Orders, and Profile — and left little room for nearby restaurant discovery. The page felt like a settings screen rather than a product launch point.',
    options: [
      'Keep stacked list, add a discovery row further down',
      '2×2 mode grid, cart in header, Near Me discovery on home',
      'Single default mode, hide others behind a secondary menu',
    ],
    decision:
      'Move to a 2×2 mode grid (Delivery, Pickup, Booking, Table Order), relocate cart to the header, reduce the tab bar to four destinations, and introduce a horizontal Near Me discovery row.',
    tradeoff:
      'Home becomes denser. Booking appears as a first-class tile even though it was not ready — handled with an explicit Coming Soon treatment to set expectation rather than hiding the roadmap item entirely.',
    result:
      'Home communicates the full product map in one viewport. Active-order status cards can compose above the mode grid when the user has a current order.',
  },

  // Ordering modes
  {
    type: 'heading',
    id: 'h-modes',
    label: 'Ordering modes',
    content: 'One checkout spine, three front doors',
  },
  {
    type: 'text',
    id: 'h-modes-p',
    content:
      'Delivery and pickup enter through search and browse. Table order enters through QR scan or restaurant search. After item selection the flows converge: cart → payment → preparation status → mode-specific completion. Booking sits outside the active flow — shown on home as Coming Soon rather than built out.',
  },
  {
    type: 'image',
    id: 'h-flow',
    src: '/images/case-studies/heard/_presentation/app-flow.webp',
    alt: 'Heard app flow diagram showing delivery, pickup, and table ordering paths merging into a shared select → cart → pay → prepare spine',
    caption:
      'Mode-specific entry (search or QR scan), then a shared select → cart → pay → prepare path. Completion branches back out: delivered, pick up, or served at the table.',
    width: 'full',
    zoom: true,
  },
  {
    type: 'image',
    id: 'h-lists',
    src: '/images/case-studies/heard/discovery-lists.webp',
    alt: 'Delivery, pickup, and general restaurant list screens',
    caption:
      'Same restaurant card structure across modes. ETA and collection badges encode the active fulfillment type without changing the card layout.',
    width: 'full',
    zoom: true,
  },

  // Menu → Cart → Payment
  {
    type: 'heading',
    id: 'h-order-journey',
    label: 'The ordering journey',
    content: 'Menu browse → item customization → payment',
  },
  {
    type: 'image',
    id: 'h-customize',
    src: '/images/case-studies/heard/_presentation/order-customize-pay.webp',
    alt: 'Menu list, item customization with required and optional modifier groups, cart with tip, and payment options including Apple Pay',
    caption:
      'Restaurant menu, required/optional modifier groups, cart with tip calculator, and payment — saved cards or Apple Pay.',
    width: 'full',
    zoom: true,
  },
  {
    type: 'text',
    id: 'h-payment-note',
    content:
      'Modifier groups distinguish required selections from optional add-ons at the item level — a small IA decision that prevents missed required choices without burying the user in every add-on upfront.',
  },

  // Order progress / completion
  {
    type: 'heading',
    id: 'h-status-heading',
    label: 'After payment',
    content: 'Order progress and home re-entry',
  },
  {
    type: 'image',
    id: 'h-status-img',
    src: '/images/case-studies/heard/_presentation/order-status.webp',
    alt: 'Ongoing order step tracker in progress state and completed confirmation state',
    caption:
      'Stepped tracker: active step is emphasized, completed steps collapse. Finished state moves to a clear done confirmation.',
    width: 'full',
    zoom: true,
  },
  {
    type: 'image',
    id: 'h-home-states',
    src: '/images/case-studies/heard/_presentation/home-order-states.webp',
    alt: 'Home screen in default state, with active delivery order card, and with active pickup order card',
    caption:
      'Home status cards for delivery and pickup reuse one structure. Mode color and status copy encode the difference — the card layout does not change.',
    width: 'full',
    zoom: true,
  },

  // Wireframe → hi-fi
  {
    type: 'heading',
    id: 'h-wires-heading',
    label: 'Process',
    content: 'Wireframe coverage before high fidelity',
  },
  {
    type: 'image',
    id: 'h-wires-img',
    src: '/images/case-studies/heard/_presentation/wireframes.webp',
    alt: 'Wireframes covering login, home mode grid, restaurant list, menu with search, cart with tip, and payment options',
    caption:
      'Wireframe set: phone login, home with mode grid and Near Me, restaurant list, menu with in-menu search, cart with tip, payment with Apple Pay. The same flows that became the high-fidelity product screens.',
    width: 'full',
    zoom: true,
  },

  // What was delivered
  {
    type: 'heading',
    id: 'h-delivered',
    label: 'Delivered design',
    content: 'What the design established',
  },
  {
    type: 'features',
    id: 'h-deliverables',
    items: [
      {
        name: 'One ordering structure across three modes',
        description:
          'A shared select → cart → pay → prepare spine with mode-specific entry and completion, rather than three disconnected ordering products.',
      },
      {
        name: 'Clearer discovery hierarchy on home',
        description:
          '2×2 mode grid, Near Me row, and cart relocated to the header — the full product map in one viewport, with Booking marked Coming Soon rather than omitted.',
      },
      {
        name: 'Implementation-ready handoff',
        description:
          'Figma design with Zeplin delivery for iOS and Android engineering, covering the same flows from wireframe through high-fidelity UI.',
      },
    ],
  },

  // Reflection
  {
    type: 'heading',
    id: 'h-reflection',
    label: 'Reflection',
    content: 'What staying coherent actually required',
  },
  {
    type: 'text',
    id: 'h-reflection-p',
    content:
      'The hardest part was not drawing another restaurant card — it was keeping three fulfillment modes coherent without tripling the system. The home redesign made clear that cart placement and tab-bar structure are product decisions, not decoration. If I had analytics access today, I would measure mode selection from home and completion rates by fulfillment path before expanding Booking into a full flow.',
  },

  // Next
  {
    type: 'heading',
    id: 'h-next',
    label: 'Next',
    content: 'Continue',
  },
  {
    type: 'cta-pair',
    id: 'h-ctas',
    primary: {
      label: 'View next — HappyTenant Tenant',
      href: '/case-studies/happytenant-tenant-experience',
    },
    secondary: {
      label: 'View Behance case study ↗',
      href: 'https://www.behance.net/gallery/164092641/Heard-App',
      external: true,
    },
  },
]
