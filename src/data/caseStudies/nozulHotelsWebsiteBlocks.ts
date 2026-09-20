import type { CaseStudyBlock } from '../caseStudyBlocks'

/**
 * Nozul Hotels & Resorts Website case-study content.
 *
 * Evidence basis:
 * - Figma: Nozul Hotel and Resorts — Website page (1:2)
 *   https://www.figma.com/design/B645e7Kn52Sbw0d1KCQVpe/Nozul-Hotel-and-Resorts?node-id=1-2
 * - Same client engagement as NHR mobile app (/case-studies/nhr), designed in parallel.
 *
 * Desktop-only product frames (~1664px). No responsive website variants verified.
 * Menu labels Hotels / Weddings / Loyalty lack verified destination frames.
 * Reservation currency: QR (Qatari Riyals). Market: Qatar/Doha.
 * UI dates, prices, and names are sample/brand content — not metrics.
 */
export const nozulHotelsWebsiteBlocks: CaseStudyBlock[] = [
  // Opening
  {
    type: 'text',
    id: 'nz-thesis',
    size: 'lg',
    content:
      'My work on the Nozul Hotels website focused on structuring a content-rich hospitality web experience — from brand storytelling and dining discovery through a clear reservation path — as the desktop touchpoint of the same client engagement that produced the NHR mobile guest app.',
  },
  {
    type: 'metrics',
    id: 'nz-summary',
    items: [
      { metric: 'Engagement', value: 'Freelance project' },
      { metric: 'Platform', value: 'Desktop web' },
      { metric: 'Focus', value: 'Discovery → reservation' },
      { metric: 'Status', value: 'Prototype / website design' },
    ],
  },

  // The challenge
  {
    type: 'heading',
    id: 'nz-problem',
    label: 'The challenge',
    content: 'Brand storytelling and reservation intent in one hospitality website',
  },
  {
    type: 'text',
    id: 'nz-problem-p',
    content:
      'A hospitality brand site must carry hotel positioning, restaurants, offers, events, meetings, brand story, and corporate content — without flattening them into equal-weight modules or reducing the property to a room-booking utility. Guests need a paced path from exploration to reservation intent, and a clear bridge into the companion mobile app when that is the right channel.',
  },

  // Guest journey
  {
    type: 'heading',
    id: 'nz-journey',
    label: 'Guest journey',
    content: 'Discovery to confirmed reservation',
  },
  {
    type: 'pipeline',
    id: 'nz-journey-pipeline',
    caption: 'The primary path through the Nozul website — from brand entry to booking confirmation.',
    items: [
      { label: 'Discover', detail: 'Home — brand entry and dining highlights' },
      { label: 'Browse', detail: 'Restaurant categories, events, offers' },
      { label: 'Evaluate', detail: 'Venue detail, menu, facilities, location' },
      { label: 'Reserve', detail: 'Make a Reservation → Summary' },
      { label: 'Pay', detail: 'Payment method and card entry' },
      { label: 'Confirm', detail: 'Booking confirmed with guest details' },
    ],
  },

  // Navigation IA
  {
    type: 'image',
    id: 'nz-menu',
    src: '/images/case-studies/nozul-hotels-website/menu.webp',
    alt: 'Nozul website expanded navigation menu listing Hotels, Restaurants, Weddings, Meetings and Events, All Events, Loyalty, and Careers with Contact Us, Why Us, About Us footer links',
    caption:
      'Global navigation: Hotels · Restaurants · Weddings · Meetings & Events · All Events · Loyalty · Careers. Designed destinations go deepest on restaurants, events, and reservation.',
    width: 'full',
    zoom: true,
  },

  // Home
  {
    type: 'heading',
    id: 'nz-home',
    label: 'Home',
    content: 'A discovery sequence, not a module collection',
  },
  {
    type: 'text',
    id: 'nz-home-p',
    content:
      'Home opens with a full-bleed restaurant carousel — La Spiga by Papermoon, COYA, Jean Georges — and an amenity strip (Fitness Center, Outdoor Pool, Spa, Outdoor Seating, Seasonal Menu). The page sequences deliberately: entry and dining above the fold, then Nozul\'s Essence brand content and partner logos, then a Get the App section promoting the companion mobile product, then the Restaurants and Hotels carousel with Reserve a Table and Book an Event actions per venue. Offers, Meetings & Events, testimonials, and footer conversion surfaces follow. Make a Reservation stays persistent in the header throughout.',
  },
  {
    type: 'image',
    id: 'nz-home-discovery',
    src: '/images/case-studies/nozul-hotels-website/_presentation/home-discovery.webp',
    alt: 'Nozul home page showing restaurant hero carousel with amenity strip, Nozul Essence brand section with partner hotel logos, and Get the App section with phone mockups showing Google Play and App Store badges',
    caption:
      'Home upper journey: restaurant hero → Nozul\'s Essence brand content → partner hotels → Get the App.',
    width: 'full',
    zoom: true,
  },
  {
    type: 'image',
    id: 'nz-home-services',
    src: '/images/case-studies/nozul-hotels-website/_presentation/home-services.webp',
    alt: 'Nozul home offers section with Dine in for 20% Off event cards, Meetings and Events photo collage with View Gallery and Make a Reservation links, and testimonial from Mary Johnson',
    caption:
      'Home mid journey: Events and Packages offer cards → Meetings & Events visual collage with make a reservation link → guest testimonials.',
    width: 'full',
    zoom: true,
  },
  {
    type: 'decision',
    id: 'nz-d-home',
    title: 'Sequence services instead of flattening them',
    evidence:
      'Home orders restaurant hero, brand content, Get the App, Restaurants/Hotels carousel, Offers, Meetings & Events, testimonials, and footer — with Make a Reservation persistent in the header. Each section has its own visual weight and dedicated scroll moment.',
    options: [
      'Equal-weight grid of all service categories on home (feature launcher)',
      'Sequenced scroll: entry → brand → dining discovery → offers → events → trust signals',
      'Single destination CTA — room booking only, everything else behind navigation',
    ],
    decision:
      'Give dining, offers, events, and brand content dedicated sections in a paced discovery scroll so each service gets appropriate attention without competing as identical cards.',
    tradeoff:
      'A long scroll can dilute urgency for guests who only want to book. Persistent Make a Reservation in the header keeps that path available throughout without forcing it to own the first screen.',
    result:
      'Home reads as a hospitality discovery journey — brand and dining first, transactional commitment available but not dominant.',
  },

  // Dining discovery
  {
    type: 'heading',
    id: 'nz-dining',
    label: 'Dining',
    content: 'Filtered inventory into venue commitment',
  },
  {
    type: 'text',
    id: 'nz-dining-p',
    content:
      'The Restaurants page is titled "Restaurants\' Categories" and opens with filter chips — All, Nightlife, Casual Dining, Fine Dining, Ethnic, Buffet — above a venue list. Each card shows food photography, venue name, description, and contact details (phone, email, website). Filtering narrows the inventory before a guest opens a detail page. Restaurant detail then provides the venue context needed before commitment: hero, About section with a Download Menu option, operating hours, facilities (Conference Room, Pet Area, Parking, Wifi, Outdoor BBQ), and a location map in Doha, Qatar.',
  },
  {
    type: 'image',
    id: 'nz-restaurants-visual',
    src: '/images/case-studies/nozul-hotels-website/restaurants.webp',
    alt: 'Restaurants Categories page with All, Nightlife, Casual Dining, Fine Dining, Ethnic, Buffet filter chips above venue cards for Culinary Concepts, Jean Georges, and La Spiga with food photography and contact details',
    caption:
      'Restaurants\' Categories — filter chips reduce the inventory before guests enter a venue detail page.',
    width: 'full',
    zoom: true,
  },
  {
    type: 'image',
    id: 'nz-restaurant-detail',
    src: '/images/case-studies/nozul-hotels-website/_presentation/restaurant-detail.webp',
    alt: 'La Spiga restaurant detail page showing hero image, About La Spiga text with food photography and Download Menu button, operating hours Monday to Friday 2pm to 12am, contact information, and facilities including Conference Room Pet Area Parking Wifi Outdoor BBQ',
    caption:
      'Venue detail: hero → About + Download Menu → Timings and Contact → Facilities. Practical context before reservation commitment.',
    width: 'full',
    zoom: true,
  },

  // Reservation funnel
  {
    type: 'heading',
    id: 'nz-reservation',
    label: 'Reservation',
    content: 'Marketing depth with a transactional end',
  },
  {
    type: 'text',
    id: 'nz-reservation-p',
    content:
      'The reservation funnel moves through three explicit states. Summary reviews the guest\'s intent: number of guests, reservation date, available time, and total (QR 240) with a Confirm Reservation action. Payment Method collects card details against the same grand total. Booking Confirmed acknowledges the reservation with a green tick, full recap (date, time, total, guest name, "Hall 9: 5 is reserved for you"), and Cancel Booking and Reschedule options. Content-rich discovery connects to a complete transactional outcome.',
  },
  {
    type: 'image',
    id: 'nz-reservation-flow',
    src: '/images/case-studies/nozul-hotels-website/reservation-flow.webp',
    alt: 'Three reservation states on dark background: Summary with guest count, date, time, QR 240 total and Confirm Reservation button; Payment Method with card number, expiry, CVV, cardholder fields; Booking Confirmed with green tick and Hall 9 reservation details with Cancel Booking and Reschedule buttons',
    caption:
      'Summary → Payment Method → Booking Confirmed. Three explicit states carry guest intent from review through payment to confirmation.',
    width: 'full',
    zoom: true,
  },
  {
    type: 'decision',
    id: 'nz-d-reservation',
    title: 'Model reservation as a short state machine, not a contact form',
    evidence:
      'Three distinct reservation states exist in the prototype: Summary (review), Payment Method (card entry), and Booking Confirmed (acknowledgment with full details and management options). Make a Reservation is persistent in the header throughout the website.',
    options: [
      'Single contact/interest form — no payment or confirmation state',
      'Summary → Payment → Confirmation — three explicit states',
      'External booking redirect (no in-website funnel)',
    ],
    decision:
      'Give guests a reviewable summary before payment and a clear confirmed state after — so reservation feels like a commitment, not a form submission.',
    tradeoff:
      'More states add steps versus a single-form approach. But a single form would remove the review checkpoint and the explicit booking confirmation that builds confidence post-payment.',
    result:
      'A website concept where brand exploration leads to a complete reservation path — without claiming live transaction processing or booking outcomes.',
  },

  // Events
  {
    type: 'heading',
    id: 'nz-events',
    label: 'Events',
    content: 'Occasion discovery as a dedicated surface',
  },
  {
    type: 'text',
    id: 'nz-events-p',
    content:
      'Events is a dedicated page reached from global navigation ("All Events"). The page opens with a full-bleed hero then a card grid of occasion types: Valentine\'s Day Special, Christmas Special, Birthday, Wedding, Corporate Event, Business Meeting, Party, Private Party — all tagged "Dine In" and linked to La Spiga by Papermoon with a "details →" link per card. Events and Packages also appear on Home as a horizontal offer carousel. The same occasion inventory appears in both surfaces with consistent card structure.',
  },
  {
    type: 'image',
    id: 'nz-events-visual',
    src: '/images/case-studies/nozul-hotels-website/_presentation/events.webp',
    alt: 'Events page with restaurant hero and grid of eight occasion cards including Valentines day Special, Christmas Special, Birthday, Wedding, Corporate Event, Business Meeting, Party and Private Party each with venue photography and details link',
    caption:
      'Events: dedicated discovery surface for occasions from Valentine\'s to Corporate Events — consistent card structure with venue photography and details links.',
    width: 'full',
    zoom: true,
  },

  // Supporting content
  {
    type: 'heading',
    id: 'nz-supporting',
    label: 'Supporting content',
    content: 'Gallery, About, and Career within the same web language',
  },
  {
    type: 'text',
    id: 'nz-supporting-p',
    content:
      'Gallery presents filterable hospitality photography (All, Interior, Events tabs) in a masonry grid. About Us opens with "Welcome to Nozul" editorial text, a city skyline photo for the hotel property, and a horizontal photo collage. Career shows the employer brand — "Life at Nozul", "Why join Nozul?" — with hospitality lifestyle photography. The same header chrome, visual language, and Make a Reservation CTA carry across all supporting surfaces.',
  },
  {
    type: 'image',
    id: 'nz-supporting-visual',
    src: '/images/case-studies/nozul-hotels-website/supporting-content.webp',
    alt: 'Four panel composite showing Gallery filterable photo grid, About Us with Welcome to Nozul hero and hotel building photo, Events page with occasion cards, and Career page with Life at Nozul chef photography',
    caption:
      'Gallery · About · Events · Career — one visual system across content, brand, and corporate surfaces.',
    width: 'full',
    zoom: true,
  },

  // Ecosystem connection
  {
    type: 'heading',
    id: 'nz-ecosystem',
    label: 'One ecosystem',
    content: 'Website and app — the same client, two complementary touchpoints',
  },
  {
    type: 'text',
    id: 'nz-ecosystem-p',
    content:
      'The Nozul website and NHR mobile app were designed within the same client engagement, in parallel. On the website, "Get the App" and "Download and book an event now" sections appear on the Home page and in the footer, showing both the Nozul brand splash and the NHR dining discovery interface on device mockups with Google Play and App Store badges. The website acts as the broad hospitality discovery surface; the mobile app provides the direct guest booking and management experience. The web→app connection is explicit in the UI and intentional in the design — not a cross-promotional afterthought.',
  },
  {
    type: 'image',
    id: 'nz-ecosystem-visual',
    src: '/images/case-studies/nozul-hotels-website/_presentation/web-app-bridge.webp',
    alt: 'Partner hotel logos strip and Get the App section on dark blue background showing Nozul brand and NHR dining interface on phone mockups with Google Play and App Store badges',
    caption:
      'Get the App — website brand discovery promoted alongside the NHR mobile guest experience. Same engagement, two complementary products.',
    width: 'full',
    zoom: true,
  },

  // What the design established
  {
    type: 'heading',
    id: 'nz-delivered',
    label: 'Delivered design',
    content: 'What the design established',
  },
  {
    type: 'features',
    id: 'nz-deliverables',
    items: [
      {
        name: 'Discovery-first home hierarchy',
        description:
          'Home sequences dining, brand, offers, and events in a paced scroll rather than an equal-weight module grid — Make a Reservation stays persistent without owning the first view.',
      },
      {
        name: 'Filter-to-detail dining path',
        description:
          'Category filter chips reduce the restaurant inventory before venue detail provides operating hours, facilities, and a map — comprehension precedes the reservation CTA.',
      },
      {
        name: 'Complete reservation funnel on the web',
        description:
          'Summary → Payment → Booking Confirmed carries guest intent through three explicit states, connecting brand storytelling to a transactional outcome within the same website.',
      },
    ],
  },

  // Reflection
  {
    type: 'heading',
    id: 'nz-reflection',
    label: 'Reflection',
    content: 'What the website demonstrates',
  },
  {
    type: 'text',
    id: 'nz-reflection-p',
    content:
      'Hospitality websites fail in two opposite ways — they become either pure marketing brochures with no clear action path, or booking engines that strip out the brand story that made the venue worth considering. The Nozul website navigates between those by treating Home as a discovery sequence, keeping reservation entry persistent throughout without forcing it to the first screen, and connecting exploration to a complete reservation outcome rather than a contact form. The parallel NHR mobile app closes the loop for guests who reach the product through their phone. If analytics were available, I would measure where in the home scroll the Make a Reservation header gets its first clicks — and whether guests pass through restaurant detail before or after using that persistent CTA.',
  },

  // Next
  {
    type: 'heading',
    id: 'nz-next',
    label: 'Next',
    content: 'Continue',
  },
  {
    type: 'cta-pair',
    id: 'nz-ctas',
    primary: {
      label: 'Explore the NHR mobile experience →',
      href: '/case-studies/nhr',
    },
    secondary: {
      label: 'View website prototype ↗',
      href: 'https://www.figma.com/proto/B645e7Kn52Sbw0d1KCQVpe/',
      external: true,
    },
  },
]
