import { Component, OnInit } from '@angular/core';

import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  email: string;
  formSubmited: boolean = false;

  constructor(private _router: RouterExtensions) { }

  ngOnInit() {
    
  }

  submit() {

  }

  signInPage() {
    this.formSubmited = true;
    // console.log("clicked");
    this._router.navigate(['/sign-in'], {clearHistory: true});
  }

}
