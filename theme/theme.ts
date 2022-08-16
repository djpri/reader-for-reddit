import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

import "@fontsource/inter/800.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/400.css";

const theme = extendTheme({
  styles: {
    global: (props) => ({
      "#__next": {
        height: "100%",
        width: "100%",
      },
      body: {
        fontFamily: "body",
        fontSize: { base: "1rem", md: "1rem", sm: "0.875rem" },
        color: mode("gray.800", "whiteAlpha.900")(props),
        bg: mode("gray.50", "#202020")(props),
        lineHeight: "base",
        letterSpacing: "0.02rem",
      },
    }),
  },
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inter, sans-serif",
  },
  textStyles: {
    heading: {
      fontFamily: "heading",
      textAlign: "center",
      fontWeight: "bold",
      letterSpacing: "-0.015em",
      lineHeight: "1.24",
      fontSize: { base: "1.75rem", md: "3.5rem" },
    },
    "heading-2": {
      fontFamily: "heading",
      textAlign: "center",
      fontWeight: "bold",
      letterSpacing: "-0.015em",
      lineHeight: "1.24",
      fontSize: { base: "1.75rem", md: "2.75rem" },
    },
    body: {
      fontSize: { base: "1rem" },
    },
    caps: {
      textTransform: "uppercase",
      fontSize: "sm",
      letterSpacing: "widest",
      fontWeight: "bold",
    },
  },
});

export default theme;
