import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { CaseStudyContent } from '../components/caseStudy/CaseStudyContent'
import { CaseStudyDetails } from '../components/caseStudy/CaseStudyDetails'
import { CaseStudyHero } from '../components/caseStudy/CaseStudyHero'
import { RelatedProjects } from '../components/caseStudy/RelatedProjects'
import { getCaseStudyBySlug } from '../data/caseStudies'
import { getRouteMeta } from '../data/routeMeta'
import { applyPageMeta, resetPageMeta } from '../utils/seo'

function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const scrollable = el.scrollHeight - el.clientHeight
      if (scrollable <= 0) {
        setProgress(0)
        return
      }
      setProgress(Math.min(100, Math.max(0, (el.scrollTop / scrollable) * 100)))
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
    <div
      className="case-study-progress"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
    >
      <div className="case-study-progress__bar" style={{ width: `${progress}%` }} />
    </div>
  )
}

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

  if (!caseStudy) {
    return (
      <div className="case-study-not-found">
        <h1 className="font-display">Case study not found</h1>
        <Link to="/#work">← Back to portfolio</Link>
      </div>
    )
  }

  return (
    <div className="case-study-page">
      <ReadingProgress />

      <a
        href="#cs-main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-orange focus:text-white focus:rounded-md focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>

      <div className="case-study-breadcrumb">
        <Link to="/#work" className="case-study-back">
          <ArrowLeft size={14} aria-hidden="true" />
          Back to Work
        </Link>
      </div>

      <CaseStudyHero caseStudy={caseStudy} />

      <div className="case-study-body">
        <aside className="case-study-sidebar-slot">
          <CaseStudyDetails caseStudy={caseStudy} />
        </aside>

        <main id="cs-main" className="case-study-stream">
          <CaseStudyContent caseStudy={caseStudy} />
        </main>
      </div>

      <RelatedProjects currentId={caseStudy.id} />
    </div>
  )
}
