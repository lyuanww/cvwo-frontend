import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Avatar, Button, List, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./postlist.css";
import { fetchMyPostsAsync, Statuses } from "../store/post/postSlice";
import { selectPosts, selectStatus } from "../store/post/postSlice";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

const PostList: React.FC = () => {
  const posts = useAppSelector(selectPosts);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchMyPostsAsync());
  }, [dispatch]);

  const onDelete = (item: any) => {
    console.log(item);
    navigate("/deletepost", { state: { item } });
  };

  const onEdit = (item: any) => {
    navigate("/editpost", { state: { item } });
  };
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
          <Card
            actions={[<Button>Edit</Button>]}
            extra={
              <div>
                <Button onClick={() => onEdit(item)}>Edit</Button>
                <Button onClick={() => onDelete(item)}>Delete</Button>
              </div>
            }
            style={{
              margin: "auto",
              width: 700,
              height: "auto",
              position: "relative",
            }}
          >
            <Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={<a href="https://ant.design">{item.title}</a>}
              description={item.body}
            />
            <List
              className="demo-loadmore-list"
              itemLayout="horizontal"
              style={{ position: "relative", margin: 20 }}
              dataSource={posts}
              renderItem={(item) => (
                <Card
                  extra={
                    <div>
                      <Button onClick={() => onEdit(item)}>Edit</Button>
                      <Button onClick={() => onDelete(item)}>Delete</Button>
                    </div>
                  }
                  style={{
                    margin: "auto",
                    width: "auto",
                    height: "auto",
                    position: "relative",
                  }}
                >
                  <Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={
                      <div style={{ textAlign: "left", wordSpacing: 200 }}>
                        User hi
                      </div>
                    }
                    description={item.body}
                  />
                </Card>
              )}
            />
          </Card>
        )}
      />
    );
  }

  return contents;
};

export default PostList;
