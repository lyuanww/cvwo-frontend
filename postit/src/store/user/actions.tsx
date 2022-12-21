import axios from "axios";

export const addUser = (data: any, handleSuccess: any) => (dispatch: any) => {
  axios
    .post(
      "http://localhost:3000/api/v1/users",
      { user: data },
      {
        headers: { "Access-Control-Allow-Credentials": true },
      }
    )
    .then((response) => {
      dispatch({ type: "LOGIN_USER", user: response.data.user });
      dispatch({ type: "CLEAR_ERROR" });
      handleSuccess();
    })
    .catch((response) =>
      dispatch({ type: "ADD_ERROR", error: response.message })
    );
};

export const loginUser = (data: any, handleSuccess: any) => (dispatch: any) => {
  axios
    .post(
      "http://localhost:3000/api/v1/login",
      { user: data },
      { withCredentials: true }
    )
    .then((response) => {
      if (response.data.status === 401) {
        throw new Error(response.data.error);
      }

      dispatch({
        type: "LOGIN_USER",
        user: response.data.user,
      });
      dispatch({ type: "CLEAR_ERROR" });

      handleSuccess();
    })
    .catch((response) =>
      dispatch({ type: "ADD_ERROR", error: response.message })
    );
};

export const logoutUser = (handleSuccess: any) => (dispatch: any) => {
  axios
    .delete("http://localhost:3000/api/v1/logout", { withCredentials: true })
    .then((response) => {
      dispatch({ type: "LOGOUT_USER" });
      dispatch({ type: "CLEAR_ERROR" });
      handleSuccess();
    })
    .catch((error) =>
      dispatch({ type: "ADD_ERROR", error: "Something went wrong. Try again." })
    );
};

export const fetchLoginStatus = () => (dispatch: any) => {
  axios
    .get("http://localhost:3000/api/v1/logged_in", { withCredentials: true })
    .then((response) => {
      if (response.data.logged_in) {
        dispatch({
          type: "LOGIN_USER",
          user: response.data.user,
        });
        dispatch({ type: "CLEAR_ERROR" });
      }
    })
    .catch((error) =>
      dispatch({ type: "ADD_ERROR", error: "Something went wrong. Try again." })
    );
};
