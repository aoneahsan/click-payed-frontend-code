import { Component, OnInit } from '@angular/core';
import { AuthService } from '@src/app/services/auth/auth.service';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss']
})
export class AchievementsComponent implements OnInit {

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
  achievements_records: {name: string, coin_spend: number, coin_earned: number}[] = [];
  coin_spend_total: number = 0;
  coin_earned_total: number = 0;

  constructor(private _authService: AuthService) {}

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

   this.achievements_records = [
     {name: 'Carom Disc', coin_spend: 200, coin_earned: 1800},
     {name: '8-Ball Pool', coin_spend: 100, coin_earned: 200},
     {name: 'Battle Field', coin_spend: 50, coin_earned: 60},
     {name: 'Sea Battle', coin_spend: 20, coin_earned: 100},
     {name: 'Tic-Tac Toe', coin_spend: 180, coin_earned: 500}
   ];

   this.achievements_records.forEach(record => {
     this.coin_spend_total += record.coin_spend;
   });

   this.achievements_records.forEach(record => {
    this.coin_earned_total += record.coin_earned;
  });
  }

}
