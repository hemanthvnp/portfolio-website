// The HV mark: an H whose crossbar dips into a V. Stems take ink, the crossbar takes the accent,
// both through the theme tokens. `gap` (bar floats 2 units clear of the stems) is for 48px and up;
// `heavy` (10-unit stems and bar) is for anything smaller, and always under 24px.
const CUTS = {
  gap: {
    stems: "M22 16h7v68h-7zM71 16h7v68h-7z",
    bar: "M31 53.25 L36.99 53.25 L50 79.27 L63.01 53.25 L69 53.25 L69 46.75 L58.99 46.75 L50 64.73 L41.01 46.75 L31 46.75Z",
  },
  heavy: {
    stems: "M22 16h10v68h-10zM68 16h10v68h-10z",
    bar: "M32 45 L44.05 45 L50 56.9 L55.95 45 L68 45 L68 55 L62.13 55 L50 79.27 L37.87 55 L32 55Z",
  },
};

export function Logo({ variant = "heavy", className }) {
  const { stems, bar } = CUTS[variant];
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="16 10 68 80" aria-hidden="true" focusable="false" className={className}>
      <path d={stems} className="fill-ink" />
      <path d={bar} className="fill-acc" />
    </svg>
  );
}
