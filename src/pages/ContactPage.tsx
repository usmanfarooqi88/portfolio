import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { BEHANCE_URL, CONTACT_EMAIL, CV_URL, LINKEDIN_URL } from '../constants/links'
import { profile } from '../data/profile'
import { getRouteMeta } from '../data/routeMeta'
import { applyPageMeta, resetPageMeta } from '../utils/seo'

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function ContactPage() {
  useEffect(() => {
    const meta = getRouteMeta('/contact')
    if (meta) applyPageMeta(meta)
    return () => { resetPageMeta() }
  }, [])

  return (
    <main className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20 pt-16 pb-24 lg:pb-32">

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 lg:gap-24 items-start">

        {/* ── Left : intro ── */}
        <div>
          <FadeIn>
            <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[var(--muted-text)] mb-6">Contact</p>
            <h1
              className="font-bold text-[var(--dark-navy)] leading-[1.08] tracking-[-0.02em] mb-4"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 5rem)' }}
            >
              Let's make something{' '}
              <span className="text-[var(--text-coral)]">clear, useful,</span>
              {' '}and well considered.
            </h1>
            <p className="text-[16px] text-[var(--muted-text)] leading-[1.65] max-w-[520px] mb-10">
              I'm open to senior product-design opportunities, selected collaborations, and
              conversations about AI-powered products, design systems, and complex digital experiences.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 bg-primary-orange text-[var(--dark-navy)] font-bold text-[16px] rounded-full px-8 py-4 hover:bg-[var(--text-coral)] hover:text-white transition-colors"
            >
              Email me →
            </a>
          </FadeIn>
        </div>

        {/* ── Right : links ── */}
        <div className="lg:sticky lg:top-24 space-y-10">
          <FadeIn delay={0.15}>
            <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[var(--muted-text)] mb-5">Direct contact</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="block font-bold text-[17px] text-[var(--dark-navy)] hover:text-[var(--accent-text)] transition-colors mb-1"
            >
              {CONTACT_EMAIL}
            </a>
            <p className="text-[14px] text-[var(--muted-text)]">Lahore, Pakistan · Open to remote and relocation</p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[var(--muted-text)] mb-5">Find me online</p>
            <div className="space-y-3">
              {[
                { label: 'LinkedIn',    href: LINKEDIN_URL, download: false },
                { label: 'Behance',     href: BEHANCE_URL,  download: false },
                { label: 'Download CV', href: CV_URL,       download: true  },
              ].map(({ label, href, download }) => (
                <div key={label}>
                  <a href={href}
                    {...(download ? { download: true } : { target: '_blank', rel: 'noopener noreferrer' })}
                    className="flex items-center justify-between group py-1">
                    <span className="text-[15px] font-bold text-[var(--dark-navy)] group-hover:text-[var(--accent-text)] transition-colors">{label}</span>
                    <span className="text-[var(--muted-text)] opacity-50 group-hover:text-[var(--accent-text)] group-hover:opacity-100 transition-colors text-[13px]">{download ? '↓' : '↗'}</span>
                  </a>
                  <div className="border-t border-[var(--soft-border)] mt-2" />
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[var(--muted-text)] mb-5">Open to</p>
            <div className="space-y-2.5">
              {[
                'Senior Product Designer roles',
                'AI-powered product design',
                'Design systems',
                'Short-term collaborations',
              ].map(item => (
                <div key={item} className="flex items-center gap-3 text-[14px] text-[var(--muted-text)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-text)] shrink-0" aria-hidden />
                  {item}
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="rounded-2xl border border-[var(--soft-border)] bg-[var(--pure-white)] p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2 h-2 rounded-full shrink-0 ${profile.available ? 'bg-green-500' : 'bg-[var(--muted-text)]'}`} aria-hidden />
                <p className="text-[13px] font-bold text-[var(--dark-navy)]">{profile.availableLabel}</p>
              </div>
              <p className="text-[13px] text-[var(--muted-text)] leading-[1.6]">
                {profile.availableDetail}
              </p>
            </div>
          </FadeIn>
        </div>

      </div>
    </main>
  )
}
