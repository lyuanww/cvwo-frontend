import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, List, Card, Button, Divider } from "antd";
import { UserOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  fetchPostsAsync,
  fetchPostsByTagsAsync,
  Statuses,
} from "../../store/post/postSlice";
import { selectPosts, selectStatus } from "../../store/post/postSlice";
import { selectSession } from "../../store/session/sessionSlice";
import Tags from "../tags/tags";
import CreateComment from "../comments/createcomment";
import Comments from "../comments/comments";

const { Meta } = Card;
interface Props {
  content: string;
}

const pageSize = 5;

const PostList = ({ content }: Props) => {
  const [current, setCurrent] = useState(1);
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(pageSize);
  const posts = useAppSelector(selectPosts);
  const status = useAppSelector(selectStatus);
  const session = useAppSelector(selectSession);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  //Partition the pages using minimum index and maximum index
  const slicePosts = posts.slice(minIndex, maxIndex);
  console.log(slicePosts);

  //Change the current page, min and max indexes when user changes pages
  const onChange = (page: number) => {
    setCurrent(page);
    setMinIndex(pageSize * (page - 1));
    setMaxIndex(pageSize * page);
  };

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

  const postByCurrentUser = (user_id: number) => {
    return session.id === user_id;
  };

  //Determine the action through thr content prop
  useEffect(() => {
    if (id !== undefined && content === "tags") {
      // id is the id of the tag which is in the url
      dispatch(fetchPostsByTagsAsync(parseInt(id, 10)));
    } else {
      dispatch(fetchPostsAsync());
    }
  }, [content, dispatch, id, current]);

  let contents;

  if (status !== Statuses.UpToDate) {
    contents = <div>{status}</div>;
  } else {
    contents = (
      <>
        {session.id !== null && <Button onClick={onCreate}>Create Post</Button>}

        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={slicePosts}
          size="large"
          pagination={{
            style: { marginRight: 200 },
            current: current,
            total: posts.length,
            pageSize: pageSize,
            onChange: onChange,
          }}
          renderItem={(item) => (
            <Card
              extra={
                postByCurrentUser(item.user.id!) && (
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
                )
              }
              style={{ margin: "auto", width: 700 }}
            >
              <Meta
                avatar={
                  item.user.image_url ? (
                    <Avatar src={item.user.image_url} />
                  ) : (
                    <Avatar icon={<UserOutlined />} />
                  )
                }
                style={{ marginRight: 60 }}
                title={
                  <>
                    <div style={{ textAlign: "left" }}>
                      {item.user.username}
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {item.title}
                    </div>
                  </>
                }
                description={item.body}
              />
              <Tags tags={item.tags}></Tags>
              {session.id !== null && (
                <CreateComment post_id={item.id!}></CreateComment>
              )}

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
