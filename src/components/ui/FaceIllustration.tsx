import { animate, motion, useMotionValue } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

// SVG viewport
const VB_W = 260
const VB_H = 320

// Landmark coordinates
const LEFT_EYE  = { x: 100, y: 150 }
const RIGHT_EYE = { x: 160, y: 150 }
const FACE_REF  = { x: 130, y: 160 } // screen reference for cursor direction
const MAX_PUPIL = 5   // px offset range for pupils
const MAX_TILT  = 2   // deg tilt range for head

export function FaceIllustration() {
  const reducedMotion = usePrefersReducedMotion()
  const [isTouch, setIsTouch] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)

  // Shared pupil offset (same direction for both eyes)
  const pupilOffX = useMotionValue(0)
  const pupilOffY = useMotionValue(0)
  // Head tilt
  const headRotate = useMotionValue(0)
  // Blink scale (1 = open, ~0 = closed)
  const leftBlink  = useMotionValue(1)
  const rightBlink = useMotionValue(1)

  // Detect touch device on mount
  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  // Cursor-follow: move pupils and tilt head
  useEffect(() => {
    if (reducedMotion || isTouch) return
    const svg = svgRef.current
    if (!svg) return

    const onMove = (e: MouseEvent) => {
      const rect = svg.getBoundingClientRect()
      const scaleX = VB_W / rect.width
      const scaleY = VB_H / rect.height
      // Face reference in screen space
      const refScreenX = rect.left + FACE_REF.x / scaleX
      const refScreenY = rect.top  + FACE_REF.y / scaleY

      const dx = e.clientX - refScreenX
      const dy = e.clientY - refScreenY
      const dist = Math.sqrt(dx * dx + dy * dy) || 1
      const nx = dx / dist
      const ny = dy / dist

      animate(pupilOffX, nx * MAX_PUPIL, { duration: 0.3, ease: 'easeOut' })
      animate(pupilOffY, ny * MAX_PUPIL, { duration: 0.3, ease: 'easeOut' })

      // Horizontal tilt only: positive = tilt right
      const tilt = (dx / (window.innerWidth * 0.5)) * MAX_TILT
      animate(headRotate, Math.max(-MAX_TILT, Math.min(MAX_TILT, tilt)), {
        duration: 0.5,
        ease: 'easeOut',
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [reducedMotion, isTouch, pupilOffX, pupilOffY, headRotate])

  // Blink loop
  useEffect(() => {
    if (reducedMotion) return
    let timer: ReturnType<typeof setTimeout>

    const doBlink = async () => {
      // Both eyes close together
      await Promise.all([
        animate(leftBlink,  0.06, { duration: 0.10 }),
        animate(rightBlink, 0.06, { duration: 0.10 }),
      ])
      await Promise.all([
        animate(leftBlink,  1, { duration: 0.14 }),
        animate(rightBlink, 1, { duration: 0.14 }),
      ])
      scheduleBlink()
    }

    const scheduleBlink = () => {
      const delay = 2800 + Math.random() * 4000
      timer = setTimeout(doBlink, delay)
    }

    // Small initial delay so it doesn't blink on page load
    timer = setTimeout(scheduleBlink, 1500)
    return () => clearTimeout(timer)
  }, [reducedMotion, leftBlink, rightBlink])

  return (
    <motion.svg
      ref={svgRef}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="v2-face-svg w-full h-auto max-w-[300px] mx-auto block"
      aria-hidden="true"
      style={{ rotate: headRotate }}
    >
      {/* ── Shoulders ── */}
      <path
        d="M 25 318 C 48 285 80 268 112 262 M 148 262 C 180 268 212 285 235 318"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />

      {/* ── Neck ── */}
      <path
        d="M 113 242 L 110 262 M 147 242 L 150 262"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />

      {/* ── Head outline ── */}
      <path
        d="M 130 42
           C 168 42 198 72 200 118
           C 202 165 190 210 172 234
           C 160 252 146 260 130 260
           C 114 260 100 252 88 234
           C 70 210 58 165 60 118
           C 62 72 92 42 130 42 Z"
        stroke="currentColor" strokeWidth="1.5"
      />

      {/* ── Hair (cap over head) ── */}
      <path
        d="M 60 118
           C 58 80 74 50 100 40
           C 112 35 120 33 130 33
           C 140 33 148 35 160 40
           C 186 50 202 80 200 118"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />
      {/* Hair texture lines */}
      <path
        d="M 88 38 C 84 54 80 70 76 88
           M 130 33 C 129 50 128 66 127 84
           M 172 38 C 176 54 180 70 184 88"
        stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.45"
      />

      {/* ── Left ear ── */}
      <path
        d="M 60 148 C 52 152 49 163 52 174 C 54 181 59 184 64 180"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />
      {/* ── Right ear ── */}
      <path
        d="M 200 148 C 208 152 211 163 208 174 C 206 181 201 184 196 180"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />

      {/* ── Left eyebrow ── */}
      <path
        d="M 80 130 C 88 122 104 120 120 125"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />
      {/* ── Right eyebrow ── */}
      <path
        d="M 140 125 C 156 120 172 122 180 130"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />

      {/* ── Left eye outline (almond) ── */}
      <path
        d="M 80 150 C 84 141 96 138 112 141 C 118 143 122 148 119 153 C 115 159 100 161 88 158 C 82 156 78 153 80 150 Z"
        stroke="currentColor" strokeWidth="1.5"
      />
      {/* Left eye iris + pupil (animated blink via scaleY) */}
      <motion.g
        style={{
          scaleY: leftBlink,
          transformBox: 'fill-box',
          transformOrigin: 'center',
        }}
      >
        <circle
          cx={LEFT_EYE.x} cy={LEFT_EYE.y}
          r="7.5"
          stroke="currentColor" strokeWidth="1.2"
        />
        <motion.circle
          cx={LEFT_EYE.x} cy={LEFT_EYE.y}
          r="3.5"
          fill="currentColor"
          style={{ x: pupilOffX, y: pupilOffY }}
        />
      </motion.g>

      {/* ── Right eye outline (almond) ── */}
      <path
        d="M 140 150 C 138 143 152 138 168 141 C 180 143 182 148 180 153 C 176 159 162 161 150 158 C 142 156 138 153 140 150 Z"
        stroke="currentColor" strokeWidth="1.5"
      />
      {/* Right eye iris + pupil (animated blink) */}
      <motion.g
        style={{
          scaleY: rightBlink,
          transformBox: 'fill-box',
          transformOrigin: 'center',
        }}
      >
        <circle
          cx={RIGHT_EYE.x} cy={RIGHT_EYE.y}
          r="7.5"
          stroke="currentColor" strokeWidth="1.2"
        />
        <motion.circle
          cx={RIGHT_EYE.x} cy={RIGHT_EYE.y}
          r="3.5"
          fill="currentColor"
          style={{ x: pupilOffX, y: pupilOffY }}
        />
      </motion.g>

      {/* ── Nose ── */}
      <path
        d="M 122 168 C 120 182 118 190 114 196 C 120 200 140 200 146 196 C 142 190 140 182 138 168"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"
      />

      {/* ── Mouth ── */}
      {/* Upper lip */}
      <path
        d="M 108 218 C 115 213 125 211 130 212 C 135 211 145 213 152 218"
        stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.7"
      />
      {/* Lower lip / smile */}
      <path
        d="M 108 218 C 116 226 130 229 152 218"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"
      />
    </motion.svg>
  )
}
