import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0a2e5c",
        "primary-light": "#123f7a",
        secondary: "#f9a826",
        accent: "#007a3d",
        ink: "#0b0f14",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["'Plus Jakarta Sans'", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(24px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
      },
      boxShadow: {
        glow: "0 0 40px rgba(249,168,38,0.35)",
        elevated: "0 25px 60px -15px rgba(10,46,92,0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
