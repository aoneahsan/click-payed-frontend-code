import { UserListModel } from './../../models/admin/users-list-model';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { AdminPanelService } from '@src/app/services/adminpanel/adminpanel.service';
import { Subscription } from 'rxjs';
import { SystemService } from '@src/app/services/system.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  loadinPageData_s: boolean = true;
  loadinPageDataSub: Subscription;

  users: any = [];

  constructor(
    private _router: RouterExtensions,
    private _route: ActivatedRoute,
    private _adminpanelService: AdminPanelService,
    private _systemService: SystemService
  ) { }

  ngOnInit() {
    this.loadinPageDataSub = this._systemService.getLoadinPageDataStatus().subscribe(
      status => {
        this.loadinPageData_s = status;
      }
    );
    this.users = this._adminpanelService.getListUsers();
  }

  showPerson(id) {
    console.log(id, 'this._route', this._route);
    this._router.navigate([`/admin/user-list/${id}`]);
  }

  ngOnDestroy() {
    if (this.loadinPageDataSub) {
      this.loadinPageDataSub.unsubscribe();
    }
  }

}
