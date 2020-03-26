import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { Routes } from '@angular/router';

import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { SharedModule } from "../../shared/shared.module";

import { BuyCoinsComponent } from '@src/app/components/buy-coins/buy-coins.component';
import { NativeScriptFormsModule } from "nativescript-angular/forms";

const routes: Routes = [
    {
        path: '',
        component: BuyCoinsComponent
    }
];

@NgModule({
    declarations: [
        BuyCoinsComponent
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
export class BuyCoinsModule {

}