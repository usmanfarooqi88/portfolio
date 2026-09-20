import { ArrowUpRight, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { navItems } from '../../data/navigation'
import { handleSmoothScroll } from '../../utils/smoothScroll'

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

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      // Move focus to close button
      requestAnimationFrame(() => closeRef.current?.focus())
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
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

  // Close when route changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    onClose()
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
      className="lg:hidden fixed inset-0 z-50 flex flex-col bg-[var(--warm-background)]"
    >
      {/* Header row */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-[var(--soft-border)]">
        <Link
          to="/"
          onClick={onClose}
          className="font-bold text-[17px] leading-none text-dark-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange rounded-sm"
        >
          Usman<span className="text-primary-orange">.</span>
        </Link>

        <button
          ref={closeRef}
          type="button"
          onClick={() => {
            onClose()
            menuButtonRef.current?.focus()
          }}
          aria-label="Close navigation menu"
          className="flex items-center justify-center w-11 h-11 -mr-2 text-dark-navy hover:text-primary-orange transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange rounded-md"
        >
          <X size={22} aria-hidden />
        </button>
      </div>

      {/* Nav items */}
      <nav aria-label="Page sections" className="flex flex-col px-6 py-8 gap-1">
        {navItems.map((item) => {
          const isExternal = item.href.startsWith('http')
          const isInternalPage = !item.inPage && item.href.startsWith('/')

          if (isExternal) {
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="group flex items-center gap-2 py-3 text-[22px] font-semibold text-muted-text hover:text-dark-navy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange rounded-sm"
              >
                {item.label}
                <ArrowUpRight size={16} className="opacity-50 group-hover:opacity-80" aria-hidden />
              </a>
            )
          }

          if (isInternalPage) {
            return (
              <Link
                key={item.label}
                to={item.href}
                onClick={onClose}
                className="py-3 text-[22px] font-semibold text-muted-text hover:text-dark-navy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange rounded-sm"
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
              className="py-3 text-[22px] font-semibold text-muted-text hover:text-dark-navy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange rounded-sm"
            >
              {item.label}
            </a>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="mt-auto px-6 pb-10">
        <p className="text-[12px] text-muted-text/50">Lahore, Pakistan</p>
      </div>
    </div>
  )
}
