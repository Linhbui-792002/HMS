/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        // text
        "t-brown": "#B58673",
        "t-black": "#1a202c",
        "t-text": "#363A3D",
        "t-green": "#3CA31B",
        "t-orange": "#f68b1f",
        "t-white": "#ffffff",
        "t-gray": "#d1cfcf",
        "t-blue": "#1777FF",
        "t-red": "#E53E3E",
        "t-cyan": "#68CACA",
        "t-geekblue": "#521DA5",
        // background

        "b-black": "#363636",
        "b-green": "#3CA31B",
        "b-orange": "#f68b1f",
        "b-white": "#ffffff",
        "b-blue": "#044da2",
        "b-red": "#E53E3E",
        "b-gray": "#9F9F9F",
        "b-primary-to": "#D0A797",
        "b-primary-mid": "#F6F0EF",
        "b-primary-from": "#EBD9D2",
        "b-second-to": "#CFA595",
        "b-second-from": "#F6F0EF",
        "b-tab-to": "#FDF7F4",
        "b-tab-from": "#FFFDFE",
        "b-button": "#AA715B",
        "b-success-opacity": "#cdf7ec",
        "b-success": "#71be44",

        // border
        success: "#06d6a0",
        primary: "#ced4da",
        error: "#E53E3E",
      },
    },
    fontSize: {
      xs: "0.6rem",
      sm: "0.75rem",
      md: "0.9rem",
      lg: "1rem",
      xl: "1.2rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2rem",
    },
  },
  plugins: [],
};
