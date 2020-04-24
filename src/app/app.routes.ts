import { Routes } from '@angular/router';
import { TextComponentComponent } from './text/text-component/text-component.component';
import { NewNotificationComponent } from './shared/ui/new-notification/new-notification.component';
import { CompatibleGamesComponent } from './components/compatible-games/compatible-games.component';
import { AuthGuard } from './route-guards/auth/auth-guard.service';
import { UnAuthGuard } from './route-guards/auth/unauth-guard.service';
import { CompatibleGameInfoComponent } from './components/compatible-games/compatible-game-info/compatible-game-info.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin/deposit-pending-requests',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: './modules/components/home/home.module#HomeModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'sign-in',
    loadChildren: './modules/auth/auth.module#AuthModule',
    canLoad: [UnAuthGuard]
  },
  {
    path: 'buy-coins', 
    loadChildren: './modules/components/buy-coins/buy-coins.module#BuyCoinsModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'redeem-coins',
    loadChildren: './modules/components/redeem-coins/redeem-coins.module#RedeemCoinsModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'transfer-coins',
    loadChildren: './modules/components/transfer-coins/transfer-coins.module#TransferCoinsModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'totup-your-wallet',
    loadChildren: './modules/components/topup-wallet/topup-wallet.module#TotUpWalletModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'request-withdrawal',
    loadChildren: './modules/components/request-withdrawal/request-withdrawal.module#RequestWithdrawalModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'transaction-history',
    loadChildren: './modules/components/transaction-history/transaction-history.module#TransactionHistoryModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'user/profile',
    loadChildren: './modules/components/user-profile/user-profile.module#UserProfileModule',
    canLoad: [AuthGuard]
  },
  // Admin Panel Route
  {
    path: 'admin/dashboard',
    loadChildren: './modules/adminpanel/adminpanel.module#AdminPanelModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'notification',
    // path: 'notification/:id',
    component: NewNotificationComponent,
    canActivate: [AuthGuard]
  },


  // Text Component
  {
    path: 'textcom',
    component: TextComponentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'compatible-games',
    component: CompatibleGamesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'compatible-game-info/:gameId',
    component: CompatibleGameInfoComponent,
    canActivate: [AuthGuard]
  }
];
