import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { Routes } from '@angular/router';

import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { SharedModule } from "../../shared/shared.module";

import { TopupYourWalletComponent } from '@src/app/components/topup-your-wallet/topup-your-wallet.component';

const routes: Routes = [
    {
        path: 'topup-your-wallet',
        component: TopupYourWalletComponent
    }
]

@NgModule({
    declarations: [
        TopupYourWalletComponent
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule.forChild(routes),
        SharedModule
    ],
    exports: [
        NativeScriptRouterModule
    ],
    schemas: [NO_ERRORS_SCHEMA],
    entryComponents: []
})
export class TotUpWalletModule {

}