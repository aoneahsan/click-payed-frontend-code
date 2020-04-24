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

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'admin/make-deposit',
        component: MakeDepositComponent
    },
    {
        path: 'admin/deposit-pending-requests',
        component: DepositPendingRequestsComponent
    },
    {
        path: 'admin/process-withdrawals',
        component: ProcessWithdrawalsComponent
    },
    {
        path: 'admin/set-rules',
        component: SetNewRulesComponent
    },
    {
        path: 'admin/create-notification',
        component: CreateNotificationComponent
    },
    {
        path: 'admin/user-list',
        component: UserListComponent,
    },
    {
        path: 'admin/user-list/:id',
        component: SingleUserComponent,
    },
    {
        path: 'admin/notice-board',
        component: NoticeBoardComponent
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
        DepositPendingRequestsPopupComponent
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