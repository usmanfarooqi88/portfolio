import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  useEffect(() => {
    document.title = 'Page Not Found | Usman Zahid Farooqi'
  }, [])

  return (
    <main className="v2-section-inner py-28 lg:py-40">
      <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[var(--muted-text)] mb-6">404</p>
      <h1
        className="font-bold text-[var(--dark-navy)] leading-[1.08] tracking-[-0.02em] mb-6"
        style={{ fontSize: 'clamp(2.2rem, 5vw, 5rem)' }}
      >
        Page not found.
      </h1>
      <p className="text-[16px] text-[var(--muted-text)] leading-[1.7] max-w-[480px] mb-10">
        The page you're looking for doesn't exist or has moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-primary-orange text-white font-bold text-[15px] rounded-full px-7 py-3.5 hover:bg-deep-orange transition-colors"
      >
        ← Back to home
      </Link>
    </main>
  )
}
