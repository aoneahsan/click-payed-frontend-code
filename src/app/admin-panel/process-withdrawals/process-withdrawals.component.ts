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
  @ViewChild('dropdow', {static: false}) dropdow: ElementRef;
  
  loadingResult: boolean = false;

  requests: {
    id: number,
    date_time: string, 
    account_name: string,
    account_no: string,
    amount: string,
    status: string
  }[] = [];

  all_withdrawal_requests: { id: number, date_time: string, account_name: string, account_no: string, amount: string, status: string}[] = [
    {id: 1, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'pending'},
    {id: 2, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'pending'},
    {id: 3, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'approved'},
    {id: 4, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'rejected'},
    {id: 5, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'pending'},
    {id: 6, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'pending'},
    {id: 7, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'pending'},
    {id: 8, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'pending'}
  ];

  all_pending_requests: { id: number, date_time: string, account_name: string, account_no: string, amount: string, status: string}[] = [
    {id: 1, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'pending'},
    {id: 2, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'pending'},
    {id: 3, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'pending'},
    {id: 4, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'pending'},
    {id: 5, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'pending'},
    {id: 6, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'pending'}
  ];

  all_approved_requests: { id: number, date_time: string, account_name: string, account_no: string, amount: string, status: string}[] = [
    {id: 1, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'approved'},
    {id: 2, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'approved'},
    {id: 3, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'approved'}
  ];

  all_rejected_requests: { id: number, date_time: string, account_name: string, account_no: string, amount: string, status: string}[] = [
    {id: 1, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'rejected'},
    {id: 2, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'rejected'},
    {id: 3, date_time: '22/11/2020 | 1327', account_name: 'Ahsan Mahmood', account_no: '03006562423', amount: '300', status: 'rejected'}
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
    } else if(dataSet == 1) { 
      this.requests = this.all_pending_requests;
    } else if(dataSet == 2) {
      this.requests = this.all_approved_requests;
    } else if(dataSet == 3) {
      this.requests = this.all_rejected_requests;
    };
    this.loadingResult = false;
  }

  showRequestDetail(item_id) {
    const loadedItem: { id: number, date_time: string, account_name: string, account_no: string, amount: string, status: string} = this.requests.find(el => el.id == item_id);
    // console.log(loadedItem);
    if (loadedItem.status == 'pending') {
      this.showModal(loadedItem);
    } else if (loadedItem.status == 'approved'){
      alert('Request Already Approved');
    } else if (loadedItem.status == 'rejected'){
      alert('Request Already Rejected');
    }
    
  }

  showModal(loadedItem){
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
