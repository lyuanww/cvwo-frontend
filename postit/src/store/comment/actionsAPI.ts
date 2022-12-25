import axios from "axios";
import { CommentFormData, CommentsState } from "./commentSlice";

const API_URL = "http://localhost:3000/api/v1/comments";

export async function createComment(payload: CommentFormData) {
  return axios
    .post(API_URL, payload, { withCredentials: true })
    .then((response) => response.data)
    .catch((error) => {
      console.log("Error:" + error);
      return {} as CommentsState;
    });
}
