export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
  url?: string
}

/**
 * No verified testimonials, recommendations, or awards were found in the repository.
 * This array is intentionally empty. The Recognition section should be hidden
 * until real content is added here.
 */
export const testimonials: Testimonial[] = []
