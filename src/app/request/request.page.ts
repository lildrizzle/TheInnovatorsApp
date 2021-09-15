import { Component, OnInit } from '@angular/core';
import {AngularFireStorage, GetDownloadURLPipe, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {

 
  ngOnInit(): void{

  }
  constructor(private af: AngularFireStorage, private router: Router, public cookie: CookieService) { 
  }

login(){
  this.cookie.set("userId","send");

  alert("User logged in: " + this.cookie.get("userId"));
}
openQueryParams(){
let navigatationExtras: NavigationExtras ={
queryParams:{
  special:'whatevz'
}
}
this.router.navigate(['chat'], navigatationExtras)
}
}
