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
    this.transcation_records = [
      {date_time: '14/11 1:20pm', trx: 32983223, cr: 1900, db: 0, balance: 1900},
      {date_time: '23/01 1:20pm', trx: 32983223, cr: 0, db: 700, balance: 1200},
      {date_time: '07/02 1:20pm', trx: 32983223, cr: 200, db: 0, balance: 1400},
      {date_time: '14/04 1:20pm', trx: 32983223, cr: 400, db: 0, balance: 1800},
      {date_time: '01/05 1:20pm', trx: 32983223, cr: 0, db: 1800, balance: 0},
      {date_time: '14/11 1:20pm', trx: 32983223, cr: 1900, db: 0, balance: 1900},
      {date_time: '23/01 1:20pm', trx: 32983223, cr: 0, db: 700, balance: 1200},
      {date_time: '07/02 1:20pm', trx: 32983223, cr: 200, db: 0, balance: 1400},
      {date_time: '14/04 1:20pm', trx: 32983223, cr: 400, db: 0, balance: 1800},
      {date_time: '01/05 1:20pm', trx: 32983223, cr: 0, db: 1800, balance: 0},
      {date_time: '14/11 1:20pm', trx: 32983223, cr: 1900, db: 0, balance: 1900},
      {date_time: '23/01 1:20pm', trx: 32983223, cr: 0, db: 700, balance: 1200},
      {date_time: '07/02 1:20pm', trx: 32983223, cr: 200, db: 0, balance: 1400},
      {date_time: '14/04 1:20pm', trx: 32983223, cr: 400, db: 0, balance: 1800},
      {date_time: '01/05 1:20pm', trx: 32983223, cr: 0, db: 1800, balance: 0},
      {date_time: '14/11 1:20pm', trx: 32983223, cr: 1900, db: 0, balance: 1900},
      {date_time: '23/01 1:20pm', trx: 32983223, cr: 0, db: 700, balance: 1200},
      {date_time: '07/02 1:20pm', trx: 32983223, cr: 200, db: 0, balance: 1400},
      {date_time: '14/04 1:20pm', trx: 32983223, cr: 400, db: 0, balance: 1800},
      {date_time: '01/05 1:20pm', trx: 32983223, cr: 0, db: 1800, balance: 0}
    ]
  }

}
