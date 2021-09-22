import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api.service';
import { NavigationExtras, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-responses',
  templateUrl: './responses.page.html',
  styleUrls: ['./responses.page.scss'],
})
export class ResponsesPage implements OnInit {
storeUsers:any;
  nums: any;
  name: any= this.cookie.get("valid");
  constructor(private _apiService: ApiService,private cookie: CookieService,private router: Router, private auths: AngularFireAuth) { }

  ngOnInit() {
    this.responses();
  }
  onLogout(){
    this.cookie.deleteAll();
    this.auths.signOut().then(() => this.router.navigate(['login']));
    }
    checkUser(){
      if(this.name === "Client")
      {
        this.router.navigate(['get-started']);
      }
      else{
        this.router.navigate(['home']);
      }
    }
  responses()
  {
    let data = {
      
      email: this.cookie.get("sessionEmail"),
    }
    this._apiService.responseView(data).subscribe((res:any) => {
     console.log("responses display SUCCESS ===", res);
   this.storeUsers = res;
   console.log("storeUsers", this.storeUsers);
   alert('responses display SUCCESS');
   
   },(error: any) => {
   
   console.log("ERROR ===", error);
     })
   }
   goChat(index){
    let navigatationExtras: NavigationExtras ={
      queryParams:{
        n: this.nums
      }
      }
      this.router.navigate(['chats'], navigatationExtras)
  }
  getVal(index){
    
     this.nums = index+1;
      
      
    
    }
}
