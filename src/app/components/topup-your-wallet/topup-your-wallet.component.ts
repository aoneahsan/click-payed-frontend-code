import { Component, OnInit } from '@angular/core';
import { NgFormSelectorWarning } from '@angular/forms';
import { openUrl } from 'tns-core-modules/utils/utils';

@Component({
  selector: 'app-topup-your-wallet',
  templateUrl: './topup-your-wallet.component.html',
  styleUrls: ['./topup-your-wallet.component.scss']
})
export class TopupYourWalletComponent implements OnInit {

  steps: {number: NgFormSelectorWarning, description: string}[] = [];
  easyPaisaAppLink: string = 'https://google.com';
  jazzcashAppLink: string = 'https://google.com';

  constructor() { }

  ngOnInit() {
    // send http to get steps from serve
    this.steps = [
      {number: 'STEP 1:', description: 'Download easypaisa /jazzcash app & Create your mobile account.'},
      {number: 'STEP 2:', description: 'Load cash into your easypaisa / jazzcash mobile wallet account through you nearest easypaisa /jazzcash outlet.'},
      {number: 'STEP 3:', description: 'Use mobile Transfer to send cash from easypaisa / jazzcash to 0300*******.'},
      {number: 'STEP 4:', description: 'Receive cash in your ClickPayed wallet account & Login to your preferred game and buy coins using ClickPayed wallet.'}
    ]
  }

  openEasypaisaAppURL() {
    openUrl(this.easyPaisaAppLink);
  }

  openJazzcashAppURL() {
    openUrl(this.jazzcashAppLink);
  }

}
