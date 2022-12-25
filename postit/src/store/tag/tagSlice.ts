import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import produce from "immer";
import { RootState } from "../store";

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
