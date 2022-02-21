import { VStack } from "@chakra-ui/layout";
import Comment from "./Comment";
import { useState } from "react";

function CommentsTree({ comments }) {
  const [showChildren] = useState(true);

  const renderParentComment = (item, index) => {
    return (
      <Comment
        item={item.data}
        index={index}
        depth={1}
        showChildren={showChildren}
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
