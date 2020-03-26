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
  constructor() { }

  ngOnInit() {
    // http to get values
    this.totalDeposit = 'PKR 12,000,000';
    this.totalWithDrawal = "PKR 2,700,000";
    this.totalCoinsConverted = "120,000,000";
    this.totalCoinsRedeemed = "80,000,000";
    this.totalCoinsInCirculation = "40,000,000";
  }

}
