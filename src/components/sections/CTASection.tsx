import { Download, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CV_URL, LINKEDIN_URL } from '../../constants/links'

export function CTASection() {
  return (
    <section
      id="contact"
      className="border-t border-[var(--soft-border)]"
      aria-label="Contact"
    >
      <div className="v2-section-inner py-4 lg:py-6">
        <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[var(--muted-text)] mb-8">
          Senior Product Designer
        </p>

        <h2
          className="font-bold text-[var(--dark-navy)] leading-[1.08] tracking-[-0.02em] mb-6"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 5rem)' }}
        >
          Have a product worth<br />
          <span className="text-[var(--text-coral)]">making better?</span>
        </h2>

        <p className="text-[16px] text-[var(--muted-text)] leading-[1.7] max-w-[540px] mb-10">
          I work with product teams on complex interfaces, design systems, and AI-native
          experiences, from early-stage concept to production-ready specs.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary-orange text-[var(--dark-navy)] font-bold text-[15px] rounded-full px-7 py-3.5 hover:bg-[var(--text-coral)] hover:text-white transition-colors"
          >
            Contact me →
          </Link>

          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[var(--soft-border)] text-[var(--dark-navy)] font-bold text-[15px] rounded-full px-7 py-3.5 hover:border-primary-orange hover:text-[var(--text-coral)] transition-colors"
          >
            LinkedIn
            <ExternalLink size={14} aria-hidden />
          </a>

          <a
            href={CV_URL}
            download
            className="inline-flex items-center gap-2 border border-[var(--soft-border)] text-[var(--dark-navy)] font-bold text-[15px] rounded-full px-7 py-3.5 hover:border-primary-orange hover:text-[var(--text-coral)] transition-colors"
          >
            <Download size={14} aria-hidden />
            Download CV
          </a>
        </div>
      </div>
    </section>
  )
}
