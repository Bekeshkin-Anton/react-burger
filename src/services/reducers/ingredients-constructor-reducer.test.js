import {
  ADD_INGREDIENTS_CONSTRUCTOR,
  ADD_INGREDIENTS_BUN,
  DELETE_INGREDIENTS_CONSTRUCTOR,
  MOVE_INGREDIENT_ITEM,
  CLEAR_INGREDIENTS_CONSTRUCTOR,
  CLEAR_BUN_CONSTRUCTOR,
} from "../actions/ingredients-constructor-actions";
import { ingredientsConstructorReducer, initialState } from "./ingredients-constructor-reducer";

describe("ingredientsConstructorReducer", () => {
  it("should return the initial state", () => {
    expect(ingredientsConstructorReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle ADD_INGREDIENTS_CONSTRUCTOR", () => {
    const newIngredient = { id: "1", name: "Ingredient 1" };
    const action = {
      type: ADD_INGREDIENTS_CONSTRUCTOR,
      ingredients: newIngredient,
      keyUuid: "unique-id-1",
    };
    const expectedState = {
      ...initialState,
      ingredients: [{ ...newIngredient, keyUuid: "unique-id-1" }],
    };
    expect(ingredientsConstructorReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle ADD_INGREDIENTS_BUN", () => {
    const bun = { id: "2", name: "Bun" };
    const action = {
      type: ADD_INGREDIENTS_BUN,
      bun: bun,
    };
    const expectedState = {
      ...initialState,
      bun: bun,
    };
    expect(ingredientsConstructorReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle DELETE_INGREDIENTS_CONSTRUCTOR", () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [{ id: "1", name: "Ingredient 1", keyUuid: "unique-id-1" }],
    };
    const action = {
      type: DELETE_INGREDIENTS_CONSTRUCTOR,
      keyUuid: "unique-id-1",
    };
    const expectedState = {
      ...initialState,
      ingredients: [],
    };
    expect(ingredientsConstructorReducer(stateWithIngredients, action)).toEqual(expectedState);
  });

  it("should handle MOVE_INGREDIENT_ITEM", () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [
        { id: "1", name: "Ingredient 1", keyUuid: "unique-id-1" },
        { id: "2", name: "Ingredient 2", keyUuid: "unique-id-2" },
      ],
    };
    const action = {
      type: MOVE_INGREDIENT_ITEM,
      dragIndex: 0,
      hoverIndex: 1,
    };
    const expectedState = {
      ...initialState,
      ingredients: [
        { id: "2", name: "Ingredient 2", keyUuid: "unique-id-2" },
        { id: "1", name: "Ingredient 1", keyUuid: "unique-id-1" },
      ],
    };
    expect(ingredientsConstructorReducer(stateWithIngredients, action)).toEqual(expectedState);
  });

  it("should handle CLEAR_INGREDIENTS_CONSTRUCTOR", () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [
        { id: "1", name: "Ingredient 1" },
        { id: "2", name: "Ingredient 2" },
      ],
    };
    const action = {
      type: CLEAR_INGREDIENTS_CONSTRUCTOR,
    };
    const expectedState = {
      ...initialState,
      ingredients: [],
    };
    expect(ingredientsConstructorReducer(stateWithIngredients, action)).toEqual(expectedState);
  });

  it("should handle CLEAR_BUN_CONSTRUCTOR", () => {
    const stateWithBun = {
      ...initialState,
      bun: { id: "2", name: "Bun" },
    };
    const action = {
      type: CLEAR_BUN_CONSTRUCTOR,
    };
    const expectedState = {
      ...initialState,
      bun: null,
    };
    expect(ingredientsConstructorReducer(stateWithBun, action)).toEqual(expectedState);
  });
});
