import { motion } from 'framer-motion'

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export function HeroSection() {
  return (
    <section id="intro" className="v2-hero" aria-label="Introduction">
      <div className="v2-hero__inner v2-hero__inner--single">

        <motion.h1 {...fadeIn(0.0)} className="v2-hero__title">
          <span>I design thoughtful digital products 🎨</span>
          <span>and systems that scale. ⚡</span>
        </motion.h1>

        <motion.p {...fadeIn(0.1)} className="v2-hero__body">
          Senior Product Designer with 7+ years across PropTech, FinTech, and SaaS —
          simplifying complex products, designing for English and Arabic audiences,
          and building scalable design systems.
        </motion.p>

        <motion.div {...fadeIn(0.2)} className="v2-hero__availability">
          <span className="v2-hero__dot v2-hero__dot--on" aria-hidden="true" />
          <span>Available for senior design roles and selected collaborations</span>
        </motion.div>

        <motion.div {...fadeIn(0.3)} className="v2-hero__ctas">
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
    </section>
  )
}
