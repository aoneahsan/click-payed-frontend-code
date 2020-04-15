import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SystemService {

    userBalance = new BehaviorSubject<number>(2000);
    userCoins = new BehaviorSubject<number>(20000);
    pkrToCoinsRate = 10; // send http request to get rate from server

    // apiRootURL: string = 'http://localhost:8000/api/';   // development apiRootURL Local Laravel URL

    apiRootURL: string = 'https://coin-payed-laravel.ahsan/api/';   // development apiRootURL Valet Link Laravel URL

    // apiRootURL: string = 'https://click-payed-245c5.firebaseio.com/text.json';   // development apiRootURL Firebase URL

    constructor() { }

    getApiRootURL() {
        return this.apiRootURL;
    }

    getUserBalance() {
        return this.userBalance;
    }

    setUserBalance(data) {
        this.userBalance.next(data);
    }

    afterWithdrawalRemainingBalance(remainingUserCoins: number, amountToWithdraw: number) {
        const newCoins = remainingUserCoins - amountToWithdraw;
        this.setUserCoins(newCoins);
    }

    getUserCoins() {
        return this.userCoins;
    }

    setUserCoins(data) {
        this.userCoins.next(data);
    }

    getPkrToCoinRate() {
        return this.pkrToCoinsRate;
    }

}