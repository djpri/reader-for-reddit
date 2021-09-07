import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "../src/components/NavBar/NavBar";
import Router from "next/router";
import NProgress from "nprogress";
import "../styles/nprogress.css";

// NProgress.configure({ showSpinner: publicRuntimeConfig.NProgressShowSpinner });

Router.onRouteChangeStart = () => {
  // console.log('onRouteChangeStart triggered');
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  // console.log('onRouteChangeComplete triggered');
  NProgress.done();
};

Router.onRouteChangeError = () => {
  // console.log('onRouteChangeError triggered');
  NProgress.done();
};

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <NavBar />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
