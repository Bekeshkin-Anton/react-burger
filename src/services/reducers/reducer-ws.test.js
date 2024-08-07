import { wsConnecting, wsOpen, wsClose, wsMessage, wsError } from "../actions/actions-ws";
import { WebsocketStatus } from "../../utils/orders";
import { ordersReducer, initialState } from "./reducer-ws";

describe("ordersReducer", () => {
  it("should return the initial state", () => {
    expect(ordersReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle wsConnecting", () => {
    const action = wsConnecting();
    const expectedState = {
      ...initialState,
      status: WebsocketStatus.CONNECTING,
      loader: true,
    };
    expect(ordersReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle wsOpen", () => {
    const action = wsOpen();
    const expectedState = {
      ...initialState,
      status: WebsocketStatus.ONLINE,
      connectionError: "",
      loader: true,
    };
    expect(ordersReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle wsMessage", () => {
    const payload = {
      orders: [{ id: "1", name: "Order 1" }],
      total: 100,
      totalToday: 10,
    };
    const action = wsMessage(payload);
    const expectedState = {
      ...initialState,
      orders: payload.orders,
      total: payload.total,
      totalToday: payload.totalToday,
      loader: false,
    };
    expect(ordersReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle wsClose", () => {
    const action = wsClose();
    const expectedState = {
      ...initialState,
      status: WebsocketStatus.OFFLINE,
    };
    expect(ordersReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle wsError", () => {
    const payload = "Connection error";
    const action = wsError(payload);
    const expectedState = {
      ...initialState,
      connectionError: payload,
    };
    expect(ordersReducer(initialState, action)).toEqual(expectedState);
  });
});
