import React, { useState } from "react";
import { Button, Input } from "antd";
import { useAppDispatch } from "../../store/hooks";
import { createCommentAsync } from "../../store/comment/commentSlice";
const { TextArea } = Input;

interface Props {
  post_id: number;
}

const CreateComment = ({ post_id }: Props) => {
  const [comment, setComment] = useState("");
  const dispatch = useAppDispatch();

  const refreshPage = () => {
    window.location.reload();
  };

  const resetState = () => {
    setComment("");
  };

  const createComment = (comment: string) => {
    if (comment.trim() === "") {
      alert("Comment cannot be blank!");
    } else {
      const commentFormData = {
        comment: {
          post_id: post_id,
          body: comment,
        },
      };
      dispatch(createCommentAsync(commentFormData));
      resetState();
      refreshPage();
    }
  };

  return (
    <>
      <TextArea
        placeholder="Please write a comment..."
        style={{ width: 500 }}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={1}
      />
      <Button onClick={() => createComment(comment)}>Create</Button>
    </>
  );
};

export default CreateComment;
