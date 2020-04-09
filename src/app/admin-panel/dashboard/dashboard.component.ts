import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  totalDeposit: string = '';
  totalWithDrawal: string = '';
  totalCoinsConverted: string = '';
  totalCoinsRedeemed: string = '';
  totalCoinsInCirculation: string = '';
  totalwalletusers: string = "";
  constructor() { }

  ngOnInit() {
    // http to get values
    this.totalDeposit = '12000000';
    this.totalWithDrawal = "2700000";
    this.totalCoinsConverted = "120000000";
    this.totalCoinsRedeemed = "80000000";
    this.totalCoinsInCirculation = "40000000";
    this.totalwalletusers = '2200';
  }

}
