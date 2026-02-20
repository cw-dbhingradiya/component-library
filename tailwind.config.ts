import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#144d8b",
        "brand-dark": "#0f3b6d",
      },
    },
  },
  plugins: [],
};

export default config;
