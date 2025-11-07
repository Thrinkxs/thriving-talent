import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-radial-to-t":
          "radial-gradient(circle at top,var(--tw-gradient-stops))",
        "gradient-radial-to-l":
          "radial-gradient(circle at left,var(--tw-gradient-stops))",
        "gradient-radial-to-r":
          "radial-gradient(circle at right,var(--tw-gradient-stops))",
        "gradient-radial-to-b":
          "radial-gradient(circle at bottom,var(--tw-gradient-stops))",
      },
      colors: {
        "thrive-blue": "#2020d0",
        "thrive-red": "#fe2728",
        "thrive-light-blue": "#E7EEFB",
        "thrive-green": "#8EE69E",
        "thrive-dark-red": "#E6A98E",
        "thrive-dashboard-background": "#DFE2E9",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "caret-blink": {
          "0%,70%,100%": {
            opacity: "1",
          },
          "20%,50%": {
            opacity: "0",
          },
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      backgroundColor: {
        "thrive-blue": "#2020d0",
        "thrive-dashboard-background": "#DFE2E9",
        "thrive-red": "#fe2728",
        "thrive-light-blue": "#E7EEFB",
        "thrive-green": "#8EE69E",
        "thrive-dark-red": "#E6A98E",
        "thrive-dark-blue": "#050A24",
        "thrive-input": "#EDF2F6",
      },
      textColor: {
        "thrive-blue": "#2020d0",
        "thrive-dashboard-background": "#DFE2E9",
        "thrive-red": "#fe2728",
        "thrive-light-blue": "#E7EEFB",
        "thrive-green": "#8EE69E",
        "thrive-dark-red": "#E6A98E",
        "thrive-dark-blue": "#050A24",
        "thrive-input": "#EDF2F6",
      },
      fontFamily: {
        // telma: ["Telma", "sans-serif"],
        // montserrat: ["MontSerrat", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
