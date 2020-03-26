import { RouterExtensions } from 'nativescript-angular/router';
import { ViewContainerRef, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { SystemService } from '@src/app/services/system.service';
import { Subscription } from 'rxjs';
import { ModalDialogService } from 'nativescript-angular/common';
import { TransferCoinsPopupComponent } from './transfer-coins-popup/transfer-coins-popup.component';
import { UIService } from '@src/app/shared/ui/ui.service';
import { CoinsTransferedPopupComponent } from './coins-transfered-popup/coins-transfered-popup.component';

@Component({
  selector: 'app-transfer-coins',
  templateUrl: './transfer-coins.component.html',
  styleUrls: ['./transfer-coins.component.scss']
})
export class TransferCoinsComponent implements OnInit, OnDestroy {

  @ViewChild('coinsToTransfer', { static: false }) coinsToTransfer: ElementRef;

  remaining_coins: string = '';
  remaining_coins_Sub: Subscription;

  coins_to_transfer: number = null;
  reciver_number: any;
  reciverName: string = 'Recipient Registered Name';
  userFound: boolean = false;

  searchForPerson: boolean = false;
  formSubmited: boolean = false;
  remainingUserCoins: number = 0;

  constructor(
    private _systemService: SystemService,
    private _modalService: ModalDialogService,
    private _viewRf: ViewContainerRef,
    private _uiService: UIService,
    private _router: RouterExtensions
  ) { }

  ngOnInit() {
    this.remaining_coins_Sub = this._systemService.getUserCoins().subscribe(
      coins => {
        this.remaining_coins = 'Remaining Coins: ' + coins;
        this.remainingUserCoins = coins;
      }
    );
  }

  searchPerson() {
    this.searchForPerson = true;
    if (this.reciver_number == '0') {
      this.reciverName = 'Ahsan Mahmood'
      this.userFound = true;
    }
    else {
      setTimeout(() => {
        alert('User Not Found!');
        this.reciverName = 'Recipient Registered Name';
        this.searchForPerson = false;
      }, 700)
    }
  }

  get coinsEntered() {
    return this.coins_to_transfer > 99;
  }

  coinToTransferChanged() {
    if (this.coins_to_transfer <= this.remainingUserCoins) {
      this._systemService.afterWithdrawalRemainingBalance(this.remainingUserCoins, this.coins_to_transfer);
    } else {
      alert("Don't Have Enough Coins!");
      this.coins_to_transfer = null;
    }
  }

  transferCoins() {
    this.formSubmited = true;
    this._modalService.showModal(
      TransferCoinsPopupComponent,
      {
        fullscreen: false,
        viewContainerRef: this._uiService.getAppVCRef() ? this._uiService.getAppVCRef() : this._viewRf,
        context: {
          data: {
            coinsToTransfer: this.coins_to_transfer,
            otherUser: {
              name: this.reciverName,
              number: this.reciver_number
            },
            remainingCoins: (this.remainingUserCoins - this.coins_to_transfer)
          }
        }
      }
    ).then(
      res => {
        // console.log(res);
        if (res == 'TRANSFER') {
          this.transferNow();
        }
        else if (res == 'CANCEL') {
          this.formSubmited = false;
        }
        else if (res == undefined) {
          this.formSubmited = false;
        }
      }
    );
  }

  transferNow() {
    setTimeout(() => {
      this.coinToTransferChanged();
      this._modalService.showModal(
        CoinsTransferedPopupComponent,
        {
          fullscreen: false,
          viewContainerRef: this._uiService.getAppVCRef() ? this._uiService.getAppVCRef() : this._viewRf,
          context: {
            data: {
              remainingCoins: this.remainingUserCoins
            }
          }
        }
      ).then(
        res => {
          // console.log(res);
          if (res == 'ok') {
            this.resetFields();
          }
          else if (res == undefined) {
            this.resetFields();
          }
        }
      );
    }, 1000);
    this.formSubmited = false;
  }

  resetFields() {
    this.coins_to_transfer = null;
    this.reciver_number = null;
    this.reciverName = 'Recipient Registered Name';
    this.userFound = false;
    this.searchForPerson = false;
    this.formSubmited = false;
  }

  ngOnDestroy(): void {
    if (this.remaining_coins_Sub) {
      this.remaining_coins_Sub.unsubscribe();
    }
  }

}
