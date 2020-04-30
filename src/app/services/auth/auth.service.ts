import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { RouterExtensions } from "nativescript-angular/router";
import { setBoolean, getString, hasKey, setString, remove } from 'tns-core-modules/application-settings'

import { SystemService } from './../system.service';
import { User } from "@src/app/models/auth/user-model";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    _user = new BehaviorSubject<User>(null);
    _tokkenExpirationTime: any = null;

    _userRole = new BehaviorSubject<'admin' | 'editor' | 'engager' | 'user'>(null);

    constructor(
        private _router: RouterExtensions,
        private _http: HttpClient,
        private _systemService: SystemService
    ) { }

    getUserRole() {
        return this._userRole;
    }

    setUserRole(role: 'admin' | 'editor' | 'engager' | 'user') {
        this._userRole.next(role);
    }
    
    signIn(data) {
        //check user to sign in

        // after sign in first set pin login
        // this.setPinLogin();

        return this._http.post<any>(
            this._systemService.getApiRootURL() + 'login_api',
            data
        )
            .pipe(
                catchError(this.errorHandler),
                tap(
                    res => {
                        this.authManager(res.data);
                    }
                )
            );

        // then change page
        // this._router.navigate(['/home'], { clearHistory: true });
    }

    signUp(data) {
        // send http
        // this._router.navigate(['/home'], {clearHistory: true}); // ok
        return this._http.post<any>(
            this._systemService.getApiRootURL() + 'register_api',
            data
        )
            .pipe(
                catchError(this.errorHandler),
                tap(
                    res => {
                        this.authManager(res.data);
                    }
                )
            );
    }

    setPinLogin() {
        if (!hasKey('pinLoginEnabled')) {
            setBoolean('pinLoginEnabled', true);
        }
    }

    forgotPassword() {
        this._router.navigate(['/home'], { clearHistory: true });
    }

    logout() {
        this.logoutUserFormApp();
        const data = "ok";
        this._http.post<any>(
            this._systemService.getApiRootURL() + 'logout_api',
            data
        ).subscribe(
            res => {
                this.logoutUserFormApp();
                console.log('Logout Request API Done, Response = ', res);
                this._router.navigate(['/sign-in'], { clearHistory: true });
                this._systemService.loadingPageDataFalse();
            },
            err => {
                this.logoutUserFormApp();
                console.log('Error While Logout Request API, Error = ', err);
                this._router.navigate(['/sign-in'], { clearHistory: true });
                this._systemService.loadingPageDataFalse();
            }
        );
    }

    logoutUserFormApp() {
        remove('user_data');
        this._user.next(null);
        if (this._tokkenExpirationTime) {
            clearTimeout(this._tokkenExpirationTime);
        }
        this._tokkenExpirationTime = null;
    }

    autoLogin() {
        // console.log("AutoLogin Called", "hasKey('user_data')", hasKey('user_data'));
        if (hasKey('user_data')) {
            // console.log("User Data Found", JSON.parse(getString('user_data')));
            const userData: User = JSON.parse(getString('user_data'));
            const localUser = new User(
                userData.id,
                userData.name,
                userData.email,
                userData.phone_number,
                userData.profile_img,
                userData.role,
                userData._tokken,
                new Date(userData.tokken_expire_time)
            );
            // if (localUser.tokken) {
            this._user.next(localUser);
            this._userRole.next(localUser.role);
            // const logoutIn = new Date(new Date(userData.tokken_expire_time).getTime() - new Date().getTime());
            // this.autoLogout(logoutIn);
            // } else {
            //     this.logout();
            // }
        } else {
            console.log("User Data not Found");
            return;
        }
    }

    // autoLogout(timeInSeconds) {
    //     this._tokkenExpirationTime = setTimeout(() => {
    //         this.logout();
    //     }, timeInSeconds);
    // }

    private errorHandler(errorRes: HttpErrorResponse) {
        let errorMessage = "Error Occured"
        switch (errorRes.message) {
            case "invalid Data":
                errorMessage = "Invalid Data Entered";
                break;
        }
        return throwError(errorRes);
    }

    authManager(response) {
        // console.log('authManager  ==  response', response);
        const expireDate = new Date((new Date().getTime() + 10000) * 1000);
        const newUser = new User(
            response.id,
            response.name,
            response.email,
            response.phone_number,
            response.profile_img,
            response.role,
            response.tokken,
            expireDate
        );
        this._user.next(newUser);
        this._userRole.next(newUser.role);
        setString('user_data', JSON.stringify(newUser));
        // console.log(hasKey('user_data'));
        // console.log("getString('user_data')", getString('user_data'));
    }

}