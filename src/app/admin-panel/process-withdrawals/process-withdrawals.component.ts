import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';

import { RouterExtensions } from 'nativescript-angular/router';

import { ValueList, SelectedIndexChangedEventData } from 'nativescript-drop-down';
import { ModalDialogService } from 'nativescript-angular/common';
import { ProcessWithdrawalsPopupComponent } from './process-withdrawals-popup/process-withdrawals-popup.component';
import { UIService } from '@src/app/shared/ui/ui.service';

@Component({
  selector: 'app-process-withdrawals',
  templateUrl: './process-withdrawals.component.html',
  styleUrls: ['./process-withdrawals.component.scss']
})
export class ProcessWithdrawalsComponent implements OnInit {

  public selectedIndex = 0;
  public items: any;
  @ViewChild('dropdow', { static: false }) dropdow: ElementRef;

  loadingResult: boolean = false;

  requests: {
    id: number,
    date_time: string,
    account_name: string,
    account_no: string,
    amount: string,
    status: string,
    trx_id: number
  }[] = [];

  all_withdrawal_requests: { id: number, date_time: string, account_name: string, account_no: string, amount: string, status: string, trx_id: number }[] = [
    { id: 1, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'pending', trx_id: null },
    { id: 2, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'pending', trx_id: null },
    { id: 3, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'approved', trx_id: 21029109 },
    { id: 4, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'rejected', trx_id: 21029109 },
    { id: 5, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'pending', trx_id: null },
    { id: 6, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'pending', trx_id: null },
    { id: 7, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'pending', trx_id: null },
    { id: 8, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'pending', trx_id: null }
  ];

  all_pending_requests: { id: number, date_time: string, account_name: string, account_no: string, amount: string, status: string, trx_id: number }[] = [
    { id: 1, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'pending', trx_id: null },
    { id: 2, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'pending', trx_id: null },
    { id: 3, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'pending', trx_id: null },
    { id: 4, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'pending', trx_id: null },
    { id: 5, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'pending', trx_id: null },
    { id: 6, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'pending', trx_id: null }
  ];

  all_approved_requests: { id: number, date_time: string, account_name: string, account_no: string, amount: string, status: string, trx_id: number }[] = [
    { id: 1, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'approved', trx_id: 21029109 },
    { id: 2, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'approved', trx_id: 21029109 },
    { id: 3, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'approved', trx_id: 21029109 }
  ];

  all_rejected_requests: { id: number, date_time: string, account_name: string, account_no: string, amount: string, status: string, trx_id: number }[] = [
    { id: 1, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'rejected', trx_id: 21029109 },
    { id: 2, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'rejected', trx_id: 21029109 },
    { id: 3, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'rejected', trx_id: 21029109 }
  ];

  constructor(
    private _router: RouterExtensions,
    private _modalService: ModalDialogService,
    private _viewRe: ViewContainerRef,
    private _uiService: UIService
  ) { }

  ngOnInit() {
    this.items = new ValueList([
      { value: "all_withdrawal_requests", display: "VIEW | All Withdrawal Requests" },
      { value: "all_pending_requests", display: "VIEW | All Pending Requests" },
      { value: "all_approved_requests", display: "VIEW | All Approved Requests" },
      { value: "all_rejected_requests", display: "VIEW | All Rejected Requests" }
    ]);

    this.requests = this.all_withdrawal_requests;
  }

  public onchange(args: SelectedIndexChangedEventData) {
    this.loadingResult = true;
    // console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}, args are ${args}`);
    console.log(this.items._array[args.newIndex]);
    setTimeout(() => {
      this.loadLocalData(args.newIndex);
    }, 700);
  }

  public onopen() {
    // console.log("Drop Down opened.");
  }

  public onclose() {
    // console.log("Drop Down closed.");
  }

  loadLocalData(dataSet: number) {
    if (dataSet == 0) {
      this.requests = this.all_withdrawal_requests;
    } else if (dataSet == 1) {
      this.requests = this.all_pending_requests;
    } else if (dataSet == 2) {
      this.requests = this.all_approved_requests;
    } else if (dataSet == 3) {
      this.requests = this.all_rejected_requests;
    };
    this.loadingResult = false;
  }

  showRequestDetail(item_id) {
    const loadedItem: { id: number, date_time: string, account_name: string, account_no: string, amount: string, status: string, trx_id: number } = this.requests.find(el => el.id == item_id);
    // console.log(loadedItem);
    if (loadedItem.status == 'pending') {
      this.showModal(loadedItem);
    } else if (loadedItem.status == 'approved') {
      let options = {
        title: "Approved",
        message: 'TRX = ' + loadedItem.trx_id + "\n\nDate: " + loadedItem.date_time,
        okButtonText: 'Okay'
      };
      alert(options);
    } else if (loadedItem.status == 'rejected') {
      let options = {
        title: "Rejected",
        message: 'TRX = ' + loadedItem.trx_id + "\n\nDate: " + loadedItem.date_time,
        okButtonText: 'Okay'
      };
      alert(options);
    }

  }

  showModal(loadedItem) {
    this._modalService.showModal(
      ProcessWithdrawalsPopupComponent,
      {
        fullscreen: false,
        viewContainerRef: this._uiService.getAppVCRef() ? this._uiService.getAppVCRef() : this._viewRe,
        context: {
          item: loadedItem
        }
      }
    ).then(
      res => {
        if (res == 'approved') {
          console.log("request approved");
        }
        else if (res == 'rejected') {
          console.log("request rejected");
        }
        else if (res == undefined) {
          alert("Process Canceled");
        }
      }
    );
  }

}
