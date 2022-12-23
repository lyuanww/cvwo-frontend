import React, { useState } from "react";
import { Layout, Form, Button, Input } from "antd";
import SideBar from "../components/sidebar";
import { useNavigate, useParams } from "react-router-dom";
import TopHeader from "../components/header";
import { useAppDispatch } from "../store/hooks";
import { useLocation } from "react-router-dom";
const { TextArea } = Input;
const { Content } = Layout;

const EditPost = () => {
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const { item } = state || {};
  const navigate = useNavigate();
  const [title, setTitle] = useState(item.title);
  const [body, setBody] = useState(item.body);

  const onFinish = () => {
    const formData = {
      post: {
        title: title,
        body: body,
      },
    };

    resetState();
  };
  const resetState = () => {
    setTitle("");
    setBody("");
    navigate("/");
  };
  const onClickYes = () => {
    navigate("/mypost");
  };

  const onClickNo = () => {
    navigate("/mypost");
  };

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
              onFinish={onFinish}
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

              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default EditPost;
