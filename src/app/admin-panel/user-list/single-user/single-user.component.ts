import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

import { isAndroid } from "tns-core-modules/platform";
import * as application from "tns-core-modules/application";
import { knownFolders, path as _path, File } from "tns-core-modules/file-system";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules/application";

import { AuthService } from '@src/app/services/auth/auth.service';
import { UserService } from '@src/app/services/user/user.service';

// Plugin
import * as imagepicker from "nativescript-imagepicker";

// var fileSystem = require('file-system');
const imageSourceModule = require("tns-core-modules/image-source");

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent implements OnInit {

  user_name: string = '';
  member_since: string = '';
  user_img: string = '';
  user_earned_coins: string = "";
  user_balance: string = "";
  user_email: string = '';
  user_phone_no: string = '';
  user_city: string = '';
  user_country: string = '';
  user_referal_code: string = '';
  isJazzCashPreferred: boolean = null;

  editing: boolean = false;
  hasProfileImg: boolean = false;

  constructor(
    private _authService: AuthService,
    private _router: RouterExtensions,
    private _userService: UserService
  ) { }

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
    this.user_referal_code = "QFX413";
    this.isJazzCashPreferred = false;

  }

  enableEditing() {
    this.editing = true;
  }

  disableEditing() {
    this.editing = false;
  }

}
