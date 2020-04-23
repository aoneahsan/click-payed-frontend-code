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

  user_name: string = null;
  user_number: string = null;
  user_email: string = null;
  user_password: string = null;
  user_password_confirm: string = null;

  errorOccured: boolean = false;
  errorMessage: string = null;

  constructor(
    private _router: RouterExtensions,
    private _authService: AuthService,
    private _modalService: ModalDialogService,
    private _vcRef: ViewContainerRef,
    private _uiService: UIService
  ) { }

  get dataEntered() {
    if (this.user_name && this.user_number && this.user_email && this.user_password) {
      if ((this.user_number.length > 10) && (this.user_password.length >= 6)) {
        if (this.user_password == this.user_password_confirm) {
          return true;
        }
      }
    }
    return false;
  }

  ngOnInit() {
  }

  signInPage() {
    // console.log("clicked");
    this._router.navigate(['/sign-in'], { clearHistory: true });
  }

  signUpAction() {
    this.formSubmited = true;
    let data = {
      name: this.user_name,
      email: this.user_email,
      password: this.user_password,
      phone_number: this.user_number
    };
    this._authService.signUp(data).subscribe(
      res => {
        // this._modalService.showModal(
        //   SignupPopupComponent,
        //   {
        //     fullscreen: false,
        //     viewContainerRef: this._uiService.getAppVCRef() ? this._uiService.getAppVCRef() : this._vcRef,
        //     context: { data: "value" }
        //   }
        // ).then(
        //   res => {
        //     console.log(res);
        //     if (res == 'complete') {
        //       this.goToProfile();
        //     }
        //     else if (res == 'skip') {
              this.goToHome();
        //     }
        //     else if (res == undefined) {
        //       this.goToHome();
        //     }
        //   }
        // );
      },
      err => {
        // console.log(err);
        const _title = err.error.message;
        let _message = '';
        if (err.error.errors.phone_number && err.error.errors.email) {
          _message = 'Email and Phone Number Already Exists!';
        } else if (err.error.errors.phone_number){
          _message = 'Phone Number Already Exists!';
        } else if (err.error.errors.email){
          _message = 'Email Already Exists!';
        }
        alert({title: _title, message: _message, okButtonText: "Okay!!!"});
        this.errorOccured = true;
        this.errorMessage = err.error.message;
        this.formreset();
      }
    )
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

  formreset() {
    this.user_password = null;
    this.user_password_confirm = null;
    this.formSubmited = false;
  }
}
