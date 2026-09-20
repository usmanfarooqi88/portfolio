import type { RouteMeta } from '../data/routeMeta'
import { BASE_URL, DEFAULT_OG_IMAGE, homeRouteMeta } from '../data/routeMeta'

const SITE_NAME = 'Usman Zahid Farooqi'

export type PageMeta = RouteMeta

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function removeMeta(name: string, attr: 'name' | 'property' = 'name') {
  document.querySelector(`meta[${attr}="${name}"]`)?.remove()
}

function setCanonical(path: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', `${BASE_URL}${path}`)
}

export function applyPageMeta({ title, description, path, ogImage, ogType, ogImageDimensions }: PageMeta) {
  document.title = title

  setMeta('description', description)
  setMeta('robots', 'index, follow')

  setCanonical(path)

  // Open Graph
  setMeta('og:type', ogType, 'property')
  setMeta('og:site_name', SITE_NAME, 'property')
  setMeta('og:title', title, 'property')
  setMeta('og:description', description, 'property')
  setMeta('og:url', `${BASE_URL}${path}`, 'property')
  setMeta('og:image', ogImage || DEFAULT_OG_IMAGE, 'property')
  if (ogImageDimensions) {
    setMeta('og:image:width', String(ogImageDimensions.width), 'property')
    setMeta('og:image:height', String(ogImageDimensions.height), 'property')
  } else {
    removeMeta('og:image:width', 'property')
    removeMeta('og:image:height', 'property')
  }

  // Twitter
  setMeta('twitter:card', 'summary_large_image')
  setMeta('twitter:title', title)
  setMeta('twitter:description', description)
  setMeta('twitter:image', ogImage || DEFAULT_OG_IMAGE)
}

export function resetPageMeta() {
  applyPageMeta(homeRouteMeta)
}

export { BASE_URL, DEFAULT_OG_IMAGE }
