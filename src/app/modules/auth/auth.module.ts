import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { Routes } from '@angular/router';

import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { SharedModule } from "../shared/shared.module";

import { SignInComponent } from '@src/app/auth/sign-in/sign-in.component';
import { SignUpComponent } from '@src/app/auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from '@src/app/auth/forgot-password/forgot-password.component';
import { SignupPopupComponent } from "@src/app/auth/signup-popup/signup-popup.component";

const routes: Routes = [
    {
        path: '',
        component: SignInComponent
    },
    {
        path: 'sign-up',
        component: SignUpComponent
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    }
]

@NgModule({
    declarations: [
        SignInComponent,
        SignUpComponent,
        ForgotPasswordComponent,
        SignupPopupComponent
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
    entryComponents: [SignupPopupComponent]
})
export class AuthModule {

}