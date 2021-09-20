import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChildGuard implements CanActivateChild {
  val = this.cookie.get("valid");

  constructor(private cookie: CookieService){}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.val != "Client")
      {
        return false;
      }
      else{
        alert("Sorry, This page is for the App Developers!")
        return true;
      }  }
  
}
