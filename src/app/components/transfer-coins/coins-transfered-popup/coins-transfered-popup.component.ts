import { SystemService } from './../../../services/system.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-coins-transfered-popup',
  templateUrl: './coins-transfered-popup.component.html',
  styleUrls: ['./coins-transfered-popup.component.scss']
})
export class CoinsTransferedPopupComponent implements OnInit, OnDestroy {

  remainingCoins: number;
  remainingCoinsSub: Subscription;
  constructor(private _modalParams: ModalDialogParams, private _systemService: SystemService) { }

  ngOnInit() {
    this.remainingCoinsSub = this._systemService.getUserCoins().subscribe(
      coins => {
        this.remainingCoins = coins;
      }
    );
  }

  onHandle(action: "ok") {
    if (action == 'ok') {
      this._modalParams.closeCallback('ok');
    }
    else {
      this._modalParams.closeCallback('ok');
    }
  }

  ngOnDestroy(): void {
    if (this.remainingCoinsSub) {
      this.remainingCoinsSub.unsubscribe();
    }
  }

}
