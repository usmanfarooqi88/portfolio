import { useEffect, useRef, useState } from 'react'

interface CounterProps {
  from?: number
  to: number
  duration?: number
  suffix?: string
}

export function Counter({ from = 0, to, duration = 2, suffix = '' }: CounterProps) {
  const [count, setCount] = useState(from)
  const countRef = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = countRef.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || hasAnimated.current) return
        hasAnimated.current = true

        if (prefersReduced) {
          setCount(to)
          return
        }

        let start = from
        const increment = (to - from) / (duration * 60)

        const timer = setInterval(() => {
          start += increment
          if (start >= to) {
            setCount(to)
            clearInterval(timer)
          } else {
            setCount(Math.floor(start))
          }
        }, 1000 / 60)
      },
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [from, to, duration])

  return (
    <span ref={countRef}>
      {count}
      {suffix}
    </span>
  )
}
