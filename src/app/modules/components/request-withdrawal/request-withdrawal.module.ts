import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { Routes } from '@angular/router';

import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';

import { DropDownModule } from 'nativescript-drop-down/angular';

import { SharedModule } from "../../shared/shared.module";

import { RequestWithdrawalComponent } from '@src/app/components/request-withdrawal/request-withdrawal.component';

const routes: Routes = [
    {
        path: '',
        component: RequestWithdrawalComponent
    }
]

@NgModule({
    declarations: [
        RequestWithdrawalComponent
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule.forChild(routes),
        SharedModule,
        DropDownModule,
        NativeScriptFormsModule
    ],
    exports: [
        NativeScriptRouterModule
    ],
    schemas: [NO_ERRORS_SCHEMA],
    entryComponents: []
})
export class RequestWithdrawalModule {

}