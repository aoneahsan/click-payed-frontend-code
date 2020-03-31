import { RouterExtensions } from 'nativescript-angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@src/app/services/auth/auth.service';

import * as application from "tns-core-modules/application";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules/application";
import { isAndroid } from "tns-core-modules/platform";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user_name: string = '';
  member_since: string = '';
  user_img: string = '';
  user_earned_coins: string = "";
  user_balance: string = "";
  user_email: string = '';
  user_phone_no: string = '';
  user_city: string = '';
  user_country: string = '';
  isJazzCashPreferred: boolean = null;

  constructor(private _authService: AuthService, private _router: RouterExtensions) { }

  ngOnInit(): void {
    // get user info from auth service using observable
    this.user_name = 'Salman Ahmad';
    this.member_since = 'Member Since ' + new Date();
    this.user_img = 'res://profile';
    this.user_earned_coins = "Total Coins Earned: " + 15000;
    this.user_balance = "PKR 2000";
    this.user_phone_no = "03006543216";
    this.user_email = "salman123@gmail.com";
    this.user_city = 'Lahore';
    this.user_country = 'Pakistan';
    this.isJazzCashPreferred = false;

    // back button to home code
    if (!isAndroid) {
      return;
    }
    application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
      // if (this.router.isActive("/articles", false)) { // check a specific one
      data.cancel = true; // prevents default back button behavior
      this._router.navigate(['/home']);
      // this.logout();
      // }
    });
  }
}
