import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import { ApiService } from '../api.service';
import firebase from 'firebase/app';
import 'firebase/auth';

import { Pro } from '../model/pro.mode';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  
  records: any = [];
  
  pro ={} as Pro
  test:any;
  constructor(private cookie: CookieService, public _apiService:ApiService, public rout: Router, public af: AngularFireAuth ,private toast: ToastController, public ar: ActivatedRoute) {}

  
  
  ngOnInit(){
    this.pro.description="";
    this.pro.appType="";
    this.pro.devType="";
    this.pro.location="";
this.getPro();
    
  }
  
  getPro()
  {
    let data = {
      
      email: this.cookie.get("sessionEmail"),
    }
    this._apiService.getProfile(data).subscribe((res:any) => {
     console.log("profile SUCCESS ===", res);
   this.records = res;
   console.log('SUCCESS');
   
   },(error: any) => {
   
   console.log("ERROR ===", error);
     })
   }
  
 update1(pro:Pro){
  let data = {
      
    description: this.pro.description,
    
    email: this.cookie.get("sessionEmail"),
  }
    if(this.pro.description != "")
    {
     // alert('Please Update all the editable fields before Updating');
   // this.pro.description="";
    
 
    this._apiService.update1(data).subscribe((res:any) => {
     console.log("profile SUCCESS ===", res);
   
     this.showToast('SUCCESS');
   
   },(error: any) => {
   
   console.log("ERROR ===", error);
     })
    }

 }

 update2(pro:Pro){
  let data = {
      
    location: this.pro.location,
    
    email: this.cookie.get("sessionEmail"),
  }
    if(this.pro.location != "")
    {
    //  alert('Please Update all the editable fields before Updating');
    //this.pro.location="";
    
  
    this._apiService.update2(data).subscribe((res:any) => {
     console.log("profile SUCCESS ===", res);
   
     this.showToast('SUCCESS');
   
   },(error: any) => {
   
   console.log("ERROR ===", error);
     })
    }

 }


 update3(pro:Pro){
  let data = {
      
    devType: this.pro.devType,
    
    email: this.cookie.get("sessionEmail"),
  }
    if(this.pro.devType != "" )
    {
      //alert('Please Update all the editable fields before Updating');
    //this.pro.devType="";
    
  

  
    this._apiService.update3(data).subscribe((res:any) => {
     console.log("profile SUCCESS ===", res);
   
   this.showToast('SUCCESS');
   
   },(error: any) => {
   
   console.log("ERROR ===", error);
     })
    }

 }

 showToast(message:string){
  this.toast.create({
    message: message,
    duration: 4000
  }).then(toastData=>toastData.present())
}

 update4(pro:Pro){
  let data = {
      
    appType: this.pro.appType,
    
    email: this.cookie.get("sessionEmail"),
  }
    if(this.pro.appType != "")
    {
    //  alert('Please choose App Type');
    //this.pro.appType="";
    
  

  
    this._apiService.update4(data).subscribe((res:any) => {
     console.log("profile SUCCESS ===", res);
   
     this.showToast('SUCCESS');
   
   },(error: any) => {
   
   console.log("ERROR ===", error);
     })
    }

 }


   updatePro(pro: Pro)
  {
    let data = {
      
      description: this.pro.description,
      location: this.pro.location,
      devType: this.pro.devType,
      appType: this.pro.appType,
      email: this.cookie.get("sessionEmail"),

    }
    if(this.pro.description == "" || this.pro.location == "" || this.pro.appType == "" || this.pro.devType == "" )
{alert('Please Update all the editable fields before Updating');
this.pro.description="";

this.pro.location="";
}

else{
    this._apiService.updates(data).subscribe((res:any) => {
     console.log("profile SUCCESS ===", res);
   
   alert('SUCCESS');
   
   },(error: any) => {
   
   console.log("ERROR ===", error);
     })
    }
   }
}
