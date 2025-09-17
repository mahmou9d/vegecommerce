/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // أضف ts و tsx هنا
  ],
  theme: {
    extend: {
      screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1400px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      // backgroundImage: {
      //   "hero-pattern": "url('/images/bg-hero.jpg')",
      //   "footer-texture": "url('/images/footer.png')",
      // },
      backgroundImage: {
        "insta-gradient": `radial-gradient(circle farthest-corner at 35% 100%,#fec564,transparent 50%),
          radial-gradient(circle farthest-corner at 10% 140%,#feda7e,transparent 50%),
          radial-gradient(ellipse farthest-corner at 0 -25%,#5258cf,transparent 50%),
          radial-gradient(ellipse farthest-corner at 20% -50%,#5258cf,transparent 50%),
          radial-gradient(ellipse farthest-corner at 100% 0,#893dc2,transparent 50%),
          radial-gradient(ellipse farthest-corner at 60% -20%,#893dc2,transparent 50%),
          radial-gradient(ellipse farthest-corner at 100% 100%,#d9317a,transparent),
          linear-gradient(#6559ca,#bc318f 30%,#e42e66 50%,#fa5332 70%,#ffdc80 100%)`,
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
