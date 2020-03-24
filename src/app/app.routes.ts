import { Routes } from '@angular/router';

import { SignInComponent } from '@src/app/auth/sign-in/sign-in.component';
import { SignUpComponent } from '@src/app/auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { BuyCoinsComponent } from './components/buy-coins/buy-coins.component';
import { RedeemCoinsComponent } from './components/redeem-coins/redeem-coins.component';
import { TransferCoinsComponent } from './components/transfer-coins/transfer-coins.component';
import { TopupYourWalletComponent } from './components/topup-your-wallet/topup-your-wallet.component';
import { RequestWithdrawalComponent } from './components/request-withdrawal/request-withdrawal.component';
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { AchievementsComponent } from './components/user/achievements/achievements.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/topup-your-wallet',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'buy-coins',
    component: BuyCoinsComponent
  },
  {
    path: 'redeem-coins',
    component: RedeemCoinsComponent
  },
  {
    path: 'transfer-coins',
    component: TransferCoinsComponent
  },
  {
    path: 'topup-your-wallet',
    component: TopupYourWalletComponent
  },
  {
    path: 'request-withdrawal',
    component: RequestWithdrawalComponent
  },
  {
    path: 'transaction-history',
    component: TransactionHistoryComponent
  },
  {
    path: 'user/profile',
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
];
