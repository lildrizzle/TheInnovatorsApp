import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DataService } from '../data.service';
import firebase from 'firebase/app';
import 'firebase/auth';

import { AngularFireAuth } from '@angular/fire/auth';
import { NavigationExtras, Router } from '@angular/router';
import { Val } from '../val/val.mode';
import { timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit{
  shows: any = [];
  val={} as Val;
  v: any;
  nums:any;
  keep: any;
  printUsers:any;
  records: any;
  constructor(public _apiService: ApiService, public apiValue: DataService, public af:AngularFireAuth ,private router: Router
    ,private cookie: CookieService) { }

  

  ngOnInit() {
  this.delete(); this.getUsers();
  
  
}
reload(){
  this.router.navigate(['users'])
}
  method(){ 
   
   this.getRecord().then(() => { this.delRec()
  
  }
  
  ).finally(() => {this.reload()});
  
  
 

}
reloadComponent(){
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router.onSameUrlNavigation = 'reload';
  this.router.navigate(['/users'])
}
 getRecord(){
   
  let data = {
      
    rowCol: this.nums,
  }
  return new Promise((resolve:any) => {
  this._apiService.getRec(data).subscribe((res:any) => {
   console.log("get record SUCCESS ===", res);
 this.records = res;
 console.log("show rec", this.records);
 console.log("show val", this.apiValue.getValue());
 resolve();
 },(error: any) => {
 
 console.log("ERROR ===", error);
  
  });
 
  });
 }
 
 delRec(){

  let data = {
      
    ids: this.records[0].id,
  }
  return new Promise((resolve:any) => {
  this._apiService.deleteRecord(data).subscribe((res:any) => {
    window.location.href ='users';
   console.log("delete SUCCESS ===");
 
   
 },(error: any) => {
 
 console.log("ERROR ===", error);
   }
   );
 });
 }
onLogout(){
  this.af.signOut().then(() => this.router.navigate(['login']));
  }
  delete(){
    this._apiService.deleteUser().subscribe((res:any) => {
      console.log("duplicates deleted");
    
    
    
    },(err: any) => {
    
    console.log("ERROR");
      })
    }
  seek(){
    let v = this.apiValue.getValue();
    console.log(v);
  }
  getEmail(){
    const user = firebase.auth().currentUser;
    
     let value = user.email;
     this.keep = value;
     console.log('email is :   ', this.keep, "what:  " + this.af.currentUser);
     
  }
  
  getUsers()
  {
    let data = {
      
      email: this.cookie.get("sessionEmail"),
    }
    this._apiService.getUser(data).subscribe((res:any) => {
     console.log("users display SUCCESS ===", res);
   this.printUsers = res;
   console.log("printUsers", this.printUsers);
   
   
   },(error: any) => {
   
   console.log("ERROR ===", error);
     })
   }
  
  
    
  /*Row()
  /{
    let data = { 
      rowCol: this.apiValue.getValue(),
    }
      
  
 
   this._apiService.getRow(data).subscribe((res:any) => {
   console.log(" row runs SUCCESSFUL ===", res);
   this.shows = res;
   
  
   alert('row run SUCCESSes');
   console.log("row runs SUCCESSES ===", this.shows);
   
   },(error: any) => {
   
   console.log("ERROR ===", error);
   console.log();
   
     })

   }*/
  call(){
    console.log(this.shows[0].curEmail);
  }
  calls(){
    //console.log(this.apiValue.getVv());
  }
  goChat(index){
    let navigatationExtras: NavigationExtras ={
      queryParams:{
        n: this.nums
      }
      }
      this.router.navigate(['chat'], navigatationExtras)
  }
  getVal(index){
    
     this.nums = index+1;
      
      
    
    }
    
}
