import { ViewContainerRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { ModalDialogService } from 'nativescript-angular/common';

import { UIService } from '@src/app/shared/ui/ui.service';

import { MakeDepositPopupComponent } from './make-deposit-popup/make-deposit-popup.component';

@Component({
  selector: 'app-make-deposit',
  templateUrl: './make-deposit.component.html',
  styleUrls: ['./make-deposit.component.scss']
})
export class MakeDepositComponent implements OnInit {


  amountToDeposit: number = null;
  reciver_number: any;
  reciver: { name: string, number: string, city: string, country: string } = null;
  select_beneficiary: boolean = false;
  userFound: boolean = false;

  searchForPerson: boolean = false;
  formSubmited: boolean = false;
  remainingUserCoins: number = 0;

  constructor(
    private _modalService: ModalDialogService,
    private _viewRf: ViewContainerRef,
    private _uiService: UIService
  ) { }

  ngOnInit() {
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

  get coinsEntered() {
    return this.amountToDeposit > 0;
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
          this.depositNow();
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

  depositNow() {
    // remember select_beneficiary  and other data ok
    setTimeout(() => {
      alert('Done');
      this.resetFields();
    }, 1000);
    this.formSubmited = false;
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

}
