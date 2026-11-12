import { Link } from 'react-router-dom'
import { BEHANCE_URL, CONTACT_EMAIL, CV_URL, LINKEDIN_URL } from '../../constants/links'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="pf-footer" aria-label="Site footer">
      <div className="pf-footer__inner">

        {/* ── Left col: wordmark + tagline + CV + social ──────────── */}
        <div className="pf-footer__col pf-footer__col--left">
          <Link to="/" className="pf-footer__wordmark" aria-label="Usman Zahid Farooqi — home">
            <span className="pf-footer__wordmark-first">Usman</span>
            <span className="pf-footer__wordmark-divider" aria-hidden="true"> | </span>
            <span className="pf-footer__wordmark-last">Farooqi</span>
          </Link>
          <p className="pf-footer__tagline">Senior Product Designer · UX / UI · Design Systems</p>
          <a
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="pf-footer__cv-link"
          >
            Download CV <span aria-hidden="true">→</span>
          </a>
          <div className="pf-footer__left-social">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="pf-footer__left-social-link"
            >
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
            <a
              href={BEHANCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="pf-footer__left-social-link"
            >
              Behance <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        {/* ── Centre col: nav ─────────────────────────────────────── */}
        <nav className="pf-footer__col pf-footer__col--center" aria-label="Footer">
          <Link to="/"       className="pf-footer__nav-link">Home</Link>
          <Link to="/work"   className="pf-footer__nav-link">Work</Link>
          <Link to="/about"  className="pf-footer__nav-link">About</Link>
          <Link to="/contact" className="pf-footer__nav-link">Contact</Link>
        </nav>

        {/* ── Right col: email only ───────────────────────────────── */}
        <div className="pf-footer__col pf-footer__col--right">
          <div className="pf-footer__email-block">
            <span className="pf-footer__email-label">Email</span>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="pf-footer__email-addr"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

      </div>

      {/* ── Bottom row: copyright ────────────────────────────────── */}
      <div className="pf-footer__bottom">
        <span className="pf-footer__copy">© {year} Usman Zahid Farooqi</span>
      </div>
    </footer>
  )
}
