import { Menu } from 'lucide-react'
import { Link } from 'react-router-dom'
interface MobileHeaderProps {
  onOpen: () => void
  menuButtonRef: React.RefObject<HTMLButtonElement | null>
}

export function MobileHeader({ onOpen, menuButtonRef }: MobileHeaderProps) {
  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between h-16 px-6 bg-[var(--warm-background)] border-b border-[var(--soft-border)]">
      <Link
        to="/"
        className="font-bold text-[17px] leading-none text-[var(--dark-navy)] hover:text-[var(--accent-text)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange rounded-sm"
      >
        Usman<span className="text-primary-orange">.</span>
      </Link>

      <button
        ref={menuButtonRef}
        type="button"
        onClick={onOpen}
        aria-label="Open navigation menu"
        aria-expanded={false}
        aria-controls="mobile-nav"
        className="flex items-center justify-center w-11 h-11 -mr-2 text-[var(--dark-navy)] hover:text-[var(--accent-text)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange rounded-md"
      >
        <Menu size={22} aria-hidden />
      </button>
    </header>
  )
}
