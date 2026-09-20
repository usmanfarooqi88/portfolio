import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { BEHANCE_URL, CONTACT_EMAIL, CV_URL, LINKEDIN_URL } from '../../constants/links'

export function ContactCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })

  return (
    <section id="contact" className="py-20 lg:py-28">
      <div
        ref={ref}
        className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted-text)] mb-6">
            Let&apos;s work together
          </p>

          <h2
            className="font-bold text-[var(--dark-navy)] leading-[1.08] tracking-[-0.02em] max-w-[820px] mb-6"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 5rem)' }}
          >
            Let&apos;s make something{' '}
            <span className="text-primary-orange">clear, useful,</span>
            {' '}and well considered.
          </h2>

          <p className="text-[17px] text-[var(--muted-text)] leading-[1.65] max-w-[560px] mb-10">
            I&apos;m open to senior product-design opportunities, selected collaborations, and
            conversations about AI-powered products, design systems, and complex digital experiences.
          </p>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 bg-primary-orange text-white font-bold text-[15px] rounded-full px-6 py-3 hover:bg-deep-orange transition-colors"
            >
              Email me
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] font-bold text-[var(--dark-navy)] hover:text-primary-orange transition-colors"
            >
              LinkedIn ↗
            </a>
            <a
              href={BEHANCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] font-bold text-[var(--dark-navy)] hover:text-primary-orange transition-colors"
            >
              Behance ↗
            </a>
            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] font-bold text-[var(--dark-navy)] hover:text-primary-orange transition-colors"
            >
              View résumé ↗
            </a>
            <Link
              to="/contact"
              className="text-[15px] font-bold text-[var(--muted-text)] hover:text-primary-orange transition-colors"
            >
              Contact page →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
