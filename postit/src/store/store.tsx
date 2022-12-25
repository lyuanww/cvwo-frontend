import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import usersReducer from "./user/reducer";
import errorsReducer from "./error/error";
import postsReducer from "./post/postSlice";
import tagsReducer from "./tag/tagSlice";
import commentsReducer from "./comment/commentSlice";

export const store = configureStore({
  reducer: {
    user: usersReducer,
    error: errorsReducer,
    posts: postsReducer,
    tags: tagsReducer,
    comments: commentsReducer,
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
