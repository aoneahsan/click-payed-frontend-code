import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SystemService } from '@src/app/services/system.service';

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
