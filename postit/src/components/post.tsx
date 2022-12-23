import React, { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { createPostAsync } from "../store/post/postSlice";
const { TextArea } = Input;

const Post: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onFinish = () => {
    const formData = {
      post: {
        title: title,
        body: body,
        likes: 0,
      },
    };
    dispatch(createPostAsync(formData));
    resetState();
  };
  const resetState = () => {
    setTitle("");
    setBody("");
    navigate("/");
  };
  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={onFinish}
      >
        <Form.Item label="Title">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Item>
        <Form.Item label="TextArea">
          <TextArea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={10}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Post;
