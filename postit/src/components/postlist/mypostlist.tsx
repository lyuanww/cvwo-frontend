import React, { useEffect } from "react";
import { Avatar, Button, List, Card, Input, Divider } from "antd";
import { UserOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./postlist.css";
import { fetchMyPostsAsync, Statuses } from "../../store/post/postSlice";
import { selectPosts, selectStatus } from "../../store/post/postSlice";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import Tags from "../tags/tags";
import CreateComment from "../comments/createcomment";
import Comments from "../comments/comments";
const { TextArea } = Input;

const { Meta } = Card;

const PostList: React.FC = () => {
  const posts = useAppSelector(selectPosts);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchMyPostsAsync());
  }, [dispatch]);
  console.log(posts);
  const onDelete = (item: any) => {
    console.log(item);
    navigate("/deletepost", { state: { item } });
  };

  const onEdit = (item: any) => {
    navigate("/editpost", { state: { item } });
  };

  const onCreate = () => {
    navigate("/createpost");
  };
  let contents;

  if (status !== Statuses.UpToDate) {
    contents = <div>{status}</div>;
  } else {
    contents = (
      <div>
        <Button onClick={onCreate}>Create Post</Button>
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={posts}
          renderItem={(item) => (
            <Card
              extra={
                <div>
                  <EditOutlined
                    style={{ fontSize: "32px" }}
                    onClick={() => onEdit(item)}
                  />
                  <Divider type="vertical" />
                  <DeleteOutlined
                    style={{ fontSize: "32px" }}
                    onClick={() => onDelete(item)}
                  />
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
                title={
                  <div>
                    <div style={{ textAlign: "left" }}>
                      {item.user.username}
                    </div>
                    <div style={{ textAlign: "center" }}>{item.title}</div>
                  </div>
                }
                description={item.body}
              />
              <Tags tags={item.tags}></Tags>
              <CreateComment post_id={item.id!}></CreateComment>
              <h1>Comments:</h1>
              <Comments comments={item.comments} />
            </Card>
          )}
        />
      </div>
    );
  }

  return contents;
};

export default PostList;
