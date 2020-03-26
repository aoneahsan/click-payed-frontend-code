import { MakeDepositPopupComponent } from './../../admin-panel/make-deposit/make-deposit-popup/make-deposit-popup.component';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from '@src/app/admin-panel/dashboard/dashboard.component';
import { MakeDepositComponent } from '@src/app/admin-panel/make-deposit/make-deposit.component';
import { MakeDepositPopupComponent } from '@src/app/admin-panel/make-deposit/make-deposit-popup/make-deposit-popup.component';
import { ProcessWithdrawalsComponent } from '@src/app/admin-panel/process-withdrawals/process-withdrawals.component';
import { ProcessWithdrawalsPopupComponent } from '@src/app/admin-panel/process-withdrawals/process-withdrawals-popup/process-withdrawals-popup.component';
import { ProcessWithdrawalsConfirmPopupComponent } from '@src/app/admin-panel/process-withdrawals/process-withdrawals-confirm-popup/process-withdrawals-confirm-popup.component';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';


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
        path: 'admin/process-withdrawals',
        component: ProcessWithdrawalsComponent
    }
]

@NgModule({
    declarations: [
        DashboardComponent,
        MakeDepositComponent,
        MakeDepositPopupComponent,
        ProcessWithdrawalsComponent,
        ProcessWithdrawalsPopupComponent,
        ProcessWithdrawalsConfirmPopupComponent
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule.forChild(routes),
        SharedModule,
        NativeScriptFormsModule
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
        ProcessWithdrawalsConfirmPopupComponent
    ]
})
export class AdminPanelModule {

}