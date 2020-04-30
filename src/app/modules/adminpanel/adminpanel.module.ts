import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';

import { DropDownModule } from 'nativescript-drop-down/angular';
import { TNSCheckBoxModule } from '@nstudio/nativescript-checkbox/angular';

import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from '@src/app/admin-panel/dashboard/dashboard.component';
import { MakeDepositComponent } from '@src/app/admin-panel/make-deposit/make-deposit.component';
import { MakeDepositPopupComponent } from '@src/app/admin-panel/make-deposit/make-deposit-popup/make-deposit-popup.component';
import { ProcessWithdrawalsComponent } from '@src/app/admin-panel/process-withdrawals/process-withdrawals.component';
import { ProcessWithdrawalsPopupComponent } from '@src/app/admin-panel/process-withdrawals/process-withdrawals-popup/process-withdrawals-popup.component';
import { SetNewRulesComponent } from '@src/app/admin-panel/set-new-rules/set-new-rules.component';
import { CreateNotificationComponent } from '@src/app/admin-panel/create-notification/create-notification.component';
import { UserListComponent } from '@src/app/admin-panel/user-list/user-list.component';
import { NoticeBoardComponent } from '@src/app/admin-panel/notice-board/notice-board.component';
import { NotificationContactsComponent } from '@src/app/admin-panel/create-notification/notification-contacts/notification-contacts.component';
import { SingleUserComponent } from '@src/app/admin-panel/user-list/single-user/single-user.component';
import { SetRulesPopupComponent } from '@src/app/admin-panel/set-new-rules/set-rules-popup/set-rules-popup.component';
import { DepositPendingRequestsComponent } from '@src/app/admin-panel/make-deposit/deposit-pending-requests/deposit-pending-requests.component';
import { DepositPendingRequestsPopupComponent } from '@src/app/admin-panel/make-deposit/deposit-pending-requests/deposit-pending-requests-popup/deposit-pending-requests-popup.component';
import { AdminGuard } from '@src/app/route-guards/admin/admin-guard.service';
import { DepositAccountsComponent } from '@src/app/admin-panel/deposit-accounts/deposit-accounts.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'admin/deposit-accounts',
        component: DepositAccountsComponent,
        canActivate: [AdminGuard]
    },
    {
        path: 'admin/make-deposit',
        component: MakeDepositComponent,
        canActivate: [AdminGuard]
    },
    {
        path: 'admin/deposit-pending-requests',
        component: DepositPendingRequestsComponent,
        canActivate: [AdminGuard]
    },
    {
        path: 'admin/process-withdrawals',
        component: ProcessWithdrawalsComponent,
        canActivate: [AdminGuard]
    },
    {
        path: 'admin/set-rules',
        component: SetNewRulesComponent,
        canActivate: [AdminGuard]
    },
    {
        path: 'admin/create-notification',
        component: CreateNotificationComponent,
        canActivate: [AdminGuard]
    },
    {
        path: 'admin/user-list',
        component: UserListComponent,
        canActivate: [AdminGuard]
    },
    {
        path: 'admin/user-list/:id',
        component: SingleUserComponent,
        canActivate: [AdminGuard]
    },
    {
        path: 'admin/notice-board',
        component: NoticeBoardComponent,
        canActivate: [AdminGuard]
    }
]

@NgModule({
    declarations: [
        DashboardComponent,
        MakeDepositComponent,
        MakeDepositPopupComponent,
        ProcessWithdrawalsComponent,
        ProcessWithdrawalsPopupComponent,
        SetNewRulesComponent,
        CreateNotificationComponent,
        UserListComponent,
        NoticeBoardComponent,
        NotificationContactsComponent,
        SingleUserComponent,
        SetRulesPopupComponent,
        DepositPendingRequestsComponent,
        DepositPendingRequestsPopupComponent,
        DepositAccountsComponent
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule.forChild(routes),
        SharedModule,
        NativeScriptFormsModule,
        TNSCheckBoxModule,
        DropDownModule
    ],
    exports: [
        NativeScriptRouterModule
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [
        MakeDepositPopupComponent,
        ProcessWithdrawalsPopupComponent,
        NotificationContactsComponent,
        SetRulesPopupComponent,
        DepositPendingRequestsPopupComponent
    ]
})
export class AdminPanelModule {

}