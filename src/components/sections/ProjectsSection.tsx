import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getEditorialWork, getFeaturedProductWork } from '../../data/featuredWork'
import type { Project } from '../../data/projects'
import { FigmaPrototypeModal } from '../FigmaPrototypeModal'
import { ProjectCard } from '../ui/ProjectCard'

export function ProjectsSection() {
  const [modalProject, setModalProject] = useState<Project | null>(null)
  const featured = getFeaturedProductWork()
  const editorial = getEditorialWork()

  return (
    <section id="work" className="v2-work-section" aria-labelledby="featured-work-heading">
      {/* Section header — label + divider, full grid width */}
      <div className="v2-work-header">
        <h2 id="featured-work-heading">Selected Work</h2>
      </div>

      {/* Card grid */}
      <div className="v2-work-grid-wrap">
        <div className="v2-work-grid">
          {featured.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenPrototype={setModalProject}
              variant="evidence"
            />
          ))}
        </div>
      </div>

      {/* View all */}
      <div className="v2-work-view-all">
        <Link
          to="/work"
          className="inline-flex min-h-[44px] items-center rounded-full border border-[var(--soft-border)] bg-[var(--pure-white)] px-5 text-[13px] font-medium text-[var(--dark-navy)] transition-colors hover:border-[rgba(250,108,11,0.35)] hover:text-primary-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange"
        >
          View all work →
        </Link>
      </div>

      {editorial.length > 0 && (
        <div className="v2-work-grid-wrap">
          <div
            className="editorial-archive mt-10 border-t border-[var(--soft-border)]/80 pt-8"
            id="editorial-work"
          >
            <header className="mb-5 max-w-[32rem]">
              <p className="mb-1.5 text-[10px] font-[400] uppercase tracking-[0.12em] text-[var(--muted-text)]">
                Craft background
              </p>
              <h2 className="text-[clamp(0.9375rem,1.4vw,1.0625rem)] font-semibold leading-[1.3] text-[var(--muted-text)]">
                Earlier Visual &amp; Editorial Work
              </h2>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--muted-text)]/90">
                Annual reports and visual systems — supporting craft context, not the primary hiring
                story.
              </p>
            </header>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 xl:grid-cols-4">
              {editorial.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpenPrototype={setModalProject}
                  variant="compact"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <FigmaPrototypeModal project={modalProject} onClose={() => setModalProject(null)} />
    </section>
  )
}
