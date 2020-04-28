import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Page, isAndroid } from 'tns-core-modules/ui/page';
import { RouterExtensions } from 'nativescript-angular/router';

import { UIService } from './../ui.service';
import { SystemService } from '@src/app/services/system.service';
import { AuthService } from '@src/app/services/auth/auth.service';
import { UserService } from '@src/app/services/user/user.service';

declare var android:any;

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent implements OnInit, OnDestroy {

  // For local Users
  @Input() title = "";
  @Input() showGoBackButton = false;
  @Input() hasMenu = true;
  @Input() showNotifications = false;

  remaining_balance: number = 0;
  remaining_coins: number = 0;
  nofitications_count: string = '';

  _deleteFirebaseToken_Sub: Subscription;

  // For AdminPanel Users
  @Input() isAdminPanel = false;

  constructor(
    private _page: Page,
    private _router: RouterExtensions, 
    private _uiService: UIService, 
    private _systemService: SystemService,
    private _authService: AuthService,
    private _userService: UserService
  ) { }

  ngOnInit() {
    this._systemService.getUserCoins().subscribe(
      coins => {
        this.remaining_coins = coins; 
      }
    );
    this._systemService.getUserBalance().subscribe(
      balance => {
        this.remaining_balance = balance; 
      }
    );
    this.nofitications_count = 99 + '+';
  }

  get canGoBack() {
    return this.showGoBackButton;
  }

  get isAndroidDevice() {
    return isAndroid;
  }

  goBack() {
    this._router.backToPreviousPage();
  }

  onLoaded() {
    if(isAndroid) {
      const actionBar = this._page.actionBar.nativeView;
      const backButton = actionBar.getNavigationIcon();
      if (backButton) {
        backButton.setColorFilter(
          android.graphics.Color.parseColor('#171717'),
          (<any>android.graphics).PorterDuff.Mode.SRC_ATOP
        );
      }
    }
  }

  sideDrawerToggle() {
    this._uiService.toggleDrawerState();
  }

  showNotificationsAction() {
    alert("Noti..");
  }

  logout() {
    // send http using service remove app setting (local keys), and then navigate
    this._systemService.loadingPageDataTrue();
    this._authService.logout();
    this._deleteFirebaseToken_Sub = this._userService.deleteUserFirebaseToken().subscribe(
      res => {
        // console.log("ActionBarComponent == logout == deleteUserFirebaseTokken == response = ", res);
      },
      err => {
        console.log("ActionBarComponent == logout == deleteUserFirebaseTokken == error = ", err);
      }
    )
  }

  ngOnDestroy(): void {
    if (this._deleteFirebaseToken_Sub) {
      this._deleteFirebaseToken_Sub.unsubscribe();
    }
  }

}
