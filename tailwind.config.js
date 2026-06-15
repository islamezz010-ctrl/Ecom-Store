/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      minWidth: {
        "[280px]": "280px",
      },
      maxWidth: {
        "[280px]": "280px",
        "[1200px]": "1200px",
        "[5xl]": "64rem",
      },
      minHeight: {
        "[300px]": "300px",
        "[400px]": "400px",
      },
      height: {
        "[90vh]": "90vh",
        "[450px]": "450px",
      },
      backgroundColor: {
        "[#fcf8ff]": "#fcf8ff",
        "[#1b1b21]": "#1b1b21",
      },
      keyframes: {
        slideInRight: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        slideInRight: "slideInRight 0.3s ease-out",
        fadeIn: "fadeIn 0.3s ease-out",
      },
    },
  },
  plugins: [],
};
