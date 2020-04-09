import { Component, OnInit } from '@angular/core';

import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _router: RouterExtensions) { }

  ngOnInit() {
    setTimeout(() => {
      // this._router.navigate(['/totup-your-wallet']);
      // alert('ok');
    }, 300);
  }

  offersAndPromotions() {
    alert('Offers and Promotions');
  }

}
