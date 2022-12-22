import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import produce from "immer";
import { RootState } from "../store";
import { fetchPosts, fetchPostsByUser } from "./actionsAPI";

export enum Statuses {
  Initial = "Not Fetched",
  Loading = "Loading...",
  UpToDate = "Up To Date",
  Deleted = "Deleted",
  Error = "Error",
}

export interface PostsState {
  posts: PostState[];
  status: string;
}

export interface PostState {
  id?: number | null;
  title?: string;
  body?: string;
  likes?: number;
  createdAt?: string;
  updatedAt?: string;
  user_id?: number | null;
}

export interface User {
  id?: number;
}
const initialState: PostsState = {
  posts: [
    {
      id: null,
      title: "",
      body: "",
      likes: 0,
      createdAt: "",
      updatedAt: "",
      user_id: null,
    },
  ],
  status: Statuses.Initial,
};

export const fetchPostsAsync = createAsyncThunk("posts/fetch", async () => {
  const response = await fetchPosts();
  return response;
});

export const fetchPostsByUserAsync = createAsyncThunk(
  "posts/fetchByUser",
  async () => {
    const response = await fetchPostsByUser();
    return response;
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      .addCase(fetchPostsAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.posts = action.payload;
          draftState.status = Statuses.UpToDate;
        });
      })
      .addCase(fetchPostsAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      })
      .addCase(fetchPostsByUserAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      .addCase(fetchPostsByUserAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.posts = action.payload;
          draftState.status = Statuses.UpToDate;
        });
      })
      .addCase(fetchPostsByUserAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      });
  },
});

export const {} = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts.posts;

export const selectStatus = (state: RootState) => state.posts.status;

export default postsSlice.reducer;
