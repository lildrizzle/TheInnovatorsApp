import { NgModule } from '@angular/core';

import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo} from "@angular/fire/auth-guard";
import { AuthGuard } from './auth.guard';
import { PermitGuard } from './permit.guard';
import { ChildGuard } from './child.guard';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),canActivate: [AngularFireAuthGuard , AuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}              
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
 
  {
    path: 'noticeboard',
    loadChildren: () => import('./noticeboard/noticeboard.module').then( m => m.NoticeboardPageModule),canActivate: [AngularFireAuthGuard,PermitGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),canActivate: [AngularFireAuthGuard, PermitGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  
  
  {
    path: 'display',
    loadChildren: () => import('./display/display.module').then( m => m.DisplayPageModule),canActivate: [AngularFireAuthGuard, AuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule),canActivate: [AngularFireAuthGuard, AuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule),canActivate: [AngularFireAuthGuard, AuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: 'responses',
    loadChildren: () => import('./responses/responses.module').then( m => m.ResponsesPageModule),canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: 'chats',
    loadChildren: () => import('./chats/chats.module').then( m => m.ChatsPageModule),canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'how-it-works',
    loadChildren: () => import('./how-it-works/how-it-works.module').then( m => m.HowItWorksPageModule)
  },
  
  {
    path: 'get-started',
    loadChildren: () => import('./get-started/get-started.module').then( m => m.GetStartedPageModule),canActivate: [AngularFireAuthGuard, PermitGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
