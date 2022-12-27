import axios from "axios";

import { UserFormData, UsersState } from "./userSlice";

export async function createUser(payload: UserFormData) {
  return axios
    .post("http://localhost:3000/api/v1/users", payload, {
      headers: { "Access-Control-Allow-Credentials": true },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("Error:" + error);
      return {} as UsersState;
    });
}
