/**
 * DRAFT testimonials : awaiting approval from each named colleague.
 * Do NOT publish to production without explicit confirmation from each person.
 */

export interface Testimonial {
  id: string
  quote: string
  name: string
  role: string
  company: string
  /** Path to avatar image, or null to use the initials fallback */
  avatar: string | null
}

// Testimonials array is intentionally empty.
// Testimonials will be added here once approved by the named colleagues.
export const testimonials: Testimonial[] = []
