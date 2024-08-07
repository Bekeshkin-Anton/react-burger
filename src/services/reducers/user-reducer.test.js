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

import { userReducer, initialState } from "./user-reducer";

describe("userReducer", () => {
  it("should return the initial state", () => {
    expect(userReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle SET_AUTH_CHECKED", () => {
    const action = { type: SET_AUTH_CHECKED, payload: true };
    const expectedState = {
      ...initialState,
      isAuthChecked: true,
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle SET_USER", () => {
    const user = { name: "John", email: "john@example.com", password: "password" };
    const action = { type: SET_USER, payload: user };
    const expectedState = {
      ...initialState,
      user,
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle PATCH_USER_REQUEST", () => {
    const action = { type: PATCH_USER_REQUEST };
    const expectedState = {
      ...initialState,
      patchRequest: true,
      patchFailed: false,
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle PATCH_USER_SUCCESS", () => {
    const user = { name: "John", email: "john@example.com", password: "password" };
    const action = { type: PATCH_USER_SUCCESS, user };
    const expectedState = {
      ...initialState,
      user,
      patchRequest: false,
      isAuthChecked: true,
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle PATCH_USER_FAILED", () => {
    const action = { type: PATCH_USER_FAILED };
    const expectedState = {
      ...initialState,
      patchFailed: true,
      patchRequest: false,
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle POST_REGISTER_REQUEST", () => {
    const action = { type: POST_REGISTER_REQUEST };
    const expectedState = {
      ...initialState,
      registerRequest: true,
      registerFailed: false,
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle POST_REGISTER_SUCCESS", () => {
    const user = { name: "John", email: "john@example.com", password: "password" };
    const action = { type: POST_REGISTER_SUCCESS, user };
    const expectedState = {
      ...initialState,
      user,
      registerRequest: false,
      isAuthChecked: true,
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle POST_REGISTER_FAILED", () => {
    const action = { type: POST_REGISTER_FAILED };
    const expectedState = {
      ...initialState,
      registerFailed: true,
      registerRequest: false,
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle POST_SIGN_IN_REQUEST", () => {
    const action = { type: POST_SIGN_IN_REQUEST };
    const expectedState = {
      ...initialState,
      signInRequest: true,
      signInFailed: false,
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle POST_SIGN_IN_SUCCESS", () => {
    const user = { name: "John", email: "john@example.com", password: "password" };
    const action = { type: POST_SIGN_IN_SUCCESS, user };
    const expectedState = {
      ...initialState,
      user,
      signInRequest: false,
      isAuthChecked: true,
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle POST_SIGN_IN_FAILED", () => {
    const action = { type: POST_SIGN_IN_FAILED };
    const expectedState = {
      ...initialState,
      signInRequest: false,
      signInFailed: true,
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle POST_SIGN_OUT_REQUEST", () => {
    const action = { type: POST_SIGN_OUT_REQUEST };
    const expectedState = {
      ...initialState,
      signOutRequest: true,
      signOutFailed: false,
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle POST_SIGN_OUT_SUCCESS", () => {
    const action = { type: POST_SIGN_OUT_SUCCESS };
    const expectedState = {
      ...initialState,
      signOutRequest: false,
      signOutFailed: true,
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle POST_SIGN_OUT_FAILED", () => {
    const action = { type: POST_SIGN_OUT_FAILED };
    const expectedState = {
      ...initialState,
      signOutRequest: false,
      signOutFailed: true,
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });
});
