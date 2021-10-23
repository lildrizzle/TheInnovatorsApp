import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth} from '@angular/fire/auth';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';


import { ApiService } from 'src/app/api.service';
import{User} from '../models/user.mode'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
 user={} as User;
val = true;
 
  constructor(private router: Router,
    private toast: ToastController,
    private fAuth: AngularFireAuth,
    private load: LoadingController,
    private http: HttpClient,
    public _apiService:ApiService
    ) { }

  ngOnInit() {
    this.user.name = "";
    this.user.surname = "";
    this.user.role = "" ;
    this.user.email = "";
this.user.password = "";


 //let email = new FormControl('', [Validators.required,Validators.email]);
 }
  method(){
    
//this.register(this.user).then(()=>{this.reg(this.user)});

  }
   reg(user: User)
  {
    
    let data = {
      name: this.user.name,
      surname: this.user.surname,
      email: this.user.email,
      password: this.user.password,
      role: this.user.role,
  }
  return new Promise((resolve:any) => {
if(this.user.name == "" || this.user.surname == "" || this.user.role == "" || this.user.email == "" || this.user.password == "")
{this.showToast('Please enter all details and Choose a role!');
this.user.name = "";
this.user.surname = "";
this.user.email = "";
this.user.password = "";
this.user.role= "";
this.val = false;

}
 
else{
       this._apiService.reg(data).subscribe((res:any) => {
        console.log("SUCCESS ===", res);
     
        
        
     
      },(error: any) => {
      alert('Ensure details are accurate or Email already exists');
      console.log("ERROR ===", error);
      this.user.name = "";
this.user.surname = "";
this.user.email = "";
this.user.password = "";
this.val = false;

        })
      
      }
      resolve();
    });
    }
  
    

  async register(user:User){
    
    
    if(this.validation()){
      let loader = this.load.create({
        message:"Please wait ...."
      })
      await (await loader).present();
     if(this.val = true){
       try{
        await (await this.reg(user)); 
        await ( await this.fAuth.createUserWithEmailAndPassword(user.email,user.password).then(data=>console.log(data)))
        await ( await this.fAuth.currentUser).sendEmailVerification();
        alert('SUCCESS: Please go verify your email account!');
        this.router.navigate(['login']); 

      }catch(e){
        if(e.code==='auth/weak-password')
        this.showToast('Password too weak');
        if(e.code==='auth/invalid-email')
        this.showToast('Incorrect details. Fill in All the Fields!');
        
        if (e.code == "auth/email-already-exists") {
        this.showToast( "This email is already in use" ); }
         
        if (e.code == "auth/email-already-in-use") {
          this.showToast( "This email is already in use by another account" ); }
          

      }
    }else{
      alert('Firebase not doing anything');
    }
      await (await loader).dismiss();
    }
    
  }


  showToast(message:string){
    this.toast.create({
      message: message,
      duration: 4000
    }).then(toastData=>toastData.present())
  }
 
t(){
 
  
  if(this.user.name == "" || this.user.surname == "" || this.user.role == "" || this.user.email == "" || this.user.password == "" )
{console.log('Please enter all details and Choose a role!');


}else{console.log("how it works")}
}
  validation(){
    if(!this.user.email)
    {
    this.showToast("Enter an email address");
    return false;
    }

    if(!this.user.password)
    {
      this.showToast("Enter a password");
      return false;
      }
      return true;
  }

}
