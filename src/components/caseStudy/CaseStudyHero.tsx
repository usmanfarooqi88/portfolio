import { useEffect, useState } from 'react'
import type { CaseStudy } from '../../data/caseStudies'

interface CaseStudyHeroProps {
  caseStudy: CaseStudy
}

export function CaseStudyHero({ caseStudy }: CaseStudyHeroProps) {
  const { role, status, timeline } = caseStudy.details

  // Initialize synchronously so video is never mounted for reduced-motion users.
  // useEffect-only approach would allow a brief autoplay flash before pause.
  const [motionOk, setMotionOk] = useState(() => {
    if (typeof window === 'undefined') return false
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e: MediaQueryListEvent) => setMotionOk(!e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const metaItems = [
    role ? { label: 'Role', value: role } : null,
    timeline ? { label: 'Timeline', value: timeline } : null,
    status ? { label: 'Status', value: status } : null,
  ].filter((item): item is { label: string; value: string } => Boolean(item))

  return (
    <header className="case-study-hero">
      {/* Static image: always rendered as poster/fallback */}
      <img
        src={caseStudy.heroImage}
        alt=""
        role="presentation"
        className="case-study-hero__image"
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />

      {/* Hero video: only mounted when motion is acceptable. Image stays as fallback. */}
      {caseStudy.heroVideo && motionOk ? (
        <video
          className="case-study-hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={caseStudy.heroImage}
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src={caseStudy.heroVideo} type="video/webm" />
        </video>
      ) : null}

      <div className="case-study-hero__overlay" aria-hidden="true" />

      <div className="case-study-hero__content">
        <p className="case-study-type">{caseStudy.projectType}</p>
        <h1 className="case-study-title font-display">{caseStudy.title}</h1>
        <p className="case-study-subtitle">{caseStudy.subtitle}</p>

        {caseStudy.description ? (
          <p className="case-study-hero__thesis">{caseStudy.description}</p>
        ) : null}

        {metaItems.length > 0 ? (
          <dl className="case-study-hero__meta">
            {metaItems.map((item) => (
              <div key={item.label} className="case-study-hero__meta-item">
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {caseStudy.category.length > 0 && (
          <div className="case-study-tags" role="list" aria-label="Project categories">
            {caseStudy.category.map((tag) => (
              <span key={tag} className="case-study-tag" role="listitem">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
