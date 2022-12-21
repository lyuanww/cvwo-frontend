import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./user/reducer";
import errorsReducer from "./error/error";

const store = configureStore({
  reducer: {
    users: usersReducer,
    errors: errorsReducer,
  },
});

export default store;
