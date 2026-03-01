import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        foreground: "#fafafa",
        muted: {
          DEFAULT: "#171717",
          foreground: "#737373",
        },
        accent: {
          neon: "#00ff88",
          electric: "#00d4ff",
          "neon-alt": "#39ff14",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(0, 255, 136, 0.3)",
        "glow-hover": "0 0 30px rgba(0, 255, 136, 0.5)",
        "glow-blue": "0 0 20px rgba(0, 212, 255, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
