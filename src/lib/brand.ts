export const brand = {
  background:     "#F7F3EC",
  backgroundSoft: "#F2EDE2",
  surface:        "rgba(255, 255, 255, 0.65)",
  surfaceStrong:  "rgba(255, 255, 255, 0.88)",
  text:           "#1A2418",
  textMuted:      "#6A6050",
  textSoft:       "#9A8A72",
  forest:         "#2E4A30",
  forestMid:      "#446E49",
  sage:           "#6F8F55",
  sageLight:      "#A8BC8E",
  gold:           "#C8881A",
  goldLight:      "#E0A84A",
  goldPale:       "rgba(200, 136, 26, 0.10)",
  border:         "rgba(30, 40, 32, 0.08)",
  borderMed:      "rgba(30, 40, 32, 0.12)",
  borderGold:     "rgba(200, 136, 26, 0.25)",
  glow:           "rgba(200, 136, 26, 0.12)",
  // Aliases for admin/shared components
  secondary:      "#446E49",
  primary:        "#6F8F55",
  accent:         "#C8881A",
  accentDeep:     "#9C6A2A",
} as const;

export const homeTypography = {
  eyebrow:      "text-[10px] tracking-[0.2em] uppercase font-sans font-normal",
  sectionTitle: "font-serif font-light leading-[1.08] tracking-[-0.02em]",
  sectionBody:  "font-sans font-light leading-[1.85]",
  cardTitle:    "font-serif font-normal leading-snug",
  cardBody:     "font-sans font-light leading-[1.8] text-sm",
  rule:         "w-10 h-px block",
} as const;
