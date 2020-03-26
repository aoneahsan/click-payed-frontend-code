import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SystemService {

    userBalance = new BehaviorSubject<number>(2000);
    userCoins = new BehaviorSubject<number>(20000);
    pkrToCoinsRate = 10; // send http request to get rate from server

    constructor() { }

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