import { combineReducers } from "redux";
import usersReducer from "./user/reducer";
import errorsReducer from "./error/error";
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from "react-redux";
const rootReducer = combineReducers({
  user: usersReducer,
  error: errorsReducer,
});
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export type RootState = ReturnType<typeof rootReducer>;
