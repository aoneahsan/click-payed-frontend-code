import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

import { AuthService } from '@src/app/services/auth/auth.service';

import { hasKey } from 'tns-core-modules/application-settings';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  formSubmited: boolean = false;
  usePinLogin: boolean = false;
  user_number: string = null;
  user_password: string = null;

  loginPin: string;

  errorOccured: boolean = false;
  errorMessage: string = null;

  constructor(private _router: RouterExtensions, private _authService: AuthService) { }

  get userDataEntered() {
    if (!!this.user_number && !!this.user_password) {
      return true;
    }
    else {
      return false;
    }
  }

  ngOnInit() {
    // if (hasKey('pinLoginEnabled')) {
    //   // alert("pinLoginEnabled");
    //   this.usePinLogin = true;
    // }
    // else{
    //   // alert("pinLoginEnabled not");
    // }
  }

  signUpPage() {
    // console.log("clicked");
    this._router.navigate(['/sign-up'], { clearHistory: true });
  }

  forgotPasswordPage() {
    console.log("forgotPasswordPage: clicked");
    this._router.navigate(['/forgot-password'], { clearHistory: true });
  }

  signInAction() {
    this.formSubmited = true;
    let data = {
      email: this.user_number,
      password: this.user_password
    };
    this._authService.signIn(data).subscribe(
      res => {
        console.log('SignIn Component Response', res);
        this._router.navigate(['/home'], {clearHistory: true});
        this.formReset();
      },
      err => {
        // console.log('SignIn Component Error', err);
        this.errorMessage = err.error.message;
        this.errorOccured = true;
        this.formReset();
      }
    );
  }

  verifyPinLogin() {
    if (this.loginPin.length >= 5) {
      // alert("Ok!");
      if (this.loginPin == '00000') {
        this._router.navigate(['/home'], {clearHistory: true});
      }
    }
    else {
      // alert("still low");
    }
  }

  get loginPinLength() {
    if (this.loginPin) {
      if (this.loginPin.length >= 5) {
        return true;
      }
      else {
        return false;
      }
    }
    else{
      return false;
    }
  }  

  formReset() {
    this.user_number = null;
    this.user_password = null;
    this.formSubmited = false;
  }

}
