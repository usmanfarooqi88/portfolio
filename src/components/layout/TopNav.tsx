import { Menu } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CV_URL } from '../../constants/links'
import { MobileNavigation } from './MobileNavigation'

export function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <header className="v2-topnav z-50 border-b border-[var(--soft-border)]">
        <div className="v2-nav-inner">
          {/* Wordmark : "Usman | Farooqi" with coral divider */}
          <Link
            to="/"
            aria-label="Usman Zahid Farooqi, home"
            className="v2-nav-wordmark shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange rounded-sm"
          >
            <span>Usman</span>
            <span className="logo-divider" aria-hidden="true" />
            <span>Farooqi</span>
          </Link>

          {/* Right controls : Download CV pill + menu button (all widths) */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={CV_URL}
              download
              className="v2-nav-cta"
            >
              Download CV ↓
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              className="v2-nav-menu-btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange"
            >
              <Menu size={18} aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav : owned by TopNav, not Layout */}
      <MobileNavigation
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        menuButtonRef={menuButtonRef}
      />
    </>
  )
}
