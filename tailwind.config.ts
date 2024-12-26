import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jost: ["Jost", "sans-serif"], // Define Jost font
        ubuntu: ["Ubuntu", "sans-serif"], // Define Ubuntu font
      },
      colors: {
        primary: "#483C19",
        "primary-gray": "#6C5E3A",
        "secondary-green": "#C3CD99",
        "secondary-blue": "#5887FF",
        "dark-gray": "#EEEEEE",
        secondary: "#58481F",
        accent: "#6F675D",
        link: "#7a6e56",
        "border-primary": "#706341",
        "hover-blue": "#5d8fb4",
        text: {
          DEFAULT: "#333333",
          green: "#86A047",
          white: "#FFFFFF",
          tea: "#7A6E56",
        },
      },
      container: {
        center: true,
        // padding: {
        //   DEFAULT: "1rem",
        // },
        screens: {
          "2xl": "1600px",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
