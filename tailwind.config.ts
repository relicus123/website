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
    },
  },
  plugins: [],
};

export default config;
