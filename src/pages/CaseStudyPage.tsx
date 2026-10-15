import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { CaseStudyContent } from '../components/caseStudy/CaseStudyContent'
import { CaseStudyHero } from '../components/caseStudy/CaseStudyHero'
import { RelatedProjects } from '../components/caseStudy/RelatedProjects'
import { caseStudies, getCaseStudyBySlug } from '../data/caseStudies'
import type { HeadingBlock } from '../data/caseStudyBlocks'
import { getRouteMeta } from '../data/routeMeta'
import { applyPageMeta, resetPageMeta } from '../utils/seo'

/* ── Reading-progress bar at the very top ─────────────────── */
function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const scrollable = el.scrollHeight - el.clientHeight
      setProgress(scrollable <= 0 ? 0 : Math.min(100, Math.max(0, (el.scrollTop / scrollable) * 100)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="cs2-progress" role="progressbar" aria-label="Reading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
      <div className="cs2-progress__bar" style={{ width: `${progress}%` }} />
    </div>
  )
}

/* ── Sticky section-nav sidebar ───────────────────────────── */
function SectionNav({ headings }: { headings: Array<{ id: string; label: string }> }) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    )

    for (const h of headings) {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav className="cs2-side-nav" aria-label="Case study sections">
      <p className="cs2-side-nav__title">Contents</p>
      <ul className="cs2-side-nav__list">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`cs2-side-nav__link${activeId === h.id ? ' cs2-side-nav__link--active' : ''}`}
            >
              {h.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/* ── Main page ────────────────────────────────────────────── */
export function CaseStudyPage({ slugOverride }: { slugOverride?: string } = {}) {
  const { slug: paramSlug } = useParams<{ slug: string }>()
  const slug = slugOverride ?? paramSlug
  const caseStudy = slug ? getCaseStudyBySlug(slug) : undefined

  useEffect(() => {
    if (!caseStudy) {
      document.title = 'Case Study Not Found — Usman Zahid Farooqi'
      return
    }
    const path = caseStudy.slug === 'wanderly-ai-travel-planner'
      ? '/work/wanderly'
      : `/case-studies/${caseStudy.slug}`
    const meta = getRouteMeta(path)
    if (meta) applyPageMeta(meta)
    return () => { resetPageMeta() }
  }, [caseStudy])

  /* Extract h2 headings from blocks for sidebar nav */
  const sectionHeadings = useMemo(() => {
    if (!caseStudy?.blocks) return []
    return caseStudy.blocks
      .filter((b): b is HeadingBlock => b.type === 'heading' && (b.level === 2 || !b.level))
      .map((b) => ({ id: b.id, label: b.label ?? b.content }))
  }, [caseStudy])

  /* Next/prev case study */
  const currentIndex = useMemo(() => caseStudies.findIndex((cs) => cs.slug === slug), [slug])
  const nextCaseStudy = useMemo(() => caseStudies[currentIndex + 1] ?? caseStudies[0], [currentIndex])

  if (!caseStudy) {
    return (
      <div className="case-study-not-found">
        <h1 className="font-display">Case study not found</h1>
        <Link to="/#work">← Back to portfolio</Link>
      </div>
    )
  }

  const nextHref = nextCaseStudy.slug === 'wanderly-ai-travel-planner'
    ? '/work/wanderly'
    : `/case-studies/${nextCaseStudy.slug}`

  return (
    <div className="cs2-page" data-cs={caseStudy.id}>
      <ReadingProgress />

      <a href="#cs2-main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-orange focus:text-white focus:rounded-md focus:text-sm focus:font-semibold">
        Skip to content
      </a>

      {/* Back nav */}
      <div className="cs2-topnav">
        <div className="cs2-topnav__inner">
          <Link to="/#work" className="cs2-back">
            <ArrowLeft size={14} aria-hidden="true" />
            All projects
          </Link>
        </div>
      </div>

      {/* Editorial header + hero image */}
      <CaseStudyHero caseStudy={caseStudy} />

      {/* Body: sidebar + content */}
      <div className="cs2-body">
        {/* Sticky sidebar — visible at xl only */}
        <aside className="cs2-sidebar" aria-label="Page navigation">
          <SectionNav headings={sectionHeadings} />
        </aside>

        {/* Main content stream */}
        <main id="cs2-main" className="cs2-stream">
          <CaseStudyContent caseStudy={caseStudy} />
        </main>
      </div>

      {/* Footer nav */}
      <div className="cs2-footer-nav">
        <div className="cs2-footer-nav__inner">
          <Link to="/#work" className="cs2-footer-nav__link cs2-footer-nav__link--prev">
            <ArrowLeft size={14} aria-hidden="true" />
            All projects
          </Link>
          <Link to={nextHref} className="cs2-footer-nav__link cs2-footer-nav__link--next">
            Next: {nextCaseStudy.title}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <RelatedProjects currentId={caseStudy.id} />
    </div>
  )
}
