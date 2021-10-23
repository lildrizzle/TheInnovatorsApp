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
  files: any;
  constructor(private _apiService: ApiService,private cookie: CookieService,private router: Router, private auths: AngularFireAuth) { }

  ngOnInit() {
    this.responses().then(()=> {
var keys = Object.keys(this.storeUsers);
var len = keys.length;
      if(len === 0){alert("No messages yet!")}
    
    })
    
  }
  onLogout(){
    if(confirm("Are you sure about Logging Out?")){
    this.cookie.deleteAll();
    this.auths.signOut().then(() => this.router.navigate(['login']));}
    }
//if(confirm("are u sure" + name)){ this.callFunction}
    method(){ this.getRecord().then(() => { this.delRec()}
    );
  
  
  
  

    } 
   
 getRecord(){
   
  let data = {
      
    rowCol: this.nums,
    email: this.cookie.get("sessionEmail")
  }
  return new Promise((resolve:any) => {
  this._apiService.getResRec(data).subscribe((res:any) => {
   console.log("get file SUCCESS ===", res);
 this.files = res;
 console.log("show files", this.files);
 
 resolve();
 },(error: any) => {
 
 console.log("ERROR ===", error);
  
  });
 
  });
 }
 
 delRec(){

  let data = {
      
    theEmail: this.files[0].getEmail,
    frEmail: this.cookie.get("sessionEmail"),
  }
  return new Promise((resolve:any) => {
  this._apiService.deleteResRecord(data).subscribe((res:any) => {
 
   console.log("delete SUCCESS ===");
  
   window.location.href ='users';
 },(error: any) => {
 
 console.log("ERROR ===", error);
 window.location.href ='responses';
   }
   
   );
  });
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
    return new Promise((resolve:any) => {
    this._apiService.responseView(data).subscribe((res:any) => {
     console.log("responses display SUCCESS ===", res);
   this.storeUsers = res;
   console.log("storeUsers", this.storeUsers);
   console.log('responses display SUCCESS');
   resolve();
   },(error: any) => {
   
   console.log("ERROR ===", error);
     });
    });
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
