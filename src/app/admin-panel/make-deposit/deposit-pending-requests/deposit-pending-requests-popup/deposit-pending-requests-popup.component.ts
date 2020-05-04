import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/common';
import { DepositRequestModel } from './../../../../models/admin/deposit-request-model';
import { AdminPanelService } from '@src/app/services/adminpanel/adminpanel.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-deposit-pending-requests-popup',
  templateUrl: './deposit-pending-requests-popup.component.html',
  styleUrls: ['./deposit-pending-requests-popup.component.scss']
})

export class DepositPendingRequestsPopupComponent implements OnInit, OnDestroy {

  modalData: DepositRequestModel;
  trx_no: string = null;
  additional_note: string = null;

  requestApproved: boolean = false;
  request_approved_date_time: string = '';

  _approveDepositRequest_Sub: Subscription;
  _rejectDepositRequest_Sub: Subscription;

  _processing: boolean = false;

  constructor(private _modalParams: ModalDialogParams, private _adminpanelService: AdminPanelService) { }

  ngOnInit() {
    this.modalData = (this._modalParams.context as { item: DepositRequestModel }).item;
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
    this._processing = true;
    const data = {
      id: this.modalData.id,
      user_id: this.modalData.user_id,
      amount: this.modalData.amount,
      additional_note: this.additional_note,
      trx_id: this.modalData.trx_id
    };
    if (action == 'approve') {
      this._approveDepositRequest_Sub = this._adminpanelService.approveDepositRequest(data).subscribe(
        res => {
          console.log("DepositPendingRequestPopupComponent == approveDepositRequest == response = ", res);
          this.request_approved_date_time = res.data.date_time;
          this.showApprovedMessage();
          this._processing = false;
        },
        err => {
          console.log("DepositPendingRequestPopupComponent == approveDepositRequest == error = ", err);
          this._processing = false;
          alert("Error Occured, Reuqest Failed, Try Again!");
        }
      );
      // this._modalParams.closeCallback('deposit');
    }
    else if (action == 'reject') {
      this._rejectDepositRequest_Sub = this._adminpanelService.rejectDepositRequest(data).subscribe(
        res => {
          console.log("DepositPendingRequestPopupComponent == approveDepositRequest == response = ", res);
          this.request_approved_date_time = res.data.date_time;
          this._processing = false;
          this.closeModalWithStatus('rejected');
        },
        err => {
          console.log("DepositPendingRequestPopupComponent == approveDepositRequest == error = ", err);
          this._processing = false;
          alert("Error Occured, Reuqest Failed, Try Again!");
        }
      );
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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this._approveDepositRequest_Sub) {
      this._approveDepositRequest_Sub.unsubscribe();
    }
    if (this._rejectDepositRequest_Sub) {
      this._rejectDepositRequest_Sub.unsubscribe();
    }
  }

}
