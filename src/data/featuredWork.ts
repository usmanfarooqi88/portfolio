import { projects, type Project } from './projects'

/**
 * Homepage Featured Product Work order.
 * Reorder this array to change the homepage sequence — no markup changes needed.
 */
export const FEATURED_PRODUCT_IDS = [
  'skrewww',
  'happytenant-landlord',
  'danat-behavior',
  'happytenant-tenant',
  'wanderly',
  'heard-app',
  'nhr-hotels',
  'nozul-website',
] as const

/**
 * Secondary “Earlier Visual & Editorial Work” — kept on site, not primary hiring story.
 */
export const EDITORIAL_WORK_IDS = [
  'riyad-2021',
  'almarai-2021',
  'mobily-2024',
  'stc-2024',
] as const

export type FeaturedProductId = (typeof FEATURED_PRODUCT_IDS)[number]

export function getProjectsByIds(ids: readonly string[]): Project[] {
  return ids
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is Project => Boolean(p))
}

export function getFeaturedProductWork(): Project[] {
  return getProjectsByIds(FEATURED_PRODUCT_IDS)
}

export function getEditorialWork(): Project[] {
  return getProjectsByIds(EDITORIAL_WORK_IDS)
}
