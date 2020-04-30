import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { ModalDialogService } from 'nativescript-angular/common';
import { RouterExtensions } from 'nativescript-angular/router';

import { UIService } from '@src/app/shared/ui/ui.service';

import { Game } from './../compatible-games.component';

import { CompatibleGameInfoPopupComponent } from './compatible-game-info-popup/compatible-game-info-popup.component';

@Component({
  selector: 'app-compatible-game-info',
  templateUrl: './compatible-game-info.component.html',
  styleUrls: ['./compatible-game-info.component.scss']
})

export class CompatibleGameInfoComponent implements OnInit {

  loadingGameData: boolean = true;
  game: Game = null;

  constructor(
    private _router: RouterExtensions,
    private _modalService: ModalDialogService,
    private _viewRef: ViewContainerRef,
    private _uiService: UIService
  ) { }

  ngOnInit() {
    this.getGameData();
  }

  getGameData() {
    setTimeout(() => {
      this.game = { id: 1, name: "PUBG Compitition", text: 'PUBG MOBILE delivers the most intense multiplayer action on mobile. Drop in, gear up, and compete. Survive the classic battle & score the highest kills to get rewarded by a real-time cashback. The player with the most kills in a single battle wins', img: "res://coin", link: "https://www.ggogle.com", status: 'available', game_type: 'android' }
      this.loadingGameData = false;
    }, 300);
  }

  enterGamePopup() {
    alert({title: 'PUBG Compitition', message: "Compitition will start on 5th of May, 2020", okbottonText: "Okay!!!"});
    // this._modalService.showModal(
    //   CompatibleGameInfoPopupComponent,
    //   {
    //     fullscreen: false,
    //     viewContainerRef: this._uiService.getAppVCRef() ? this._uiService.getAppVCRef() : this._viewRef,
    //     context: { game_name: this.game.name }
    //   }
    // ).then(
    //   res => {
    //     if (res == 'okay') {

    //     } else if (res == undefined) {
    //       alert('Kindly Pay Now To Enter');
    //     }
    //   }
    // );
  }

}
