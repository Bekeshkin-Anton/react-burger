import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  MODAL_ORDER_DETAILS_OPEN,
  MODAL_ORDER_DETAILS_CLOSE,
} from "../actions/order-details-actions";
import { orderDetailsReducer, initialState } from "./order-details-reducer";

describe("orderDetailsReducer", () => {
  it("should return the initial state", () => {
    expect(orderDetailsReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle POST_ORDER_REQUEST", () => {
    const action = {
      type: POST_ORDER_REQUEST,
    };
    const expectedState = {
      ...initialState,
      orderRequest: true,
    };
    expect(orderDetailsReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle POST_ORDER_SUCCESS", () => {
    const newOrder = { id: "1", name: "Order 1" };
    const action = {
      type: POST_ORDER_SUCCESS,
      order: newOrder,
    };
    const expectedState = {
      ...initialState,
      orderFailed: false,
      orderRequest: false,
      currOrder: newOrder,
    };
    expect(orderDetailsReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle POST_ORDER_FAILED", () => {
    const action = {
      type: POST_ORDER_FAILED,
    };
    const expectedState = {
      ...initialState,
      orderFailed: true,
      orderRequest: false,
    };
    expect(orderDetailsReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle MODAL_ORDER_DETAILS_OPEN", () => {
    const action = {
      type: MODAL_ORDER_DETAILS_OPEN,
    };
    const expectedState = {
      ...initialState,
      isOpenOrder: true,
    };
    expect(orderDetailsReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle MODAL_ORDER_DETAILS_CLOSE", () => {
    const action = {
      type: MODAL_ORDER_DETAILS_CLOSE,
    };
    const expectedState = {
      ...initialState,
      isOpenOrder: false,
    };
    expect(orderDetailsReducer(initialState, action)).toEqual(expectedState);
  });
});
