import React, { useState } from "react";
import { Avatar, List, Card, Button, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";

import {
  fetchPostsAsync,
  fetchPostsByTagsAsync,
  Statuses,
} from "../../store/post/postSlice";
import { selectPosts, selectStatus } from "../../store/post/postSlice";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import Tags from "../tags/tags";
import { useNavigate, useParams } from "react-router-dom";
import {
  CommentState,
  createCommentAsync,
} from "../../store/comment/commentSlice";
const { TextArea } = Input;

const { Meta } = Card;
interface Props {
  post_id: number;
}

const CreateComment = ({ post_id }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
