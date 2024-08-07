import { burgerIngredientsReducer, initialState } from "./burger-Ingredients-reducer";
import { GET_DATA_REQUEST, GET_DATA_SUCCESS, GET_DATA_FAILED } from "../actions/burger-ingredients-actions";

describe("burgerIngredientsReducer", () => {
  it("should return the initial state", () => {
    expect(burgerIngredientsReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle GET_DATA_REQUEST", () => {
    const action = { type: GET_DATA_REQUEST };
    const expectedState = {
      ...initialState,
      burgerIngredientsRequest: true,
    };
    expect(burgerIngredientsReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle GET_DATA_SUCCESS", () => {
    const ingredients = [
      {
        _id: "1",
        name: "Bun",
        type: "bun",
        proteins: 20,
        fat: 5,
        carbohydrates: 30,
        calories: 200,
        price: 50,
        image: "image",
        image_mobile: "image_mobile",
        image_large: "image_large",
      },
      {
        _id: "2",
        name: "Patty",
        type: "main",
        proteins: 40,
        fat: 20,
        carbohydrates: 10,
        calories: 400,
        price: 150,
        image: "image",
        image_mobile: "image_mobile",
        image_large: "image_large",
      },
    ];
    const action = { type: GET_DATA_SUCCESS, data: ingredients };
    const expectedState = {
      ...initialState,
      burgerIngredientsFailed: false,
      burgerIngredients: ingredients,
      burgerIngredientsRequest: false,
    };
    expect(burgerIngredientsReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle GET_DATA_FAILED", () => {
    const action = { type: GET_DATA_FAILED };
    const expectedState = {
      ...initialState,
      burgerIngredientsFailed: true,
      burgerIngredientsRequest: false,
    };
    expect(burgerIngredientsReducer(initialState, action)).toEqual(expectedState);
  });
});
