import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';

import { ModalDialogService } from 'nativescript-angular/common';

import { UIService } from '@src/app/shared/ui/ui.service';

import { MakeDepositPopupComponent } from './make-deposit-popup/make-deposit-popup.component';
import { Subscription } from 'rxjs';
import { SystemService } from '@src/app/services/system.service';
import { AuthService } from '@src/app/services/auth/auth.service';
import { UserService } from '@src/app/services/user/user.service';

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
  reciver: { id: number, name: string, phone_number: string, city: string, country: string } = { id: null, name: "", phone_number: "", city: "", country: "" };
  select_beneficiary: boolean = false;
  userFound: boolean = false;

  searchForPerson: boolean = false;
  searchForPerson_Sub: Subscription;
  formSubmited: boolean = false;
  remainingUserCoins: number = 0;

  constructor(
    private _modalService: ModalDialogService,
    private _viewRf: ViewContainerRef,
    private _uiService: UIService,
    private _systemService: SystemService,
    private _authService: AuthService,
    private _userService: UserService
  ) { }

  get coinsEntered() {
    return this.amountToDeposit > 0;
  }

  get trxIdAdded() {
    if (this.trx_id) {
      return true;
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
    if (this.reciver_number) {
      this.searchForPerson = true;
      const data = {
        number: this.reciver_number
      }
      this.searchForPerson_Sub = this._userService.searchPersonByNumber(data).subscribe(
        user => {
          console.log('Transfer Coins Compo  ==  searchPerson  ==  user = ', user);
          this.reciver = user.data;
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

  depositAmount() {
    this.formSubmited = true;
    this._modalService.showModal(
      MakeDepositPopupComponent,
      {
        fullscreen: false,
        viewContainerRef: this._uiService.getAppVCRef() ? this._uiService.getAppVCRef() : this._viewRf,
        context: {
          data: {
            User: this.reciver,
            amountToDeposit: this.amountToDeposit,
            select_beneficiary: this.select_beneficiary,
            trx_id: this.trx_id
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
    this.reciver.phone_number = null;
    this.reciver.name = null;
    this.reciver.city = null;
    this.reciver.country = null;
    this.userFound = false;
    this.searchForPerson = false;
    this.formSubmited = false;
    this.select_beneficiary = false;
    this.trx_id = null;
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
