import React from "react";
import { useLocation } from "react-router-dom";
import { Layout } from "antd";
import SideBar from "../components/sidebar";
import TopHeader from "../components/header";
import PostList from "../components/postlist/postlist";

const { Content } = Layout;

const TagPost: React.FC = () => {
  const { state } = useLocation();
  const { tag } = state || {};
  console.log(tag);

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
            <h1>Category:{tag.name}</h1>
            <PostList content="tags" />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default TagPost;
