/**
 * useLenis : initialises Lenis smooth scroll and ticks it via Framer Motion's
 * animation frame loop so useScroll values stay in sync.
 *
 * Rules:
 * - Disabled when prefers-reduced-motion: reduce is set.
 * - Disabled below 768 px viewport width.
 * - Provides lenis.scrollTo() for in-page anchor buttons.
 * - Native anchor <a href="#..."> links, keyboard nav and find-in-page work
 *   because Lenis patches the native scroll API.
 *
 * Self-healing resize guard:
 * - Lenis computes its scroll limit as scrollHeight - innerHeight.
 *   When innerHeight !== clientHeight (browser bars, zoom, scrollbar width, iOS
 *   toolbars), Lenis stops short of the real bottom.
 * - We call lenis.resize() eagerly on every dimension-change event and also
 *   compare lenis.limit to the browser's true scrollable length after each
 *   scroll cycle. If they diverge by more than 2 px we resize; if that still
 *   fails we destroy Lenis and fall back to native scrolling.
 */

import Lenis from 'lenis'
import { useEffect } from 'react'
import { cancelFrame, frame } from 'framer-motion'

let lenisInstance: Lenis | null = null
let nativeFallback = false

/** Returns the shared Lenis instance (may be null if disabled or fallen back). */
export function getLenis(): Lenis | null {
  return lenisInstance
}

/** Call lenis.scrollTo() safely from anywhere. */
export function lenisScrollTo(
  target: string | number | HTMLElement,
  options?: Parameters<Lenis['scrollTo']>[1],
) {
  lenisInstance?.scrollTo(target, options)
}

/**
 * Force a Lenis dimension recalculation.
 * Call this after content changes that alter scroll height:
 *   - preloader unmount, lazy-loaded sections, route changes.
 */
export function lenisResize() {
  lenisInstance?.resize()
}

/** True scroll limit the browser allows (doesn't use innerHeight). */
function trueScrollLimit(): number {
  const el = document.documentElement
  return Math.max(0, el.scrollHeight - el.clientHeight)
}

export function useLenis() {
  useEffect(() => {
    if (nativeFallback) return

    const prefersReduced =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768

    if (prefersReduced || isMobile) {
      lenisInstance = null
      return
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    lenisInstance = lenis

    // ── rAF loop via Framer Motion ──────────────────────────────────────
    function raf({ timestamp }: { timestamp: number }) {
      lenis.raf(timestamp)
    }
    frame.update(raf, true)

    // ── Self-healing guard ──────────────────────────────────────────────
    // After each scroll event, verify lenis.limit matches the real limit.
    // Debounce so we're not calling resize on every wheel tick.
    let healTimer: ReturnType<typeof setTimeout> | null = null

    function checkAndHeal() {
      if (healTimer) return
      healTimer = setTimeout(() => {
        healTimer = null
        const real = trueScrollLimit()
        if (Math.abs(lenis.limit - real) > 2) {
          lenis.resize()
          // Give Lenis one frame to recalculate, then check again.
          requestAnimationFrame(() => {
            const realAfter = trueScrollLimit()
            if (Math.abs(lenis.limit - realAfter) > 2) {
              // Resize didn't converge — fall back to native scrolling.
              nativeFallback = true
              lenis.destroy()
              lenisInstance = null
            }
          })
        }
      }, 150)
    }

    lenis.on('scroll', checkAndHeal)

    // ── Eager resize triggers ───────────────────────────────────────────

    function resize() {
      lenis.resize()
    }

    // Window load (images / fonts may change height after DOMContentLoaded)
    window.addEventListener('load', resize, { once: true })

    // Fonts ready (layout shift from FOUT)
    if (document.fonts?.ready) {
      document.fonts.ready.then(resize)
    }

    // Window resize (orientation change, zoom, desktop resize)
    window.addEventListener('resize', resize)

    // visualViewport resize (iOS Safari toolbar slide in/out, pinch-zoom)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', resize)
    }

    // Route changes (popstate = back/forward; pushState is wrapped by React Router)
    function onPopState() {
      // Page content changes after navigation — wait for React to render.
      setTimeout(resize, 100)
    }
    window.addEventListener('popstate', onPopState)

    // ResizeObserver on body catches lazy sections, accordion open/close, etc.
    let roTimer: ReturnType<typeof setTimeout> | null = null
    const ro = new ResizeObserver(() => {
      // Debounce to avoid thrash during animations
      if (roTimer) clearTimeout(roTimer)
      roTimer = setTimeout(resize, 80)
    })
    ro.observe(document.body)

    return () => {
      cancelFrame(raf)
      lenis.off('scroll', checkAndHeal)
      window.removeEventListener('resize', resize)
      window.removeEventListener('popstate', onPopState)
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', resize)
      }
      ro.disconnect()
      if (healTimer) clearTimeout(healTimer)
      if (roTimer) clearTimeout(roTimer)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])
}
