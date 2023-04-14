import * as fromSL from '../shopping-list/store/shopping-list.reducer'
import * as fromAuth from '../Auth/store/auth.reducer'
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    shoppingList: fromSL.State;
    auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: fromSL.shoppingListReducer,
    auth: fromAuth.authReducer
}