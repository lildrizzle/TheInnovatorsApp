import { Component , OnInit } from  '@angular/core' ; 
 import { Router } from '@angular/router' ; 
 import { FormBuilder , FormGroup , Validators } from '@angular/forms' ; 
 import { User } from '../models/user.mode' ; 
 import { ToastController , LoadingController } from '@ionic/angular' ; 
 import { AngularFireAuth } from '@angular/fire/auth'; 

 import{ async } from '@angular/core/testing' ; 
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/api.service';
//import { AngularFireModule } from '@angular/fire';



 @ Component({
 selector: 'app-login',
 templateUrl: './login.page.html', 
 styleUrls : ['./login.page.scss'], 
 }) 

 
 export class LoginPage implements OnInit{ 
 store: any;
  user={} as User;
  
  emailVer = true ; 
val = true;  
  constructor (private _apiService: ApiService, private rout: Router,
    
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
 if(true){ 
  
await this.routeG();
 

  
  this.cookie.set("sessionEmail","");
this.cookie.set("sessionEmail",this.user.email);
this.cookie.set("valid","");
this.cookie.set("valid", this.store[0].role);


if(this.store[0].role === "Developer"){
      
  this.rout.navigate(['home']); 
}

  if(this.store[0].role === "Client"){
   this.rout.navigate(['get-started']); 
 
 }
  

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
  

   async mailVerified (){ 
   
   this.afAuth.authState.subscribe(async user => 
   { 
   if (user) 
   { 
     this.emailVer=(await this.afAuth.currentUser).emailVerified; 
   }
   
   }); 
    
  
   } 
routeG(){
  let data = {
  email: this.user.email,

  
  }
  return new Promise((resolve:any) => {
  this._apiService.guards(data).subscribe((res: any) => {
    console.log("guard success ===",res);
    this.store= res;
    
  
  resolve();
  }
  
  ,(error: any) => {
    alert('Ensure details are accurate or Email already exists');
    console.log("ERROR ===", error);

      });
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


