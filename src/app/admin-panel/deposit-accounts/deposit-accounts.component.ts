import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { SystemService } from '@src/app/services/system.service';
import { ValueList } from 'nativescript-drop-down';
import { SelectedIndexChangedEventData } from 'tns-core-modules/ui/tab-view/tab-view';

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
  _account_number: number = null;

  constructor(private _systemService: SystemService) { }

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
  }

  public onchange(args: SelectedIndexChangedEventData) {
    // console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}, args are ${args}`);
    // console.log(this.items._array[args.newIndex].value);
    this._paymentMethod = this.items._array[args.newIndex].value;
  }

  addNewAccount() {

  }

  ngOnDestroy() {
    if (this.loadinPageDataSub) {
      this.loadinPageDataSub.unsubscribe();
    }
  }

}
