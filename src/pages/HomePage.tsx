import { lazy, Suspense, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Preloader } from '../components/layout/Preloader'
import { AboutPreview } from '../components/sections/AboutPreview'
import { AwardsSection } from '../components/sections/AwardsSection'
import { BackgroundSection } from '../components/sections/BackgroundSection'
import { ContactCTA } from '../components/sections/ContactCTA'
import { ExperimentsSection } from '../components/sections/ExperimentsSection'
import { HeroSection } from '../components/sections/HeroSection'

const ProjectsSection = lazy(() =>
  import('../components/sections/ProjectsSection').then((m) => ({ default: m.ProjectsSection })),
)

function SectionFallback() {
  return <div className="min-h-[200px]" aria-hidden />
}

export function HomePage() {
  const [showPreloader, setShowPreloader] = useState(true)
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    const timer = setTimeout(
      () => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      },
      showPreloader ? 600 : 100,
    )
    return () => clearTimeout(timer)
  }, [location.hash, showPreloader])

  return (
    <>
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
      <div
        className={showPreloader ? 'opacity-0' : 'opacity-100'}
        style={{ transition: 'opacity 0.5s ease' }}
      >
        <HeroSection />
        <Suspense fallback={<SectionFallback />}>
          <ProjectsSection />
        </Suspense>
        <BackgroundSection />
        <AwardsSection />
        <AboutPreview />
        <ContactCTA />
        <ExperimentsSection />
      </div>
    </>
  )
}
