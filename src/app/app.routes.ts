import { Routes } from '@angular/router';

import { SignInComponent } from '@src/app/auth/sign-in/sign-in.component';
import { SignUpComponent } from '@src/app/auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
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
    path: 'user/profile',
    component: ForgotPasswordComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  }
];
