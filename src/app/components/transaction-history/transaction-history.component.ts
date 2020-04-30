import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {

  transcation_records: {date_time: any, trx: any, cr: any, db: any, balance: any}[] = [];
  constructor() { }

  ngOnInit() {
    // send http to get records and store server records
    // this.transcation_records = [
    //   {date_time: '14/11 1:20pm', trx: 32983223, cr: 1900, db: 0, balance: 1900}
    // ];
  }

}
