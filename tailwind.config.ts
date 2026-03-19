import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        display: ["'Syne'", "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: "#f97316",
          dark: "#ea580c",
          light: "#fb923c",
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
        dark: "#1a1208",
        background: "#fdf9f4",
        foreground: "#1a1208",
        muted: {
          DEFAULT: "#f5f0eb",
          foreground: "#7a7167",
        },
        border: "#e8e2d8",
        accent: {
          DEFAULT: "#f97316",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#f5f0eb",
          foreground: "#1a1208",
        },
      },
    },
  },
  plugins: [],
};

export default config;
