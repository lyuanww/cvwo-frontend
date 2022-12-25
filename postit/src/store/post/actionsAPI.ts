import {
  PostsState,
  PostFormData,
  PostDeleteData,
  PostUpdateData,
} from "./postSlice";
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
    .get(`${API_URL}/current_user`, { withCredentials: true })
    .then((response) => response.data)
    .catch((error) => {
      console.log("Error:" + error);
      return {} as PostsState;
    });
}

export async function fetchPostsByTags(tag_id: number) {
  return axios
    .get(`${API_URL}/tags/${tag_id}`, { withCredentials: true })
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

export async function updatePost(payload: PostUpdateData) {
  return axios
    .patch(`${API_URL}/${payload.post.id}`, payload, {
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log("Error:" + error);
      return {} as PostsState;
    });
}
