import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

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

  loadinPageData_s: boolean = true;
  loadinPageDataSub: Subscription;

  _remaining_coins: number = 0;
  remaining_coins_Sub: Subscription;

  coins_to_transfer: number = 0;
  reciver_number: string = null;
  _reciverUserData = null;
  reciverName: string = 'Recipient Registered Name';
  userFound: boolean = false;

  searchForPerson: boolean = false;
  searchForPerson_Sub: Subscription;
  formSubmited: boolean = false;

  _userAccountDataSub: Subscription;

  constructor(
    private _systemService: SystemService,
    private _modalService: ModalDialogService,
    private _viewRf: ViewContainerRef,
    private _uiService: UIService,
    private _userService: UserService
  ) { }

  get _reciver_number_added() {
    if (this.reciver_number) {
      return true;
    }
    return false;
  }

  get _coinsEntered() {
    // console.log("this.coins_to_transfer && this.userFound", this.coins_to_transfer, this.userFound, this._remaining_coins, +this.coins_to_transfer < this._remaining_coins);
    if (!!this.coins_to_transfer && !!this.userFound) {
      return true;
    }
    else {
      return false;
    }
  }

  ngOnInit() {
    this.loadinPageDataSub = this._systemService.getLoadinPageDataStatus().subscribe(
      status => {
        this.loadinPageData_s = status;
      }
    );

    this.remaining_coins_Sub = this._systemService.getUserCoins().subscribe(
      coins => {
        this._remaining_coins = coins;
      }
    );
  }

  searchPerson() {
    this.searchForPerson = true;
    if (this.reciver_number) {
      this.searchForPerson = true;
      const data = {
        number: this.reciver_number
      };
      this.searchForPerson_Sub = this._userService.searchPersonByNumber(data).subscribe(
        user => {
          this.userFound = true;
          console.log('Transfer Coins Compo  ==  searchPerson  ==  user = ', user);
          this._reciverUserData = user.data;
          if (user.data) {
            this.reciverName = user.data.name;
          }
          this.searchForPerson = false;
        },
        err => {
          console.log('Transfer Coins Compo  ==  searchPerson  ==  error = ', err);
          this.searchForPerson = false;
          alert({ title: 'Error', message: err.error.data });
        }
      );
    }
  }

  transferCoins() {
    if (+this.coins_to_transfer <= +this._remaining_coins) {
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
              remainingCoins: (+this._remaining_coins - +this.coins_to_transfer)
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
    } else {
      alert("Not Enough Coins!");
    }
  }

  transferNow() {
    if (+this.coins_to_transfer <= +this._remaining_coins) {
      const data = {
        revicer_id: this._reciverUserData.id,
        coins_to_transfer: this.coins_to_transfer
      }
      this._userService.transferCoinsRequest(data).subscribe(
        res => {
          this._modalService.showModal(
            CoinsTransferedPopupComponent,
            {
              fullscreen: false,
              viewContainerRef: this._uiService.getAppVCRef() ? this._uiService.getAppVCRef() : this._viewRf,
              context: {
                data: {
                  remainingCoins: (this._remaining_coins - this.coins_to_transfer)
                }
              }
            }
          ).then(
            res => {
              if (res == 'ok') {
                this.resetFields();
                this._systemService.loadingPageDataTrue();
                this._userAccountDataSub = this._userService.userAccountData().subscribe(
                  data => {
                    // console.log("App.Component.ts  ==  userAccountDataSub  ==  responsedata = ", data.data);
                    this._systemService.setUserCoins(data.data.coins);
                    this._systemService.setUserBalance(data.data.balance);
                    this._systemService.loadingPageDataFalse();
                  },
                  err => {
                    console.log("App.Component.ts  ==  userAccountDataSub  ==  error = ", err);
                    this._systemService.loadingPageDataFalse();
                    alert("Error Occured While Fetching Account Data, Reload App");
                  }
                );
              }
              else if (res == undefined) {
                this.resetFields();
              }
            }
          );
        },
        err => {
          console.log('Transfer Coins Compo  ==  coinToTransferChanged  ==  error = ', err);
          alert('Error Occured, Try Again');
          this.formSubmited = false;
        }
      )
    } else {
      alert("Don't Have Enough Coins!");
      this.coins_to_transfer = 0;
      this.formSubmited = false;
    }
  }

  // coinToTransferChanged() {
  //   if (this.coins_to_transfer) {
  //     const data = {
  //       revicer_id: this._reciverUserData.id
  //     }
  //     this._userService.transferCoinsRequest(data).subscribe(
  //       res => {

  //       },
  //       err => {
  //         console.log('Transfer Coins Compo  ==  coinToTransferChanged  ==  error = ', err);
  //         alert('Error Occured, Try Again');
  //       }
  //     )
  //   } else {
  //     alert("Don't Have Enough Coins!");
  //     this.coins_to_transfer = null;
  //   }
  // }

  resetFields() {
    this.coins_to_transfer = 0;
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
    if (this._userAccountDataSub) {
      this._userAccountDataSub.unsubscribe();
    }
  }

}
