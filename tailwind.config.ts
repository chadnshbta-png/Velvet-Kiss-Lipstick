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
          black: "#FAF6F1",
          deep: "#F2E6DA",
          crimson: "#7D1828",
          rose: "#B52240",
          blush: "#B8606E",
          gold: "#9B1E32",
          champagne: "#C8A898",
          ivory: "#2C1F22",
          pearl: "#5C4049",
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
