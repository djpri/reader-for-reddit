import { mode } from "@chakra-ui/theme-tools";
import { Dict } from "@chakra-ui/utils";

export const parsedHtmlStyles = (props: Dict<any>) => ({
  blockquote: {
    bgColor: mode("blackAlpha.200", "whiteAlpha.300")(props),
    borderLeft: "2px solid whiteAlpha.500",
    paddingLeft: "5px",
    fontStyle: "italic",
  },
  a: {
    color: mode("blue.500", "blue.300")(props),
    fontWeight: "bold",
    _hover: {
      textDecoration: "underline",
      color: mode("blue.400", "blue.200")(props),
    },
  },
});
