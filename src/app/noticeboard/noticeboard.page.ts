import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Info } from '../model/info.mode';

import firebase from 'firebase/app';
import 'firebase/auth';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-noticeboard',
  templateUrl: './noticeboard.page.html',
  styleUrls: ['./noticeboard.page.scss'],
})
export class NoticeboardPage implements OnInit {
info={} as Info;
mini :string;
myDate = new Date();
val:any;
basePath ='/images';
task: AngularFireUploadTask;
 downloadableURL = "";

  constructor(private datePipe: DatePipe,private router: Router,
    private toast: ToastController,
    private fAuth: AngularFireAuth,
    private load: LoadingController,
    private http: HttpClient,
    public _apiService:ApiService,private af: AngularFireStorage,private cookie: CookieService) { this.mini= this.datePipe.transform(this.myDate, 'yyyy-MM-dd');}


  ngOnInit() {
  }

  onLogout(){
    if(confirm("Are you sure about Logging Out?")){
    this.cookie.deleteAll();
    this.fAuth.signOut().then(() => this.router.navigate(['login']));}
    }
  async uploadImage(event){
    const file = event.target.files[0];
    if(file){
      const filePath = `${this.basePath}/${file.name}`;
      this.task = this.af.upload(filePath, file);
  
    
  
   (await this.task).ref.getDownloadURL().then(url => {this.downloadableURL = url;});
   
  } else{
    alert('no images selected');
  }
  
  }
  currentDetails(info: Info){
    const user = firebase.auth().currentUser;
    
     this.val = user.email;
     this.info.curEmail = this.val;
     console.log('email is :   ', this.val);
     
  }
  req(info: Info)
  {
    let data = {
      projName: this.info.projName,
      compName: this.info.compName,
      compDes: this.info.compDes,
      projDes: this.info.projDes,
      delDate: this.info.delDate,
      
      img_url: this.downloadableURL,
      curEmail: this.info.curEmail,
    }
    if(this.info.projName == "" || this.info.compName == "" || this.info.projDes == "" || this.info.compDes == "" || this.info.delDate == "")
{alert('Please enter all required details');
console.log(this.info.compDes,this.info.compName,this.info.projName,this.info.projDes,this.info.delDate,this.info.img_url);
this.info.projName = "" ;
 this.info.compName = "" ;
  this.info.projDes = "" ;
   this.info.compDes = "";
    this.info.delDate = "";
    this.info.curEmail = "";

}
else{
       this._apiService.createReq(data).subscribe((res:any) => {
        console.log(this.info.compDes,this.info.compName,this.info.projName,this.info.projDes,this.info.delDate,this.info.img_url);

        console.log("SUCCESS ===", res);
      
      alert('SUCCESSFULLY SUBMITTED:');
      console.log(this.info.compDes,this.info.compName,this.info.projName,this.info.projDes,this.info.delDate,this.info.img_url);

      
      },(error: any) => {
      alert('Ensure details are entered correctly');
      console.log(this.info.compDes,this.info.compName,this.info.projName,this.info.projDes,this.info.delDate,this.info.img_url);


      console.log("ERROR ===", error);
      this.info.projName = "" ;
      this.info.compName = "" ;
       this.info.projDes = "" ;
        this.info.compDes = "";
         this.info.delDate = "";
         this.info.curEmail = "";
        })
      }}
  
}
