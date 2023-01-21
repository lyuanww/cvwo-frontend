import React, { useState } from "react";
import { Avatar, List, Card, Button, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { UserOutlined } from "@ant-design/icons";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  CommentState,
  destroyCommentAsync,
  selectStatus,
  updateCommentAsync,
} from "../../store/comment/commentSlice";
import { selectSession } from "../../store/session/sessionSlice";

const { Meta } = Card;

//Number of comments that is loaded when user clicks on load more button,
const pageSize = 1;

interface Props {
  comments: CommentState[];
}

interface EditState {
  id: number;
  isEditing: boolean;
}

const Comments = ({ comments }: Props) => {
  const [comment, setComment] = useState("");
  const [index, setIndex] = useState(pageSize);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const session = useAppSelector(selectSession);
  const list = comments.slice(0, index);

  const refreshPage = () => {
    window.location.reload();
  };

  const commentByCurrentUser = (user_id: number) => {
    return session.id === user_id;
  };

  //Initialize the editing state of all comments to false
  const setInitialEditStates = (comments: CommentState[]) => {
    return comments.map((item) => {
      const comment_id: number = item.id!;
      return { id: comment_id, isEditing: false };
    });
  };

  const [editing, setEditing] = useState<EditState[]>(
    setInitialEditStates(comments)
  );

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
  const isEditing = (user_id: number) => {
    const check = (item: EditState) => item.id === user_id;
    const item: EditState = editing.find(check)!;
    return item.isEditing;
  };

  //Set the edit state of comment
  const setCommentEditing = (id: number, isEditing: boolean) => {
    const newEditing = editing.map((item) => {
      return item.id === id ? { id: id, isEditing: isEditing } : item;
    });
    setEditing(newEditing);
  };

  const onEdit = (item: any) => {
    const payload = {
      comment: {
        id: item.id,
        body: comment,
      },
    };
    dispatch(updateCommentAsync(payload));
    refreshPage();
  };

  //Delete comment functionality
  const showModal = () => {
    setIsModalOpen(true);
  };

  const onDeleteCancel = () => {
    setIsModalOpen(false);
  };

  const onDelete = (item_id: any) => {
    setIsModalOpen(false);
    const payload = {
      comment: {
        id: item_id,
      },
    };
    dispatch(destroyCommentAsync(payload));
    refreshPage();
  };

  return !noComments ? (
    <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      loadMore={loadMore}
      style={{ position: "relative", margin: 20 }}
      dataSource={list}
      renderItem={(item) => (
        <Card
          style={{
            margin: "auto",
            width: "auto",
            height: "auto",
            position: "relative",
          }}
        >
          {commentByCurrentUser(item.user.id!) && !isEditing(item.id!) && (
            <div>
              <Button onClick={() => setCommentEditing(item.id!, true)}>
                Edit
              </Button>
              <Button onClick={showModal}>Delete</Button>
              <Modal
                title="Are you sure you want to delete this?"
                open={isModalOpen}
                onOk={() => onDelete(item.id)}
                okText="Yes"
                onCancel={onDeleteCancel}
              ></Modal>
            </div>
          )}
          {!isEditing(item.id!) ? (
            <Meta
              avatar={
                item.user.image_url ? (
                  <Avatar src={item.user.image_url} />
                ) : (
                  <Avatar icon={<UserOutlined />} />
                )
              }
              title={
                <div>
                  <div style={{ textAlign: "left" }}>{item.user.username}</div>
                </div>
              }
              description={item.body}
            />
          ) : (
            <>
              <TextArea
                placeholder={item.body}
                style={{ width: 600 }}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={1}
              />
              <Button onClick={() => onEdit(item)}>Edit</Button>
              <Button onClick={() => setCommentEditing(item.id!, false)}>
                Cancel
              </Button>
            </>
          )}
        </Card>
      )}
    />
  ) : (
    <div>No comments</div>
  );
};

export default Comments;
