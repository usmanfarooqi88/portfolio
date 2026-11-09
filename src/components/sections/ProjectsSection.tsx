import { ArrowUpRight } from 'lucide-react'
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
      {/* Section header : label + divider, full grid width */}
      <div className="v2-work-header">
        <h2 id="featured-work-heading">Selected Work</h2>
      </div>

      {/* Card grid : 8 project cards + "View all work" fill tile */}
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

          {/* 9th cell: "View all work →" fill tile */}
          <Link
            to="/work"
            className="view-all-tile group flex flex-col items-center justify-center rounded-[20px] border border-[var(--soft-border)] bg-[var(--pure-white)] min-h-[200px] transition-colors hover:border-[color-mix(in_srgb,var(--primary-orange)_35%,transparent)] hover:bg-[var(--warm-background)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-orange)]"
            aria-label="View all work"
          >
            <span className="text-[1.0625rem] font-semibold text-[var(--dark-navy)] group-hover:text-[var(--accent-text)] transition-colors">
              View all work
            </span>
            <ArrowUpRight
              size={20}
              className="mt-2 text-[var(--muted-text)] group-hover:text-[var(--accent-text)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
              aria-hidden
            />
          </Link>
        </div>
      </div>

      {editorial.length > 0 && (
        <div className="v2-work-grid-wrap">
          <div
            className="editorial-archive mt-10 border-t border-[var(--soft-border)]/80 pt-8"
            id="editorial-work"
          >
            <header className="mb-5 max-w-[32rem]">
              <p className="mb-1.5 text-[12px] font-[400] uppercase tracking-[0.1em] text-[var(--muted-text)]">
                Craft background
              </p>
              <h2 className="text-[clamp(0.9375rem,1.4vw,1.0625rem)] font-semibold leading-[1.3] text-[var(--muted-text)]">
                Earlier Visual &amp; Editorial Work
              </h2>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--muted-text)]">
                Annual reports and visual systems for GCC clients.
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
