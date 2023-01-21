import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Layout, Card, Button } from "antd";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  destroyPostAsync,
  selectStatus,
  Statuses,
} from "../store/post/postSlice";
import TopHeader from "../components/header";
import SideBar from "../components/sidebar";

const { Content } = Layout;

const DeletePost = () => {
  const { state } = useLocation();
  const { item } = state || {};
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let contents;

  const onClickYes = () => {
    const payload = {
      post: {
        id: item.id,
      },
    };
    dispatch(destroyPostAsync(payload));
    navigate("/home");
  };

  const onClickNo = () => {
    navigate("/home");
  };

  contents = (
    <Card style={{ height: 300, width: 500, margin: "auto" }}>
      <div style={{ textAlign: "center" }}>
        <p>Delete this post?</p>
        <Button onClick={onClickYes}>Yes</Button>
        <Button onClick={onClickNo}>No</Button>
      </div>
    </Card>
  );

  if (status === Statuses.Error) {
    contents = <div>Error</div>;
  }

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
            {contents}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DeletePost;
