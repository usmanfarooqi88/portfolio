import { motion, useReducedMotion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export function HeroSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="intro" className="v2-hero" aria-label="Introduction">
      <div className="v2-hero__inner v2-hero__inner--split">

        {/* ── Left: text ── */}
        <div className="v2-hero__text">
          <motion.h1 {...fadeUp(0.0)} className="v2-hero__title">
            <span>I design products people</span>
            <span>understand — in <em>English</em></span>
            <span>and <em>Arabic.</em></span>
          </motion.h1>

          <motion.p {...fadeUp(0.1)} className="v2-hero__body">
            Senior Product Designer with 7+ years across PropTech, FinTech, and SaaS —
            simplifying complex products, building scalable design systems, and shipping
            experiences that work for both LTR and RTL audiences.
          </motion.p>

          <motion.div {...fadeUp(0.2)} className="v2-hero__availability">
            <span className="v2-hero__dot v2-hero__dot--on" aria-hidden="true" />
            <span>Available for senior design roles and selected collaborations</span>
          </motion.div>

          <motion.div {...fadeUp(0.3)} className="v2-hero__ctas">
            <a href="#work" className="v2-hero__cta-link">
              View work
              <span aria-hidden="true">↓</span>
            </a>
            <a href="#contact" className="v2-hero__cta-link v2-hero__cta-link--muted">
              Get in touch
              <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        </div>

        {/* ── Right: portrait ── */}
        <motion.div
          className="v2-hero__visual"
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="v2-hero__portrait-wrap">
            <img
              src="/images/avatar.jpg"
              alt="Usman Farooqi — Senior Product Designer"
              width={480}
              height={600}
              className="v2-hero__portrait"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
