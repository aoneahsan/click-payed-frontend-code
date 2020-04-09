import { ModalDialogService } from 'nativescript-angular/common';
import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { openUrl } from 'tns-core-modules/utils/utils';
import { ValueList, SelectedIndexChangedEventData } from 'nativescript-drop-down';
import { TopupWalletPopupComponent } from './topup-wallet-popup/topup-wallet-popup.component';
import { UIService } from '@src/app/shared/ui/ui.service';

@Component({
  selector: 'app-topup-your-wallet',
  templateUrl: './topup-your-wallet.component.html',
  styleUrls: ['./topup-your-wallet.component.scss']
})
export class TopupYourWalletComponent implements OnInit {

  easyPaisaAppLink: string = 'https://google.com';
  jazzcashAppLink: string = 'https://google.com';
  transactionNo: string = null;
  depositAmount: string = null;

  // dropdown
  public selectedIndex = 0;
  public items: any;
  @ViewChild('dropdow', { static: false }) dropdow: ElementRef;

  constructor(private _modalService: ModalDialogService, private _uiService: UIService, private _viewRef: ViewContainerRef) { }

  ngOnInit() {
    this.items = new ValueList([
      { value: "easypaisa", display: "Easypaisa" },
      { value: "jasscash", display: "Jazzcash" }
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
    console.log(this.items._array[args.newIndex]);

  }

  public onopen() {
    // console.log("Drop Down opened.");
  }

  public onclose() {
    // console.log("Drop Down closed.");
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

}
