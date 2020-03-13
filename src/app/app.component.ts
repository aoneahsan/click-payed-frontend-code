import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';

import { RouterExtensions } from 'nativescript-angular/router';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Subscription } from 'rxjs';
import { UIService } from './shared/ui/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(RadSideDrawerComponent, {static: false}) drawerComponent: RadSideDrawerComponent;
  private drawer: RadSideDrawer;
  drawerSub: Subscription;

  constructor(private _router: RouterExtensions, private _uiService: UIService) {}

  ngOnInit() {
    this.drawerSub = this._uiService.drawerState.subscribe(
      () => {
        if (this.drawer) {
          this.drawer.toggleDrawerState();
        }
      }
    )
  }

  ngAfterViewInit() {
    this.drawer = this.drawerComponent.sideDrawer;
  }

  logout() {
    this._router.navigate(['/sign-in'], {clearHistory: true});
    this._uiService.toggleDrawerState();
  }

  ngOnDestroy() {
    if (this.drawerSub) {
      this.drawerSub.unsubscribe();
    }
  }

}
