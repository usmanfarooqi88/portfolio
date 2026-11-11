/**
 * HeroSection : B4 scroll-expansion hero
 *
 * Mechanic: photo container is position:absolute, right-anchored, full height.
 * Its width grows from 44vw → 100vw as the user scrolls through 260vh of wrapper.
 * object-fit:cover + fixed height → cover scale increases (zoom-in feel).
 * Text stays in place; photo layer is above text (z-index) and covers it progressively.
 *
 * Below 768px or prefers-reduced-motion: static stacked layout, no expansion.
 *
 * Photo config: swap src / objectPosition when you replace avatar.jpg.
 * Current 1024×1024 portrait at objectPosition '50% 30%' keeps the face visible at start.
 */

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const PHOTO = {
  src: '/images/avatar2.jpg',
  alt: 'Portrait of Usman Zahid Farooqi',
  /**
   * objectPosition for the photo within its cover container.
   * '50% 30%' keeps the face in-frame at start (44vw) and through mid-expansion.
   * Adjust if you replace the portrait with a wide photo.
   */
  objectPosition: '50% 30%',
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export function HeroSection() {
  const reduceMotion = useReducedMotion()
  const outerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  })

  // Width grows from 44vw → 100vw as scroll progresses
  const photoWidth = useTransform(scrollYProgress, [0, 1], ['44vw', '100vw'])

  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768,
  )
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  const expansionEnabled = !reduceMotion && !isMobile

  return (
    <section
      id="intro"
      ref={outerRef}
      className={expansionEnabled ? 'hero-outer' : 'hero-outer hero-outer--static'}
      aria-label="Introduction"
    >
      <div className="hero-sticky">

        {/* Text : left side, stays in place */}
        <div className="hero-text">
          <motion.h1 {...fadeUp(0.0)} className="v2-hero__title">
            Senior Product Designer crafting clear, scalable products for English and Arabic users.
          </motion.h1>

          <motion.div {...fadeUp(0.1)} className="v2-hero__availability">
            <span className="v2-hero__dot v2-hero__dot--on" aria-hidden="true" />
            <span>Lahore, Pakistan · Open to remote and relocation</span>
          </motion.div>

          <motion.div {...fadeUp(0.2)} className="v2-hero__ctas">
            <a href="#work" className="v2-hero__cta-link">
              View selected work
              <span aria-hidden="true">↓</span>
            </a>
            <a href="#contact" className="v2-hero__cta-link v2-hero__cta-link--muted">
              Get in touch
              <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        </div>

        {/* Photo : right-anchored, width grows with scroll */}
        <motion.div
          className="hero-photo"
          style={expansionEnabled ? { width: photoWidth } : undefined}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <img
            src={PHOTO.src}
            alt={PHOTO.alt}
            width={1024}
            height={1024}
            className="hero-photo__img"
            style={{ objectPosition: 'var(--hero-photo-pos, 50% 30%)' }}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </motion.div>

      </div>
    </section>
  )
}
