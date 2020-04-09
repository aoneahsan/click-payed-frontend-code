import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/common';

@Component({
  selector: 'app-topup-wallet-popup',
  templateUrl: './topup-wallet-popup.component.html',
  styleUrls: ['./topup-wallet-popup.component.scss']
})
export class TopupWalletPopupComponent implements OnInit {

  dataToShow: 'steps' | 'available_accounts' = null;
  steps: { number: string, description: string }[] = null;
  accounts: { name: string, numbers: string[] }[] = null;
  loading: boolean = true;

  constructor(private _modalParams: ModalDialogParams) { }

  ngOnInit() {
    this.dataToShow = (this._modalParams.context as { dataToShow: 'steps' | 'available_accounts' }).dataToShow;
    if (this.dataToShow == 'steps') {
      this.loadSteps();
    } else if (this.dataToShow == 'available_accounts') {
      this.loadAvailableAccounts();
    }
  }

  loadSteps() {
    this.loading = true;
    setTimeout(() => {
      this.steps = [
        { number: 'STEP 1:', description: 'Download easypaisa /jazzcash app & Create your mobile account.' },
        { number: 'STEP 2:', description: 'Load cash into your easypaisa / jazzcash mobile wallet account through you nearest easypaisa /jazzcash outlet.' },
        { number: 'STEP 3:', description: 'Transfer cash using your preferred payment method to our active deposit account' },
        { number: 'STEP 4:', description: 'Submit deposit transaction detail and receive cash in your wallet' }
      ];
      this.loading = false;
    }, 700);
  }

  loadAvailableAccounts() {
    this.loading = true;
    setTimeout(() => {
      this.accounts = [
        { name: 'EasyPaisa', numbers: ['030000000', '030000000'] },
        { name: 'Jazzcash', numbers: ['030000000', '030000000'] }
      ];
      this.loading = false;
    }, 700);
  }

}
