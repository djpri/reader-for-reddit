import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import "@fontsource/open-sans/700.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/400.css";

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
        fontSize: { base: "0.875rem", md: "1rem" },
        color: mode("gray.800", "whiteAlpha.900")(props),
        bg: mode("gray.50", "gray.800")(props),
        lineHeight: "base",
      },
    }),
  },
  fonts: {
    heading: "Inter",
    body: "Inter",
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
