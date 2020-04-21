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
    {id: 1, name: "8 Poll Ball", text: 'text', img: "res://coin", link: "https://www.ggogle.com", status: 'available', game_type: 'android'},
    {id: 2, name: "9 Poll Ball", text: 'text', img: "res://coin", link: "https://www.ggogle.com", status: 'coming-soon', game_type: 'android'},
    {id: 3, name: "18 Poll Ball", text: 'text', img: "res://coin", link: "https://www.ggogle.com", status: 'coming-soon', game_type: 'ios'},
    {id: 4, name: "28 Poll Ball", text: 'text', img: "res://coin", link: "https://www.ggogle.com", status: 'coming-soon', game_type: 'android'},
    {id: 5, name: "238 Poll Ball", text: 'text', img: "res://coin", link: "https://www.ggogle.com", status: 'coming-soon', game_type: 'android'},
    {id: 6, name: "48 Poll Ball", text: 'text', img: "res://coin", link: "https://www.ggogle.com", status: 'coming-soon', game_type: 'web'}
  ];

  iosGames: Game[] = [
    {id: 7, name: "Game 1", text: 'text', img: "res://coin", link: "https://www.ggogle.com", status: 'available', game_type: 'ios'},
    {id: 8, name: "Game 2", text: 'text', img: "res://coin", link: "https://www.ggogle.com", status: 'coming-soon', game_type: 'ios'},
    {id: 9, name: "Game 3", text: 'text', img: "res://coin", link: "https://www.ggogle.com", status: 'coming-soon', game_type: 'ios'}
  ];

  webGames: Game[] = [
    {id: 10, name: "Game 4", text: 'text', img: "res://coin", link: "https://www.ggogle.com", status: 'available', game_type: 'web'},
    {id: 11, name: "Game 5", text: 'text', img: "res://coin", link: "https://www.ggogle.com", status: 'coming-soon', game_type: 'web'},
    {id: 12, name: "Game 6", text: 'text', img: "res://coin", link: "https://www.ggogle.com", status: 'coming-soon', game_type: 'web'}
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
