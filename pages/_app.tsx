import { Box, ChakraProvider } from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import NavBar from "../src/components/NavBar/NavBar";
import "../styles/globals.css";
import "../styles/nprogress.css";
import theme from "../theme/theme";

const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      NProgress.start();
    });

    router.events.on("routeChangeComplete", () => {
      NProgress.done();
    });

    router.events.on("routeChangeError", () => {
      NProgress.done();
    });
    return () => {
      router.events.off("routeChangeStart", () => {
        NProgress.start();
      });
      router.events.off("routeChangeComplete", () => {
        NProgress.done();
      });

      router.events.off("routeChangeError", () => {
        NProgress.done();
      });
    };
  }, [router.events]);

  useEffect(() => {
    const getLastVisitDate = (): number => {
      let lastVisitDate: number | null = null;
      lastVisitDate = parseInt(localStorage.getItem("lastVisited"));
      if (!lastVisitDate) {
        lastVisitDate = moment().unix();
      }
      return lastVisitDate;
    };

    const secondsFromLastVisit: number = moment().unix() - getLastVisitDate();

    const updateSessionTimeInfo = (): void => {
      localStorage.setItem("lastVisited", moment().unix().toString());
      localStorage.setItem(
        "timeFromLastVisit",
        secondsFromLastVisit.toString()
      );
    };

    const tokenIsNeeded = (): boolean => {
      if (!localStorage.getItem("accessToken")) return true;
      // 3300 seconds = 55 minutes
      // reddit token lasts 60 minutes
      if (secondsFromLastVisit >= 3300) return true;

      return false;
    };

    const getTokenAsync = async () => {
      const { data } = await axios.get("/api/token");
      localStorage.setItem("accessToken", data);
    };

    if (tokenIsNeeded()) {
      console.log("Token is needed");
      getTokenAsync();
    }
    updateSessionTimeInfo();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <NavBar />
        <Box as="main" mt="80px" mb="100px">
          <Component {...pageProps} />
        </Box>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
