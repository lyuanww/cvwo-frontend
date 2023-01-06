import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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
interface ValidationErrors {
  error: string;
}
export interface UserState {
  user: {
    id: number | null;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    image_url: string | null;
    error: string | null;
  };
  status: Statuses;
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

export interface UserFinalFormData {
  user: UserFormData;
  pic: FormData;
}

const initialState: UserState = {
  user: {
    id: null,
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    image_url: null,
    error: null,
  },
  status: Statuses.Initial,
};

export const createUserAsync = createAsyncThunk<
  UserState,
  UserFinalFormData,
  { rejectValue: ValidationErrors }
>(
  "users/createUser",
  async (payload: UserFinalFormData, { rejectWithValue }) => {
    try {
      const response = await createUser(payload.user, payload.pic);

      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
    }
  }
);
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createUserAsync.rejected, (state, action) => {
      return produce(state, (draftState) => {
        draftState.status = Statuses.Error;
        if (action.payload) {
          // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.

          draftState.user.error = action.payload.error;
        }
      });
    });
  },
});

export const {} = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export const selectStatus = (state: RootState) => state.user.status;

export default userSlice.reducer;
