/**
 * MarqueeBand : decorative scroll-scrubbed text band.
 *
 * Props:
 *   rows       : array of { text, color } objects, one per row
 *   direction  : 'left' | 'right' (row 1 direction; row 2 alternates)
 *
 * Motion: horizontal translate scrubbed with scroll via Framer Motion.
 * Row 1 moves in `direction`, row 2 moves opposite, ±15vw over the
 * section's scroll pass. Disabled at <768px and prefers-reduced-motion.
 */

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export interface MarqueeRow {
  text: string
  color: string
}

interface MarqueeBandProps {
  rows: MarqueeRow[]
  /** Primary direction for row[0]. Row[1] moves opposite. Default 'left'. */
  direction?: 'left' | 'right'
}

/** Repeat the text string enough times to fill > 2× the viewport width. */
function buildTrack(text: string, reps = 4): string {
  return Array(reps).fill(text).join('')
}

export function MarqueeBand({ rows, direction = 'left' }: MarqueeBandProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Shift from +15vw→0 (row0) and 0→+15vw (row1) so we never go negative
  // and the left edge of the overflow container never clips content.
  // Visual effect is identical: rows glide in opposite directions, ±15vw.
  const row0Start = direction === 'left' ? '15vw' : '0vw'
  const row0End   = direction === 'left' ? '0vw'  : '15vw'
  const row1Start = direction === 'left' ? '0vw'  : '15vw'
  const row1End   = direction === 'left' ? '15vw' : '0vw'

  const xRow0 = useTransform(scrollYProgress, [0, 1], [row0Start, row0End])
  const xRow1 = useTransform(scrollYProgress, [0, 1], [row1Start, row1End])

  const xValues = [xRow0, xRow1]

  return (
    <section
      ref={sectionRef}
      aria-hidden="true"
      className="marquee-band overflow-hidden"
      style={{ paddingBlock: 'clamp(1.5rem, 3vh, 2.5rem)' }}
    >
      {rows.map((row, i) => (
        <motion.div
          key={i}
          className="marquee-band__row whitespace-nowrap"
          style={
            reduceMotion
              ? undefined
              : { x: xValues[i % 2] }
          }
        >
          <span
            className="marquee-band__text"
            style={{
              color: row.color,
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontSize: 'clamp(2.2rem, 8vw, 9rem)',
              fontWeight: 300,
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
          >
            {buildTrack(row.text)}
          </span>
        </motion.div>
      ))}
    </section>
  )
}
