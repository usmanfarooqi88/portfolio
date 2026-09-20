import type { CaseStudy } from './caseStudies'

export type BlockSpacing = {
  paddingTop?: number | string
  paddingBottom?: number | string
  gap?: number | string
}

export type TextBlock = BlockSpacing & {
  type: 'text'
  id: string
  content: string
  size?: 'sm' | 'md' | 'lg'
}

export type HeadingBlock = BlockSpacing & {
  type: 'heading'
  id: string
  content: string
  level?: 2 | 3
  label?: string
}

export type ImageBlock = BlockSpacing & {
  type: 'image'
  id: string
  src: string
  alt?: string
  caption?: string
  /**
   * Visual measure for shared case-study layout:
   * - full → wide/showcase evidence
   * - contained → product/UI evidence (phone-friendly max)
   * - inset → narrower phone/UI evidence
   */
  width?: 'full' | 'contained' | 'inset'
  zoom?: boolean
}

export type ImageGridBlock = BlockSpacing & {
  type: 'image-grid'
  id: string
  columns?: 2 | 3
  images: Array<{ src: string; alt?: string; caption?: string }>
}

export type VideoBlock = BlockSpacing & {
  type: 'video'
  id: string
  src: string
  poster?: string
  caption?: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
}

export type SpacerBlock = {
  type: 'spacer'
  id: string
  size: 'sm' | 'md' | 'lg' | 'xl'
}

export type EmbedBlock = BlockSpacing & {
  type: 'embed'
  id: string
  src: string
  title?: string
  aspectRatio?: string
}

export type ListBlock = BlockSpacing & {
  type: 'list'
  id: string
  items: string[]
  label?: string
}

export type MetricsBlock = BlockSpacing & {
  type: 'metrics'
  id: string
  description?: string
  items: Array<{ metric: string; value: string }>
}

export type FeaturesBlock = BlockSpacing & {
  type: 'features'
  id: string
  items: Array<{ name: string; description: string }>
}

export type DecisionBlock = BlockSpacing & {
  type: 'decision'
  id: string
  title: string
  evidence: string
  /** Omit when historic alternatives are not available — do not invent options. */
  options?: string[]
  decision: string
  tradeoff: string
  result: string
}

export type CalloutBlock = BlockSpacing & {
  type: 'callout'
  id: string
  title?: string
  content: string
  tone?: 'neutral' | 'note'
}

export type StepsBlock = BlockSpacing & {
  type: 'steps'
  id: string
  items: Array<{ label: string; detail?: string; status?: string }>
}

/** Editorial flow diagram — Figma → tokens → code, etc. HTML/CSS only. */
export type PipelineBlock = BlockSpacing & {
  type: 'pipeline'
  id: string
  caption?: string
  items: Array<{ label: string; detail?: string }>
}

export type CtaPairBlock = BlockSpacing & {
  type: 'cta-pair'
  id: string
  primary: { label: string; href: string; external?: boolean }
  secondary: { label: string; href: string; external?: boolean }
}

/** Real code / CLI excerpts — never invented terminal output. */
export type CodeBlock = BlockSpacing & {
  type: 'code'
  id: string
  title?: string
  language?: string
  content: string
  caption?: string
  /** terminal = dark CLI treatment; code = light source excerpt */
  tone?: 'code' | 'terminal'
}

export type CaseStudyBlock =
  | TextBlock
  | HeadingBlock
  | ImageBlock
  | ImageGridBlock
  | VideoBlock
  | SpacerBlock
  | EmbedBlock
  | ListBlock
  | MetricsBlock
  | FeaturesBlock
  | DecisionBlock
  | CalloutBlock
  | StepsBlock
  | PipelineBlock
  | CtaPairBlock
  | CodeBlock

const SPACER: Record<SpacerBlock['size'], string> = {
  sm: '1.25rem',
  md: '2.5rem',
  lg: '4rem',
  xl: '5.5rem',
}

