import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
 
import { Router } from '@angular/router';


import firebase from 'firebase/app';
import 'firebase/auth';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  
  val: any;
  constructor( private auth:AngularFireAuth,
    private auths:AngularFireAuth,
               private router: Router, public cookie: CookieService) { }
               
  ngOnInit() {
  }
  
  onLogout(){
    if(confirm("Are you sure about Logging Out?")){
    this.cookie.deleteAll();
    this.auth.signOut().then(() => this.router.navigate(['login']));}
    }
  
}
