import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import usersReducer from "./user/reducer";
import errorsReducer from "./error/error";
import postsReducer from "./post/postSlice";

export const store = configureStore({
  reducer: {
    user: usersReducer,
    error: errorsReducer,
    posts: postsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
