import React from "react";
import { Layout, theme } from "antd";
import SideBar from "../components/sidebar";
import TopHeader from "../components/header";
import PostList from "../components/postlist";
const { Content } = Layout;

const Home: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
              background: colorBgContainer,
            }}
          >
            <PostList />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
