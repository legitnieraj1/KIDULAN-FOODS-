import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#153f32",
        kelp: "#0d2f28",
        cream: "#f4f0df",
        butter: "#facb48",
        saffron: "#f1a23b",
        coral: "#e7654f",
        salt: "#fffaf0",
        clay: "#a8573f"
      },
      fontFamily: {
        grotesk: ["var(--font-grotesk)", "Arial Black", "Impact", "sans-serif"],
        body: ["var(--font-body)", "Inter", "Arial", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"]
      },
      letterSpacing: {
        tightish: "0"
      },
      boxShadow: {
        soft: "0 24px 80px rgba(21, 63, 50, 0.16)",
        glow: "0 22px 70px rgba(250, 203, 72, 0.3)"
      },
      screens: {
        xs: "420px",
        "3xl": "1800px"
      }
    }
  },
  plugins: []
};

export default config;
