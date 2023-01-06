import axios from "axios";

import { UserFormData, UserState } from "./userSlice";

export async function createUser(payload: UserFormData, data: FormData) {
  return axios
    .post("http://localhost:3000/api/v1/users", payload, {
      headers: { "Access-Control-Allow-Credentials": true },
    })
    .then((response) => {
      if (data) {
        addProfilePicture(data);
      }
      return response.data;
    });
}

export async function addProfilePicture(data: FormData) {
  return axios
    .post("http://localhost:3000/api/v1/users/add_profile_pic", data, {
      headers: {
        "Access-Control-Allow-Credentials": true,
        "content-type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("Error:" + error);
      return {} as UserState;
    });
}
