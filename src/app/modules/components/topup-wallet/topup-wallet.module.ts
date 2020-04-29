import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { Routes } from '@angular/router';

import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { SharedModule } from "../../shared/shared.module";

import { TopupYourWalletComponent } from '@src/app/components/topup-your-wallet/topup-your-wallet.component';
import { TopupWalletPopupComponent } from "@src/app/components/topup-your-wallet/topup-wallet-popup/topup-wallet-popup.component";

const routes: Routes = [
    {
        path: '',
        component: TopupYourWalletComponent
    }
]

@NgModule({
    declarations: [
        TopupYourWalletComponent,
        TopupWalletPopupComponent
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
    schemas: [NO_ERRORS_SCHEMA],
    entryComponents: [TopupWalletPopupComponent]
})
export class TotUpWalletModule {

}