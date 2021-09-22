
import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, ToastController } from '@ionic/angular';

import { ApiService } from '../api.service';
import { Val } from '../val/val.mode';
import {DisplayPage  } from '../display/display.page';
import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { DOCUMENT, Location} from '@angular/common';
import { interval, Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})


export class ChatPage implements OnInit{
myInterval = interval(2000);

  show: any = [];
  showChats: any =[];
  val={} as Val;
  displays:any = [];
  f:any;
  save:any;
 value: any;
  values: any;
  disps:any;
  messages = [
   
    
   
  ];
users$: Observable<Array< {}>>
  currentUser = this.cookie.get("sessionEmail");
  newMsg :any = '';
  data: any;
  @ViewChild(IonContent) content: IonContent


    constructor(private location: Location,private af: AngularFireAuth ,private rout: Router,private toast : ToastController,  private cookie: CookieService,  public _apiService:ApiService, public apiValue: DataService, private route: ActivatedRoute, private router: Router) {
    
this.route.queryParams.subscribe(params => {
  this.values = params;
  console.log('params:', params);
  console.log(this.values.n);
if (params && params.special){
  this.data = params.special;
}
})
    
  }
  ngOnInit() {
    
    
    this.getChats();
    
  }
  goBack(){
    this.location.back();
  }
  onLogout(){
    if(confirm("Are you sure about Logging Out?")){
   

    this.cookie.deleteAll();
    this.af.signOut().then(() => this.rout.navigate(['login']));
  }
    }

seek(){
  let v = this.apiValue.getValue();
  console.log(v);
}
  
  Row(val: Val)
  {
    let data = { 
      rowCol: this.apiValue.getValue(),
    }
      
  
 
    this._apiService.getRow(data).subscribe((res:any) => {
     console.log("SUCCESSFUL ===", res);
   this.show = res;
   alert('SUCCESSes');
   console.log("SUCCESSES ===", this.show);
   
   },(error: any) => {
   
   console.log("ERROR ===", error);
   console.log(this.val);
   
     })
   }
   
sendMessage(){
  var time = new Date();  
  let data = {
    rowCol: this.values.n, 
    myEmail: this.cookie.get("sessionEmail"),
    mess: this.newMsg,
    dates: new Date(),
    times: time.toTimeString(),
    
  }
 this._apiService.chatInsert(data).subscribe((res:any) => {
       
        console.log(" chat SUCCESS ===", res);
      
      console.log("the chat SUCCESSFULLY SUBMITTED:");
      this.newMsg = '';
  this.showToast("message sent")
      
      },(error: any) => {
      alert('problems  for chat');
   

      console.log("ERROR ===", error);
 
        })
      
  
}
  getChats(){
  let data = { 
    rowCol: this.values.n,
    email: this.cookie.get("sessionEmail"),
  }
    


  this._apiService.getChat(data).subscribe((res:any) => {
   console.log("SUCCESSFUL ===", res);
 this.showChats = res;
 console.log(this.currentUser);
 console.log('SUCCESS show');
 console.log("SUCCESSES ===", this.show);
 
 },(error: any) => {
 
 console.log("ERROR ===", error);
 console.log(this.val);
 
   })
   setTimeout(() =>{this.content.scrollToBottom(200);});
   
}
showToast(message:string){ 

  this.toast.create({  
  message: message, 
  duration: 2000 
 
  }). then ( toastData => toastData.present()); 
 
  } 
}
