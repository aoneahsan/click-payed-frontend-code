import { Injectable } from "@angular/core";

import { RouterExtensions } from "nativescript-angular/router";
import { BehaviorSubject } from "rxjs";

import {setBoolean, hasKey} from 'tns-core-modules/application-settings'

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    _isAdmin = new BehaviorSubject<boolean>(false);

    constructor(private _router: RouterExtensions) {}

    signIn() {
        //check user to sign in

        // after sign in first set pin login
        this.setPinLogin();

        // then change page
        this._router.navigate(['/home'], {clearHistory: true});
    }

    signUp() {
        // send http
        // this._router.navigate(['/home'], {clearHistory: true}); // ok
    }
    
    setPinLogin() {
        if (!hasKey('pinLoginEnabled')) {
          setBoolean('pinLoginEnabled', true);
        }
      }

    forgotPassword() {
        this._router.navigate(['/home'], {clearHistory: true});
    }

}