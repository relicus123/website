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
        "brand-dark": "#1c4966",
        "brand-green": "#5f8b70",
        "brand-blue": "#8fbdd7",
        "brand-light": "#e0dfdd",
      },
      fontFamily: {
        heading: ['"Poppins"', '"Inter"', "sans-serif"],
        body: ['"Open Sans"', '"Source Sans Pro"', "sans-serif"],
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "scroll-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        ticker: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        scroll: "scroll 20s linear infinite",
        "scroll-right": "scroll-right 20s linear infinite",
        ticker: "ticker 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
