import React, { useState } from "react";
import { List, Button } from "antd";
import { CommentState } from "../../store/comment/commentSlice";

import Comment from "./comment";

//Number of comments that is loaded when user clicks on load more button,
const pageSize = 1;

interface Props {
  comments: CommentState[];
}

const Comments = ({ comments }: Props) => {
  const [index, setIndex] = useState(pageSize);

  const list = comments.slice(0, index);

  //Add the pagesize to the index of the comment array to show more comments
  const onLoadMore = () => {
    setIndex(index + pageSize);
  };

  //Display appropriate messages based on the state of the index
  const loadMore =
    comments.length !== index ? (
      <div className="footer">
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : (
      <div className="footer"> You have reached the end. </div>
    );

  const noComments = comments.length === 0;

  //Check whether comments is in edit state so that the appropriate content is shown

  return !noComments ? (
    <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      loadMore={loadMore}
      style={{ position: "relative", margin: 20 }}
      dataSource={list}
      renderItem={(item) => <Comment comment={item}></Comment>}
    />
  ) : (
    <div>No comments</div>
  );
};

export default Comments;
