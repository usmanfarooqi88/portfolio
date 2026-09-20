import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const values = [
  {
    word: 'Clear.',
    definition: 'Complexity should be organized, not passed on to the user.',
  },
  {
    word: 'Useful.',
    definition: 'A product should help someone understand, decide, or act with less friction.',
  },
  {
    word: 'Scalable.',
    definition: 'Good design should remain coherent as features, users, products, and teams grow.',
  },
  {
    word: 'Thoughtful.',
    definition: 'Details matter, but every detail should support a larger product purpose.',
  },
]

function ValueRow({ value, index }: { value: (typeof values)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-baseline gap-x-16 gap-y-2 border-t border-[#e0e0e0] py-6 lg:py-8 group"
    >
      <h3
        className="font-bold text-black leading-none tracking-[-0.02em] transition-colors group-hover:text-primary-orange"
        style={{ fontSize: 'clamp(2.8rem, 5vw, 5.5rem)' }}
      >
        {value.word}
      </h3>
      <p className="text-[#555] text-[16px] leading-[1.6] max-w-[420px] lg:text-right">
        {value.definition}
      </p>
    </motion.div>
  )
}

export function ValuesSection() {
  return (
    <section id="values" className="py-20 lg:py-28">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">

        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#999] mb-10">
          Design values
        </p>

        <div>
          {values.map((v, i) => (
            <ValueRow key={v.word} value={v} index={i} />
          ))}
          <div className="border-t border-[#e0e0e0]" />
        </div>

      </div>
    </section>
  )
}
