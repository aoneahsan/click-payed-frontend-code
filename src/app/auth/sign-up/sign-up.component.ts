import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

import { AuthService } from '@src/app/services/auth/auth.service';
import { ModalDialogService } from 'nativescript-angular/common';
import { SignupPopupComponent } from '../signup-popup/signup-popup.component';
import { UIService } from '@src/app/shared/ui/ui.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  formSubmited: boolean = false;

  constructor(
    private _router: RouterExtensions,
    private _authService: AuthService,
    private _modalService: ModalDialogService,
    private _vcRef: ViewContainerRef,
    private _uiService: UIService
  ) { }

  ngOnInit() {
  }

  signInPage() {
    // console.log("clicked");
    this._router.navigate(['/sign-in'], { clearHistory: true });
  }

  signUpAction() {
    this.formSubmited = true;
    // this._authService.signUp(); //send http and following code in subscribe()
    this._modalService.showModal(
      SignupPopupComponent,
      {
        fullscreen: false,
        viewContainerRef: this._uiService.getAppVCRef() ? this._uiService.getAppVCRef() : this._vcRef,
        context: { data: "value" }
      }
    ).then(
      res => {
        console.log(res);
        if (res == 'complete') {
          this.goToProfile();
        }
        else if (res == 'skip') {
          this.goToHome();
        }
        else if (res == undefined) {
          this.goToHome();
        }
      }
    );
    this.formSubmited = false;
  }

  goToHome() {
    setTimeout(() => {
      this._router.navigate(['/home'], { clearHistory: true });
    }, 400)
  }

  goToProfile() {
    setTimeout(() => {
      this._router.navigate(['/user/profile'], { clearHistory: true });
    }, 400)
  }

  openTermsandConditions() {
    let options = {
      title: "Terms and Conditions",
      message: "Kindly read all terms and conditions of click payed app.",
      okButtonText: "Accept"
    };

    alert(options);
  }
}
