import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        navy: {
          50: "#f0f4f9",
          100: "#dbe4f1",
          200: "#b9cee3",
          300: "#8eb2d1",
          400: "#5e90bd",
          500: "#3d73a7",
          600: "#2d5a89",
          700: "#24486f",
          800: "#1e3c5c",
          900: "#0F172A", // Deep Navy
          950: "#080c16",
        },
        emerald: {
          500: "#10B981",
          600: "#059669",
        },
        saffron: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#F97316", // Saffron accent
          600: "#ea580c",
          700: "#c2410c",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        primary: {
          DEFAULT: "#0F172A",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#10B981",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#F97316",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#f1f5f9",
          foreground: "#64748b",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(15, 23, 42, 0.08)",
        glow: "0 0 25px -5px rgba(249, 115, 22, 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
