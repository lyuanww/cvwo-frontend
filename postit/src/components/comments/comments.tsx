import React, { useState } from "react";
import { Avatar, List, Card, Button, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import {
  CommentState,
  destroyCommentAsync,
  updateCommentAsync,
} from "../../store/comment/commentSlice";
import TextArea from "antd/es/input/TextArea";

const { Meta } = Card;
interface Props {
  comments: CommentState[];
}

interface EditState {
  id: number;
  isEditing: boolean;
}

const Comments = ({ comments }: Props) => {
  const [comment, setComment] = useState("");
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const setInitialEditStates = (comments: CommentState[]) => {
    return comments.map((item) => {
      const comment_id: number = item.id!;
      return { id: comment_id, isEditing: false };
    });
  };

  const [editing, setEditing] = useState<EditState[]>(
    setInitialEditStates(comments)
  );

  const commentByCurrentUser = (user_id: number) => {
    return user.id === user_id;
  };

  const isEditing = (user_id: number) => {
    const check = (item: EditState) => item.id === user_id;
    const item: EditState = editing.find(check)!;
    return item.isEditing;
  };

  const setCommentEditing = (id: number, isEditing: boolean) => {
    const newEditing = editing.map((item) => {
      return item.id === id ? { id: id, isEditing: isEditing } : item;
    });
    setEditing(newEditing);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const refreshPage = () => {
    window.location.reload();
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
              avatar={<Avatar icon={<UserOutlined />} />}
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
  );
};

export default Comments;
