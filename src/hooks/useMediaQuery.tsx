import { useMediaQuery } from "@chakra-ui/react";
import React from 'react'

function useMediaQueries() {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const [isDesktop] = useMediaQuery("(min-width: 1024px)");
  
  return {
    isMobile,
    isDesktop
  }
}

export default useMediaQueries;
