import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { InputRef } from "antd";
import { Form, Input, Button, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../store/hooks";
import { createPostAsync } from "../store/post/postSlice";
import { TweenOneGroup } from "rc-tween-one";

const { TextArea } = Input;
interface Tagging {
  name: string;
}

const Post: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState<Tagging[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const inputRef = useRef<InputRef>(null);

  const onFinish = () => {
    if (title.trim() === "" || body.trim() === "") {
      alert("Title and body cannot be empty.");
    } else {
      const formData = {
        post: {
          title: title,
          body: body,
          likes: 0,
          tags: tags,
        },
      };
      dispatch(createPostAsync(formData));
      resetState();
    }
  };

  const resetState = () => {
    setTitle("");
    setBody("");
    navigate("/home");
  };

  const onClickCancel = () => {
    navigate("/home");
  };

  /*
 Tag structure is referenced from the antd tag Library https://ant.design/components/tag/
 */

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const checkSameTags = (tag: Tagging, removedTag: Tagging) => {
    return tag.name === removedTag.name;
  };

  const handleClose = (removedTag: Tagging) => {
    const newTags = tags.filter((tag) => !checkSameTags(tag, removedTag));
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf({ name: inputValue }) === -1) {
      setTags([...tags, { name: inputValue }]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const forMap = (tag: Tagging) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          console.log(tag);
          handleClose(tag);
        }}
      >
        {tag.name}
      </Tag>
    );
    return (
      <span key={tag.name} style={{ display: "inline-block" }}>
        {tagElem}
      </span>
    );
  };

  const tagChild = tags.map(forMap);
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
        <Form.Item label="Body">
          <TextArea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={10}
          />
        </Form.Item>
        <div style={{ marginBottom: 16 }}>
          <TweenOneGroup
            enter={{
              scale: 0.8,
              opacity: 0,
              type: "from",
              duration: 100,
            }}
            onEnd={(e: any) => {
              if (e.type === "appear" || e.type === "enter") {
                (e.target as any).style = "display: inline-block";
              }
            }}
            leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
            appear={false}
          >
            {tagChild}
          </TweenOneGroup>
          <div>
            {inputVisible && (
              <Input
                ref={inputRef}
                style={{ width: 100, margin: 10 }}
                type="text"
                size="small"
                className="tag-input"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
              />
            )}
            {!inputVisible && (
              <Tag
                className="site-tag-plus"
                style={{ margin: 10 }}
                onClick={showInput}
              >
                <PlusOutlined /> New Tag
              </Tag>
            )}
          </div>
        </div>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button type="primary" onClick={onClickCancel}>
          Cancel
        </Button>
      </Form>
    </>
  );
};

export default Post;
