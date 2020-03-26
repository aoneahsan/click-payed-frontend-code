import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { Routes } from '@angular/router';

import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { SharedModule } from "../../shared/shared.module";

import { RedeemCoinsComponent } from '@src/app/components/redeem-coins/redeem-coins.component';
import { NativeScriptFormsModule } from "nativescript-angular/forms";

const routes: Routes = [
    {
        path: '',
        component: RedeemCoinsComponent
    }
]

@NgModule({
    declarations: [
        RedeemCoinsComponent
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule.forChild(routes),
        NativeScriptFormsModule,
        SharedModule
    ],
    exports: [
        NativeScriptRouterModule
    ],
    schemas: [NO_ERRORS_SCHEMA],
    entryComponents: []
})
export class RedeemCoinsModule {

}