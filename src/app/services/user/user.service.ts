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

    searchPersonByNumber(number) {
        return this._http.post<any>(
            this._systemService.getApiRootURL() + 'search_person_by_number',
            number
        );
    }

    buyCoinsRequest(data) {
        return this._http.post<any>(
            this._systemService.getApiRootURL() + 'buy_coins',
            data
        );
    }

    redeemCoinsRequest(data) {
        return this._http.post<any>(
            this._systemService.getApiRootURL() + 'redeem_coins',
            data
        );
    }

}