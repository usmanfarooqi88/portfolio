/**
 * WorkCarousel — sticky scroll-hijack horizontal carousel.
 *
 * How it works:
 *   1. A tall outer wrapper reserves scroll space:
 *      height = 100vh + horizontal overflow of the track
 *   2. The inner section is `position:sticky; top:0; height:100vh`
 *      so it pins to the viewport while the user scrolls through the wrapper.
 *   3. Scroll progress through that extra height maps 1:1 to
 *      `transform:translateX()` on the track — vertical scroll drives
 *      horizontal card movement.
 *   4. Once all cards are seen (progress = 1), the wrapper ends and
 *      normal vertical scroll resumes automatically.
 *   5. Mouse drag still works as a secondary interaction.
 */

import { useEffect, useRef } from 'react'
import { getFeaturedProductWork } from '../../data/featuredWork'
import { ProjectCard } from '../ui/ProjectCard'

const FRICTION = 0.9
const MIN_VEL  = 0.5

export function WorkCarousel() {
  const projects   = getFeaturedProductWork()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const stickyRef  = useRef<HTMLDivElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)

  const xRef     = useRef(0)
  const dragging = useRef(false)
  const startX   = useRef(0)
  const startTX  = useRef(0)
  const velRef   = useRef(0)
  const lastX    = useRef(0)
  const rafId    = useRef<number | null>(null)

  function getOverflow() {
    const track = trackRef.current
    if (!track) return 0
    return Math.max(0, track.scrollWidth - window.innerWidth)
  }

  /** Extra scroll distance (px) at the start where the section is pinned
   *  but cards don't yet move — lets the user read the heading before the
   *  horizontal scroll kicks in. ~40% of viewport height feels natural. */
  function getDwell() {
    return Math.round(window.innerHeight * 0.4)
  }

  function setWrapperHeight() {
    const overflow = getOverflow()
    if (wrapperRef.current) {
      wrapperRef.current.style.height = overflow > 0
        ? `calc(100vh + ${getDwell()}px + ${overflow}px)`
        : 'auto'
    }
  }

  function applyX(value: number) {
    const clamped = Math.max(-getOverflow(), Math.min(0, value))
    xRef.current = clamped
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${clamped}px)`
    }
  }

  function stopMomentum() {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current)
      rafId.current = null
    }
  }

  function startMomentum() {
    stopMomentum()
    const step = () => {
      if (Math.abs(velRef.current) < MIN_VEL) { velRef.current = 0; return }
      applyX(xRef.current + velRef.current)
      velRef.current *= FRICTION
      rafId.current = requestAnimationFrame(step)
    }
    rafId.current = requestAnimationFrame(step)
  }

  useEffect(() => {
    const sticky = stickyRef.current
    if (!sticky) return
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const stickyEl = stickyRef.current!

    setWrapperHeight()
    const timer = setTimeout(setWrapperHeight, 150)
    window.addEventListener('resize', setWrapperHeight)

    // Scroll drives translateX — with an initial dwell phase
    function onScroll() {
      if (dragging.current) return
      const wrapper  = wrapperRef.current
      if (!wrapper) return
      const overflow = getOverflow()
      if (overflow <= 0) return
      const dwell      = getDwell()
      const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY
      const scrolled   = window.scrollY - wrapperTop
      // First `dwell` px of scroll: cards stay at 0 (section heading readable)
      // After dwell: map remaining scroll to horizontal movement
      const scrollable = Math.max(0, scrolled - dwell)
      const progress   = Math.max(0, Math.min(1, scrollable / overflow))
      applyX(-progress * overflow)
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    // Pointer drag
    function onPointerDown(e: PointerEvent) {
      if (e.button !== 0) return
      stopMomentum()
      dragging.current = true
      startX.current   = e.clientX
      startTX.current  = xRef.current
      lastX.current    = e.clientX
      velRef.current   = 0
      stickyEl.setPointerCapture(e.pointerId)
      stickyEl.style.cursor = 'grabbing'
    }

    function onPointerMove(e: PointerEvent) {
      if (!dragging.current) return
      velRef.current = e.clientX - lastX.current
      lastX.current  = e.clientX
      applyX(startTX.current + (e.clientX - startX.current))
    }

    function onPointerUp() {
      if (!dragging.current) return
      dragging.current = false
      stickyEl.style.cursor = 'grab'
      startMomentum()
    }

    sticky.addEventListener('pointerdown',   onPointerDown)
    sticky.addEventListener('pointermove',   onPointerMove)
    sticky.addEventListener('pointerup',     onPointerUp)
    sticky.addEventListener('pointercancel', onPointerUp)

    return () => {
      clearTimeout(timer)
      stopMomentum()
      window.removeEventListener('resize', setWrapperHeight)
      window.removeEventListener('scroll', onScroll)
      sticky.removeEventListener('pointerdown',   onPointerDown)
      sticky.removeEventListener('pointermove',   onPointerMove)
      sticky.removeEventListener('pointerup',     onPointerUp)
      sticky.removeEventListener('pointercancel', onPointerUp)
    }
  }, [])

  return (
    <div ref={wrapperRef} className="v2-carousel-wrapper">
      <div ref={stickyRef} className="v2-carousel-sticky" style={{ cursor: 'grab' }}>
        <section id="work" className="v2-carousel-section" aria-label="Selected work">
          <div className="v2-carousel-label">
            <span>Selected Work</span>
          </div>
          <div
            className="v2-carousel-track-wrap"
            style={{ touchAction: 'pan-y pinch-zoom', userSelect: 'none' }}
            role="region"
            aria-roledescription="carousel"
            aria-label="Selected work"
          >
            <div
              ref={trackRef}
              className="v2-carousel-track"
              style={{ willChange: 'transform', transform: 'translateX(0px)' }}
            >
              {projects.map((project) => (
                <div key={project.id} className="v2-carousel-item">
                  <ProjectCard
                    project={project}
                    onOpenPrototype={undefined}
                    variant="evidence"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
