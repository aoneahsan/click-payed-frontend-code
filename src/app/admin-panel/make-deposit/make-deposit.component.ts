import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';

import { ModalDialogService } from 'nativescript-angular/common';

import { UIService } from '@src/app/shared/ui/ui.service';

import { MakeDepositPopupComponent } from './make-deposit-popup/make-deposit-popup.component';
import { Subscription } from 'rxjs';
import { SystemService } from '@src/app/services/system.service';
import { AuthService } from '@src/app/services/auth/auth.service';

@Component({
  selector: 'app-make-deposit',
  templateUrl: './make-deposit.component.html',
  styleUrls: ['./make-deposit.component.scss']
})

export class MakeDepositComponent implements OnInit, OnDestroy {

  loadinPageData_s: boolean = true;
  loadinPageDataSub: Subscription;

  _userRole: 'admin' | 'editor' | 'engager' | 'user' = null;
  _isAdmin: boolean = false;
  _isEditor: boolean = false;
  _isEngager: boolean = false;
  _userRole_Sub: Subscription;

  amountToDeposit: number = null;
  trx_id: string = null;
  reciver_number: any;
  reciver: { name: string, number: string, city: string, country: string } = { name: "", number: "", city: "", country: "" };
  select_beneficiary: boolean = false;
  userFound: boolean = false;

  searchForPerson: boolean = false;
  formSubmited: boolean = false;
  remainingUserCoins: number = 0;

  constructor(
    private _modalService: ModalDialogService,
    private _viewRf: ViewContainerRef,
    private _uiService: UIService,
    private _systemService: SystemService,
    private _authService: AuthService
  ) { }

  get coinsEntered() {
    return this.amountToDeposit > 0;
  }

  get trxIdAdded() {
    if (this.trx_id) {
      if (this.trx_id.length >= 6) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  ngOnInit() {
    this.loadinPageDataSub = this._systemService.getLoadinPageDataStatus().subscribe(
      status => {
        this.loadinPageData_s = status;
      }
    );

    this._userRole_Sub = this._authService.getUserRole().subscribe(
      role => {
        this._userRole = role;
        if (role == 'admin') {
          this._isAdmin = true;
          this._isEditor = false;
          this._isEngager = false;
        }
        else if (role == 'editor') {
          this._isAdmin = false;
          this._isEditor = true;
          this._isEngager = false;
        }
        else if (role == 'engager') {
          this._isAdmin = false;
          this._isEditor = false;
          this._isEngager = true;
        }
      }
    );
  }

  searchPerson() {
    this.searchForPerson = true;
    if (this.reciver_number == '0') {
      setTimeout(() => {
        this.reciver = {
          name: 'Ahsan Mahmood',
          number: '03046619706',
          city: 'lahore',
          country: 'pakistan'
        };
        this.searchForPerson = false;
        this.userFound = true;
      }, 300)
    }
    else {
      setTimeout(() => {
        alert('User Not Found!');
        this.reciver = null;
        this.searchForPerson = false;
      }, 700)
    }
  }

  depositAmount() {
    this.formSubmited = true;
    this._modalService.showModal(
      MakeDepositPopupComponent,
      {
        fullscreen: false,
        viewContainerRef: this._uiService.getAppVCRef() ? this._uiService.getAppVCRef() : this._viewRf,
        context: {
          data: {
            User: {
              name: this.reciver.name,
              number: this.reciver.number
            },
            amountToDeposit: this.amountToDeposit,
            select_beneficiary: this.select_beneficiary
          }
        }
      }
    ).then(
      res => {
        // console.log(res);
        if (res == 'deposit') {
          this.resetFields();
          this.formSubmited = false;
        }
        else if (res == 'cancel') {
          this.formSubmited = false;
        }
        else if (res == undefined) {
          this.formSubmited = false;
        }
      }
    );
  }

  resetFields() {
    this.amountToDeposit = null;
    this.reciver_number = null;
    this.reciver.number = null;
    this.reciver.name = null;
    this.reciver.city = null;
    this.reciver.country = null;
    this.userFound = false;
    this.searchForPerson = false;
    this.formSubmited = false;
    this.select_beneficiary = false;
  }

  ngOnDestroy() {
    if (this.loadinPageDataSub) {
      this.loadinPageDataSub.unsubscribe();
    }
    if (this._userRole_Sub) {
      this._userRole_Sub.unsubscribe();
    }
  }

}
