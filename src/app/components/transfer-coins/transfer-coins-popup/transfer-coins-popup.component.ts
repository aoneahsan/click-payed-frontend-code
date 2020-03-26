import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/common';

@Component({
  selector: 'app-transfer-coins-popup',
  templateUrl: './transfer-coins-popup.component.html',
  styleUrls: ['./transfer-coins-popup.component.scss']
})
export class TransferCoinsPopupComponent implements OnInit {

  modalData: {
    coinsToTransfer: number,
    otherUser: {
      name: string,
      number: string
    },
    remainingCoins: any
  };

  constructor(private _modalParams: ModalDialogParams) { }

  ngOnInit() {
    this.modalData = (this._modalParams.context as { data: { coinsToTransfer: number, otherUser: { name: string, number: string }, remainingCoins: any } }).data;
  }

  onHandle(action: "TRANSFER" | 'CANCEL') {
    if (action == 'TRANSFER') {
      this._modalParams.closeCallback('TRANSFER');
    }
    else if (action == 'CANCEL') {
      this._modalParams.closeCallback('CANCEL');
    }
    else {
      this._modalParams.closeCallback('CANCEL');
    }
  }

}
