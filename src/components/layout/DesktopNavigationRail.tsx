import { ArrowUpRight } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { navItems } from '../../data/navigation'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { ThemeToggle } from '../ui/ThemeToggle'
import { handleSmoothScroll } from '../../utils/smoothScroll'

const IN_PAGE_IDS = navItems
  .filter((item) => item.inPage)
  .map((item) => item.href.slice(1)) as string[]

export function DesktopNavigationRail() {
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  const activeId = useScrollSpy(isHome ? IN_PAGE_IDS : [])

  function handleItemClick(e: React.MouseEvent<HTMLAnchorElement>, href: string, inPage: boolean) {
    if (!inPage) return // let browser/router handle page + external links
    if (isHome) {
      handleSmoothScroll(e, href)
    } else {
      e.preventDefault()
      navigate('/' + href) // navigate home then hash
    }
  }

  function isActive(href: string, inPage: boolean): boolean {
    if (inPage) return activeId === href.slice(1)
    if (href.startsWith('/')) {
      return location.pathname === href || location.pathname.startsWith(href + '/')
    }
    return location.pathname === href
  }

  return (
    <aside
      aria-label="Site navigation"
      className="hidden lg:flex w-52 xl:w-56 shrink-0 sticky top-0 h-screen flex-col border-r border-[var(--soft-border)] bg-[var(--warm-background)] py-10 px-7 z-40"
    >
      {/* Name / monogram */}
      <Link
        to="/"
        className="inline-block font-bold text-[17px] leading-none text-[var(--dark-navy)] hover:text-primary-orange transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange rounded-sm"
      >
        Usman<span className="text-primary-orange">.</span>
      </Link>

      {/* Nav items */}
      <nav aria-label="Page sections" className="mt-12 flex flex-col gap-0.5 flex-1">
        {navItems.map((item) => {
          const active = isActive(item.href, item.inPage)
          const isExternal = item.href.startsWith('http')
          const isInternalPage = !item.inPage && item.href.startsWith('/')

          if (isExternal) {
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 py-2 text-[13px] font-medium text-muted-text hover:text-[var(--dark-navy)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange rounded-sm"
              >
                {item.label}
                <ArrowUpRight
                  size={11}
                  className="opacity-40 group-hover:opacity-70 transition-opacity"
                  aria-hidden
                />
              </a>
            )
          }

          if (isInternalPage) {
            return (
              <Link
                key={item.label}
                to={item.href}
                aria-current={active ? 'page' : undefined}
                className={`py-2 text-[13px] font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange rounded-sm ${
                  active
                    ? 'text-primary-orange'
                    : 'text-muted-text hover:text-[var(--dark-navy)]'
                }`}
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
              aria-current={active ? 'page' : undefined}
              className={`py-2 text-[13px] font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange rounded-sm ${
                active
                  ? 'text-primary-orange'
                  : 'text-muted-text hover:text-[var(--dark-navy)]'
              }`}
            >
              {item.label}
            </a>
          )
        })}
      </nav>

      {/* Bottom: theme toggle + location */}
      <div className="space-y-3">
        <ThemeToggle />
        <p className="text-[11px] text-muted-text/60 leading-snug">Lahore, Pakistan</p>
      </div>
    </aside>
  )
}
