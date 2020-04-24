import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserProfileData } from './../../../interface/user/userprofiledata-interface';
import { UserService } from '@src/app/services/user/user.service';
import { SystemService } from '@src/app/services/system.service';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss']
})
export class AchievementsComponent implements OnInit {

  loadinPageData_s: boolean;
  loadinPageDataSub: Subscription;

  _userData: UserProfileData;
  _userData_Sub: Subscription;
  _userDataFromServer_Sub: Subscription;

  achievements_records: { name: string, coin_spend: number, coin_earned: number }[] = null;
  coin_spend_total = 0;
  coin_earned_total = 0;


  hasProfileImg: boolean = false;

  constructor(private _userService: UserService, private _systemService: SystemService) { }

  ngOnInit(): void {
    this.loadinPageDataSub = this._systemService.getLoadinPageDataStatus().subscribe(
      status => {
        this.loadinPageData_s = status;
      }
    );

    this.getUserProfileData();

    // this.achievements_records = [
    //   { name: 'Carom Disc', coin_spend: 200, coin_earned: 1800 },
    //   { name: '8-Ball Pool', coin_spend: 100, coin_earned: 200 },
    //   { name: 'Battle Field', coin_spend: 50, coin_earned: 60 },
    //   { name: 'Sea Battle', coin_spend: 20, coin_earned: 100 },
    //   { name: 'Tic-Tac Toe', coin_spend: 180, coin_earned: 500 }
    // ];

    // this.achievements_records.forEach(record => {
    //   this.coin_spend_total += record.coin_spend;
    // });

    // this.achievements_records.forEach(record => {
    //   this.coin_earned_total += record.coin_earned;
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
              console.log('UserAchievementsComponent == getUserProfileData == getProfileDataFromServer == error = ', err);
              alert("Error Occured While fetching Profile Data, Try Again!");
            }
          );
        }
        else {
          this._userData = data;
        }
      }
    );
  }

  ngOnDestroy() {
    if (this._userData_Sub) {
      this._userData_Sub.unsubscribe();
    }
    if (this._userDataFromServer_Sub) {
      this._userDataFromServer_Sub.unsubscribe();
    }
  }

}
