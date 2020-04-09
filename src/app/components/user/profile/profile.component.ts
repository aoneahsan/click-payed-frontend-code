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

  enableEditing() {
    this.editing = true;
  }

  disableEditing() {
    this.editing = false;
  }

  uploadImg() {
    var that = this;
    var context = imagepicker.create({
      mode: "single" // allow choosing single image
    });
    context
      .authorize()
      .then(function () {
        return context.present();
      })
      .then(function (selection) {
        selection.forEach(function (selected) {

          let file;

          if (selected.android) {

            file = File.fromPath(selected.android);
            // viewModel.uploadFile(file);
            that.hasProfileImg = true;
            that.user_img = file._path;
            // that._userService.updateProfile(file).subscribe(
            //   result => {
            //     console.log("Profile Img Uploading Complete", result);
            //   },
            //   err => {
            //     console.log('Error Occured While Uploading Profile Photo', err);
            //   }
            // );
            // console.log("selected.android - file - this is selected file:", file);
            // console.log("that.hasProfileImg = ", that.hasProfileImg);
            // console.log("that.user_img", that.user_img);
          } else {

            imageSourceModule.fromAsset(selected).then((imageSource) => {

              const folder = knownFolders.documents().path;
              const fileName = "Photo.png";
              const path = _path.join(folder, fileName);
              const saved = imageSource.saveToFile(path, "png");

              if (saved) {
                console.log("Image saved successfully!");
                file = File.fromPath(path);
                //viewModel.uploadFile(file);
              } else {
                console.log("Error! - image couldnt save.");
              }
            });
          }
        });
      }).catch(function (e) {
        console.log(e);
        // process error
      });
  }

}
