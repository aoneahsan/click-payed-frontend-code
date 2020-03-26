import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { TransactionHistoryComponent } from '@src/app/components/transaction-history/transaction-history.component';
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { SharedModule } from '../../shared/shared.module';


const routes: Routes = [
    {
        path: '',
        component: TransactionHistoryComponent
    }
];

@NgModule({
    declarations: [
        TransactionHistoryComponent
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule.forChild(routes),
        SharedModule
    ],
    exports: [
        NativeScriptRouterModule
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TransactionHistoryModule {

}