import { VStack } from "@chakra-ui/layout";
import Comment from "./Comment";
import { useState, useEffect } from "react";

function CommentsTree({ comments, showChildComments }) {
  const renderParentComment = (item, index) => {
    return (
      <Comment
        item={item.data}
        index={index}
        showChildren={showChildComments}
        key={item.data.id}
      />
    );
  };

  return (
    <VStack align="left" spacing={1}>
      {comments.map(renderParentComment)}
    </VStack>
  );
}

export default CommentsTree;
