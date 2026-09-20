export function smoothScrollTo(target: HTMLElement, duration = 400) {
  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset
  const startPosition = window.pageYOffset
  const distance = targetPosition - startPosition
  let startTime: number | null = null

  function easeInOutCubic(t: number, b: number, c: number, d: number) {
    t /= d / 2
    if (t < 1) return (c / 2) * t * t * t + b
    t -= 2
    return (c / 2) * (t * t * t + 2) + b
  }

  function animation(currentTime: number) {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const run = easeInOutCubic(timeElapsed, startPosition, distance, duration)
    window.scrollTo(0, run)
    if (timeElapsed < duration) requestAnimationFrame(animation)
  }

  requestAnimationFrame(animation)
}

import type { MouseEvent } from 'react'

export function handleSmoothScroll(e: MouseEvent, targetId: string) {
  e.preventDefault()
  const target = document.querySelector(targetId)
  if (target instanceof HTMLElement) {
    smoothScrollTo(target)
  }
}
