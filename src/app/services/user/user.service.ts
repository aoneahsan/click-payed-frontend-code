import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { SystemService } from "../system.service";
import { Subscription } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    _userAccountSub: Subscription;

    constructor(private _systemService: SystemService, private _http: HttpClient) { }

    getUserPermissions() {
        const data = "ok";
        return this._http.post<any>(
            this._systemService.getApiRootURL() + 'get_user_permissions',
            data
        );
    }

    userAccountData() {
        return this._http.get<any>(
            this._systemService.getApiRootURL() + 'get_user_account_data'
        );
    }

    updateUserAccountData() {
        this._systemService.loadingPageDataTrue();
        this._userAccountSub = this.userAccountData().subscribe(
            data => {
                // console.log("App.Component.ts  ==  userAccountDataSub  ==  responsedata = ", data.data);
                this._systemService.setUserCoins(data.data.coins);
                this._systemService.setUserBalance(data.data.balance);
                this._systemService.loadingPageDataFalse();
            },
            err => {
                // console.log("App.Component.ts  ==  userAccountDataSub  ==  error = ", err);
                this._systemService.loadingPageDataFalse();
                // alert("Error Occured While Fetching Account Data, Reload App");
            }
        );
    }

    userDetailsData() {
        return this._http.get<any>(
            this._systemService.getApiRootURL() + 'get_user_details_data'
        );
    }

    updateProfile(data) {
        // console.log(data);
        // console.log("api URL", this._systemService.getApiRootURL() + "upload");
        return this._http.post<any>(
            this._systemService.getApiRootURL(),
            data
        );
    }

    buyCoinsRequest(data) {
        return this._http.post<any>(
            this._systemService.getApiRootURL() + 'buy_coins',
            data
        );
    }

}