import { Injectable } from "@angular/core";
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, CanActivateChild } from "@angular/router";
import { Observable } from "rxjs";

import { RouterExtensions } from "nativescript-angular/router";

import { AuthService } from './../../services/auth/auth.service';
import { take, map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class UnAuthGuard implements CanActivate, CanActivateChild, CanLoad {

    constructor(private _authService: AuthService, private _router: RouterExtensions) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this._authService._user.pipe(
            take(1),
            map(
                user => {
                    const isAuth = !!user;
                    if (!isAuth) {
                        return true;
                    } else {
                        this._router.navigate(['/home']);
                        return false;
                    }
                }
            )
        );
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivate(route, state);
    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return this._authService._user.pipe(
            take(1),
            map(
                user => {
                    const isAuth = !!user;
                    if (!isAuth) {
                        return true;
                    } else {
                        this._router.navigate(['/home']);
                        return false;
                    }
                }
            )
        );
    }

}