export function spacerHeight(size: SpacerBlock['size']): string {
  return SPACER[size]
}

/** Convert legacy structured sections into a Behance-style block stream. */
export function buildCaseStudyBlocks(caseStudy: CaseStudy): CaseStudyBlock[] {
  if (caseStudy.blocks?.length) return caseStudy.blocks

  const blocks: CaseStudyBlock[] = []
  let n = 0
  const id = (prefix: string) => `${caseStudy.id}-${prefix}-${++n}`

  blocks.push({
    type: 'heading',
    id: id('h'),
    label: 'Overview',
    content: 'The Project',
    level: 2,
  })
  blocks.push({
    type: 'text',
    id: id('t'),
    content: caseStudy.overview.description,
    size: 'md',
  })
  if (caseStudy.overview.keyPoints.length) {
    blocks.push({
      type: 'list',
      id: id('l'),
      items: caseStudy.overview.keyPoints,
      label: 'Key points',
    })
  }

  blocks.push({ type: 'spacer', id: id('s'), size: 'md' })
  blocks.push({
    type: 'heading',
    id: id('h'),
    label: 'Challenge',
    content: 'The Problem',
    level: 2,
  })
  blocks.push({
    type: 'text',
    id: id('t'),
    content: caseStudy.challenge.description,
    size: 'md',
  })
  if (caseStudy.challenge.painPoints.length) {
    blocks.push({
      type: 'list',
      id: id('l'),
      items: caseStudy.challenge.painPoints,
      label: 'Pain points',
    })
  }

  blocks.push({ type: 'spacer', id: id('s'), size: 'md' })
  blocks.push({
    type: 'heading',
    id: id('h'),
    label: 'Solution',
    content: 'Our Approach',
    level: 2,
  })
  blocks.push({
    type: 'text',
    id: id('t'),
    content: caseStudy.solution.description,
    size: 'md',
  })
  if (caseStudy.solution.approach.length) {
    blocks.push({
      type: 'list',
      id: id('l'),
      items: caseStudy.solution.approach,
      label: 'Approach steps',
    })
  }

  blocks.push({ type: 'spacer', id: id('s'), size: 'md' })
  blocks.push({
    type: 'heading',
    id: id('h'),
    label: 'Highlights',
    content: 'Key Features',
    level: 2,
  })
  blocks.push({
    type: 'features',
    id: id('f'),
    items: caseStudy.highlights.features,
  })

  if (caseStudy.results) {
    blocks.push({ type: 'spacer', id: id('s'), size: 'md' })
    blocks.push({
      type: 'heading',
      id: id('h'),
      label: 'Results',
      content: 'Impact',
      level: 2,
    })
    blocks.push({
      type: 'metrics',
      id: id('m'),
      description: caseStudy.results.description,
      items: caseStudy.results.metrics ?? [],
    })
  }

  const galleryImages = caseStudy.media.gallery.filter((g) => g.type === 'image')
  const galleryVideos = caseStudy.media.gallery.filter((g) => g.type === 'video')

  if (galleryImages.length) {
    blocks.push({ type: 'spacer', id: id('s'), size: 'lg' })
    blocks.push({
      type: 'heading',
      id: id('h'),
      label: 'Gallery',
      content: 'Selected Work',
      level: 2,
    })
    blocks.push({
      type: 'image-grid',
      id: id('g'),
      columns: galleryImages.length >= 3 ? 3 : 2,
      images: galleryImages.map((img) => ({
        src: img.src,
        caption: img.caption,
        alt: img.caption ?? `${caseStudy.title} gallery image`,
      })),
      gap: '1rem',
    })
  }

  for (const video of galleryVideos) {
    blocks.push({
      type: 'video',
      id: id('v'),
      src: video.src,
      caption: video.caption,
      autoPlay: true,
      loop: true,
      muted: true,
    })
  }

  return blocks
}
