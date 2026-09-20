import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const awards = [
  {
    id: 'meira-2024',
    title: 'MEIRA Award (Middle East)',
    issuer: 'MEIRA Award (Middle East)',
    date: 'Dec 2024',
    association: 'LAVA Brands',
    description:
      'Design Award Winning Microsite (Annual Reports) for Alinma Bank 2022, 2023, and 2024 — recognised for outstanding visual design and digital publishing excellence across Gulf-region financial brands.',
  },
]

function AwardRow({ award, index }: { award: (typeof awards)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr] gap-x-12 gap-y-3 border-t border-[var(--soft-border)] py-8 lg:py-10"
    >
      {/* Left — issuer + meta */}
      <div>
        <p className="font-bold text-[15px] text-[var(--dark-navy)]">{award.issuer}</p>
        <p className="text-[13px] text-[var(--muted-text)] mt-1">{award.date}</p>
        <p className="text-[12px] text-[var(--muted-text)] opacity-70 mt-1">{award.association}</p>
      </div>

      {/* Right — title + description */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary-orange border border-[var(--primary-orange)] border-opacity-30 rounded-full px-2.5 py-0.5" style={{ borderColor: 'rgba(250,108,11,0.3)', background: 'rgba(250,108,11,0.08)' }}>
            Award
          </span>
          <p className="font-bold text-[16px] text-[var(--dark-navy)] leading-snug">{award.title}</p>
        </div>
        <p className="text-[14px] text-[var(--muted-text)] leading-[1.65]">{award.description}</p>
      </div>
    </motion.div>
  )
}

export function AwardsSection() {
  return (
    <section id="awards" className="py-20 lg:py-28">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">

        <div className="mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted-text)] mb-3">
            Honors & awards
          </p>
          <h2
            className="font-bold text-[var(--dark-navy)] leading-tight tracking-[-0.02em]"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)' }}
          >
            Recognised work.
          </h2>
        </div>

        <div>
          {awards.map((award, i) => (
            <AwardRow key={award.id} award={award} index={i} />
          ))}
          <div className="border-t border-[var(--soft-border)]" />
        </div>

      </div>
    </section>
  )
}
