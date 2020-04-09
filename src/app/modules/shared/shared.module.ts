import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import {NativeScriptCommonModule} from 'nativescript-angular/common'
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ActionBarComponent } from './../../shared/ui/action-bar/action-bar.component';
import { FooterComponent } from "@src/app/components/footer/footer.component";
import { NewNotificationComponent } from "@src/app/shared/ui/new-notification/new-notification.component";
import { CompatibleGamesComponent } from "@src/app/components/compatible-games/compatible-games.component";

@NgModule({
    declarations: [
        ActionBarComponent,
        FooterComponent,
        NewNotificationComponent,
        CompatibleGamesComponent
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule
    ],
    exports: [
        ActionBarComponent,
        FooterComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})

export class SharedModule {

}