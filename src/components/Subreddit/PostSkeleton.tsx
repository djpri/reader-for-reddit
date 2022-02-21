import { Skeleton } from "@chakra-ui/react";
import React from "react";

function PostSkeleton() {
  return (
    <Skeleton startColor="teal.500" endColor="gray.800" w="100%">
      Loading
    </Skeleton>
  );
}

export default PostSkeleton;
