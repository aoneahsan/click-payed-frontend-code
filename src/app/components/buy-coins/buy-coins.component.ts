import { Component, OnInit, OnDestroy } from "@angular/core";

import { SystemService } from "@src/app/services/system.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-buy-coins",
  templateUrl: "./buy-coins.component.html",
  styleUrls: ["./buy-coins.component.scss"]
})
export class BuyCoinsComponent implements OnInit, OnDestroy {
  _remaining_balance = null;
  _remaining_balance_Sub: Subscription;
  rupees_value: number = 0;
  _pkrToCoinsRate: number = 0;
  pkrToCoinRateText = '';

  loadinPageData_s: boolean = true;
  loadinPageDataSub: Subscription;

  constructor(private _systemService: SystemService) { }

  get formDataEntered() {
    if (this.rupees_value >= 50 && this.rupees_value <= this._remaining_balance) {
      return true;
    }
    return false;
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

  get remaining_balance() {
    if (this._remaining_balance) {
      return this._remaining_balance;
    }
  }

  formSubmited() {
    if (this.rupees_value >= 50 && this.rupees_value <= this._remaining_balance) {

    }
    return;
  }

  ngOnDestroy() {
    if (this._remaining_balance_Sub) {
      this._remaining_balance_Sub.unsubscribe();
    }
    if (this.loadinPageDataSub) {
      this.loadinPageDataSub.unsubscribe();
    }
  }
}
