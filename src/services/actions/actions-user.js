import { getUser, login, postRegister, logOut, patchUser } from "../../api/api";

export const GET_USER_REQUEST = "GET_DATA_REQUEST";
export const GET_USER_SUCCESS = "GET_DATA_SUCCESS";
export const GET_USER_FAILED = "GET_DATA_FAILED";

export const PATCH_USER_REQUEST = "PATCH_DATA_REQUEST";
export const PATCH_USER_SUCCESS = "PATCH_DATA_SUCCESS";
export const PATCH_USER_FAILED = "PATCH_DATA_FAILED";

export const POST_SIGN_IN_REQUEST = "POST_SIGN_IN_REQUEST";
export const POST_SIGN_IN_SUCCESS = "POST_SIGN_IN_SUCCESS";
export const POST_SIGN_IN_FAILED = "POST_SIGN_IN_FAILED";

export const POST_SIGN_OUT_REQUEST = "POST_SIGN_OUT_REQUEST";
export const POST_SIGN_OUT_SUCCESS = "POST_SIGN_OUT_SUCCESS";
export const POST_SIGN_OUT_FAILED = "POST_SIGN_OUT_FAILED";

export const POST_REGISTER_REQUEST = "POST_REGISTER_REQUEST";
export const POST_REGISTER_SUCCESS = "POST_REGISTER_SUCCESS";
export const POST_REGISTER_FAILED = "POST_REGISTER_FAILED";

export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SET_USER = "SET_USER";

export function postRegisterFetch(array) {
  return function (dispatch) {
    dispatch({
      type: POST_REGISTER_REQUEST,
    });
    postRegister(array)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: POST_REGISTER_SUCCESS,
            user: setUser(res.user),
          });
        } else {
          dispatch({
            type: POST_REGISTER_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: POST_REGISTER_FAILED,
        });
      });
  };
}

export const setAuthChecked = (value) => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const getUserFetch = () => {
  return function (dispatch) {
    return getUser().then((res) => {
      dispatch(setUser(res.user));
    });
  };
};

export const patchUserFetch = (form) => {
  return function (dispatch) {
    dispatch({
      type: POST_SIGN_IN_REQUEST,
    });
    patchUser(form)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: PATCH_USER_SUCCESS,
            user: res,
          });
          dispatch(setUser(res.user));
        } else {
          dispatch({
            type: PATCH_USER_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: PATCH_USER_FAILED,
        });
      });
  };
};

export const signIn = (form) => {
  return function (dispatch) {
    dispatch({
      type: POST_SIGN_IN_REQUEST,
    });
    login(form)
      .then((res) => {
        if (res && res.success) {
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
          dispatch({
            type: POST_SIGN_IN_SUCCESS,
            user: res,
          });
          dispatch(setUser(res.user));
          dispatch(setAuthChecked(true));
        } else {
          dispatch({
            type: POST_SIGN_IN_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: POST_SIGN_IN_FAILED,
        });
      });
  };
};

export const register = (form) => {
  return function (dispatch) {
    dispatch({
      type: POST_REGISTER_REQUEST,
    });
    postRegister(form)
      .then((res) => {
        if (res && res.success) {
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
          dispatch({
            type: POST_REGISTER_SUCCESS,
            user: res,
          });
          dispatch(setUser(res.user));
        } else {
          dispatch({
            type: POST_REGISTER_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: POST_REGISTER_FAILED,
        });
      });
  };
};

export const userAuth = () => {
  return function (dispatch) {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUserFetch())
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

export const signOut = () => {
  return function (dispatch) {
    dispatch({
      type: POST_SIGN_OUT_REQUEST,
    });
    logOut()
      .then((res) => {
        if (res && res.success) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch({
            type: POST_SIGN_OUT_SUCCESS,
          });
          dispatch(setUser(null));
        } else {
          dispatch({
            type: POST_SIGN_OUT_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: POST_SIGN_OUT_FAILED,
        });
      });
  };
};
