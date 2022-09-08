import { VStack } from "@chakra-ui/layout";
import Comment from "./Comment";

function CommentsTree({ comments, showChildComments }) {
  const renderParentComment = (item, index) => {
    return (
      <Comment
        item={item}
        index={index}
        showChildren={showChildComments}
        key={item.data.id}
      />
    );
  };

  return (
    <VStack align="left" spacing={5} pb="5">
      {comments.map(renderParentComment)}
    </VStack>
  );
}

export default CommentsTree;
