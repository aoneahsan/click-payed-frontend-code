import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SystemService } from '@src/app/services/system.service';

// import * as application from "tns-core-modules/application";
// import { AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules/application";
// import { isAndroid } from "tns-core-modules/platform";

@Component({
  selector: 'app-redeem-coins',
  templateUrl: './redeem-coins.component.html',
  styleUrls: ['./redeem-coins.component.scss']
})
export class RedeemCoinsComponent implements OnInit {
  _remaining_balance = null;
  _remaining_balance_Sub: Subscription;
  coins_to_redeem: number = 0;
  _pkrToCoinsRate: number = 0;
  pkrToCoinRateText = '';

  constructor(private _systemService: SystemService) { }

  ngOnInit() {
    this._remaining_balance_Sub = this._systemService
      .getUserBalance()
      .subscribe(balance => {
        this._remaining_balance = "Remaining Balance: PKR " + balance;
      });
    this._pkrToCoinsRate = this._systemService.getPkrToCoinRate();
    this.pkrToCoinRateText = ' | ' + this._pkrToCoinsRate + ' Coins = PKR 1';
    
    // back button to home code
    // if (!isAndroid) {
    //   return;
    // }
    // application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
    //   // if (this.router.isActive("/articles", false)) { // check a specific one
    //     data.cancel = true; // prevents default back button behavior
    //     this._router.navigate(['/admin/dashboard']);
    //     // this.logout();
    //   // }
    // });
  }

  get remaining_balance() {
    if (this._remaining_balance) {
      return this._remaining_balance;
    }
  }

  get pkr_of_entered_coins() {
    return (this.coins_to_redeem / this._pkrToCoinsRate);
  }

  ngOnDestroy() {
    if (this._remaining_balance_Sub) {
      this._remaining_balance_Sub.unsubscribe();
    }
  }
}
