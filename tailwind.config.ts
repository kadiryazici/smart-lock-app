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
        background: "var(--background)",
        foreground: "var(--foreground)",
        success: "var(--success)",
        fail: "var(--fail)",
        gray: "var(--gray)",
        grayer: "var(--grayer)",
        dark: "var(--dark)",
        darker: "var(--darker)",
        'text-light': "var(--text-light)",
      },
      fontFamily: {
        'geist-mono': 'var(--font-geist-mono)'
      }
    },
  },
  plugins: [],
};
export default config;
