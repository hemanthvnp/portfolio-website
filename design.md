# Design system: Hemanth Vasudev portfolio

Tokens live in `src/styles/theme.css`. This file explains the intent.

## Idea
Monochrome page, one warm signal. Orange is the accent: the primary button, the
one headline word, row numbers, chevrons, the pulse line. Proof numbers are
full ink, set large in mono: size carries them, not colour. Nothing else is
coloured. If everything shouts, nothing stands out.

Accent also marks interactive state, and only that: the focus ring, the
selection fill (solid accent, page-colour text), the active nav underline, the
link underline on hover, row titles (while the row's button is hovered, not its
open panel) and footer links on hover. Never a resting decoration: bullet
markers, the scrollbar and the 404 status line are ink.

## Palette

| Token     | Role                              | Light            | Dark             |
|-----------|-----------------------------------|------------------|------------------|
| `bg`      | Page                              | `#FBF6EC`        | `#0C0A09`        |
| `surface` | Raised panels (cards, readouts)   | `#FFFDF8`        | `#161412`        |
| `ink`     | All text, borders, fills          | `#1C1712`        | `#F5F4F2`        |
| `acc`     | Accent (orange)                   | `#C2410C`        | `#F26B43`        |

Every neutral leans warm, in both themes, so they sit with the accent. No pure
`#000` or `#fff`.

### Ink opacity scale (use only these)
| Opacity | Use                                   |
|---------|---------------------------------------|
| 100     | Headings, name, key numbers           |
| 80      | Body copy                             |
| 70      | Secondary text, labels, icons, scrollbar thumb |
| 10      | Hairlines, borders                    |
| 03      | Quiet fills (theme toggle hover)      |

Never go below 70 for text. Decorative-only elements may go lower. Control
outlines that carry the shape alone (the ghost button) use 70, 100 on hover; so
does the scrollbar thumb. The theme toggle's border goes 10 to 70 on hover,
because the 03 fill alone is too quiet to see.

### Contrast
Ink 70 on bg: 6.3:1 light, 8.9:1 dark. `acc` on bg: 4.8:1 light, 6.5:1 dark
(5.1 and 6.1 on `surface`), so it is safe for small text in both themes.
`surface` sits 1.06:1 off `bg` in light and 1.08:1 in dark. The primary button
label is 4.8:1 light, 6.5:1 dark, and hover only raises it: the fill mixes in
10% ink, so it is darker in light and brighter in dark. Re-measure if a value
changes.

## Type
Font stacks are the `--font-display`, `--font-sans` and `--font-mono` tokens in
`theme.css` (`font-display`, `font-sans`, `font-mono` as utilities); never write
a family name anywhere else. Two places have to: `src/styles/fonts.css`, which
declares the faces, and the OG image, which cannot read tokens.

The three families are self-hosted in `public/fonts`, with no third-party
request. Only Space Grotesk is preloaded, because it sets the hero headline; a
metric-matched Arial fallback holds the headline's line breaks until it lands.
The latin files have no `→`, which the readouts use, so Inter and JetBrains
Mono each carry a one-glyph file for it. Before using any other symbol, check
it is in the files.

- Display: Space Grotesk 700 (`.t-hero`, `.t-display`, `.t-h2`, `.t-row`), and the nav wordmark.
  Display sizes are fluid `clamp()` values; everything else sits on 12 / 14 / 16 / 20.
  Two exceptions: buttons are 15, and proof numbers are 30 (48 from `sm`).
  Sizes are in `rem` and the root is left at the reader's own setting.
- Tracking tightens with size: -0.035em hero, -0.03 display, -0.025 h2, -0.02 row titles.
  Row titles (`h3`, 20 to 24px) sit a clear step under section titles (`h2`, 24 to 32px).
- Line-height: 1.6 for running text at any size (`--leading-body`: `.t-body`, `.t-small`, `leading-body`);
  one-line UI labels keep Tailwind's default.
