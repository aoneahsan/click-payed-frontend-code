import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { ModalDialogService } from 'nativescript-angular/common';

import { UIService } from '@src/app/shared/ui/ui.service';

import { SetRulesPopupComponent } from './set-rules-popup/set-rules-popup.component';

interface Editor {
  id,
  name,
  number,
  checked
};

@Component({
  selector: 'app-set-new-rules',
  templateUrl: './set-new-rules.component.html',
  styleUrls: ['./set-new-rules.component.scss']
})
export class SetNewRulesComponent implements OnInit {

  editors: Editor[] = null;

  searchPersonNumber: string = null;
  searchedPerson: Editor = null;

  constructor(private _modalService: ModalDialogService, private _uiService: UIService, private _viewRef: ViewContainerRef) { }

  get personNumberAdded() {
    if (this.searchPersonNumber) {
      if (this.searchPersonNumber.length >= 1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  get personFound() {
    return !!this.searchedPerson;
  }

  ngOnInit() {
    // send http to get editors from server
    setTimeout(() => {
      this.editors = [
        { id: 1, name: "Ahsan Mahmood", number: '03000000000', checked: false },
        { id: 2, name: "Ahsan Mahmood", number: '03000000000', checked: false },
        { id: 3, name: "Ahsan Mahmood", number: '03000000000', checked: false },
        { id: 4, name: "Ahsan Mahmood", number: '03000000000', checked: false }
      ];
    }, 1000);
  }

  editorSelected(editor: Editor) {
    console.log(editor);
  }

  searchForPerson() {
    if (this.searchPersonNumber.length >= 1) {
      setTimeout(() => {
        //http to get person
        this.searchedPerson = { id: 1, name: "Ahsan Mahmood", number: '03000000000', checked: false };
      }, 700);
    }
  }

  // makeEditor(searchedPerson){
  makeEditor() {
    this._modalService.showModal(
      SetRulesPopupComponent,
      {
        fullscreen: false,
        viewContainerRef: this._uiService.getAppVCRef() ? this._uiService.getAppVCRef() : this._viewRef,
        context: 'searchedPerson'
      }
    )
  }

}
