/**
 * HappyTenant Landlord — Story V3
 *
 * Story-first editorial case study. Completely replaces the V2 block-based
 * presentation for this route. No other case studies are affected.
 *
 * DO NOT: add absolute Figma coordinates, invent metrics, add personas/research claims,
 *          or show any [OLD UI REQUIRED] / [SOURCE REQUIRED] notes.
 */

import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BeforeAfterSlider } from '../components/caseStudy/BeforeAfterSlider'
import { applyPageMeta, resetPageMeta } from '../utils/seo'
import { getRouteMeta } from '../data/routeMeta'

/* ─────────────────────────────────────────────────────────────────────── */
/* Reading-progress bar (shared pattern)                                    */
/* ─────────────────────────────────────────────────────────────────────── */

function ReadingProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const scrollable = el.scrollHeight - el.clientHeight
      if (scrollable <= 0) { setProgress(0); return }
      setProgress(Math.min(100, Math.max(0, (el.scrollTop / scrollable) * 100)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return (
    <div
      className="case-study-progress"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
    >
      <div className="case-study-progress__bar" style={{ width: `${progress}%` }} />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────── */
/* V3 Story Page                                                             */
/* ─────────────────────────────────────────────────────────────────────── */

export function HappyTenantLandlordV3() {
  const [motionOk] = useState(() => {
    if (typeof window === 'undefined') return false
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const meta = getRouteMeta('/case-studies/happytenant-landlord-experience')
    if (meta) applyPageMeta(meta)
    return () => resetPageMeta()
  }, [])

  return (
    <div className="case-study-page htl-v3" data-cs="happytenant-landlord">
      <ReadingProgress />

      <a
        href="#htl-v3-main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-orange focus:text-white focus:rounded-md focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>

      {/* ── Breadcrumb ───────────────────────────────────────────────── */}
      <div className="case-study-breadcrumb">
        <Link to="/#work" className="case-study-back">
          <ArrowLeft size={14} aria-hidden="true" />
          Back to Work
        </Link>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          00 — HERO
      ══════════════════════════════════════════════════════════════ */}
      <header className="htl3-hero">
        {/* Left — text column */}
        <div className="htl3-hero__content">
          <p className="htl3-hero__type">MOBILE APP</p>
          <h1 className="htl3-hero__title font-display">
            Happy<br />Tenant
          </h1>
          <p className="htl3-hero__subtitle">Landlord Experience</p>
          <p className="htl3-hero__thesis">
            A landlord-facing mobile experience designed to make portfolio performance,
            financial states, property operations and approvals easier to understand and act on.
          </p>
          <dl className="htl3-hero__meta">
            <div><dt>Role</dt><dd>Product Designer</dd></div>
            <div><dt>Timeline</dt><dd>Contributed during LAVA Brands tenure · Jul 2024 – Jan 2026</dd></div>
            <div><dt>Status</dt><dd>Prototype / design</dd></div>
          </dl>
          <div className="htl3-hero__tags" role="list" aria-label="Project categories">
            {['Product Design', 'PropTech', 'Mobile', 'SaaS', 'B2B'].map((tag) => (
              <span key={tag} className="case-study-tag" role="listitem">{tag}</span>
            ))}
          </div>
        </div>

        {/* Right — video column */}
        <div className="htl3-hero__image" aria-hidden="true">
          <video
            className="htl3-hero__bg"
            src="/images/projects/Landlord_app.webm"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/case-studies/happytenant-landlord/hero.webp"
          />
          <div className="htl3-hero__image-overlay" />
        </div>
      </header>

      {/* ── Main story stream ──────────────────────────────────────── */}
      <main id="htl-v3-main" className="htl3-stream">

        {/* ══════════════════════════════════════════════════════════
            01 — THE STARTING POINT
        ══════════════════════════════════════════════════════════ */}
        <section className="htl3-section htl3-section--light" aria-labelledby="htl3-s01">
          <div className="htl3-section__inner">
            <p className="htl3-label">01 — Starting Point</p>
            <h2 id="htl3-s01" className="htl3-heading font-display">
              An existing product with a lot to communicate.
            </h2>
            <p className="htl3-body">
              HappyTenant Landlord was already a functioning product. It covered portfolio management,
              financial tracking, work orders, and tenant communications across a multi-property,
              multi-owner context. The challenge wasn't starting from zero — it was working with a
              product that had real density, real users, and real operational complexity.
            </p>
            <p className="htl3-body">
              The existing screens tried to do a lot at once. Financial data, work-order status,
              approval requests, and portfolio navigation all occupied the same primary surface.
              Hierarchy was weak. Action items didn't read differently from status items.
              The product felt like it was reporting everything at equal volume.
            </p>
            {/* Existing density/home visual repurposed here — shows the starting state */}
            <figure className="htl3-showcase">
              <img
                src="/images/case-studies/happytenant-landlord/v3/existing-product.webp"
                alt="Overview of the landlord product showing multiple high-frequency modules competing for the same mobile screen real estate: financial data, work orders, approvals, and portfolio navigation"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            02 — EXISTING EXPERIENCE
        ══════════════════════════════════════════════════════════ */}
        <section className="htl3-section htl3-section--light" aria-labelledby="htl3-s02">
          <div className="htl3-section__inner">
            <p className="htl3-label">02 — Existing Experience</p>
            <h2 id="htl3-s02" className="htl3-heading font-display">
              A dense product.
              <br />Competing for the same scroll.
            </h2>
            <p className="htl3-body">
              The existing product communicated a lot of information — but not always the right
              information at the right time. Four high-frequency workflows occupied the same
              primary surface: financial position, operational volume, approval actions, and
              portfolio depth. Every section competed for the same vertical real estate.
            </p>
            <div className="htl3-observation-tags" aria-label="Design observations">
              {['Hierarchy', 'Action visibility', 'Information density', 'Pattern consistency'].map((tag) => (
                <span key={tag} className="htl3-obs-tag">{tag}</span>
              ))}
            </div>
            <figure className="htl3-showcase htl3-showcase--editorial">
              <img
                src="/images/case-studies/happytenant-landlord/v3/home.webp"
                alt="Screen density overview: financial data, work orders, approvals, and portfolio navigation competing in the same primary viewport"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="htl3-caption">
                Four high-frequency workflows in a single mobile scroll — financial position,
                operational volume, approval actions, and portfolio depth.
                Every section competed for the same vertical real estate.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            03 — PRODUCT STRUCTURE
        ══════════════════════════════════════════════════════════ */}
        <section className="htl3-section htl3-section--dark" aria-labelledby="htl3-s03">
          <div className="htl3-section__inner">
            <p className="htl3-label htl3-label--light">03 — Product Structure</p>
            <h2 id="htl3-s03" className="htl3-heading htl3-heading--light font-display">
              Structure before screens.
            </h2>
            <p className="htl3-body htl3-body--light">
              The product structure reveals how portfolio, financial and operational tasks
              connect across the landlord experience.
            </p>

            <ProductConstellation />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            04 — DESIGN PRIORITIES
        ══════════════════════════════════════════════════════════ */}
        <section className="htl3-section htl3-section--light" aria-labelledby="htl3-s04">
          <div className="htl3-section__inner">
            <p className="htl3-label">04 — Design Priorities</p>
            <h2 id="htl3-s04" className="htl3-heading font-display">
              Three things to get right.
            </h2>
            <div className="htl3-priorities">
              <div className="htl3-priority">
                <span className="htl3-priority__num font-display">01</span>
                <div>
                  <h3 className="htl3-priority__name">Financial clarity</h3>
                  <p className="htl3-priority__desc">
                    Surface balance, dues and income early in the experience.
                  </p>
                </div>
              </div>
              <div className="htl3-priority">
                <span className="htl3-priority__num font-display">02</span>
                <div>
                  <h3 className="htl3-priority__name">Action visibility</h3>
                  <p className="htl3-priority__desc">
                    Give approvals, overdue items and open work orders stronger visual priority.
                  </p>
                </div>
              </div>
              <div className="htl3-priority">
                <span className="htl3-priority__num font-display">03</span>
                <div>
                  <h3 className="htl3-priority__name">Portfolio depth</h3>
                  <p className="htl3-priority__desc">
                    Keep property and unit detail accessible without losing overview context.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            05 — NEW DIRECTION
        ══════════════════════════════════════════════════════════ */}
        <section className="htl3-section htl3-section--light" aria-labelledby="htl3-s05">
          <div className="htl3-section__inner">
            <p className="htl3-label">05 — New Direction</p>
            <h2 id="htl3-s05" className="htl3-heading font-display">
              Design language from the product up.
            </h2>
            <p className="htl3-body htl3-body--measure">
              The visual direction grew from the product's density: clearer hierarchy, stronger
              distinction between information and action, and more consistent surface patterns.
            </p>
            {/* Two-up design language boards — exported from Figma */}
            <div className="htl3-direction-boards">
              <figure className="htl3-direction-board">
                <img
                  src="/images/case-studies/happytenant-landlord/v3/new-direction-typography.webp"
                  alt="Typography and hierarchy board: type scale, weight pairing and colour usage across the new design language"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption className="htl3-caption">Typography & hierarchy</figcaption>
              </figure>
              <figure className="htl3-direction-board">
                <img
                  src="/images/case-studies/happytenant-landlord/v3/new-direction-components.webp"
                  alt="Component language board: card surfaces, state indicators and action patterns used across the redesigned product"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption className="htl3-caption">Component language</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            06 — THE OPERATING VIEW
        ══════════════════════════════════════════════════════════ */}
        <section className="htl3-section htl3-section--dark" aria-labelledby="htl3-s06">
          <div className="htl3-section__inner">
            <p className="htl3-label htl3-label--light">06 — Operating View</p>
            <h2 id="htl3-s06" className="htl3-heading htl3-heading--light font-display">
              The home screen as a complete operating view.
            </h2>
            <p className="htl3-body htl3-body--light htl3-body--measure">
              The redesigned Home screen works as a full operational surface — not a navigation
              launcher. Financial snapshot, action-required items, and portfolio overview read as
              one structured view.
            </p>
            <figure className="htl3-cin">
              <img
                src="/images/case-studies/happytenant-landlord/v3/home.webp"
                alt="HappyTenant Landlord Home showing three panels: financial snapshot with pending payments and income, share breakdown and shortcuts, and WO KPIs with approvals and portfolio summary"
                loading="lazy"
                decoding="async"
              />
            </figure>
            {/* Annotations */}
            <div className="htl3-annotations">
              <div className="htl3-annotation">
                <span className="htl3-annotation__marker">↑</span>
                <p className="htl3-annotation__text">
                  <strong>Financial snapshot</strong> — balance, pending payments, income distribution above the fold
                </p>
              </div>
              <div className="htl3-annotation">
                <span className="htl3-annotation__marker">→</span>
                <p className="htl3-annotation__text">
                  <strong>Action-required items</strong> — approvals and overdue work orders surfaced mid-screen
                </p>
              </div>
              <div className="htl3-annotation">
                <span className="htl3-annotation__marker">↓</span>
                <p className="htl3-annotation__text">
                  <strong>Portfolio overview</strong> — unit count, lease status and navigation reach below
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            07 — CORE WORKFLOWS
        ══════════════════════════════════════════════════════════ */}
        <section className="htl3-section htl3-section--light" aria-labelledby="htl3-s07">
          <div className="htl3-section__inner">
            <p className="htl3-label">07 — Core Workflows</p>
            <h2 id="htl3-s07" className="htl3-heading font-display">
              Five workflows. Five compositions.
            </h2>

            {/* WF01 — Approvals: dominant + supporting */}
            <WorkflowBlock
              num="01"
              title="Approvals"
              desc="Approval requests surface on Home with enough context to act without drilling deeper. Approve and reject inline — no extra step."
              layout="dominant"
              primary={{ src: '/images/case-studies/happytenant-landlord/v3/wf01-approvals-large.webp', alt: 'Approval cards on Home: request context and Approve / Reject inline. Unit, lease, and work-order counts give operational orientation at a glance' }}
              secondary={{ src: '/images/case-studies/happytenant-landlord/v3/wf01-approvals-small.webp', alt: 'Approval detail panel showing request context, tenant info and action buttons' }}
            />

            {/* WF02 — Portfolio: 3-step sequence */}
            <WorkflowBlock
              num="02"
              title="Portfolio drilldown"
              desc="Rentals → property → unit. Each level preserves overview context so owners don't lose their bearing while drilling into unit detail."
              layout="sequence"
              primary={{ src: '/images/case-studies/happytenant-landlord/v3/wf02-portfolio-left.webp', alt: 'Portfolio rentals list showing multiple properties with unit and lease counts' }}
              secondary={{ src: '/images/case-studies/happytenant-landlord/v3/wf02-portfolio-mid.webp', alt: 'Property detail showing unit breakdown, work order summary and lease statuses' }}
              tertiary={{ src: '/images/case-studies/happytenant-landlord/v3/wf02-portfolio-right.webp', alt: 'Unit detail showing current tenant, lease dates, upcoming rent and document access' }}
            />

            {/* WF03 — Work orders: full-width strip */}
            <WorkflowBlock
              num="03"
              title="Work orders"
              desc="Operational volume: open, in-progress and resolved maintenance requests across all properties."
              layout="wide"
              primary={{ src: '/images/case-studies/happytenant-landlord/v3/wf03-work-orders.webp', alt: 'Work Orders flow: list view with status tags, detail screen for Electricity Fault, and New Work Order form with property, category and priority fields' }}
            />

            {/* WF04 — Financial: symmetric twin */}
            <WorkflowBlock
              num="04"
              title="Financial view"
              desc="Wallet, due payments and income distribution as one financial surface. Balance and upcoming obligations share the same view."
              layout="twin"
              primary={{ src: '/images/case-studies/happytenant-landlord/v3/wf04-financial-left.webp', alt: 'Financial view showing wallet balance, income statement and distribution breakdown' }}
              secondary={{ src: '/images/case-studies/happytenant-landlord/v3/wf04-financial-right.webp', alt: 'Due payments detail with outstanding amounts and upcoming collection dates' }}
            />

            {/* WF05 — Records: full-width strip */}
            <WorkflowBlock
              num="05"
              title="Records & documents"
              desc="Contracts, documents, and the download center as supporting depth. Accessible without anchoring the primary navigation to them."
              layout="wide"
              primary={{ src: '/images/case-studies/happytenant-landlord/v3/wf05-records.webp', alt: 'Records section showing contract status, documents list and download center across the full screen' }}
            />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            08 — PRODUCT STATES
        ══════════════════════════════════════════════════════════ */}
        <section className="htl3-section htl3-section--dark" aria-labelledby="htl3-s08">
          <div className="htl3-section__inner">
            <p className="htl3-label htl3-label--light">08 — Product States</p>
            <h2 id="htl3-s08" className="htl3-heading htl3-heading--light font-display">
              Every state as a design decision.
            </h2>
            <p className="htl3-body htl3-body--light htl3-body--measure">
              Pending, active, overdue, and completed — each state communicates a different urgency.
              The design treats state as a first-class visual dimension, not an afterthought.
            </p>
            <div className="htl3-states-grid">
              <figure className="htl3-state-panel">
                <img
                  src="/images/case-studies/happytenant-landlord/v3/state-middle.webp"
                  alt="Work order active state: in-progress card with assignee, due date and cost estimate"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <figure className="htl3-state-panel">
                <img
                  src="/images/case-studies/happytenant-landlord/v3/state-right.webp"
                  alt="Work order completed state: resolved card with completion date, final cost and sign-off"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            09 — BEFORE / AFTER
        ══════════════════════════════════════════════════════════ */}
        <section className="htl3-section htl3-section--light" aria-labelledby="htl3-s09">
          <div className="htl3-section__inner">
            <p className="htl3-label">09 — Before / After</p>
            <h2 id="htl3-s09" className="htl3-heading font-display">
              Same product. Different reading.
            </h2>
            <p className="htl3-body htl3-body--measure">
              Side-by-side, the difference is less about aesthetics and more about hierarchy.
              The redesign makes financial context primary, gives actions a stronger visual voice,
              and brings consistency to surface patterns across the product.
            </p>
          </div>
          {/* Before/after slider — full bleed within the section */}
          <div className="htl3-slider-wrap">
            <BeforeAfterSlider
              beforeSrc="/images/case-studies/happytenant-landlord/before-after-old.webp"
              afterSrc="/images/case-studies/happytenant-landlord/before-after-new.webp"
              beforeAlt="Original HappyTenant Landlord interface: five screens showing the previous design across Home, Portfolio, Work Orders, Financial and Approvals"
              afterAlt="Redesigned HappyTenant Landlord interface: five screens showing the new design with clearer hierarchy, financial clarity and consistent surface patterns"
              aspectRatio={866 / 319}
              initialPosition={50}
              accessibleDescription="Compare original and redesigned HappyTenant Landlord interface."
            />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            10 — FINAL EXPERIENCE
        ══════════════════════════════════════════════════════════ */}
        <section className="htl3-section htl3-section--light" aria-labelledby="htl3-s10">
          <div className="htl3-section__inner">
            <p className="htl3-label">10 — Final Experience</p>
            <h2 id="htl3-s10" className="htl3-heading font-display">
              The product, complete.
            </h2>
          </div>
          {/* Cinematic product video — the full experience in motion */}
          <figure className="htl3-final-video">
            {motionOk ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/images/case-studies/happytenant-landlord/hero.webp"
                aria-label="HappyTenant Landlord product walkthrough showing the complete experience across Home, Portfolio, Financial, Work Orders and Approvals"
              >
                <source src="/images/projects/Landlord_app.webm" type="video/webm" />
              </video>
            ) : (
              <img
                src="/images/case-studies/happytenant-landlord/home.webp"
                alt="HappyTenant Landlord final design — complete operating view"
                loading="lazy"
                decoding="async"
              />
            )}
          </figure>
        </section>

        {/* ══════════════════════════════════════════════════════════
            11 — OUTCOME
        ══════════════════════════════════════════════════════════ */}
        <section className="htl3-section htl3-section--light" aria-labelledby="htl3-s11">
          <div className="htl3-section__inner htl3-section__inner--narrow">
            <p className="htl3-label">11 — Outcome</p>
            <h2 id="htl3-s11" className="htl3-heading font-display">
              What the product now allows.
            </h2>
            <div className="htl3-outcomes">
              <div className="htl3-outcome">
                <h3 className="htl3-outcome__title">Clearer starting point</h3>
                <p className="htl3-outcome__desc">
                  Financial status and pending actions are immediately visible on Home. Owners
                  can orient without digging into sub-screens.
                </p>
              </div>
              <div className="htl3-outcome">
                <h3 className="htl3-outcome__title">More visible actions</h3>
                <p className="htl3-outcome__desc">
                  Approvals and overdue items have stronger visual distinction from status
                  information — they read as things requiring a response, not just data points.
                </p>
              </div>
              <div className="htl3-outcome">
                <h3 className="htl3-outcome__title">Consistent drill-down patterns</h3>
                <p className="htl3-outcome__desc">
                  Portfolio, financial, and operational drill-downs follow the same structural
                  logic. Moving between areas doesn't feel like switching products.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            12 — REFLECTION
        ══════════════════════════════════════════════════════════ */}
        <section className="htl3-section htl3-section--light" aria-labelledby="htl3-s12">
          <div className="htl3-section__inner htl3-section__inner--narrow">
            <p className="htl3-label">12 — Reflection</p>
            <h2 id="htl3-s12" className="htl3-heading font-display">
              What I'd carry forward.
            </h2>
            <p className="htl3-body">
              The most useful discipline on this project was resisting the urge to simplify
              by reducing. The product genuinely needed to communicate a lot — the design work
              was finding the right reading order, not editing out information.
            </p>
            <p className="htl3-body">
              Working within an established platform also sharpened pattern thinking. Each
              design decision had to work coherently with what already existed. That constraint
              made the structural choices more deliberate.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            13 — NEXT
        ══════════════════════════════════════════════════════════ */}
        <section className="htl3-section htl3-section--dark htl3-section--next" aria-labelledby="htl3-s13">
          <div className="htl3-section__inner">
            <p className="htl3-label htl3-label--light">Next project</p>
            <h2 id="htl3-s13" className="htl3-heading htl3-heading--light font-display">
              HappyTenant
              <br />Tenant Experience
            </h2>
            <p className="htl3-body htl3-body--light htl3-body--measure">
              The tenant-facing side of the same platform — a different audience, a different set
              of priorities, the same product ecosystem.
            </p>
            <Link
              to="/case-studies/happytenant-tenant-experience"
              className="htl3-next-link"
            >
              View case study
              <span aria-hidden="true"> →</span>
            </Link>
          </div>
        </section>

      </main>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────── */
