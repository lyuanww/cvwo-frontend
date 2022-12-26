import React, { useEffect } from "react";
import { Avatar, List, Card } from "antd";
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
import { useParams } from "react-router-dom";
import CreateComment from "../comments/createcomment";
import Comments from "../comments/comments";

const { Meta } = Card;
interface Props {
  content: string;
}

const PostList = ({ content }: Props) => {
  const posts = useAppSelector(selectPosts);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id === undefined || content === "home") {
      dispatch(fetchPostsAsync());
    } else if (content === "tags") {
      console.log(id);
      console.log(parseInt(id, 10));
      dispatch(fetchPostsByTagsAsync(parseInt(id, 10)));
    }
  }, [content, dispatch, id]);

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
            <Tags tags={item.tags}></Tags>
            <CreateComment post_id={item.id!}></CreateComment>
            <h1>Comments:</h1>
            <Comments comments={item.comments} />
          </Card>
        )}
      />
    );
  }

  return contents;
};

export default PostList;
