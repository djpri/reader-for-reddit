import NProgress from "nprogress";
import { useRouter } from "next/router";
import React, { useEffect } from 'react'

function useProgressBar() {
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
}

export default useProgressBar
