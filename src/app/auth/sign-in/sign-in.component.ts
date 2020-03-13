import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

import { AuthService } from '@src/app/services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  formSubmited: boolean = false;

  constructor(private _router: RouterExtensions, private _authService: AuthService) { }

  ngOnInit() {
  }

  signUpPage() {
    // console.log("clicked");
    this._router.navigate(['/sign-up'], {clearHistory: true});
  }

  forgotPasswordPage() {
    console.log("forgotPasswordPage: clicked");
    this._router.navigate(['/forgot-password'], {clearHistory: true});
  }

  signInAction() {
    this.formSubmited = true;
    this._authService.signIn();
  }

}
