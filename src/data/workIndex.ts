import { getProjectsByIds } from './featuredWork'
import type { Project } from './projects'

/**
 * Complete /work portfolio index — ordering and primary classification.
 * Homepage Featured remains curated separately via featuredWork.ts.
 */

export type WorkClass = 'product-design' | 'design-systems' | 'web' | 'visual-editorial'

export type WorkFilterId = 'all' | WorkClass

export const WORK_FILTERS: { id: WorkFilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'product-design', label: 'Product Design' },
  { id: 'design-systems', label: 'Design Systems' },
  { id: 'web', label: 'Web' },
  { id: 'visual-editorial', label: 'Visual & Editorial' },
]

/** Display type label for cards — one primary classification signal. */
export function workClassLabel(workClass: WorkClass): string {
  switch (workClass) {
    case 'product-design':
      return 'Product Design'
    case 'design-systems':
      return 'Design System'
    case 'web':
      return 'Web'
    case 'visual-editorial':
      return 'Visual & Editorial'
  }
}

/**
 * Canonical All-order for /work.
 * Primary product work first, then supporting digital, then visual/editorial.
 */
export const WORK_INDEX_ENTRIES: { id: string; workClass: WorkClass }[] = [
  // Primary product / system
  { id: 'skrewww', workClass: 'design-systems' },
  { id: 'heard-app', workClass: 'product-design' },
  { id: 'happytenant-tenant', workClass: 'product-design' },
  { id: 'happytenant-landlord', workClass: 'product-design' },
  { id: 'danat-behavior', workClass: 'product-design' },
  { id: 'wanderly', workClass: 'product-design' },
  { id: 'nhr-hotels', workClass: 'product-design' },
  { id: 'nozul-website', workClass: 'web' },
  // Supporting digital / product
  { id: 'heard-pos', workClass: 'product-design' },
  { id: 'happytenant-website', workClass: 'web' },
  { id: 'pcm', workClass: 'product-design' },
  { id: 'jaan-digital', workClass: 'web' },
  // Visual & editorial (annual reports — preserve all)
  { id: 'riyad-2021', workClass: 'visual-editorial' },
  { id: 'riyad-2022', workClass: 'visual-editorial' },
  { id: 'almarai-2021', workClass: 'visual-editorial' },
  { id: 'almarai-2023', workClass: 'visual-editorial' },
  { id: 'almarai-2024', workClass: 'visual-editorial' },
  { id: 'mobily-2023', workClass: 'visual-editorial' },
  { id: 'mobily-2024', workClass: 'visual-editorial' },
  { id: 'stc-2023', workClass: 'visual-editorial' },
  { id: 'stc-2024', workClass: 'visual-editorial' },
  { id: 'etisalat-2023', workClass: 'visual-editorial' },
  { id: 'savola-2024', workClass: 'visual-editorial' },
  { id: 'sabb-2024', workClass: 'visual-editorial' },
]

export interface WorkIndexItem {
  project: Project
  workClass: WorkClass
  typeLabel: string
  /** Use compact card treatment for denser editorial grid */
  compact: boolean
}

export function getWorkIndexItems(filter: WorkFilterId = 'all'): WorkIndexItem[] {
  const entries =
    filter === 'all'
      ? WORK_INDEX_ENTRIES
      : WORK_INDEX_ENTRIES.filter((e) => e.workClass === filter)

  const projects = getProjectsByIds(entries.map((e) => e.id))
  const byId = new Map(projects.map((p) => [p.id, p]))

  return entries
    .map((entry) => {
      const project = byId.get(entry.id)
      if (!project) return null
      return {
        project,
        workClass: entry.workClass,
        typeLabel: workClassLabel(entry.workClass),
        compact: entry.workClass === 'visual-editorial',
      }
    })
    .filter((item): item is WorkIndexItem => Boolean(item))
}

export function countWorkByFilter(): Record<WorkFilterId, number> {
  const counts: Record<WorkFilterId, number> = {
    all: WORK_INDEX_ENTRIES.length,
    'product-design': 0,
    'design-systems': 0,
    web: 0,
    'visual-editorial': 0,
  }
  for (const e of WORK_INDEX_ENTRIES) {
    counts[e.workClass] += 1
  }
  return counts
}
