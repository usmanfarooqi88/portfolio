import { useEffect, useState } from 'react'

interface PreloaderProps {
  onComplete: () => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const minDuration = 2000
    const maxDuration = 5000
    const start = Date.now()

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100
        const elapsed = Date.now() - start
        return Math.min(100, Math.max(prev, Math.floor((elapsed / minDuration) * 98)))
      })
    }, 30)

    const finish = () => {
      setProgress(100)
      setFadeOut(true)
      setTimeout(() => {
        setHidden(true)
        onComplete()
      }, 800)
    }

    const minTimer = setTimeout(finish, minDuration)
    const maxTimer = setTimeout(finish, maxDuration)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(minTimer)
      clearTimeout(maxTimer)
    }
  }, [onComplete])

  if (hidden) return null

  return (
    <div
      className={`glass-preloader ${fadeOut ? 'fade-out' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="preloader-content text-center">
        <h1 className="preloader-logo gradient-text">UZF</h1>
        <div className="glass-progress-container">
          <div className="glass-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="preloader-percentage">{progress}%</p>
      </div>
    </div>
  )
}
