import { Component, OnInit, OnDestroy } from "@angular/core";

import { SystemService } from "@src/app/services/system.service";
import { Subscription } from "rxjs";
import { UserService } from "@src/app/services/user/user.service";

@Component({
  selector: "app-buy-coins",
  templateUrl: "./buy-coins.component.html",
  styleUrls: ["./buy-coins.component.scss"]
})
export class BuyCoinsComponent implements OnInit, OnDestroy {
  _remaining_balance = null;
  _remaining_balance_Sub: Subscription;
  rupees_value: number = null;
  _pkrToCoinsRate: number = 0;
  pkrToCoinRateText = '';

  loadinPageData_s: boolean = true;
  loadinPageDataSub: Subscription;

  _formSubmited: boolean = false;
  _buyCoinSub: Subscription;
  _updateUserAccountSub: Subscription;

  constructor(private _systemService: SystemService, private _userService: UserService) { }

  get formDataEntered() {
    if (this.rupees_value >= 50 && this.rupees_value <= this._remaining_balance) {
      return true;
    }
    return false;
  }

  get remaining_balance() {
    if (this._remaining_balance) {
      return this._remaining_balance;
    }
  }

  ngOnInit() {
    this.loadinPageDataSub = this._systemService.getLoadinPageDataStatus().subscribe(
      status => {
        this.loadinPageData_s = status;
      }
    );

    this._remaining_balance_Sub = this._systemService.getUserBalance().subscribe(
      balance => {
        this._remaining_balance = balance;
      }
    );
    this._pkrToCoinsRate = this._systemService.getPkrToCoinRate();
    this.pkrToCoinRateText = ' | PKR 1 = ' + this._pkrToCoinsRate + ' Coins';
  }

  formSubmited() {
    this._formSubmited = true;
    if (this.rupees_value >= 50 && this.rupees_value <= this._remaining_balance) {
      const data = {
        amount: +this.rupees_value
      }
      this._buyCoinSub = this._userService.buyCoinsRequest(data).subscribe(
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
          console.log('Buy-coins.component.ts  ==  formSubmited == Error = ', err);
          this.resetForm();
        }
      )
    }
    return;
  }

  resetForm() {
    this._formSubmited = false;
    this.rupees_value = null;
  }

  ngOnDestroy() {
    if (this._remaining_balance_Sub) {
      this._remaining_balance_Sub.unsubscribe();
    }
    if (this.loadinPageDataSub) {
      this.loadinPageDataSub.unsubscribe();
    }
    if (this._buyCoinSub) {
      this._buyCoinSub.unsubscribe();
    }
  }
}
