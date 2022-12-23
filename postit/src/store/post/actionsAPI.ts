import { PostsState, PostFormData, PostDeleteData } from "./postSlice";
import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/posts";

export async function fetchPosts() {
  return axios
    .get(API_URL)
    .then((response) => response.data)
    .catch((error) => {
      console.log("Error:" + error);
      return {} as PostsState;
    });
}

export async function fetchMyPosts() {
  return axios
    .get(`${API_URL}/users/current`, { withCredentials: true })
    .then((response) => response.data)
    .catch((error) => {
      console.log("Error:" + error);
      return {} as PostsState;
    });
}

export async function createPost(payload: PostFormData) {
  return axios
    .post(API_URL, payload, { withCredentials: true })
    .then((response) => response.data)
    .catch((error) => {
      console.log("Error:" + error);
      return {} as PostsState;
    });
}

export async function destroyPost(payload: PostDeleteData) {
  return axios
    .delete(`${API_URL}/${payload.post.id}`, { withCredentials: true })
    .then((response) => response.data)
    .catch((error) => {
      console.log("Error:" + error);
      return {} as PostsState;
    });
}
