import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@src/app/app-routing.module';

import { HomeComponent } from '@src/app/components/home/home.component';
import { AppComponent } from '@src/app/app.component';
import { SignInComponent } from '@src/app/auth/sign-in/sign-in.component';
import { SignUpComponent } from '@src/app/auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from '@src/app/auth/forgot-password/forgot-password.component';
import { FooterComponent } from '@src/app/components/footer/footer.component';
import { BuyCoinsComponent } from '@src/app/components/buy-coins/buy-coins.component';
import { RedeemCoinsComponent } from '@src/app/components/redeem-coins/redeem-coins.component';
import { TransferCoinsComponent } from '@src/app/components/transfer-coins/transfer-coins.component';
import { TopupYourWalletComponent } from '@src/app/components/topup-your-wallet/topup-your-wallet.component';
import { RequestWithdrawalComponent } from '@src/app/components/request-withdrawal/request-withdrawal.component';
import { TransactionHistoryComponent } from '@src/app/components/transaction-history/transaction-history.component';
import { ProfileComponent } from '@src/app/components/user/profile/profile.component';


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
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
