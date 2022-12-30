import axios from "axios";
import { displayPartsToString } from "typescript";
import { useAppDispatch } from "../hooks";
import { login, logout, SessionLoginData, SessionState } from "./sessionSlice";

// export async function createComment(payload: CommentFormData) {
//   return axios
//     .post(API_URL, payload, { withCredentials: true })
//     .then((response) => response.data)
//     .catch((error) => {
//       console.log("Error:" + error);
//       return {} as CommentsState;
//     });
// }

export async function loginSession(payload: SessionLoginData) {
  return axios
    .post("http://localhost:3000/api/v1/login", payload, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("Error:" + error);
      return {} as SessionState;
    });
}

export async function logoutSession() {
  return axios
    .delete("http://localhost:3000/api/v1/logout", { withCredentials: true })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("Error:" + error);
      return {} as SessionState;
    });
}

export async function fetchCurrentSession() {
  return axios
    .get("http://localhost:3000/api/v1/logged_in", { withCredentials: true })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("Error:" + error);
      return {} as SessionState;
    });
}
