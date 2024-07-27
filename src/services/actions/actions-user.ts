import { getUser, login, postRegister, logOut, patchUser } from "../../api/api";
import { IUser, IUserLogin } from "../../utils/types";
import { AppDispatch } from "../../services/index";

export const PATCH_USER_REQUEST: "PATCH_DATA_REQUEST" = "PATCH_DATA_REQUEST";
export const PATCH_USER_SUCCESS: "PATCH_DATA_SUCCESS" = "PATCH_DATA_SUCCESS";
export const PATCH_USER_FAILED: "PATCH_DATA_FAILED" = "PATCH_DATA_FAILED";

export const POST_SIGN_IN_REQUEST: "POST_SIGN_IN_REQUEST" = "POST_SIGN_IN_REQUEST";
export const POST_SIGN_IN_SUCCESS: "POST_SIGN_IN_SUCCESS" = "POST_SIGN_IN_SUCCESS";
export const POST_SIGN_IN_FAILED: "POST_SIGN_IN_FAILED" = "POST_SIGN_IN_FAILED";

export const POST_SIGN_OUT_REQUEST: "POST_SIGN_OUT_REQUEST" = "POST_SIGN_OUT_REQUEST";
export const POST_SIGN_OUT_SUCCESS: "POST_SIGN_OUT_SUCCESS" = "POST_SIGN_OUT_SUCCESS";
export const POST_SIGN_OUT_FAILED: "POST_SIGN_OUT_FAILED" = "POST_SIGN_OUT_FAILED";

export const POST_REGISTER_REQUEST: "POST_REGISTER_REQUEST" = "POST_REGISTER_REQUEST";
export const POST_REGISTER_SUCCESS: "POST_REGISTER_SUCCESS" = "POST_REGISTER_SUCCESS";
export const POST_REGISTER_FAILED: "POST_REGISTER_FAILED" = "POST_REGISTER_FAILED";

export const SET_AUTH_CHECKED: "SET_AUTH_CHECKED" = "SET_AUTH_CHECKED";
export const SET_USER: "SET_USER" = "SET_USER";

export interface IPostRegisterAction {
  readonly type: typeof POST_REGISTER_REQUEST;
}

export interface IPostRegisterFailedAction {
  readonly type: typeof POST_REGISTER_FAILED;
}

export interface IPostRegisterSuccessAction {
  readonly type: typeof POST_REGISTER_SUCCESS;
  readonly user: Readonly<IUser>;
}

export interface ISetAuthCheckedAction {
  readonly type: typeof SET_AUTH_CHECKED;
  readonly payload: boolean;
}

export interface ISetUserAction {
  readonly type: typeof SET_USER;
  readonly payload: Readonly<IUser> | null;
}

export interface IPatchUserAction {
  readonly type: typeof PATCH_USER_REQUEST;
}

export interface IPatchUserFailedAction {
  readonly type: typeof PATCH_USER_FAILED;
}

export interface IPatchUserSuccessAction {
  readonly type: typeof PATCH_USER_SUCCESS;
  readonly user: IUser;
}

export interface ISignInAction {
  readonly type: typeof POST_SIGN_IN_REQUEST;
}

export interface ISignInFailedAction {
  readonly type: typeof POST_SIGN_IN_FAILED;
}

export interface ISignInSuccessAction {
  readonly type: typeof POST_SIGN_IN_SUCCESS;
  readonly user: Readonly<IUser>;
}

export interface ISignOutAction {
  readonly type: typeof POST_SIGN_OUT_REQUEST;
}

export interface ISignOutFailedAction {
  readonly type: typeof POST_SIGN_OUT_FAILED;
}

export interface ISignOutSuccessAction {
  readonly type: typeof POST_SIGN_OUT_SUCCESS;
}

export type TUserActions =
  | IPostRegisterAction
  | IPostRegisterFailedAction
  | IPostRegisterSuccessAction
  | ISetAuthCheckedAction
  | ISetUserAction
  | IPatchUserAction
  | IPatchUserFailedAction
  | IPatchUserSuccessAction
  | ISignInAction
  | ISignInFailedAction
  | ISignInSuccessAction
  | ISignOutAction
  | ISignOutFailedAction
  | ISignOutSuccessAction;

export function postRegisterFetch(obj: IUser) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: POST_REGISTER_REQUEST,
    });
    postRegister(obj)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: POST_REGISTER_SUCCESS,
            user: setUser(res.register),
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

export const setAuthChecked = (value: boolean): ISetAuthCheckedAction => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user: Readonly<IUser> | null): ISetUserAction => ({
  type: SET_USER,
  payload: user,
});

export const getUserFetch = () => {
  return function (dispatch: AppDispatch) {
    return getUser().then((res) => {
      dispatch(setUser(res.user));
    });
  };
};

export const patchUserRequest = (): IPatchUserAction => ({
  type: PATCH_USER_REQUEST,
});

export const patchUserSuccess = (user: IUser): IPatchUserSuccessAction => ({
  type: PATCH_USER_SUCCESS,
  user,
});

export const patchUserFailed = (): IPatchUserFailedAction => ({
  type: PATCH_USER_FAILED,
});

export const patchUserFetch = (form: IUser) => {
  return function (dispatch: AppDispatch) {
    dispatch(patchUserRequest());
    patchUser(form)
      .then((res) => {
        dispatch(patchUserSuccess(res.user));
        dispatch(setUser(res.user));
      })
      .catch((err) => {
        dispatch(patchUserFailed());
      });
  };
};

export const postSignInRequest = (): ISignInAction => ({
  type: POST_SIGN_IN_REQUEST,
});

export const postSignInSuccess = (user: IUser): ISignInSuccessAction => ({
  type: POST_SIGN_IN_SUCCESS,
  user,
});

export const postSignInFailed = (): ISignInFailedAction => ({
  type: POST_SIGN_IN_FAILED,
});

export const signIn = (form: IUserLogin) => {
  return function (dispatch: AppDispatch) {
    dispatch(postSignInRequest());
    login(form)
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(postSignInSuccess(res.user));
        dispatch(setUser(res.user));
        dispatch(setAuthChecked(true));
      })
      .catch((err) => {
        dispatch(postSignInFailed());
      });
  };
};

export const register = (form: IUser) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: POST_REGISTER_REQUEST,
    });
    postRegister(form)
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch({
          type: POST_REGISTER_SUCCESS,
          user: res,
        });
        dispatch(setUser(res.register));
      })
      .catch((err) => {
        dispatch({
          type: POST_REGISTER_FAILED,
        });
      });
  };
};

export const userAuth = () => {
  return function (dispatch: AppDispatch) {
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

export const postSignOutRequest = (): ISignOutAction => ({
  type: POST_SIGN_OUT_REQUEST,
});

export const postSignOutSuccess = (): ISignOutSuccessAction => ({
  type: POST_SIGN_OUT_SUCCESS,
});

export const postSignOutFailed = (): ISignOutFailedAction => ({
  type: POST_SIGN_OUT_FAILED,
});

export const signOut = () => {
  return function (dispatch: AppDispatch) {
    dispatch(postSignOutRequest());
    logOut()
      .then((res) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(postSignOutSuccess());
        dispatch(setUser(null));
      })
      .catch((err) => {
        dispatch(postSignOutFailed());
      });
  };
};
