import { Injectable } from "@angular/core";

import { RouterExtensions } from "nativescript-angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private _router: RouterExtensions) {}

    signIn() {
        this._router.navigate(['/home'], {clearHistory: true});
    }

    signUp() {
        this._router.navigate(['/home'], {clearHistory: true});
    }

    forgotPassword() {
        this._router.navigate(['/home'], {clearHistory: true});
    }

}