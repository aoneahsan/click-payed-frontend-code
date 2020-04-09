import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/common';

@Component({
  selector: 'app-notification-contacts',
  templateUrl: './notification-contacts.component.html',
  styleUrls: ['./notification-contacts.component.scss']
})
export class NotificationContactsComponent implements OnInit {

  modalType: boolean = false; //success Message Modal    ||   Contacts Select Modal
  // modalType = false  ->   mean  ->   Contacts Select Modal
  users: {id: number, name: string, email: string, selected: boolean}[] = [];
  selectAllUsers: boolean = false;

  constructor(private _modalPramas: ModalDialogParams) { }

  ngOnInit() {
    this.modalType = (this._modalPramas.context as {users: {id: number, name: string, email: string, selected: boolean}[], modalType: boolean}).modalType;
   this.users = (this._modalPramas.context as {users: {id: number, name: string, email: string, selected: boolean}[], modalType: boolean}).users
  //  console.log(this.users);
  }

  selectUsers(status) {
    if (!status) {
      this.users.forEach(user => user.selected = true);
    } else {
      this.users.forEach(user => user.selected = false);
    }
  }

  closeModal(returnType: 'users' | 'okay') {
    if (returnType == 'users') {
      this._modalPramas.closeCallback(this.users);
    } else if (returnType == 'okay') {
      this._modalPramas.closeCallback('okay');
    }
  }

}
