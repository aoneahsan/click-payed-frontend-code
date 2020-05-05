import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { SystemService } from '@src/app/services/system.service';
import { AuthService } from '@src/app/services/auth/auth.service';
import { UserService } from '@src/app/services/user/user.service';
import { AdminPanelService } from '@src/app/services/adminpanel/adminpanel.service';

import { SearchUserInterface } from './../../interface/user/search-user-interface';

@Component({
  selector: 'app-manage-user-coins',
  templateUrl: './manage-user-coins.component.html',
  styleUrls: ['./manage-user-coins.component.scss']
})

export class ManageUserCoinsComponent implements OnInit, OnDestroy {

  loadinPageData_s: boolean = false;
  loadinPageDataSub: Subscription;

  _userRole: 'admin' | 'editor' | 'engager' | 'user' = null;
  _isAdmin: boolean = false;
  _isEditor: boolean = false;
  _isEngager: boolean = false;
  _userRole_Sub: Subscription;

  _coinsToTransfer: number = null;
  trx_id: string = null;
  reciver_number: any;
  reciver: SearchUserInterface = { id: null, name: "", phone_number: "", city: "", country: "" };
  select_beneficiary: boolean = false;
  userFound: boolean = false;

  searchForPerson: boolean = false;
  searchForPerson_Sub: Subscription;
  formSubmited: boolean = false;
  remainingUserCoins: number = 0;

  _transferModeSetToAddCoins: boolean = false;
  _makeTransferRequest_Sub: Subscription;

  constructor(
    private _systemService: SystemService,
    private _authService: AuthService,
    private _userService: UserService,
    private _adminpanelService: AdminPanelService
  ) { }

  get coinsEntered() {
    return this._coinsToTransfer > 0;
  }

  get trxIdAdded() {
    // if (this.trx_id) {
    return true;
    // } else {
    //   return false;
    // }
  }

  ngOnInit() {
    this.loadinPageDataSub = this._systemService.getLoadinPageDataStatus().subscribe(
      status => {
        this.loadinPageData_s = status;
      }
    );
    this._transferModeSetToAddCoins = true;

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

  switchTransferMode() {
    this._transferModeSetToAddCoins = !this._transferModeSetToAddCoins;
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

  makeTransferRequest() {
    this.formSubmited = true;
    const data = {
      user_id: this.reciver.id,
      number_of_coins: this._coinsToTransfer,
      select_beneficiary: this.select_beneficiary,
      is_mode_set_to_add_coins: this._transferModeSetToAddCoins
    };

    this._makeTransferRequest_Sub = this._adminpanelService.makeAddRemoveUserCoinsRequest(data).subscribe(
      res => {
        console.log("ManageUserCoinsComponent == makeAddRemoveUserCoinsRequest == response = ", res);

        let options = {
          title: "Request Successful",
          message: 'User Coins = ' + res.new_coins,
          okButtonText: 'Okay'
        };
        alert(options);
        this.resetFields();
      },
      err => {
        console.log("ManageUserCoinsComponent == makeAddRemoveUserCoinsRequest == error = ", err);
        alert("Error Occured, Try Again");
      }
    );
  }

  resetFields() {
    this._coinsToTransfer = null;
    this.reciver_number = null;
    this.reciver.phone_number = null;
    this.reciver.name = null;
    this.reciver.city = null;
    this.reciver.country = null;
    this.reciver.coins = null;
    this.reciver.balance = null;
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
    if (this._makeTransferRequest_Sub) {
      this._makeTransferRequest_Sub.unsubscribe();
    }
  }

}
