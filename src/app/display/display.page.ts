import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Val } from '../val/val.mode';
import firebase from 'firebase/app';
import 'firebase/auth';
import { DataService } from '../data.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-display',
  templateUrl: './display.page.html',
  styleUrls: ['./display.page.scss'],
})

export class DisplayPage implements OnInit {
  projects: any = [];
  sav: number ;
 keep: any;
 val={} as Val;
 shows:any =[]; 
 constructor(private cookie: CookieService,  public _apiService:ApiService, public rout: Router, public apiValue: DataService, public af: AngularFireAuth) {  }

  ngOnInit() {
    this.getReg();
  }
getVal(index){
this.val.getNo="";
  this.val.getNo = index+1;
  console.log(index,"dfdxgdxfcbngvn");
  

}
test() :number{
  
  let g = this.val.getNo;
  return g;
}



check()
{
  this.sav = this.test();
  
console.log(this.sav);

}
show(){
  let f = this.sav;
  console.log("this is show: " + f);
  
  
}

Row()
  {
    let data = { 
      rowCol: this.test(),
    }
      
  
 
    this._apiService.getRow(data).subscribe((res:any) => {
     console.log("SUCCESSFUL ===", res);
   this.shows = res;
   console.log('SUCCESSes');
   console.log("SUCCESSES ===", this.shows);
   
   },(error: any) => {
   
   console.log("ERROR ===", error);
   console.log();
   
     })
   }
store(){
   this.apiValue.setValue( this.sav);
  
  
 // this.rout.navigateByUrl("users")
  

}getEmail(){
  const user = firebase.auth().currentUser;
  
   let value = user.email;
   this.keep = value;
   console.log('email is :   ', this.keep, "what:  " + this.af.currentUser);
   
}

userIns(){

  let data = {
      
    myEmail: this.cookie.get("sessionEmail"),
    //theirEmail: this.shows[0].curEmail,
    rowCol: this.test(),

  }
 this._apiService.insertUser(data).subscribe((res:any) => {
       
        console.log(" user SUCCESS ===", res);
      
      console.log("the user SUCCESSFULLY SUBMITTED:");
  alert("Added To Interests")
      
      },(error: any) => {
      alert('problems  for user insert');
   

      console.log("ERROR ===", error);
 
        })
      
  
}
onLogout(){
  if(confirm("Are you sure about Logging Out?")){
  this.cookie.deleteAll();
  this.af.signOut().then(() => this.rout.navigate(['login']));}
  }
  getReg()
  {
    let datas = {
   email: this.cookie.get("sessionEmail"),
    }
    this._apiService.getReg(datas).subscribe((res:any) => {
     console.log("display SUCCESS ===", res);
   this.projects = res;
   console.log('SUCCESS');
   
   },(error: any) => {
   
   console.log("ERROR ===", error);
     })
   }
}
