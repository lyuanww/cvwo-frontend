import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import produce from "immer";
import { RootState } from "../store";
import { createUser } from "./actionsAPI";

export enum Statuses {
  Initial = "Not Fetched",
  Loading = "Loading...",
  UpToDate = "Up To Date",
  Deleted = "Deleted",
  Error = "Error",
}

export interface UsersState {
  users: UserState[];
  status: Statuses;
}

export interface UserState {
  id: number | null;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface UserFormData {
  user: {
    id?: number | null;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
  };
}

const initialState: UsersState = {
  users: [
    {
      id: null,
      username: "",
      email: "",
      first_name: "",
      last_name: "",
    },
  ],
  status: Statuses.Initial,
};

export const createUserAsync = createAsyncThunk(
  "users/createUser",
  async (payload: UserFormData) => {
    const response = await createUser(payload);

    return response;
  }
);
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.users;

export const selectStatus = (state: RootState) => state.users.status;

export default usersSlice.reducer;
