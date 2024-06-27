import {
  SET_AUTH_CHECKED,
  SET_USER,
  PATCH_USER_REQUEST,
  PATCH_USER_SUCCESS,
  PATCH_USER_FAILED,
  POST_SIGN_IN_REQUEST,
  POST_SIGN_IN_SUCCESS,
  POST_SIGN_IN_FAILED,
  POST_REGISTER_REQUEST,
  POST_REGISTER_SUCCESS,
  POST_REGISTER_FAILED,
  POST_SIGN_OUT_REQUEST,
  POST_SIGN_OUT_SUCCESS,
  POST_SIGN_OUT_FAILED,
} from "../actions/actions-user";

const initialState = {
  isAuthChecked: false,
  user: null,
  patchRequest: false,
  patchFailed: false,
  signInRequest: false,
  signInFailed: false,
  signOutRequest: false,
  signOutFailed: false,
  registerRequest: false,
  registerFailed: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case PATCH_USER_REQUEST: {
      return {
        ...state,
        patchRequest: true,
        patchFailed: false,
      };
    }
    case PATCH_USER_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          name: action.user.name,
          email: action.user.email,
          password: action.user.password,
        },
        patchRequest: false,
        isAuthChecked: true,
      };
    }
    case PATCH_USER_FAILED: {
      return {
        ...state,
        patchFailed: true,
        patchRequest: false,
      };
    }

    case POST_REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
        registerFailed: false,
      };
    }
    case POST_REGISTER_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          name: action.user.name,
          email: action.user.email,
          password: action.user.password,
        },
        registerRequest: false,
        isAuthChecked: true,
      };
    }
    case POST_REGISTER_FAILED: {
      return {
        ...state,
        registerFailed: true,
        registerRequest: false,
      };
    }
    case POST_SIGN_IN_REQUEST: {
      return {
        ...state,
        signInRequest: true,
        signInFailed: false,
      };
    }
    case POST_SIGN_IN_SUCCESS: {
      return {
        ...state,
        signInRequest: false,
        user: {
          ...state.user,
          name: action.user.name,
          email: action.user.email,
          password: action.user.password,
        },
        isAuthChecked: true,
      };
    }
    case POST_SIGN_IN_FAILED: {
      return {
        ...state,
        signRequest: false,
        signFailed: true,
      };
    }
    case POST_SIGN_OUT_REQUEST: {
      return {
        ...state,
        signOutRequest: true,
        signOutFailed: false,
      };
    }
    case POST_SIGN_OUT_SUCCESS: {
      return {
        ...state,
        signOutRequest: false,
        signOutFailed: true,
      };
    }
    case POST_SIGN_OUT_FAILED: {
      return {
        ...state,
        signOutRequest: false,
        signOutFailed: true,
      };
    }

    default:
      return state;
  }
};
