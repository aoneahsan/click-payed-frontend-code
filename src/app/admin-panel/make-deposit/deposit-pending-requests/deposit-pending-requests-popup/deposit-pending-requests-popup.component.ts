import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/common';
import { DepositRequestModel } from './../../../../models/admin/deposit-request-model';
import { AdminPanelService } from '@src/app/services/adminpanel/adminpanel.service';

@Component({
  selector: 'app-deposit-pending-requests-popup',
  templateUrl: './deposit-pending-requests-popup.component.html',
  styleUrls: ['./deposit-pending-requests-popup.component.scss']
})

export class DepositPendingRequestsPopupComponent implements OnInit {

  modalData: DepositRequestModel;
  trx_no: string = null;
  additional_note: string = null;

  requestApproved: boolean = false;
  request_approved_date_time: string = '';

  constructor(private _modalParams: ModalDialogParams, private _adminpanelService: AdminPanelService) { }

  ngOnInit() {
    this.modalData = (this._modalParams.context as { item: DepositRequestModel }).item;
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
      
      // get response from http request and get date and time of approved request and store in request_approved_date_time (variable to show in screen)
      this.request_approved_date_time = '2255 PST | MAY 20TH 2020'; // instead of writing get date time from response and show
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
