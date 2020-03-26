import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { SystemService } from '@src/app/services/system.service';
import { Subscription } from 'rxjs';
import { SelectedIndexChangedEventData, ValueList, DropDown } from 'nativescript-drop-down';
import { Page } from 'tns-core-modules/ui/page';

@Component({
  selector: 'app-request-withdrawal',
  templateUrl: './request-withdrawal.component.html',
  styleUrls: ['./request-withdrawal.component.scss']
})
export class RequestWithdrawalComponent implements OnInit, OnDestroy {

  remaining_balance: string = '';
  remaining_balance_Sub: Subscription;
  public selectedIndex = 0;
  public items: any;
  @ViewChild('dropdow', {static: false}) dropdow: ElementRef;
  
  constructor(private _systemService: SystemService, private page: Page) {
    this.items = new ValueList([
      { value: "000-click-100", display: "100" },
      { value: "000-click-200", display: "200" },
      { value: "000-click-300", display: "300" },
      { value: "000-click-400", display: "400" },
    ]);
  }
  
  ngOnInit() {
    let dd = this.page.getViewById<any>("dropdow");
    console.log(dd);
    this.remaining_balance_Sub = this._systemService.getUserBalance().subscribe(
      balance => {
        this.remaining_balance = "Remaining Balance: PKR " + balance;
      }
    );
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


  ngOnDestroy() {
    if (this.remaining_balance_Sub) {
      this.remaining_balance_Sub.unsubscribe();
    }
  }

}
