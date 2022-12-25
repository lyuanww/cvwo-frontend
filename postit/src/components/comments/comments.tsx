import React, { useEffect } from "react";
import { Avatar, List, Card, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./postlist.css";
import {
  fetchPostsAsync,
  fetchPostsByTagsAsync,
  Statuses,
} from "../../store/post/postSlice";
import { selectPosts, selectStatus } from "../../store/post/postSlice";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import Tags from "../tags/tags";
import { useNavigate, useParams } from "react-router-dom";
import { CommentState } from "../../store/comment/commentSlice";

const { Meta } = Card;
interface Props {
  comments: CommentState[];
}

const Comments = ({ comments }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onDelete = (item: any) => {
    console.log(item);
    navigate("/deletepost", { state: { item } });
  };

  const onEdit = (item: any) => {
    navigate("/editpost", { state: { item } });
  };

  return (
    <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      style={{ position: "relative", margin: 20 }}
      dataSource={comments}
      renderItem={(item) => (
        <Card
          style={{
            margin: "auto",
            width: "auto",
            height: "auto",
            position: "relative",
          }}
        >
          <div>
            <Button onClick={() => onEdit(item)}>Edit</Button>
            <Button onClick={() => onDelete(item)}>Delete</Button>
          </div>
          <Meta
            avatar={<Avatar icon={<UserOutlined />} />}
            title={
              <div>
                <div style={{ textAlign: "left" }}>{item.user.username}</div>
              </div>
            }
            description={item.body}
          />
        </Card>
      )}
    />
  );
};

export default Comments;
