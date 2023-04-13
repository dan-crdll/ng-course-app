import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredients.model";
import * as SLActions from "./shopping-list.actions";

const initialState = {
    ingredients: [
        new Ingredient('apples', 5),
        new Ingredient('tomatoes', 10),
    ],
};

export function shoppingListReducer(state = initialState, action: Action) {
    switch (action.type) {
        case SLActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [
                    ...state.ingredients,
                    (<SLActions.AddIngredient>action).payload
                ]
            };
        default:
            return initialState;
    }
}