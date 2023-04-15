import { createStitches, globalCss } from "@stitches/react";

export const { styled, getCssText } = createStitches({
  theme: {
    colors: {
      dark: "#111",
      darkGray: "#343434",
      darkWhite: "#e1e1e1",
      white: "#fff",
      green: "#2ab982",
      lightGray: "#cdc8c8",
    },
    fontSizes: {
      xs: "16px",
      s: "18px",
      l: "24px",
      xl: "34px",
    },
    shadows: {
      dark: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    },
  },
});

export const globalStyles = globalCss({
  "@import": [
    "url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap')",
  ],
  "*": {
    margin: "0",
    padding: "0",
    boxSizing: "border-box",
    listStyle: "none",
    fontFamily: "Montserrat, sans-serif",
  },
  body: {
    backgroundColor: "#eee",
    overflowX: "hidden",
  },
});