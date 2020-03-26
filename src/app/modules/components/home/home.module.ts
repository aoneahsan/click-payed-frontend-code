import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { Routes } from '@angular/router';

import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { HomeComponent } from "@src/app/components/home/home.component";
import { SharedModule } from "../../shared/shared.module";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    }
];

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule.forChild(routes),
        SharedModule
    ],
    exports: [
        NativeScriptRouterModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule {

}