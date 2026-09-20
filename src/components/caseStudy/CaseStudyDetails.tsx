import { Check, Copy, ExternalLink, Share2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import type { CaseStudy } from '../../data/caseStudies'

interface CaseStudyDetailsProps {
  caseStudy: CaseStudy
}

function XIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.227-8.451L1.502 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  )
}

function LinkedInIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export function CaseStudyDetails({ caseStudy }: CaseStudyDetailsProps) {
  const { details } = caseStudy
  const [copied, setCopied] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const liveUrl = details.liveUrl ?? caseStudy.behanceUrl
  const shareUrl =
    typeof window !== 'undefined' ? window.location.href : caseStudy.behanceUrl
  const shareTitle = `${caseStudy.title} — ${caseStudy.subtitle}`

  useEffect(() => {
    if (!toast) return
    const t = window.setTimeout(() => setToast(null), 2200)
    return () => window.clearTimeout(t)
  }, [toast])

  useEffect(() => {
    if (!copied) return
    const t = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(t)
  }, [copied])

  const copyUrl = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setToast('Link copied')
    } catch {
      setToast('Could not copy link')
    }
  }, [shareUrl])

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`

  return (
    <aside className="case-study-sidebar" aria-label="Project details">
      <div className="case-study-details-card">
        <h2 className="case-study-details-card__heading">Project Details</h2>

        <dl>
          {details.client && (
            <div className="case-study-detail-row">
              <dt>Client</dt>
              <dd>
                {details.client}
                {details.industry ? (
                  <span className="case-study-detail-sub">{details.industry}</span>
                ) : null}
              </dd>
            </div>
          )}

          <div className="case-study-detail-row">
            <dt>Date</dt>
            <dd>{details.date ?? details.year}</dd>
          </div>

          <div className="case-study-detail-row">
            <dt>Timeline</dt>
            <dd>{details.timeline}</dd>
          </div>

          <div className="case-study-detail-row">
            <dt>Role</dt>
            <dd>{details.role}</dd>
          </div>

          {details.status && (
            <div className="case-study-detail-row">
              <dt>Status</dt>
              <dd>{details.status}</dd>
            </div>
          )}

          {details.deliverables && details.deliverables.length > 0 && (
            <div className="case-study-detail-row">
              <dt>Deliverables</dt>
              <dd>{details.deliverables.join(' · ')}</dd>
            </div>
          )}

          {details.team && (
            <div className="case-study-detail-row">
              <dt>Team</dt>
              <dd>{details.team}</dd>
            </div>
          )}

          <div className="case-study-detail-row case-study-detail-row--tools">
            <dt>Tools</dt>
            <dd>
              <ul className="case-study-tool-pills" aria-label="Tools used">
                {details.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>

        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="case-study-behance-btn"
          aria-label={`${details.liveLabel ?? 'View live project'} for ${caseStudy.title} (opens in new tab)`}
        >
          {details.liveLabel ?? 'Live Project'}
          <ExternalLink size={14} aria-hidden="true" />
        </a>

        <div className="case-study-share" role="group" aria-label="Share this case study">
          <p className="case-study-share__label">
            <Share2 size={12} aria-hidden="true" />
            Share
          </p>
          <div className="case-study-share__actions">
            <button
              type="button"
              className="case-study-share__btn"
              onClick={copyUrl}
              aria-label="Copy page URL"
            >
              {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
              {copied ? 'Copied' : 'Copy link'}
            </button>
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="case-study-share__btn"
              aria-label="Share on LinkedIn (opens in new tab)"
            >
              <LinkedInIcon size={13} />
              LinkedIn
            </a>
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="case-study-share__btn"
              aria-label="Share on X (opens in new tab)"
            >
              <XIcon size={13} />
              X
            </a>
          </div>
        </div>
      </div>

      {toast && (
        <div className="case-study-toast" role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </aside>
  )
}
