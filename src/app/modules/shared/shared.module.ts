import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import {NativeScriptCommonModule} from 'nativescript-angular/common'
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ActionBarComponent } from './../../shared/ui/action-bar/action-bar.component';

@NgModule({
    declarations: [
        ActionBarComponent
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule
    ],
    exports: [
        ActionBarComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})

export class SharedModule {

}