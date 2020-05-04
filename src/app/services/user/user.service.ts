import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subscription, BehaviorSubject } from "rxjs";

import { SystemService } from "../system.service";

import { TransactionHistoryInterface } from './../../interface/user/transaction-history-interface';
import { UserProfileData } from './../../interface/user/userprofiledata-interface';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    // User Account Component Variables
    _userAccountSub: Subscription;

    // User Profile Component Variables
    _userProfileData = new BehaviorSubject<UserProfileData>(null); 

    // User TransactionHistory
    _userTransactionHistroy = new BehaviorSubject<TransactionHistoryInterface[]>(null);

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
        // .pipe(
        //     catchError(this.logoutIfUserAccountDataNotFound)
        // )
    }

    // private logoutIfUserAccountDataNotFound(errorRes: HttpErrorResponse) {
    //     if (errorRes.error.message == 'Unauthenticated.') {
    //         this._authService.logout();
    //     }
    //     return throwError(errorRes);
    // }

    userDetailsData() {
        return this._http.get<any>(
            this._systemService.getApiRootURL() + 'get_user_details_data'
        );
    }

    getProfileDataFromServer() {
        console.log("UserService.ts == getProfileDataFromServer == called");
        const data = 'ok';
        return this._http.post<any>(
            this._systemService.getApiRootURL() + 'get_user_profile_data',
            data
        );
    }

    getProfileData() {
        return this._userProfileData;
    }

    setProfileData(data: UserProfileData) {
        this._userProfileData.next(data);
    }

    updateProfileDataInServer(data) {
        // console.log(data);
        // console.log("api URL", this._systemService.getApiRootURL() + "upload");
        return this._http.post<any>(
            this._systemService.getApiRootURL() + 'update_user_profile_data',
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

    transferCoinsRequest(data) {
        return this._http.post<any>(
            this._systemService.getApiRootURL() + 'transfer_coins',
            data
        );
    }

    topupAccountRequest(data) {
        return this._http.post<any>(
            this._systemService.getApiRootURL() + 'topup_wallet',
            data
        );
    }

    withDrawalRequest(data) {
        return this._http.post<any>(
            this._systemService.getApiRootURL() + 'withdrawal_request',
            data
        );
    }

    getTransactionalHistry() {
        return this._http.get<any>(
            this._systemService.getApiRootURL() + 'withdrawal_request'
        );
    }

    storeUserFirebaseToken(token) {
        return this._http.post<any>(
            this._systemService._apiRootURL + "store_user_firebase_token",
            token
        );
    }

    deleteUserFirebaseToken() {
        const data = "remove_token";
        return this._http.post<any>(
            this._systemService._apiRootURL + "delete_user_firebase_token",
            data
        );
    }

    fetchUserTransactionHistory() {
        const data = 'fetchUserTransactionHistory';
        return this._http.post<any>(
            this._systemService._apiRootURL + 'fetch_user_transaction_history',
            data
        );
    }

    setUserTransactionHistory(data: TransactionHistoryInterface[]) {
        this._userTransactionHistroy.next(data);
    }

    getUserTransactionHistory() {
        return this._userTransactionHistroy;
    }

}