import type { CaseStudyBlock } from '../caseStudyBlocks'

/**
 * Skrewww case-study content stream.
 * Facts: live Pro Figma audit (U6KUuNf7DF4CP9QBOkLSUx, Sep 2026) + skrewwwDS repo evidence.
 * Figma visuals: real exports under /images/case-studies/skrewww/evidence/.
 * Volatile CI/test counts omitted. Free/Pro packaging set-counts not claimed.
 */
export const skrewwwBlocks: CaseStudyBlock[] = [
  {
    type: 'text',
    id: 'sk-thesis',
    size: 'lg',
    content:
      'A design system built to connect Figma, design tokens, reusable components, documentation and React into one coherent design-to-code foundation — readable by designers, developers, and coding agents.',
  },
  {
    type: 'callout',
    id: 'sk-impact-note',
    tone: 'note',
    title: 'Impact posture',
    content:
      'Public system released. Current evidence focuses on system scale, parity, contract quality and implementation maturity rather than mature commercial adoption metrics.',
  },
  {
    type: 'metrics',
    id: 'sk-summary-metrics',
    description:
      'Verified scope — documented components and agent contracts from the public platform; variable totals from live Skrewww Pro Figma (Sep 2026). Not all 225 variables are equally mature foundation tokens.',
    items: [
      { metric: 'Documented components', value: '66' },
      { metric: 'Pro Figma variables', value: '225 / 7' },
      { metric: 'Agent contracts', value: '55' },
      { metric: 'Platform release', value: '1.0 · Live' },
    ],
  },
  {
    type: 'pipeline',
    id: 'sk-system-pipeline',
    caption:
      'Working model: design intent resolves through tokens and React, stays documented, and becomes agent-readable — then validated where claims are checkable.',
    items: [
      { label: 'Figma', detail: 'Components & properties' },
      { label: 'Tokens', detail: 'Primitive → semantic' },
      { label: 'React', detail: 'Shared implementations' },
      { label: 'Documentation', detail: 'Authored registry / docs' },
      { label: 'Agent contracts', detail: '55 machine-readable' },
      { label: 'Guard', detail: 'Claim validation · Beta' },
    ],
  },

  // ── Context ────────────────────────────────────────────────────────
  {
    type: 'heading',
    id: 'sk-context',
    label: 'Context',
    content: 'Why a connected system was needed',
  },
  {
    type: 'text',
    id: 'sk-context-p',
    content:
      'Most product teams treat Figma libraries, design tokens, documentation and production components as adjacent artifacts. Over time they drift: properties diverge, docs describe behavior the code no longer matches, and one-off values replace shared rules. When AI coding tools enter the workflow, that drift compounds — models invent plausible props, claim installability that is not real, or rebuild components the system already owns.',
  },
  {
    type: 'heading',
    id: 'sk-problem',
    label: 'Problem',
    content: 'The system failure mode',
    level: 3,
  },
  {
    type: 'list',
    id: 'sk-problem-list',
    label: 'Core problems',
    items: [
      'Figma and production components diverge without a shared contract',
      'Tokens, components and code behave like separate systems instead of one resolution chain',
      'Component properties stay inconsistent across design and implementation',
      'Documentation disconnects from actual component behavior',
      'AI-assisted development amplifies inconsistency when system rules are unclear or unreadable',
    ],
  },
  {
    type: 'heading',
    id: 'sk-why',
    label: 'Why it mattered',
    content: 'What was at stake',
    level: 3,
  },
  {
    type: 'text',
    id: 'sk-why-p',
    content:
      'Without machine-readable rules and a deliberate design-to-code model, every new surface (shape, brand, industry) risks becoming a fork. Skrewww was built so the same components adapt through tokens — never forks — and so agents can check a current contract before generating UI.',
  },

  // ── Ownership ──────────────────────────────────────────────────────
  {
    type: 'heading',
    id: 'sk-ownership',
    label: 'Ownership',
    content: 'What I owned vs how AI helped',
  },
  {
    type: 'features',
    id: 'sk-owned',
    items: [
      {
        name: 'I owned',
        description:
          'System architecture; token taxonomy; component model; visual foundations; Figma component structure; interaction and accessibility-aware state definitions; documentation direction; design-to-code parity model; product direction across Free/Pro Figma and the public platform.',
      },
      {
        name: 'AI / engineering assistance',
        description:
          'AI coding agents were used as implementation partners against authored contracts — not as autonomous system designers. Agent Kit and Guard exist specifically so agents read current facts instead of inventing APIs, maturity or installability.',
      },
    ],
  },

  // ── Figma Button architecture ──────────────────────────────────────
  {
    type: 'heading',
    id: 'sk-figma-button',
    label: 'Figma evidence',
    content: 'Canonical Button architecture',
  },
  {
    type: 'text',
    id: 'sk-figma-button-p',
    content:
      'Live Skrewww Pro audit (file U6KUuNf7DF4CP9QBOkLSUx): canonical component set Actions/Button — node 2012:7752 — on the Actions page. Style × Size × State yields 45 variants. Teaching presentation below is Presentation V2 (node 2966:1187).',
  },
  {
    type: 'image',
    id: 'sk-button-figma',
    src: '/images/case-studies/skrewww/_presentation/button-presentation-v2.webp',
    alt: 'Skrewww Figma Presentation V2: Button styles, sizes, states, and icon examples',
    caption:
      'Real Figma export — Presentation V2 (2966:1187). Style (Primary / Secondary / Danger), Size (S / M / L), State (Default → Disabled), leading/trailing icons.',
    width: 'full',
    zoom: true,
  },
  {
    type: 'features',
    id: 'sk-button-figma-props',
    items: [
      {
        name: 'Verified variant axes',
        description: 'Style: Primary · Secondary · Danger. Size: Small · Medium · Large. State: Default · Hover · Pressed · Focused · Disabled.',
      },
      {
        name: 'Verified properties',
        description:
          'Label (text). Show leading icon + Leading Icon (instance-swap). Show trailing icon + Trailing Icon (instance-swap). Focus Ring on Focused uses semantic/focus-ring. Radius binds to component/radius/control (Shape).',
      },
    ],
  },

  // ── Token evidence ─────────────────────────────────────────────────
  {
    type: 'heading',
    id: 'sk-tokens',
    label: 'Tokens',
    content: 'Verified brand → semantic → Button fill',
  },
  {
    type: 'text',
    id: 'sk-tokens-p',
    content:
      'Live Pro Figma holds 225 variables across 7 collections (Primitive 133 · Semantic 26 · Component 1 · Brand 1 · Shape 5 · Surface 58 · Button Style 1). The durable product story is the resolution chain — not treating every variable as equally mature.',
  },
  {
    type: 'pipeline',
    id: 'sk-token-pipeline',
    caption:
      'Flat / Gradient primary fill. Hover uses color/brand/600 (#5638D6) directly. Glass uses translucent values — not this alias chain.',
    items: [
      { label: 'color/brand/500', detail: '#6C4CF2' },
      { label: 'semantic/action/primary', detail: 'aliases brand/500' },
      { label: 'component/button/primary/background', detail: 'Surface collection' },
      { label: 'Primary Button', detail: 'bound fill' },
    ],
  },
  {
    type: 'image',
    id: 'sk-token-brand-scale',
    src: '/images/case-studies/skrewww/evidence/tokens-brand-scale.webp',
    alt: 'Figma Primitive brand color scale: brand/50 #F1EEFE through brand/900 #1E1252, with brand/500 #6C4CF2 and brand/600 #5638D6 highlighted',
    caption: 'Primitive brand scale (2002:2618) — brand/500 = #6C4CF2; brand/600 = #5638D6.',
    width: 'full',
    zoom: true,
  },
  {
    type: 'image',
    id: 'sk-token-semantic',
    src: '/images/case-studies/skrewww/evidence/tokens-semantic-light.webp',
    alt: 'Figma Semantic Light tokens: action/primary, action/danger, feedback/success, feedback/warning, focus-ring, background/primary, text/primary and more',
    caption: 'Semantic Light (2002:2724) — action/primary aliases brand/500.',
    zoom: true,
  },
  {
    type: 'callout',
    id: 'sk-token-glass-note',
    tone: 'note',
    title: 'Glass exception',
    content:
      'On Surface mode Glass, component/button/primary/background resolves to translucent #6C4CF2 (~18%) rather than the semantic alias. Hover Glass uses translucent brand/600 (~24%). Do not present Glass as the same chain as Flat/Gradient.',
  },

  // ── Figma ↔ React ──────────────────────────────────────────────────
  {
    type: 'heading',
    id: 'sk-parity',
    label: 'Figma ↔ React',
    content: 'Button parity — verified, not assumed',
  },
  {
    type: 'text',
    id: 'sk-parity-p',
    content:
      'Same component, two surfaces of truth. Figma is the design contract; React is the implementation API. They align on style, size, state behavior, icons, focus, disabled, and ambient Shape/Surface — and deliberately diverge where code needs capabilities Figma does not model as props.',
  },
  {
    type: 'code',
    id: 'sk-parity-react-api',
    tone: 'code',
    title: 'components/ui/Button.tsx — React API (excerpt)',
    language: 'ts',
    content: `export type ButtonVariant = "primary" | "secondary" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

type SharedButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  children: ReactNode;
};`,
    caption: 'Real excerpt from skrewwwDS. Link mode adds href / target; icon-only requires aria-label.',
  },
  {
    type: 'code',
    id: 'sk-parity-react-css',
    tone: 'code',
    title: 'button.module.css — focus + token consumption (excerpt)',
    language: 'css',
    content: `.button:focus-visible {
  outline: 2px solid var(--semantic-focus-ring);
  outline-offset: 0; /* matches Figma Focus Ring — no gap */
}

.button {
  border-radius: var(--component-button-radius-control);
}`,
    caption: 'Focus and radius bind to the same semantic/Shape tokens verified in Figma.',
  },
  {
    type: 'features',
    id: 'sk-parity-table',
    items: [
      {
        name: 'Parity',
        description:
          'Style ↔ variant. Size ↔ sm/md/lg. State behavior (hover/pressed/focus/disabled). Leading + trailing icons (Figma BOOLEAN + INSTANCE_SWAP; React leadingIcon / trailingIcon). Focus ring ↔ semantic/focus-ring. Disabled opacity. Ambient Shape (component/radius/control) and Surface fills.',
      },
      {
        name: 'React-only',
        description:
          'loading, fullWidth, href/target link mode, aria-label. These are implementation concerns — not Figma component properties on Actions/Button.',
      },
      {
        name: 'Honesty note',
        description:
          'Live audit confirms trailing icon in Figma (BOOLEAN + INSTANCE_SWAP) and canonical node 2012:7752. Generated button.json may still show figma.verified: false and a trailing-icon open question until the Skrewww contract pipeline is regenerated — portfolio parity follows the audit, not stale contract fields.',
      },
    ],
  },

  // ── Shape / Surface ────────────────────────────────────────────────
  {
    type: 'heading',
    id: 'sk-modes',
    label: 'Style systems',
    content: 'Shape and Surface as ambient modes',
  },
  {
    type: 'text',
    id: 'sk-modes-p',
    content:
      'Shape (Sharp · Rounded · Pill · Squircle · Brand Shape) and Surface (Flat · Gradient · Glass) restyle the same components through tokens — not per-component Style forks. Style Systems status on the public architecture remains “validated on 3.”',
  },
  {
    type: 'image',
    id: 'sk-shape-modes',
    src: '/images/case-studies/skrewww/evidence/shape-modes.webp',
    alt: 'Figma Shape modes: Sharp, Rounded, Pill, and Squircle applied to shared components',
    caption: 'Real Figma export — Shape mode rows (Sharp · Rounded · Pill · Squircle).',
    width: 'full',
    zoom: true,
  },
  {
    type: 'image',
    id: 'sk-surface-modes',
    src: '/images/case-studies/skrewww/evidence/surface-modes.webp',
    alt: 'Figma Surface modes: Flat, Gradient, and Glass',
    caption: 'Real Figma export — Surface Flat (2003:3241), Gradient (2003:3249), Glass (2003:3263).',
    width: 'full',
    zoom: true,
  },

  // ── Four-layer architecture ────────────────────────────────────────
  {
    type: 'heading',
    id: 'sk-architecture',
    label: 'System architecture',
    content: 'Four layers with real status',
  },
  {
    type: 'text',
    id: 'sk-arch-intro',
    content:
      'Skrewww scopes every decision to one of four platform layers. Status on the public site is current reality: Foundation and Component Library are complete; Style Systems are validated on a small set first; Industry Systems start as pilots that inherit the core.',
  },
  {
    type: 'image',
    id: 'sk-arch-visual',
    src: '/images/case-studies/skrewww/system.webp',
    alt: 'Skrewww system diagram: component modes flowing into premium output',
    caption:
      'Existing narrative system overview — Shape and Surface restyle the same component through tokens rather than forking libraries.',
    width: 'full',
    zoom: true,
  },
  {
    type: 'steps',
    id: 'sk-layers',
    items: [
      {
        label: '01 · Foundation',
        detail: 'Tokens, color, type, spacing, radius, elevation, motion, icons, accessibility',
        status: 'Complete',
      },
      {
        label: '02 · Component Library',
        detail: 'Actions, Forms, Navigation, Feedback, Containers & Overlays, Content & Data',
        status: 'Complete',
      },
      {
        label: '03 · Style Systems',
        detail: 'Shape (Sharp / Rounded / Pill / Squircle / Brand) · Surface (Flat / Gradient / Glass)',
        status: 'Validated on 3',
      },
      {
        label: '04 · Industry Systems',
        detail: 'Banking pilot first — inherit from core, never fork it',
        status: 'Banking pilot · 3',
      },
    ],
  },

  // ── Decisions (kept, lightly updated token wording) ────────────────
  {
    type: 'heading',
    id: 'sk-decisions',
    label: 'Decisions',
    content: 'System decisions with trade-offs',
  },
  {
    type: 'decision',
    id: 'sk-d1',
    title: 'Token architecture: primitive vs semantic',
    evidence:
      'Teams often mix hex codes, local Figma styles and production CSS variables. That makes theming and AI-assisted edits brittle because there is no single resolution path.',
    options: [
      'Let components own local values for speed',
      'Publish only primitives and hope teams alias correctly',
      'Enforce Primitive → Semantic → (sparse) Component, with components consuming semantic / Surface roles',
    ],
    decision:
      'Components consume semantic (and Surface component/*) tokens. Primitives stay raw. Button primary fill resolves brand/500 → semantic/action/primary → component/button/primary/background on Flat/Gradient.',
    tradeoff:
      'Authors must maintain alias discipline. Glass uses translucent literals by design. Component-level collection stays intentionally sparse.',
    result:
      'Live Pro Figma: 225 variables across 7 collections. Documented chain matches tokens.css and Figma — not the outdated brand/600 → #6C4CF2 copy.',
  },
  {
    type: 'decision',
    id: 'sk-d2',
    title: 'Shape / Surface as ambient modes, not per-component props',
    evidence:
      'Supporting Sharp, Rounded, Pill, Squircle plus Flat, Gradient, Glass as component variants would explode matrices and break API parity between Figma and React.',
    options: [
      'Encode every shape × surface combo as component variants',
      'Ship separate forked libraries per visual personality',
      'Treat Shape and Surface as document/parent context driven by tokens; validate on a small set first',
    ],
    decision:
      'Shape and Surface are ambient modes. Agent system policy tells agents not to invent mode support from appearance alone. Style Systems status is honestly “validated on 3 components.”',
    tradeoff:
      'Full visual coverage lags the broader component library. Some components remain Surface N/A. Glass/Squircle complexity stays gated until parity is proven.',
    result:
      'Homepage architecture states Style Systems validation scope explicitly. Figma Shape/Surface pages document the mode model used in the portfolio captures above.',
  },
  {
    type: 'decision',
    id: 'sk-d3',
    title: 'AI-first contracts instead of model memory',
    evidence:
      'Coding agents invent props, claim components are installable, and confuse Stable vs Beta when they rely on training data instead of current system facts.',
    options: [
      'Rely on README prose and hope agents read it',
      'Ship a custom MCP server immediately',
      'Compile machine-readable contracts + Skill from the same registry/docs sources, with never-invent rules',
    ],
    decision:
      'Agent Kit compiles contracts from the canonical registry and authored docs. Agents must check /agent/contracts before use. Trust order puts registry/docs above model memory. Agent Kit Beta is separate from per-component Stable/Beta.',
    tradeoff:
      'Only a subset of implemented components is distributed via @skrewww today. No custom Skrewww MCP in Beta. Agents that skip contracts can still fail.',
    result:
      'Public Beta publishes 55 contracts, a Skill, Recipes and project-context rules. Internal 14-case evaluation reported hard design-system errors falling from 35 to 1 with Agent Kit on — a small, non-universal suite.',
  },
  {
    type: 'decision',
    id: 'sk-d4',
    title: 'Guard scope: claim validation, not a universal checker',
    evidence:
      'Teams asked for protection against invented components, false Stable claims and false installability. Expanding into TypeScript, a11y and Figma parity would over-promise and create noisy CI.',
    options: [
      'Build an all-in-one design-system linter',
      'Skip tooling and rely on review',
      'Ship a narrow offline CLI with three public consumer rules and explicit non-goals',
    ],
    decision:
      'Guard validates selected canonical-contract claims offline. Public rules: nonexistent slug, false Stable claim, false installable-via-registry claim.',
    tradeoff:
      'Guard does not validate arbitrary props, WCAG, Shape/Surface, or Figma parity. CI adoption is observe-only first — not a required gate yet.',
    result:
      '@skrewww/guard@0.1.0-beta.1 published; real CLI failures captured from fixture claims (see Guard section).',
  },

  // ── Agent Kit ──────────────────────────────────────────────────────
  {
    type: 'heading',
    id: 'sk-agent-kit',
    label: 'Agent Kit',
    content: 'Why Skrewww is AI-first',
  },
  {
    type: 'text',
    id: 'sk-agent-kit-p',
    content:
      'AI does not make design systems “faster” by default — it makes ambiguous systems fail louder. Agent Kit responds with predictable naming, explicit component contracts, machine-readable docs, deterministic never-invent rules, and a trust order that puts registry/docs above model memory.',
  },
  {
    type: 'pipeline',
    id: 'sk-agent-pipeline',
    caption:
      'Trust path for agents — consume canonical system knowledge instead of inventing component behavior. Agent Kit is Beta; it guides generation and does not replace design review.',
    items: [
      { label: 'Component', detail: 'Allow-listed slug' },
      { label: 'Contract', detail: 'api.properties allow-list' },
      { label: 'Skill / Recipe', detail: 'How to use safely' },
      { label: 'Agent', detail: 'Generate against facts' },
    ],
  },
  {
    type: 'metrics',
    id: 'sk-agent-metrics',
    description: 'Public Agent Kit Beta scope.',
    items: [
      { metric: 'Agent contracts', value: '55' },
      { metric: 'Status', value: 'Beta' },
    ],
  },
  {
    type: 'code',
    id: 'sk-agent-trust',
    tone: 'code',
    title: 'public/agent/skill/SKILL.md — Trust order (excerpt)',
    language: 'markdown',
    content: `When sources disagree, higher wins:

1. Canonical repository source (registry + authored docs + Recipes)
2. Generated Agent Kit component contracts
3. Generated Recipes / Feature Kits
4. Public registry / distribution surfaces
5. The consumer project
6. Model memory of Skrewww's API

Component contracts always beat Recipes.`,
    caption: 'Genuine Skill excerpt — agents must not invent APIs from memory.',
  },
  {
    type: 'code',
    id: 'sk-agent-contract',
    tone: 'code',
    title: 'public/agent/contracts/button.json — API allow-list (excerpt)',
    language: 'json',
    content: `{
  "slug": "button",
  "status": "stable",
  "api": {
    "properties": [
      { "name": "variant", "type": "\\"primary\\" | \\"secondary\\" | \\"danger\\"" },
      { "name": "size", "type": "\\"sm\\" | \\"md\\" | \\"lg\\"" },
      { "name": "loading", "type": "boolean" },
      { "name": "leadingIcon", "type": "ReactNode" },
      { "name": "trailingIcon", "type": "ReactNode" }
    ]
  }
}`,
    caption:
      'Real contract excerpt. Portfolio Figma parity uses the live audit (node 2012:7752); do not treat stale figma.verified / openQuestions fields as current Figma truth.',
  },
  {
    type: 'code',
    id: 'sk-agent-recipe',
    tone: 'code',
    title: 'public/agent/recipes/destructive-confirmation.json — Recipe (excerpt)',
    language: 'json',
    content: `{
  "id": "destructive-confirmation",
  "requiredComponents": ["dialog", "button"],
  "workflow": [{
    "id": "actions",
    "guidance": "Use Button variant danger for confirm; secondary for cancel."
  }]
}`,
    caption: 'Recipes compose contracts — they never override api.properties.',
  },
  {
    type: 'metrics',
    id: 'sk-agent-eval-viz',
    description:
      'Internal Agent Kit evaluation — 14 test cases. Small suite only; not an external benchmark.',
    items: [
      { metric: 'Hard DS errors · Kit off', value: '35' },
      { metric: 'Hard DS errors · Kit on', value: '1' },
      { metric: 'Internal test cases', value: '14' },
    ],
  },
  {
    type: 'callout',
    id: 'sk-agent-eval',
    tone: 'note',
    title: 'Limitation — small internal evaluation',
    content:
      'This 35 → 1 result is a small internal evaluation across 14 cases — not production reliability, not an external benchmark, and not universal across agents or tasks. Limitations are disclosed on /agent-kit.',
  },

  // ── Guard ──────────────────────────────────────────────────────────
  {
    type: 'heading',
    id: 'sk-guard',
    label: 'Guard',
    content: '@skrewww/guard — claim validation',
  },
  {
    type: 'text',
    id: 'sk-guard-p',
    content:
      'Guard is a narrow offline/local CLI that validates selected canonical-contract claims. Published as @skrewww/guard@0.1.0-beta.1. Provenance uses @skrewww-component markers from registry installs. CI usage is observe-only first — not a required gate yet.',
  },
  {
    type: 'metrics',
    id: 'sk-guard-metrics',
    description: 'Public Guard Beta posture.',
    items: [
      { metric: 'Package', value: '@skrewww/guard' },
      { metric: 'Status', value: '0.1.0-beta.1' },
      { metric: 'Public claim rules', value: '3' },
      { metric: 'Runtime', value: 'Offline / local' },
    ],
  },
  {
    type: 'list',
    id: 'sk-guard-rules',
    label: 'Three public consumer rules',
    items: [
      'component/nonexistent-slug',
      'maturity/false-stable-claim',
      'distribution/false-installable-claim',
    ],
  },
  {
    type: 'code',
    id: 'sk-guard-cli',
    tone: 'terminal',
    title: 'Authentic CLI output — @skrewww/guard 0.1.0-beta.1',
    language: 'bash',
    content: `$ node packages/guard/dist/cli.js lib/guard/__fixtures__/g2 \\
    --claims lib/guard/__fixtures__/g2/claims-violations.json

ERROR distribution/false-installable-claim
claims/false-installable.json
Claimed "banking-account-card" is installable via the @skrewww registry, but it is implemented and deliberately not distributed.
Fix: Do not claim "banking-account-card" is installable via the Skrewww registry until it is distributed.

ERROR maturity/false-stable-claim
claims/false-stable.json
Claimed "date-picker" is Stable, but its real canonical status is "beta".
Fix: Correct the structured maturity metadata for "date-picker" to match its canonical status, or promote the component first.

Guard: 2 errors in 2 files`,
    caption:
      'Unaltered output from the published public CLI against existing fixtures. Exit code 1.',
  },
  {
    type: 'features',
    id: 'sk-guard-limits',
    items: [
      {
        name: 'What Guard is',
        description:
          'An offline claim validator for selected contract facts — a concrete engineering artifact with three public consumer rules.',
      },
      {
        name: 'What Guard is not',
        description:
          'Not a TypeScript checker. Not an accessibility checker. Not a Figma checker. Not a visual checker. Not a universal design-system linter.',
      },
    ],
  },

  // ── Accessibility ──────────────────────────────────────────────────
  {
    type: 'heading',
    id: 'sk-a11y',
    label: 'Accessibility & states',
    content: 'Accessibility-aware behavior in the system',
  },
  {
    type: 'text',
    id: 'sk-a11y-p',
    content:
      'Skrewww treats WCAG 2.2 AA as a target baseline for generated UI and component guidance — not a blanket “compliant” claim for every surface. Button guidance requires a real <button> or link, keyboard activation, and semantic/focus-ring. Disabled state must not be the only explanation of unavailability.',
  },
  {
    type: 'list',
    id: 'sk-a11y-list',
    label: 'Accessibility evidence',
    items: [
      'Focus, hover, pressed, disabled and loading states modeled for core actions',
      'Danger / warning semantics carried through variants and feedback components',
      'Native-first form controls where HTML can express the interaction; custom controls when it cannot',
      'Agent system policy: never convey meaning by color alone; preserve real accessible names',
      'Figma Focused state includes a Focus Ring bound to semantic/focus-ring',
    ],
  },

  // ── Validation ─────────────────────────────────────────────────────
  {
    type: 'heading',
    id: 'sk-validation',
    label: 'Validation',
    content: 'Output vs proof',
  },
  {
    type: 'features',
    id: 'sk-validation-split',
    items: [
      {
        name: 'Output (system scale)',
        description:
          '66 documented components; live Pro Figma foundations (225 variables / 7 collections); 55 Agent contracts; public docs platform 1.0; open-source MIT React codebase.',
      },
      {
        name: 'Validation (proof)',
        description:
          'Figma ↔ React parity verified for Button via live audit + source; Agent Kit contract compilation; Guard Beta CLI with fixture-proven claim failures; observe-only CI posture for Guard.',
      },
    ],
  },
  {
    type: 'callout',
    id: 'sk-validation-note',
    tone: 'note',
    content:
      'Repository test counts move with the codebase. This case study does not freeze Vitest or CI numbers into portfolio copy. Durable proof is that validation layers exist and are publicly documented.',
  },

  // ── Impact ─────────────────────────────────────────────────────────
  {
    type: 'heading',
    id: 'sk-impact',
    label: 'Impact',
    content: 'What changed — and what is still early',
  },
  {
    type: 'features',
    id: 'sk-impact-split',
    items: [
      {
        name: 'System / team impact',
        description:
          'Shared naming and contracts across Figma, tokens, React and docs; token-driven restyling instead of forks; explicit Stable/Beta maturity; Agent-readable rules that reduce invented APIs under tested conditions.',
      },
      {
        name: 'Product / public impact',
        description:
          'Public site live; Figma Free/Pro packaging as separate deliverables (set counts not claimed here); open-source MIT codebase; Agent Kit and Guard published in Beta. Mature adoption, downloads and revenue metrics are not claimed.',
      },
    ],
  },

  // ── Trade-offs ─────────────────────────────────────────────────────
  {
    type: 'heading',
    id: 'sk-limits',
    label: 'Trade-offs',
    content: 'Constraints that shaped the system',
  },
  {
    type: 'list',
    id: 'sk-limits-list',
    label: 'Limitations',
    items: [
      'Style Systems validated on 3 components before broader rollout — coverage vs quality trade-off',
      'Industry Systems start as pilots (Banking) to avoid premature forks',
      'Free vs Pro Figma packaging is separate from the MIT code repo — marketing set-counts are not asserted here',
      'Glass / Squircle and Gradient modes add visual flexibility at the cost of parity work',
      'Not every implemented React component is registry-distributed yet',
      'Agent Kit and Guard are Beta integration layers; they guide and check — they do not replace design review',
      'Generated agent contracts can lag live Figma until regeneration (e.g. Button figma.verified)',
    ],
  },

  // ── Reflection ─────────────────────────────────────────────────────
  {
    type: 'heading',
    id: 'sk-reflection',
    label: 'Reflection',
    content: 'What this work changed for me',
  },
  {
    type: 'text',
    id: 'sk-reflection-p',
    content:
      'At this scale, the hard problem is not drawing another component — it is keeping Figma, tokens, docs, React and agents synchronized without pretending maturity you have not earned. I would keep investing in contract compilation and narrow validation (Guard) before expanding visual modes. The next system-level problem is broader Style System validation and honest distribution coverage, without letting Industry pilots fork the core.',
  },

  // ── Ending CTAs ────────────────────────────────────────────────────
  {
    type: 'heading',
    id: 'sk-next',
    label: 'Next',
    content: 'Continue',
  },
  {
    type: 'cta-pair',
    id: 'sk-ctas',
    primary: {
      label: 'View next product case study',
      href: '/case-studies/heard-mobile-app',
    },
    secondary: {
      label: 'Visit Skrewww ↗',
      href: 'https://skrewww.com',
      external: true,
    },
  },
]
