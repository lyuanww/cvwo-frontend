import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import sessionReducer from "./session/sessionSlice";
import postsReducer from "./post/postSlice";
import tagsReducer from "./tag/tagSlice";
import commentsReducer from "./comment/commentSlice";
import usersReducer from "./user/userSlice";

/*
Store structure is referenced from https://www.youtube.com/watch?v=ZGnMqKg-Cq4&ab_channel=Deanin
*/

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    posts: postsReducer,
    tags: tagsReducer,
    comments: commentsReducer,
    users: usersReducer,
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
