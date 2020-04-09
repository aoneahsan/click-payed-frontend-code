import { Component, OnInit } from '@angular/core';

import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { AdminPanelService } from '@src/app/services/adminpanel/adminpanel.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: { id, name, phone_no, status }[] = [];

  constructor(
    private _router: RouterExtensions,
    private _route: ActivatedRoute,
    private _adminpanelService: AdminPanelService
  ) { }

  ngOnInit() {
    this.users = this._adminpanelService.getListUsers();
  }

  showPerson(id) {
    console.log(id, 'this._route', this._route);
    this._router.navigate([`/admin/user-list/${id}`]);
  }

}
