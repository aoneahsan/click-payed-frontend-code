import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { Routes } from '@angular/router';

import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { TransferCoinsComponent } from '@src/app/components/transfer-coins/transfer-coins.component';
import { TransferCoinsPopupComponent } from '@src/app/components/transfer-coins/transfer-coins-popup/transfer-coins-popup.component';
import { CoinsTransferedPopupComponent } from '@src/app/components/transfer-coins/coins-transfered-popup/coins-transfered-popup.component';
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { SharedModule } from "../../shared/shared.module";

const routes: Routes = [
    {
        path: '',
        component: TransferCoinsComponent
    }
]

@NgModule({
    declarations: [
        TransferCoinsComponent,
        TransferCoinsPopupComponent,
        CoinsTransferedPopupComponent
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
    entryComponents: [TransferCoinsPopupComponent, CoinsTransferedPopupComponent]
})
export class TransferCoinsModule {

}