/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        goldYellow: "#F5BE32",
        lightGray: "#D9D9D9",
        white: "#FFFFFF",
        softBeigeYellow: "#F3D382",
        black: "#000000",
        darkCharcoal: "#1E1E1E",
        deepGray: "#2E2E2E",
        red: "#F27070",
      },
      fontFamily: {
        cormorantSC: "Cormorant SC",
        greatVibes: "Great Vibes",
        cinzel: "Cinzel",
      },
    },
  },
  plugins: [],
};
