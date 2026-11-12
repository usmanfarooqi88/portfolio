import { useCallback, useEffect, useRef, useState } from 'react'
import { CTASection } from '../components/sections/CTASection'
import { AboutPreview } from '../components/sections/AboutPreview'
import { AwardsSection } from '../components/sections/AwardsSection'
import { HeroSection } from '../components/sections/HeroSection'
import { MarqueeBand } from '../components/sections/MarqueeBand'
import { ProjectsSection } from '../components/sections/ProjectsSection'
import { StatementSection } from '../components/sections/StatementSection'
import { Preloader } from '../components/layout/Preloader'
import { getRouteMeta } from '../data/routeMeta'
import { applyPageMeta } from '../utils/seo'
import { lenisResize } from '../lib/useLenis'

/**
 * Decide once at mount whether to show the preloader.
 * Sets the session flag immediately so back-navigation never re-triggers it.
 */
function shouldShowPreloader(): boolean {
  try {
    if (typeof window === 'undefined') return false
    if (window.location.pathname !== '/') return false
    if (sessionStorage.getItem('preloader_shown')) return false
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    sessionStorage.setItem('preloader_shown', '1')
    return true
  } catch {
    return false
  }
}

export function HomePage() {
  const [showPreloader] = useState(shouldShowPreloader)
  // preloaderDone: true immediately if no preloader; true after preloader exits
  const [preloaderDone, setPreloaderDone] = useState(!showPreloader)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const meta = getRouteMeta('/')
    if (meta) applyPageMeta(meta)
  }, [])

  // Set inert on main sections while preloader is active
  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    // `inert` prevents keyboard/AT access to hidden content during loading
    ;(el as HTMLElement & { inert: boolean }).inert =
      showPreloader && !preloaderDone
  }, [showPreloader, preloaderDone])

  const handlePreloaderDone = useCallback(() => {
    setPreloaderDone(true)
    // Preloader unmounts and content expands — recalculate Lenis scroll limit
    // so the new page height is reflected before the user starts scrolling.
    requestAnimationFrame(() => {
      lenisResize()
      // Second pass one frame later catches any pending layout paint.
      requestAnimationFrame(lenisResize)
    })
  }, [])

  return (
    <>
      {/* Preloader renders only once per session on "/" */}
      {showPreloader && !preloaderDone && (
        <Preloader onDone={handlePreloaderDone} />
      )}

      {/* Main page content — set inert while preloader is active */}
      <div ref={contentRef}>
        <HeroSection preloaderDone={preloaderDone} />
        <StatementSection />
        <ProjectsSection />
        <MarqueeBand
          rows={[
            { text: 'Product & UX Design · Design Systems · Arabic & RTL Design · AI-assisted Design · ', color: 'var(--dark-navy)' },
            { text: 'SaaS · CRM · FinTech · PropTech · AI products · ', color: '#D14B28' },
          ]}
          direction="left"
        />
        <AwardsSection />
        <AboutPreview />
        <CTASection />
      </div>
    </>
  )
}
