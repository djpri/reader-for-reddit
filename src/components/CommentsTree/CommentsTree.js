import { Box, Text, VStack, StackDivider } from "@chakra-ui/layout";
import Comment from "./Comment/Comment";
import { useState } from "react";

function CommentsTree({ comments }) {
  const [showChildren, setShowChildren] = useState(false);

  const renderParentComment = (item, index) => {
    return (
      <Comment
        item={item}
        index={index}
        depth={1}
        showChildren={showChildren}
        key={item.id}
      />
    );
  };

  return (
    <VStack align="left" spacing={5}>
      {comments.map(renderParentComment)}
    </VStack>
  );
}

export default CommentsTree;
