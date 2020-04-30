import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SystemService {

    // Api Root Url
    // apiRootURL: string = 'https://click-payed-245c5.firebaseio.com/text.json';   // development apiRootURL Firebase URL
    // apiRootURL: string = 'http://localhost:8000/api/';   // development apiRootURL Local Laravel URL
    _apiRootURL: string = 'https://6f404093.ngrok.io/api/';   // development apiRootURL Valet Link Laravel URL

    // Production App Route API Path
    // _apiRootURL: string = 'https://clickpayed.jmmgroup.website/api/';   // development apiRootURL Valet Link Laravel URL

    _loadingPageData = new BehaviorSubject<boolean>(false);

    _userBalance = new BehaviorSubject<number>(0);
    _userCoins = new BehaviorSubject<number>(0);
    _pkrToCoinsRate = 10; // send http request to get rate from server

    constructor() { }

    getApiRootURL() {
        return this._apiRootURL;
    }

    getLoadinPageDataStatus() {
        return this._loadingPageData;
    }

    loadingPageDataTrue() {
        this._loadingPageData.next(true);
    }

    loadingPageDataFalse() {
        this._loadingPageData.next(false);
    }

    getUserBalance() {
        return this._userBalance;
    }
    
    getUserCoins() {
        return this._userCoins;
    }

    setUserBalance(data) {
        this._userBalance.next(data);
    }

    setUserCoins(data) {
        this._userCoins.next(data);
    }

    afterWithdrawalRemainingBalance(remainingUserCoins: number, amountToWithdraw: number) {
        const newCoins = remainingUserCoins - amountToWithdraw;
        this.setUserCoins(newCoins);
    }


    getPkrToCoinRate() {
        return this._pkrToCoinsRate;
    }

}