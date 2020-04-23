import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { SystemService } from '@src/app/services/system.service';
import { Subscription } from 'rxjs';
import { SelectedIndexChangedEventData, ValueList } from 'nativescript-drop-down';
import { UserService } from '@src/app/services/user/user.service';

@Component({
  selector: 'app-request-withdrawal',
  templateUrl: './request-withdrawal.component.html',
  styleUrls: ['./request-withdrawal.component.scss']
})
export class RequestWithdrawalComponent implements OnInit, OnDestroy {

  remaining_balance: string = '';
  remaining_balance_Sub: Subscription;

  _formSubmited: boolean = false;
  _amountToWithDraw: string = null;

  public selectedIndex = 0;
  public items: any;
  @ViewChild('dropdow', {static: false}) dropdow: ElementRef;
  
  constructor(private _systemService: SystemService, private _userService: UserService) {
  }
  
  get _formDataEnteredStatus() {
    if (this._amountToWithDraw) {
      return true;
    }
    return false;
  }

  ngOnInit() {
    this.items = new ValueList([
      { value: "100", display: "100" },
      { value: "200", display: "200" },
      { value: "300", display: "300" },
      { value: "400", display: "400" },
      { value: "500", display: "500" },
      { value: "1000", display: "1000" }
    ]);
    this.remaining_balance_Sub = this._systemService.getUserBalance().subscribe(
      balance => {
        this.remaining_balance = "Remaining Balance: PKR " + balance;
      }
    );
  }

  public onchange(args: SelectedIndexChangedEventData) {
    // console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}, args are ${args}`);
    // console.log(this.items._array[args.newIndex].value);
    this._amountToWithDraw = this.items._array[args.newIndex].value;
  }

  public onopen() {
    // console.log("Drop Down opened.");
  }

  public onclose() {
    // console.log("Drop Down closed.");
  }

  submitForm() {
    if (!this._amountToWithDraw) { 
      return;
    }
    else {
      this._formSubmited = true;
      const data = {
        amount: this._amountToWithDraw
      };
      this._userService.withDrawalRequest(data).subscribe(
        res => {
          console.log('RequestWithdrawalComponent == submitForm == response = ', res);
          alert(res.data);
          this.resetForm();
        },
        err => {
          console.log('RequestWithdrawalComponent == submitForm == error = ', err);
          alert(err.error.error);
          this.resetForm();
        }
      )
    }
  }

  resetForm() {
    this._amountToWithDraw = null;
    this.selectedIndex = 0;
    this._formSubmited = false;
  }

  ngOnDestroy() {
    if (this.remaining_balance_Sub) {
      this.remaining_balance_Sub.unsubscribe();
    }
  }

}
