import React, { useState } from "react";
import { Button, Input } from "antd";

import { useAppDispatch } from "../../store/hooks";

import { createCommentAsync } from "../../store/comment/commentSlice";
const { TextArea } = Input;

interface Props {
  post_id: number;
}

const CreateComment = ({ post_id }: Props) => {
  const dispatch = useAppDispatch();

  const [comment, setComment] = useState("");

  const createComment = (comment: string) => {
    const commentFormData = {
      comment: {
        post_id: post_id,
        body: comment,
      },
    };
    console.log(commentFormData);
    dispatch(createCommentAsync(commentFormData));
    resetState();
    refreshPage();
  };
  const refreshPage = () => {
    window.location.reload();
  };
  const resetState = () => {
    setComment("");
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
