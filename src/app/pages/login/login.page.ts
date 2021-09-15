import { Component , OnInit } from  '@angular/core' ; 
 import { Router } from '@angular/router' ; 
 import { FormBuilder , FormGroup , Validators } from '@angular/forms' ; 
 import { User } from '../models/user.mode' ; 
 import { ToastController , LoadingController } from '@ionic/angular' ; 
 import { AngularFireAuth } from '@angular/fire/auth'; 

 import{ async } from '@angular/core/testing' ; 
import { CookieService } from 'ngx-cookie-service';
//import { AngularFireModule } from '@angular/fire';



 @ Component({
 selector: 'app-login',
 templateUrl: './login.page.html', 
 styleUrls : ['./login.page.scss'], 
 }) 

 
 export class LoginPage implements OnInit{ 
 
  user={} as User;
  
  emailVer = true ; 
val = true;  
  constructor ( private rout: Router,
    
     private toast : ToastController ,
     
    private load : LoadingController , 
  private afAuth : AngularFireAuth, private cookie: CookieService){ 


 } 
  
  ngOnInit() {
    
 }
 
async login(user :User ){ 
  
  this . mailVerified(); 
   
  if(this.validation()){ 
  
  let loader = this.load.create({ 
  message :"Please wait..."}); 
  
 ( await loader ). present(); 
  
 

 try 
 {
    
await this.afAuth.signInWithEmailAndPassword( user.email , user.password ). then( data => console.log( data)); 

this.val = true;
 if(!this.emailVer){ 
  
  this.user.password = '';
this.showToast("Verify your email address" ); 

 
} 
 else {
this.cookie.set("sessionEmail",this.user.email);
 this.rout.navigate(['noticeboard']); 

 }
 }catch(e){ 
 
 if (e.code === "auth/invalid-email") 
 {
 this.showToast( "Wrong email Format: Try Again" ); 
 this.user.email = '';
this.user.password = '';
 }
 
 if (e.code === "auth/user-not-found") 
 {
 this.showToast( " Ensure details are correct: No user Found" ); 
 this.user.email = '';
this.user.password = '';
 }
 if (e.code === "auth/wrong-password") 
 {
 this.showToast( " Wrong password: Try again" ); 
 this.user.email = '';
this.user.password = '';
 }
          } 
 
 ( await loader ).dismiss(); 
 } 
  

} 
  
reload(){ 
  window.location.reload(); 
   } 
   async mailVerified (){ 
   
   this.afAuth.authState.subscribe(async user => 
   { 
   if (user) 
   { 
     this.emailVer=(await this.afAuth.currentUser).emailVerified; 
   }
   
   }); 
    
  
   } 

 
 validation(){ 
   if(!this.user.email)
   { 
    this.showToast ("Enter email"); 
 
    return false ; 
 
  } 
 
   if(! this. user.password)
   { 

 this .showToast ( "Enter password" );  

 return false; 
 } 
 
 return true ;
 
 } 

 showToast(message:string){ 

 this.toast.create({  
 message: message, 
 duration: 3000 

 }). then ( toastData => toastData.present()); 

 } 

 } 


