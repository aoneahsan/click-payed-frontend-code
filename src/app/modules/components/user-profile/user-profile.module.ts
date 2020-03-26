import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { Routes } from '@angular/router';

import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { ProfileComponent } from "@src/app/components/user/profile/profile.component";
import { AchievementsComponent } from "@src/app/components/user/achievements/achievements.component";
import { UserEditComponent } from "@src/app/components/user/user-edit/user-edit.component";
import { SharedModule } from "../../shared/shared.module";


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
        path: 'user/edit',
        component: UserEditComponent
    }
]

@NgModule({
    declarations: [
        ProfileComponent,
        AchievementsComponent,
        UserEditComponent
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
export class UserProfileModule {

}