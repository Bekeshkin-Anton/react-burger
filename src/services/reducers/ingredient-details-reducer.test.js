import { getOrdersReducer, initialState } from "./get-order-reducer";
import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED } from "../actions/get-order-actions";

describe("getOrdersReducer", () => {
  it("should return the initial state", () => {
    expect(getOrdersReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle GET_ORDER_REQUEST", () => {
    const action = { type: GET_ORDER_REQUEST };
    const expectedState = {
      ...initialState,
      ordersRequest: true,
    };
    expect(getOrdersReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle GET_ORDER_SUCCESS", () => {
    const order = {
      _id: "1",
      status: "done",
      number: 123,
      createdAt: "2023-08-07T12:34:56Z",
      updatedAt: "2023-08-07T12:34:56Z",
      ingredients: ["1", "2", "3"],
      name: "Order 1",
    };
    const action = { type: GET_ORDER_SUCCESS, orders: order };
    const expectedState = {
      ...initialState,
      ordersFailed: false,
      order: order,
      ordersRequest: false,
    };
    expect(getOrdersReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle GET_ORDER_FAILED", () => {
    const action = { type: GET_ORDER_FAILED };
    const expectedState = {
      ...initialState,
      ordersFailed: true,
      ordersRequest: false,
    };
    expect(getOrdersReducer(initialState, action)).toEqual(expectedState);
  });
});
