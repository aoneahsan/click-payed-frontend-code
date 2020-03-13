import { Component, OnInit, Input } from '@angular/core';
import { Page, isAndroid } from 'tns-core-modules/ui/page';
import { RouterExtensions } from 'nativescript-angular/router';
import { UIService } from '../ui.service';

declare var android:any;

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent implements OnInit {

  @Input() title = "";
  @Input() showGoBackButton = true;
  @Input() hasMenu = true;
  @Input() showNotifications = false;

  constructor(private _page: Page, private _router: RouterExtensions, private _uiService: UIService) { }

  ngOnInit() {
  }

  get canGoBack() {
    return this._router.canGoBack() && this.showGoBackButton;
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

}
