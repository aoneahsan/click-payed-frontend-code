import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Main Routing Module
import { AppRoutingModule } from '@src/app/app-routing.module';

// Modules
import { SharedModule } from '@src/app/modules/shared/shared.module';

// Plugins
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';

// Components
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/components/home/home.component';
import { SignInComponent } from '@src/app/auth/sign-in/sign-in.component';
import { SignUpComponent } from '@src/app/auth/sign-up/sign-up.component';
import { SignupPopupComponent } from '@src/app/auth/signup-popup/signup-popup.component';
import { ForgotPasswordComponent } from '@src/app/auth/forgot-password/forgot-password.component';
import { FooterComponent } from '@src/app/components/footer/footer.component';
import { BuyCoinsComponent } from '@src/app/components/buy-coins/buy-coins.component';
import { RedeemCoinsComponent } from '@src/app/components/redeem-coins/redeem-coins.component';
import { TransferCoinsComponent } from '@src/app/components/transfer-coins/transfer-coins.component';
import { TopupYourWalletComponent } from '@src/app/components/topup-your-wallet/topup-your-wallet.component';
import { RequestWithdrawalComponent } from '@src/app/components/request-withdrawal/request-withdrawal.component';
import { TransactionHistoryComponent } from '@src/app/components/transaction-history/transaction-history.component';
import { ProfileComponent } from '@src/app/components/user/profile/profile.component';
import { AchievementsComponent } from '@src/app/components/user/achievements/achievements.component';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    FooterComponent,
    BuyCoinsComponent,
    RedeemCoinsComponent,
    TransferCoinsComponent,
    TopupYourWalletComponent,
    RequestWithdrawalComponent,
    TransactionHistoryComponent,
    ProfileComponent,
    SignupPopupComponent,
    AchievementsComponent
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    SharedModule,
    NativeScriptFormsModule,
    NativeScriptUISideDrawerModule,
    TNSCheckBoxModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
  entryComponents: [SignupPopupComponent]
})
export class AppModule { }
