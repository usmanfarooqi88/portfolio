import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently most visible in the upper portion
 * of the viewport. Skips ids whose elements don't exist in the DOM.
 */
export function useScrollSpy(sectionIds: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (sectionIds.length === 0) return

    const observers: IntersectionObserver[] = []

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (!el) continue

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id)
        },
        // Section is "active" when its top edge is within the top 30% of the viewport
        { rootMargin: '0px 0px -70% 0px', threshold: 0 },
      )
      obs.observe(el)
      observers.push(obs)
    }

    return () => observers.forEach((obs) => obs.disconnect())
  }, [sectionIds])

  return activeId
}
