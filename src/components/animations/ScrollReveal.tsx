import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  as?: 'section' | 'div'
  id?: string
}

export function ScrollReveal({ children, className = '', as = 'section', id }: ScrollRevealProps) {
  const Component = motion[as]

  return (
    <Component
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={sectionVariants}
    >
      {children}
    </Component>
  )
}
