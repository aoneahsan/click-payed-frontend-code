import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { TransactionHistoryInterface } from './../../interface/user/transaction-history-interface';
import { UserService } from '@src/app/services/user/user.service';
import { SystemService } from '@src/app/services/system.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {

  loadinPageData_s: boolean = true;
  loadinPageDataSub: Subscription;

  _transcationRecords: TransactionHistoryInterface[] = null;
  _getTranscationRecords_Sub: Subscription;
  _fetchTranscationRecords_Sub: Subscription;

  constructor(private _systemService: SystemService, private _userService: UserService) { }

  ngOnInit() {
    this.loadinPageDataSub = this._systemService.getLoadinPageDataStatus().subscribe(
      status => {
        this.loadinPageData_s = status;
      }
    );

    this.fetchTransactionRecords();
  }

  fetchTransactionRecords(){
    this._systemService.loadingPageDataTrue();
    this._fetchTranscationRecords_Sub = this._userService.fetchUserTransactionHistory().subscribe(
      res => {
        this._systemService.loadingPageDataFalse();
        console.log("TransactionHistoryComponent == fetchUserTransactionHistory == response = ", res);
        this._userService.setUserTransactionHistory(res.data);
        this.getTransactionRecords();
      },
      err => {
        this._systemService.loadingPageDataFalse();
        console.log("TransactionHistoryComponent == fetchUserTransactionHistory == error = ", err);
      }
    )
  }

  getTransactionRecords() {
    this._getTranscationRecords_Sub = this._userService.getUserTransactionHistory().subscribe(
      data => {
        if (!!data) {
          this._transcationRecords = data;
        }
      }
    );
  }

  getCreditAmount(item: TransactionHistoryInterface) {
    if (item.transaction_type == 'direct_deposit_request' || item.transaction_type == 'credit') {
      return item.amount;
    }
    else {
      return 0;
    }
  }

  getDebitAmount(item: TransactionHistoryInterface) {
    if (item.transaction_type == 'debit') {
      return item.amount;
    }
    else {
      return 0;
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.loadinPageDataSub) {
      this.loadinPageDataSub.unsubscribe();
    }
    if (this._fetchTranscationRecords_Sub) {
      this._fetchTranscationRecords_Sub.unsubscribe();
    }
    if (this._getTranscationRecords_Sub) {
      this._getTranscationRecords_Sub.unsubscribe();
    }
  }

}
