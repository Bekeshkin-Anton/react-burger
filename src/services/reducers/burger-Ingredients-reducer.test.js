import { initialState } from "./burger-Ingredients-reducer";
import { GET_DATA_REQUEST, GET_DATA_SUCCESS, GET_DATA_FAILED } from "../actions/burger-ingredients-actions";

describe("burger ingredients reducer", () => {
  it("initialization", () => {
    // const state = initialState(undefined, {});
    expect(initialState).toEqual(initialState);
  });
});
