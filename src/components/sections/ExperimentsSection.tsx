import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { experiments, type Experiment } from '../../data/experiments'

function ExperimentCard({ exp, index }: { exp: Experiment; index: number }) {
  const [hovered, setHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const inView = useInView(cardRef, { once: true, margin: '-5% 0px' })

  const isPortrait = exp.orientation === 'portrait'

  const handleMouseEnter = () => {
    setHovered(true)
    videoRef.current?.play().catch(() => {})
  }

  const handleMouseLeave = () => {
    setHovered(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="border-t border-[var(--soft-border)] pt-10 pb-12"
    >
      {/* Index + title row */}
      <div className="flex items-baseline gap-4 mb-8">
        <span className="text-[11px] font-bold text-[var(--muted-text)] opacity-60 tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="font-bold text-[22px] text-[var(--dark-navy)] leading-snug tracking-[-0.01em]">
          {exp.title}
        </h3>
        {exp.tags && exp.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 ml-auto">
            {exp.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-bold text-[var(--muted-text)] border border-[var(--soft-border)] rounded-full px-2.5 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Video */}
      <div
        className={`relative overflow-hidden rounded-2xl bg-[var(--light-gray)] ${isPortrait ? 'flex justify-center' : ''}`}
        style={{ border: '1px solid var(--soft-border)' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isPortrait ? (
          <div
            className="relative cursor-default"
            style={{ width: 'min(380px, 100%)', aspectRatio: '9/19.5' }}
          >
            {exp.videoSrc ? (
              <video
                ref={videoRef}
                src={exp.videoSrc}
                poster={exp.poster}
                muted
                loop
                playsInline
                preload="none"
                className="w-full h-full object-cover"
                aria-label={exp.title}
              />
            ) : exp.poster ? (
              <img src={exp.poster} alt={exp.title} className="w-full h-full object-cover" loading="lazy" />
            ) : (
              <PlaceholderInner />
            )}
            <PlayOverlay hovered={hovered} hasVideo={!!exp.videoSrc} />
          </div>
        ) : (
          <div className="relative w-full cursor-default" style={{ aspectRatio: '16/9' }}>
            {exp.videoSrc ? (
              <video
                ref={videoRef}
                src={exp.videoSrc}
                poster={exp.poster}
                muted
                loop
                playsInline
                preload="none"
                className={`w-full h-full object-cover transition-transform duration-500 ${hovered ? 'scale-[1.02]' : 'scale-100'}`}
                aria-label={exp.title}
              />
            ) : exp.poster ? (
              <img src={exp.poster} alt={exp.title} className="w-full h-full object-cover" loading="lazy" />
            ) : (
              <PlaceholderInner />
            )}
            <PlayOverlay hovered={hovered} hasVideo={!!exp.videoSrc} />
          </div>
        )}
      </div>

      {/* Description */}
      {exp.description && (
        <p className="mt-5 text-[15px] text-[var(--muted-text)] leading-[1.65] max-w-[560px]">
          {exp.description}
        </p>
      )}
    </motion.article>
  )
}

function PlayOverlay({ hovered, hasVideo }: { hovered: boolean; hasVideo: boolean }) {
  if (!hasVideo) return null
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none ${hovered ? 'opacity-0' : 'opacity-100'}`}
      aria-hidden
    >
      <div className="w-14 h-14 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center">
        <svg width="16" height="18" viewBox="0 0 14 16" fill="white">
          <path d="M1 1l12 7L1 15V1z" />
        </svg>
      </div>
    </div>
  )
}

function PlaceholderInner() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <span className="text-[var(--muted-text)] opacity-50 text-[12px] font-bold uppercase tracking-[0.12em]">Coming soon</span>
    </div>
  )
}

export function ExperimentsSection() {
  return (
    <section id="experiments" className="py-20 lg:py-28">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">

        <div className="mb-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted-text)] mb-4">
            Experiments
          </p>
          <h2
            className="font-bold text-[var(--dark-navy)] leading-tight tracking-[-0.02em] mb-3"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)' }}
          >
            Prototypes & explorations.
          </h2>
          <p className="text-[15px] text-[var(--muted-text)] max-w-[520px]">
            In my free time I explore new interactions, motion, and AI-assisted techniques —
            small experiments that feed into how I approach real product work.
          </p>
        </div>

        <div>
          {experiments.length > 0 ? (
            experiments.map((exp, i) => (
              <ExperimentCard key={exp.id} exp={exp} index={i} />
            ))
          ) : (
            <div className="border-t border-[var(--soft-border)] py-24 text-center">
              <p className="text-[15px] text-[var(--muted-text)]">Experiments are being prepared — check back soon.</p>
            </div>
          )}
          <div className="border-t border-[var(--soft-border)]" />
        </div>

      </div>
    </section>
  )
}
