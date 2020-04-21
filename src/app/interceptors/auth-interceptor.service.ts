import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";

import { AuthService } from "../services/auth/auth.service";
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private _authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this._authService._user.pipe(
            take(1),
            exhaustMap(
                user => {
                    // console.log("AuthInterceptor  ==  User  =  ", user);
                    if (!user) {
                        // console.log("the Last request sending  =  req  = ", req);
                        return next.handle(req);
                    }
                    // console.log("AuthInterceptor  ==  user.tokken = ", user.tokken);
                    // console.log("AuthInterceptor  ==  user._tokken = ", user._tokken);
                    const user_tokken = user.tokken;
                    const modifiedReq = req.clone({
                        headers: req.headers.set("Authorization", "Bearer " + user_tokken)
                    });
                    // console.log("the Last request sending  =  modifiedReq  = ", modifiedReq);
                    return next.handle(modifiedReq);
                }
            )
        )
    }

}