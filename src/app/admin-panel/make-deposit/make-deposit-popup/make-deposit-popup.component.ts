import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/common';

@Component({
  selector: 'app-make-deposit-popup',
  templateUrl: './make-deposit-popup.component.html',
  styleUrls: ['./make-deposit-popup.component.scss']
})
export class MakeDepositPopupComponent implements OnInit {
  
  modalData: {
    User: {
      name: string,
      number: string
    },
    amountToDeposit: any
  };

  constructor(private _modalParams: ModalDialogParams) { }

  ngOnInit() {
    this.modalData = (this._modalParams.context as { data: { User: { name: string, number: string }, amountToDeposit: any } }).data;
  }

  onHandle(action: "deposit" | 'cancel') {
    if (action == 'deposit') {
      this._modalParams.closeCallback('deposit');
    }
    else if (action == 'cancel') {
      this._modalParams.closeCallback('cancel');
    }
    else {
      this._modalParams.closeCallback('cancel');
    }
  }

}
