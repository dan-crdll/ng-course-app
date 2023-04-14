import { Action } from "@ngrx/store";
import { User } from "../auth/user.model";

export const LOGIN = '[AUTH REDUCER] LOGIN';
export const LOGOUT = '[AUTH REDUCER] LOGOUT';

export class Login implements Action {
    readonly type: string = LOGIN;

    constructor(public payload: User) { }
}

export class Logout implements Action {
    readonly type: string = LOGOUT;
}