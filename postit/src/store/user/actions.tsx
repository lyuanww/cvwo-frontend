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

export const showLoginUser =
  (data: any, handleSuccess: any) => (dispatch: any) => {
    axios
      .get("http://localhost:3000/api/v1/login")
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
