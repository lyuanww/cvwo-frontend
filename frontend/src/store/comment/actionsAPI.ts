import axios from "axios";
import {
  CommentDeleteData,
  CommentFormData,
  CommentsState,
  CommentUpdateData,
} from "./commentSlice";

const API_URL = "https://postit-zwa8.onrender.com/api/v1/comments";

export async function createComment(payload: CommentFormData) {
  return axios
    .post(API_URL, payload, { withCredentials: true })
    .then((response) => response.data)
    .catch((error) => {
      console.log("Error:" + error);
      return {} as CommentsState;
    });
}

export async function destroyComment(payload: CommentDeleteData) {
  return axios
    .delete(`${API_URL}/${payload.comment.id}`, { withCredentials: true })
    .then((response) => response.data)
    .catch((error) => {
      console.log("Error:" + error);
      return {} as CommentsState;
    });
}

export async function updateComment(payload: CommentUpdateData) {
  return axios
    .patch(`${API_URL}/${payload.comment.id}`, payload, {
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log("Error:" + error);
      return {} as CommentsState;
    });
}
