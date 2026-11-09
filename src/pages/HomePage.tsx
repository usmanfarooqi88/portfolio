import { useEffect } from 'react'
import { CTASection } from '../components/sections/CTASection'
import { AboutPreview } from '../components/sections/AboutPreview'
import { AwardsSection } from '../components/sections/AwardsSection'
import { HeroSection } from '../components/sections/HeroSection'
import { MarqueeBand } from '../components/sections/MarqueeBand'
import { ProjectsSection } from '../components/sections/ProjectsSection'
import { StatementSection } from '../components/sections/StatementSection'
import { getRouteMeta } from '../data/routeMeta'
import { applyPageMeta } from '../utils/seo'

export function HomePage() {
  useEffect(() => {
    const meta = getRouteMeta('/')
    if (meta) applyPageMeta(meta)
  }, [])
  return (
    <>
      <HeroSection />
      <StatementSection />
      <ProjectsSection />
      <MarqueeBand
        rows={[
          { text: 'Product & UX Design · Design Systems · Arabic & RTL Design · AI-assisted Design · ', color: 'var(--dark-navy)' },
          { text: 'SaaS · CRM · FinTech · PropTech · AI products · ', color: '#D14B28' },
        ]}
        direction="left"
      />
      <AwardsSection />
      <AboutPreview />
      <CTASection />
    </>
  )
}
