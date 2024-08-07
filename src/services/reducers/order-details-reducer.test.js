import {
  MODAL_ORDER_DETAILS_CLOSE,
  MODAL_ORDER_DETAILS_OPEN,
  POST_ORDER_FAILED,
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
} from "../actions/order-details-actions";
import { orderDetailsReducer, initialState } from "./order-details-reducer";

const order = {
  id: "1",
  content: "test",
};

describe("order details reducer", () => {
  it("initialization", () => {
    const state = orderDetailsReducer(undefined, {});
    expect(state).toEqual(initialState);
  });
  it("should handle POST_ORDER_REQUEST", () => {
    const action = { type: POST_ORDER_REQUEST, payload: order };
    const state = orderDetailsReducer(initialState, action);
    expect(state).toEqual({ ...initialState, orderRequest: true });
  });
  it("should handle POST_ORDER_SUCCESS", () => {
    const action = { type: POST_ORDER_SUCCESS, payload: order };
    const state = orderDetailsReducer(initialState, action);
    expect(state).toEqual({ ...initialState, orderFailed: false, orderRequest: false, currOrder: action.order });
  });
  it("should handle POST_ORDER_FAILED", () => {
    const action = { type: POST_ORDER_FAILED, payload: order };
    const state = orderDetailsReducer(initialState, action);
    expect(state).toEqual({ ...initialState, orderFailed: true, orderRequest: false });
  });
  it("should handle MODAL_ORDER_DETAILS_OPEN", () => {
    const action = { type: MODAL_ORDER_DETAILS_OPEN, payload: order };
    const state = orderDetailsReducer(initialState, action);
    expect(state).toEqual({ ...initialState, isOpenOrder: true });
  });
  it("should handle MODAL_ORDER_DETAILS_CLOSE", () => {
    const action = { type: MODAL_ORDER_DETAILS_CLOSE, payload: order };
    const state = orderDetailsReducer(initialState, action);
    expect(state).toEqual({ ...initialState, isOpenOrder: false });
  });
});
