import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Avatar, Button, List, Skeleton, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./postlist.css";
import { fetchPostsAsync, Statuses } from "../store/post/postSlice";
import { selectPosts, selectStatus } from "../store/post/postSlice";
import { useAppSelector, useAppDispatch } from "../store/hooks";

const { Meta } = Card;

const PostList: React.FC = () => {
  const posts = useAppSelector(selectPosts);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPostsAsync());
  }, [dispatch]);

  let contents;

  if (status !== Statuses.UpToDate) {
    contents = <div>{status}</div>;
  } else {
    contents = (
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={posts}
        renderItem={(item) => (
          <Card style={{ margin: "auto", width: 700 }}>
            <Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={
                <div>
                  <div style={{ textAlign: "left" }}>{item.user.username}</div>
                  <div style={{ textAlign: "center" }}>{item.title}</div>
                </div>
              }
              description={item.body}
            />
          </Card>
        )}
      />
    );
  }

  return contents;
};

export default PostList;
