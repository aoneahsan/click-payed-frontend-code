import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

import { RouterExtensions } from "nativescript-angular/router";
import { setBoolean, hasKey } from 'tns-core-modules/application-settings'

import { SystemService } from './../system.service';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    _isAdmin = new BehaviorSubject<boolean>(false);

    constructor(
        private _router: RouterExtensions,
        private _http: HttpClient,
        private _systemService: SystemService
    ) {}

    signIn() {
        //check user to sign in

        // after sign in first set pin login
        // this.setPinLogin();

        this._http.post<any>(
            this._systemService.getApiRootURL() + 'test',
            {
                email: 'new@demo.com',
                password: '121212',
                device_name: 'mobile'
            }
        ).subscribe(
            res => {
                console.log(res);
            },
            err => {
                console.log(err);
            }
        );

        // then change page
        // this._router.navigate(['/home'], { clearHistory: true });
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
        this._router.navigate(['/home'], { clearHistory: true });
    }

}