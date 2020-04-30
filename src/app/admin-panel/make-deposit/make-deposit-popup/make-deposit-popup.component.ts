import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/common';
import { AdminPanelService } from '@src/app/services/adminpanel/adminpanel.service';

@Component({
  selector: 'app-make-deposit-popup',
  templateUrl: './make-deposit-popup.component.html',
  styleUrls: ['./make-deposit-popup.component.scss']
})
export class MakeDepositPopupComponent implements OnInit {
  
  modalData: {
    User: { id: number, name: string, phone_number: string, city: string, country: string },
    amountToDeposit: any,
    select_beneficiary: boolean,
    trx_id: string
  };
  depositDone: boolean = false;
  _processing: boolean = false;

  constructor(private _modalParams: ModalDialogParams, private _adminpanelService: AdminPanelService) { }

  ngOnInit() {
    this.modalData = (this._modalParams.context as { data: { User: { id: number, name: string, phone_number: string, city: string, country: string }, amountToDeposit: any, select_beneficiary: boolean, trx_id: string } }).data;
  }

  onHandle(action: "deposit" | 'cancel') {
    if (action == 'deposit') {
      this.depositNow();
    }
    else if (action == 'cancel') {
      this._modalParams.closeCallback('cancel');
    }
    else {
      this._modalParams.closeCallback('cancel');
    }
  }
  
  depositNow() {
    this._processing = true;
    const data = {
      user_id: this.modalData.User.id,
      amount: this.modalData.amountToDeposit,
      trx_id: this.modalData.trx_id
    };
    this._adminpanelService.makeDepositeRequest(data).subscribe(
      res => {
        console.log("MakeDepositPopupComponent == makeDepositeRequest == response = ", res);
        this.depositDone = true;
        this._processing = false;
      },
      err => {
        console.log("MakeDepositPopupComponent == makeDepositeRequest == error = ", err);
        this._processing = false;
        alert("Error Occured Try Again!");
      }
    );
  }
  
  closeAfterDepositDone() {
    this._modalParams.closeCallback('deposit');
  }

}
