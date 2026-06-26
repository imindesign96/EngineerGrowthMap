import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#111315",
          900: "#181b1f",
          800: "#24282e",
          700: "#363b43",
          200: "#d8dde4",
          100: "#edf0f3",
        },
      },
      boxShadow: {
        soft: "0 18px 50px rgba(18, 24, 38, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
