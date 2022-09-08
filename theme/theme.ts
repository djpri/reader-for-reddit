import { parsedHtmlStyles } from "./parsedHtmlStyles";
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import "@fontsource/inter/800.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/400.css";
import "@fontsource/dm-sans";
import { Dict } from "@chakra-ui/utils";

// #0f172a
// rgb(51, 65, 85)

const themeConfig = {
  useSystemColorMode: true,
  shadows: {
    outline: "none",
  },
  styles: {
    global: (props: Dict<any>) => ({
      "#__next": {
        height: "100%",
        width: "100%",
      },
      body: {
        fontFamily: "body",
        fontSize: { base: "1rem", md: "1rem", sm: "0.875rem" },
        color: mode("rgb(51, 65, 85)", "whiteAlpha.900")(props),
        bg: mode("white", "#0f172a")(props),
        lineHeight: "base",
        letterSpacing: "0.01rem",
      },
      ".comment": parsedHtmlStyles(props),
      ".twitter-video": parsedHtmlStyles(props),
    }),
  },
  fonts: {
    heading: "DM Sans, sans-serif",
    body: "Inter, sans-serif",
  },
  components: {
    Button: {
      rounded: "none",
    },
    Input: {
      defaultProps: {
        focusBorderColor: "hsla(220, 56%, 39%, 0.6)",
      },
    },
  },
  textStyles: {
    heading: {
      fontFamily: "heading",
      textAlign: "center",
      fontWeight: "bold",
      letterSpacing: "0.015em",
      lineHeight: "1.24",
      fontSize: { base: "1.75rem", md: "3.5rem" },
    },
    "heading-2": {
      fontFamily: "heading",
      textAlign: "center",
      fontWeight: "bold",
      letterSpacing: "0.015em",
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
};

const theme = extendTheme(themeConfig);

export default theme;
