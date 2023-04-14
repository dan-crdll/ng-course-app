import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, tap } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";
import * as AuthActions from '../store/auth.actions';
import * as fromApp from '../../store/app.reducer'
import { Store } from "@ngrx/store";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    //user = new BehaviorSubject<User | null>(null);
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>) { }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAwjZWoyQo0QIBcUoCFt0OpxQl9XYx83kg',
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(tap(
                resData => {
                    this.handleAuthentication(resData.email, resData.idToken, +resData.expiresIn, resData.localId)
                }
            ))
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAwjZWoyQo0QIBcUoCFt0OpxQl9XYx83kg', {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(tap(
            resData => {
                this.handleAuthentication(resData.email, resData.idToken, +resData.expiresIn, resData.localId)
            }
        ));
    }

    private handleAuthentication(email: string, token: string, expiresIn: number, localId: string) {
        const user = new User(email,
            localId,
            token,
            new Date(new Date().getTime() + expiresIn * 1000))
        this.store.dispatch(new AuthActions.Login(user));
        this.autoLogOut(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    logout() {
        this.store.dispatch(new AuthActions.Logout());
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
            this.tokenExpirationTimer = null;
        }
    }

    autoLogOut(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    autoLogin() {
        let userData = localStorage.getItem('userData');
        if (!userData)
            return;
        let userObj = JSON.parse(userData);
        if (userObj !== null) {
            const loadedUser = new User(userObj.email, userObj.id, userObj._token, new Date(userObj._tokenExpirationDate));

            if (loadedUser.token) {
                this.store.dispatch(new AuthActions.Login(loadedUser));
                this.autoLogOut(
                    new Date(userObj._tokenExpirationDate).getTime() - new Date().getTime()
                )
            }
        }
    }
}