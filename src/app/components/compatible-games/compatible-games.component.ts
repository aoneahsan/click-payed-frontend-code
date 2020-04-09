import { Component, OnInit } from '@angular/core';
import { openUrl } from 'tns-core-modules/utils/utils';

interface Game {
  id,
  name,
  img,
  link
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
    {id: 1, name: "8 Poll Ball", img: "res://coin", link: "https://www.ggogle.com"},
    {id: 2, name: "9 Poll Ball", img: "res://coin", link: "https://www.ggogle.com"},
    {id: 3, name: "18 Poll Ball", img: "res://coin", link: "https://www.ggogle.com"},
    {id: 4, name: "28 Poll Ball", img: "res://coin", link: "https://www.ggogle.com"},
    {id: 5, name: "238 Poll Ball", img: "res://coin", link: "https://www.ggogle.com"},
    {id: 6, name: "48 Poll Ball", img: "res://coin", link: "https://www.ggogle.com"}
  ];

  iosGames: Game[] = [
    {id: 1, name: "Game 1", img: "res://coin", link: "https://www.ggogle.com"},
    {id: 2, name: "Game 2", img: "res://coin", link: "https://www.ggogle.com"},
    {id: 3, name: "Game 3", img: "res://coin", link: "https://www.ggogle.com"}
  ];

  webGames: Game[] = [
    {id: 1, name: "Game 4", img: "res://coin", link: "https://www.ggogle.com"},
    {id: 1, name: "Game 5", img: "res://coin", link: "https://www.ggogle.com"},
    {id: 1, name: "Game 6", img: "res://coin", link: "https://www.ggogle.com"}
  ];
  constructor() { }

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

}
