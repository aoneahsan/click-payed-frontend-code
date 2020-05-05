import { Component, OnInit } from '@angular/core';

import { ModalDialogParams } from 'nativescript-angular/common';
import { WithDrawalRequestsInterface } from '@src/app/interface/admin/withdrawal-requests-interface';
import { SystemService } from '@src/app/services/system.service';
import { AdminPanelService } from '@src/app/services/adminpanel/adminpanel.service';

@Component({
  selector: 'app-process-withdrawals-popup',
  templateUrl: './process-withdrawals-popup.component.html',
  styleUrls: ['./process-withdrawals-popup.component.scss']
})
export class ProcessWithdrawalsPopupComponent implements OnInit {

  modalData: WithDrawalRequestsInterface;
  trx_no: string = null;
  additional_note: string = null;

  requestApproved: boolean = false;
  request_approved_date_time: string = '';

  _processingRequest: Boolean = false;

  constructor(
    private _modalParams: ModalDialogParams,
    private _systemService: SystemService,
    private _adminpanelService: AdminPanelService
  ) { }

  ngOnInit() {
    this.modalData = (this._modalParams.context as { item: WithDrawalRequestsInterface }).item;
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
      this._processingRequest = true;
      //send http to approve the withdrawal request
      // get response from http request and get date and time of approved request and store in request_approved_date_time (variable to show in screen)
      this.request_approved_date_time = '2255 PST | MAY 20TH 2020'; // instead of writing get date time from response and show
      this.approveWithdrawalRequestAction();
      // this._modalParams.closeCallback('deposit');
    }
    else if (action == 'reject') {
      this._processingRequest = true;
      //send http to reject the withdrawal request
      this.rejectWithdrawalRequestAction();
    }
    else {
      this._modalParams.closeCallback('cancel');
    }
  }


  approveWithdrawalRequestAction() {
    this._systemService.loadingPageDataTrue();
    const data = {
      id: this.modalData.id,
      user_id: this.modalData.user_id,
      amount: this.modalData.amount,
      trx_id: this.trx_no,
      additional_note: this.additional_note
    };
    this._adminpanelService.approveWithdrawalRequest(data).subscribe(
      res => {
        console.log("ProcessWithdrawalsComponent == approveWithdrawalRequests == response = ", res);
        this._adminpanelService.setWithdrawalRequests(res.data);
        this._systemService.loadingPageDataFalse();
        this.showApprovedMessage();
        this._processingRequest = false;
      },
      err => {
        console.log("ProcessWithdrawalsComponent == approveWithdrawalRequests == error = ", err);
        this._systemService.loadingPageDataFalse();
        this._processingRequest = false;
        alert("Error Occured, Request Not Approved!");
      }
    );
  }


  rejectWithdrawalRequestAction() {
    this._systemService.loadingPageDataTrue();
    const data = {
      id: this.modalData.id,
      user_id: this.modalData.user_id,
      amount: this.modalData.amount,
      trx_id: this.trx_no,
      additional_note: this.additional_note
    };
    this._adminpanelService.rejectWithdrawalRequest(data).subscribe(
      res => {
        console.log("ProcessWithdrawalsComponent == approveWithdrawalRequests == response = ", res);
        this._adminpanelService.setWithdrawalRequests(res.data);
        this._systemService.loadingPageDataFalse();
        this._processingRequest = false;
        this.closeModalWithStatus('rejected');
      },
      err => {
        console.log("ProcessWithdrawalsComponent == approveWithdrawalRequests == error = ", err);
        this._systemService.loadingPageDataFalse();
        this._processingRequest = false;
        alert("Error Occured, Request Not Rejected!");
      }
    );
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
