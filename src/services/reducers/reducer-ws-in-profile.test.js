import { wsConnectingInProfile, wsOpenInProfile, wsCloseInProfile, wsMessageInProfile, wsErrorInProfile } from "../actions/actions-ws";
import { WebsocketStatus } from "../../utils/orders";
import { ordersInProfileReducer, initialState } from "./reducer-ws-in-profile";

describe("ordersInProfileReducer", () => {
  it("should return the initial state", () => {
    expect(ordersInProfileReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle wsConnectingInProfile", () => {
    const action = wsConnectingInProfile();
    const expectedState = {
      ...initialState,
      status: WebsocketStatus.CONNECTING,
      loader: true,
    };
    expect(ordersInProfileReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle wsOpenInProfile", () => {
    const action = wsOpenInProfile();
    const expectedState = {
      ...initialState,
      status: WebsocketStatus.ONLINE,
      connectionError: "",
      loader: true,
    };
    expect(ordersInProfileReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle wsMessageInProfile", () => {
    const payload = { orders: [{ id: "1", name: "Order 1" }] };
    const action = wsMessageInProfile(payload);
    const expectedState = {
      ...initialState,
      orders: payload.orders,
      loader: false,
    };
    expect(ordersInProfileReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle wsCloseInProfile", () => {
    const action = wsCloseInProfile();
    const expectedState = {
      ...initialState,
      status: WebsocketStatus.OFFLINE,
    };
    expect(ordersInProfileReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle wsErrorInProfile", () => {
    const payload = "Connection error";
    const action = wsErrorInProfile(payload);
    const expectedState = {
      ...initialState,
      connectionError: payload,
    };
    expect(ordersInProfileReducer(initialState, action)).toEqual(expectedState);
  });
});
