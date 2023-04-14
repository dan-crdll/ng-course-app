import { Action } from "@ngrx/store";
import { User } from "../auth/user.model";
import * as AuthActions from "./auth.actions";

export interface State {
    user?: User
}

const initialState: State = { user: undefined }

export function authReducer(state = initialState, action: Action) {
    switch(action.type) {
        case AuthActions.LOGIN:
            return {
                ...state,
                user: (<AuthActions.Login>action).payload
            }
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: undefined
            }
        default: return state;
    }
}