- Weights: 400 body, 500 links (nav, inline, footer), labels and text inside row buttons, 600 emphasis and buttons, 700 display and the three hero proof numbers.
- Body, nav, buttons, labels (`.eyebrow`), the About stack, the email: Inter
- JetBrains Mono has two jobs only: proof numbers (the stats, row numbers and
  row summaries) and the readout panels. It is not a third body font.

## Hierarchy (hero)
1 claim (h1) > 2 identity > 3 pulse line > 4 thesis > 5 action (CTAs) > 6 proof (stats row)

The hero fills the first screen, with more padding below than above so it sits
into the page; the stats row sits one scroll down, its rule peeking above the
fold, and the numbers count up as they arrive. Headline line breaks are set by
hand: the accent word leads line three and "matters." lands alone on the last.

The headline is its full 88px in any window 700px tall or more. Below that it
eases down (`min(8vw, 20svh - 3.25rem)`), and the hero padding (`.hero-pad`)
tightens in two steps (800px, then 704px), so the CTAs stay above the fold down
to a 1280x600 window without shrinking the headline everywhere else. The CTAs
take priority over the peeking rule: the rule shows above the fold from about
770px of height, and on phones from 667px.
Each stat counts from a number with as many digits as its final value, so the
unit beside it does not slide.

## Layout
One container (`.wrap`, 72rem). Everything, hero included, runs edge to edge
inside it: the pulse line and stats row end where the section content ends.
Each section: title on the left (sticky from `md`), content on the right.
Sections carry no number and no eyebrow above the title; the title names the
section. Only the project rows are numbered, because they are a list. Contact
is the exception to the two-column layout: it is the footer, stacked, and its
heading is `.t-display`.

Section padding is 64px (80 from `md`) by default and varies on purpose:
Experience is tighter (48 / 64), Projects is more open (80 / 96). Every section
has a 32px `scroll-margin-top`, so an anchor jump clears the floating nav. Spacing sits
on a 4px grid, with one exception: the nav bar's inner padding is 6px, which
keeps the round toggle from crowding the bar's edge. One radius, 8px (buttons,
readout panels, the nav bar); only the theme toggle is round. The 404 page uses the same parts: `.t-display`, readout
panel, primary button.

Nav is a compact bar floating at the top, as wide as its links, not a
full-width strip. It highlights the section across the middle of the viewport.
On phones it keeps about, work and contact; the resume link returns from `sm`.

Readout panels show measured figures only. No invented commands or status lines.
A row whose readout would only repeat its summary line has no readout.

Row titles are `h3`. The internship uses the same open/close row as the
projects, so the two sections read as one pattern; it starts open and, being a
list of one, carries no number.

## Motion
Feedback or order only. transform + opacity (+ clip-path for the pulse line),
<= 1.4 s, off under `prefers-reduced-motion`. One scroll-linked effect: the
accent pulse line travels along its rail over the first 360px of scroll. One
easing curve for CSS transitions, `--ease-out`.

The full inventory:
- Hero intro, on load: headline words rise in order, then the thesis and CTAs fade. Done by 1.4 s.
- The stats row: it fades up once (`Reveal`) and the numbers count to their value. Nothing else on the page reveals on scroll.
- Row open: the panel fades down 8px. Height is never animated; closing is instant.
- Feedback: button press, chevron turn, hover colour. A link has one hover signal, its underline turning accent.
- Inertia scrolling (Lenis) for wheel and anchor jumps; touch stays native.

No ambient loops, no parallax, no other scrub, no magnetic effects.

## Rules
- No new colours. Add a token here first. The favicon, OG image and `theme-color` use the same hex values.
  The favicon is a dark tile with accent letters so it holds up on light and dark browser chrome.
  `theme-color` follows the theme toggle, not just the OS setting.
  The OG image sets type as the hero does: Inter for the name, role and thesis, Space Grotesk for the claim.
  `og-image.png` is a 1200x630 render of `og-image.svg` with the files in `public/fonts`; re-render it when the SVG changes.
- Accent never used for decoration or tags.
- Page `overflow-x: clip`, never `hidden` (keeps `position: sticky` working).
- Buttons, nav links and the email link never wrap to a second line.
