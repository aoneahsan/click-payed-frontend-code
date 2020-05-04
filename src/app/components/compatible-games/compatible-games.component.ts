import { Component, OnInit } from '@angular/core';
import { openUrl } from 'tns-core-modules/utils/utils';

import { RouterExtensions } from 'nativescript-angular/router';

export interface Game {
  id,
  name,
  img,
  link,
  status,
  game_type,
  text
}

@Component({
  selector: 'app-compatible-games',
  templateUrl: './compatible-games.component.html',
  styleUrls: ['./compatible-games.component.scss']
})
export class CompatibleGamesComponent implements OnInit {

  deviceSelected: 'android' | 'ios' | 'web' = null;
  loadedGames: Game[] = [];
  androidGames: Game[] = [
    {id: 1, name: "PUBG Compitition", text: 'text', img: "res://pubggameicon", link: null, status: 'available', game_type: 'android'}
  ];

  iosGames: Game[] = [
    {id: 1, name: "PUBG Compitition", text: 'text', img: "res://pubggameicon", link: null, status: 'available', game_type: 'ios'}
  ];

  webGames: Game[] = [
    {id: 1, name: "PUBG Compitition", text: 'text', img: "res://pubggameicon", link: null, status: 'available', game_type: 'web'}
  ];
  constructor(private _router: RouterExtensions) { }

  ngOnInit() {
    this.loadAndroidGames();
  }
  
  loadAndroidGames() {
    this.deviceSelected = 'android';
    this.loadedGames = null;
    setTimeout(() => {
      this.loadedGames = this.androidGames;
    }, 400);
  }

  loadIOSGames() {
    this.deviceSelected = 'ios';
    this.loadedGames = null;
    setTimeout(() => {
      this.loadedGames = this.iosGames;
    }, 400);
  }

  loadWebGames() {
    this.deviceSelected = 'web';
    this.loadedGames = null;
    setTimeout(() => {
      this.loadedGames = this.webGames;
    }, 400);
  }

  downloadGame(game) {
    openUrl(game.link);
  }

  openGameInfoPage(game) {
    this._router.navigate(['/compatible-game-info/' + game.id], {transition: {name: 'slide'}});
  }

}
