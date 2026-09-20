import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { BEHANCE_URL, CONTACT_EMAIL, CV_URL, LINKEDIN_URL } from '../constants/links'
import { profile } from '../data/profile'
import { getRouteMeta } from '../data/routeMeta'
import { applyPageMeta, resetPageMeta } from '../utils/seo'

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

type FormState = 'idle' | 'sending' | 'sent'

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [state, setState] = useState<FormState>('idle')

  useEffect(() => {
    const meta = getRouteMeta('/contact')
    if (meta) applyPageMeta(meta)
    return () => { resetPageMeta() }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setState('sending')
    const body = encodeURIComponent(
      `Hi Usman,\n\n${form.message}\n\n— ${form.name}\n${form.email}`
    )
    const subject = encodeURIComponent(form.subject || 'Portfolio enquiry')
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    setState('sent')
  }

  const canSubmit = form.name.trim() && form.email.trim() && form.message.trim() && state === 'idle'

  const inputClass = "w-full rounded-xl border border-[var(--soft-border)] bg-[var(--pure-white)] px-4 py-3 text-[15px] text-[var(--dark-navy)] placeholder:text-[var(--muted-text)] placeholder:opacity-50 focus:outline-none focus:border-primary-orange transition-colors"
  const labelClass = "block text-[12px] font-bold text-[var(--muted-text)] mb-1.5 uppercase tracking-[0.08em]"

  return (
    <main className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20 pt-16 pb-24 lg:pb-32">

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 lg:gap-24 items-start">

        {/* ── Left — form ── */}
        <div>
          <FadeIn>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted-text)] mb-6">Contact</p>
            <h1
              className="font-bold text-[var(--dark-navy)] leading-[1.08] tracking-[-0.02em] mb-4"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 5rem)' }}
            >
              Let's make something{' '}
              <span className="text-primary-orange">clear, useful,</span>
              {' '}and well considered.
            </h1>
            <p className="text-[16px] text-[var(--muted-text)] leading-[1.65] max-w-[520px] mb-10">
              I'm open to senior product-design opportunities, selected collaborations, and
              conversations about AI-powered products, design systems, and complex digital experiences.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            {state === 'sent' ? (
              <div className="rounded-2xl border border-[var(--soft-border)] p-8">
                <p className="font-bold text-[18px] text-[var(--dark-navy)] mb-2">Message prepared.</p>
                <p className="text-[15px] text-[var(--muted-text)] leading-[1.65]">Your default mail client has opened with the message pre-filled. Send it from there.</p>
                <button
                  type="button"
                  onClick={() => { setForm({ name: '', email: '', subject: '', message: '' }); setState('idle') }}
                  className="mt-6 text-[14px] font-bold text-primary-orange hover:underline"
                >
                  Send another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className={labelClass}>
                      Name <span className="text-primary-orange">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className={labelClass}>
                      Email <span className="text-primary-orange">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="your@email.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className={labelClass}>
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    placeholder="e.g. Senior Product Designer role"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className={labelClass}>
                    Message <span className="text-primary-orange">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={7}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Tell me about the opportunity, project, or collaboration you have in mind."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="inline-flex items-center gap-2 bg-primary-orange text-white font-bold text-[15px] rounded-full px-7 py-3.5 hover:bg-deep-orange transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {state === 'sending' ? 'Opening mail…' : 'Send message →'}
                </button>
              </form>
            )}
          </FadeIn>
        </div>

        {/* ── Right — info ── */}
        <div className="lg:sticky lg:top-24 space-y-10">
          <FadeIn delay={0.15}>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted-text)] mb-5">Direct contact</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="block font-bold text-[17px] text-[var(--dark-navy)] hover:text-primary-orange transition-colors mb-1"
            >
              {CONTACT_EMAIL}
            </a>
            <p className="text-[14px] text-[var(--muted-text)]">I typically respond within 1–2 business days.</p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted-text)] mb-5">Find me online</p>
            <div className="space-y-3">
              {[
                { label: 'LinkedIn', href: LINKEDIN_URL },
                { label: 'Behance', href: BEHANCE_URL },
                { label: 'Résumé / CV', href: CV_URL },
              ].map(({ label, href }) => (
                <div key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between group py-1">
                    <span className="text-[15px] font-bold text-[var(--dark-navy)] group-hover:text-primary-orange transition-colors">{label}</span>
                    <span className="text-[var(--muted-text)] opacity-50 group-hover:text-primary-orange group-hover:opacity-100 transition-colors text-[13px]">↗</span>
                  </a>
                  <div className="border-t border-[var(--soft-border)] mt-2" />
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted-text)] mb-5">Open to</p>
            <div className="space-y-2.5">
              {[
                'Senior Product Designer roles',
                'AI-powered product design',
                'Design systems leadership',
                'Short-term collaborations',
                'Speaking & consulting',
              ].map(item => (
                <div key={item} className="flex items-center gap-3 text-[14px] text-[var(--muted-text)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-orange shrink-0" aria-hidden />
                  {item}
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="rounded-2xl border border-[var(--soft-border)] bg-[var(--pure-white)] p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2 h-2 rounded-full shrink-0 ${profile.available ? 'bg-green-500' : 'bg-[var(--muted-text)]'}`} aria-hidden />
                <p className="text-[13px] font-bold text-[var(--dark-navy)]">{profile.availableLabel}</p>
              </div>
              <p className="text-[13px] text-[var(--muted-text)] leading-[1.6]">
                {profile.availableDetail}
              </p>
            </div>
          </FadeIn>
        </div>

      </div>
    </main>
  )
}
