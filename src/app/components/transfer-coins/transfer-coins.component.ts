import { Component, OnInit } from '@angular/core';
import { SystemService } from '@src/app/services/system.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transfer-coins',
  templateUrl: './transfer-coins.component.html',
  styleUrls: ['./transfer-coins.component.scss']
})
export class TransferCoinsComponent implements OnInit {

  remaining_coins: string = '';
  remaining_coins_Sub: Subscription;

  coins_to_transfer: number;
  reciver_number: number;

  constructor(private _systemService: SystemService) { }

  ngOnInit() {
    this.remaining_coins_Sub = this._systemService.getUserCoins().subscribe(
      coins => {
        this.remaining_coins = 'Remaining Coins: ' + coins;
      }
    )
  }

  searchPerson() {
    console.log('Searching');
  }

  transferCoins() {
    console.log('Searching');
  }

}
