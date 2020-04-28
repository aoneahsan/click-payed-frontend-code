import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SystemService } from '@src/app/services/system.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  loadinPageData_s: boolean = true;
  loadinPageDataSub: Subscription;

  totalDeposit: string = '';
  totalWithDrawal: string = '';
  totalCoinsConverted: string = '';
  totalCoinsRedeemed: string = '';
  totalCoinsInCirculation: string = '';
  totalwalletusers: string = "";

  constructor(private _systemService: SystemService) { }

  ngOnInit() {
    this.loadinPageDataSub = this._systemService.getLoadinPageDataStatus().subscribe(
      status => {
        this.loadinPageData_s = status;
      }
    );
    // http to get values
    this.totalDeposit = '12000000';
    this.totalWithDrawal = "2700000";
    this.totalCoinsConverted = "120000000";
    this.totalCoinsRedeemed = "80000000";
    this.totalCoinsInCirculation = "40000000";
    this.totalwalletusers = '2200';
  }

  ngOnDestroy() {
    if (this.loadinPageDataSub) {
      this.loadinPageDataSub.unsubscribe();
    }
  }

}
