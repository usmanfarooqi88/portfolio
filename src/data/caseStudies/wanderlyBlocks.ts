import type { CaseStudyBlock } from '../caseStudyBlocks'

/**
 * Wanderly case-study content.
 *
 * Evidence basis:
 * - Behance: https://www.behance.net/gallery/243279399/Wanderly-AI-Travel-Planner-App-UXUI
 * - Local screen exports under public/images/case-studies/wanderly/
 *
 * Ownership: contribution framing — not zero-to-one or sole-authorship claim.
 * Duration: Behance presents a 20-day / 4-sprint design exercise — treated as such.
 * UI prices and copy are product content — not project metrics.
 * Unsupported KPIs (60% faster, 4.8/5, +45% booking, +38% retention) are excluded.
 */
export const wanderlyBlocks: CaseStudyBlock[] = [
  // Opening
  {
    type: 'text',
    id: 'w-thesis',
    size: 'lg',
    content:
      'My work on Wanderly focused on turning conversational travel intent into structured trip options and a coherent path from planning to booking.',
  },
  {
    type: 'metrics',
    id: 'w-summary',
    items: [
      { metric: 'Role', value: 'Product Designer' },
      { metric: 'Engagement', value: 'Freelance Project' },
      { metric: 'Status', value: 'Prototype / product design' },
      { metric: 'Duration', value: '20-day design case · 4 sprints' },
    ],
  },

  // The challenge
  {
    type: 'heading',
    id: 'w-problem',
    label: 'The challenge',
    content: 'Unstructured travel intent, structured booking decision',
  },
  {
    type: 'text',
    id: 'w-problem-p',
    content:
      'Travel planning starts messy — a duration, a rough destination, a budget range, maybe just "somewhere warm." The design challenge on Wanderly was turning that open-ended intent into a product moment where guests could see comparable options and commit to one, without manually assembling flights, hotels, and activities as separate searches.',
  },

  // Planning journey
  {
    type: 'heading',
    id: 'w-journey',
    label: 'Planning journey',
    content: 'Intent to confirmed booking',
  },
  {
    type: 'pipeline',
    id: 'w-journey-pipeline',
    caption: 'The primary path through Wanderly — from open request to booking confirmation.',
    items: [
      { label: 'Intent', detail: 'Natural-language travel request' },
      { label: 'Clarify', detail: 'AI conversation — preferences and budget' },
      { label: 'Compare', detail: 'Budget · Mid · Luxury package tiers' },
      { label: 'Review', detail: 'Full package breakdown with Customize' },
      { label: 'Details', detail: 'Traveler information' },
      { label: 'Pay', detail: 'Payment' },
      { label: 'Confirmed', detail: 'Booking confirmation and trip summary' },
    ],
  },

  // Conversation → packages
  {
    type: 'heading',
    id: 'w-packages',
    label: 'Conversation to comparable options',
    content: 'From open request to three structured tiers',
  },
  {
    type: 'text',
    id: 'w-packages-p',
    content:
      'AI Chat absorbs ambiguity upstream — asking about star ratings, included activities, budget preference. The critical handoff comes when conversation ends and Trip Packages begin: three comparable tiers (Budget-Friendly €490 / Mid-Range €980 / Luxury €1,850) with expandable flight and hotel detail and clear Customize and Buy Now actions. The design move is the transition from open dialogue to structured decision UI.',
  },
  {
    type: 'image',
    id: 'w-packages-visual',
    src: '/images/case-studies/wanderly/_presentation/screen-ai-trip-plan.webp',
    alt: 'AI Chat conversation for a 4-day London trip from Spain, followed by Trip Packages section showing Budget-Friendly at €490 with EasyJet economy €120 and The Crest Inn 3-star €280, and Mid-Range at €980 with British Airways economy €200 and Thames Lodge 4-star €600, each with Customize and Buy Now actions',
    caption:
      'Chat resolves into Trip Packages — comparable tier cards with expandable flight and hotel detail per option, and Customize or Buy Now as next actions.',
    width: 'full',
    zoom: true,
  },
  {
    type: 'image',
    id: 'w-packages-tiers',
    src: '/images/case-studies/wanderly/_presentation/module-10.webp',
    alt: 'AI Trip Planning editorial showing the chat conversation on the left and three package tier cards on the right: €490 Budget-Friendly with economy flights, 3-star hotels and essential activities; €980 Mid-Range with economy flights, 4-star hotels and guided tours; €1,850 Luxury with business class, 5-star hotels and VIP experiences',
    caption:
      '€490 Budget-Friendly · €980 Mid-Range · €1,850 Luxury — three tiers with clear tier descriptions let guests compare spending levels before entering detail.',
    width: 'full',
    zoom: true,
  },
  {
    type: 'decision',
    id: 'w-d-packages',
    title: 'End the conversation where comparison begins',
    evidence:
      'AI Chat presents a trip request and clarification exchange ("I\'d prefer a mix — one budget-friendly, one mid-range, one luxury"), then hands off to a Trip Packages section with Budget-Friendly (€490), Mid-Range (€980), and Luxury (€1,850) tier cards — each with expandable flight and hotel detail and Customize / Buy Now actions.',
    options: [
      'Chat continues through to a single AI-recommended package — no side-by-side comparison',
      'Chat hands off to three comparable structured tier cards — Budget · Mid · Luxury',
      'Traditional search filters after initial prompt — no conversational AI',
    ],
    decision:
      'Let AI absorb ambiguity in conversation, then resolve it into structured comparable options — so guests shift from open dialogue to a decision surface without rebuilding the trip themselves.',
    tradeoff:
      'Three fixed tiers can oversimplify edge cases (a guest who wants business-class flights but a budget hotel). Customize is the escape valve — available on every tier card.',
    result:
      'Conversation for intent, structured UI for choice — applied as the primary planning model throughout the prototype.',
  },

  // Package review → booking
  {
    type: 'heading',
    id: 'w-booking',
    label: 'User control before commitment',
    content: 'Full breakdown before payment',
  },
  {
    type: 'text',
    id: 'w-booking-p',
    content:
      'Package Review (step 1 of 5) surfaces the full itemized breakdown — Flight, Hotel, Activities, Transport — with a total cost and a [Customize] button before any payment step. Guests can inspect every component and adjust before committing. Step 5 lands at Booking Confirmation with the complete itinerary: flight details, hotel, booked activities, and transport.',
  },
  {
    type: 'image',
    id: 'w-review-visual',
    src: '/images/case-studies/wanderly/_presentation/screen-buy-now-steps.webp',
    alt: 'Package Review step 1 of 5 showing €1,475 Mid-Range with full itemized breakdown: British Airways economy round trip €200, The Grand Covent Garden 5-star €1,000 for 4 nights, Activities including London Eye fast track €50, Tower of London guided tour €60, Speedboat Thames €45, Windsor Castle tour €80, free National Gallery and Covent Garden stroll, Transport 4-day Travelcard €40, with Customize button and Back and Save and Continue footer',
    caption:
      'Package Review — step 1 of 5. Full itemized breakdown with a Customize button before any payment step.',
    width: 'contained',
    zoom: true,
  },
  {
    type: 'image',
    id: 'w-confirmed-visual',
    src: '/images/case-studies/wanderly/_presentation/screen-booking.webp',
    alt: 'Booking Confirmation screen showing Your trip is booked successfully with complete itinerary: British Airways round trip check-in 01 Dec, The Grand Covent Garden 5-star hotel, London Eye fast track, Tower of London guided tour, Windsor Castle tour, free activities, 4-day Travelcard, with Go to My Trips button',
    caption:
      'Booking Confirmed — complete trip summary: flights, hotel, activities, and transport on one confirmation screen.',
    width: 'contained',
    zoom: true,
  },
  {
    type: 'decision',
    id: 'w-d-booking',
    title: 'Full breakdown before payment — not a summary',
    evidence:
      'Package Review (step 1 of 5) surfaces Flight, Hotel, Activities, and Transport itemized with individual costs, a total, and a Customize button. Booking Confirmation (step 5) repeats the full confirmed itinerary with flight check-in times, hotel name, all activities, and transport.',
    options: [
      'Summary card → payment (no itemized breakdown or Customize before payment)',
      'Full itemized review with Customize → Traveler Details → Payment → Confirmation',
      'Inline edit within chat — no separate review step',
    ],
    decision:
      'Give guests a reviewable, editable breakdown before payment so a selected package feels understood and owned — not just accepted from an AI recommendation.',
    tradeoff:
      'A detailed review adds a step before payment. A shorter flow removes the Customize option and the review checkpoint where guests can correct AI assumptions.',
    result:
      'Package Review makes the AI recommendation inspectable and adjustable. Booking Confirmation closes the loop with the complete confirmed itinerary.',
  },

  // Beyond the planner
  {
    type: 'heading',
    id: 'w-explore',
    label: 'Beyond the planner',
    content: 'Direct discovery and membership',
  },
  {
    type: 'text',
    id: 'w-explore-p',
    content:
      'Explore Activities and Find a Hotel sit alongside the AI planning path — for guests who already know what they want to browse. Category tiles (Sightseeing, Cultural, Food, Outdoor, Family, Shopping, Relaxation) make Explore browsable without a prompt. Find a Hotel supports date, guest count, and Rewards filters against hotel inventory. Membership (Wanderly Plus $50/mon, Wanderly Elite $80/mon) extends the concept toward recurring engagement — personalised itineraries, exclusive deals, trip insights, and unlimited saved trips.',
  },
  {
    type: 'image',
    id: 'w-discovery-visual',
    src: '/images/case-studies/wanderly/_presentation/discovery.webp',
    alt: 'Explore activities screen with category tiles including Sightseeing and Landmarks, Cultural Experiences, Food and Drink Experiences, Outdoor and Adventure Activities, alongside Find a Hotel screen with Map, date Dec 18 to 22, 2 guests, Rewards, and Filter controls showing Dubai hotel results including Hilton Hotel Dubai and Blue hotel Dubai from €49 per adult',
    caption:
      'Explore (activity categories) and Find a Hotel (date, guest, Rewards filters) — direct discovery alongside the AI planning path.',
    width: 'full',
    zoom: true,
  },
  {
    type: 'image',
    id: 'w-plus-visual',
    src: '/images/case-studies/wanderly/_presentation/screen-wanderly-plus.webp',
    alt: 'Membership modal showing Wanderly Plus at $50 per month and Wanderly Elite at $80 per month on yearly payment, with five benefit rows: Personalised Itineraries AI-generated tailored to preferences, Exclusive Deals discounted flights hotels activities, Priority Support 24/7 chat, Trip Insights real-time flight and weather notifications, Unlimited Saved Trips, and Subscribe Now button',
    caption:
      'Membership — Wanderly Plus and Elite tiers ($50 / $80 monthly, yearly payment) with recurring value beyond individual bookings.',
    width: 'contained',
    zoom: true,
  },

  // Delivered design
  {
    type: 'heading',
    id: 'w-delivered',
    label: 'Delivered design',
    content: 'What the design established',
  },
  {
    type: 'features',
    id: 'w-deliverables',
    items: [
      {
        name: 'Conversation to structured decision',
        description:
          'AI Chat absorbs open-ended travel intent and resolves it into three comparable Budget · Mid · Luxury package tiers — each with full flight, hotel, and activity detail and a clear Customize or Buy Now action.',
      },
      {
        name: 'Inspectable package review before payment',
        description:
          'Package Review surfaces a full itemized breakdown with a Customize button as step 1 of the booking funnel — so guests can understand and adjust the AI recommendation before any payment step.',
      },
      {
        name: 'Connected planning-to-booking path',
        description:
          'Conversation, package selection, review, customization, and booking confirmation are one continuous product flow — not separated into planning and transactional modes.',
      },
    ],
  },

  // Reflection
  {
    type: 'heading',
    id: 'w-reflection',
    label: 'Reflection',
    content: 'What the project demonstrates',
  },
  {
    type: 'text',
    id: 'w-reflection-p',
    content:
      'The most important design decision was not the chat interface — it was knowing where conversation should stop. AI interfaces become more useful when ambiguity resolves into conventional, comparable decision structures. The Package Review step matters as much as the packages themselves: giving guests a readable, editable breakdown of what the AI recommended is how a recommendation earns trust rather than just presenting options. If this moved toward validation, I would measure whether guests use Customize before payment — and which components they change — as signal for where AI assumptions most often miss.',
  },

  // Next
  {
    type: 'heading',
    id: 'w-next',
    label: 'Next',
    content: 'Continue',
  },
  {
    type: 'cta-pair',
    id: 'w-ctas',
    primary: {
      label: 'View Skrewww →',
      href: '/case-studies/skrewww-design-system',
    },
    secondary: {
      label: 'View Behance case ↗',
      href: 'https://www.behance.net/gallery/243279399/Wanderly-AI-Travel-Planner-App-UXUI',
      external: true,
    },
  },
]
