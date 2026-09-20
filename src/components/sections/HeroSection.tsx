import { motion } from 'framer-motion'
import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { CV_URL } from '../../constants/links'
import { profile } from '../../data/profile'
import { handleSmoothScroll } from '../../utils/smoothScroll'

export function HeroSection() {
  return (
    <section id="intro" className="overflow-x-clip" aria-label="Introduction">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20 pt-14 pb-16 lg:pb-24">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-5 text-[11px] font-[400] uppercase tracking-[0.14em] text-primary-orange"
        >
          Senior Product Designer · SaaS · AI · Design Systems
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-[22ch] font-bold leading-[1.12] tracking-[-0.02em] text-[var(--dark-navy)]"
          style={{ fontSize: 'clamp(1.75rem, 3.2vw, 3.25rem)' }}
        >
          I make complex products feel{' '}
          <span className="text-primary-orange">clear, useful, and human</span>
          {' '}— from early workflows to production-ready systems.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.45 }}
          className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-[var(--dark-navy)] md:text-[16px]"
        >
          Recent work spans a multi-mode restaurant product and an AI-first design system
          connecting Figma, tokens, components and React.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.45 }}
          className="mt-5 flex items-start gap-2 text-[12px] font-[400] text-[var(--muted-text)]"
        >
          <span
            className={`mt-[3px] inline-flex h-[7px] w-[7px] shrink-0 rounded-full ${
              profile.available ? 'bg-green-500' : 'bg-[#aaa]'
            }`}
            aria-hidden
          />
          <span>
            {profile.available ? `${profile.availableLabel} · ` : ''}
            {profile.locationLine}
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.45, ease: 'easeOut' }}
          className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-1"
        >
          <button
            type="button"
            className="group inline-flex min-h-[44px] items-center gap-2 text-[15px] font-bold text-[var(--dark-navy)] transition-colors hover:text-primary-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-orange"
            onClick={(e) => handleSmoothScroll(e as MouseEvent<HTMLButtonElement>, '#work')}
          >
            View product work
            <span className="inline-block transition-transform group-hover:translate-y-[2px]" aria-hidden>
              ↓
            </span>
          </button>
          <a
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-[44px] items-center gap-2 text-[15px] font-bold text-[var(--dark-navy)] transition-colors hover:text-primary-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-orange"
          >
            View résumé
            <span className="inline-block transition-transform group-hover:translate-x-[2px]" aria-hidden>
              ↗
            </span>
          </a>
          <Link
            to="/contact"
            className="group inline-flex min-h-[44px] items-center gap-2 text-[15px] font-bold text-[var(--muted-text)] transition-colors hover:text-primary-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-orange"
          >
            Discuss a role
            <span className="inline-block transition-transform group-hover:translate-x-[2px]" aria-hidden>
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
