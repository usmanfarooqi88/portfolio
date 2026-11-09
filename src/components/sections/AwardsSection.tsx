import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function AwardsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })

  return (
    <section id="awards" className="py-4 lg:py-6">
      <div className="v2-section-inner">

        <div className="mb-7">
          <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[var(--muted-text)] mb-3">
            Honors & recognition
          </p>
          <h2
            className="font-bold text-[var(--dark-navy)] leading-tight tracking-[-0.02em]"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)' }}
          >
            Recognised work.
          </h2>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="border-t border-[var(--soft-border)] py-6 lg:py-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-10"
        >
          {/* Logo */}
          <div className="shrink-0">
            <img
              src="/images/meira-2024-ir-awards.png"
              alt="MEIRA 2024 IR Awards, Middle East Investor Relations Association"
              width={180}
              height={180}
              className="w-[140px] md:w-[160px] h-auto object-contain"
            />
          </div>

          {/* Copy */}
          <div>
            <p className="text-[16px] text-[var(--dark-navy)] leading-[1.65] font-medium">
              Contributed to award-winning annual report websites.
            </p>
            <p className="text-[13px] text-[var(--muted-text)] mt-1.5 leading-[1.6]">
              MEIRA 2024 IR Awards · Middle East Investor Relations Association
            </p>
          </div>
        </motion.div>


      </div>
    </section>
  )
}
