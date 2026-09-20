import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'
import { getRouteMeta } from '../data/routeMeta'
import {
  countWorkByFilter,
  getWorkIndexItems,
  WORK_FILTERS,
  type WorkFilterId,
} from '../data/workIndex'
import { applyPageMeta, resetPageMeta } from '../utils/seo'
import { FigmaPrototypeModal } from '../components/FigmaPrototypeModal'
import { ProjectCard } from '../components/ui/ProjectCard'

export function WorkPage() {
  const [filter, setFilter] = useState<WorkFilterId>('all')
  const [modalProject, setModalProject] = useState<Project | null>(null)
  const counts = useMemo(() => countWorkByFilter(), [])
  const items = useMemo(() => getWorkIndexItems(filter), [filter])

  const primary = items.filter((i) => !i.compact)
  const editorial = items.filter((i) => i.compact)

  useEffect(() => {
    const meta = getRouteMeta('/work')
    if (meta) applyPageMeta(meta)
    return () => {
      resetPageMeta()
    }
  }, [])

  return (
    <main className="mx-auto max-w-[1280px] px-6 pb-20 md:px-12 lg:px-20 lg:pb-28">
      <header className="pt-14 pb-8 lg:pt-16 lg:pb-10 max-w-[40rem]">
        <p className="mb-2 text-[11px] font-[400] uppercase tracking-[0.14em] text-primary-orange">
          Work
        </p>
        <h1
          className="font-display font-bold text-[var(--dark-navy)] leading-[1.1] tracking-[-0.02em]"
          style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
        >
          All Work
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-[var(--muted-text)] md:text-[16px]">
          The complete collection of product, system, web, and visual work — beyond the curated
          homepage shortlist.
        </p>
        <p className="mt-3 text-[13px] text-[var(--muted-text)]/90">
          <Link
            to="/#work"
            className="underline underline-offset-2 decoration-[var(--soft-border)] hover:text-primary-orange hover:decoration-primary-orange transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange rounded-sm"
          >
            ← Selected work on homepage
          </Link>
        </p>
      </header>

      <div
        className="mb-8 -mx-6 px-6 md:mx-0 md:px-0"
        role="toolbar"
        aria-label="Filter work by type"
      >
        <div
          className="flex gap-2 overflow-x-auto pb-1 snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {WORK_FILTERS.map((f) => {
            const active = filter === f.id
            const count = counts[f.id]
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.id)}
                className={`snap-start shrink-0 min-h-[44px] rounded-full border px-4 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--warm-background)] ${
                  active
                    ? 'border-primary-orange bg-primary-orange text-white'
                    : 'border-[var(--soft-border)] bg-[var(--pure-white)] text-[var(--muted-text)] hover:border-[rgba(250,108,11,0.35)] hover:text-[var(--dark-navy)]'
                }`}
              >
                {f.label}
                <span className={`ml-1.5 tabular-nums ${active ? 'text-white/80' : 'text-[var(--muted-text)]/70'}`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {items.length}{' '}
        {items.length === 1 ? 'project' : 'projects'}
        {filter === 'all' ? '' : ` in ${WORK_FILTERS.find((f) => f.id === filter)?.label}`}
      </p>

      {primary.length > 0 && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-5">
          {primary.map(({ project, typeLabel }) => (
            <WorkIndexCard
              key={project.id}
              project={project}
              typeLabel={typeLabel}
              onOpenPrototype={setModalProject}
            />
          ))}
        </div>
      )}

      {editorial.length > 0 && (
        <div
          className={`editorial-archive ${primary.length > 0 ? 'mt-12 border-t border-[var(--soft-border)]/80 pt-10' : ''}`}
        >
          {filter === 'all' && (
            <header className="mb-5 max-w-[32rem]">
              <p className="mb-1.5 text-[10px] font-[400] uppercase tracking-[0.12em] text-[var(--muted-text)]">
                Visual &amp; editorial
              </p>
              <h2 className="text-[clamp(0.9375rem,1.4vw,1.0625rem)] font-semibold leading-[1.3] text-[var(--muted-text)]">
                Annual Reports &amp; Editorial
              </h2>
            </header>
          )}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4">
            {editorial.map(({ project }) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenPrototype={setModalProject}
                variant="compact"
              />
            ))}
          </div>
        </div>
      )}

      {items.length === 0 && (
        <p className="text-[15px] text-[var(--muted-text)]">No projects in this category.</p>
      )}

      <FigmaPrototypeModal project={modalProject} onClose={() => setModalProject(null)} />
    </main>
  )
}

/** Evidence-style card with /work type label override (keeps existing ProjectCard anatomy). */
function WorkIndexCard({
  project,
  typeLabel,
  onOpenPrototype,
}: {
  project: Project
  typeLabel: string
  onOpenPrototype: (project: Project) => void
}) {
  const labeled: Project = {
    ...project,
    category: typeLabel,
  }
  return (
    <ProjectCard project={labeled} onOpenPrototype={onOpenPrototype} variant="evidence" />
  )
}
