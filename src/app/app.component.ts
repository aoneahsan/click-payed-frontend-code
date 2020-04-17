import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';

// import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
// import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
// import { Subscription } from 'rxjs';
import { UIService } from './shared/ui/ui.service';
import { AuthService } from './services/auth/auth.service';
import { SystemService } from './services/system.service';
import { UserService } from './services/user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  // @ViewChild(RadSideDrawerComponent, {static: false}) drawerComponent: RadSideDrawerComponent;
  // private drawer: RadSideDrawer;
  // drawerSub: Subscription;

  _userAccountDataSub: Subscription;

  constructor(
    private _uiService: UIService,
    private _vcRef: ViewContainerRef,
    private _authService: AuthService,
    private _systemService: SystemService,
    private _userService: UserService
  ) {}

  ngOnInit() {
    // login User Automatically
    this._authService.autoLogin();

    // SideDrawer Code
    // this.drawerSub = this._uiService.drawerState.subscribe(
    //   () => {
    //     if (this.drawer) {
    //       this.drawer.toggleDrawerState();
    //     }
    //   }
    // );

    // App Main ViewRef
    this._uiService.setAppVCRef(this._vcRef);

    // Get User Coins and Balance
    this._systemService.loadingPageDataTrue();
    this._userAccountDataSub = this._userService.userAccountData().subscribe(
      data => {
        // console.log("App.Component.ts  ==  userAccountDataSub  ==  responsedata = ", data.data);
        this._systemService.setUserCoins(data.data.coins);
        this._systemService.setUserBalance(data.data.balance);
        this._systemService.loadingPageDataFalse();
      },
      err => {
        // console.log("App.Component.ts  ==  userAccountDataSub  ==  error = ", err);
        this._systemService.loadingPageDataFalse();
        alert("Error Occured While Fetching Account Data, Reload App");
      }
    );
  }

  // ngAfterViewInit() {
  //   // this.drawer = this.drawerComponent.sideDrawer;
  // }

  logout() {
    this._authService.logout();
    this._uiService.toggleDrawerState();
  }

  ngOnDestroy() {
    // if (this.drawerSub) {
    //   this.drawerSub.unsubscribe();
    // }
    if (this._userAccountDataSub) {
      this._userAccountDataSub.unsubscribe();
    }
  }

}
