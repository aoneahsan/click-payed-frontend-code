import { Routes } from '@angular/router';
import { TextComponentComponent } from './text/text-component/text-component.component';
import { NewNotificationComponent } from './shared/ui/new-notification/new-notification.component';
import { CompatibleGamesComponent } from './components/compatible-games/compatible-games.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/sign-in',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: './modules/components/home/home.module#HomeModule'
  },
  {
    path: 'sign-in',
    loadChildren: './modules/auth/auth.module#AuthModule'
  },
  {
    path: 'buy-coins', 
    loadChildren: './modules/components/buy-coins/buy-coins.module#BuyCoinsModule'
  },
  {
    path: 'redeem-coins',
    loadChildren: './modules/components/redeem-coins/redeem-coins.module#RedeemCoinsModule'
  },
  {
    path: 'transfer-coins',
    loadChildren: './modules/components/transfer-coins/transfer-coins.module#TransferCoinsModule'
  },
  {
    path: 'totup-your-wallet',
    loadChildren: './modules/components/topup-wallet/topup-wallet.module#TotUpWalletModule'
  },
  {
    path: 'request-withdrawal',
    loadChildren: './modules/components/request-withdrawal/request-withdrawal.module#RequestWithdrawalModule'
  },
  {
    path: 'transaction-history',
    loadChildren: './modules/components/transaction-history/transaction-history.module#TransactionHistoryModule'
  },
  {
    path: 'user/profile',
    loadChildren: './modules/components/user-profile/user-profile.module#UserProfileModule'
  },
  // Admin Panel Route
  {
    path: 'admin/dashboard',
    loadChildren: './modules/adminpanel/adminpanel.module#AdminPanelModule'
  },
  {
    path: 'notification',
    // path: 'notification/:id',
    component: NewNotificationComponent
  },


  // Text Component
  {
    path: 'textcom',
    component: TextComponentComponent
  },
  {
    path: 'compatible-games',
    component: CompatibleGamesComponent
  }
];
