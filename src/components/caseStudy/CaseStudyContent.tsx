import { useCallback, useEffect, useId, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import type { CaseStudy } from '../../data/caseStudies'
import {
  buildCaseStudyBlocks,
  spacerHeight,
  type CaseStudyBlock,
  type CalloutBlock,
  type CtaPairBlock,
  type DecisionBlock,
  type ImageBlock,
  type ImageGridBlock,
  type PipelineBlock,
  type CodeBlock,
  type StepsBlock,
} from '../../data/caseStudyBlocks'

interface CaseStudyContentProps {
  caseStudy: CaseStudy
}

function spacingStyle(block: CaseStudyBlock): CSSProperties {
  if (block.type === 'spacer') return {}
  const style: CSSProperties = {}
  if (block.paddingTop != null) style.paddingTop = block.paddingTop
  if (block.paddingBottom != null) style.paddingBottom = block.paddingBottom
  if ('gap' in block && block.gap != null) style.gap = block.gap
  return style
}

function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string
  alt: string
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <div
      className="cs-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
    >
      <button type="button" className="cs-lightbox__close" onClick={onClose} aria-label="Close image">
        ×
      </button>
      <img
        src={src}
        alt={alt}
        className="cs-lightbox__img"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}

function BlockImage({ block }: { block: ImageBlock }) {
  const [zoomSrc, setZoomSrc] = useState<string | null>(null)
  const measure =
    block.width === 'full'
      ? 'cs-measure-showcase'
      : block.width === 'contained'
        ? 'cs-measure-evidence'
        : block.width === 'inset'
          ? 'cs-measure-phone cs-measure-phone--inset'
          : 'cs-measure-phone'
  const alt = block.alt ?? block.caption ?? 'Case study image'
  const canZoom = block.zoom !== false

  return (
    <>
      <figure
        className={`cs-block-image ${measure}`}
        style={spacingStyle(block)}
      >
        <button
          type="button"
          className="cs-block-image__btn"
          onClick={() => canZoom && setZoomSrc(block.src)}
          disabled={!canZoom}
          aria-label={canZoom ? `View larger: ${alt}` : alt}
        >
          <img src={block.src} alt={alt} loading="lazy" decoding="async" />
        </button>
        {block.caption && <figcaption className="cs-caption">{block.caption}</figcaption>}
      </figure>
      {zoomSrc && (
        <Lightbox src={zoomSrc} alt={alt} onClose={() => setZoomSrc(null)} />
      )}
    </>
  )
}

