/**
 * Preloader — full-screen entry experience for the home route.
 *
 * Shows once per browser session on "/" only.
 * - Top bar with animated greige fill + wordmark color-split
 * - Large counter 0 → 100 (ease-out, ~1.4s)
 * - Minimum on-screen: 1.2 s   Maximum: 2.2 s
 * - Exits with translateY(-100%) in 600 ms, then calls onDone
 * - Skipped for prefers-reduced-motion (CSS hides it; React also guards)
 */

import { useEffect, useRef, useState } from 'react'
import { getLenis } from '../../lib/useLenis'
import '../../styles/preloader.css'

interface PreloaderProps {
  /** Called after the exit animation completes. */
  onDone: () => void
}

function easeOutQuart(t: number): number {
  return 1 - (1 - t) ** 4
}

const COUNTER_DURATION = 1400 // ms — time for counter to reach 100
const MIN_DURATION     = 1200 // ms — minimum visible time
const MAX_DURATION     = 2200 // ms — forced exit deadline

export function Preloader({ onDone }: PreloaderProps) {
  const [exiting, setExiting] = useState(false)

  // Direct DOM refs — avoids 60fps React state updates
  const counterRef  = useRef<HTMLDivElement>(null)
  const fillRef     = useRef<HTMLDivElement>(null)
  const wordmarkRef = useRef<HTMLDivElement>(null)

  // Guard against double-trigger and post-unmount calls
  const exitStartedRef = useRef(false)
  const mountedRef     = useRef(true)
  const rafIdRef       = useRef<number>(0)
  const maxTimerRef    = useRef<ReturnType<typeof setTimeout> | null>(null)
  const stopRetryRef   = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Stop Lenis immediately; retry after 150 ms in case it hasn't initialized yet
    getLenis()?.stop()
    stopRetryRef.current = setTimeout(() => getLenis()?.stop(), 150)

    const startTime = performance.now()
    let assetsResolved = false

    // ── Asset readiness ────────────────────────────────────────────────────
    const fontsReady = document.fonts.ready
    const heroImgReady = new Promise<void>((resolve) => {
      const img = document.querySelector(
        'img.hero-photo__img',
      ) as HTMLImageElement | null
      if (!img || img.complete) { resolve(); return }
      img.addEventListener('load',  () => resolve(), { once: true })
      img.addEventListener('error', () => resolve(), { once: true })
    })
    const assetsReady = Promise.all([fontsReady, heroImgReady])
    assetsReady.then(() => { assetsResolved = true })

    // ── Exit ───────────────────────────────────────────────────────────────
    function triggerExit() {
      if (exitStartedRef.current || !mountedRef.current) return
      exitStartedRef.current = true
      cancelAnimationFrame(rafIdRef.current)

      // Snap to 100 before exit
      if (counterRef.current)  counterRef.current.textContent = '100'
      if (fillRef.current)     fillRef.current.style.width = '100%'
      if (wordmarkRef.current) wordmarkRef.current.style.setProperty('--fill-pct', '100%')

      // Brief hold at 100, then slide up
      setTimeout(() => {
        if (!mountedRef.current) return
        setExiting(true)
        // After slide-up (600ms) + 20ms buffer, clean up and signal parent
        setTimeout(() => {
          document.documentElement.classList.remove('is-loading')
          getLenis()?.start()
          if (mountedRef.current) onDone()
        }, 620)
      }, 80)
    }

    // ── Finish check ───────────────────────────────────────────────────────
    function tryFinish(elapsed: number) {
      const minRemaining = MIN_DURATION - elapsed
      if (minRemaining > 0) {
        setTimeout(() => {
          if (assetsResolved) triggerExit()
          else assetsReady.then(triggerExit)
        }, minRemaining)
      } else {
        if (assetsResolved) triggerExit()
        else assetsReady.then(triggerExit)
      }
    }

    // ── Counter RAF loop ───────────────────────────────────────────────────
    function tick(now: number) {
      if (exitStartedRef.current || !mountedRef.current) return

      const elapsed  = now - startTime
      const t        = Math.min(elapsed / COUNTER_DURATION, 1)
      const easedT   = easeOutQuart(t)
      const display  = Math.floor(easedT * 100)
      const fillPct  = easedT * 100

      if (counterRef.current)
        counterRef.current.textContent = String(display)
      if (fillRef.current)
        fillRef.current.style.width = `${fillPct}%`
      if (wordmarkRef.current)
        wordmarkRef.current.style.setProperty('--fill-pct', `${fillPct}%`)

      if (t < 1) {
        rafIdRef.current = requestAnimationFrame(tick)
      } else {
        tryFinish(elapsed)
      }
    }

    rafIdRef.current = requestAnimationFrame(tick)

    // Max-time forced exit
    maxTimerRef.current = setTimeout(triggerExit, MAX_DURATION)

    // ── Cleanup ────────────────────────────────────────────────────────────
    return () => {
      mountedRef.current = false
      cancelAnimationFrame(rafIdRef.current)
      if (maxTimerRef.current)  clearTimeout(maxTimerRef.current)
      if (stopRetryRef.current) clearTimeout(stopRetryRef.current)
      // Ensure scroll/class are restored if unmounted mid-animation
      document.documentElement.classList.remove('is-loading')
      getLenis()?.start()
    }
  }, [onDone])

  return (
    <div
      className={`preloader${exiting ? ' preloader--exit' : ''}`}
      aria-hidden="true"
      role="presentation"
    >
      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <div className="preloader__bar">
        {/* Greige fill layer grows left → right */}
        <div ref={fillRef} className="preloader__bar-fill" />

        {/* Wordmark — greige base + dark clip layer for color split */}
        <div
          ref={wordmarkRef}
          className="preloader__wordmark"
          style={{ '--fill-pct': '0%' } as React.CSSProperties}
        >
          {/* Greige text: visible on dark background */}
          <span className="preloader__wordmark-greige" aria-hidden="true">
            Usman&nbsp;<span className="preloader__divider">|</span>&nbsp;Farooqi
          </span>
          {/* Dark text: clip-path reveals only where fill has passed */}
          <span className="preloader__wordmark-dark" aria-hidden="true">
            Usman&nbsp;<span className="preloader__divider">|</span>&nbsp;Farooqi
          </span>
        </div>

        {/* Right tagline — hidden on mobile via CSS */}
        <div className="preloader__tagline" aria-hidden="true">
          PRODUCT DESIGN&nbsp;&middot;&nbsp;UX / UI&nbsp;&middot;&nbsp;DESIGN SYSTEMS
        </div>
      </div>

      {/* ── Counter ──────────────────────────────────────────────────────── */}
      <div ref={counterRef} className="preloader__counter" aria-hidden="true">
        0
      </div>
    </div>
  )
}
