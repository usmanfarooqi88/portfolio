# Portfolio Redesign Plan — V2 (Minimal Editorial)

> **Status**: Phase 1 complete — audit done, plan ready.
> **Constraint**: Implement homepage only. Stop and wait for approval before case studies or deployment.

---

## 1. Codebase Audit

### Stack
| Layer | Current |
|---|---|
| Framework | React 19 + Vite 8 + TypeScript |
| Styles | Tailwind CSS v4 (`@tailwindcss/vite`), custom CSS modules |
| Animation | framer-motion v12 |
| Routing | react-router-dom v7 |
| Icons | lucide-react |
| Fonts | Inter (body), Syne (display) — self-hosted woff2 |
| Deploy | Vercel (project: `usman-farooqi-portfolio`) |

### Routes (src/App.tsx)
| Path | Component |
|---|---|
| `/` | HomePage |
| `/work` | WorkPage |
| `/about` | AboutPage |
| `/contact` | ContactPage |
| `/work/happytenant-landlord-v3` | HappyTenantLandlordV3 |
| `/work/happytenant-tenant` | HappyTenantTenant |
| (+ more case studies) | … |

### Design tokens (src/index.css)
```
--primary-orange:    #fa6c0b
--bright-orange:     #ff8c2a
--warm-background:   #f7f5f2   ← off-white page ground
--dark-navy:         #111111   ← primary text / footer
--muted-text:        #5f6368
--soft-border:       rgba(17,17,17,0.08)
--pure-white:        #ffffff
```
Dark mode via `html.dark` class — tokens flip in place.

### Current homepage sections
1. `Preloader` — opacity fade-in gate
2. `HeroSection` — text only, framer-motion stagger, CTA buttons
3. `ProjectsSection` (lazy) — 2-col featured grid + 4-col editorial archive
4. `BackgroundSection`
5. `AwardsSection`
6. `AboutPreview`
7. `ContactCTA`
8. `ExperimentsSection`

### Current layout
- **Desktop**: left sidebar rail (`w-52`, sticky, `border-r`) + content column
- **Mobile**: fixed header bar + overlay nav drawer
- **Footer**: dark-navy full-bleed, social links

### What changes with the redesign
| Area | Current | Target |
|---|---|---|
| Nav | Left sidebar rail | Minimal top bar (horizontal) |
| Hero | Text paragraph + CTAs | Editorial split: text left + facial illustration right |
| Illustration | None | Outlined SVG face — blink loop + cursor-follow head tilt |
| Work grid | `ProjectCard` evidence cards | Same cards; section header typography freshened |
| Footer | Dark navy with pill buttons | Minimal 1-line footer; keep links |
| Typography | Syne display + Inter body | Keep fonts; tighten tracking, reduce weight noise |
| Color | Orange + warm cream | Preserve brand; reduce orange noise in nav/footer |

---

## 2. New Component Map

```
src/
  components/
    layout/
      TopNav.tsx                 ← NEW  (replaces DesktopNavigationRail + MobileHeader)
      Footer.tsx                 ← EDIT (simplify)
    sections/
      HeroSection.tsx            ← EDIT (editorial split layout)
      ProjectsSection.tsx        ← EDIT (header copy tightened, otherwise intact)
    ui/
      FaceIllustration.tsx       ← NEW  (SVG + blink + cursor-follow)
  styles/
    redesign-v2.css              ← NEW  (scoped overrides for homepage)
```

Existing files preserved; case study CSS (`case-study-htl-v3.css` etc.) untouched.

---

## 3. Homepage Layout — Target

