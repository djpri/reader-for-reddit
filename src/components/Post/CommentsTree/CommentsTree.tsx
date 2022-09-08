import { VStack } from "@chakra-ui/layout";
import Comment from "./Comment";

interface IProps {
  comments: any[];
  showChildComments: boolean;
  linkId: string;
}

function CommentsTree({ comments, showChildComments, linkId }: IProps) {
  const renderParentComment = (item: any) => {
    return (
      <Comment
        item={item}
        linkId={linkId}
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
