import { ArrowUpRight, ExternalLink, Layers } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Project } from '../../data/projects'
import { getProjectCtaLabel, getProjectLinkType } from '../../data/projects'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useProjectThumbnail } from '../../hooks/useProjectThumbnail'
import '../../styles/ProjectCard.css'

interface ProjectCardProps {
  project: Project
  onOpenPrototype?: (project: Project) => void
  /** @deprecated use variant="evidence" | "compact" */
  bento?: boolean
  variant?: 'evidence' | 'compact' | 'bento' | 'default'
}

function ProjectCardThumbnail({
  project,
  thumbnailSrc,
  loading,
  eager = false,
}: {
  project: Project
  thumbnailSrc: string
  loading: boolean
  eager?: boolean
}) {
  const [useFallback, setUseFallback] = useState(false)
  const [imgError, setImgError] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  const posterSrc = useFallback ? project.image : thumbnailSrc
  const videoSrc =
    project.video && !videoFailed && !prefersReducedMotion ? project.video : null

  useEffect(() => {
    setVideoFailed(false)
    setVideoReady(false)
  }, [project.video])

  useEffect(() => {
    const el = videoRef.current
    if (!el || !videoSrc) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void el.play().catch(() => {
            /* Autoplay blocked — poster remains visible */
          })
        } else {
          el.pause()
        }
      },
      { rootMargin: '80px', threshold: 0.15 },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [videoSrc])

  const handleImageError = () => {
    if (!useFallback) {
      setUseFallback(true)
      return
    }
    setImgError(true)
  }

  if (imgError && !videoSrc) {
    return (
      <div className="flex h-full min-h-[140px] items-center justify-center bg-[var(--soft-border)]/40 p-6">
        <span className="text-center text-base font-bold text-primary-orange/70">
          {project.displayTitle ?? project.title}
        </span>
      </div>
    )
  }

  return (
    <>
      {loading && <div className="project-thumbnail-skeleton absolute inset-0 z-[1]" aria-hidden />}
      {/* Poster / static fallback — always present so there is no black flash */}
      <img
        src={posterSrc}
        alt=""
        role="presentation"
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={`project-image ${loading ? 'opacity-0' : 'opacity-100'} ${videoSrc && videoReady ? 'project-image--under-video' : ''}`}
        onError={handleImageError}
      />
      {videoSrc && (
        <video
          ref={videoRef}
          className={`project-image project-image--video ${loading || !videoReady ? 'opacity-0' : 'opacity-100'}`}
          src={videoSrc}
          poster={project.image}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          aria-hidden
          tabIndex={-1}
          onLoadedData={() => setVideoReady(true)}
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoFailed(true)}
        />
      )}
    </>
  )
}

function useCardActions(project: Project, onOpenPrototype?: (project: Project) => void) {
  const linkType = getProjectLinkType(project)
  const caseStudyHref =
    project.caseStudyHref ??
    (project.caseStudySlug ? `/case-studies/${project.caseStudySlug}` : null)

  const handlePrototypeClick = () => {
    onOpenPrototype?.(project)
  }

  const ctaLabel = getProjectCtaLabel(project)

  const CtaIcon =
    linkType === 'figma'
      ? Layers
      : linkType === 'external'
        ? ExternalLink
        : ArrowUpRight

  return { linkType, caseStudyHref, handlePrototypeClick, ctaLabel, CtaIcon }
}