/* Sub-components                                                            */
/* ─────────────────────────────────────────────────────────────────────── */

/** Product constellation — S03 */
function ProductConstellation() {
  // SVG coordinate system: viewBox 0 0 1200 700, center at (600, 350)
  const cx = 600
  const cy = 350

  const nodes = [
    { id: 'overview',       label: 'OVERVIEW',       sub: 'Home · KPIs · Approvals',           x: 285,  y: 148,  primary: true  },
    { id: 'portfolio',      label: 'PORTFOLIO',       sub: 'Properties · Units · Leases',       x: 915,  y: 148,  primary: true  },
    { id: 'financial',      label: 'FINANCIAL',       sub: 'Wallet · Due · Income',             x: 1040, y: 350,  primary: true  },
    { id: 'operations',     label: 'OPERATIONS',      sub: 'Work Orders · Approvals',           x: 895,  y: 568,  primary: true  },
    { id: 'account',        label: 'ACCOUNT',         sub: '',                                  x: 600,  y: 658,  primary: false },
    { id: 'records',        label: 'RECORDS',         sub: 'Contracts · Documents',             x: 298,  y: 568,  primary: true  },
    { id: 'communication',  label: 'COMMUNICATION',   sub: 'Broadcast · Chat',                  x: 155,  y: 350,  primary: true  },
  ]

  const rings = [120, 210, 300]

  return (
    <figure
      className="htl3-constellation-fig"
      role="img"
      aria-label="Product structure map: seven functional areas — Overview, Portfolio, Financial, Operations, Records, Communication and Account — connected to a central Landlord Experience hub"
    >
      <svg
        viewBox="0 0 1200 700"
        xmlns="http://www.w3.org/2000/svg"
        className="htl3-constellation-svg"
        aria-hidden="true"
      >
        {/* Background */}
        <rect width="1200" height="700" fill="#161616" rx="10" />

        {/* Concentric rings */}
        {rings.map((r) => (
          <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke="#2e2e2e" strokeWidth="1" />
        ))}

        {/* Connecting lines */}
        {nodes.map((n) => (
          <line
            key={n.id + '-line'}
            x1={cx} y1={cy}
            x2={n.x} y2={n.y}
            stroke="#333333"
            strokeWidth="1"
          />
        ))}

        {/* Center hub */}
        <circle cx={cx} cy={cy} r={52} fill="#fa6c0b" />
        <text x={cx} y={cy - 8}  textAnchor="middle" fill="white" fontSize="11" fontWeight="700" letterSpacing="1" fontFamily="inherit">LANDLORD</text>
        <text x={cx} y={cy + 8}  textAnchor="middle" fill="white" fontSize="11" fontWeight="700" letterSpacing="1" fontFamily="inherit">EXPERIENCE</text>

        {/* Nodes */}
        {nodes.map((n) => {
          const dotColor = n.primary ? '#fa6c0b' : '#555555'
          // Determine text anchor based on position relative to center
          const anchor = n.x < cx - 50 ? 'end' : n.x > cx + 50 ? 'start' : 'middle'
          const dotX = anchor === 'end' ? n.x + 10 : anchor === 'start' ? n.x - 10 : n.x
          return (
            <g key={n.id}>
              <circle cx={dotX} cy={n.y} r={5} fill={dotColor} />
              <text
                x={n.x}
                y={n.y - 14}
                textAnchor={anchor}
                fill="white"
                fontSize="13"
                fontWeight="600"
                letterSpacing="1.5"
                fontFamily="inherit"
              >
                {n.label}
              </text>
              {n.sub && (
                <text
                  x={n.x}
                  y={n.y + 4}
                  textAnchor={anchor}
                  fill="#777777"
                  fontSize="11"
                  fontFamily="inherit"
                >
                  {n.sub}
                </text>
              )}
            </g>
          )
        })}
      </svg>
      <p className="htl3-constellation-note">
        → See HTL — Product Map frame on canvas for full-scale version
      </p>
    </figure>
  )
}

