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
 */

import Lenis from 'lenis'
import { useEffect } from 'react'
import { cancelFrame, frame } from 'framer-motion'

let lenisInstance: Lenis | null = null

/** Returns the shared Lenis instance (may be null if disabled). */
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

export function useLenis() {
  useEffect(() => {
    const prefersReduced =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768

    if (prefersReduced || isMobile) {
      lenisInstance = null
      return
    }

    const lenis = new Lenis({
      lerp: 0.1,          // matches reference feel
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    lenisInstance = lenis

    // Tick lenis inside Framer Motion's rAF loop so useScroll stays in sync.
    // Framer Motion v12 passes a FrameData object; extract timestamp.
    function raf({ timestamp }: { timestamp: number }) {
      lenis.raf(timestamp)
    }
    frame.update(raf, true)

    return () => {
      cancelFrame(raf)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])
}
