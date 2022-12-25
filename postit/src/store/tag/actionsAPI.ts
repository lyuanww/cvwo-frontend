import axios from "axios";
import { TagsState } from "./tagSlice";

const API_URL = "http://localhost:3000/api/v1/tags";

export async function fetchTags() {
  return axios
    .get(API_URL)
    .then((response) => response.data)
    .catch((error) => {
      console.log("Error:" + error);
      return {} as TagsState;
    });
}
