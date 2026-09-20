import { useEffect } from 'react'
import { homepageStructuredData } from '../data/structuredData'

function injectJsonLd(id: string, data: object) {
  let el = document.getElementById(id) as HTMLScriptElement | null
  if (!el) {
    el = document.createElement('script')
    el.id = id
    el.type = 'application/ld+json'
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

/**
 * Injects JSON-LD structured data (Person + WebSite) into <head>.
 * Only uses facts that exist in the codebase — no fabricated data.
 */
export function StructuredData() {
  useEffect(() => {
    injectJsonLd('ld-person', homepageStructuredData[0])
    injectJsonLd('ld-website', homepageStructuredData[1])
  }, [])

  return null
}
