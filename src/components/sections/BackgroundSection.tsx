import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { CV_URL } from '../../constants/links'
import { experience } from '../../data/experience'

function ExperienceRow({ entry, index }: { entry: (typeof experience)[0]; index: number }) {
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
      {/* Left col — company + meta */}
      <div>
        <p className="font-bold text-[15px] text-[var(--dark-navy)]">{entry.company}</p>
        <p className="text-[13px] text-[var(--muted-text)] mt-1">{entry.role}</p>
        <p className="text-[12px] text-[var(--muted-text)] opacity-70 mt-1">
          {entry.startDate} – {entry.endDate}
        </p>
        <p className="text-[12px] text-[var(--muted-text)] opacity-70">{entry.location}</p>
      </div>

      {/* Right col — summary + contributions */}
      <div>
        <p className="text-[16px] text-[var(--dark-navy)] opacity-80 leading-[1.65]">{entry.summary}</p>
        <ul className="mt-4 space-y-2">
          {entry.contributions.map((c, i) => (
            <li key={i} className="flex gap-3 text-[14px] text-[var(--muted-text)] leading-[1.6]">
              <span className="mt-[7px] shrink-0 w-[4px] h-[4px] rounded-full bg-primary-orange" aria-hidden />
              {c}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export function BackgroundSection() {
  return (
    <section id="background" className="py-20 lg:py-28">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">

        <div className="flex items-end justify-between gap-8 mb-10">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted-text)] mb-3">
              Professional background
            </p>
            <h2
              className="font-bold text-[var(--dark-navy)] leading-tight tracking-[-0.02em]"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)' }}
            >
              Where I&apos;ve worked.
            </h2>
          </div>
          <a
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 text-[13px] font-bold text-[var(--muted-text)] hover:text-primary-orange transition-colors border border-[var(--soft-border)] hover:border-primary-orange rounded-full px-5 py-2.5"
          >
            View résumé ↗
          </a>
        </div>

        <div>
          {experience.map((entry, i) => (
            <ExperienceRow key={entry.company} entry={entry} index={i} />
          ))}
          <div className="border-t border-[var(--soft-border)]" />
        </div>

      </div>
    </section>
  )
}
