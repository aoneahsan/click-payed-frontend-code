import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { RouterExtensions } from 'nativescript-angular/router';
import { ModalDialogService } from 'nativescript-angular/common';

import { SystemService } from '@src/app/services/system.service';
import { UIService } from '@src/app/shared/ui/ui.service';
import { UserService } from '@src/app/services/user/user.service';

import { TransferCoinsPopupComponent } from './transfer-coins-popup/transfer-coins-popup.component';
import { CoinsTransferedPopupComponent } from './coins-transfered-popup/coins-transfered-popup.component';

@Component({
  selector: 'app-transfer-coins',
  templateUrl: './transfer-coins.component.html',
  styleUrls: ['./transfer-coins.component.scss']
})
export class TransferCoinsComponent implements OnInit, OnDestroy {

  @ViewChild('coinsToTransfer', { static: false }) coinsToTransfer: ElementRef;

  loadinPageData_s: boolean = true;
  loadinPageDataSub: Subscription;

  remaining_coins: string = '';
  remaining_coins_Sub: Subscription;

  coins_to_transfer: number = null;
  reciver_number: string = null;
  _reciverUserData = null;
  reciverName: string = 'Recipient Registered Name';
  userFound: boolean = false;

  searchForPerson: boolean = false;
  searchForPerson_Sub: Subscription;
  formSubmited: boolean = false;
  remainingUserCoins: number = 0;

  constructor(
    private _systemService: SystemService,
    private _modalService: ModalDialogService,
    private _viewRf: ViewContainerRef,
    private _uiService: UIService,
    private _router: RouterExtensions,
    private _userService: UserService
  ) { }

  get _reciver_number_added() {
    if (this.reciver_number) {
      // if (this.reciver_number.length >= 11) {
      return true;
      // }
    }
    return false;
  }

  get coinsEntered() {
    return this.coins_to_transfer > 99;
  }

  ngOnInit() {
    this.loadinPageDataSub = this._systemService.getLoadinPageDataStatus().subscribe(
      status => {
        this.loadinPageData_s = status;
      }
    );

    this.remaining_coins_Sub = this._systemService.getUserCoins().subscribe(
      coins => {
        this.remaining_coins = 'Remaining Coins: ' + coins;
        this.remainingUserCoins = coins;
      }
    );
  }

  searchPerson() {
    this.searchForPerson = true;
    if (this.reciver_number) {
      this.searchForPerson = true;
      const data = {
        number: +this.reciver_number
      }
      this.searchForPerson_Sub = this._userService.searchPersonByNumber(data).subscribe(
        user => {
          console.log('Transfer Coins Compo  ==  searchPerson  ==  user = ', user);
          this._reciverUserData = user.data;
          this.reciverName = user.data.name ? user.data.name : 'Error';
          this.searchForPerson = false;
          this.userFound = true;
        },
        err => {
          console.log('Transfer Coins Compo  ==  searchPerson  ==  error = ', err);
          this.searchForPerson = false;
          alert({ title: 'Error', message: err.error.data });
        }
      )
    }
  }

  coinToTransferChanged() {
    if (this.coins_to_transfer <= this.remainingUserCoins) {
      const data = {
        revicer_id: this._reciverUserData.id
      }
      this._userService.transferCoinsRequest(data).subscribe(
        res => {
          
        },
        err => {
          console.log('Transfer Coins Compo  ==  coinToTransferChanged  ==  error = ', err);
          alert('Error Occured, Try Again');
        }
      )
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
    if (this.loadinPageDataSub) {
      this.loadinPageDataSub.unsubscribe();
    }
  }

}
