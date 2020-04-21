import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/common';
import { SystemService } from '@src/app/services/system.service';

@Component({
  selector: 'app-compatible-game-info-popup',
  templateUrl: './compatible-game-info-popup.component.html',
  styleUrls: ['./compatible-game-info-popup.component.scss']
})
export class CompatibleGameInfoPopupComponent implements OnInit, OnDestroy {

  _gamename = null;
  gametitle = null;
  _remaining_coins = null;
  _remaining_coins_Sub: Subscription;

  processingRequest: boolean = false;

  constructor(private _modalParams: ModalDialogParams, private _systemService: SystemService) { }

  ngOnInit() {
    this._gamename = (this._modalParams.context as { game_name }).game_name;
    this.gametitle = this._gamename + " BATTLE FEE";
    this._remaining_coins_Sub = this._systemService.getUserCoins().subscribe(
      coins => {
        this._remaining_coins = coins - 500;
      }
    );
  }

  onHandle() {
    this.processingRequest = true;
    setTimeout(() => {
      this._modalParams.closeCallback('okay');
      this.processingRequest = false;
    }, 300);
  }

  ngOnDestroy() {
    if (this._remaining_coins_Sub) {
      this._remaining_coins_Sub.unsubscribe();
    }
  }

}
