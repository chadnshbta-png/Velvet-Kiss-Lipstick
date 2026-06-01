import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        velvet: {
          black: "#0a0608",
          deep: "#120d0f",
          crimson: "#8B0000",
          rose: "#C41E3A",
          blush: "#E8B4B8",
          gold: "#C9A96E",
          champagne: "#F5E6C8",
          ivory: "#FAF6F0",
          pearl: "#F8F4EE",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        accent: ["var(--font-accent)"],
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};

export default config;
