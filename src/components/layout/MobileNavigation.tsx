import { Download, Mail, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CONTACT_EMAIL, CV_URL, LINKEDIN_URL } from '../../constants/links'
import { getLenis } from '../../lib/useLenis'
import { handleSmoothScroll } from '../../utils/smoothScroll'

interface NavItem {
  label: string
  href: string
  inPage: boolean
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Work',    href: '/work',    inPage: false },
  { label: 'About',   href: '#about',   inPage: true  },
  { label: 'Contact', href: '#contact', inPage: true  },
]

interface MobileNavigationProps {
  open: boolean
  onClose: () => void
  menuButtonRef: React.RefObject<HTMLButtonElement | null>
}

export function MobileNavigation({ open, onClose, menuButtonRef }: MobileNavigationProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const closeRef = useRef<HTMLButtonElement>(null)
  const isHome = location.pathname === '/'

  // Lock body scroll + stop Lenis while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      getLenis()?.stop()
      requestAnimationFrame(() => closeRef.current?.focus())
    } else {
      document.body.style.overflow = ''
      getLenis()?.start()
    }
    return () => {
      document.body.style.overflow = ''
      getLenis()?.start()
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose, menuButtonRef])

  // Full focus trap : cycle Tab/Shift+Tab within dialog
  useEffect(() => {
    if (!open) return
    const dialog = document.getElementById('mobile-nav')
    if (!dialog) return
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', handleTab)
    return () => document.removeEventListener('keydown', handleTab)
  }, [open])

  // Close when route changes
  useEffect(() => {
    onClose()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.hash])

  function handleItemClick(e: React.MouseEvent<HTMLAnchorElement>, href: string, inPage: boolean) {
    if (!inPage) {
      onClose()
      return
    }
    if (isHome) {
      handleSmoothScroll(e, href)
      onClose()
    } else {
      e.preventDefault()
      onClose()
      navigate('/' + href)
    }
  }

  if (!open) return null

  return (
    <div
      id="mobile-nav"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className="fixed inset-0 z-50 flex flex-col bg-[var(--warm-background)]"
      style={{ animation: 'var(--overlay-in, none)' }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between px-6 border-b border-[var(--soft-border)]" style={{ height: 'var(--nav-h)' }}>
        <Link
          to="/"
          onClick={onClose}
          className="v2-nav-wordmark shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-orange)] rounded-sm"
        >
          <span>Usman</span>
          <span className="logo-divider" aria-hidden="true" />
          <span>Farooqi</span>
        </Link>

        <button
          ref={closeRef}
          type="button"
          onClick={() => {
            onClose()
            menuButtonRef.current?.focus()
          }}
          aria-label="Close navigation menu"
          className="flex items-center justify-center w-11 h-11 -mr-2 text-[var(--dark-navy)] hover:text-[var(--accent-text)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-orange)] rounded-md"
        >
          <X size={22} aria-hidden />
        </button>
      </div>

      {/* Nav items */}
      <nav aria-label="Site navigation" className="flex flex-col px-6 py-10 gap-1">
        {NAV_ITEMS.map((item) => {
          const isInternalPage = !item.inPage && item.href.startsWith('/')

          if (isInternalPage) {
            return (
              <Link
                key={item.label}
                to={item.href}
                onClick={onClose}
                className="py-3 text-[clamp(1.5rem,4vw,2rem)] font-light leading-tight text-[var(--dark-navy)] hover:text-[var(--accent-text)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-orange)] rounded-sm"
              >
                {item.label}
              </Link>
            )
          }

          return (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleItemClick(e, item.href, item.inPage)}
              className="py-3 text-[clamp(1.5rem,4vw,2rem)] font-light leading-tight text-[var(--dark-navy)] hover:text-[var(--accent-text)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-orange)] rounded-sm"
            >
              {item.label}
            </a>
          )
        })}

        {/* CV download */}
        <a
          href={CV_URL}
          download
          onClick={onClose}
          className="group flex items-center gap-2.5 py-3 text-[clamp(1.5rem,4vw,2rem)] font-light leading-tight text-[var(--dark-navy)] hover:text-[var(--accent-text)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-orange)] rounded-sm"
        >
          Download CV
          <Download size={18} className="opacity-50 group-hover:opacity-80" aria-hidden />
        </a>
      </nav>

      {/* Footer : email + LinkedIn */}
      <div className="mt-auto px-6 pb-10 flex flex-col gap-4">
        <div className="h-px bg-[var(--soft-border)]" aria-hidden />
        <div className="flex items-center gap-6">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-2 text-[13px] text-[var(--muted-text)] hover:text-[var(--dark-navy)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-orange)] rounded-sm"
          >
            <Mail size={14} aria-hidden />
            {CONTACT_EMAIL}
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[13px] text-[var(--muted-text)] hover:text-[var(--dark-navy)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-orange)] rounded-sm"
            aria-label="LinkedIn profile (opens in new tab)"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  )
}
