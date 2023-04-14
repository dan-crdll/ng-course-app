import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredients.model";
import * as SLActions from "./shopping-list.actions";

export interface AppState {
    shoppingList: State;
}

export interface State {
    ingredients: Ingredient[],
    editedIngredient?: Ingredient,
    editedIngredientIndex: number
}

const initialState: State = {
    ingredients: [
        new Ingredient('apples', 5),
        new Ingredient('tomatoes', 10),
    ],
    editedIngredientIndex: -1,
};

export function shoppingListReducer(state: State = initialState, action: Action) {
    switch (action.type) {
        case SLActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [
                    ...state.ingredients,
                    (<SLActions.AddIngredient>action).payload
                ]
            };
        case SLActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [
                    ...state.ingredients,
                    ...(<SLActions.AddIngredients>action).payload
                ]
            }
        case SLActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
                ...ingredient,
                ...(<SLActions.UpdateIngredient>action).payload
            }
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredientIndex: -1,
                editedIngredient: undefined
            }
        case SLActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ig, index) => {
                    if (index !== state.editedIngredientIndex)
                        return true;
                    return false;
                }
                ),
                editedIngredientIndex: -1,
                editedIngredient: undefined
            }
        case SLActions.START_EDIT:
            return {
                ...state,
                editedIngredientIndex: (<SLActions.StartEdit>action).payload,
                editedIngredient: { ...state.ingredients[(<SLActions.StartEdit>action).payload] },
            }
        case SLActions.STOP_EDIT:
            return {
                ...state,
                editedIngredientIndex: -1,
                editedIngredient: undefined
            }
        default:
            return initialState;
    }
}