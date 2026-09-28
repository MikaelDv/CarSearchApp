// Identidade visual única do CarSearch: todas as telas e componentes
// consomem estes tokens em vez de cores/tamanhos soltos.
export const colors = {
  background: "#0F172A",
  surface: "#1E293B",
  surfaceAlt: "#334155",
  border: "#334155",
  primary: "#2563EB",
  accent: "#3B82F6",
  success: "#22C55E",
  danger: "#EF4444",
  fordBlue: "#102B4E",
  text: "#FFFFFF",
  textMuted: "#94A3B8",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

export const radius = {
  md: 10,
  lg: 16,
  pill: 20,
};

export const typography = {
  display: { fontSize: 32, fontWeight: "bold", color: colors.text },
  title: { fontSize: 22, fontWeight: "bold", color: colors.text },
  overline: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.accent,
    letterSpacing: 2,
  },
  section: { fontSize: 16, fontWeight: "bold", color: colors.text },
  body: { fontSize: 14, color: colors.text },
  caption: { fontSize: 12, color: colors.textMuted },
  button: { fontSize: 16, fontWeight: "bold", color: colors.text },
};
