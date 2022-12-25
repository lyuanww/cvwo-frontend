import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import produce from "immer";
import { RootState } from "../store";
import { createComment } from "./actionsAPI";

export enum Statuses {
  Initial = "Not Fetched",
  Loading = "Loading...",
  UpToDate = "Up To Date",
  Deleted = "Deleted",
  Error = "Error",
}

export interface CommentsState {
  comments: CommentState[];
  status: string;
}

export interface CommentState {
  id?: number | null;
  body?: string;
  user_id?: number | null;
  post_id?: number | null;
  created_at?: string;
  user: {
    username: string;
  };
}
export interface CommentFormData {
  comment: {
    body: string;
    post_id: number | null;
  };
}

const initialState: CommentsState = {
  comments: [
    {
      id: null,
      body: "",
      user_id: null,
      post_id: null,
      user: {
        username: "",
      },
    },
  ],
  status: Statuses.Initial,
};

export const createCommentAsync = createAsyncThunk(
  "posts/createComment",
  async (payload: CommentFormData) => {
    const response = await createComment(payload);
    return response;
  }
);
export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = commentsSlice.actions;

export const selectComments = (state: RootState) => state.comments.comments;

export const selectStatus = (state: RootState) => state.comments.status;

export default commentsSlice.reducer;
