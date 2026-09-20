import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { StructuredData } from './components/StructuredData'
import { ThemeProvider } from './contexts/ThemeContext'
import { HomePage } from './pages/HomePage'

const CaseStudyPage = lazy(() =>
  import('./pages/CaseStudyPage').then((m) => ({ default: m.CaseStudyPage })),
)
const WanderlyCaseStudy = lazy(() =>
  import('./pages/WanderlyCaseStudy').then((m) => ({ default: m.WanderlyCaseStudy })),
)
const WorkPage = lazy(() =>
  import('./pages/WorkPage').then((m) => ({ default: m.WorkPage })),
)
const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })),
)
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })),
)

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function PageFallback() {
  return <div className="min-h-screen bg-warm-background" aria-hidden />
}

function App() {
  return (
    <ThemeProvider>
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/work/wanderly" element={<WanderlyCaseStudy />} />
            <Route path="/case-studies/:slug" element={<CaseStudyPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
    <StructuredData />
    <Analytics />
    <SpeedInsights />
    </ThemeProvider>
  )
}

export default App
