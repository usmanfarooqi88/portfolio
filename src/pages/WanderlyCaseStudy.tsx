import { CaseStudyPage } from './CaseStudyPage'

/** Wanderly keeps its public URL (/work/wanderly) but uses the shared Behance-style layout. */
export function WanderlyCaseStudy() {
  return <CaseStudyPage slugOverride="wanderly-ai-travel-planner" />
}
