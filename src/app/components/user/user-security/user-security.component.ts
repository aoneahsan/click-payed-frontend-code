import { Component, OnInit } from '@angular/core';

import { AuthService } from '@src/app/services/auth/auth.service';

@Component({
  selector: 'app-user-security',
  templateUrl: './user-security.component.html',
  styleUrls: ['./user-security.component.scss']
})
export class UserSecurityComponent implements OnInit {


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

  

  constructor(private _authService: AuthService) { }

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

}
