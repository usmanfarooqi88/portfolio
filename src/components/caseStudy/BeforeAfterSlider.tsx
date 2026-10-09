import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'

interface BeforeAfterSliderProps {
  beforeSrc: string
  afterSrc: string
  beforeAlt: string
  /** Alt text for the after image. Also used for the accessible description fallback. */
  afterAlt: string
  /** Aspect ratio as a fraction, e.g. 866/319. Default: 866/319 */
  aspectRatio?: number
  /** Initial divider position 0–100. Default: 50 */
  initialPosition?: number
  /** Accessible description of the comparison */
  accessibleDescription?: string
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  aspectRatio = 866 / 319,
  initialPosition = 50,
  accessibleDescription = 'Compare original and redesigned HappyTenant Landlord interface.',
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(initialPosition)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const hinted = useRef(false)
  const handleId = useId()
  const descId = useId()

  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  /* ── Entrance hint animation ──────────────────────────────────────────── */
  useEffect(() => {
    if (prefersReducedMotion) return
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hinted.current) {
          hinted.current = true
          // Sweep: center → left → right → center
          const seq: [number, number][] = [
            [320,  30],
            [640,  72],
            [960,  50],
          ]
          seq.forEach(([delay, pos]) => {
            setTimeout(() => setPosition(pos), delay)
          })
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [prefersReducedMotion])

  /* ── Drag logic ───────────────────────────────────────────────────────── */
  const getPositionFromEvent = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return 0
    const rect = el.getBoundingClientRect()
    const raw = ((clientX - rect.left) / rect.width) * 100
    return Math.min(100, Math.max(0, raw))
  }, [])

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!dragging.current) return
      e.preventDefault()
      setPosition(getPositionFromEvent(e.clientX))
    },
    [getPositionFromEvent],
  )

  const handlePointerUp = useCallback(() => {
    dragging.current = false
    document.body.style.userSelect = ''
    ;(document.body.style as CSSStyleDeclaration & { webkitUserSelect: string }).webkitUserSelect = ''
  }, [])

  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove, { passive: false })
    window.addEventListener('pointerup', handlePointerUp)
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [handlePointerMove, handlePointerUp])

  const startDrag = useCallback((e: React.PointerEvent) => {
    e.preventDefault()
    dragging.current = true
    document.body.style.userSelect = 'none'
    ;(document.body.style as CSSStyleDeclaration & { webkitUserSelect: string }).webkitUserSelect = 'none'
    setPosition(getPositionFromEvent(e.clientX))
  }, [getPositionFromEvent])

  const handleContainerClick = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest('[role="slider"]')) return
      setPosition(getPositionFromEvent(e.clientX))
    },
    [getPositionFromEvent],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const STEP = 2
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          setPosition((p) => Math.max(0, p - STEP))
          break
        case 'ArrowRight':
          e.preventDefault()
          setPosition((p) => Math.min(100, p + STEP))
          break
        case 'Home':
          e.preventDefault()
          setPosition(0)
          break
        case 'End':
          e.preventDefault()
          setPosition(100)
          break
      }
    },
    [],
  )

  const paddingBottom = `${(1 / aspectRatio) * 100}%`
  const transition = prefersReducedMotion ? 'none' : 'clip-path 0.25s ease, left 0.25s ease'

  return (
    <div
      className="bas"
      aria-label={accessibleDescription}
      aria-describedby={descId}
    >
      <p id={descId} className="sr-only">
        {accessibleDescription} Drag the handle or use arrow keys to reveal the comparison.
      </p>

      {/* Outer maintains aspect ratio */}
      <div
        ref={containerRef}
        className="bas__frame"
        style={{ paddingBottom }}
        onPointerDown={startDrag}
        onClick={handleContainerClick}
      >
        {/* BASE LAYER — OLD / BEFORE */}
        <div className="bas__layer bas__layer--before">
          <img
            src={beforeSrc}
            alt={beforeAlt}
            draggable={false}
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* TOP LAYER — NEW / AFTER — clipped to reveal position */}
        <div
          className="bas__layer bas__layer--after"
          style={{
            clipPath: `inset(0 ${100 - position}% 0 0)`,
            transition,
          }}
          aria-hidden="true"
        >
          <img
            src={afterSrc}
            alt={afterAlt}
            draggable={false}
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Labels — NEW left, OLD right */}
        <span
          className="bas__label bas__label--after"
          aria-hidden="true"
          style={{
            opacity: position > 12 ? 1 : 0,
            transition: prefersReducedMotion ? 'none' : 'opacity 0.2s',
          }}
        >
          NEW DESIGN
        </span>
        <span
          className="bas__label bas__label--before"
          aria-hidden="true"
          style={{
            opacity: position < 88 ? 1 : 0,
            transition: prefersReducedMotion ? 'none' : 'opacity 0.2s',
          }}
        >
          OLD DESIGN
        </span>

        {/* Divider line */}
        <div
          className="bas__divider"
          style={{ left: `${position}%`, transition }}
          aria-hidden="true"
        />

        {/* Drag handle */}
        <div
          id={handleId}
          role="slider"
          tabIndex={0}
          aria-label="Before/after comparison slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-orientation="horizontal"
          className="bas__handle"
          style={{ left: `${position}%`, transition }}
          onKeyDown={handleKeyDown}
          onPointerDown={(e) => {
            e.stopPropagation()
            startDrag(e)
          }}
        >
          {/* Double-arrow icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M7 8L4 10L7 12M13 8L16 10L13 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line x1="4" y1="10" x2="16" y2="10" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}
