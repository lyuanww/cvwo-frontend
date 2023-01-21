import axios from "axios";

import { UserFormData, UserState } from "./userSlice";

export async function createUser(payload: UserFormData, data: FormData) {
  return axios
    .post("https://post-it.herokuapp.com/api/v1/users", payload, {
      headers: { "Access-Control-Allow-Credentials": true },
    })
    .then((response) => {
      // If there is pic data, another API request will be made to add the profile picture.
      if (data) {
        addProfilePicture(data);
      }
      return response.data;
    });
}

// This data is in FormData as json does not deal with Blob object.
export async function addProfilePicture(data: FormData) {
  return axios
    .post("https://post-it.herokuapp.com/api/v1/users/add_profile_pic", data, {
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
