import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, Layers, X } from 'lucide-react'
import { useEffect } from 'react'
import type { Project } from '../data/projects'
import { getProjectLinkType } from '../data/projects'
import { toFigmaOpenUrl } from '../utils/figma'
import '../styles/FigmaPrototypeModal.css'

interface FigmaPrototypeModalProps {
  project: Project | null
  onClose: () => void
}

export function FigmaPrototypeModal({ project, onClose }: FigmaPrototypeModalProps) {
  const linkType = project ? getProjectLinkType(project) : 'none'
  const openUrl =
    project?.figmaUrl ??
    (project?.embedUrl ? toFigmaOpenUrl(project.embedUrl) : undefined) ??
    project?.externalUrl

  useEffect(() => {
    if (!project) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="figma-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            className="figma-modal-container"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="figma-modal-title"
          >
            <header className="figma-modal-header">
              <div className="figma-modal-header-left">
                <h2 id="figma-modal-title" className="figma-modal-title">
                  {project.title}
                </h2>
                <span className="figma-modal-category">{project.category}</span>
              </div>
              <div className="figma-modal-header-actions">
                {openUrl && linkType === 'figma' && (
                  <a
                    href={openUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="figma-modal-open-link"
                  >
                    <Layers className="h-4 w-4" aria-hidden />
                    <span className="figma-modal-open-text">Open in Figma</span>
                  </a>
                )}
                <button
                  type="button"
                  className="figma-modal-close"
                  onClick={onClose}
                  aria-label="Close prototype viewer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </header>

            <div className="figma-modal-body">
              {linkType === 'figma' && project.embedUrl ? (
                <iframe
                  className="figma-modal-iframe"
                  src={project.embedUrl}
                  title={`${project.title} Figma prototype`}
                  allowFullScreen
                />
              ) : linkType === 'external' && project.externalUrl ? (
                <div className="figma-modal-fallback">
                  <p>This project opens on an external website. Use the button below to view it in a new tab.</p>
                  <a
                    href={project.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="figma-modal-fallback-btn"
                  >
                    Visit Website <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              ) : (
                <div className="figma-modal-fallback">
                  <p>Interactive preview is not available for this project yet.</p>
                </div>
              )}
            </div>

            <footer className="figma-modal-footer">
              <div className="figma-modal-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="figma-modal-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="figma-modal-description">{project.description}</p>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
