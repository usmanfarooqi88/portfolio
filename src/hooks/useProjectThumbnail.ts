import { useEffect, useState } from 'react'
import type { Project } from '../data/projects'

let cachePromise: Promise<Record<string, string>> | null = null

function loadThumbnailsCache(): Promise<Record<string, string>> {
  if (!cachePromise) {
    cachePromise = fetch('/thumbnails.json')
      .then((res) => (res.ok ? res.json() : {}))
      .catch(() => ({}))
  }
  return cachePromise
}

export function useProjectThumbnail(project: Project) {
  const [figmaThumbnail, setFigmaThumbnail] = useState<string | null>(null)
  const [cacheReady, setCacheReady] = useState(false)

  useEffect(() => {
    let cancelled = false

    loadThumbnailsCache().then((cache) => {
      if (cancelled) return
      setFigmaThumbnail(cache[project.id] ?? null)
      setCacheReady(true)
    })

    return () => {
      cancelled = true
    }
  }, [project.id])

  const src = figmaThumbnail ?? project.image
  const loading = !cacheReady && Boolean(project.embedUrl || project.figmaUrl)

  return { src, loading }
}
