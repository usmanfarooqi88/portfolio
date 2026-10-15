import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { testimonials, type Testimonial } from '../../data/testimonials'

/** Neutral avatar — shows initials when no photo is available */
function Avatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 select-none"
      style={{
        background: 'var(--v2-ground-alt)',
        border: '1px solid var(--soft-border)',
        fontSize: '13px',
        fontWeight: 600,
        color: 'var(--muted-text)',
        letterSpacing: '0.02em',
      }}
      aria-hidden="true"
    >
      {initials}
    </div>
  )
}

function TestimonialCard({ item, index }: { item: Testimonial; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-6% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="flex flex-col"
      style={{
        background: 'var(--v2-ground-alt)',
        border: '1px solid var(--soft-border)',
        borderRadius: '8px',
        padding: 'clamp(1.25rem, 2.5vw, 1.75rem)',
      }}
    >
      {/* Quote */}
      <p
        className="flex-1"
        style={{
          fontSize: 'clamp(13.5px, 1.2vw, 15px)',
          lineHeight: 1.75,
          color: 'var(--muted-text)',
        }}
      >
        &ldquo;{item.quote}&rdquo;
      </p>

      {/* Author — always at bottom */}
      <div className="flex items-center gap-3 mt-6 pt-5" style={{ borderTop: '1px solid var(--soft-border)' }}>
        {item.avatar ? (
          <img
            src={item.avatar}
            alt={item.name}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <Avatar name={item.name} />
        )}
        <div>
          <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--dark-navy)', lineHeight: 1.3 }}>
            {item.name}
          </p>
          <p style={{ fontSize: '12px', color: 'var(--muted-text)', lineHeight: 1.4, marginTop: '2px' }}>
            {item.role} · {item.company}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" aria-label="Testimonials from colleagues" className="py-20 lg:py-28">
      <div className="v2-section-inner">

        {/* Section header — label + full-width rule, matches Work section */}
        <div className="v2-carousel-label" style={{ marginBottom: '2.5rem' }}>
          <span>From Colleagues</span>
        </div>

        {/* Three-column grid — responsive via CSS */}
        <div className="v2-testimonials-grid">
          {testimonials.map((item, i) => (
            <TestimonialCard key={item.id} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