/** Workflow block — S07 */
interface WorkflowBlockProps {
  num: string
  title: string
  desc: string
  layout: 'dominant' | 'sequence' | 'twin' | 'wide'
  primary: { src: string; alt: string }
  secondary?: { src: string; alt: string }
  tertiary?: { src: string; alt: string }
}

function WorkflowBlock({ num, title, desc, layout, primary, secondary, tertiary }: WorkflowBlockProps) {
  return (
    <div className={`htl3-workflow htl3-workflow--${layout}`}>
      <div className="htl3-workflow__header">
        <span className="htl3-workflow__num font-display" aria-hidden="true">{num}</span>
        <div>
          <h3 className="htl3-workflow__title">{title}</h3>
          <p className="htl3-workflow__desc">{desc}</p>
        </div>
      </div>
      <div className="htl3-workflow__media">
        <figure className="htl3-workflow__fig htl3-workflow__fig--primary">
          <img src={primary.src} alt={primary.alt} loading="lazy" decoding="async" />
        </figure>
        {secondary && (
          <figure className="htl3-workflow__fig htl3-workflow__fig--secondary">
            <img src={secondary.src} alt={secondary.alt} loading="lazy" decoding="async" />
          </figure>
        )}
        {tertiary && (
          <figure className="htl3-workflow__fig htl3-workflow__fig--tertiary">
            <img src={tertiary.src} alt={tertiary.alt} loading="lazy" decoding="async" />
          </figure>
        )}
      </div>
    </div>
  )
}
