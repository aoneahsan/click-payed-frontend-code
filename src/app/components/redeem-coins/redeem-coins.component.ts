import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SystemService } from '@src/app/services/system.service';
import { UserService } from '@src/app/services/user/user.service';

// import * as application from "tns-core-modules/application";
// import { AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules/application";
// import { isAndroid } from "tns-core-modules/platform";

@Component({
  selector: 'app-redeem-coins',
  templateUrl: './redeem-coins.component.html',
  styleUrls: ['./redeem-coins.component.scss']
})
export class RedeemCoinsComponent implements OnInit, OnDestroy {
  _remaining_balance = null;
  _remaining_balance_Sub: Subscription;
  _remaining_coins = null;
  _remaining_coins_Sub: Subscription;
  coins_to_redeem: number = null;
  _pkrToCoinsRate: number = 0;
  pkrToCoinRateText = '';

  loadinPageData_s: boolean = true;
  loadinPageDataSub: Subscription;

  _formSubmited: boolean = false;
  _redeemCoinSub: Subscription;
  _updateUserAccountSub: Subscription;

  constructor(private _systemService: SystemService, private _userService: UserService) { }

  get formDataEntered() {
    if (this.coins_to_redeem >= 1000) {
      if (this.coins_to_redeem <= this._remaining_coins) {
        return true;
      }
    }
    return false;
  }

  get remaining_balance() {
    if (this._remaining_balance) {
      return this._remaining_balance;
    }
  }

  get pkr_of_entered_coins() {
    return (this.coins_to_redeem / this._pkrToCoinsRate);
  }

  ngOnInit() {
    this.loadinPageDataSub = this._systemService.getLoadinPageDataStatus().subscribe(
      status => {
        this.loadinPageData_s = status;
      }
    );

    this._remaining_balance_Sub = this._systemService
      .getUserBalance()
      .subscribe(balance => {
        if (balance > 0) {
          this._remaining_balance = balance;
        } else {
          this._remaining_balance = 0;
        }
      });
    this._remaining_coins_Sub = this._systemService
      .getUserCoins()
      .subscribe(coins => {
        if (coins > 0) {
          this._remaining_coins = coins;
        } else {
          this._remaining_coins = 0;
        }
      });
    this._pkrToCoinsRate = this._systemService.getPkrToCoinRate();
    this.pkrToCoinRateText = ' | ' + this._pkrToCoinsRate + ' Coins = PKR 1';

  }

  formSubmited() {
    this._formSubmited = true;
    if (this.coins_to_redeem >= 1000 && this.coins_to_redeem <= this._remaining_coins) {
      const data = {
        number_of_coins: +this.coins_to_redeem
      }
      this._redeemCoinSub = this._userService.redeemCoinsRequest(data).subscribe(
        res => {
          // console.log('Buy-coins.component.ts  ==  formSubmited == response = ', res);
          this._systemService.loadingPageDataTrue();
          this._updateUserAccountSub = this._userService.userAccountData().subscribe(
            data => {
              // console.log("App.Component.ts  ==  userAccountDataSub  ==  responsedata = ", data.data);
              this._systemService.setUserCoins(data.data.coins);
              this._systemService.setUserBalance(data.data.balance);
              this._systemService.loadingPageDataFalse();
            },
            err => {
              // console.log("App.Component.ts  ==  userAccountDataSub  ==  error = ", err);
              this._systemService.loadingPageDataFalse();
              alert("Error Occured While Updating Account Data, Reload App");
            }
          );
          this.resetForm();

        },
        err => {
          // console.log('Buy-coins.component.ts  ==  formSubmited == Error = ', err);
          this.resetForm();
        }
      )
    }
    return;
  }

  resetForm() {
    this._formSubmited = false;
    this.coins_to_redeem = null;
  }

  ngOnDestroy() {
    if (this._remaining_balance_Sub) {
      this._remaining_balance_Sub.unsubscribe();
    }
    if (this._remaining_coins_Sub) {
      this._remaining_coins_Sub.unsubscribe();
    }
    if (this.loadinPageDataSub) {
      this.loadinPageDataSub.unsubscribe();
    }
    if (this._redeemCoinSub) {
      this._redeemCoinSub.unsubscribe();
    }
  }
}
