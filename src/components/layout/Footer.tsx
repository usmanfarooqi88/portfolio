import { ArrowUpRight, Link2, Mail } from 'lucide-react'
import { BEHANCE_URL, CONTACT_EMAIL, LINKEDIN_URL } from '../../constants/links'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-dark-navy px-6 py-14 text-white md:px-12 lg:px-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-2xl font-black">
            Usman Farooqi<span className="text-primary-orange">.</span>
          </p>
          <p className="mt-2 text-sm text-white/60">Product Designer · Lahore, Pakistan</p>
        </div>

        <div className="flex flex-wrap gap-4">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold backdrop-blur-md transition hover:border-primary-orange hover:text-primary-orange"
          >
            <Mail className="h-4 w-4" /> Email
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold backdrop-blur-md transition hover:border-primary-orange hover:text-primary-orange"
          >
            <Link2 className="h-4 w-4" /> LinkedIn
          </a>
          <a
            href={BEHANCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary-orange px-5 py-2.5 text-sm font-semibold transition hover:bg-bright-orange"
          >
            Behance <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-7xl text-center text-xs text-white/40 md:text-left">
        © {year} Usman Farooqi. Designed with curiosity. Built with care.
      </p>
    </footer>
  )
}
