import { useRef, useState } from 'react'
import { DesktopNavigationRail } from './DesktopNavigationRail'
import { Footer } from './Footer'
import { MobileHeader } from './MobileHeader'
import { MobileNavigation } from './MobileNavigation'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      {/* Skip to content — visible on focus only */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-dark-navy focus:text-white focus:rounded focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>

      <div className="flex min-h-screen">
        {/* Desktop rail — hidden on mobile */}
        <DesktopNavigationRail />

        {/* Content column */}
        <div className="flex flex-1 flex-col min-w-0">
          {/* Mobile header — hidden on desktop */}
          <MobileHeader onOpen={() => setMenuOpen(true)} menuButtonRef={menuButtonRef} />

          {/* Main content — pt-16 offsets the fixed mobile header */}
          <main id="main-content" className="flex-1 overflow-x-clip pt-16 lg:pt-0">
            {children}
          </main>
          <Footer />
        </div>
      </div>

      {/* Mobile nav overlay */}
      <MobileNavigation
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        menuButtonRef={menuButtonRef}
      />
    </>
  )
}
