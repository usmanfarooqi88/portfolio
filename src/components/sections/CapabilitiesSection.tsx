import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const capabilities = [
  {
    title: 'Product thinking',
    description:
      'Turning complex requirements into clear journeys, product priorities, and understandable decisions.',
  },
  {
    title: 'Systems thinking',
    description:
      'Creating reusable components, scalable design systems, and consistent experiences across growing products.',
  },
  {
    title: 'AI-assisted design',
    description:
      'Using LLMs, generative tools, MCP integrations, and prompt-driven prototyping to explore and deliver ideas faster.',
  },
  {
    title: 'Interaction and visual craft',
    description:
      'Combining usability, hierarchy, illustration, motion, and interface detail to create polished experiences.',
  },
  {
    title: 'Cross-functional delivery',
    description:
      'Working with product teams, engineers, stakeholders, and distributed teams from early definition through implementation.',
  },
]

const TOOLS_LINE =
  'Figma · Claude · ChatGPT · Cursor · Claude Code · Runway ML · Adobe Creative Suite · Prototyping · Animation'

export function CapabilitiesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })

  return (
    <section id="capabilities" className="bg-[#f2f2f2] py-20 lg:py-28">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">

        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#999] mb-4">
          Capabilities
        </p>
        <h2
          className="font-bold text-black leading-tight tracking-[-0.02em] mb-14"
          style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)' }}
        >
          What I bring to a product team.
        </h2>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10"
        >
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p className="font-bold text-[18px] text-black mb-2">{cap.title}</p>
              <p className="text-[15px] text-[#555] leading-[1.65]">{cap.description}</p>
            </motion.div>
          ))}
        </div>

        <p className="mt-14 text-[13px] text-[#888] leading-[1.7]">
          <span className="font-bold text-[#555]">Tools:&nbsp;</span>
          {TOOLS_LINE}
        </p>

      </div>
    </section>
  )
}
