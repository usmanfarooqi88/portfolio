import { animate, motion, useMotionValue } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

// Viewport & key landmarks
const VB_W = 200
const VB_H = 210
const LEFT_EYE  = { x: 76,  y: 104 }
const RIGHT_EYE = { x: 124, y: 104 }
const FACE_REF  = { x: 100, y: 108 }
const MAX_PUPIL = 4
const MAX_TILT  = 1.8

export function FaceIllustration() {
  const reducedMotion = usePrefersReducedMotion()
  const [isTouch, setIsTouch] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)

  const pupilOffX  = useMotionValue(0)
  const pupilOffY  = useMotionValue(0)
  const headRotate = useMotionValue(0)
  const leftBlink  = useMotionValue(1)
  const rightBlink = useMotionValue(1)

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  // Cursor follow
  useEffect(() => {
    if (reducedMotion || isTouch) return
    const svg = svgRef.current
    if (!svg) return

    const onMove = (e: MouseEvent) => {
      const rect = svg.getBoundingClientRect()
      const scaleX = VB_W / rect.width
      const scaleY = VB_H / rect.height
      const refSX  = rect.left + FACE_REF.x / scaleX
      const refSY  = rect.top  + FACE_REF.y / scaleY
      const dx = e.clientX - refSX
      const dy = e.clientY - refSY
      const dist = Math.sqrt(dx * dx + dy * dy) || 1
      animate(pupilOffX, (dx / dist) * MAX_PUPIL, { duration: 0.35, ease: 'easeOut' })
      animate(pupilOffY, (dy / dist) * MAX_PUPIL, { duration: 0.35, ease: 'easeOut' })
      const tilt = (dx / (window.innerWidth * 0.5)) * MAX_TILT
      animate(headRotate, Math.max(-MAX_TILT, Math.min(MAX_TILT, tilt)), { duration: 0.5, ease: 'easeOut' })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [reducedMotion, isTouch, pupilOffX, pupilOffY, headRotate])

  // Blink loop
  useEffect(() => {
    if (reducedMotion) return
    let timer: ReturnType<typeof setTimeout>
    const doBlink = async () => {
      await Promise.all([
        animate(leftBlink,  0.05, { duration: 0.09 }),
        animate(rightBlink, 0.05, { duration: 0.09 }),
      ])
      await Promise.all([
        animate(leftBlink,  1, { duration: 0.13 }),
        animate(rightBlink, 1, { duration: 0.13 }),
      ])
      timer = setTimeout(doBlink, 2500 + Math.random() * 4000)
    }
    timer = setTimeout(doBlink, 2000)
    return () => clearTimeout(timer)
  }, [reducedMotion, leftBlink, rightBlink])

  return (
    <motion.svg
      ref={svgRef}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="v2-face-svg w-full h-auto block"
      aria-hidden="true"
      style={{ rotate: headRotate }}
    >
      {/* ── Face shape ── */}
      <path
        d="M 100 12
           C 138 12 162 36 164 72
           C 166 110 154 152 138 168
           C 128 178 114 184 100 184
           C 86 184 72 178 62 168
           C 46 152 34 110 36 72
           C 38 36 62 12 100 12 Z"
        stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"
      />

      {/* ── Side-part hair ── */}
      {/* Hair cap: sweeps up from left, quiff rise, flows right */}
      <path
        d="M 36 72
           C 36 44 52 18 78 13
           C 86 11 90 15 88 22
           C 86 28 82 30 86 28
           C 96 22 108 14 128 13
           C 148 12 164 30 164 72"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        fill="none"
      />
      {/* Quiff strand — the signature lift on the left-top */}
      <path
        d="M 76 14 C 70 6 64 4 60 8 C 57 11 60 18 66 20"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
        fill="none"
      />
      {/* Part line */}
      <path
        d="M 88 14 C 89 22 90 28 90 35"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"
      />

      {/* ── Ears ── */}
      <path
        d="M 36 90 C 29 93 27 102 30 112 C 32 118 36 120 40 116"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"
      />
      <path
        d="M 164 90 C 171 93 173 102 170 112 C 168 118 164 120 160 116"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"
      />

      {/* ── Eyebrows (bold bars) ── */}
      <path
        d="M 58 82 C 64 78 72 76 84 78"
        stroke="currentColor" strokeWidth="3" strokeLinecap="round"
      />
      <path
        d="M 116 78 C 128 76 136 78 142 82"
        stroke="currentColor" strokeWidth="3" strokeLinecap="round"
      />

      {/* ── Left eye ── */}
      <path
        d="M 60 104 C 64 97 72 94 82 97 C 86 99 90 102 88 107 C 85 113 74 115 65 112 C 61 110 58 107 60 104 Z"
        stroke="currentColor" strokeWidth="2"
      />
      <motion.g
        style={{ scaleY: leftBlink, transformBox: 'fill-box', transformOrigin: 'center' }}
      >
        <circle cx={LEFT_EYE.x}  cy={LEFT_EYE.y}  r="6"   stroke="currentColor" strokeWidth="1.5" />
        <motion.circle r="3" fill="currentColor"
          cx={LEFT_EYE.x}  cy={LEFT_EYE.y}
          style={{ x: pupilOffX, y: pupilOffY }}
        />
      </motion.g>

      {/* ── Right eye ── */}
      <path
        d="M 112 104 C 110 97 118 94 128 97 C 136 99 142 103 140 107 C 137 113 126 115 117 112 C 113 110 110 107 112 104 Z"
        stroke="currentColor" strokeWidth="2"
      />
      <motion.g
        style={{ scaleY: rightBlink, transformBox: 'fill-box', transformOrigin: 'center' }}
      >
        <circle cx={RIGHT_EYE.x} cy={RIGHT_EYE.y} r="6"   stroke="currentColor" strokeWidth="1.5" />
        <motion.circle r="3" fill="currentColor"
          cx={RIGHT_EYE.x} cy={RIGHT_EYE.y}
          style={{ x: pupilOffX, y: pupilOffY }}
        />
      </motion.g>

      {/* ── Nose (minimal) ── */}
      <path
        d="M 94 128 C 92 136 90 141 87 144 C 92 147 108 147 113 144 C 110 141 108 136 106 128"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"
      />

      {/* ── Mouth ── */}
      <path
        d="M 76 162 C 84 168 116 168 124 162"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
      />
      {/* Upper lip line */}
      <path
        d="M 78 162 C 86 156 100 154 122 162"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.6"
      />
    </motion.svg>
  )
}
