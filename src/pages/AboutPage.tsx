import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { CV_URL } from '../constants/links'
import { experience } from '../data/experience'
import { profile } from '../data/profile'
import { getRouteMeta } from '../data/routeMeta'
import { applyPageMeta, resetPageMeta } from '../utils/seo'

const AVATAR_IMG = '/images/avatar.png'

const tools = [
  'Figma', 'Claude', 'ChatGPT', 'Runway ML', 'Midjourney', 'V0', 'Lovable',
  'Cursor', 'Claude Code', 'Blender', 'Adobe Creative Suite', 'Prototyping',
  'Animation', 'Usability Testing', 'AI Design Systems',
]

const industries = [
  'SaaS Platforms', 'PropTech', 'EdTech', 'HealthTech', 'FinTech',
  'AI-Powered Apps', 'Enterprise Dashboards', 'Restaurant Technology',
]

const interests = [
  { label: 'Trekking', detail: 'Mountain trails sharpened how I map out user journeys — point A to B, clear path, no dead ends.' },
  { label: 'Gaming', detail: 'Game design taught me reward loops, feedback, and how tiny interactions make or break an experience.' },
  { label: 'Illustration', detail: 'Where it all started. Visual thinking is still how I communicate ideas before a single frame is opened.' },
  { label: 'Emerging tech', detail: 'I spend time with new AI tools, not to follow trends, but to find where they genuinely improve the craft.' },
]

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

