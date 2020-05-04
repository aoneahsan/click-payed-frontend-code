import { ModalDialogService } from 'nativescript-angular/common';
import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { openUrl } from 'tns-core-modules/utils/utils';
import { ValueList, SelectedIndexChangedEventData } from 'nativescript-drop-down';
import { TopupWalletPopupComponent } from './topup-wallet-popup/topup-wallet-popup.component';
import { UIService } from '@src/app/shared/ui/ui.service';
import { UserService } from '@src/app/services/user/user.service';

@Component({
  selector: 'app-topup-your-wallet',
  templateUrl: './topup-your-wallet.component.html',
  styleUrls: ['./topup-your-wallet.component.scss']
})
export class TopupYourWalletComponent implements OnInit {

  easyPaisaAppLink: string = 'https://play.google.com/store/apps/details?id=pk.com.telenor.phoenix&hl=en';
  jazzcashAppLink: string = 'https://google.com';

  _paymentMethod: string = null;
  _trxID: string = null;
  _depositedAmount: number = null;
  _formSubmited: boolean = false;

  // dropdown
  public selectedIndex = 0;
  public items: any;
  @ViewChild('dropdow', { static: false }) dropdow: ElementRef;

  constructor(
    private _modalService: ModalDialogService,
    private _uiService: UIService,
    private _viewRef: ViewContainerRef,
    private _userService: UserService
  ) { }

  get _formDataEnteredStatus() {
    // console.log('this._paymentMethod && this._trxID && this._depositedAmount = ', 
    // this._paymentMethod && this._trxID && this._depositedAmount,
    // 'this._paymentMethod = ', this._paymentMethod,'this._trxID = ', this._trxID,'this._depositedAmount = ', this._depositedAmount);
    if (this._paymentMethod && this._trxID && +this._depositedAmount) {
      return true;
    }
    return false;
  }

  ngOnInit() {
    this.items = new ValueList([
      { value: "easypaisa", display: "Easypaisa" }
      // { value: "jasscash", display: "Jazzcash" }
    ]);
  }

  openEasypaisaAppURL() {
    openUrl(this.easyPaisaAppLink);
  }

  openJazzcashAppURL() {
    openUrl(this.jazzcashAppLink);
  }

  public onchange(args: SelectedIndexChangedEventData) {
    // console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}, args are ${args}`);
    // console.log(this.items._array[args.newIndex].value);
    this._paymentMethod = this.items._array[args.newIndex].value;
    // console.log('this._paymentMethod = ', this._paymentMethod);
  }

  public onopen() {
    // console.log("Drop Down opened.");
  }

  public onclose() {
    // console.log("Drop Down closed.");
  }

  submitTopupRequest() {
    this._formSubmited = true;
    if (this._paymentMethod && this._trxID && +this._depositedAmount) {
      const data = {
        payment_method: this._paymentMethod,
        trx_id: +this._trxID,
        amount: +this._depositedAmount
      };
      this._userService.topupAccountRequest(data).subscribe(
        res => {
          console.log('Topup-wallet-component.ts  ==  submitTopupRequest == response = ', res);
          alert(res.data);
          this.resetForm();
        },
        err => {
          console.log('Topup-wallet-component.ts  ==  submitTopupRequest == error = ', err);
          alert(err.error.error);
          this.resetForm();
        }
      );
    }
    else {
      alert("Provide Correct Data!");
    }
  }

  openDetailPopup() {
    this._modalService.showModal(
      TopupWalletPopupComponent,
      {
        fullscreen: false,
        viewContainerRef: this._uiService.getAppVCRef() ? this._uiService.getAppVCRef() : this._viewRef,
        context: { dataToShow: 'steps' }
      }
    ).then(
      res => {
        if (res == 'okay') {
          // console.log("okay");
        }
        else if (res == undefined) {
          // alert("Process Canceled");
        }
      }
    );
  }

  openAvailableAccountsPopup() {
    this._modalService.showModal(
      TopupWalletPopupComponent,
      {
        fullscreen: false,
        viewContainerRef: this._uiService.getAppVCRef() ? this._uiService.getAppVCRef() : this._viewRef,
        context: { dataToShow: 'available_accounts' }
      }
    ).then(
      res => {
        if (res == 'okay') {
          // console.log("okay");
        }
        else if (res == undefined) {
          // alert("Process Canceled");
        }
      }
    );
  }

  resetForm() {
    this._paymentMethod = null;
    this._trxID = null;
    this._depositedAmount = null;
    this.selectedIndex = null;
    this._formSubmited = false;
  }

}
