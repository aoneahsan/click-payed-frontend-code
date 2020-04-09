import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/common';

@Component({
  selector: 'app-set-rules-popup',
  templateUrl: './set-rules-popup.component.html',
  styleUrls: ['./set-rules-popup.component.scss']
})
export class SetRulesPopupComponent implements OnInit {

  editorMakingProcessCompleted: boolean = false;
  loading: boolean = false;

  constructor(private _modalParams: ModalDialogParams) { }

  ngOnInit() {
  }

  makeEditor() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.editorMakingProcessCompleted = true;
    }, 700);
  }

  onHandle(action: "okay") {
    if (action == 'okay') {
      //send http to approve the withdrawal request
      // get response from http request and get date and time of approved request and store in request_approved_date_time (variable to show in screen)
      this._modalParams.closeCallback('okay');
    }
    else {
      this._modalParams.closeCallback('okay');
    }
  }

}
