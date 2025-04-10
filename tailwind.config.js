/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1F2933",
        lime: "#9CFC38",
        blueSecondary: "#EBF9FB",
        secondaryTen: "rgba(132, 154, 184, 0.1)",
        background: "rgba(248, 248, 248, 1)",
        secondary: "rgba(132, 154, 184, 1)",
        secondaryThirty: "rgba(132, 154, 184, 0.3)",
        blue: "rgba(51, 192, 219, 1)",
        selectedTab: "rgba(255, 255, 255, 0.05)",
        chatbackground: "rgba(217, 217, 217, 0.2)",
        secondaryTwenty: "rgba(132, 154, 184, 0.2)",
        redbutton: "rgba(235, 87, 87, 1)",
      },
      fontFamily: {
        PJSregular: ["PJSregular", "Sans-Serif"],
        PJSbold: ["PJSbold", "Sans-Serif"],
        PJSextra: ["PJSextra", "Sans-Serif"],
        PJSmedium: ["PJSmedium", "Sans-Serif"],
      },
      gridTemplateColumns: {
        // Add a 13-column layout
        13: "repeat(13, minmax(0, 1fr))",
        14: "repeat(14, minmax(0, 1fr))",
      },
      boxShadow: {
        custom:
          "0 2px 4px 0 rgba(204, 204, 204, 0.4), 0 -2px 4px 0 rgba(204, 204, 204, 0.4), 0 0 4px 0 rgba(204, 204, 204, 0.4)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
