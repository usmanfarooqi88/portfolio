import type { CaseStudyBlock } from '../caseStudyBlocks'

/**
 * NHR case-study content.
 *
 * Evidence basis:
 * - Figma: Nozul Hotel and Resorts — App page
 *   https://www.figma.com/design/B645e7Kn52Sbw0d1KCQVpe/Nozul-Hotel-and-Resorts?node-id=0-1
 * - Role: Product Designer · Freelance Project
 *
 * Ownership: contribution framing — not zero-to-one claims.
 * Rewards Market is visible in bottom nav but no dedicated flow was verified.
 * UI dates, names, prices, and ratings are sample content — not metrics.
 */
export const nhrBlocks: CaseStudyBlock[] = [
  // Opening
  {
    type: 'text',
    id: 'nhr-thesis',
    size: 'lg',
    content:
      'My work on the NHR mobile experience focused on structuring the mobile side of the Nozul hospitality ecosystem — making dining discovery and reservation feel as primary as the stay, within a companion app connecting restaurants, events, and booking management. The website experience was designed within the same client engagement.',
  },
  {
    type: 'metrics',
    id: 'nhr-summary',
    items: [
      { metric: 'Engagement', value: 'Freelance project' },
      { metric: 'Platform', value: 'Mobile' },
      { metric: 'Focus', value: 'Dining · events · bookings' },
      { metric: 'Status', value: 'Prototype / product design' },
    ],
  },

  // The challenge
  {
    type: 'heading',
    id: 'nhr-problem',
    label: 'The challenge',
    content: 'Inspiration and commitment in the same guest experience',
  },
  {
    type: 'text',
    id: 'nhr-problem-p',
    content:
      'Hospitality guests arrive with different intents — browsing for dinner, planning a special occasion, managing a reservation. The design challenge is keeping dining discovery, event booking, and reservation management coherent inside one mobile product without turning the experience transactional too early or burying dining behind secondary navigation.',
  },

  // Guest journey
  {
    type: 'heading',
    id: 'nhr-journey',
    label: 'Guest journey',
    content: 'Discovery to managed commitment',
  },
  {
    type: 'pipeline',
    id: 'nhr-journey-pipeline',
    caption: 'The primary journey through the NHR guest experience.',
    items: [
      { label: 'Home', detail: 'Hospitality gateway — dining entry' },
      { label: 'Discover', detail: 'Restaurant categories and browse' },
      { label: 'Detail', detail: 'Venue information and menu' },
      { label: 'Reserve', detail: 'Table or event booking form' },
      { label: 'Booking', detail: 'Confirmed guest commitment' },
      { label: 'Manage', detail: 'Upcoming and previous states' },
    ],
  },

  // Home
  {
    type: 'heading',
    id: 'nhr-home',
    label: 'Home',
    content: 'The hospitality gateway',
  },
  {
    type: 'text',
    id: 'nhr-home-p',
    content:
      'Home greets the guest by name and leads immediately with dining — "Find the best food around you" — surfacing category cards (Night Life, Casual Dining) and a Book Your Event callout above About Nozul Hotel context. Stay booking lives in the Bookings tab so it remains accessible without competing for the first scroll.',
  },
  {
    type: 'image',
    id: 'nhr-home-visual',
    src: '/images/case-studies/nhr/_presentation/home.webp',
    alt: 'NHR Home screen showing personalized greeting, dining categories Night Life and Casual Dining, and Book Your Event callout',
    caption:
      'Home hierarchy: personalized greeting → dining categories and discovery → Book Your Event callout → About Nozul context.',
    width: 'inset',
    zoom: true,
  },
  {
    type: 'decision',
    id: 'nhr-d-home',
    title: 'Lead Home with dining, not only the stay',
    evidence:
      'Home copy centers on "Find the best food around you" with dining category cards and a Book Your Event callout. Bookings is a dedicated bottom-nav tab. Stay management does not own the first scroll.',
    options: [
      'Lead with room reservation and availability — treat dining as secondary',
      'Balance dining and stay booking equally on home with two equal sections',
      'Lead with dining categories and events — keep Bookings in dedicated navigation',
    ],
    decision:
      'Treat dining discovery as a first-class home job so hospitality engagement starts with food and occasion intent — not room management.',
    tradeoff:
      'A dining-led home can make pure stay-booking feel one tap farther away. Keeping Bookings as a dedicated destination maintains that path without overloading Home.',
    result:
      'Home reads as a guest lifestyle surface — restaurants and events first, reservations available without dominating the opening view.',
  },

  // Dining discovery
  {
    type: 'heading',
    id: 'nhr-dining',
    label: 'Dining',
    content: 'From discovery to reservation commitment',
  },
  {
    type: 'text',
    id: 'nhr-dining-p',
    content:
      'Restaurant browse surfaces venues with food photography, location, and ratings — filterable by category (All, Nightlife, Casual Dining, Fine Dining). From the list, guests move into Restaurant Details with an About tab, a Menu tab, and direct access to Reserve a Table and Book an Event. The path is designed to give context before asking for commitment.',
  },
  {
    type: 'image',
    id: 'nhr-restaurants-visual',
    src: '/images/case-studies/nhr/_presentation/restaurants.webp',
    alt: 'NHR Restaurants list with All, Nightlife, Casual Dining filter tabs and three restaurant cards with food photography, location and ratings',
    caption:
      'Restaurants list — category filters, venue photography, and rating context before entering a specific venue.',
    width: 'inset',
    zoom: true,
  },
  {
    type: 'image',
    id: 'nhr-restaurant-flow',
    src: '/images/case-studies/nhr/_presentation/restaurant-flow.webp',
    alt: 'Restaurant details with About tab and venue description, Menu tab with dish photography and Reserve a Table CTA, and Reserve a Table form with guest count, date and time selection',
    caption:
      'Details → Menu → Reserve a Table. Context before the form — venue identity, menu browse, then structured reservation commitment.',
    width: 'full',
    zoom: true,
  },
  {
    type: 'decision',
    id: 'nhr-d-restaurant',
    title: 'Context before form: keep commitment behind comprehension',
    evidence:
      'Dedicated Restaurant Details (About, Menu tabs) appear before Reserve a Table. The reservation screen collects party size, date, and time preference as a structured form — it does not appear as the primary CTA on the list view.',
    options: [
      'Reserve CTA directly on the restaurant card — skip details',
      'Details and Menu tabs before Reserve a Table form',
      'Single-page restaurant detail with inline booking widget',
    ],
    decision:
      'Let guests evaluate the venue and browse the menu before entering reservation fields, so commitment follows comprehension rather than arriving as a bare form.',
    tradeoff:
      'More screens before booking can slow a guest who already knows the venue. Fewer screens would risk commitment without menu or venue clarity for first-time guests.',
    result:
      'A dining path of discover → understand → commit — designed to support both browsing and deliberate reservation without claiming usability-test outcomes.',
  },

  // Events
  {
    type: 'heading',
    id: 'nhr-events',
    label: 'Events',
    content: 'A second hospitality commitment mode',
  },
  {
    type: 'text',
    id: 'nhr-events-p',
    content:
      'Events live within the restaurant experience — accessible as a tab alongside About, Menu, and Reserve a Table. Upcoming Events surfaces occasion cards (Valentine\'s Day Special, Christmas) with dates and pricing. Book an Event collects name, guest count, contact, and start date — a distinct form from table reservation, acknowledging occasion-specific needs.',
  },
  {
    type: 'image',
    id: 'nhr-events-visual',
    src: '/images/case-studies/nhr/_presentation/events.webp',
    alt: 'Events section in restaurant detail showing Upcoming Events with Valentine and Christmas occasion cards and pricing, and Book an Event form with name, guests and date fields',
    caption:
      'Events within the restaurant experience: occasion discovery (Upcoming Events) → Book an Event form with occasion-specific fields.',
    width: 'full',
    zoom: true,
  },

  // Bookings
  {
    type: 'heading',
    id: 'nhr-bookings',
    label: 'Bookings',
    content: 'Reservations remain manageable after commitment',
  },
  {
    type: 'text',
    id: 'nhr-bookings-p',
    content:
      'Bookings separates Upcoming from Previous. Upcoming shows the active reservation — party size, date, time, table number — with Reschedule and Cancel actions and a Make a New Booking shortcut. Previous shows completed and cancelled reservations with Done and Cancelled status tags. Reservations are not dead ends; they become manageable guest commitments.',
  },
  {
    type: 'image',
    id: 'nhr-bookings-visual',
    src: '/images/case-studies/nhr/_presentation/bookings.webp',
    alt: 'Bookings Upcoming tab showing active table reservation with Reschedule and Cancel actions, and Previous tab showing Done and Cancelled reservation history',
    caption:
      'Upcoming — active reservation with Reschedule and Cancel. Previous — completed and cancelled history with status tags.',
    width: 'full',
    zoom: true,
  },

  // Supporting experience
  {
    type: 'heading',
    id: 'nhr-supporting',
    label: 'Product entry',
    content: 'Brand-first entry and account surfaces',
  },
  {
    type: 'text',
    id: 'nhr-supporting-p',
    content:
      'Splash, onboarding, sign up, and sign in establish the Nozul brand before the guest reaches the product. Additional surfaces include profile, payment methods, About Nozul Hotel, contact, and legal pages — supporting the guest journey without competing with the booking experience.',
  },
  {
    type: 'image',
    id: 'nhr-supporting-visual',
    src: '/images/case-studies/nhr/_presentation/supporting.webp',
    alt: 'Splash screen with NHR serif logo, onboarding with location context, sign up form, and sign in form',
    caption: 'Splash · Onboarding · Sign Up · Sign In — premium brand entry before the dining experience.',
    width: 'full',
    zoom: true,
  },

  // What was established
  {
    type: 'heading',
    id: 'nhr-delivered',
    label: 'Delivered design',
    content: 'What the design established',
  },
  {
    type: 'features',
    id: 'nhr-deliverables',
    items: [
      {
        name: 'Dining as the hospitality entry point',
        description:
          'Home leads with restaurant discovery and dining categories rather than room reservation — making the guest experience feel like a hospitality lifestyle product, not a booking utility.',
      },
      {
        name: 'Context before commitment in restaurant journeys',
        description:
          'Restaurant Details and Menu tabs give guests venue and menu clarity before the reservation form appears — comprehension before commitment.',
      },
      {
        name: 'Reservations with clear state management',
        description:
          'Bookings separates Upcoming from Previous with action-supporting states (Reschedule, Cancel) and history status tags (Done, Cancelled) — reservations remain visible and manageable after the guest commits.',
      },
    ],
  },

  // Reflection
  {
    type: 'heading',
    id: 'nhr-reflection',
    label: 'Reflection',
    content: 'What the product demonstrates',
  },
  {
    type: 'text',
    id: 'nhr-reflection-p',
    content:
      'Hospitality products fail when they treat the guest as only a room reservation. NHR shows how dining and events can sit alongside stay bookings without fragmenting into separate mini-apps. The home hierarchy decision — dining first — is the structural choice that sets the tone for the rest of the product. Booking states matter as much as booking forms: reservations need to remain actionable, not just acknowledged. If analytics were available, I would measure dining-to-reservation completion rates and how often guests open Bookings directly from Home — before expanding any nav items that currently lack verified end-to-end flows.',
  },

  // Next
  {
    type: 'heading',
    id: 'nhr-next',
    label: 'Next',
    content: 'Continue',
  },
  {
    type: 'cta-pair',
    id: 'nhr-ctas',
    primary: {
      label: 'Explore the Nozul web experience →',
      href: '/case-studies/nozul-hotels-website',
    },
    secondary: {
      label: 'View NHR prototype ↗',
      href: 'https://www.figma.com/proto/B645e7Kn52Sbw0d1KCQVpe/',
      external: true,
    },
  },
]