function CardCta({
  project,
  className = '',
  onOpenPrototype,
}: {
  project: Project
  className?: string
  onOpenPrototype?: (project: Project) => void
}) {
  const { linkType, caseStudyHref, handlePrototypeClick, ctaLabel } = useCardActions(
    project,
    onOpenPrototype,
  )
  const base = `project-card-cta cta-arrow project-card-cta--${linkType === 'none' ? 'disabled' : linkType} ${className}`

  if (caseStudyHref) {
    return (
      <Link to={caseStudyHref} className={`${base} project-card-cta--case-study`}>
        {ctaLabel}
      </Link>
    )
  }

  if (linkType === 'external' && project.externalUrl) {
    return (
      <a
        href={project.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={base}
      >
        {ctaLabel}
        <ExternalLink className="project-card-cta-icon" aria-hidden />
      </a>
    )
  }

  if (linkType === 'figma') {
    return (
      <button type="button" className={base} onClick={handlePrototypeClick}>
        {ctaLabel}
        <Layers className="project-card-cta-icon" aria-hidden />
      </button>
    )
  }

  return (
    <span className={base} aria-disabled="true">
      {ctaLabel}
    </span>
  )
}

function MetaRow({ project }: { project: Project }) {
  const parts = [project.role, project.year, project.context].filter(Boolean)
  if (parts.length === 0) return null
  return (
    <p className="mt-2 text-[12px] font-[400] leading-snug text-[var(--muted-text)]">
      {parts.join(' · ')}
    </p>
  )
}

export function ProjectCard({
  project,
  onOpenPrototype,
  bento = false,
  variant,
}: ProjectCardProps) {
  const mode = variant ?? (bento ? 'bento' : 'default')
  const { src: thumbnailSrc, loading: thumbnailLoading } = useProjectThumbnail(project)
  const { linkType, caseStudyHref, handlePrototypeClick, ctaLabel } = useCardActions(
    project,
    onOpenPrototype,
  )
  const title = project.displayTitle ?? project.title

  if (mode === 'evidence') {
    const meta = [project.category, project.status].filter(Boolean).join(' · ')

    return (
      <article className="evidence-card group flex h-full flex-col overflow-hidden rounded-[16px] border border-[var(--soft-border)] bg-[var(--pure-white)] transition-[border-color,box-shadow] duration-200 hover:border-[rgba(250,108,11,0.28)]">
        <div className="flex flex-1 flex-col p-5 md:p-6">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <p className="text-[10px] font-[400] uppercase tracking-[0.12em] text-primary-orange">
              {meta}
            </p>
            {project.ecosystemLabel && (
              <span className="rounded-full border border-[var(--soft-border)] px-2 py-0.5 text-[10px] font-[400] text-[var(--muted-text)]">
                {project.ecosystemLabel}
              </span>
            )}
          </div>

          <h3 className="mt-2 text-[1.125rem] font-bold leading-snug tracking-[-0.01em] text-[var(--dark-navy)] md:text-[1.25rem]">
            {title}
          </h3>

          {project.productStatement && (
            <p className="mt-2 text-[14px] leading-relaxed text-[var(--muted-text)] line-clamp-2">
              {project.productStatement}
            </p>
          )}

          <MetaRow project={project} />

          {project.proofPoint && (
            <p className="mt-3 border-l-2 border-primary-orange/40 pl-3 text-[12px] font-[400] leading-snug text-[var(--dark-navy)]">
              {project.proofPoint}
            </p>
          )}
        </div>

        <div
          className="relative mx-5 mb-2 overflow-hidden rounded-[12px] bg-[var(--soft-border)]/30 md:mx-6"
          style={{ aspectRatio: '808 / 632' }}
        >
          <ProjectCardThumbnail
            key={thumbnailSrc}
            project={project}
            thumbnailSrc={thumbnailSrc}
            loading={thumbnailLoading}
            eager
          />
        </div>

        <div className="px-5 pb-5 md:px-6 md:pb-6">
          <CardCta project={project} onOpenPrototype={onOpenPrototype} className="mt-1 min-h-[44px]" />
        </div>
      </article>
    )
  }

  if (mode === 'compact') {
    const mediaAction =
      caseStudyHref ? (
        <Link to={caseStudyHref} className="absolute inset-0 block" aria-label={title}>
          <ProjectCardThumbnail
            project={project}
            thumbnailSrc={thumbnailSrc}
            loading={thumbnailLoading}
          />
        </Link>
      ) : linkType === 'external' && project.externalUrl ? (
        <a
          href={project.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 block"
          aria-label={`${ctaLabel} — ${title}`}
        >
          <ProjectCardThumbnail
            project={project}
            thumbnailSrc={thumbnailSrc}
            loading={thumbnailLoading}
          />
        </a>
      ) : (
        <button
          type="button"
          className="absolute inset-0 block w-full min-h-[44px]"
          onClick={linkType === 'figma' ? handlePrototypeClick : undefined}
          disabled={linkType === 'none'}
          aria-label={title}
        >
          <ProjectCardThumbnail
            project={project}
            thumbnailSrc={thumbnailSrc}
            loading={thumbnailLoading}
          />
        </button>
      )

    return (
      <article className="editorial-card group flex h-full flex-col overflow-hidden rounded-[12px] border border-[var(--soft-border)]/70 bg-[var(--pure-white)]">
        <div
          className="relative overflow-hidden bg-[var(--soft-border)]/25"
          style={{ aspectRatio: '808 / 632' }}
        >
          {mediaAction}
        </div>
        <div className="flex flex-1 flex-col px-3.5 py-3">
          <p className="text-[10px] font-[400] uppercase tracking-[0.1em] text-[var(--muted-text)]">
            {project.category}
          </p>
          <h3 className="mt-1 text-[13px] font-bold leading-snug text-[var(--dark-navy)]">{title}</h3>
          <CardCta
            project={project}
            onOpenPrototype={onOpenPrototype}
            className="mt-2 min-h-[44px] text-[11px]"
          />
        </div>
      </article>
    )
  }

  if (mode === 'bento') {
    const BentoWrapper = caseStudyHref ? Link : 'button'
    const bentoProps = caseStudyHref
      ? { to: caseStudyHref, className: 'block w-full h-full' }
      : {
          type: 'button' as const,
          className: 'block w-full h-full text-left',
          onClick: linkType === 'figma' ? handlePrototypeClick : undefined,
          disabled: linkType === 'none',
        }

    return (
      <article className="bento-card relative h-full w-full overflow-hidden rounded-[16px] bg-white group">
        {/* @ts-expect-error polymorphic */}
        <BentoWrapper {...bentoProps}>
          <div className="absolute inset-0">
            <ProjectCardThumbnail
              key={thumbnailSrc}
              project={project}
              thumbnailSrc={thumbnailSrc}
              loading={thumbnailLoading}
              eager
            />
          </div>
          <div
            className="absolute inset-x-0 bottom-0 flex translate-y-full flex-col justify-end p-4 transition-transform duration-500 ease-out group-hover:translate-y-0"
            style={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
              top: '30%',
            }}
          >
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">
              {project.category}
            </p>
            <h3 className="mt-1 text-[13px] font-bold leading-tight text-white">{title}</h3>
            <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-[#fa6c0b]">
              {ctaLabel} <ArrowUpRight size={11} />
            </span>
          </div>
        </BentoWrapper>
      </article>
    )
  }

  const thumbnail = (
    <div
      className="project-card-media relative overflow-hidden bg-gradient-to-br from-soft-orange-tint/80 to-primary-orange/10"
      style={{ aspectRatio: '808 / 632' }}
    >
      <ProjectCardThumbnail
        key={thumbnailSrc}
        project={project}
        thumbnailSrc={thumbnailSrc}
        loading={thumbnailLoading}
      />
    </div>
  )

  return (
    <article className="glass-project-card group flex h-full flex-col">
      {caseStudyHref ? (
        <Link
          to={caseStudyHref}
          className="project-card-media-btn block"
          aria-label={`View case study — ${title}`}
        >
          {thumbnail}
        </Link>
      ) : linkType === 'external' && project.externalUrl ? (
        <a
          href={project.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-card-media-btn block"
          aria-label={`${ctaLabel} — ${title}`}
        >
          {thumbnail}
        </a>
      ) : (
        <button
          type="button"
          className="project-card-media-btn"
          onClick={linkType === 'figma' ? handlePrototypeClick : undefined}
          disabled={linkType === 'none'}
          aria-label={linkType !== 'none' ? `${ctaLabel} — ${title}` : title}
        >
          {thumbnail}
        </button>
      )}

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-[400] uppercase tracking-wider text-primary-orange">
          {project.category}
        </p>
        <h3 className="project-title mt-2 text-xl font-bold text-dark-navy transition-colors">
          {title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-text">{project.description}</p>
        <CardCta project={project} onOpenPrototype={onOpenPrototype} className="min-h-[44px]" />
      </div>
    </article>
  )
}
