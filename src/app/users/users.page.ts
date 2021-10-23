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
  this.delete(); this.getUsers().then(()=> {
    var keyss = Object.keys(this.printUsers);
var lenn = keyss.length;
      if(lenn === 0){alert("No interests yet!")}
    
  })
  
  
}

  method(){ 
   
   this.getRecord().then(() => { this.delRec()
  
  }
  
  );
  
  
 

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
  if(confirm("Are you sure about Logging Out?")){
  this.cookie.deleteAll();
  this.af.signOut().then(() => this.router.navigate(['login']));}
  }
  delete(){
    this._apiService.deleteUser().subscribe((res:any) => {
      console.log("duplicates deleted");
    
    
    
    },(err: any) => {
    
    console.log("ERROR");
      })
    }
  
  
  
  
  getUsers()
  {
    let data = {
      
      email: this.cookie.get("sessionEmail"),
    }
    return new Promise((resolve:any) => {
    this._apiService.getUser(data).subscribe((res:any) => {
     console.log("users display SUCCESS ===", res);
   this.printUsers = res;
   console.log("printUsers", this.printUsers);
   
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
      this.router.navigate(['chat'], navigatationExtras)
  }
  getVal(index){
    
     this.nums = index+1;
      
      
    
    }
    
}
