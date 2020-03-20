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
        // send http
        // this._router.navigate(['/home'], {clearHistory: true}); // ok
    } 

    forgotPassword() {
        this._router.navigate(['/home'], {clearHistory: true});
    }

}