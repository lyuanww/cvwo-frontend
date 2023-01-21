import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import produce from "immer";
import { RootState } from "../store";
import { UserState } from "../user/userSlice";
import { fetchCurrentSession, loginSession, logoutSession } from "./actionsAPI";

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
export interface SessionState {
  session: {
    id: number | null;
    isLoggedIn: boolean;
    username: string;
    image_url: string | null;
    error: string | null;
  };
  status: Statuses;
}

export interface SessionLoginData {
  session: { username: string; password: string };
}

export const loginSessionAsync = createAsyncThunk<
  UserState,
  SessionLoginData,
  { rejectValue: ValidationErrors }
>(
  "session/loginSession",
  async (payload: SessionLoginData, { rejectWithValue }) => {
    try {
      const response = await loginSession(payload);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
    }
  }
);

export const logoutSessionAsync = createAsyncThunk(
  "session/logoutSession",
  async () => {
    const response = await logoutSession();
    return response;
  }
);

export const fetchCurrentSessionAsync = createAsyncThunk(
  "session/fetchCurrentSession",
  async () => {
    const response = await fetchCurrentSession();

    return response;
  }
);

const initialState: SessionState = {
  session: {
    id: null,
    isLoggedIn: false,
    username: "",
    image_url: null,
    error: null,
  },

  status: Statuses.Initial,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    login: (state, action) => {
      state.session.isLoggedIn = true;
      state.session.id = action.payload.user.id;
      state.session.username = action.payload.user.username;
    },
    logout: (state) => {
      state.session.isLoggedIn = false;
      state.session.id = null;
      state.session.username = "";
      state.status = Statuses.Initial;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginSessionAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      .addCase(loginSessionAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.session.error = null;
          draftState.session.isLoggedIn = true;
          draftState.session.id = action.payload.user.id;
          draftState.session.username = action.payload.user.username;
          draftState.session.image_url = action.payload.user.image_url;
          draftState.status = Statuses.UpToDate;
        });
      })
      .addCase(loginSessionAsync.rejected, (state, action) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
          if (action.payload) {
            // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
            draftState.session.error = action.payload.error;
          }
        });
      })
      .addCase(fetchCurrentSessionAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      .addCase(fetchCurrentSessionAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.session.isLoggedIn = true;
          draftState.session.id = action.payload.user.id;
          draftState.session.username = action.payload.user.username;
          draftState.session.image_url = action.payload.user.image_url;
          draftState.status = Statuses.UpToDate;
        });
      })
      .addCase(fetchCurrentSessionAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      });
  },
});

export const { login, logout } = sessionSlice.actions;

export const selectSession = (state: RootState) => state.session.session;

export const selectStatus = (state: RootState) => state.session.status;

export default sessionSlice.reducer;
