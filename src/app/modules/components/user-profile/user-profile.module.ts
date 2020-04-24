import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { Routes } from '@angular/router';

import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

import { SharedModule } from "../../shared/shared.module";

import { ProfileComponent } from "@src/app/components/user/profile/profile.component";
import { AchievementsComponent } from "@src/app/components/user/achievements/achievements.component";
import { UserSecurityComponent } from "@src/app/components/user/user-security/user-security.component";


const routes: Routes = [
    {
        path: '',
        component: ProfileComponent
    },
    {
        path: 'user/achievements',
        component: AchievementsComponent
    },
    {
        path: 'user/security',
        component: UserSecurityComponent
    }
]

@NgModule({
    declarations: [
        ProfileComponent,
        AchievementsComponent,
        UserSecurityComponent
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule.forChild(routes),
        SharedModule,
        NativeScriptHttpClientModule,
        NativeScriptFormsModule
    ],
    exports: [
        NativeScriptRouterModule
    ],
    schemas: [NO_ERRORS_SCHEMA],
    entryComponents: []
})
export class UserProfileModule {

}