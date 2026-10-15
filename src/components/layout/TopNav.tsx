import { ArrowUpRight, Menu } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CV_URL } from '../../constants/links'
import { handleSmoothScroll } from '../../utils/smoothScroll'
import { ThemeToggle } from '../ui/ThemeToggle'
import { MobileNavigation } from './MobileNavigation'

interface TopNavLink {
  label: string
  href: string
  inPage: boolean
  external: boolean
}

const TOP_NAV_LINKS: TopNavLink[] = [
  { label: 'Work',    href: '/work',    inPage: false, external: false },
  { label: 'About',   href: '#about',   inPage: true,  external: false },
  { label: 'Contact', href: '#contact', inPage: true,  external: false },
  { label: 'Résumé',  href: CV_URL,     inPage: false, external: true  },
]

export function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  function handleLinkClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    inPage: boolean,
  ) {
    if (!inPage) return
    if (isHome) {
      handleSmoothScroll(e, href)
    } else {
      e.preventDefault()
      navigate('/' + href)
    }
  }

  return (
    <>
      <header className="v2-topnav sticky top-0 z-40 h-14 flex items-center justify-between border-b border-[var(--soft-border)]" style={{ paddingLeft: 'clamp(2rem, 6vw, 6rem)', paddingRight: 'clamp(2rem, 6vw, 6rem)' }}>
        {/* Wordmark */}
        <Link to="/" className="v2-nav-wordmark shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange rounded-sm">
          Usman Farooqi
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Site navigation" className="hidden md:flex items-center gap-8">
          {TOP_NAV_LINKS.map(({ label, href, inPage, external }) => {
            if (external) {
              return (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="v2-nav-link inline-flex items-center gap-1"
                >
                  {label}
                  <ArrowUpRight size={11} aria-hidden className="opacity-50" />
                </a>
              )
            }
            if (inPage) {
              return (
                <a
                  key={label}
                  href={href}
                  onClick={(e) => handleLinkClick(e, href, inPage)}
                  className="v2-nav-link"
                >
                  {label}
                </a>
              )
            }
            const isActive =
              location.pathname === href || location.pathname.startsWith(href + '/')
            return (
              <Link
                key={label}
                to={href}
                className={`v2-nav-link${isActive ? ' v2-nav-link--active' : ''}`}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle compact />
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="md:hidden flex items-center justify-center w-10 h-10 text-[var(--dark-navy)] hover:text-primary-orange transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange rounded-md"
          >
            <Menu size={20} aria-hidden />
          </button>
        </div>
      </header>

      {/* Mobile nav — owned by TopNav, not Layout */}
      <MobileNavigation
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        menuButtonRef={menuButtonRef}
      />
    </>
  )
}