function BlockImageGrid({ block }: { block: ImageGridBlock }) {
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null)
  const cols = block.columns ?? 2

  return (
    <>
      <div
        className="cs-block-image-grid cs-measure-evidence"
        style={{
          ...spacingStyle(block),
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
      >
        {block.images.map((img, i) => {
          const alt = img.alt ?? img.caption ?? `Gallery image ${i + 1}`
          return (
            <figure key={`${img.src}-${i}`} className="cs-block-image-grid__item">
              <button
                type="button"
                className="cs-block-image__btn"
                onClick={() => setZoom({ src: img.src, alt })}
                aria-label={`View larger: ${alt}`}
              >
                <img src={img.src} alt={alt} loading="lazy" decoding="async" />
              </button>
              {img.caption && <figcaption className="cs-caption">{img.caption}</figcaption>}
            </figure>
          )
        })}
      </div>
      {zoom && (
        <Lightbox src={zoom.src} alt={zoom.alt} onClose={() => setZoom(null)} />
      )}
    </>
  )
}

function BlockDecision({ block }: { block: DecisionBlock }) {
  const options = block.options?.filter(Boolean) ?? []
  return (
    <article
      className="cs-block-decision cs-measure-narrative"
      style={spacingStyle(block)}
      aria-labelledby={`${block.id}-title`}
    >
      <h3 id={`${block.id}-title`} className="cs-block-decision__title">
        {block.title}
      </h3>
      <dl className="cs-block-decision__grid">
        <div>
          <dt>Evidence</dt>
          <dd>{block.evidence}</dd>
        </div>
        {options.length > 0 ? (
          <div>
            <dt>Options considered</dt>
            <dd>
              <ul>
                {options.map((opt) => (
                  <li key={opt}>{opt}</li>
                ))}
              </ul>
            </dd>
          </div>
        ) : null}
        <div>
          <dt>{options.length > 0 ? 'Decision' : 'Design requirement'}</dt>
          <dd>{block.decision}</dd>
        </div>
        <div>
          <dt>Trade-off</dt>
          <dd>{block.tradeoff}</dd>
        </div>
        <div>
          <dt>Resulting pattern</dt>
          <dd>{block.result}</dd>
        </div>
      </dl>
    </article>
  )
}

function BlockCallout({ block }: { block: CalloutBlock }) {
  return (
    <aside
      className={`cs-block-callout cs-block-callout--${block.tone ?? 'neutral'} cs-measure-narrative`}
      style={spacingStyle(block)}
    >
      {block.title && <p className="cs-block-callout__title">{block.title}</p>}
      <p className="cs-block-callout__body">{block.content}</p>
    </aside>
  )
}

function BlockSteps({ block }: { block: StepsBlock }) {
  return (
    <ol className="cs-block-steps cs-measure-narrative" style={spacingStyle(block)}>
      {block.items.map((item) => (
        <li key={item.label} className="cs-block-steps__item">
          <div className="cs-block-steps__head">
            <span className="cs-block-steps__label">{item.label}</span>
            {item.status && <span className="cs-block-steps__status">{item.status}</span>}
          </div>
          {item.detail && <p className="cs-block-steps__detail">{item.detail}</p>}
        </li>
      ))}
    </ol>
  )
}

function BlockPipeline({ block }: { block: PipelineBlock }) {
  return (
    <figure className="cs-block-pipeline cs-measure-evidence" style={spacingStyle(block)}>
      <ol className="cs-block-pipeline__track">
        {block.items.map((item, index) => (
          <li key={item.label} className="cs-block-pipeline__node">
            <div className="cs-block-pipeline__card">
              <span className="cs-block-pipeline__index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="cs-block-pipeline__label">{item.label}</span>
              {item.detail ? (
                <span className="cs-block-pipeline__detail">{item.detail}</span>
              ) : null}
            </div>
            {index < block.items.length - 1 ? (
              <span className="cs-block-pipeline__connector" aria-hidden="true" />
            ) : null}
          </li>
        ))}
      </ol>
      {block.caption ? <figcaption className="cs-caption">{block.caption}</figcaption> : null}
    </figure>
  )
}

function BlockCode({ block }: { block: CodeBlock }) {
  const tone = block.tone ?? 'code'
  return (
    <figure
      className={`cs-block-code cs-block-code--${tone} cs-measure-evidence`}
      style={spacingStyle(block)}
    >
      {block.title ? <figcaption className="cs-block-code__title">{block.title}</figcaption> : null}
      <pre className="cs-block-code__pre">
        <code className={block.language ? `language-${block.language}` : undefined}>
          {block.content}
        </code>
      </pre>
      {block.caption ? <p className="cs-caption">{block.caption}</p> : null}
    </figure>
  )
}

function BlockCtaPair({ block }: { block: CtaPairBlock }) {
  const primary = block.primary.external ? (
    <a
      href={block.primary.href}
      target="_blank"
      rel="noopener noreferrer"
      className="cs-block-cta cs-block-cta--primary"
    >
      {block.primary.label}
    </a>
  ) : (
    <Link to={block.primary.href} className="cs-block-cta cs-block-cta--primary">
      {block.primary.label}
    </Link>
  )

  const secondary = block.secondary.external ? (
    <a
      href={block.secondary.href}
      target="_blank"
      rel="noopener noreferrer"
      className="cs-block-cta cs-block-cta--secondary"
    >
      {block.secondary.label}
    </a>
  ) : (
    <Link to={block.secondary.href} className="cs-block-cta cs-block-cta--secondary">
      {block.secondary.label}
    </Link>
  )

  return (
    <div className="cs-block-cta-pair cs-measure-narrative" style={spacingStyle(block)}>
      {primary}
      {secondary}
    </div>
  )
}

function renderBlock(block: CaseStudyBlock) {
  switch (block.type) {
    case 'heading': {
      const Tag = block.level === 3 ? 'h3' : 'h2'
      return (
        <header className="cs-block-heading cs-measure-narrative" style={spacingStyle(block)} key={block.id}>
          {block.label && <p className="case-study-section__label">{block.label}</p>}
          <Tag
            id={block.id}
            tabIndex={-1}
            className={
              block.level === 3
                ? 'cs-block-heading__h3'
                : 'case-study-section__title font-display'
            }
          >
            {block.content}
          </Tag>
        </header>
      )
    }
    case 'text': {
      const sizeClass =
        block.size === 'sm'
          ? 'cs-block-text--sm'
          : block.size === 'lg'
            ? 'cs-block-text--lg'
            : 'cs-block-text--md'
      return (
        <p
          key={block.id}
          className={`cs-block-text cs-measure-narrative ${sizeClass}`}
          style={spacingStyle(block)}
        >
          {block.content}
        </p>
      )
    }
    case 'list':
      return (
        <ul
          key={block.id}
          className="case-study-list cs-measure-narrative"
          aria-label={block.label}
          style={spacingStyle(block)}
        >
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )
    case 'features':
      return (
        <div
          key={block.id}
          className="cs-block-features cs-measure-narrative"
          style={spacingStyle(block)}
        >
          {block.items.map((feature) => (
            <div key={feature.name} className="case-study-feature">
              <h3>{feature.name}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      )
    case 'metrics':
      return (
        <div key={block.id} className="cs-block-metrics cs-measure-narrative" style={spacingStyle(block)}>
          {block.description && (
            <p className="case-study-section__text">{block.description}</p>
          )}
          {block.items.length > 0 && (
            <dl className="case-study-metrics">
              {block.items.map((m) => (
                <div key={m.metric} className="case-study-metric">
                  <dt className="case-study-metric__label">{m.metric}</dt>
                  <dd className="case-study-metric__value">{m.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      )
    case 'decision':
      return <BlockDecision key={block.id} block={block} />
    case 'callout':
      return <BlockCallout key={block.id} block={block} />
    case 'steps':
      return <BlockSteps key={block.id} block={block} />
    case 'pipeline':
      return <BlockPipeline key={block.id} block={block} />
    case 'code':
      return <BlockCode key={block.id} block={block} />
    case 'cta-pair':
      return <BlockCtaPair key={block.id} block={block} />
    case 'image':
      return <BlockImage key={block.id} block={block} />
    case 'image-grid':
      return <BlockImageGrid key={block.id} block={block} />
    case 'video':
      return (
        <figure key={block.id} className="cs-block-video cs-measure-evidence" style={spacingStyle(block)}>
          <video
            src={block.src}
            poster={block.poster}
            autoPlay={block.autoPlay !== false}
            loop={block.loop !== false}
            muted={block.muted !== false}
            playsInline
            controls={false}
            aria-label={block.caption ?? 'Case study video'}
          />
          {block.caption && <figcaption className="cs-caption">{block.caption}</figcaption>}
        </figure>
      )
    case 'embed':
      return (
        <div
          key={block.id}
          className="cs-block-embed cs-measure-evidence"
          style={{
            ...spacingStyle(block),
            ['--cs-embed-ratio' as string]: block.aspectRatio ?? '16 / 9',
          }}
        >
          <iframe
            src={block.src}
            title={block.title ?? 'Embedded media'}
            loading="lazy"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      )
    case 'spacer':
      return (
        <div
          key={block.id}
          className="cs-block-spacer"
          style={{ height: spacerHeight(block.size) }}
          aria-hidden="true"
        />
      )
    default:
      return null
  }
}

export function CaseStudyContent({ caseStudy }: CaseStudyContentProps) {
  const blocks = buildCaseStudyBlocks(caseStudy)
  const headingId = useId()

  const onKeyNav = useCallback((e: KeyboardEvent<HTMLElement>) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
    const headings = [
      ...e.currentTarget.querySelectorAll<HTMLElement>('h2[id], h3[id]'),
    ]
    if (!headings.length) return
    const active = document.activeElement
    const idx = headings.findIndex((h) => h === active)
    if (e.key === 'ArrowDown') {
      const next = headings[idx + 1] ?? headings[0]
      next.focus()
      e.preventDefault()
    } else {
      const prev = headings[idx - 1] ?? headings[headings.length - 1]
      prev.focus()
      e.preventDefault()
    }
  }, [])

  return (
    <article
      className="case-study-main"
      aria-labelledby={headingId}
      onKeyDown={onKeyNav}
    >
      <h2 id={headingId} className="sr-only">
        {caseStudy.title} case study
      </h2>
      {blocks.map((block) => renderBlock(block))}
    </article>
  )
}
