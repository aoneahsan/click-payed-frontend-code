import { Component, OnInit } from '@angular/core';

import { ModalDialogParams } from 'nativescript-angular/common';

@Component({
  selector: 'app-process-withdrawals-popup',
  templateUrl: './process-withdrawals-popup.component.html',
  styleUrls: ['./process-withdrawals-popup.component.scss']
})
export class ProcessWithdrawalsPopupComponent implements OnInit {

  modalData: { id: number, date_time: string, account_name: string, account_no: string, amount: string, status: string };
  trx_no: string = null;
  additional_note: string = null;

  requestApproved: boolean = false;
  request_approved_date_time: string = '';

  constructor(private _modalParams: ModalDialogParams) { }

  ngOnInit() {
    this.modalData = (this._modalParams.context as { item: { id: number, date_time: string, account_name: string, account_no: string, amount: string, status: string } }).item;
    console.log(this.modalData);
  }

  get trxNoAdded() {
    if (this.trx_no) {
      return true;
    } else {
      return false;
    }
  }

  onHandle(action: "approve" | 'reject') {
    if (action == 'approve') {
      //send http to approve the withdrawal request
      // get response from http request and get date and time of approved request and store in request_approved_date_time (variable to show in screen)
      this.request_approved_date_time = 'WITHDRAWAL PROCESSED AT' + '2255 PST | MAY 20TH 2020'; // instead of writing get date time from response and show
      this.showApprovedMessage();
      // this._modalParams.closeCallback('deposit');
    }
    else if (action == 'reject') {
      //send http to reject the withdrawal request
      this.closeModalWithStatus('rejected');
    }
    else {
      this._modalParams.closeCallback('cancel');
    }
  }

  showApprovedMessage() {
    this.requestApproved = true;
  }

  aprovedMessagePopupHandler() {
    this.closeModalWithStatus('approved');
  }

  closeModalWithStatus(status: 'approved' | 'rejected') {
    this._modalParams.closeCallback(status);
  }

}
