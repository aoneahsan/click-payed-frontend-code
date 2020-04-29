import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SystemService } from '@src/app/services/system.service';
import { AuthService } from '@src/app/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  loadinPageData_s: boolean = true;
  loadinPageDataSub: Subscription;

  _userRole: 'admin' | 'editor' | 'engager' | 'user' = null;
  _isAdmin: boolean = false;
  _isEditor: boolean = false;
  _isEngager: boolean = false;
  _userRole_Sub: Subscription;

  totalDeposit: string = '';
  totalWithDrawal: string = '';
  totalCoinsConverted: string = '';
  totalCoinsRedeemed: string = '';
  totalCoinsInCirculation: string = '';
  totalwalletusers: string = "";

  constructor(private _systemService: SystemService, private _authService: AuthService) { }

  ngOnInit() {
    this.loadinPageDataSub = this._systemService.getLoadinPageDataStatus().subscribe(
      status => {
        this.loadinPageData_s = status;
      }
    );
    
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
    if (this._userRole_Sub) {
      this._userRole_Sub.unsubscribe();
    }
  }

}
