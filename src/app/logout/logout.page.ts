import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private auth:AngularFireAuth,
               private router: Router) { }

  ngOnInit() {
    this.onLogout();
  }
  onLogout(){
    this.auth.signOut().then(() => this.router.navigate(['login']));
    }
}
