import type { Config } from "tailwindcss";

/**
 * Club Aero Centrale Casablanca (CACC) — design tokens
 * Brand palette: Navy #08263D · Royal/Sky Blue accents · White · Light Gray (aviation identity)
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#08263D",
          50: "#EAF1F7",
          100: "#CFDFEC",
          200: "#9FBFD9",
          300: "#5F92B8",
          400: "#2E6491",
          500: "#15436A",
          600: "#0E3352",
          700: "#08263D", // brand
          800: "#061C2E",
          900: "#04121E",
          950: "#020A12",
        },
        /* Accent — Centrale Casablanca-inspired blues (royal → sky) */
        accent: {
          DEFAULT: "#2E8FDD",
          50: "#EFF7FD",
          100: "#D8ECFA",
          200: "#A9D6F5",
          300: "#6FB9EC", // sky blue
          400: "#2E8FDD", // royal-sky — primary accent
          500: "#1F72BC",
          600: "#185C9A",
          700: "#124875",
          800: "#0C3252",
          900: "#071F33",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px rgba(4, 18, 30, 0.24)",
        "glass-sm": "0 4px 16px rgba(4, 18, 30, 0.16)",
        glow: "0 0 32px rgba(46, 143, 221, 0.4)",
      },
      backgroundImage: {
        /* Daytime aviation sky: deep azure overhead fading to a bright horizon */
        "hero-gradient":
          "radial-gradient(ellipse 70% 50% at 78% -8%, rgba(255,255,255,0.35), transparent), linear-gradient(180deg, #0B4E8F 0%, #1E7BC8 42%, #6FB9EC 78%, #CDE9FA 100%)",
        /* Dark contrast sections: night-approach navy */
        "night-gradient":
          "linear-gradient(180deg, #061C2E 0%, #08263D 60%, #0C3252 100%)",
        "section-gradient":
          "linear-gradient(180deg, rgba(46,143,221,0.06), transparent)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out both",
        marquee: "marquee 32s linear infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        drift: "drift 60s linear infinite",
        "drift-slow": "drift 95s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.25" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        drift: {
          "0%": { transform: "translateX(-15%)" },
          "100%": { transform: "translateX(115%)" },
        },
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
    },
  },
  plugins: [],
};

export default config;
