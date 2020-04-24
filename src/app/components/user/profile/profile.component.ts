import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { RouterExtensions } from 'nativescript-angular/router';

import { SystemService } from '@src/app/services/system.service';
import { UserService } from '@src/app/services/user/user.service';

import { UserProfileData } from './../../../interface/user/userprofiledata-interface';

// import { isAndroid } from "tns-core-modules/platform";
// import * as application from "tns-core-modules/application";
// import { AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules/application";
// import { knownFolders, path as _path, File } from "tns-core-modules/file-system";
// import * as imagepicker from "nativescript-imagepicker";
// var fileSystem = require('file-system');
// const imageSourceModule = require("tns-core-modules/image-source");

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit, OnDestroy {

  isJazzCashPreferred: boolean = false;
  _user_img: any = null;

  _userData: UserProfileData = null;
  _userData_Sub: Subscription;
  _userDataFromServer_Sub: Subscription;

  _newUpdatedUserData: UserProfileData = null;
  _newUpdatedUserData_Sub: Subscription;

  editing: boolean = false;
  hasProfileImg: boolean = false;

  loadinPageData_s: boolean = true;
  loadinPageDataSub: Subscription;

  constructor(
    private _router: RouterExtensions,
    private _userService: UserService,
    private _systemService: SystemService
  ) { }

  get _formDataEntered() {
    if (this.editing) {
      if (this._newUpdatedUserData.city && this._newUpdatedUserData.country && this._newUpdatedUserData.name) {
        return true;
      }
    }
    return false;
  }

  ngOnInit(): void {
    this.loadinPageDataSub = this._systemService.getLoadinPageDataStatus().subscribe(
      status => {
        this.loadinPageData_s = status;
      }
    );
    // get user info from auth service using observable
    this.getUserProfileData();

    // back button to home code
    // if (!isAndroid) {
    //   return;
    // }
    // application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
    //   // if (this.router.isActive("/articles", false)) { // check a specific one
    //   data.cancel = true; // prevents default back button behavior
    //   this._router.navigate(['/home']);
    //   // this.logout();
    //   // }
    // });
  }

  getUserProfileData() {
    this._userData_Sub = this._userService.getProfileData().subscribe(
      data => {
        if (!data) {
          this._systemService.loadingPageDataTrue();
          this._userDataFromServer_Sub = this._userService.getProfileDataFromServer().subscribe(
            res => {
              this._systemService.loadingPageDataFalse();
              // console.log('ProfileComponent == getUserProfileData == getProfileDataFromServer == response = ', res);
              this._userService.setProfileData(res.data);
            },
            err => {
              this._systemService.loadingPageDataFalse();
              console.log('ProfileComponent == getUserProfileData == getProfileDataFromServer == error = ', err);
              alert("Error Occured While fetching Profile Data, Try Again!");
            }
          );
        }
        else {
          this._userData = data;
          this._newUpdatedUserData = this._userData;
        }
      }
    );
  }

  enableEditing() {
    this.editing = true;
  }

  UpdateProfileAnddisableEditing() {
    if (this.editing) {
      if (this._newUpdatedUserData.city && this._newUpdatedUserData.country && this._newUpdatedUserData.name) {
        this._systemService.loadingPageDataTrue();
        this._newUpdatedUserData_Sub = this._userService.updateProfileDataInServer(this._newUpdatedUserData).subscribe(
          res => {
            console.log("ProfileComponent == updateProfileData == response = ", res);
            this._systemService.loadingPageDataFalse();
            this.editing = false;
          },
          err => {
            console.log("ProfileComponent == updateProfileData == error = ", err);
            this._systemService.loadingPageDataFalse();
            this.editing = false;
            alert('Error Occured While Updating Profile Data, Try Againg!');
          }
        );
      }
    }
    else {
      return;
    }
  }

  // uploadImg() {
  //   var that = this;
  //   var context = imagepicker.create({
  //     mode: "single" // allow choosing single image
  //   });
  //   context
  //     .authorize()
  //     .then(function () {
  //       return context.present();
  //     })
  //     .then(function (selection) {
  //       selection.forEach(function (selected) {

  //         let _file;

  //         if (selected.android) {

  //           _file = File.fromPath(selected.android);
  //           // viewModel.uploadFile(file);
  //           that.hasProfileImg = true;
  //           that._user_img = _file._path;
  //           const data = {
  //             file: _file
  //           }
  //           that._userService.updateProfile(data).subscribe(
  //             result => {
  //               console.log("Profile Img Uploading Complete ", result);
  //             },
  //             err => {
  //               console.log('Error Occured While Uploading Profile Photo', err);
  //             }
  //           );
  //           // console.log("selected.android - file - this is selected file:", file);
  //           // console.log("that.hasProfileImg = ", that.hasProfileImg);
  //           // console.log("that._user_img", that._user_img);
  //         } else {

  //           imageSourceModule.fromAsset(selected).then((imageSource) => {

  //             const folder = knownFolders.documents().path;
  //             const fileName = "Photo.png";
  //             const path = _path.join(folder, fileName);
  //             const saved = imageSource.saveToFile(path, "png");

  //             if (saved) {
  //               console.log("Image saved successfully!");
  //               _file = File.fromPath(path);
  //               //viewModel.uploadFile(file);
  //             } else {
  //               console.log("Error! - image couldnt save.");
  //             }
  //           });
  //         }
  //       });
  //     }).catch(function (e) {
  //       console.log(e);
  //       // process error
  //     });
  // }

  ngOnDestroy() {
    if (this.loadinPageDataSub) {
      this.loadinPageDataSub.unsubscribe();
    }
    if (this._newUpdatedUserData_Sub) {
      this._newUpdatedUserData_Sub.unsubscribe();
    }
    if (this._userData_Sub) {
      this._userData_Sub.unsubscribe();
    }
    if (this._userDataFromServer_Sub) {
      this._userDataFromServer_Sub.unsubscribe();
    }
  }

}