```
┌────────────────────────────────────────────────────────┐
│  Usman.          Work  About  Contact  ↗ CV     [mode] │  ← TopNav (sticky, minimal)
├────────────────────────────────────────────────────────┤
│                                                        │
│  Senior Product Designer           ╔══════════╗        │
│  ─────────────────────────         ║  FACE    ║        │
│  I make complex products           ║  SVG     ║        │
│  feel clear, useful,               ║  illus.  ║        │
│  and human.                        ╚══════════╝        │
│                                                        │
│  ● Available for new work · Lahore                     │
│                                                        │
│  View work ↓    Résumé ↗    Discuss →                  │
│                                                        │
├────────────────────────────────────────────────────────┤
│  Selected Work                                         │
│  [card] [card]                                         │
│  [card] [card]                                         │
│  [card] [card]                                         │
│  [card] [card]                                         │
│  View all →                                            │
├────────────────────────────────────────────────────────┤
│  About preview + link                                  │
├────────────────────────────────────────────────────────┤
│  Usman Farooqi.   Email · LinkedIn · Behance   © 2026  │  ← Footer (1 line)
└────────────────────────────────────────────────────────┘
```

---

## 4. Facial Illustration Spec

**What it is**: an outlined SVG of a face (head + shoulders) — line art, no fills, stroke only. Think editorial magazine portrait style.

**Strokes**: `#111111` (dark navy) at ~1.5px; single-weight line work.

**Animations** (framer-motion, `prefers-reduced-motion` gated):
1. **Blink**: every 3–5 s, eyelids close (upper lid path interpolates) over 120 ms, reopen 80 ms.
2. **Cursor follow**: on `mousemove`, pupils (small circles) shift ±4 px relative to cursor angle. Head frame tilts ±2 deg via CSS `rotate` transform — subtle, not cartoonish.

**Implementation strategy**:
- SVG paths in `FaceIllustration.tsx` as inline JSX
- `useMotionValue` + `useTransform` for tilt
- `useEffect` + `setInterval` for blink cycle
- Reduced-motion: static face, no movement

---

## 5. TopNav Spec

**Desktop** (sticky, `z-50`, `border-b border-[var(--soft-border)]`):
```
Usman.      [Work]  [About]  [Contact]  [↗ Résumé]     [theme toggle]
```
- `height: 56px`
- Wordmark: bold, links to `/`
- Nav links: `13px`, `font-medium`, orange underline on active
- Résumé: external arrow `↗`
- No left rail; `Layout.tsx` updated to remove sidebar

**Mobile**: same bar, hamburger collapses to overlay (reuse existing `MobileNavigation` drawer).

---

## 6. Implementation Order

1. **`TopNav.tsx`** — new minimal horizontal nav
2. **`Layout.tsx`** — remove `DesktopNavigationRail`, add `TopNav`; fix `pt-16` offset
3. **`FaceIllustration.tsx`** — SVG + blink + cursor-follow
4. **`HeroSection.tsx`** — editorial split, integrate `FaceIllustration`
5. **`redesign-v2.css`** — any layout overrides that Tailwind can't handle inline
6. **`Footer.tsx`** — simplify to minimal 1-row
7. **Homepage smoke-test** — `npm run dev`, screenshot, responsive check
8. **STOP — wait for approval**

---

## 7. Preservation Rules

- All case study routes and their CSS remain untouched
- `--primary-orange` and all existing tokens stay in `index.css`
- `ProjectCard` component unchanged
- Existing `ProjectsSection` grid unchanged; only section header copy may be adjusted
- All SEO `<meta>` tags and page titles unchanged
- `prefers-reduced-motion` gated on every animation

---

## 8. Pilot Case Study (post-approval)

Proposed first case study to convert to the new editorial template: **Skrewww** (`/work/skrewww`) — it has the most complete content and a video, making it a good template stress-test.

---

*Written after auditing: `package.json`, `src/App.tsx`, `src/pages/HomePage.tsx`, `src/components/sections/HeroSection.tsx`, `src/components/layout/Layout.tsx`, `src/components/layout/DesktopNavigationRail.tsx`, `src/components/layout/Footer.tsx`, `src/components/sections/ProjectsSection.tsx`, `src/components/ui/ProjectCard.tsx`, `src/index.css`, `src/data/profile.ts`, `src/data/projects.ts`, `src/data/featuredWork.ts`, `src/constants/links.ts`*
