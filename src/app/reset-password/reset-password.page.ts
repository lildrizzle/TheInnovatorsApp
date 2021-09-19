import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
email:string;
  constructor(private auth: ApiService, private router: Router) { }

  ngOnInit() {
  }
resetPassword(email){
  return this.auth.resetPassword(this.email)
  .then(() => this.router.navigate(['/login']))

}
}
