import { Component, OnInit, OnDestroy } from '@angular/core';
import { SystemService } from '@src/app/services/system.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-request-withdrawal',
  templateUrl: './request-withdrawal.component.html',
  styleUrls: ['./request-withdrawal.component.scss']
})
export class RequestWithdrawalComponent implements OnInit, OnDestroy {

  remaining_balance: string = '';
  remaining_balance_Sub: Subscription;
  constructor(private _systemService: SystemService) { }

  ngOnInit() {
    this.remaining_balance_Sub = this._systemService.getUserBalance().subscribe(
      balance => {
        this.remaining_balance = "Remaining Balance: PKR " + balance;
      }
    )
  }

  ngOnDestroy() {
    if (this.remaining_balance_Sub) {
      this.remaining_balance_Sub.unsubscribe();
    }
  }

}
