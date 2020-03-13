import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

import { AuthService } from '@src/app/services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  formSubmited: boolean = false;

  constructor(private _router: RouterExtensions, private _authService: AuthService) { }

  ngOnInit() {
  }

  signInPage() {
    console.log("clicked");
    this._router.navigate(['/sign-in'], {clearHistory: true});
  }

  signUpAction() {
    this.formSubmited = true;
    this._authService.signUp();
  }



}
