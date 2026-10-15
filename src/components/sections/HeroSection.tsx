import { motion } from 'framer-motion'
import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { CV_URL } from '../../constants/links'
import { profile } from '../../data/profile'
import { handleSmoothScroll } from '../../utils/smoothScroll'
import { FaceIllustration } from '../ui/FaceIllustration'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
})

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay },
})

export function HeroSection() {
  return (
    <section id="intro" className="v2-hero" aria-label="Introduction">
      <div className="v2-hero__layout">

        {/* ── Left: editorial text ── */}
        <div className="v2-hero__text">
          <motion.p {...fadeIn(0)} className="v2-hero__eyebrow">
            Senior Product Designer — SaaS · AI · Design Systems
          </motion.p>

          <motion.h1 {...fadeUp(0.08)} className="v2-hero__title font-display">
            I make<br />complex products<br />
            feel <em>clear,<br />useful, and human.</em>
          </motion.h1>

          <motion.p {...fadeIn(0.22)} className="v2-hero__body">
            18+ years of craft across SaaS, AI, PropTech, and hospitality — from early
            concepts to production-ready design systems.
          </motion.p>

          <motion.p {...fadeIn(0.32)} className="v2-hero__availability">
            <span
              className={`v2-hero__dot ${profile.available ? 'v2-hero__dot--on' : ''}`}
              aria-hidden
            />
            <span>
              {profile.available ? `${profile.availableLabel} · ` : ''}
              {profile.locationLine}
            </span>
          </motion.p>

          <motion.nav
            {...fadeIn(0.44)}
            aria-label="Quick navigation"
            className="v2-hero__ctas"
          >
            <button
              type="button"
              className="v2-hero__cta-link"
              onClick={(e) => handleSmoothScroll(e as MouseEvent<HTMLButtonElement>, '#work')}
            >
              View work <span aria-hidden>↓</span>
            </button>
            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="v2-hero__cta-link"
            >
              Résumé <span aria-hidden>↗</span>
            </a>
            <Link to="/contact" className="v2-hero__cta-link v2-hero__cta-link--muted">
              Discuss a role <span aria-hidden>→</span>
            </Link>
          </motion.nav>
        </div>

        {/* ── Right: face illustration ── */}
        <motion.div
          className="v2-hero__illustration"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          aria-hidden="true"
        >
          <FaceIllustration />
        </motion.div>

      </div>
    </section>
  )
}
