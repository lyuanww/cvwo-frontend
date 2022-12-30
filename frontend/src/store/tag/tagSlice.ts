import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import produce from "immer";
import { RootState } from "../store";
import { fetchTags } from "./actionsAPI";

export enum Statuses {
  Initial = "Not Fetched",
  Loading = "Loading...",
  UpToDate = "Up To Date",
  Deleted = "Deleted",
  Error = "Error",
}

export interface TagsState {
  tags: TagState[];
  status: string;
}

export interface TagState {
  id?: number | null;
  name?: string;
}

const initialState: TagsState = {
  tags: [{ id: 0, name: "" }],
  status: Statuses.Initial,
};

export const fetchTagsAsync = createAsyncThunk("tags/fetch", async () => {
  const response = await fetchTags();
  return response;
});

export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTagsAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      .addCase(fetchTagsAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.tags = action.payload;
          draftState.status = Statuses.UpToDate;
        });
      })
      .addCase(fetchTagsAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      });
  },
});

export const {} = tagsSlice.actions;

export const selectTags = (state: RootState) => state.tags.tags;

export const selectStatus = (state: RootState) => state.tags.status;

export default tagsSlice.reducer;
