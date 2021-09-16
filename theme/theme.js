import { extendTheme } from "@chakra-ui/react";
import "@fontsource/open-sans/700.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/400.css";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
  global: (props) => ({
    "#__next": {
      backgroundColor: "pink",
      height: "100%",
      width: "100%",
    },
    body: {
      fontFamily: "body",
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("gray.200", "gray.800")(props),
      lineHeight: "base",
    },
  }),
  fonts: {
    heading: "Open Sans",
    body: "Open Sans",
  },
});

export default theme;
