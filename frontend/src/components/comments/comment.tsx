import React, {useState } from "react";
import { Avatar, Card, Button, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { UserOutlined } from "@ant-design/icons";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  CommentState,
  destroyCommentAsync,
  updateCommentAsync,
} from "../../store/comment/commentSlice";
import { selectSession } from "../../store/session/sessionSlice";

const { Meta } = Card;

//Number of comments that is loaded when user clicks on load more button,
const pageSize = 1;

interface props {
  comment: CommentState;
}

const Comment = ({ comment }: props) => {
  const [editing, setEditing] = useState(false);
  const [editingText, setEditingText] = useState("");
  const [index, setIndex] = useState(pageSize);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const session = useAppSelector(selectSession);

  const refreshPage = () => {
    window.location.reload();
  };

  const commentByCurrentUser = (user_id: number) => {
    return session.id === user_id;
  };

  const onEdit = () => {
    const payload = {
      comment: {
        id: comment.id!,
        body: editingText,
      },
    };
    dispatch(updateCommentAsync(payload));
    setEditingText(editingText);
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
    setIndex(index);
    refreshPage();
  };

  return (
    <Card
      style={{
        margin: "auto",
        width: "auto",
        height: "auto",
        position: "relative",
      }}
    >
      {commentByCurrentUser(comment.user.id!) && !editing && (
        <div>
          <Button onClick={() => setEditing(true)}>Edit</Button>
          <Button onClick={showModal}>Delete</Button>
          <Modal
            title="Are you sure you want to delete this?"
            open={isModalOpen}
            onOk={() => onDelete(comment.id)}
            okText="Yes"
            onCancel={onDeleteCancel}
          ></Modal>
        </div>
      )}
      {!editing ? (
        <Meta
          avatar={
            comment.user.image_url ? (
              <Avatar src={comment.user.image_url} />
            ) : (
              <Avatar icon={<UserOutlined />} />
            )
          }
          title={
            <div>
              <div style={{ textAlign: "left" }}>{comment.user.username}</div>
            </div>
          }
          description={comment.body}
        />
      ) : (
        <>
          <TextArea
            placeholder={comment.body}
            style={{ width: 600 }}
            value={editingText}
            rows={1}
          />
          <Button onClick={() => onEdit()}>Edit</Button>
          <Button onClick={() => setEditing(false)}>Cancel</Button>
        </>
      )}
    </Card>
  );
};

export default Comment;
