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
import CreateComment from "../comments/createcomment";
import Comments from "../comments/comments";

const { Meta } = Card;
interface Props {
  content: string;
}

const PostList = ({ content }: Props) => {
  const posts = useAppSelector(selectPosts);
  const status = useAppSelector(selectStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined && content === "tags") {
      console.log(parseInt(id, 10));
      dispatch(fetchPostsByTagsAsync(parseInt(id, 10)));
    } else {
      dispatch(fetchPostsAsync());
    }
  }, [content, dispatch, id]);
  console.log(posts);
  let contents;
  const onCreate = () => {
    navigate("/createpost");
  };

  if (status !== Statuses.UpToDate) {
    contents = <div>{status}</div>;
  } else {
    contents = (
      <>
        <Button onClick={onCreate}>Create Post</Button>
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
      </>
    );
  }

  return contents;
};

export default PostList;
