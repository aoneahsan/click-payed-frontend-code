import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Route, UrlSegment, CanActivateChild } from "@angular/router";
import { Observable } from "rxjs";

import { RouterExtensions } from "nativescript-angular/router";

import { AuthService } from './../../services/auth/auth.service';
import { take, map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class AdminGuard implements CanActivate, CanActivateChild, CanLoad{

    constructor(private _authService: AuthService, private _router: RouterExtensions) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this._authService._user.pipe(
            take(1),
            map(
                user => {
                    const isAuth = !!user;
                    if (isAuth) {
                        const userRole = user.role;
                        if (userRole == 'admin') {
                            return true;
                        }
                        else if (userRole == 'editor') {
                            this._router.navigate(['/admin/dashboard']);
                            return false;
                        }
                        else if (userRole == 'user') {
                            this._router.navigate(['/home']);
                            return false;
                        }
                    } else {
                        this._router.navigate(['/sign-in']);
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
                    if (isAuth) {
                        const userRole = user.role;
                        if (userRole == 'admin') {
                            return true;
                        }
                        else if (userRole == 'editor') {
                            return true;
                        }
                        else if (userRole == 'user') {
                            this._router.navigate(['/home']);
                            return false;
                        }
                    } else {
                        this._router.navigate(['/sign-in']);
                        return false;
                    }
                }
            )
        );
    }

}