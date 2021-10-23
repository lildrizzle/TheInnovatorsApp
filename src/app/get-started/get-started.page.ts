import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.page.html',
  styleUrls: ['./get-started.page.scss'],
})
export class GetStartedPage implements OnInit {
  
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
