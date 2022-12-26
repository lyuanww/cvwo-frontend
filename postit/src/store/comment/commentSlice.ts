import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import produce from "immer";
import { RootState } from "../store";
import { createComment, destroyComment, updateComment } from "./actionsAPI";

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
  post_id?: number | null;
  created_at?: string;
  user: {
    id: number | null;
    username: string;
  };
}
export interface CommentFormData {
  comment: {
    body: string;
    post_id: number | null;
  };
}

export interface CommentUpdateData {
  comment: {
    id: number;
    body: string;
  };
}
export interface CommentDeleteData {
  comment: {
    id: number;
  };
}

const initialState: CommentsState = {
  comments: [
    {
      id: null,
      body: "",

      post_id: null,
      user: {
        id: null,
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

export const destroyCommentAsync = createAsyncThunk(
  "posts/destroyComment",
  async (payload: CommentDeleteData) => {
    const response = await destroyComment(payload);
    return response;
  }
);

export const updateCommentAsync = createAsyncThunk(
  "posts/updateComment",
  async (payload: CommentUpdateData) => {
    const response = await updateComment(payload);

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
