import { Link } from 'react-router-dom'
import { caseStudies, type CaseStudy } from '../../data/caseStudies'

interface RelatedProjectsProps {
  currentId: string
}

function caseStudyPath(cs: CaseStudy): string {
  return cs.slug === 'wanderly-ai-travel-planner'
    ? '/work/wanderly'
    : `/case-studies/${cs.slug}`
}

/** Complementary hiring-signal preferences per case (first match wins). */
const RELATED_PREFERENCE: Record<string, string[]> = {
  wanderly: ['skrewww', 'danat-behavior', 'heard-app'],
  skrewww: ['heard-app', 'wanderly', 'danat-behavior'],
}

export function RelatedProjects({ currentId }: RelatedProjectsProps) {
  const preferred = RELATED_PREFERENCE[currentId]
  const related = preferred
    ? preferred
        .map((id) => caseStudies.find((cs) => cs.id === id))
        .filter((cs): cs is CaseStudy => Boolean(cs))
        .slice(0, 3)
    : caseStudies
        .filter((cs) => cs.id !== currentId)
        .sort((a, b) => {
          // Prefer product case studies after a design-system case
          const rank = (id: string) => (id === 'heard-app' ? 0 : id === 'wanderly' ? 1 : 2)
          return rank(a.id) - rank(b.id)
        })
        .slice(0, 3)

  if (related.length === 0) return null

  return (
    <section className="case-study-related" aria-labelledby="related-heading">
      <div className="case-study-related__inner">
        <p className="case-study-related__label">More Work</p>
        <h2 id="related-heading">
          More Case Studies
        </h2>
        <div className="case-study-related__grid">
          {related.map((cs) => (
            <Link
              key={cs.id}
              to={caseStudyPath(cs)}
              className="case-study-related__card"
              aria-label={`${cs.title} — ${cs.subtitle}`}
            >
              <img
                src={cs.thumbnail}
                alt=""
                role="presentation"
                loading="lazy"
                decoding="async"
              />
              <div className="case-study-related__card-info">
                <h3>{cs.title}</h3>
                <p>{cs.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
