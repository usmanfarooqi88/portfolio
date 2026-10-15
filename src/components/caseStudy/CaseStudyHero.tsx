import type { CaseStudy } from '../../data/caseStudies'

interface CaseStudyHeroProps {
  caseStudy: CaseStudy
}

export function CaseStudyHero({ caseStudy }: CaseStudyHeroProps) {
  const { role, timeline, status } = caseStudy.details

  // Show Role + Timeline in header (following Andrea's layout — clean 2-column grid)
  // Status shown separately as a badge if present
  const meta: Array<{ label: string; value: string }> = [
    role ? { label: 'Role', value: role } : null,
    timeline ? { label: 'Timeline', value: timeline } : null,
  ].filter((x): x is { label: string; value: string } => x !== null)

  return (
    <header className="cs2-header">
      <div className="cs2-header__inner">
        {/* Eyebrow */}
        <p className="cs2-header__eyebrow">{caseStudy.projectType}</p>

        {/* Title */}
        <h1 className="cs2-header__title">{caseStudy.title}</h1>

        {/* Status badge */}
        {status && (
          <span className="cs2-header__status">{status}</span>
        )}

        {/* Intro paragraph — subtitle preferred, fall back to description */}
        {(caseStudy.subtitle || caseStudy.description) && (
          <p className="cs2-header__intro">
            {caseStudy.subtitle || caseStudy.description}
          </p>
        )}

        {/* Metadata grid */}
        {meta.length > 0 && (
          <dl className="cs2-header__meta">
            {meta.map((item) => (
              <div key={item.label} className="cs2-header__meta-item">
                <dt className="cs2-header__meta-label">{item.label}</dt>
                <dd className="cs2-header__meta-value">{item.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      {/* Hero image — tight below header */}
      <div className="cs2-header__image-wrap">
        <img
          src={caseStudy.heroImage}
          alt={`${caseStudy.title} — hero`}
          className="cs2-header__image"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </div>
    </header>
  )
}
