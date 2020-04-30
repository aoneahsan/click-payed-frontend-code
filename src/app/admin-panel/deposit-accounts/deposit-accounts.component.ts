import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { SystemService } from '@src/app/services/system.service';
import { ValueList } from 'nativescript-drop-down';
import { SelectedIndexChangedEventData } from 'tns-core-modules/ui/tab-view/tab-view';
import { AdminPanelService } from '@src/app/services/adminpanel/adminpanel.service';

@Component({
  selector: 'app-deposit-accounts',
  templateUrl: './deposit-accounts.component.html',
  styleUrls: ['./deposit-accounts.component.scss']
})
export class DepositAccountsComponent implements OnInit, OnDestroy {

  loadinPageData_s: boolean = true;
  loadinPageDataSub: Subscription;

  public selectedIndex = null;
  public items: any;
  @ViewChild('dropdow', { static: false }) dropdow: ElementRef;

  _paymentMethod: string = null;
  _account_number: string = null;
  _addingAccountProcess: boolean = false;
  _addingNewAccount_Sub: Subscription;
  _depositAccounts = null;
  _getDepositAccount_Sub: Subscription;
  _fetchDepositAccount_Sub: Subscription;

  constructor(private _systemService: SystemService, private _adminpanelService: AdminPanelService) { }

  ngOnInit() {
    this.loadinPageDataSub = this._systemService.getLoadinPageDataStatus().subscribe(
      status => {
        this.loadinPageData_s = status;
      }
    );

    this.items = new ValueList([
      { value: "easypaisa", display: "Easypaisa" },
      { value: "jazzcash", display: "Jazzcash" }
    ]);
    
    this.getDepositAccountsAction();
  }

  public onchange(args: SelectedIndexChangedEventData) {
    // console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}, args are ${args}`);
    // console.log(this.items._array[args.newIndex].value);
    this._paymentMethod = this.items._array[args.newIndex].value;
  }

  addDepositAccount() {
    console.log("DepositAccounts == addDepositAccount == called" );
    if (this._paymentMethod && this._account_number) {
      if (this._account_number.length > 10) {
        this._addingAccountProcess = true;
        const data = {
          payment_method: this._paymentMethod,
          account_number: this._account_number
        };
        this._addingNewAccount_Sub = this._adminpanelService.addNewDepositAccount(data).subscribe(
          res => {
            console.log("DepositAccounts == addDepositAccount == addNewDepositAccount == response = ", res);
            // returning accounts after adding to save one http request
            this._adminpanelService.setDepositAccounts(res.data);
            this._addingAccountProcess = false;
            alert('Account Added!');
          },
          err => {
            console.log("DepositAccounts == addDepositAccount == addNewDepositAccount == error = ", err);
          }
        );
      }
    }
  }

  getDepositAccountsAction() {
    this._getDepositAccount_Sub = this._adminpanelService.getDepositAccounts().subscribe(
      data => {
        if (!data) {
          this.fetchDepositAccountAction();
        }
        else {
          this._depositAccounts = data;
        }
      }
    )
  }

  fetchDepositAccountAction() {
    this._systemService.loadingPageDataTrue();
    this._fetchDepositAccount_Sub = this._adminpanelService.fetchAllDepositAccount().subscribe(
      res => {
        console.log("DepositAcountsComponent == fetchDepositAccountAction == response = ", res);
        this._depositAccounts = res.data;
        this._adminpanelService.setDepositAccounts(res.data);
      },
      err => {
        console.log("DepositAcountsComponent == fetchDepositAccountAction == error = ", err);
        alert("Error Occured, While Fetching Deposit Accounts!");
      }
    );
  }

  ngOnDestroy() {
    if (this.loadinPageDataSub) {
      this.loadinPageDataSub.unsubscribe();
    }
    if (this._addingNewAccount_Sub) {
      this._addingNewAccount_Sub.unsubscribe();
    }
  }

}
