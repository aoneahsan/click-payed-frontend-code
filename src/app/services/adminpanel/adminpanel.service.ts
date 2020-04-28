import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';

import { SystemService } from "../system.service";

import { DepositRequestModel } from './../../models/admin/deposit-request-model';
import { UserListModel } from './../../models/admin/users-list-model';

@Injectable({
    providedIn: 'root'
})

export class AdminPanelService {

    _depositRequests = new BehaviorSubject<DepositRequestModel[]>(null);

    _listUsers = new BehaviorSubject<UserListModel[]>(null);
    constructor(
        private _http: HttpClient,
        private _systemService: SystemService
    ) { }

    // ********************************************************************************************************
    // ******************************************************************************
    // Make Deposite Component Http Requests Starts
    // ******************************************************************************
    fetchAllDepositRequests() {
        const data = "Get Deposite Requests";
        return this._http.post<any>(
            this._systemService._apiRootURL + 'get_deposit_requests',
            data
        )
    }

    getDepositRequests() {
        return this._depositRequests;
    }

    setDepositRequests(data: DepositRequestModel[]) {
        this._depositRequests.next(data);
    }
    // ******************************************************************************
    // Make Deposite Component Http Requests Ends
    // ******************************************************************************
    // ********************************************************************************************************
    // ******************************************************************************
    // User List Component Http Requests Starts
    // ******************************************************************************
    getListUsers() {
        // send http to get users
        return this._listUsers;
    }

    getUserData(id) {
        return this._listUsers.find(user => user.id == id);
    }
    // ******************************************************************************
    // User List Component Http Requests Ends
    // ******************************************************************************
    // ********************************************************************************************************

}