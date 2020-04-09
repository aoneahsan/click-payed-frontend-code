import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@src/app/app-routing.module';

import { AppComponent } from '@src/app/app.component';
import { SetNewRulesComponent } from '@src/app/admin-panel/set-new-rules/set-new-rules.component';
import { CreateNotificationComponent } from '@src/app/admin-panel/create-notification/create-notification.component';
import { UserListComponent } from '@src/app/admin-panel/user-list/user-list.component';
import { NoticeBoardComponent } from '@src/app/admin-panel/notice-board/notice-board.component';
import { TextComponentComponent } from '@src/app/text/text-component/text-component.component';
import { NotificationContactsComponent } from '@src/app/admin-panel/create-notification/notification-contacts/notification-contacts.component';
import { NewNotificationComponent } from '@src/app/shared/ui/new-notification/new-notification.component';
import { SingleUserComponent } from '@src/app/admin-panel/user-list/single-user/single-user.component';
import { CompatibleGamesComponent } from '@src/app/components/compatible-games/compatible-games.component';
import { SetRulesPopupComponent } from '@src/app/admin-panel/set-new-rules/set-rules-popup/set-rules-popup.component';
import { TopupWalletPopupComponent } from '@src/app/components/topup-your-wallet/topup-wallet-popup/topup-wallet-popup.component';
import { DepositPendingRequestsComponent } from '@src/app/admin-panel/make-deposit/deposit-pending-requests/deposit-pending-requests.component';
import { DepositPendingRequestsPopupComponent } from '@src/app/admin-panel/make-deposit/deposit-pending-requests/deposit-pending-requests-popup/deposit-pending-requests-popup.component';
// Import Components or their modules

@NgModule({
  declarations: [
    AppComponent,
    SetNewRulesComponent,
    CreateNotificationComponent,
    UserListComponent,
    NoticeBoardComponent,
    TextComponentComponent,
    NotificationContactsComponent,
    NewNotificationComponent,
    SingleUserComponent,
    CompatibleGamesComponent,
    SetRulesPopupComponent,
    TopupWalletPopupComponent,
    DepositPendingRequestsComponent,
    DepositPendingRequestsPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
