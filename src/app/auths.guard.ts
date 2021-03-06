import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/auth';

import { Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthsGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user: firebase.User) => {
        if(user){
          resolve(true);
        }else
        {
          console.log('User is not logged in');
          this.router.navigate(['/login']);
          resolve(false);
        }
      })
    });
  }
  
}