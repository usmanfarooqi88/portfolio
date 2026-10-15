import { motion } from 'framer-motion'
import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { CV_URL } from '../../constants/links'
import { profile } from '../../data/profile'
import { handleSmoothScroll } from '../../utils/smoothScroll'
import { ThreeAvatar } from '../ui/ThreeAvatar'

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export function HeroSection() {
  return (
    <section id="intro" className="v2-hero" aria-label="Introduction">
      <div className="v2-hero__inner">

        {/* ── Left column: text content ── */}
        <div className="v2-hero__content">
          <motion.h1 {...fadeIn(0.0)} className="v2-hero__title">
            I make complex products feel clear,{' '}
            <em>useful, and human.</em>
          </motion.h1>

          <motion.p {...fadeIn(0.1)} className="v2-hero__body">
            18+ years of craft across SaaS, AI, PropTech, and hospitality —
            from early concepts to production-ready design systems.
          </motion.p>

          <motion.p {...fadeIn(0.18)} className="v2-hero__availability">
            <span
              className={`v2-hero__dot ${profile.available ? 'v2-hero__dot--on' : ''}`}
              aria-hidden
            />
            <span>
              {profile.available ? `${profile.availableLabel} · ` : ''}
              {profile.locationLine}
            </span>
          </motion.p>

          <motion.nav {...fadeIn(0.26)} aria-label="Quick navigation" className="v2-hero__ctas">
            <button
              type="button"
              className="v2-hero__cta-link"
              onClick={(e) => handleSmoothScroll(e as MouseEvent<HTMLButtonElement>, '#work')}
            >
              View work <span aria-hidden>↓</span>
            </button>
            <a href={CV_URL} target="_blank" rel="noopener noreferrer" className="v2-hero__cta-link">
              Résumé <span aria-hidden>↗</span>
            </a>
            <Link to="/contact" className="v2-hero__cta-link v2-hero__cta-link--muted">
              Discuss a role <span aria-hidden>→</span>
            </Link>
          </motion.nav>
        </div>

        {/* ── Right column: face illustration ── */}
        <motion.div
          className="v2-hero__illustration"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          aria-hidden="true"
        >
          <ThreeAvatar />
        </motion.div>

      </div>
    </section>
  )
}
