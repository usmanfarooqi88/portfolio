import type { CaseStudyBlock } from '../caseStudyBlocks'

export const danatBehaviorsBlocks: CaseStudyBlock[] = [
  // Opening
  {
    type: 'text',
    id: 'db-thesis',
    size: 'lg',
    content:
      'I designed Danat Behaviors from zero to one — shaping the product architecture, core engagement flows, and reward ecosystem connecting challenges, activities, Danat points, leaderboards, and partner rewards.',
  },
  {
    type: 'metrics',
    id: 'db-summary',
    items: [
      { metric: 'Engagement', value: 'Freelance project' },
      { metric: 'Platform', value: 'Mobile' },
      { metric: 'Status', value: 'Prototype / product design' },
      { metric: 'Scope', value: 'Zero to one' },
    ],
  },

  // The challenge
  {
    type: 'heading',
    id: 'db-problem',
    label: 'The challenge',
    content: 'One connected ecosystem — not a collection of gamification features',
  },
  {
    type: 'text',
    id: 'db-problem-p',
    content:
      'The design problem was not any single feature — it was the relationship between all of them. Activities, challenges, progress, points, recognition, rewards, and partners had to form a system people could understand and repeatedly rejoin. Complexity lived in how the pieces connected, not in the individual screens.',
  },

  // Core engagement loop
  {
    type: 'heading',
    id: 'db-loop',
    label: 'Core model',
    content: 'The engagement loop',
  },
  {
    type: 'pipeline',
    id: 'db-loop-pipeline',
    caption:
      'The loop is the backbone of the product architecture. Loop closes when users return to Discover with updated status.',
    items: [
      { label: 'Discover', detail: 'Challenges, activities, partner offers' },
      { label: 'Join', detail: 'Enroll in a challenge' },
      { label: 'Do', detail: 'Daily and weekly activities' },
      { label: 'Track', detail: 'Progress toward challenge goals' },
      { label: 'Earn', detail: 'Danat points credited' },
      { label: 'Recognition', detail: 'Leaderboard · Achievements · Badges' },
      { label: 'Redeem', detail: 'Marketplace → cart → checkout' },
      { label: 'Return', detail: 'Re-engage with updated status' },
    ],
  },

  // Home
  {
    type: 'heading',
    id: 'db-home',
    label: 'Home',
    content: 'Orchestrating the ecosystem',
  },
  {
    type: 'text',
    id: 'db-home-p',
    content:
      'Home surfaces Danat points, featured content, current challenges, My Activities, Watch and Earn, fitness partners, Points and Leaderboard, Pillars, Share and Earn, and Tips — in a single scroll. The design challenge was hierarchy: many engagement mechanics without letting Home collapse into an undifferentiated feed.',
  },
  {
    type: 'image',
    id: 'db-home-visual',
    src: '/images/case-studies/danat-behaviors/_presentation/home.webp',
    alt: 'Danat Behaviors Home showing three scroll sections: points and featured challenges, Watch and Earn, Fitness Partners, Leaderboard and Pillars, Share and Earn and Tips',
    caption:
      'Home across three scroll sections: status and challenges → earn pathways and leaderboard → explore pillars and support.',
    width: 'full',
    zoom: true,
  },

  // Challenges
  {
    type: 'heading',
    id: 'db-challenges',
    label: 'Challenges',
    content: 'Comprehension before commitment',
  },
  {
    type: 'text',
    id: 'db-challenges-p',
    content:
      'A challenge needs to communicate WHAT, WHY, PROGRESS, STATUS, and NEXT ACTION before a user commits. Challenge detail surfaces goals, level, Danat points reward, sponsor, start/end dates, remaining enrollment capacity, and current participation progress. Only after comprehension does the multi-step enrollment begin.',
  },
  {
    type: 'image',
    id: 'db-challenges-visual',
    src: '/images/case-studies/danat-behaviors/_presentation/challenges.webp',
    alt: 'Challenges list, challenge detail with goals and reward, and enrollment start screen',
    caption:
      'Challenges list → challenge detail (goals, reward, dates, capacity) → enrollment entry — comprehension before commitment.',
    width: 'full',
    zoom: true,
  },
  {
    type: 'image',
    id: 'db-enrollment-visual',
    src: '/images/case-studies/danat-behaviors/_presentation/enrollment.webp',
    alt: 'Three-step challenge enrollment: select wearable connection, confirm, and enrollment confirmed',
    caption:
      'Multi-step enrollment: wearable connection, confirmation, and enrolled state — structured commitment rather than a single opaque join button.',
    width: 'full',
    zoom: true,
  },
  {
    type: 'decision',
    id: 'db-d-challenge',
    title: 'Separate comprehension from commitment in challenge enrollment',
    evidence:
      'Detail screens include goals, level, Danat points, sponsor, dates, remaining enrollment capacity, and progress. Enrollment spans multiple sequential screens with a wearable connection step.',
    options: [
      'Single enroll button on challenge card with no pre-commitment context',
      'Challenge detail → comprehension → multi-step enrollment',
      'Inline enrollment on the list view with minimal context',
    ],
    decision:
      'Separate comprehension (challenge detail) from commitment (multi-step enrollment) so users can evaluate reward, effort, and capacity before joining.',
    tradeoff:
      'More steps and information can slow enrollment. Less information risks users joining without understanding the goal, reward, or capacity limits.',
    result:
      'A challenge path of discover → understand → enroll → track — designed to support informed participation without claiming measured motivation outcomes.',
  },

  // Activity
  {
    type: 'heading',
    id: 'db-activities',
    label: 'Activity',
    content: 'Progress across time',
  },
  {
    type: 'text',
    id: 'db-activities-p',
    content:
      'My Activities supports Daily, Weekly, and Monthly views within one tracking model. One activity system scales across time horizons so immediate effort stays visible without losing the longer-term pattern.',
  },
  {
    type: 'image',
    id: 'db-activities-visual',
    src: '/images/case-studies/danat-behaviors/_presentation/activities.webp',
    alt: 'My Activities daily view with completed steps and run entries, and weekly view showing time-of-day activity timeline',
    caption:
      'Daily → immediate effort visible with Completed status. Weekly → accumulated pattern over time.',
    width: 'full',
    zoom: true,
  },

  // Points
  {
    type: 'heading',
    id: 'db-points',
    label: 'Danat points',
    content: 'A state model, not a score',
  },
  {
    type: 'text',
    id: 'db-points-p',
    content:
      'My Danat exposes Active Danat Points plus Earned, Redeem, Expired, and About to Expire histories with filtering. Marketplace headers also show available Danat and Danat in cart. Users need to understand what they have, what they earned, what they spent, what will expire, and what they can redeem — not just a current total.',
  },
  {
    type: 'image',
    id: 'db-points-visual',
    src: '/images/case-studies/danat-behaviors/_presentation/points.webp',
    alt: 'My Danat screen showing Active points balance and tabbed history for Earned, Redeem, Expired and About to Expire',
    caption: 'Points economy states: Active · Earned · Redeem · Expired · About to Expire.',
    width: 'contained',
    zoom: true,
  },

  // Recognition
  {
    type: 'heading',
    id: 'db-recognition',
    label: 'Recognition',
    content: 'Multiple forms of progress feedback',
  },
  {
    type: 'text',
    id: 'db-recognition-p',
    content:
      'Leaderboard, Achievements, and Badges are not interchangeable. Points provide immediate reward value. Leaderboards support social comparison. Achievements capture milestone history. Badges support collection and Bronze/Silver-style progression. Each mechanism has a distinct job in the recognition layer.',
  },
  {
    type: 'image',
    id: 'db-recognition-visual',
    src: '/images/case-studies/danat-behaviors/_presentation/recognition.webp',
    alt: 'Leaderboard with grid ranking, Achievements list with milestone entries, and Badges screen with Self Walking Challenge featured',
    caption: 'Leaderboard · Achievements · Badges — three distinct recognition mechanisms, each with a different job.',
    width: 'full',
    zoom: true,
  },

  // Marketplace
  {
    type: 'heading',
    id: 'db-market',
    label: 'Marketplace',
    content: 'Close the loop: earn → redeem',
  },
  {
    type: 'text',
    id: 'db-market-p',
    content:
      'Earning points is not the end of the loop. The Rewards Marketplace makes value tangible: browse voucher categories, evaluate a reward, add to cart, and redeem at checkout. The marketplace header exposes available Danat and Danat in cart so the points context stays visible through the purchase decision.',
  },
  {
    type: 'image',
    id: 'db-market-visual',
    src: '/images/case-studies/danat-behaviors/_presentation/marketplace.webp',
    alt: 'Marketplace grid, voucher detail with Add to Cart, cart with Danat value summary, and checkout screen',
    caption:
      'Browse → voucher detail → cart (Danat value visible) → checkout. A complete earn → redeem journey.',
    width: 'full',
    zoom: true,
  },
  {
    type: 'decision',
    id: 'db-d-market',
    title: 'Close the loop with a full marketplace redemption journey',
    evidence:
      'Marketplace, voucher detail, Favorites, Cart, and Checkout screens exist. Headers expose available Danat and Danat in cart throughout the browse flow.',
    options: [
      'Single redeem button per voucher (no cart, no browse)',
      'Marketplace with categories, voucher detail, cart, and checkout',
      'Points transferred directly to partner — no in-app browse',
    ],
    decision:
      'Connect participation to a redeemable reward surface with categories, comparison, cart, and checkout — so points retain meaning beyond a leaderboard number.',
    tradeoff:
      'Commerce patterns (cart and checkout) add product complexity. A simpler one-tap redeem would reduce friction but eliminates the ability to compare rewards before committing.',
    result:
      'A complete earn → browse → evaluate → redeem journey. No marketplace sales or conversion metrics are claimed.',
  },

  // Pillars and ecosystem
  {
    type: 'heading',
    id: 'db-ecosystem',
    label: 'Ecosystem',
    content: 'Pillars and partners: breadth with structure',
  },
  {
    type: 'image',
    id: 'db-partners-visual',
    src: '/images/case-studies/danat-behaviors/_presentation/partners.webp',
    alt: 'Filter Partners list with partner cards and Pillars grid showing Active Life, Creative Life, Healthy Nutrition, Wellbeing, Knowledge Empowerment and Non-Profit Organization category tiles',
    caption:
      'Partners expand reward and activity breadth. Pillars organize the positive-behavior proposition into a taxonomy: Active Life, Creative Life, Healthy Nutrition, Wellbeing, Knowledge Empowerment, Non-Profit Organization.',
    width: 'contained',
    zoom: true,
  },

  // Real conditions
  {
    type: 'heading',
    id: 'db-states',
    label: 'Real conditions',
    content: 'State breadth across the product',
  },
  {
    type: 'image',
    id: 'db-states-visual',
    src: '/images/case-studies/danat-behaviors/_presentation/states.webp',
    alt: 'Cross-module states: My Danat points balance and history, Badges screen with tier progression, and cart with Danat value visible',
    caption:
      'Points balance and lifecycle · badge tier progression · cart with Danat value — state coverage across earning, recognition, and redemption.',
    width: 'full',
    zoom: true,
  },

  // What the design established
  {
    type: 'heading',
    id: 'db-delivered',
    label: 'Delivered design',
    content: 'What the design established',
  },
  {
    type: 'features',
    id: 'db-deliverables',
    items: [
      {
        name: 'One connected engagement architecture',
        description:
          'Challenges, activity tracking, points, recognition, and marketplace connected into a single product loop — designed from concept through complete journeys.',
      },
      {
        name: 'Points as a readable state system',
        description:
          'Danat points behave as an internal value system with Active, Earned, Redeemed, Expired, and About to Expire states — visible from My Danat through to the marketplace cart header.',
      },
      {
        name: 'Challenge → reward relationship made explicit',
        description:
          'The path from challenge enrollment through progress tracking to points earning and marketplace redemption is inspectable at every stage — not abstracted into a single score.',
      },
    ],
  },

  // Reflection
  {
    type: 'heading',
    id: 'db-reflection',
    label: 'Reflection',
    content: 'What zero to one taught me',
  },
  {
    type: 'text',
    id: 'db-reflection-p',
    content:
      'Designing an ecosystem is different from designing isolated features — the loop has to stay legible when every module wants attention. Points need clear states to retain meaning across earning, recognition, and redemption. Progress feedback must work at multiple time scales. Recognition mechanisms need distinct jobs or they collapse into one another. A broad behavioral platform requires disciplined IA: every feature competes for home-screen attention, and hierarchy matters more than individual interaction elegance.',
  },

  // Next
  {
    type: 'heading',
    id: 'db-next',
    label: 'Next',
    content: 'Continue',
  },
  {
    type: 'cta-pair',
    id: 'db-ctas',
    primary: {
      label: 'View next — NHR',
      href: '/case-studies/nhr',
    },
    secondary: {
      label: 'View Figma prototype ↗',
      href: 'https://www.figma.com/proto/8EHDksjpGgM5QOAdvhxCEi/',
      external: true,
    },
  },
]
