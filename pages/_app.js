import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "../src/components/NavBar/NavBar";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <NavBar />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
