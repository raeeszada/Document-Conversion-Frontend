import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#06080D",
          900: "#0B0E14",
          800: "#10141D",
          700: "#161B26",
          600: "#1F2635",
          500: "#2A3244",
        },
        paper: {
          100: "#F4F1EA",
          300: "#C7CBD6",
          500: "#8A93A6",
          700: "#5B6478",
        },
        amber: {
          400: "#FBBF24",
          500: "#F5B942",
          600: "#D99B1F",
        },
        teal: {
          300: "#7DF3E1",
          400: "#2DD4BF",
          500: "#14B8A6",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "grain": "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"120\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"2\" stitchTiles=\"stitch\"/></filter><rect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\" opacity=\"0.045\"/></svg>')",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(1.2deg)" },
        },
        driftSlow: {
          "0%, 100%": { transform: "translate(0px, 0px)" },
          "50%": { transform: "translate(24px, -18px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        stampIn: {
          "0%": { opacity: "0", transform: "scale(1.4) rotate(-8deg)" },
          "60%": { opacity: "1", transform: "scale(0.94) rotate(-8deg)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(-8deg)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        driftSlow: "driftSlow 14s ease-in-out infinite",
        fadeUp: "fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        shimmer: "shimmer 2.5s linear infinite",
        stampIn: "stampIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards",
      },
    },
  },
  plugins: [],
};
export default config;
