import { ArrowRight, Download, ExternalLink } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { BEHANCE_URL, CONTACT_EMAIL, CV_URL } from '../../constants/links'

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio
        if (ratio >= 0.5) {
          setIsActive(true)
        } else if (ratio < 0.45) {
          setIsActive(false)
        }
        /* 0.45–0.5: keep previous state to prevent reverse-scroll jump */
      },
      { threshold: [0, 0.45, 0.5, 0.55, 1], rootMargin: '0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="cta-wrap">
      <section
        ref={sectionRef}
        id="contact"
        className={`cta-section${isActive ? ' active' : ''}`}
      >
        <div className="cta-content">
          <p className="cta-eyebrow">Let&apos;s Collaborate</p>

          <p className="cta-role">Creative UI/UX Designer</p>

          <h2 className="cta-heading font-display">
            <span className="heading-white">Elevate</span>
            <span className="heading-white">Your</span>
            <span className="heading-white">Product</span>
          </h2>

          <p className="cta-subtext">
            SaaS dashboards, CRM workflows, PropTech platforms, or AI products —
            <br className="hidden sm:inline" /> let&apos;s design with clarity and sophistication.
          </p>

          <div className="cta-buttons">
            <a href={`mailto:${CONTACT_EMAIL}`} className="btn-primary-cta">
              <span>Start a Project</span>
              <ArrowRight className="btn-icon" aria-hidden />
            </a>

            <a href={CV_URL} target="_blank" rel="noopener noreferrer" className="btn-download-cv">
              <Download className="btn-icon" aria-hidden />
              <span>Download CV</span>
            </a>

            <a href={BEHANCE_URL} target="_blank" rel="noopener noreferrer" className="btn-behance">
              <span>Behance</span>
              <ExternalLink className="btn-icon" aria-hidden />
            </a>
          </div>

          <p className="cta-trust">
            Trusted by teams at Riyad Bank, Almarai, STC, and leading Gulf brands
          </p>
        </div>
      </section>
    </div>
  )
}