export function AboutPage() {
  useEffect(() => {
    const meta = getRouteMeta('/about')
    if (meta) applyPageMeta(meta)
    return () => { resetPageMeta() }
  }, [])

  return (
    <main className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">

      {/* ── Hero ── */}
      <section className="pt-16 pb-20 lg:pb-28 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 lg:gap-24 items-start">
        <div>
          <FadeIn>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted-text)] mb-6">About</p>
            <h1
              className="font-bold text-[var(--dark-navy)] leading-[1.08] tracking-[-0.02em] mb-8"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 5.5rem)' }}
            >
              Designing with<br />
              <span className="text-primary-orange">curiosity</span> for 18+ years.
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-[17px] text-[var(--muted-text)] leading-[1.75] mb-5 max-w-[620px]">
              I began with illustration and visual design, then moved into digital interfaces,
              interaction design, product systems, and AI-assisted workflows. That progression
              wasn't accidental — each step added a layer to how I think about products.
            </p>
            <p className="text-[17px] text-[var(--muted-text)] leading-[1.75] mb-5 max-w-[620px]">
              Over 18 years I've worked across SaaS platforms, restaurant technology, PropTech,
              FinTech, enterprise dashboards, and AI-powered applications — often as the sole
              designer or lead, owning everything from early concepts to production-ready specs.
            </p>
            <p className="text-[17px] text-[var(--muted-text)] leading-[1.75] max-w-[620px]">
              Today I'm based in Lahore and work with teams across Pakistan, the UAE, and
              international markets. I'm open to senior product-design roles, selected
              collaborations, and conversations about AI-native product design.
            </p>
          </FadeIn>
          <FadeIn delay={0.15} className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary-orange text-white font-bold text-[15px] rounded-full px-6 py-3 hover:bg-deep-orange transition-colors"
            >
              View résumé ↗
            </a>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 text-[15px] font-bold text-[var(--dark-navy)] hover:text-primary-orange transition-colors"
            >
              Get in touch
              <span className="inline-block transition-transform group-hover:translate-x-[3px]" aria-hidden>→</span>
            </Link>
          </FadeIn>
        </div>

        {/* Portrait */}
        <FadeIn delay={0.08} className="hidden lg:block sticky top-24">
          <img
            src={AVATAR_IMG}
            alt="Usman Farooqi"
            width={320}
            height={400}
            className="w-full rounded-2xl object-cover"
            style={{ aspectRatio: '4/5' }}
          />
          <div className="mt-4 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full shrink-0 ${profile.available ? 'bg-green-500' : 'bg-[var(--muted-text)]'}`} aria-hidden />
            <p className="text-[13px] text-[var(--muted-text)]">{profile.available ? profile.availableLabel + ' · ' : ''}{profile.location}</p>
          </div>
        </FadeIn>
      </section>

      {/* ── What drives me ── */}
      <section className="py-16 lg:py-20 border-t border-[var(--soft-border)]">
        <FadeIn>
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted-text)] mb-10">What drives me</p>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
          {interests.map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.07}>
              <p className="font-bold text-[18px] text-[var(--dark-navy)] mb-2">{item.label}</p>
              <p className="text-[15px] text-[var(--muted-text)] leading-[1.65]">{item.detail}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Tools & skills ── */}
      <section className="py-16 lg:py-20 border-t border-[var(--soft-border)]">
        <FadeIn>
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted-text)] mb-6">Tools & skills</p>
        </FadeIn>
        <FadeIn delay={0.05} className="flex flex-wrap gap-2">
          {tools.map((tool) => (
            <span
              key={tool}
              className="text-[13px] font-bold text-[var(--dark-navy)] border border-[var(--soft-border)] rounded-full px-4 py-1.5"
            >
              {tool}
            </span>
          ))}
        </FadeIn>
      </section>

      {/* ── Industries ── */}
      <section className="py-16 lg:py-20 border-t border-[var(--soft-border)]">
        <FadeIn>
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted-text)] mb-6">Industries</p>
        </FadeIn>
        <FadeIn delay={0.05} className="flex flex-wrap gap-2">
          {industries.map((ind) => (
            <span
              key={ind}
              className="text-[13px] font-bold text-[var(--dark-navy)] border border-[var(--soft-border)] rounded-full px-4 py-1.5"
            >
              {ind}
            </span>
          ))}
        </FadeIn>
      </section>

      {/* ── Experience ── */}
      <section className="py-16 lg:py-20 border-t border-[var(--soft-border)]">
        <FadeIn className="flex items-end justify-between gap-8 mb-10">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted-text)] mb-3">Experience</p>
            <h2
              className="font-bold text-[var(--dark-navy)] leading-tight tracking-[-0.02em]"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.8rem)' }}
            >
              Where I've worked.
            </h2>
          </div>
          <a
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-[13px] font-bold text-[var(--muted-text)] hover:text-primary-orange transition-colors border border-[var(--soft-border)] hover:border-primary-orange rounded-full px-5 py-2.5"
          >
            Full résumé ↗
          </a>
        </FadeIn>
        <div>
          {experience.map((entry, i) => (
            <FadeIn
              key={entry.company}
              delay={i * 0.08}
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr] gap-x-12 gap-y-3 border-t border-[var(--soft-border)] py-8"
            >
              <div>
                <p className="font-bold text-[15px] text-[var(--dark-navy)]">{entry.company}</p>
                <p className="text-[13px] text-[var(--muted-text)] mt-1">{entry.role}</p>
                <p className="text-[12px] text-[var(--muted-text)] opacity-70 mt-1">{entry.startDate} – {entry.endDate}</p>
                <p className="text-[12px] text-[var(--muted-text)] opacity-70">{entry.location}</p>
              </div>
              <div>
                <p className="text-[16px] text-[var(--dark-navy)] opacity-80 leading-[1.65]">{entry.summary}</p>
                <ul className="mt-4 space-y-2">
                  {entry.contributions.map((c, j) => (
                    <li key={j} className="flex gap-3 text-[14px] text-[var(--muted-text)] leading-[1.6]">
                      <span className="mt-[7px] shrink-0 w-[4px] h-[4px] rounded-full bg-primary-orange" aria-hidden />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
          <div className="border-t border-[var(--soft-border)]" />
        </div>
      </section>

      {/* ── Education ── */}
      <section className="py-16 lg:py-20 border-t border-[var(--soft-border)]">
        <FadeIn>
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted-text)] mb-3">Education</p>
        </FadeIn>
        <FadeIn delay={0.05} className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr] gap-x-12 gap-y-3 pt-6">
          <div>
            <p className="font-bold text-[15px] text-[var(--dark-navy)]">University of Punjab</p>
            <p className="text-[13px] text-[var(--muted-text)] mt-1">Lahore, Pakistan</p>
            <p className="text-[12px] text-[var(--muted-text)] opacity-70 mt-1">2009 – 2013</p>
          </div>
          <div>
            <p className="text-[16px] text-[var(--dark-navy)] leading-[1.65] font-bold">Bachelor of Arts — Illustration</p>
            <p className="text-[14px] text-[var(--muted-text)] mt-2 leading-[1.65]">
              A foundation in visual storytelling, composition, and image-making that still
              informs how I approach product design — structure first, aesthetics in service of clarity.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ── Languages ── */}
      <section className="py-16 lg:py-20 border-t border-[var(--soft-border)]">
        <FadeIn>
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted-text)] mb-6">Languages</p>
        </FadeIn>
        <FadeIn delay={0.05} className="flex gap-4">
          {['English', 'Urdu'].map((lang) => (
            <span key={lang} className="text-[13px] font-bold text-[var(--dark-navy)] border border-[var(--soft-border)] rounded-full px-4 py-1.5">
              {lang}
            </span>
          ))}
        </FadeIn>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 lg:py-24 border-t border-[var(--soft-border)]">
        <FadeIn>
          <h2
            className="font-bold text-[var(--dark-navy)] leading-[1.1] tracking-[-0.02em] mb-6"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 4rem)' }}
          >
            Let's make something<br />
            <span className="text-primary-orange">worth making.</span>
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary-orange text-white font-bold text-[15px] rounded-full px-6 py-3 hover:bg-deep-orange transition-colors"
          >
            Get in touch →
          </Link>
        </FadeIn>
      </section>

    </main>
  )
}
