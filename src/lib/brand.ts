export const colors = {
  background:     "var(--background)",
  backgroundSoft: "var(--background-soft)",
  surface:        "var(--surface)",
  surfaceStrong:  "var(--surface-strong)",
  text:           "var(--text)",
  textMuted:      "var(--text-muted)",
  textSoft:       "var(--text-soft)",
  forest:         "var(--forest)",
  forestMid:      "var(--forest-mid)",
  sage:           "var(--sage)",
  sageLight:      "var(--sage-light)",
  gold:           "var(--gold)",
  goldLight:      "var(--gold-light)",
  goldPale:       "var(--gold-pale)",
  goldGlow:       "var(--gold-glow)",
  border:         "var(--border)",
  borderGold:     "var(--border-gold)",
} as const;

export const typography = {
  // Eyebrow label above section titles
  eyebrow:
    "font-sans uppercase tracking-[0.18em] text-xs font-medium",

  // Main section headings — display serif
  sectionTitle:
    "font-serif text-4xl md:text-5xl font-light leading-[1.15] tracking-tight",

  // Hero headline — larger, more dramatic
  heroTitle:
    "font-serif text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight",

  // Body paragraphs under section titles
  sectionBody:
    "font-sans text-base font-light leading-relaxed",

  // Card headings
  cardTitle:
    "font-serif text-2xl md:text-3xl font-light",

  // Card body text
  cardBody:
    "font-sans text-sm font-light leading-relaxed",

  // Nav links
  navLink:
    "font-sans text-sm font-light tracking-wide uppercase",
} as const;

// Reusable card surface style
export const cardStyle = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
} as const;

// Gold accent card surface
export const cardStyleGold = {
  background: "var(--surface-strong)",
  border: "1px solid var(--border-gold)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
} as const;
