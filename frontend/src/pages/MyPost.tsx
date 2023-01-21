import React from "react";
import { Layout } from "antd";
import SideBar from "../components/sidebar";
import TopHeader from "../components/header";
import PostList from "../components/postlist/mypostlist";
import { useAppSelector } from "../store/hooks";
import { selectSession } from "../store/session/sessionSlice";

const { Content } = Layout;

const MyPost: React.FC = () => {
  const session = useAppSelector(selectSession);
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
            {session.id === null ? <div>Please login first</div> : <PostList />}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MyPost;
