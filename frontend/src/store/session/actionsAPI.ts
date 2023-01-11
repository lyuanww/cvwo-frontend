import axios from "axios";

import { SessionLoginData, SessionState } from "./sessionSlice";

export async function loginSession(payload: SessionLoginData) {
  return axios
    .post("https://post-it.herokuapp.com/api/v1/login", payload, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    });
}

export async function logoutSession() {
  return axios
    .delete("https://post-it.herokuapp.com/api/v1/logout", {
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
    .get("https://post-it.herokuapp.com/api/v1/logged_in", {
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
