/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
    screens: {
      xs: "300px",
      smm: "412px", // Extra small devices (e.g., smaller smartphones)
      sm: "640px", // Small devices (e.g., smartphones)
      md: "768px", // Medium devices (e.g., tablets)
      lg: "1024px", // Large devices (e.g., laptops)
      xl: "1280px", // Extra large devices (e.g., desktops)
    },
  },
};
