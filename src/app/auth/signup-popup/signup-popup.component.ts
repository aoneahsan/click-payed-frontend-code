import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/common';

@Component({
  selector: 'app-signup-popup',
  templateUrl: './signup-popup.component.html',
  styleUrls: ['./signup-popup.component.scss']
})
export class SignupPopupComponent implements OnInit {

  constructor(private _modalParams: ModalDialogParams) { }

  ngOnInit() {
  }

  onHandle(action: "complete" | 'skip') {
    if (action == 'complete') {
      this._modalParams.closeCallback('complete');
    }
    else if (action == 'skip') {
      this._modalParams.closeCallback('skip');
    }
  }

}
