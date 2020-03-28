import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

// Main Build-in Modules
import { AppRoutingModule } from '@src/app/app-routing.module';

// Custom Modules
import { SharedModule } from '@src/app/modules/shared/shared.module';

// Plugins
// import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
// import { TNSCheckBoxModule } from '@nstudio/nativescript-checkbox/angular';

// Components Modules
import { AuthModule } from './modules/auth/auth.module';
import { AdminPanelModule } from './modules/adminpanel/adminpanel.module';
import { UserProfileModule } from './modules/components/user-profile/user-profile.module';
import { BuyCoinsModule } from './modules/components/buy-coins/buy-coins.module';
import { RedeemCoinsModule } from './modules/components/redeem-coins/redeem-coins.module';
import { RequestWithdrawalModule } from './modules/components/request-withdrawal/request-withdrawal.module';
import { TotUpWalletModule } from './modules/components/topup-wallet/topup-wallet.module';
import { TransactionHistoryModule } from './modules/components/transaction-history/transaction-history.module';
import { TransferCoinsModule } from './modules/components/transfer-coins/transfer-coins.module';
import { HomeModule } from './modules/components/home/home.module';

// Compoenents
import { AppComponent } from '@src/app/app.component';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // NativeScriptUISideDrawerModule,
    // TNSCheckBoxModule,
    NativeScriptModule,
    AppRoutingModule,
    SharedModule,

    AuthModule,
    AdminPanelModule,
    HomeModule,
    BuyCoinsModule,
    RedeemCoinsModule,
    RequestWithdrawalModule,
    TotUpWalletModule,
    TransactionHistoryModule,
    TransferCoinsModule,
    UserProfileModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
  entryComponents: []
})
export class AppModule { }
