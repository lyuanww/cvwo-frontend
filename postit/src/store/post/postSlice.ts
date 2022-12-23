import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import produce from "immer";
import { RootState } from "../store";
import {
  fetchPosts,
  fetchMyPosts,
  createPost,
  destroyPost,
} from "./actionsAPI";

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

export interface PostFormData {
  post: {
    id?: number;
    title: string;
    body: string;
    likes?: number;
  };
}

export interface PostDeleteData {
  post: {
    id: number;
  };
}

export interface PostUpdateData {
  id: number;
  post: PostState;
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

export const fetchMyPostsAsync = createAsyncThunk(
  "posts/fetchMyPosts",
  async () => {
    const response = await fetchMyPosts();
    return response;
  }
);

export const createPostAsync = createAsyncThunk(
  "posts/createPost",
  async (payload: PostFormData) => {
    const response = await createPost(payload);
    return response;
  }
);

export const destroyPostAsync = createAsyncThunk(
  "posts/destroyPost",
  async (payload: PostDeleteData) => {
    const response = await destroyPost(payload);
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
      .addCase(fetchMyPostsAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      .addCase(fetchMyPostsAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.posts = action.payload;
          draftState.status = Statuses.UpToDate;
        });
      })
      .addCase(fetchMyPostsAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      })
      .addCase(createPostAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      .addCase(createPostAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.posts.push(action.payload);
          draftState.status = Statuses.UpToDate;
        });
      })
      .addCase(createPostAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      })
      .addCase(destroyPostAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      .addCase(destroyPostAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.UpToDate;
        });
      })
      .addCase(destroyPostAsync.rejected, (state) => {
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
