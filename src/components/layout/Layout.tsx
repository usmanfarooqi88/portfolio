import { TopNav } from './TopNav'
import { Footer } from './Footer'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-dark-navy focus:text-white focus:rounded focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>

      <div className="flex min-h-screen flex-col">
        <TopNav />
        <main id="main-content" className="flex-1 overflow-x-clip">
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}
