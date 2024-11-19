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
        primary: "#4F4B46",
        "primary-green": "#8B9B3E",
        "secondary-green": "#C3CD99",
        "secondary-blue": "#5887FF",
        "dark-gray": "#EEEEEE",
        secondary: "#E6E3DB", // light beige for sections
        accent: "#6F675D", // accent brown for elements like buttons
        text: {
          DEFAULT: "#333333", // main text color
          green: "#86A047", // text color for buttons like "Join Us" and "Sign In"
          white: "#FFFFFF", // white text used over buttons or darker backgrounds
          tea: "#7A6E56",
        },
      },
      container: {
        center: true,
        screens: {
          "2xl": "1600px",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
