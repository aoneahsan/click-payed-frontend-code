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
    makeDepositeRequest(data) {
        return this._http.post<any>(
            this._systemService._apiRootURL + 'make_deposit_request',
            data
        );
    }

    getAllDepositAccount() {
        const data = "Get Account";
        return this._http.post<any>(
            this._systemService._apiRootURL + 'get_all_deposit_accounts',
            data
        );
    }

    addNewDepositAccount(data) {
        return this._http.post<any>(
            this._systemService._apiRootURL + 'add_new_deposit_account',
            data
        );
    }

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

    approveDepositRequest(data) {
        return this._http.post<any>(
            this._systemService._apiRootURL + 'approve_deposit_request',
            data
        );
    }

    rejectDepositRequest(data) {
        return this._http.post<any>(
            this._systemService._apiRootURL + 'reject_deposit_request',
            data
        );
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
        return true;
    }
    // ******************************************************************************
    // User List Component Http Requests Ends
    // ******************************************************************************
    // ********************************************************************************************************

}