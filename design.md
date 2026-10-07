# Design system: Hemanth Vasudev portfolio

Tokens live in `src/styles/theme.css`. This file explains the intent.

## Idea
Monochrome page, a warm signal. Orange is the accent: the primary button, the
one headline word, section numbers, chevrons, the pulse rules. Amber is for proof
only: the stats numbers. The heartbeat line is orange throughout. Green is
reserved for success status (`200 OK`). Nothing else is warm or green. If everything shouts, nothing stands out.

## Palette

| Token     | Role                              | Light            | Dark             |
|-----------|-----------------------------------|------------------|------------------|
| `bg`      | Page                              | `#FBF6EC`        | `#0A0A0B`        |
| `surface` | Raised panels (cards, readouts)   | `#FDFBF6`        | `#141416`        |
| `ink`     | All text, borders, fills          | `#1C1712`        | `#F4F4F5`        |
| `acc`     | Accent (orange)                   | `#C2410C`        | `#F26B43`        |
| `amb`     | Proof numbers (stats row)         | `#B45309`        | `#F0B040`        |
| `ok`      | Success status (`200 OK`) only    | `#15803D`        | `#4ADE80`        |

### Ink opacity scale (use only these)
| Opacity | Use                                   |
|---------|---------------------------------------|
| 100     | Headings, name, key numbers           |
| 80      | Body copy                             |
| 70      | Secondary text, labels, icons         |
| 10      | Hairlines, borders                    |
| 03      | Quiet fills                           |

Never go below 70 for text. Decorative-only elements may go lower.

### Contrast
Ink pairs were measured earlier (ink 70 on bg: 6.5:1 light, 8.9:1 dark). The
orange and amber values changed since; re-measure `acc` and `amb` on `bg` before
using them for small text.

## Type
- Display: Space Grotesk 700, tight tracking (`.font-display`, `.t-h2`)
- Body, nav, buttons: Inter
- Labels, proof numbers, code, the About stack: JetBrains Mono

## Hierarchy (hero)
1 claim (h1) > 2 identity > 3 pulse line > 4 thesis > 5 action (CTAs) > 6 proof (stats row)

## Layout
Each section: eyebrow number + title + one-line note on the left (sticky from
`md`), content on the right. Nav highlights the section across the middle of the
viewport.

## Motion
Feedback or order only. transform + opacity (+ clip-path for the pulse wipe),
<= 1.4 s, off under `prefers-reduced-motion`. Button press, link-icon nudge, stat
count-up, one shared scroll reveal. No parallax, no scrub, no magnetic effects.

## Rules
- No new colours. Add a token here first.
- Accent never used for decoration or tags.
- Page `overflow-x: clip`, never `hidden` (keeps `position: sticky` working).
