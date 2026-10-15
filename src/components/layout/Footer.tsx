import { Link } from 'react-router-dom'
import { BEHANCE_URL, CONTACT_EMAIL, LINKEDIN_URL } from '../../constants/links'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="v2-footer" aria-label="Site footer">
      <div className="v2-footer__inner">
        <Link to="/" className="v2-footer__wordmark">
          Usman Farooqi<span className="orange">.</span>
        </Link>

        <nav aria-label="Footer links" className="v2-footer__links">
          <a href={`mailto:${CONTACT_EMAIL}`} className="v2-footer__link">
            Email
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="v2-footer__link"
          >
            LinkedIn ↗
          </a>
          <a
            href={BEHANCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="v2-footer__link"
          >
            Behance ↗
          </a>
        </nav>

        <span className="v2-footer__copy">© {year} Usman Farooqi</span>
      </div>
    </footer>
  )
}
