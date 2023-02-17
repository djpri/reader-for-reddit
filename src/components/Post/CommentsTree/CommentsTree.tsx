import { VStack } from "@chakra-ui/layout";
import { useMemo } from "react";
import Comment from "./Comment";

interface IProps {
  comments: any[];
  showChildComments: boolean;
  linkId: string;
}

function CommentsTree({ comments, showChildComments, linkId }: IProps) {
  const showChildren = useMemo(() => showChildComments, [showChildComments]);
  
  const renderParentComment = (item: any) => {
    return (
      <Comment
        item={item}
        linkId={linkId}
        showChildren={showChildren}
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
