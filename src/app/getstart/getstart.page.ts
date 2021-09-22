import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-getstart',
  templateUrl: './getstart.page.html',
  styleUrls: ['./getstart.page.scss'],
})
export class GetstartPage implements OnInit {

  constructor( private auth:AngularFireAuth,
    
               private router: Router, public cookie: CookieService) { }

  ngOnInit() {
  }
  onLogout(){
    this.cookie.deleteAll();
    this.auth.signOut().then(() => this.router.navigate(['login']));
    }
}
