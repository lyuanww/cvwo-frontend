import React, { useRef, useEffect, useState } from "react";
import { Layout, Form, Button, Tag, Input } from "antd";
import SideBar from "../components/sidebar";
import type { InputRef } from "antd";
import { useNavigate } from "react-router-dom";
import TopHeader from "../components/header";
import { useAppDispatch } from "../store/hooks";
import { useLocation } from "react-router-dom";
import { updatePostAsync } from "../store/post/postSlice";
import { PlusOutlined } from "@ant-design/icons";
import { TweenOneGroup } from "rc-tween-one";
const { TextArea } = Input;
const { Content } = Layout;
interface Tagging {
  name: string;
}

const EditPost = () => {
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const { item } = state || {};
  const navigate = useNavigate();
  const [title, setTitle] = useState(item.title);
  const [body, setBody] = useState(item.body);
  const [tags, setTags] = useState(item.tags);
  const [inputValue, setInputValue] = useState("");
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const inputRef = useRef<InputRef>(null);

  const onClickYes = () => {
    const formData = {
      post: {
        id: item.id,
        title: title,
        body: body,
        tags: tags,
      },
    };

    dispatch(updatePostAsync(formData));
    navigate(`/mypost`);
  };

  const onClickNo = () => {
    navigate("/mypost");
  };

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);
  const checkSameTags = (tag: Tagging, removedTag: Tagging) => {
    return tag.name === removedTag.name;
  };

  const handleClose = (removedTag: Tagging) => {
    const newTags = tags.filter(
      (tag: Tagging) => !checkSameTags(tag, removedTag)
    );
    console.log(newTags);
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
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar />
      <Layout className="site-layout">
        <TopHeader />
        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              padding: 50,
              minHeight: 360,
            }}
          >
            <Form
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
            >
              <Form.Item label="Title">
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="TextArea">
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
              <Button onClick={onClickYes}>Edit</Button>
              <Button onClick={onClickNo}>Cancel</Button>
            </Form>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default EditPost;
