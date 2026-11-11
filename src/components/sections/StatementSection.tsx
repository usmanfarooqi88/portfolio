/**
 * StatementSection : word-level mask reveal
 *
 * Text: "7+ years designing SaaS, CRM, FinTech and PropTech products,
 *        building design systems, and making interfaces work in English
 *        and Arabic (RTL)."
 *
 * Mechanic: each word is wrapped in an overflow:hidden container;
 * the inner span starts at translateY(100px) and scrubs to 0 via
 * IntersectionObserver with per-word stagger. Descenders are never
 * clipped because the overflow clip sits on the word-wrapper, not
 * on the text itself : the wrapper height is set to line-height + extra.
 */

import { useEffect, useRef } from 'react'

const TEXT =
  '7+ years designing SaaS, CRM, FinTech and PropTech products, building design systems, and making interfaces work in English and Arabic (RTL).'

function splitWords(text: string) {
  // Split on regular whitespace only — U+00A0 (NBSP) keeps adjacent tokens together.
  return text.split(/ +/).filter(Boolean)
}

export function StatementSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const words = wordRefs.current.filter(Boolean) as HTMLSpanElement[]
    if (!words.length) return

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      words.forEach(w => { w.style.transform = 'translateY(0)'; w.style.opacity = '1' })
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            words.forEach((word, i) => {
              word.style.transitionDelay = `${i * 28}ms`
              word.style.transform = 'translateY(0)'
              word.style.opacity = '1'
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const words = splitWords(TEXT)

  return (
    <section
      ref={sectionRef}
      className="statement-section"
      aria-label="Experience summary"
    >
      <p className="statement-text" aria-label={TEXT}>
        {words.map((word, i) => (
          <span key={i} className="statement-word-wrap" aria-hidden="true">
            <span
              className="statement-word"
              ref={el => { wordRefs.current[i] = el }}
            >
              {word}
            </span>
          </span>
        ))}
      </p>
    </section>
  )
}
