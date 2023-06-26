import axios from "axios";
import { SessionLoginData, SessionState } from "./sessionSlice";

export async function loginSession(payload: SessionLoginData) {
  return axios
    .post("https://postit-a8rt.onrender.com/api/v1/login", payload, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    });
}

export async function logoutSession() {
  return axios
    .delete("https://postit-a8rt.onrender.com/api/v1/logout", {
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

export async function fetchCurrentSession() {
  return axios
    .get("https://postit-a8rt.onrender.com/api/v1/logged_in", {
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
