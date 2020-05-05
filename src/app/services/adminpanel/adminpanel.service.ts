import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';

import { SystemService } from "../system.service";

import { WithDrawalRequestsInterface } from './../../interface/admin/withdrawal-requests-interface';
import { DepositAccount } from "@src/app/interface/admin/deposit-accounts-interface";

import { DepositRequestModel } from './../../models/admin/deposit-request-model';
import { UserListModel } from './../../models/admin/users-list-model';

@Injectable({
    providedIn: 'root'
})

export class AdminPanelService {

    // Deposit Component
    _depositeAccounts = new BehaviorSubject<DepositAccount[]>(null);
    _depositRequests = new BehaviorSubject<DepositRequestModel[]>(null);

    // Withdrawal Component
    _withdrawalRequests = new BehaviorSubject<WithDrawalRequestsInterface[]>(null);

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

    fetchAllDepositAccount() {
        const data = "Get Account";
        return this._http.post<any>(
            this._systemService._apiRootURL + 'get_all_deposit_accounts',
            data
        );
    }

    getDepositAccounts() {
        return this._depositRequests;
    }

    setDepositAccounts(data: DepositAccount[]) {
        this._depositeAccounts.next(data);
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
    // ******************************************************************************
    // Withdrawal Requests Component Http Requests Starts
    // ******************************************************************************
    fetchWithdrawalRequests() {
        const data = "withdrawal requests";
        return this._http.post<any>(
            this._systemService._apiRootURL + 'get_all_withdrawal_requests',
            data
        );
    }

    getWithdrawalRequests() {
        return this._withdrawalRequests;
    }

    setWithdrawalRequests(requests: WithDrawalRequestsInterface[]) {
        this._withdrawalRequests.next(requests);
    }

    approveWithdrawalRequest(data) {
        return this._http.post<any>(
            this._systemService._apiRootURL + 'approve_withdrawal_request',
            data
        );
    }

    rejectWithdrawalRequest(data) {
        return this._http.post<any>(
            this._systemService._apiRootURL + 'reject_withdrawal_request',
            data
        );
    }
    // ******************************************************************************
    // Withdrawal Requests Component Http Requests Ends
    // ******************************************************************************
    // ********************************************************************************************************
    // ******************************************************************************
    // Manage User Coins Component Http Requests Starts
    // ******************************************************************************
    makeAddRemoveUserCoinsRequest(data) {
        return this._http.post<any>(
            this._systemService._apiRootURL + 'make_add_remove_user_coins_request',
            data
        );
    }
    // ******************************************************************************
    // Manage User Coins Component Http Requests Ends
    // ******************************************************************************
    // ********************************************************************************************************


}