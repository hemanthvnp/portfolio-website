---
name: frontend-design
description: Design rules for this portfolio's UI — typography, spacing, color tokens, component patterns, motion. Use when building or editing any React component or styles.
---

# Frontend design rules

Stack: React 18, Vite, Tailwind v4, `motion` (Framer Motion), Space Grotesk + Inter + JetBrains Mono. Tokens live in `src/styles/theme.css`; intent is in `design.md`. Type and component classes (`.t-hero`, `.t-display`, `.t-h2`, `.t-row`, `.t-body`, `.t-small`, `.eyebrow`, `.btn`, `.wrap`, `.section`) live in `src/styles/index.css`.

## Typography
- Space Grotesk 700 for display; Inter for UI, body and labels; JetBrains Mono only for proof numbers and readout panels. Use the `--font-display` / `--font-sans` / `--font-mono` tokens (or the `font-display` / `font-sans` / `font-mono` utilities), never a literal family name. Fonts are self-hosted in `public/fonts` and declared in `src/styles/fonts.css`; the files cover latin plus `→` only, so check a new symbol is in them before using it.
- Text scale: 12 / 14 / 16 / 20 px (buttons are 15; proof numbers 30, 48 from `sm`). Display sizes are the fluid `clamp()` values already defined (`.t-hero`, `.t-display`, `.t-h2`, `.t-row`); reuse those, do not add new ones.
- Weights: 400 body, 500 links (nav, inline, footer) and text inside row buttons, 600 emphasis and buttons, 700 display and the three hero proof numbers. Tracking tightens with size, line-height 1.1–1.25 for display, 1.6 for running text (`leading-body`, already in `.t-body` and `.t-small`).
- Sizes in `rem`; never set a pixel font-size on `html`.
- Body line length ≤ 65ch.

## Spacing
- 4px base grid (Tailwind steps 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 24). Sections use `.section` (64px, 80px from `md`), varied per section with `py-*` utilities; panel padding `p-4`; gaps `gap-4/6/8`.
- Consistent container width and horizontal gutters across all pages.

## Color
- Use tokens only: `ink`, `paper`, `surface`, `acc`, plus the ink opacity scale 100 / 80 / 70 / 10 / 03 (`text-ink/70`, `border-ink/10`). Text never below 70. Never raw hex or one-off colors.
- Must work in light and dark (`.dark` flips `--c`/`--bg`). Verify both.
- One accent color, used sparingly for emphasis, CTAs and hover/focus/active state, never as resting decoration. Numbers are ink, not coloured.

## Components
- Buttons: `.btn .btn-primary` / `.btn .btn-ghost`; states: hover, focus-visible ring, active. 44px tall. Small links get `.tap` for a 44px hit area.
- Panels: `rounded-lg` (8px, same as buttons), 1px `border-ink/10`, `bg-surface`. Content order: title → body → action. No numbered eyebrows above section titles. Readouts show measured figures only, no invented commands. Prefer hairline-divided rows over card grids.
- Forms: label above input, visible focus ring, inline error text.
- Reuse the classes in `index.css` before creating new primitives.

## Motion (use `motion/react`)
- One scroll reveal on the whole page: the stats row (`Reveal`, with the count-up). Sections, lists and rows do not fade in on scroll.
- Hover/tap transitions on interactive elements (≤200ms, `--ease-out`), one hover signal per element. Animate `transform`/`opacity` only (never `height`); hover colour changes (`color`, `background-color`, `border-color`) are the one exception.
- No ambient loops.
- Respect `prefers-reduced-motion` (`useReducedMotion`).
- No parallax or magnetic effects. The hero pulse line is the only scroll-linked animation.

## Avoid the generic-AI look
- No purple-to-blue gradient heroes, no emoji as icons (use lucide), no centered-everything layouts, no uniform card grids with identical shadows.
- Prefer strong hierarchy, generous whitespace, asymmetry, and real content over filler.
- No lorem ipsum or placeholder copy.
