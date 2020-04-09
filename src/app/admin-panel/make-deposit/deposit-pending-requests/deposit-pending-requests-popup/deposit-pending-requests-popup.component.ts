import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/common';
import { Deposit } from '../deposit-pending-requests.component';

@Component({
  selector: 'app-deposit-pending-requests-popup',
  templateUrl: './deposit-pending-requests-popup.component.html',
  styleUrls: ['./deposit-pending-requests-popup.component.scss']
})

export class DepositPendingRequestsPopupComponent implements OnInit {

  modalData: Deposit;
  trx_no: string = null;
  additional_note: string = null;

  requestApproved: boolean = false;
  request_approved_date_time: string = '';

  constructor(private _modalParams: ModalDialogParams) { }

  ngOnInit() {
    this.modalData = (this._modalParams.context as { item: Deposit }).item;
    console.log(this.modalData);
  }

  get trxNoAdded() {
    if (this.trx_no) {
      if (this.trx_no.length >= 6) {
        return true;
      } else {
        return false;
      }
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
