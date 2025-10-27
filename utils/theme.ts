// constants/theme.ts
export const COLORS = {
  // 🌈 Brand Core
  primary: "#1E88E5", // Blue - Right Path main color
  primaryDark: "#1565C0",
  secondary: "#43A047", // Green accent
  secondaryDark: "#2E7D32",
  accent: "#FFB300", // Amber for highlights

  // 🌤️ Gradients
  gradientPrimary: ["#1E88E5", "#43A047"],
  gradientSecondary: ["#64B5F6", "#A5D6A7"],
  // 🌸 Flower-inspired background gradient
gradientBackground: [
  "#FDEFF9", // soft pink
  "#E3F2FD", // sky blue
  "#F1F8E9", // mint green
  "#FFF8E1", // light yellow
],
gradientFloral: [
  "#FAD0C4", // light peach
  "#FFD1FF", // lilac pink
  "#A1C4FD", // pastel blue
],


  // 🧭 Semantic Colors
  success: "#4CAF50",
  error: "#E53935",
  warning: "#FB8C00",
  info: "#29B6F6",
  disabled: "#BDBDBD",
  cancelled: "#9E9E9E",

  // 🎨 Backgrounds
  backgroundLight: "#F7F9FC",
  backgroundDark: "#121212",
  surfaceLight: "#FFFFFF",
  surfaceCard: "#FAFAFA",

  // 🪶 Text Colors
  textDark: "#212121",
  textLight: "#FFFFFF",
  textGray: "#666666",
  textMuted: "#9E9E9E",

  // 🧱 Borders & Shadows
  border: "rgba(0,0,0,0.1)",
  borderLight: "rgba(255,255,255,0.2)",
  shadow: "rgba(0,0,0,0.15)",
  divider: "rgba(0,0,0,0.05)",
};

export const FONT = {
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semiBold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
  extraBold: "Poppins-ExtraBold",
};

export const SIZES = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 20,
  xxl: 28,
  radius: 12,
  cardRadius: 16,
  radiusLg: 20,
  padding: 24,
  margin: 20,
  elevation: 2,
};

export const TEXT = {
  h1: {
    fontSize: 28,
    fontFamily: FONT.bold,
    color: COLORS.textDark,
  },
  h2: {
    fontSize: 22,
    fontFamily: FONT.semiBold,
    color: COLORS.textDark,
  },
  h3: {
    fontSize: 18,
    fontFamily: FONT.medium,
    color: COLORS.textDark,
  },
  body: {
    fontSize: 14,
    fontFamily: FONT.regular,
    color: COLORS.textGray,
  },
  caption: {
    fontSize: 12,
    fontFamily: FONT.regular,
    color: COLORS.textMuted,
  },
};

export const BUTTON = {
  primary: {
    backgroundColor: COLORS.primary,
    textColor: COLORS.textLight,
    borderRadius: SIZES.radius,
    paddingVertical: 14,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
    textColor: COLORS.textLight,
    borderRadius: SIZES.radius,
  },
  disabled: {
    backgroundColor: COLORS.disabled,
    textColor: COLORS.textLight,
  },
  success: {
    backgroundColor: COLORS.success,
    textColor: COLORS.textLight,
  },
  error: {
    backgroundColor: COLORS.error,
    textColor: COLORS.textLight,
  },
};

export const CARD = {
  default: {
    backgroundColor: COLORS.surfaceLight,
    borderRadius: SIZES.cardRadius,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  elevated: {
    backgroundColor: COLORS.surfaceLight,
    borderRadius: SIZES.cardRadius,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  gradient: {
    gradientColors: COLORS.gradientSecondary,
    borderRadius: SIZES.cardRadius,
  },
};

// 🌍 Combine theme
export const THEME = {
  COLORS,
  FONT,
  SIZES,
  TEXT,
  BUTTON,
  CARD,
};

export default THEME;
