import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const AVATAR_IMG = '/images/avatar.png'

export function AboutPreview() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })

  return (
    <section id="about" aria-label="About preview" className="py-20 lg:py-28">
      <div
        ref={ref}
        className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-20 items-center"
      >
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted-text)] mb-6">
            About
          </p>
          <h2
            className="font-bold text-[var(--dark-navy)] leading-[1.1] tracking-[-0.02em] mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.8rem)' }}
          >
            Curiosity keeps me moving.
          </h2>
          <p className="text-[16px] text-[var(--muted-text)] leading-[1.7] mb-4">
            I began with illustration and visual design before moving into interfaces,
            interaction design, product systems, and AI-assisted workflows.
          </p>
          <p className="text-[16px] text-[var(--muted-text)] leading-[1.7] mb-8">
            Outside product work, I enjoy trekking, travel, gaming, football, illustration, and
            exploring emerging technology. These interests keep me observant, curious, and open
            to new ways of thinking.
          </p>
          <Link
            to="/about"
            className="group inline-flex items-center gap-2 text-[15px] font-bold text-[var(--dark-navy)] hover:text-primary-orange transition-colors"
          >
            More about me
            <span className="inline-block transition-transform group-hover:translate-x-[3px]" aria-hidden>→</span>
          </Link>
        </motion.div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="hidden lg:block"
        >
          <img
            src={AVATAR_IMG}
            alt="Usman Farooqi"
            width={340}
            height={340}
            className="w-full aspect-square object-cover rounded-2xl"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  )
}
